import { toTrpcError } from '@muzammil328/trpc';
import { boardRepository } from '@/repository/board.repository';
import {
  getBoardDropdownInputSchema,
  StatusEnum,
} from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { buildMatch, toObjectId } from '@muzammil328/db';

export const boardGetDropdown = superAdminProcedure
  .input(getBoardDropdownInputSchema)
  .query(async ({ input }) => {
    try {
      const { classId } = input;
      if(!classId) {
        throw new Error('classId is required');
      }

      const result = await boardRepository.aggregate({
        pipeline: boardRepository
          .pipeline()
          .match(
            buildMatch({
              status: StatusEnum.Active,
              classId: toObjectId(classId),
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