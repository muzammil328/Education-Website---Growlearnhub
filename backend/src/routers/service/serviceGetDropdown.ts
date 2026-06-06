import { toTrpcError } from '@muzammil328/trpc';
import { serviceRepository } from '@/repository/service.repository';
import {
  getServiceDropdownInputSchema,
  StatusEnum,
} from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { buildMatch } from '@muzammil328/db';

export const serviceGetDropdown = superAdminProcedure
  .input(getServiceDropdownInputSchema)
  .query(async ({ input }) => {
    try {
      const { classId } = input;

      const result = await serviceRepository.aggregate({
        pipeline: serviceRepository
          .pipeline()
          .match(
            buildMatch({
              status: StatusEnum.Active,
              classId: classId,
            }),
          )
          .sort({ name: 1 })
          .project({
            _id: 0,
            value: '$_id',
            label: '$name',
          }),

      });

      return result.map((item: any) => ({
        value: String(item.value),
        label: item.label,
      }));
    } catch (e) {
      throw toTrpcError(e);
    }
  });