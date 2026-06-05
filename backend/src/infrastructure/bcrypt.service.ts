import { SECURITY_CONFIG } from '@muzammil328/types';
import { createBcrypt } from '@muzammil328/services';

export const bcryptService = createBcrypt({
  saltRounds: SECURITY_CONFIG.BCRYPT_SALT_ROUNDS_DEFAULT,
});
