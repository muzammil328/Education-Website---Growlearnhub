import { createTRPCRouter } from '@/trpc/trpc';
import { bookGetAll } from './bookGetAll';
import { bookGetDropdown } from './bookGetDropdown';
import { bookGetById } from './bookGetById';
import { bookDelete } from './bookDelete';
import { bookGetBySlug } from './bookGetBySlug';
import { bookCreate } from './bookCreate';
import { bookUpdate } from './bookUpdate';

export const bookRouter = createTRPCRouter({
  getAll: bookGetAll,
  getDropdown: bookGetDropdown,
  getById: bookGetById,
  getBySlug: bookGetBySlug,
  create: bookCreate,
  update: bookUpdate,
  delete: bookDelete,
});
