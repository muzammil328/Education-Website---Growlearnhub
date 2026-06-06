import { toTrpcError } from '@muzammil328/trpc';
import { classRepository } from '@/repository/class.repository';
import {
  dropdownClassInputSchema,
  StatusEnum,
} from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { buildMatch } from '@muzammil328/db';

export const classGetDropdown = superAdminProcedure
  .input(dropdownClassInputSchema)
  .query(async ({ input }) => {
    try {
      const { serviceId } = input;

      const result = await classRepository.aggregate({
        pipeline: classRepository
          .pipeline()
          .match(
            buildMatch({
              status: StatusEnum.Active,
              serviceIds: serviceId,
            }),
          )
          .sort({ name: 1 })
          .project({
            _id: 0,
            value: '$_id',
            label: '$name',
          }),

        // no search/pagination needed here
      });

      return result.map((item: any) => ({
        value: String(item.value),
        label: item.label,
      }));
    } catch (e) {
      throw toTrpcError(e);
    }
  });