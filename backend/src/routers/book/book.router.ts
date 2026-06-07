import { createTRPCRouter } from '@/trpc/trpc';
import { bookGetAll } from './bookGetAll';
import { bookGetDropdown } from './bookGetDropdown';
import { bookGetById } from './bookGetById';
import { bookDelete } from './bookDelete';
import { bookCreate } from './bookCreate';
import { bookUpdate } from './bookUpdate';

export const bookRouter = createTRPCRouter({
  getAll: bookGetAll,
  getDropdown: bookGetDropdown,
  getById: bookGetById,
  create: bookCreate,
  update: bookUpdate,
  delete: bookDelete,
});
