import { createTRPCRouter } from '@/trpc/trpc';
import { headingGetAll } from './headingGetAll';
import { headingGetDropdown } from './headingGetDropdown';
import { headingGetById } from './headingGetById';
import { headingDelete } from './headingDelete';
import { headingCreate } from './headingCreate';
import { headingUpdate } from './headingUpdate';

export const headingRouter = createTRPCRouter({
  getAll: headingGetAll,
  getDropdown: headingGetDropdown,
  getById: headingGetById,
  create: headingCreate,
  update: headingUpdate,
  delete: headingDelete,
});
