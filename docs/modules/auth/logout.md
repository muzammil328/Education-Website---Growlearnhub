## auth.logout

**Type:** `mutation`
**Auth:** `protectedProcedure`
**Input:** none (`z.void()`)
**Imports:**
```ts
import { AppError } from '@muzammil328/core';
import { Types } from 'mongoose';
import { logTreeStep } from '@muzammil328/services';
import { authService } from '../services/auth.service';
import { cookieService } from '@/infrastructure/cookie.service';
```

> **DO NOT reveal:** The procedure silently succeeds (returns 200) even if the refresh token was already revoked — the client's cookies are still cleared.

### Step 1: Validate User ID
```ts
const userId = ctx.user?.userId;
if (!userId || !Types.ObjectId.isValid(userId)) {
  throw AppError.unauthorized('Invalid user ID');
}
```

### Step 2: Revoke Refresh Token
```ts
const user = await userRepository.findByIdAndUpdate(
  new Types.ObjectId(userId),
  { revoked: true, hashedToken: '', expiresToken: null },
  { new: true },
);
if (!user) throw AppError.notFound('User not found');
```

### Step 3: Clear Cookies
```ts
cookieService.clearAuthCookies(ctx.res);
```
- Clears both `accessToken` and `refreshToken` cookies with `path: '/'`

### Step 4: Audit Logging
```ts
logTreeStep('User logged out successfully');
```

### Returns
```ts
{
  success: true,
  status: 200,
  message: 'Logged out successfully',
  data: null,
}
```

### Errors
| Code | Condition |
|------|-----------|
| `UNAUTHORIZED` (401) | Invalid user ID |
| `NOT_FOUND` (404) | User not found |
