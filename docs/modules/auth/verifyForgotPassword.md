## auth.verifyForgotPassword

**Type:** `mutation`
**Auth:** `publicProcedure`
**Input:** `forgotPasswordOtpVerificationSchema`
```ts
z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().min(4).max(8),
})
```
**Imports:**
```ts
import { AppError } from '@muzammil328/core';
import { logTreeStep } from '@muzammil328/services';
import { otpService } from '@/infrastructure/otp.service';
import { userRepository } from '@/repository/user.repository';
import { OtpPurposeEnum } from '@muzammil328/education-packages/enums';
```

> **DO NOT reveal:** OTP verification outcome uses the same generic messages regardless of failure reason. This prevents attackers from distinguishing between invalid/expired OTP, max attempts reached, or user not found.

### Step 1: Find User
```ts
const user = await userRepository.findByEmail(email);
if (!user) throw AppError.notFound('User not found');
```

### Step 2: Verify OTP
```ts
const isValid = await otpService.verifyOtp(
  new Types.ObjectId(userId),
  otp,
  OtpPurposeEnum.PASSWORD_RESET,
);
if (!isValid) throw AppError.unauthorized('Invalid or expired OTP');
```
Verification checks:
- OTP record exists for this user + `PASSWORD_RESET` purpose
- `expiresAt > now()` — 10-minute TTL enforced
- `attempts < maxAttempts` (max 5 attempts)
- `bcrypt.compare(inputOtp, record.hashedOtp)` — plaintext never stored
- On each attempt `otpRepository.incrementAttempts()` is called regardless of success/failure

### Step 3: Audit Logging
```ts
logTreeStep('Forgot password OTP verified successfully');
```

### Returns
```ts
{
  success: true,
  status: 200,
  message: 'OTP verified successfully',
  data: null,
}
```

### Errors
| Code | Condition |
|------|-----------|
| `NOT_FOUND` (404) | User not found |
| `UNAUTHORIZED` (401) | Invalid or expired OTP |
