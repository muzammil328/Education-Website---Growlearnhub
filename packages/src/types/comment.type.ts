import mongoose from 'mongoose';

export interface IComment extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  pageUrl?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
