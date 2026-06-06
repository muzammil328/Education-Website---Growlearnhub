import { createTRPCRouter } from '@/trpc/trpc';
import { subHeadingGetAll } from './subHeadingGetAll';
import { subHeadingGetDropdown } from './subHeadingGetDropdown';
import { subHeadingGetById } from './subHeadingGetById';
import { subHeadingDelete } from './subHeadingDelete';
import { subHeadingGetBySlug } from './subHeadingGetBySlug';
import { subHeadingCreate } from './subHeadingCreate';
import { subHeadingUpdate } from './subHeadingUpdate';

export const subHeadingRouter = createTRPCRouter({
  getAll: subHeadingGetAll,
  getDropdown: subHeadingGetDropdown,
  getById: subHeadingGetById,
  getBySlug: subHeadingGetBySlug,
  create: subHeadingCreate,
  update: subHeadingUpdate,
  delete: subHeadingDelete,
});
