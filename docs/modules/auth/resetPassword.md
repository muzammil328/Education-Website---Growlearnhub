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
