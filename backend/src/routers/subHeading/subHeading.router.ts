import { createTRPCRouter } from '@/trpc/trpc';
import { subHeadingGetAll } from './subHeadingGetAll';
import { subHeadingGetDropdown } from './subHeadingGetDropdown';
import { subHeadingGetById } from './subHeadingGetById';
import { subHeadingDelete } from './subHeadingDelete';
import { subHeadingCreate } from './subHeadingCreate';
import { subHeadingUpdate } from './subHeadingUpdate';
import { subHeadingBulkCreate } from './subHeadingBulkCreate';

export const subHeadingRouter = createTRPCRouter({
  getAll: subHeadingGetAll,
  getDropdown: subHeadingGetDropdown,
  getById: subHeadingGetById,
  create: subHeadingCreate,
  update: subHeadingUpdate,
  delete: subHeadingDelete,
  bulkCreate: subHeadingBulkCreate,
});
