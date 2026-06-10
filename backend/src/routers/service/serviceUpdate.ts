import { AppError } from '@muzammil328/server';
import { toTrpcError } from '@muzammil328/trpc';
import { serviceRepository } from '@/repository/service.repository';
import { updateServiceInputSchema } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { resolveObjectId } from '@muzammil328/db';
import { Types } from 'mongoose';

export const serviceUpdate = superAdminProcedure
  .input(updateServiceInputSchema)
  .mutation(async ({ input }) => {
    try {
      const duplicate = await serviceRepository.findOne({
        name: input.updates.name,
        _id: {
          $ne: resolveObjectId(input.id),
        },
      });

      if (duplicate) {
        throw AppError.badRequest('Service already exists');
      }

      const updated = await serviceRepository.findByIdAndUpdate(new Types.ObjectId(input.id),
        {
          name: input.updates.name,
          code: input.updates.code,
          status: input.updates.status,
          classId: input.updates.classId?.map((id: string) => new Types.ObjectId(id)),
          serviceId: input.updates.serviceId?.map((id: string) => new Types.ObjectId(id)),
          description: input.updates.description,
          creditHours: input.updates.creditHours,
          fileId: input.updates.fileId,
          pages: input.updates.pages,
          image: input.updates.image,
          order: input.updates.order,
          totalWeight: input.updates.totalWeight,
          components: input.updates.components,
        },
        {
          new: true,
        }
      );

      if (!updated) {
        throw AppError.notFound('Service not found');
      }

      return {
        success: true,
        message: 'Service updated successfully',
        data: {
          serviceId: String(updated._id),
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