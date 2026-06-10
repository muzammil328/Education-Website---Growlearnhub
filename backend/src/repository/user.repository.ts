import { Types } from 'mongoose';
import UserModel from '../models/user.model';
import { IUser } from '@muzammil328/education-packages/types';
import { BaseRepository } from '@/config/db.config';

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string) {
    return this.findOne({ email: email.toLowerCase() });
  }

  async findByEmailWithAuth(email: string) {
    return this.model
      .findOne({ email: email.toLowerCase() })
      .select('+password +hashedToken +revoked +expiresToken');
  }

  async findByIdWithSecrets(id: string, fields: string[]) {
    return this.model.findById(new Types.ObjectId(id)).select(fields.join(' '));
  }

  async findByUsername(username: string) {
    return this.findOne({ username });
  }

  async findByRole(role: NonNullable<IUser['role']>, page = 1, limit = 10) {
    return this.aggregate({
      pipeline: [{ $match: { role } }, { $sort: { createdAt: -1 } }],
      page,
      limit,
    });
  }
}

export const userRepository = new UserRepository();
