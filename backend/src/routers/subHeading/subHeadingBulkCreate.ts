import { toTrpcError } from '@muzammil328/trpc';
import { subHeadingRepository } from '@/repository/subHeading.repository';
import { bulkCreateSubHeadingsInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { toObjectId } from '@muzammil328/db';
import { slugify } from '@/utils';

export const subHeadingBulkCreate = superAdminProcedure
    .input(bulkCreateSubHeadingsInputSchema)
    .mutation(async ({ input }) => {
        try {
            const classId = toObjectId(input.classId);
            const bookId = toObjectId(input.bookId);
            const chapterId = toObjectId(input.chapterId);
            const headingId = toObjectId(input.headingId);

            const errors: Array<{ row: number; message: string }> = [];
            const valid: Array<Record<string, unknown>> = [];
            const usedSlugs = new Set<string>();

            for (let i = 0; i < input.items.length; i++) {
                const item = input.items[i];

                const slug = slugify(item.name);
                if (
                    usedSlugs.has(slug) ||
                    (await subHeadingRepository.findOne({ slug, classId, bookId, chapterId, headingId }))
                ) {
                    errors.push({ row: i + 1, message: `SubHeading "${item.name}" already exists in this heading` });
                    continue;
                }
                usedSlugs.add(slug);

                valid.push({
                    name: item.name,
                    slug,
                    status: item.status,
                    classId,
                    bookId,
                    chapterId,
                    headingId,
                    order: item.order,
                });
            }

            let inserted = 0;
            if (valid.length > 0) {
                const result = await subHeadingRepository.bulkInsert(valid);
                inserted = result.length;
            }

            return {
                success: true,
                message: `${inserted} subheading(s) created successfully`,
                validCount: valid.length,
                errorCount: errors.length,
                errors,
                inserted,
            };
        } catch (e) {
            throw toTrpcError(e);
        }
    });
