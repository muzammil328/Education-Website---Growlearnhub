import { createTRPCRouter } from '@/trpc/trpc';
import { classCreate } from './classCreate';
import { classGetAll } from './classGetAll';
import { classGetById } from './classGetById';
import { classUpdate } from './classUpdate';
import { classDelete } from './classDelete';
import { classGetDropdown } from './classGetDropdown';

export const classRouter = createTRPCRouter({
  create: classCreate,
  getAll: classGetAll,
  getDropdown: classGetDropdown,
  getById: classGetById,
  
  update: classUpdate,
  delete: classDelete,
});