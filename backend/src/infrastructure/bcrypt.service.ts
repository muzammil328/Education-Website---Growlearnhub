import { BACKEND_SECURITY_CONFIG, createBcrypt } from '@muzammil328/core';

export const bcryptService = createBcrypt({
  saltRounds: BACKEND_SECURITY_CONFIG.BCRYPT_SALT_ROUNDS_DEFAULT,
});
