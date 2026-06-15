import { toTrpcError } from '@muzammil328/trpc';
import { headingRepository } from '@/repository/heading.repository';
import { bulkCreateHeadingsInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { buildMatch, toObjectId } from '@muzammil328/db';
import { slugify } from '@/utils';

export const headingBulkCreate = superAdminProcedure
    .input(bulkCreateHeadingsInputSchema)
    .mutation(async ({ input }) => {
        try {
            const classId = input.classId ? toObjectId(input.classId) : undefined;
            const bookId = toObjectId(input.bookId);
            const chapterId = input.chapterId ? toObjectId(input.chapterId) : undefined;

            const errors: Array<{ row: number; message: string }> = [];
            const valid: Array<Record<string, unknown>> = [];
            const usedSlugs = new Set<string>();

            for (let i = 0; i < input.items.length; i++) {
                const item = input.items[i];

                const slug = slugify(item.name);
                if (
                    usedSlugs.has(slug) ||
                    (await headingRepository.findOne(buildMatch({ slug, classId, bookId, chapterId })))
                ) {
                    errors.push({ row: i + 1, message: `Heading "${item.name}" already exists in this chapter` });
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
                    order: item.order,
                });
            }

            let inserted = 0;
            if (valid.length > 0) {
                const result = await headingRepository.bulkInsert(valid);
                inserted = result.length;
            }

            return {
                success: true,
                message: `${inserted} heading(s) created successfully`,
                validCount: valid.length,
                errorCount: errors.length,
                errors,
                inserted,
            };
        } catch (e) {
            throw toTrpcError(e);
        }
    });
