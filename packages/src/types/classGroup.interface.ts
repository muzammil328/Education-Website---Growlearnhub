import { Document, Types } from 'mongoose';

export interface IClassGroup extends Document {
  name: string;
  admin: Types.ObjectId; // usually a teacher or institution admin
  members: Types.ObjectId[]; // students or teachers
  classIds: Types.ObjectId[]; // classes linked to this group
  subscription?: Types.ObjectId; // link to Payment
  createdAt?: Date;
  updatedAt?: Date;
}
