import { createTRPCRouter } from '@/trpc/trpc';
import { classCreate } from './classCreate';
import { classGetAll } from './classGetAll';
import { classGetById } from './classGetById';
import { classUpdate } from './classUpdate';
import { classDelete } from './classDelete';
import { classGetDropdown } from './classGetDropdown';
import { classGetByServiceSlug } from './classGetByServiceSlug';

export const classRouter = createTRPCRouter({
  create: classCreate,
  getAll: classGetAll,
  getDropdown: classGetDropdown,
  getById: classGetById,
  getByServiceSlug: classGetByServiceSlug,
  
  update: classUpdate,
  delete: classDelete,
});