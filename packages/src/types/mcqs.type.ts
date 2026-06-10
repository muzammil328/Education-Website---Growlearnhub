import type { DifficultyLevel, McqScopeValue } from '../enums';
import type { Status } from '../enums';
import { Document, Types } from 'mongoose';

export interface IMcqs extends Document {
  name: string;
  slug: string;
  description?: string;
  classId: Types.ObjectId;
  bookId: Types.ObjectId;
  chapterId: Types.ObjectId;
  headingId?: Types.ObjectId;
  subHeadingId?: Types.ObjectId;
  scope: McqScopeValue;
  institutionId?: Types.ObjectId;
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string;
  difficulty: DifficultyLevel;
  aiHint?: string;
  status: Status;
  totalOptions?: number; // virtual field
  isPremium?: boolean; // ✅ new field
  createdAt?: Date;
  updatedAt?: Date;
}
