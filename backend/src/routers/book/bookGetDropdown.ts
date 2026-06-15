import { toTrpcError } from '@muzammil328/trpc';
import { bookRepository } from '@/repository/book.repository';
import {
  getBookDropdownInputSchema,
  StatusEnum,
} from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { buildMatch } from '@muzammil328/db';

export const bookGetDropdown = superAdminProcedure
  .input(getBookDropdownInputSchema)
  .query(async ({ input }) => {
    try {
      const { classId, noClass } = input;

      const match: Record<string, unknown> = buildMatch({
        status: StatusEnum.Active,
        classId: noClass ? undefined : classId,
      });

      if (noClass) {
        match.$or = [{ classId: { $exists: false } }, { classId: null }];
      }

      const result = await bookRepository.aggregate({
        pipeline: bookRepository
          .pipeline()
          .match(match)
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