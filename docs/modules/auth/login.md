## auth.login

**Type:** `mutation`
**Auth:** `publicProcedure`
**Input:** `loginSchema`
```ts
z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})
```
**Imports:**
```ts
import { AppError } from '@muzammil328/core';
import { logTreeStep } from '@muzammil328/services';
import { bcryptService } from '@/infrastructure/bcrypt.service';
import { jwtService } from '@/infrastructure/jwt.service';
import { otpService } from '@/infrastructure/otp.service';
import { cookieService } from '@/infrastructure/cookie.service';
import { userRepository } from '@/repository/user.repository';
import { RoleEnum, OtpPurposeEnum } from '@muzammil328/education-packages/enums';
```

> **DO NOT reveal:** The error message `Invalid credentials` is intentionally identical for both "user not found" and "wrong password" to prevent email enumeration attacks.

> **Security:** On successful login, any existing unexpired EMAIL_VERIFICATION OTPs for this user are deleted to prevent OTP replay after email is already verified.

### Step 1: Find User with Auth Fields
```ts
const user = await userRepository.findByEmailWithAuth(email);
if (!user) throw AppError.unauthorized('Invalid credentials');
```
- Uses `findByEmailWithAuth()` which selects `+password +hashedToken +revoked +expiresToken`

### Step 2: Verify Password
```ts
const isPasswordValid = await bcryptService.compare(password, user.password);
if (!isPasswordValid) throw AppError.unauthorized('Invalid credentials');
```

### Step 3: Cleanup Existing OTPs
```ts
await otpService.deleteOtpsByUserAndPurpose(userId, OtpPurposeEnum.EMAIL_VERIFICATION);
```

### Step 4: Sign Tokens
```ts
const accessToken = jwtService.signAccess({ userId, role });
const refreshToken = jwtService.signRefresh({ userId, role });
```
- Access token: signed with `JWT_ACCESS_TOKEN_SECRET_KEY`, expires in `ACCESS_TOKEN_EXPIRY` (default 1d)
- Refresh token: signed with `JWT_REFRESH_TOKEN_SECRET_KEY`, expires in `REFRESH_TOKEN_EXPIRY_DAYS` days (default 7d)
- Payload: `{ userId, role }`

### Step 5: Hash and Store Refresh Token
```ts
const hashedRefreshToken = await bcryptService.hash(refreshToken);
await userRepository.findByIdAndUpdate(new Types.ObjectId(userId), {
  hashedToken: hashedRefreshToken,
  revoked: false,
});
```

### Step 6: Set Cookies
```ts
cookieService.setAuthCookies(ctx.res, { accessToken, refreshToken });
```
- `accessToken` cookie: `{ httpOnly: true, secure: <env>, sameSite: <config>, path: '/' }`
- `refreshToken` cookie: additionally has `maxAge` from `COOKIE_CONFIG.REFRESH_TOKEN_MAX_AGE`

### Step 7: Audit Logging
```ts
logTreeStep('User logged in successfully');
```

### Returns
```ts
{
  success: true,
  status: 200,
  message: 'Login successful',
  data: {
    user: {
      userId: string,
      username: string,
      email: string,
      role: string,
    },
    token: {
      accessToken: string,
      refreshToken: string,
    },
  },
}
```

### Environment Variables

| Variable | Default | Required | Description |
|----------|---------|----------|-------------|
| `JWT_ACCESS_TOKEN_SECRET_KEY` | — | Yes (min 32 chars) | Access token signing secret |
| `JWT_REFRESH_TOKEN_SECRET_KEY` | — | Yes (min 32 chars) | Refresh token signing secret |
| `JWT_ACCESS_TOKEN_EXPIRES_IN` | `1d` | No | Access token expiry duration |
| `JWT_REFRESH_TOKEN_EXPIRES_IN` | `7d` | No | Refresh token expiry in days |

### Errors
| Code | Condition |
|------|-----------|
| `UNAUTHORIZED` (401) | Invalid credentials |
