import { StatusEnum } from '@muzammil328/education-packages';
import ClassModel, { IClass } from '../models/class.model';
import { BaseRepository } from '@/config/db.config';

export class ClassRepository extends BaseRepository<IClass> {
  constructor() {
    super(ClassModel);
  }

}

export const classRepository = new ClassRepository();