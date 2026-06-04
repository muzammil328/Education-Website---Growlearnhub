## auth.refreshToken

**Type:** `mutation`
**Auth:** `publicProcedure`
**Input:** none (`z.void()`) — reads `refreshToken` from cookie
```ts
// Cookie: "refreshToken" — retrieved via cookieService.getRefreshToken(ctx.req)
```
**Imports:**
```ts
import { AppError } from '@muzammil328/core';
import { logTreeStep } from '@muzammil328/services';
import { jwtService } from '@/infrastructure/jwt.service';
import { bcryptService } from '@/infrastructure/bcrypt.service';
import { cookieService } from '@/infrastructure/cookie.service';
import { userRepository } from '@/repository/user.repository';
import { RoleEnum } from '@muzammil328/education-packages/enums';
```

> **DO NOT reveal:** The error message `Invalid refresh token` is intentionally identical for all failure cases (missing token, expired, revoked, tampered, wrong user) to prevent token enumeration attacks.

> **Security:** Both access and refresh tokens are rotated on every refresh. The old refresh token is immediately revoked, preventing replay attacks.

### Step 1: Extract Token from Cookie
```ts
const token = cookieService.getRefreshToken(ctx.req);
if (!token) throw AppError.unauthorized('No refresh token provided');
```

### Step 2: Verify JWT Signature
```ts
const decoded = jwtService.verifyRefresh(incomingToken);
if (!decoded.valid || !decoded.payload)
  throw AppError.unauthorized('Invalid refresh token');
```
- Verifies against `JWT_REFRESH_TOKEN_SECRET_KEY`
- Extracts `{ userId, role }` from payload

### Step 3: Find User with Secrets
```ts
const user = await userRepository.findByIdWithSecrets(payload.userId, ['+revoked', '+hashedToken']);
if (!user || user.revoked || !user.hashedToken)
  throw AppError.unauthorized('Invalid refresh token');
```
- Checks user exists, is not revoked, and has a stored token hash

### Step 4: Compare Incoming Token
```ts
const isTokenValid = await bcryptService.compare(incomingToken, user.hashedToken);
if (!isTokenValid) throw AppError.unauthorized('Invalid refresh token');
```

### Step 5: Rotate Tokens
```ts
const accessToken = jwtService.signAccess({ userId, role });
const newRefreshToken = jwtService.signRefresh({ userId, role });
```

### Step 6: Hash and Store New Refresh Token
```ts
const hashedRefreshToken = await bcryptService.hash(newRefreshToken);
await userRepository.findByIdAndUpdate(new Types.ObjectId(userId), {
  hashedToken: hashedRefreshToken,
  revoked: false,
});
```

### Step 7: Set New Cookies
```ts
cookieService.setAuthCookies(ctx.res, { accessToken, refreshToken: newRefreshToken });
```

### Step 8: Audit Logging
```ts
logTreeStep('Tokens refreshed successfully');
```

### Returns
```ts
{
  success: true,
  status: 200,
  message: 'Tokens refreshed successfully',
  data: null,
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
| `UNAUTHORIZED` (401) | No / missing / invalid / revoked refresh token |
