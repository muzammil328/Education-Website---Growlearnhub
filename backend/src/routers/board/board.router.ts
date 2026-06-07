import { createTRPCRouter } from '@/trpc/trpc';
import { boardGetAll } from './boardGetAll';
import { boardGetDropdown } from './boardGetDropdown';
import { boardGetById } from './boardGetById';
import { boardDelete } from './boardDelete';
import { boardCreate } from './boardCreate';
import { boardUpdate } from './boardUpdate';

export const boardRouter = createTRPCRouter({
  getAll: boardGetAll,
  getDropdown: boardGetDropdown,
  getById: boardGetById,
  create: boardCreate,
  update: boardUpdate,
  delete: boardDelete,
});
