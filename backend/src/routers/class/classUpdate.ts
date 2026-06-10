import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { classRepository } from '@/repository/class.repository';
import { updateClassInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { parseObjectIdList, resolveObjectId } from '@muzammil328/db';
import { Types } from 'mongoose';

export const classUpdate = superAdminProcedure
    .input(updateClassInputSchema)
    .mutation(async ({ input }) => {
      try {
        const duplicate = await classRepository.findOne({
          name: input.updates.name,
          _id: {
            $ne: resolveObjectId(input.id),
          },
        });

        if (duplicate) {
          throw AppError.badRequest('Class already exists');
        }

        const updated = await classRepository.findByIdAndUpdate(new Types.ObjectId(input.id),
          {
            ...input.updates,
            serviceId: parseObjectIdList(input.updates.serviceIds),
          },
          {
            new: true,
          }
        );

        if (!updated) {
          throw AppError.notFound('Class not found');
        }

        return {
          success: true,
          message: 'Class updated successfully',
          data: {
            classId: String(updated._id),
            name: updated.name,
            description: updated.description,
            status: updated.status,
            serviceIds: (updated.serviceId ?? []).map(
              (id: Types.ObjectId | string) => String(id)
            ),
            image: updated.image,
            keywords: updated.keywords ?? [],
          },
        };
      } catch (e) {
        throw toTrpcError(e);
      }
    });