import { toTrpcError } from '@muzammil328/trpc';
import { classRepository } from '@/repository/class.repository';
import { dropdownClassInputSchema, StatusEnum } from '@muzammil328/education-packages';
import { superAdminProcedure } from '@/trpc/trpc';
import { Types } from 'mongoose';

export const classGetDropdown = superAdminProcedure
    .input(dropdownClassInputSchema)
    .query(async ({ input }) => {
        try {
            const serviceId = input.serviceId;

            const result = await classRepository.aggregate<{
                value: Types.ObjectId;
                label: string;
            }>([
                {
                    $match: {
                        status: StatusEnum.Active,

                        ...(serviceId
                            ? {
                                serviceIds: serviceId,
                            }
                            : {}),
                    },
                },

                {
                    $sort: {
                        name: 1,
                    },
                },

                {
                    $project: {
                        _id: 0,
                        value: '$_id',
                        label: '$name',
                    },
                },
            ]);

            return result.map((item: any) => ({
                value: String(item.value),
                label: item.label,
            }));
        } catch (e) {
            throw toTrpcError(e);
        }
    });