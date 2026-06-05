import ClassModel from '../models/class.model';
import { slugify } from '@muzammil328/utils';

interface ClassData {
  name: string;
  slug: string;
  keywords?: string[];
  description: string;
  image?: string;
  status: 'active' | 'inactive';
  order?: number;
}

export const classes: ClassData[] = [
  {
    name: 'Class 9',
    slug: 'class-9',
    description: 'Ninth grade curriculum',
    keywords: ['books', 'onlineTest', 'notes', 'dateSheet', 'pairingScheme', 'result'],
    status: 'active',
    order: 1,
  },
  {
    name: 'Class 10',
    slug: 'class-10',
    description: 'Tenth grade curriculum',
    keywords: ['books', 'onlineTest', 'mcqs', 'notes', 'dateSheet', 'pairingScheme', 'result'],
    status: 'active',
    order: 2,
  },
  {
    name: 'Class 11',
    slug: 'class-11',
    description: 'Eleventh grade curriculum',
    keywords: ['books', 'onlineTest', 'mcqs', 'notes', 'dateSheet', 'pairingScheme', 'result'],
    status: 'active',
    order: 3,
  },
  {
    name: 'Class 12',
    slug: 'class-12',
    description: 'Twelfth grade curriculum',
    keywords: ['books', 'onlineTest', 'mcqs', 'notes', 'dateSheet', 'pairingScheme', 'result'],
    status: 'active',
    order: 4,
  },
];

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function seedClasses() {
  let createdCount = 0;
  let updatedCount = 0;

  try {
    console.log('Starting Class seed...');
    const skipped: string[] = [];

    for (const raw of classes) {
      const classSlug = raw.slug || slugify(raw.name);
      const classNameRegex = new RegExp(`^${escapeRegex(raw.name)}$`, 'i');

      const existingClass = await ClassModel.findOne({
        $or: [{ slug: classSlug }, { name: classNameRegex }],
      });

      if (existingClass) {
        existingClass.name = raw.name;
        existingClass.description = raw.description;
        existingClass.image = raw.image;
        existingClass.status = raw.status ?? 'active';
        existingClass.keywords = raw.keywords;
        await existingClass.save();
        updatedCount += 1;
        console.log(`Updated Class: ${raw.name}`);
        continue;
      }

      await ClassModel.create({
        name: raw.name,
        slug: classSlug,
        description: raw.description,
        image: raw.image,
        status: raw.status ?? 'active',
        keywords: raw.keywords,
      });

      createdCount += 1;
      console.log(`Created Class: ${raw.name}`);
    }

    console.log('Class seeding completed.');
    console.log(`Created: ${createdCount}, Updated: ${updatedCount}, Skipped: ${skipped.length}`);
  } catch (error) {
    console.error('Error seeding Classes:', error);
    throw error;
  }
}
