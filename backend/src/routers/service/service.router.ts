import { createTRPCRouter } from '@/trpc/trpc';
import { serviceGetAll } from './serviceGetAll';
import { serviceGetDropdown } from './serviceGetDropdown';
import { serviceGetById } from './serviceGetById';
import { serviceDelete } from './serviceDelete';
import { serviceGetBySlug } from './serviceGetBySlug';
import { serviceCreate } from './serviceCreate';
import { serviceUpdate } from './serviceUpdate';

export const serviceRouter = createTRPCRouter({
  getAll: serviceGetAll,
  getDropdown: serviceGetDropdown,
  getById: serviceGetById,
  getBySlug: serviceGetBySlug,
  create: serviceCreate,
  update: serviceUpdate,
  delete: serviceDelete,
});
