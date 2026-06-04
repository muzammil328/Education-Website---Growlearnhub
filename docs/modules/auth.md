# AUTH tRPC Procedures

## auth.register
**Type:** `mutation`
**Auth:** `publicProcedure`
**Input:**
```ts
registerSchema: z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})
```
**Import:**
```ts
import { logTreeStep } from '@muzammil328/services';
import { userRepository } from '@/repository/user.repository';
import { bcryptService } from '@/infrastructure/bcrypt.service';
import { otpService } from '@/infrastructure/otp.service';
import { emailService } from '@/infrastructure/email.service';
import { RoleEnum } from '@muzammil328/education-packages/enums';
```
**Flow:**
- Log `authService.register` via `logTreeStep`
- Check email uniqueness by `userRepository.findByEmail(email)` — throws `AppError.badRequest('Email already registered')` if exists
- Check username uniqueness by `userRepository.findByUsername(username)` — throws `AppError.badRequest('Username already taken')` if exists
- Hash password by `bcryptService.hash(password)`
- Create user by `userRepository.create({ username, email: email.toLowerCase(), password: hashedPassword, role: RoleEnum.Student, isEmailVerified: false, enrolledClasses: [], badges: [], dailyStreak: 0 })`
- Generate 6-digit OTP by `otpService.createOtp(new Types.ObjectId(userId))` — bcrypt-hashed, stored on user doc fields `hashedOtp`/`expiresOtp`, 10min TTL
- Send verification email by `emailService.send({ to: email, subject: 'Growlearnhub verification code', template: 'generateVerificationCode', context: { username, otp, year: new Date().getFullYear() } })`
- Log `User registered successfully` via `logTreeStep`
- **Returns:**
```ts
{
  success: true,
  status: 201,
  message: 'Registration successful',
  data: { userId: string, username: string, email: string, role: string },
}
```
**Errors:** `BAD_REQUEST` (email/username taken)

---

## auth.otpVerification
**Type:** `mutation`
**Auth:** `publicProcedure`
**Input:**
```ts
otpVerificationSchema: z.object({
  email: z.string().email(),
  otp: z.string().min(4).max(8),
})
```
**Import:**
```ts
import { otpService } from '@/infrastructure/otp.service';
import { userRepository } from '@/repository/user.repository';
```
**Flow:**
- Log `authService.otpVerification` via `logTreeStep`
- Find user by `userRepository.findByEmail(email)` — throws `AppError.notFound('User not found')` if missing
- Verify OTP by `otpService.verifyOtp(new Types.ObjectId(userId), otp, 'registration')` — fetches user with `+hashedOtp +expiresOtp`, checks expiry, bcrypt-compares OTP
- Throws `AppError.unauthorized('Invalid or expired OTP')` if invalid
- Log `OTP verified successfully` via `logTreeStep`
- **Returns:**
```ts
{
  success: true,
  status: 200,
  message: 'OTP verified successfully',
  data: null,
}
```
**Errors:** `NOT_FOUND` (user), `UNAUTHORIZED` (invalid/expired OTP)

---

## auth.login
**Type:** `mutation`
**Auth:** `publicProcedure`
**Input:**
```ts
loginSchema: z.object({
  email: z.string().email(),
  password: z.string().min(1),
})
```
**Import:**
```ts
import { logTreeStep } from '@muzammil328/services';
import { userRepository } from '@/repository/user.repository';
import { bcryptService } from '@/infrastructure/bcrypt.service';
import { jwtService } from '@/infrastructure/jwt.service';
import { cookieService } from '@/infrastructure/cookie.service';
```
**Flow:**
- Log `authService.login` via `logTreeStep`
- Find user by `userRepository.findByEmailWithAuth(email)` (selects password hash) — throws `AppError.unauthorized('Invalid credentials')` if missing
- Verify password by `bcryptService.compare(password, user.password)` — throws `AppError.unauthorized('Invalid credentials')` if mismatch
- Sign access token by `jwtService.signAccess({ userId, role })` — JWT with `{ userId, role }` payload, signed with `JWT_ACCESS_TOKEN_SECRET_KEY`, expires in `ACCESS_TOKEN_EXPIRY` (default 1d)
- Sign refresh token by `jwtService.signRefresh({ userId, role })` — JWT with `{ userId, role }` payload, signed with `JWT_REFRESH_TOKEN_SECRET_KEY`, expires in `REFRESH_TOKEN_EXPIRY_DAYS` days (default 7d)
- Hash refresh token by `bcryptService.hash(refreshToken)`
- Save hashed refresh token by `userRepository.findByIdAndUpdate(userId, { hashedToken: hashedRefreshToken, revoked: false })`
- Set cookies by `cookieService.setAuthCookies(ctx.res, { accessToken, refreshToken })` — sets `accessToken` + `refreshToken` cookies (httpOnly, secure in prod, sameSite)
- Log `User logged in successfully` via `logTreeStep`
- **Returns:**
```ts
{
  success: true,
  status: 200,
  message: 'Login successful',
  data: {
    user: { userId: string, username: string, email: string, role: string },
    token: { accessToken: string, refreshToken: string },
  },
}
```
**Errors:** `UNAUTHORIZED` (invalid credentials)

---

## auth.logout
**Type:** `mutation`
**Auth:** `protectedProcedure`
**Input:** none (`z.void()`)
**Import:**
```ts
import { AppError } from '@muzammil328/core';
import { Types } from 'mongoose';
import { authService } from '../services/auth.service';
import { cookieService } from '@/infrastructure/cookie.service';
```
**Flow:**
- Validate `ctx.user.userId` — throws `AppError.unauthorized('Invalid user ID')` if missing or invalid ObjectId
- Log `authService.logout` via `logTreeStep`
- Update user by `userRepository.findByIdAndUpdate(userId, { revoked: true, hashedToken: '', expiresToken: null })` — throws `AppError.notFound('User not found')` if missing
- Clear cookies by `cookieService.clearAuthCookies(ctx.res)` — clears `accessToken` + `refreshToken` cookies
- Log `User logged out successfully` via `logTreeStep`
- **Returns:**
```ts
{
  success: true,
  status: 200,
  message: 'Logged out successfully',
  data: null,
}
```
**Errors:** `UNAUTHORIZED` (invalid user ID), `NOT_FOUND` (user)

---

## auth.refreshToken
**Type:** `mutation`
**Auth:** `publicProcedure`
**Input:** none (`z.void()`) — reads `refreshToken` cookie from request
**Import:**
```ts
import { AppError } from '@muzammil328/core';
import { jwtService } from '@/infrastructure/jwt.service';
import { bcryptService } from '@/infrastructure/bcrypt.service';
import { userRepository } from '@/repository/user.repository';
import { cookieService } from '@/infrastructure/cookie.service';
```
**Flow:**
- Read refresh token cookie by `cookieService.getRefreshToken(ctx.req)` — throws `AppError.unauthorized('No refresh token provided')` if missing
- Log `authService.refreshToken` via `logTreeStep`
- Verify JWT signature by `jwtService.verifyRefresh(incomingToken)` — throws `AppError.unauthorized('Invalid refresh token')` if invalid
- Extract `{ userId, role }` from decoded payload
- Find user with secrets by `userRepository.findByIdWithSecrets(payload.userId, ['+revoked', '+hashedToken'])` — throws `AppError.unauthorized('Invalid refresh token')` if missing, revoked, or no stored token
- Compare incoming token by `bcryptService.compare(incomingToken, user.hashedToken)` — throws `AppError.unauthorized('Invalid refresh token')` if mismatch
- Sign new access token by `jwtService.signAccess({ userId, role })`
- Sign new refresh token by `jwtService.signRefresh({ userId, role })`
- Hash new refresh token by `bcryptService.hash(newRefreshToken)`
- Update stored hash by `userRepository.findByIdAndUpdate(userId, { hashedToken: hashedRefreshToken, revoked: false })`
- Set new cookies by `cookieService.setAuthCookies(ctx.res, { accessToken, refreshToken: newRefreshToken })`
- Log `Tokens refreshed successfully` via `logTreeStep`
- **Returns:**
```ts
{
  success: true,
  status: 200,
  message: 'Tokens refreshed successfully',
  data: null,
}
```
**Errors:** `UNAUTHORIZED` (no/missing/invalid refresh token)
**Note:** Both access and refresh tokens are rotated on every refresh.

---

## auth.forgotPassword
**Type:** `mutation`
**Auth:** `publicProcedure`
**Input:**
```ts
forgotPasswordSchema: z.object({
  email: z.string().email(),
})
```
**Import:**
```ts
import { logTreeStep } from '@muzammil328/services';
import { userRepository } from '@/repository/user.repository';
import { otpService } from '@/infrastructure/otp.service';
import { emailService } from '@/infrastructure/email.service';
```
**Flow:**
- Log `authService.forgotPassword` via `logTreeStep`
- Find user by `userRepository.findByEmail(email)` — throws `AppError.notFound('User not found')` if missing
- Generate 6-digit OTP by `otpService.createOtp(new Types.ObjectId(userId))` — bcrypt-hashed, stored on user doc, 10min TTL
- Send password reset email by `emailService.send({ to: email, subject: 'Growlearnhub password reset code', template: 'passwordResetCode', context: { username: user.username, otp, year: new Date().getFullYear() } })`
- Log `Password reset OTP sent successfully` via `logTreeStep`
- **Returns:**
```ts
{
  success: true,
  status: 200,
  message: 'OTP sent to email',
  data: null,
}
```
**Errors:** `NOT_FOUND` (user)

---

## auth.verifyForgotPassword
**Type:** `mutation`
**Auth:** `publicProcedure`
**Input:**
```ts
forgotPasswordOtpVerificationSchema: z.object({
  email: z.string().email(),
  otp: z.string().min(4).max(8),
})
```
**Import:**
```ts
import { otpService } from '@/infrastructure/otp.service';
import { userRepository } from '@/repository/user.repository';
```
**Flow:**
- Log `authService.verifyForgotPasswordOtp` via `logTreeStep`
- Find user by `userRepository.findByEmail(email)` — throws `AppError.notFound('User not found')` if missing
- Verify OTP by `otpService.verifyOtp(new Types.ObjectId(userId), otp, 'password_reset')` — fetches user with `+hashedOtp +expiresOtp`, checks expiry, bcrypt-compares OTP
- Throws `AppError.unauthorized('Invalid or expired OTP')` if invalid
- Log `Forgot password OTP verified successfully` via `logTreeStep`
- **Returns:**
```ts
{
  success: true,
  status: 200,
  message: 'OTP verified successfully',
  data: null,
}
```
**Errors:** `NOT_FOUND` (user), `UNAUTHORIZED` (invalid/expired OTP)

---

## auth.resetPassword
**Type:** `mutation`
**Auth:** `publicProcedure`
**Input:**
```ts
resetPasswordSchema: z.object({
  email: z.string().email(),
  newPassword: z.string().min(8),
})
```
**Import:**
```ts
import { logTreeStep } from '@muzammil328/services';
import { userRepository } from '@/repository/user.repository';
import { bcryptService } from '@/infrastructure/bcrypt.service';
```
**Flow:**
- Log `authService.resetPassword` via `logTreeStep`
- Find user by `userRepository.findByEmail(email)` — throws `AppError.notFound('User not found')` if missing
- Hash new password by `bcryptService.hash(newPassword)`
- Update user password by `userRepository.findByIdAndUpdate(userId, { password: hashedPassword })` — throws `AppError.notFound('User not found')` if missing
- Log `Password reset successfully` via `logTreeStep`
- **Returns:**
```ts
{
  success: true,
  status: 200,
  message: 'Password reset successfully',
  data: null,
}
```
**Errors:** `NOT_FOUND` (user)

---

## auth.getMe
**Type:** `query`
**Auth:** `protectedProcedure`
**Input:** none (uses `ctx.user.userId`)
**Import:**
```ts
import { userService } from '../services/user.service';
```
**Flow:**
- Validate `ctx.user.userId` — throws `AppError.unauthorized('Invalid user ID')` if missing or invalid ObjectId
- Get profile by `userService.getMe(userId)`:
  - Validates ObjectId via `Types.ObjectId.isValid(userId)` — throws `AppError.badRequest('Invalid user ID')` if invalid
  - Finds user by `userRepository.findById(userId)` — throws `AppError.notFound('User not found')` if missing
  - Returns profile `{ userId: string, username: string, email: string, role: string }`
- **Returns:**
```ts
{
  userId: string,
  username: string,
  email: string,
  role: string,
}
```
**Errors:** `UNAUTHORIZED` (invalid user ID), `NOT_FOUND` (user)

---

# Auth Flow

## Full lifecycle
```
register → otpVerification → login → [refreshToken] → logout
                                              ↓
                                    forgotPassword → verifyForgotPassword → resetPassword
```

---

# Infrastructure

## JWT (`backend/src/infrastructure/jwt.service.ts`)
- Uses `createJwt()` from `@muzammil328/core`
- **Access token:** signed with `JWT_ACCESS_TOKEN_SECRET_KEY` (env, min 32 chars), expires in `ACCESS_TOKEN_EXPIRY` (default 1d)
- **Refresh token:** signed with `JWT_REFRESH_TOKEN_SECRET_KEY` (env, min 32 chars), expires in `REFRESH_TOKEN_EXPIRY_DAYS` days (default 7d)
- **Payload:** `{ userId: string, role: string }`
- **Methods:**
  | Method | Returns | Description |
  |--------|---------|-------------|
  | `signAccess(payload)` | `string` | Signs access JWT |
  | `signRefresh(payload)` | `string` | Signs refresh JWT |
  | `signBoth(payload)` | `{ accessToken, refreshToken }` | Signs both tokens |
  | `verifyAccess(token)` | `{ valid, payload? }` | Verifies access token |
  | `verifyRefresh(token)` | `{ valid, payload? }` | Verifies refresh token |

## OTP (`backend/src/infrastructure/otp.service.ts`)
- 6-digit crypto-random numeric OTP via `crypto.randomInt(0, 10^6)`, zero-padded
- Bcrypt-hashed before storage on User document fields `hashedOtp` / `expiresOtp` (both `select: false`)
- TTL: 10 minutes (enforced by comparing `expiresOtp > now()`)
- **Methods:**
  | Method | Description |
  |--------|-------------|
  | `createOtp(userId, length?, ttlMinutes?)` | Generates, hashes, stores OTP on user doc, returns plaintext OTP |
  | `verifyOtp(userId, inputOtp, type?)` | Fetches user secrets, checks expiry, bcrypt-compares OTP |

## Cookies (`backend/src/infrastructure/cookie.service.ts`)
- **Cookie names:** `accessToken`, `refreshToken` (from `COOKIE_CONFIG.REFRESH_TOKEN_NAME`)
- **Base options:** `{ httpOnly: true, secure: <env>, sameSite: <config>, path: '/' }`
- Refresh token cookie additionally gets `maxAge` from `COOKIE_CONFIG.REFRESH_TOKEN_MAX_AGE`
- **Methods:**
  | Method | Description |
  |--------|-------------|
  | `setAuthCookies(res, tokens)` | Sets both cookies on response |
  | `clearAuthCookies(res)` | Clears both cookies |
  | `getAccessToken(req)` | Reads access token from request cookies |
  | `getRefreshToken(req)` | Reads refresh token from request cookies |

## Bcrypt (`backend/src/infrastructure/bcrypt.service.ts`)
- Wraps `createBcrypt()` from `@muzammil328/core`
- Salt rounds: `BACKEND_SECURITY_CONFIG.BCRYPT_SALT_ROUNDS_DEFAULT` from env `BCRYPT_SALT_ROUNDS` (default 12)

---

# Middleware

## tRPC procedures (`backend/src/trpc/trpc.ts`)
| Procedure | Auth Check |
|-----------|-----------|
| `publicProcedure` | None — accessible by anyone |
| `protectedProcedure` | Requires `ctx.user` — populated by tRPC context via access token (cookie or Bearer header); throws `TRPCError('UNAUTHORIZED')` if missing |
| `superAdminProcedure` | Protected + requires role `RoleEnum.SuperAdmin` |
| `teacherProcedure` | Protected + requires role `Teacher` or `SuperAdmin` |
| `studentProcedure` | Protected + requires role `Student` or `Guest` |

## tRPC context (`backend/src/trpc/context.ts`)
On every tRPC request:
1. Extract token from `req.cookies['token']` or `Authorization: Bearer <token>` header
2. Verify access token via `createJwt()` from `@muzammil328/core`
3. Fetch user from MongoDB (selecting `subscriptionPlan`, `subscriptionExpiresAt`, `institutionId`)
4. Returns `{ user: AuthUser | null, req, res }` where `AuthUser = { userId, email?, role, subscriptionPlan?, subscriptionExpiresAt?, institutionId? }`

## Express REST middleware (`backend/src/middleware/auth.middleware.ts`)
| Export | Description |
|--------|-------------|
| `authenticate` | Verifies Bearer token; auto-refreshes if expired via refresh token; sets `X-New-Access-Token` / `X-Token-Refreshed` headers |
| `optionalAuthenticate` | Like `authenticate` but does not fail on missing token |
| `requireRole(...roles)` | Checks `req.user.role` against allowed roles, returns 403 if insufficient |
| `handleTokenRefresh` | Route handler for POST /auth/refresh — reads refresh token from cookie/body, returns `{ accessToken, expiresIn }` |
| `handleLogout` | Route handler for logout — revokes refresh token, clears cookie |

---

# Environment Variables

| Variable | Default | Required | Description |
|----------|---------|----------|-------------|
| `JWT_ACCESS_TOKEN_SECRET_KEY` | — | Yes (min 32 chars) | Access token signing secret |
| `JWT_REFRESH_TOKEN_SECRET_KEY` | — | Yes (min 32 chars) | Refresh token signing secret |
| `JWT_ACCESS_TOKEN_EXPIRES_IN` | `1d` | No | Access token expiry duration |
| `JWT_REFRESH_TOKEN_EXPIRES_IN` | `7d` | No | Refresh token expiry in days |
| `BCRYPT_SALT_ROUNDS` | `12` | No | Bcrypt salt rounds |
| `COOKIE_SECRET` | — | No | Cookie signing secret |
