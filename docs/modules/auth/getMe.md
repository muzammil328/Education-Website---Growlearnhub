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
