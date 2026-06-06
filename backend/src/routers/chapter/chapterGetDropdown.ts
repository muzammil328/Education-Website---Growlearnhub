import { toTrpcError } from '@muzammil328/trpc';
import { chapterRepository } from '@/repository/chapter.repository';
import {
  getChapterDropdownInputSchema,
  StatusEnum,
} from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { buildMatch, toObjectId } from '@muzammil328/db';

export const chapterGetDropdown = superAdminProcedure
  .input(getChapterDropdownInputSchema)
  .query(async ({ input }) => {
    try {
      const { classId } = input;

      if(!classId) {
        throw new Error('Class ID is required');
      }

      const result = await chapterRepository.aggregate({
        pipeline: chapterRepository
          .pipeline()
          .match(
            buildMatch({
              status: StatusEnum.Active,
              classId: toObjectId(classId)
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