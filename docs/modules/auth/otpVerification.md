## auth.otpVerification

**Type:** `mutation`
**Auth:** `publicProcedure`
**Input:** `otpVerificationSchema`
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

> **DO NOT reveal:** OTP verification outcome should not differentiate between "user not found" and "invalid OTP" in production error messages. The service already throws generic messages.

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
  OtpPurposeEnum.EMAIL_VERIFICATION,
);
if (!isValid) throw AppError.unauthorized('Invalid or expired OTP');
```
Verification checks:
- OTP record exists for this user + `EMAIL_VERIFICATION` purpose
- `expiresAt > now()` — 10-minute TTL enforced
- `attempts < maxAttempts` (max 5 attempts)
- `bcrypt.compare(inputOtp, record.hashedOtp)` — plaintext never stored
- On each attempt `otpRepository.incrementAttempts()` is called regardless of success/failure

### Step 3: Audit Logging
```ts
logTreeStep('OTP verified successfully');
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
