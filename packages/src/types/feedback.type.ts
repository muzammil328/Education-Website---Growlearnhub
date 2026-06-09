import { FeedbackTypeEnum, FeedbackStatusEnum } from '../enums';
import mongoose from 'mongoose';

export interface IFeedback extends mongoose.Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: 'contact' | 'bug-report' | 'feature-request' | 'share-story';
  status: 'pending' | 'resolved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export type FeedbackType = typeof FeedbackTypeEnum[keyof typeof FeedbackTypeEnum];
export type FeedbackStatus = typeof FeedbackStatusEnum[keyof typeof FeedbackStatusEnum];

export interface GetFeedbacksInput {
  status?: FeedbackStatus | string;
  type?: FeedbackType | string;
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
  type: FeedbackType;
}

export interface UpdateFeedbackInput {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  type?: FeedbackType;
  status?: FeedbackStatus;
}
