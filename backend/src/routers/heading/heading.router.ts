import { createTRPCRouter } from '@/trpc/trpc';
import { headingGetAll } from './headingGetAll';
import { headingGetDropdown } from './headingGetDropdown';
import { headingGetById } from './headingGetById';
import { headingDelete } from './headingDelete';
import { headingGetBySlug } from './headingGetBySlug';
import { headingCreate } from './headingCreate';
import { headingUpdate } from './headingUpdate';

export const headingRouter = createTRPCRouter({
  getAll: headingGetAll,
  getDropdown: headingGetDropdown,
  getById: headingGetById,
  getBySlug: headingGetBySlug,
  create: headingCreate,
  update: headingUpdate,
  delete: headingDelete,
});
