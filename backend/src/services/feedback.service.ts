import { AppError } from '@muzammil328/server';
import { Types } from 'mongoose';
import { feedbackRepository } from '../repository/feedback.repository';

export interface GetFeedbacksInput {
  status?: string;
  type?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortDirection?: 'asc' | 'desc' | 'ASC' | 'DESC';
}

export interface CreateFeedbackInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: 'contact' | 'bug-report' | 'feature-request';
}

export interface UpdateFeedbackInput {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  type?: 'contact' | 'bug-report' | 'feature-request';
  status?: 'pending' | 'resolved' | 'rejected';
}

export const feedbackService = {
  async getAll(input: GetFeedbacksInput) {
    const sortOrder: 1 | -1 = input.sortDirection?.toUpperCase() === 'DESC' ? -1 : 1;
    const sort = input.sort ?? 'createdAt';

    const match: Record<string, string> = {};
    if (input.status) match.status = input.status;
    if (input.type) match.type = input.type;

    return feedbackRepository.aggregate({
      pipeline: [
        { $match: match },
        { $sort: { [sort]: sortOrder } },
        {
          $project: {
            _id: 0,
            feedbackId: '$_id',
            name: 1,
            email: 1,
            phone: 1,
            message: 1,
            type: 1,
            status: 1,
            createdAt: 1,
          },
        },
      ],
      page: input.page ?? 1,
      limit: input.limit ?? 10,
    });
  },

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw AppError.badRequest('Invalid feedback ID format');
    }

    const result = await feedbackRepository.findById(new Types.ObjectId(id));

    if (!result) {
      throw AppError.notFound('Feedback not found');
    }

    return result;
  },

  async getByType(type: 'contact' | 'bug-report' | 'feature-request') {
    return feedbackRepository.findByType(type);
  },

  async getByStatus(status: 'pending' | 'resolved' | 'rejected') {
    return feedbackRepository.findByStatus(status);
  },

  async create(input: CreateFeedbackInput) {
    const { name, email, phone, message, type } = input;

    if (!name || !email || !message || !type) {
      throw AppError.badRequest('Name, email, message and type are required');
    }

    return feedbackRepository.create({
      name,
      email,
      phone,
      message,
      type,
      status: 'pending',
    });
  },

  async update(input: UpdateFeedbackInput) {
    const { id, name, email, phone, message, type, status } = input;

    if (!id) {
      throw AppError.badRequest('Invalid feedback ID');
    }

    const updateData: Record<string, string> = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (message) updateData.message = message;
    if (type) updateData.type = type;
    if (status) updateData.status = status;

    const updated = await feedbackRepository.findByIdAndUpdate(new Types.ObjectId(id), updateData, { new: true });

    if (!updated) {
      throw AppError.notFound('Feedback not found');
    }

    return updated;
  },

  async updateStatus(id: string, status: 'pending' | 'resolved' | 'rejected') {
    if (!id) {
      throw AppError.badRequest('Invalid feedback ID');
    }

    const updated = await feedbackRepository.findByIdAndUpdate(new Types.ObjectId(id), { status }, { new: true });

    if (!updated) {
      throw AppError.notFound('Feedback not found');
    }

    return updated;
  },

  async delete(id: string) {
    if (!id) {
      throw AppError.badRequest('Invalid feedback ID');
    }

    const deleted = await feedbackRepository.findByIdAndDelete(new Types.ObjectId(id));

    if (!deleted) {
      throw AppError.notFound('Feedback not found');
    }

    return deleted;
  },
};
