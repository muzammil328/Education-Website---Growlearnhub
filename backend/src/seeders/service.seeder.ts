import ServiceModel from '../models/service.model';
import ClassModel from '../models/class.model';
import { slugify } from '@muzammil328/utils';

const img1 = 'https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg';
const img2 = 'https://www.mamp.one/wp-content/uploads/2024/09/image-resources2.jpg';
const img3 = 'https://cloudinary-marketing-res.cloudinary.com/image/upload/w_1300/q_auto/f_auto/hiking_dog_mountain';
const img4 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9wl5xfVuzRmBNbqj8mKwsqAKwptQPO3LE7Q&s';

const SERVICE_TYPES = [
  { name: 'Online Test', description: 'Online tests and quizzes for exam preparation', keywords: ['online test', 'quiz', 'exam', 'practice'], image: img1 },
  { name: 'MCQs', description: 'Chapter-wise multiple choice questions', keywords: ['mcqs', 'multiple choice', 'questions', 'quiz'], image: img2 },
  { name: 'Books', description: 'Textbooks and study material', keywords: ['books', 'textbook', 'study material'], image: img3 },
  { name: 'Past Paper', description: 'Previous year exam papers for practice', keywords: ['past paper', 'previous paper', 'exam paper'], image: img4 },
  { name: 'Notes', description: 'Study notes and summaries', keywords: ['notes', 'study notes', 'summary'], image: img1 },
  { name: 'Date Sheet', description: 'Exam schedules and date sheets', keywords: ['date sheet', 'exam schedule', 'timetable'], image: img2 },
  { name: 'Pairing Scheme', description: 'Question paper pairing schemes', keywords: ['pairing scheme', 'paper pattern', 'question distribution'], image: img3 },
  { name: 'Result', description: 'Exam results and updates', keywords: ['result', 'exam result', 'marks'], image: img4 },
];

export async function seedServices() {
  let createdCount = 0;
  let updatedCount = 0;

  try {
    console.log('Starting Service seed...');

    // all classes get all services
    const allClasses = await ClassModel.find({ status: 'active' });
    const classIds = allClasses.map(c => c._id);

    if (!classIds.length) {
      console.log('⚠️  No classes found — run class seeder first.');
    }

    for (const raw of SERVICE_TYPES) {
      const serviceSlug = slugify(raw.name);
      const existing = await ServiceModel.findOne({ slug: serviceSlug });

      if (existing) {
        existing.name = raw.name;
        existing.description = raw.description;
        existing.image = raw.image;
        existing.status = 'active';
        existing.classId = classIds;
        await existing.save();
        updatedCount += 1;
        console.log(`Updated Service: ${raw.name}`);
        continue;
      }

      await ServiceModel.create({
        name: raw.name,
        slug: serviceSlug,
        description: raw.description,
        image: raw.image,
        status: 'active',
        keywords: raw.keywords,
        classId: classIds,
      });

      createdCount += 1;
      console.log(`Created Service: ${raw.name}`);
    }

    console.log('Service seeding completed.');
    console.log(`Created: ${createdCount}, Updated: ${updatedCount}`);
  } catch (error) {
    console.error('Error seeding Services:', error);
    throw error;
  }
}
