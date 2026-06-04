import type { Document } from 'mongoose';
import { Types } from 'mongoose';
import { InstitutionTypeEnum, SubscriptionPlanEnum } from '../enums';

export type InstitutionType = (typeof InstitutionTypeEnum)[keyof typeof InstitutionTypeEnum];
export type SubscriptionPlan = (typeof SubscriptionPlanEnum)[keyof typeof SubscriptionPlanEnum];

export interface IInstitution extends Document {
  name: string;
  type: InstitutionType;
  email: string;
  phone?: string;
  address?: string;
  logo?: string;
  website?: string;
  classes: Types.ObjectId[];
  subscriptionPlan: SubscriptionPlan;
  subscriptionExpiresAt?: Date;
  maxStudents: number;
  maxTeachers: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
