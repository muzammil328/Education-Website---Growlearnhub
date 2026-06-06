import ClassModel from '../models/class.model';
import ServiceModel from '../models/service.model';
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
    image: 'https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg',
    keywords: ['books', 'onlineTest', 'notes', 'dateSheet', 'pairingScheme', 'result'],
    status: 'active',
    order: 1,
  },
  {
    name: 'Class 10',
    slug: 'class-10',
    description: 'Tenth grade curriculum',
    image: 'https://www.mamp.one/wp-content/uploads/2024/09/image-resources2.jpg',
    keywords: ['books', 'onlineTest', 'mcqs', 'notes', 'dateSheet', 'pairingScheme', 'result'],
    status: 'active',
    order: 2,
  },
  {
    name: 'Class 11',
    slug: 'class-11',
    description: 'Eleventh grade curriculum',
    image: 'https://cloudinary-marketing-res.cloudinary.com/image/upload/w_1300/q_auto/f_auto/hiking_dog_mountain',
    keywords: ['books', 'onlineTest', 'mcqs', 'notes', 'dateSheet', 'pairingScheme', 'result'],
    status: 'active',
    order: 3,
  },
  {
    name: 'Class 12',
    slug: 'class-12',
    description: 'Twelfth grade curriculum',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9wl5xfVuzRmBNbqj8mKwsqAKwptQPO3LE7Q&s',
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

export async function linkClassServices() {
  try {
    console.log('Linking services to classes...');

    const allServices = await ServiceModel.find({ status: 'active' });
    if (!allServices.length) {
      console.log('No services found — run service seeder first.');
      return;
    }

    const serviceIds = allServices.map(s => s._id);
    const result = await ClassModel.updateMany(
      { status: 'active' },
      { $set: { serviceId: serviceIds } },
    );

    console.log(`Linked ${serviceIds.length} services to ${result.modifiedCount} classes.`);
  } catch (error) {
    console.error('Error linking services to classes:', error);
    throw error;
  }
}
