import { BACKEND_SECURITY_CONFIG } from '@muzammil328/types';
import { createBcrypt } from '@muzammil328/services';

export const bcryptService = createBcrypt({
  saltRounds: BACKEND_SECURITY_CONFIG.BCRYPT_SALT_ROUNDS_DEFAULT,
});
