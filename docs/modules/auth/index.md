# Auth Module — Common Infrastructure

## Auth Flow

| Phase | Procedure | Description |
|-------|-----------|-------------|
| 1 | `auth.register` | Create account + send OTP email |
| 2 | `auth.otpVerification` | Verify email via OTP |
| 3 | `auth.login` | Authenticate + get token pair |
| 4 | `auth.refreshToken` | Rotate access/refresh tokens |
| 5 | `auth.forgotPassword` | Request password reset OTP |
| 6 | `auth.verifyForgotPassword` | Verify reset OTP |
| 7 | `auth.resetPassword` | Set new password |
| 8 | `auth.logout` | Revoke tokens |
| — | `auth.getMe` | Get current user profile |

---

## Infrastructure

### JWT (`backend/src/infrastructure/jwt.service.ts`)
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

### OTP (`backend/src/infrastructure/otp.service.ts`)
- 6-digit crypto-random numeric OTP via `crypto.randomInt(0, 10^6)`, zero-padded
- Bcrypt-hashed before storage on User document fields `hashedOtp` / `expiresOtp` (both `select: false`)
- TTL: 10 minutes (enforced by comparing `expiresOtp > now()`)

| Method | Description |
|--------|-------------|
| `createOtp(userId, length?, ttlMinutes?)` | Generates, hashes, stores OTP on user doc, returns plaintext OTP |
| `verifyOtp(userId, inputOtp, type?)` | Fetches user secrets, checks expiry, bcrypt-compares OTP |

### Cookies (`backend/src/infrastructure/cookie.service.ts`)
- **Cookie names:** `accessToken`, `refreshToken` (from `COOKIE_CONFIG.REFRESH_TOKEN_NAME`)
- **Base options:** `{ httpOnly: true, secure: <env>, sameSite: <config>, path: '/' }`
- Refresh token cookie additionally gets `maxAge` from `COOKIE_CONFIG.REFRESH_TOKEN_MAX_AGE`

| Method | Description |
|--------|-------------|
| `setAuthCookies(res, tokens)` | Sets both cookies on response |
| `clearAuthCookies(res)` | Clears both cookies |
| `getAccessToken(req)` | Reads access token from request cookies |
| `getRefreshToken(req)` | Reads refresh token from request cookies |

### Bcrypt (`backend/src/infrastructure/bcrypt.service.ts`)
- Wraps `createBcrypt()` from `@muzammil328/core`
- Salt rounds: `BACKEND_SECURITY_CONFIG.BCRYPT_SALT_ROUNDS_DEFAULT` from env `BCRYPT_SALT_ROUNDS` (default 12)

---

## Middleware

### tRPC procedures (`backend/src/trpc/trpc.ts`)

| Procedure | Auth Check |
|-----------|-----------|
| `publicProcedure` | None — accessible by anyone |
| `protectedProcedure` | Requires `ctx.user` — populated by tRPC context via access token (cookie or Bearer header); throws `TRPCError('UNAUTHORIZED')` if missing |
| `superAdminProcedure` | Protected + requires role `RoleEnum.SuperAdmin` |
| `teacherProcedure` | Protected + requires role `Teacher` or `SuperAdmin` |
| `studentProcedure` | Protected + requires role `Student` or `Guest` |

### tRPC context (`backend/src/trpc/context.ts`)
On every tRPC request:
1. Extract token from `req.cookies['token']` or `Authorization: Bearer <token>` header
2. Verify access token via `createJwt()` from `@muzammil328/core`
3. Fetch user from MongoDB (selecting `subscriptionPlan`, `subscriptionExpiresAt`, `institutionId`)
4. Returns `{ user: AuthUser \| null, req, res }`

**AuthUser shape:**
```ts
{
  userId: string,
  email?: string,
  role: string,
  subscriptionPlan?: string,
  subscriptionExpiresAt?: Date,
  institutionId?: string,
}
```

### Express REST middleware (`backend/src/middleware/auth.middleware.ts`)

| Export | Description |
|--------|-------------|
| `authenticate` | Verifies Bearer token; auto-refreshes if expired via refresh token; sets `X-New-Access-Token` / `X-Token-Refreshed` headers |
| `optionalAuthenticate` | Like `authenticate` but does not fail on missing token |
| `requireRole(...roles)` | Checks `req.user.role` against allowed roles, returns 403 if insufficient |
| `handleTokenRefresh` | Route handler for POST /auth/refresh — reads refresh token from cookie/body, returns `{ accessToken, expiresIn }` |
| `handleLogout` | Route handler for logout — revokes refresh token, clears cookie |

---

## Environment Variables

| Variable | Default | Required | Description |
|----------|---------|----------|-------------|
| `JWT_ACCESS_TOKEN_SECRET_KEY` | — | Yes (min 32 chars) | Access token signing secret |
| `JWT_REFRESH_TOKEN_SECRET_KEY` | — | Yes (min 32 chars) | Refresh token signing secret |
| `JWT_ACCESS_TOKEN_EXPIRES_IN` | `1d` | No | Access token expiry duration |
| `JWT_REFRESH_TOKEN_EXPIRES_IN` | `7d` | No | Refresh token expiry in days |
| `BCRYPT_SALT_ROUNDS` | `12` | No | Bcrypt salt rounds |
| `COOKIE_SECRET` | — | No | Cookie signing secret |

# Imports

```ts
import { logTreeStep } from '@muzammil328/services';

import { userRepository } from '@/repository/user.repository';
import { otpRepository } from '@/repository/otp.repository';

import { bcryptService } from '@/infrastructure/bcrypt.service';
import { otpService } from '@/infrastructure/otp.service';
import { emailService } from '@/infrastructure/email.service';

import {
  RoleEnum,
  UserRole,
  OtpPurposeEnum,
} from '@muzammil328/education-packages/enums';
```

## Security Rules

* Never store raw OTP.
* Never return OTP in API response.
* Auto-delete using MongoDB TTL index.
* Track verification attempts.
* Lock after max attempts.

TTL:

```ts
schema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);
```

Do not reveal to public clients:

* email exists
* OTP exists
* OTP expired
* OTP locked
* OTP attempts remaining

---

**Do not log:**

* password
* hashed password
* OTP
* hashed OTP
* email contents
