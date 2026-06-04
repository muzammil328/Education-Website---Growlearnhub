## auth.register

### Overview
**Type:** `mutation`
**Auth:** `publicProcedure`

### Input Schema (registerSchema)
```ts
// packages/src/schemas/auth.schema.ts
```

### Steps

1. **Validate Email Uniqueness** — Check that no existing user has the same email.
2. **Validate Username Uniqueness** — Check that no existing user has the same username.
3. **Hash Password** — Hash the plaintext password via `bcryptService.hash`.
4. **Create User** — Persist the new user in the database.
5. **Create OTP** — Generate and store a verification OTP. Prior unexpired OTPs for this user+purpose are deleted first.
6. **Send Verification Email** — Dispatch the OTP to the user's email via `sendVerificationOtp`.
7. **Audit Logging** — Log the registration event.

### Returns
```ts
{
  success: true,
  status: 201,
  message: 'Registration successful',
  data: {
    userId: string,
    username: string,
    email: string,
    role: string,
  },
}
```

### Errors
| Code | Condition |
|------|-----------|
| `CONFLICT` (409) | Email already exists |
| `CONFLICT` (409) | Username already taken |

### Dependencies
```ts
import { AppError } from '@muzammil328/core';
import { logTreeStep } from '@muzammil328/services';
import { sendVerificationOtp } from '@/infrastructure/email.service';
import { bcryptService } from '@/infrastructure/bcrypt.service';
import { otpService } from '@/infrastructure/otp.service';
import { userRepository } from '@/repository/user.repository';
import { RoleEnum, OtpPurposeEnum } from '@muzammil328/education-packages/enums';
import { type AuthRegisterFormValues, AuthRegisterResponse, registerSchema } from '@muzammil328/education-packages';
```

### Notes

> **Full delete:** OTP uses `otpRepository.deleteManyByUserAndPurpose()` before creating a new one — any prior unexpired OTPs for this user+purpose are removed.

> **DO NOT reveal:** The plaintext OTP is returned only to the service caller. It is sent to the user's email, never exposed in API responses.
