import { createTRPCRouter } from '@/trpc/trpc';
import { chapterGetAll } from './chapterGetAll';
import { chapterGetDropdown } from './chapterGetDropdown';
import { chapterGetById } from './chapterGetById';
import { chapterDelete } from './chapterDelete';
import { chapterGetBySlug } from './chapterGetBySlug';
import { chapterCreate } from './chapterCreate';
import { chapterUpdate } from './chapterUpdate';

export const chapterRouter = createTRPCRouter({
  getAll: chapterGetAll,
  getDropdown: chapterGetDropdown,
  getById: chapterGetById,
  getBySlug: chapterGetBySlug,
  create: chapterCreate,
  update: chapterUpdate,
  delete: chapterDelete,
});
