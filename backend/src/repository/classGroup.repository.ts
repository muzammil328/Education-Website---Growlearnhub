import { IClassGroup } from '@muzammil328/education-packages/types';
import ClassGroupSchema from '../models/classGroup.model';
import { BaseRepository } from '@/config/db.config';

// ---------------- ClassGroup REPOSITORY ----------------
export class ClassGroupRepository extends BaseRepository<IClassGroup> {
  constructor() {
    super(ClassGroupSchema);
  }

  // ---------------- CUSTOM METHODS ----------------
}

export const classGroupRepository = new ClassGroupRepository();
