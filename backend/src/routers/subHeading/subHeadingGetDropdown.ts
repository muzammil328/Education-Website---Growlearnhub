import { toTrpcError } from '@muzammil328/trpc';
import { subHeadingRepository } from '@/repository/subHeading.repository';
import {
  getSubHeadingDropdownInputSchema,
  StatusEnum,
} from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { buildMatch } from '@muzammil328/db';

export const subHeadingGetDropdown = superAdminProcedure
  .input(getSubHeadingDropdownInputSchema)
  .query(async ({ input }) => {
    try {
      const { classId } = input;

      const result = await subHeadingRepository.aggregate({
        pipeline: subHeadingRepository
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