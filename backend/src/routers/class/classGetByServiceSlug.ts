import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { classRepository } from '@/repository/class.repository';
import { getClassByServiceSlugInputSchema } from '@muzammil328/education-packages';
import { publicProcedure } from '@/trpc/trpc';

export const classGetByServiceSlug = publicProcedure
    .input(getClassByServiceSlugInputSchema)
    .query(async ({ input }) => {
        try {
            const serviceSlug = input.serviceSlug.trim();
            if (serviceSlug) {
                throw AppError.badRequest('Service slug is required');
            }

            const result = await classRepository.findByServiceSlug(serviceSlug);

            return result;
        } catch (e) {
            throw toTrpcError(e);
        }
    });