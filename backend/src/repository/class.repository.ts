import { StatusEnum } from '@muzammil328/education-packages';
import ClassModel, { IClass } from '../models/class.model';
import { BaseRepository } from '@/config/db.config';

export class ClassRepository extends BaseRepository<IClass> {
  constructor() {
    super(ClassModel);
  }

  // ── Query builder entry point ─────────────────────────────────────────────
  classQuery() {
    return this.pipeline();
  }

  // ── Finders ───────────────────────────────────────────────────────────────

  async findBySlug(slug: string) {
    return this.findOne({ slug: slug.toLowerCase() });
  }

  async findActive() {
    return this.findAll({ query: { status: StatusEnum.Active } });
  }

  async findByServiceSlug(serviceSlug: string) {
    const normalized = serviceSlug.trim().toLowerCase();
    const escaped    = serviceSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return this.aggregate<{ name: string; slug: string }>({
      pipeline: this.pipeline()
        .match({ status: StatusEnum.Active })
        .append({
          $lookup: {
            from: 'services',
            let:  { serviceIds: '$serviceId' },
            pipeline: [
              {
                $match: {
                  $expr: { $in: ['$_id', '$$serviceIds'] },
                  status: StatusEnum.Active,
                  $or: [
                    { slug: normalized },
                    { name: { $regex: `^${escaped}$`, $options: 'i' } },
                  ],
                },
              },
              { $project: { _id: 1 } },
            ],
            as: 'matchedServices',
          },
        })
        .match({ 'matchedServices.0': { $exists: true } })
        .project({ _id: 0, name: 1, slug: 1 })
        .sort({ name: 1 }),
    });
  }
}

export const classRepository = new ClassRepository();