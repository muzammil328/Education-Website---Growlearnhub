import { bootstrap } from './bootstrap';
import { logTreeStep } from '@muzammil328/services';

bootstrap().catch((error: unknown) => {
  const err = error instanceof Error ? error : new Error(String(error));
  logTreeStep(`❌ Fatal error during bootstrap: ${err.message}`);
  process.exit(1);
});
