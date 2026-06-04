## auth.forgotPassword

**Type:** `mutation`
**Auth:** `publicProcedure`
**Input:** `forgotPasswordSchema`
```ts
z.object({
  email: z.string().email('Invalid email address'),
})
```
**Imports:**
```ts
import { AppError } from '@muzammil328/core';
import { logTreeStep } from '@muzammil328/services';
import { sendPasswordResetOtp } from '@/infrastructure/email.service';
import { otpService } from '@/infrastructure/otp.service';
import { userRepository } from '@/repository/user.repository';
import { OtpPurposeEnum } from '@muzammil328/education-packages/enums';
```

> **DO NOT reveal:** The response is identical regardless of whether the email exists. This prevents email enumeration. The message `OTP sent to email` is returned even when the user is not found — no OTP is actually sent in that case.

> **Full delete:** OTP uses `otpRepository.deleteManyByUserAndPurpose()` before creating a new one — any prior unexpired PASSWORD_RESET OTPs for this user are removed.

### Step 1: Find User
```ts
const user = await userRepository.findByEmail(email);
if (!user) throw AppError.notFound('User not found');
```

### Step 2: Create OTP
```ts
const { otp } = await otpService.createOtp(
  new Types.ObjectId(userId),
  OtpPurposeEnum.PASSWORD_RESET,
);
```
- `otpRepository.deleteManyByUserAndPurpose()` — removes existing PASSWORD_RESET OTPs
- `crypto.randomInt(0, 10⁶)` — 6-digit numeric OTP, zero-padded
- `bcryptService.hash(otp)` — bcrypt-hashed before storage
- `otpRepository.create({ hashedOtp, expiresAt, purpose: PASSWORD_RESET, attempts: 0, maxAttempts: 5 })`
- TTL: 10 minutes

### Step 3: Send Password Reset Email
```ts
await sendPasswordResetOtp({ email, username: user.username, otp });
```
- Subject: `Growlearnhub password reset code`
- Template: `passwordResetCode`
- Context: `{ username, otp, year: new Date().getFullYear() }`

### Step 4: Audit Logging
```ts
logTreeStep('Password reset OTP sent successfully');
```

### Returns
```ts
{
  success: true,
  status: 200,
  message: 'OTP sent to email',
  data: null,
}
```

### Environment Variables

| Variable | Default | Required | Description |
|----------|---------|----------|-------------|
| `SMTP_HOST` | `smtp.gmail.com` | No | Email server host |
| `SMTP_PORT` | `465` | No | Email server port |
| `SMTP_USER` | — | No | SMTP authentication user |
| `SMTP_PASS` | — | No | SMTP authentication password |
| `SMTP_FROM` | — | No | Sender email address |

### Errors
| Code | Condition |
|------|-----------|
| `NOT_FOUND` (404) | User not found |
