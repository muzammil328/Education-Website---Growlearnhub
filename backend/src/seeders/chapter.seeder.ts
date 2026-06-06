import { slugify } from '@muzammil328/utils';
import ClassModel from '../models/class.model';
import BookModel from '../models/book.model';
import ChapterModel from '../models/chapter.model';

interface ChapterData {
  className: string;
  bookName: string;
  chapterName: string;
  order?: number;
  status: 'active' | 'inactive';
}

export const chapters: ChapterData[] = [
  // Class 9 - Biology
  { className: 'class-9', bookName: 'Biology', chapterName: 'Introduction to Biology', order: 1, status: 'active' },
  { className: 'class-9', bookName: 'Biology', chapterName: 'Biodiversity', order: 2, status: 'active' },
  { className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues', order: 3, status: 'active' },
  { className: 'class-9', bookName: 'Biology', chapterName: 'Cell Cycle', order: 4, status: 'active' },
  { className: 'class-9', bookName: 'Biology', chapterName: 'Enzymes', order: 5, status: 'active' },
  // Class 9 - Mathematics
  { className: 'class-9', bookName: 'Mathematics', chapterName: 'Number Systems', order: 1, status: 'active' },
  { className: 'class-9', bookName: 'Mathematics', chapterName: 'Algebra', order: 2, status: 'active' },
  { className: 'class-9', bookName: 'Mathematics', chapterName: 'Geometry', order: 3, status: 'active' },
  { className: 'class-9', bookName: 'Mathematics', chapterName: 'Statistics', order: 4, status: 'active' },
  // Class 9 - Physics
  { className: 'class-9', bookName: 'Physics', chapterName: 'Physical Quantities and Measurement', order: 1, status: 'active' },
  { className: 'class-9', bookName: 'Physics', chapterName: 'Kinematics', order: 2, status: 'active' },
  { className: 'class-9', bookName: 'Physics', chapterName: 'Dynamics', order: 3, status: 'active' },
  { className: 'class-9', bookName: 'Physics', chapterName: 'Turning Effect of Forces', order: 4, status: 'active' },
  // Class 9 - Chemistry
  { className: 'class-9', bookName: 'Chemistry', chapterName: 'Fundamentals of Chemistry', order: 1, status: 'active' },
  { className: 'class-9', bookName: 'Chemistry', chapterName: 'Structure of Atoms', order: 2, status: 'active' },
  { className: 'class-9', bookName: 'Chemistry', chapterName: 'Periodic Table and Periodicity', order: 3, status: 'active' },
  // Class 10 - Biology
  { className: 'class-10', bookName: 'Biology', chapterName: 'Gaseous Exchange', order: 1, status: 'active' },
  { className: 'class-10', bookName: 'Biology', chapterName: 'Homeostasis', order: 2, status: 'active' },
  { className: 'class-10', bookName: 'Biology', chapterName: 'Coordination and Control', order: 3, status: 'active' },
  { className: 'class-10', bookName: 'Biology', chapterName: 'Reproduction', order: 4, status: 'active' },
  // Class 10 - Mathematics
  { className: 'class-10', bookName: 'Mathematics', chapterName: 'Quadratic Equations', order: 1, status: 'active' },
  { className: 'class-10', bookName: 'Mathematics', chapterName: 'Variations', order: 2, status: 'active' },
  { className: 'class-10', bookName: 'Mathematics', chapterName: 'Partial Fractions', order: 3, status: 'active' },
  { className: 'class-10', bookName: 'Mathematics', chapterName: 'Trigonometry', order: 4, status: 'active' },
  // Class 10 - Physics
  { className: 'class-10', bookName: 'Physics', chapterName: 'Simple Harmonic Motion', order: 1, status: 'active' },
  { className: 'class-10', bookName: 'Physics', chapterName: 'Geometrical Optics', order: 2, status: 'active' },
  { className: 'class-10', bookName: 'Physics', chapterName: 'Electrostatics', order: 3, status: 'active' },
  // Class 10 - Chemistry
  { className: 'class-10', bookName: 'Chemistry', chapterName: 'Chemical Equilibrium', order: 1, status: 'active' },
  { className: 'class-10', bookName: 'Chemistry', chapterName: 'Acids Bases and Salts', order: 2, status: 'active' },
  { className: 'class-10', bookName: 'Chemistry', chapterName: 'Organic Chemistry', order: 3, status: 'active' },
  // Class 11 - Biology
  { className: 'class-11', bookName: 'Biology', chapterName: 'The Cell', order: 1, status: 'active' },
  { className: 'class-11', bookName: 'Biology', chapterName: 'Bioenergetics', order: 2, status: 'active' },
  { className: 'class-11', bookName: 'Biology', chapterName: 'Nutrition', order: 3, status: 'active' },
  { className: 'class-11', bookName: 'Biology', chapterName: 'Transport', order: 4, status: 'active' },
  // Class 11 - Mathematics
  { className: 'class-11', bookName: 'Mathematics', chapterName: 'Number Systems', order: 1, status: 'active' },
  { className: 'class-11', bookName: 'Mathematics', chapterName: 'Sets Functions and Groups', order: 2, status: 'active' },
  { className: 'class-11', bookName: 'Mathematics', chapterName: 'Matrices and Determinants', order: 3, status: 'active' },
  // Class 11 - Physics
  { className: 'class-11', bookName: 'Physics', chapterName: 'Measurements', order: 1, status: 'active' },
  { className: 'class-11', bookName: 'Physics', chapterName: 'Vectors and Equilibrium', order: 2, status: 'active' },
  { className: 'class-11', bookName: 'Physics', chapterName: 'Motion and Force', order: 3, status: 'active' },
  // Class 11 - Chemistry
  { className: 'class-11', bookName: 'Chemistry', chapterName: 'Stoichiometry', order: 1, status: 'active' },
  { className: 'class-11', bookName: 'Chemistry', chapterName: 'Atomic Structure', order: 2, status: 'active' },
  { className: 'class-11', bookName: 'Chemistry', chapterName: 'Chemical Bonding', order: 3, status: 'active' },
  // Class 12 - Biology
  { className: 'class-12', bookName: 'Biology', chapterName: 'Homeostasis', order: 1, status: 'active' },
  { className: 'class-12', bookName: 'Biology', chapterName: 'Support and Movement', order: 2, status: 'active' },
  { className: 'class-12', bookName: 'Biology', chapterName: 'Nervous Coordination', order: 3, status: 'active' },
  { className: 'class-12', bookName: 'Biology', chapterName: 'Hormones', order: 4, status: 'active' },
  // Class 12 - Mathematics
  { className: 'class-12', bookName: 'Mathematics', chapterName: 'Functions and Limits', order: 1, status: 'active' },
  { className: 'class-12', bookName: 'Mathematics', chapterName: 'Differentiation', order: 2, status: 'active' },
  { className: 'class-12', bookName: 'Mathematics', chapterName: 'Integration', order: 3, status: 'active' },
  // Class 12 - Physics
  { className: 'class-12', bookName: 'Physics', chapterName: 'Electrostatics', order: 1, status: 'active' },
  { className: 'class-12', bookName: 'Physics', chapterName: 'Current Electricity', order: 2, status: 'active' },
  { className: 'class-12', bookName: 'Physics', chapterName: 'Electromagnetism', order: 3, status: 'active' },
  // Class 12 - Chemistry
  { className: 'class-12', bookName: 'Chemistry', chapterName: 'Periodic Classification of Elements', order: 1, status: 'active' },
  { className: 'class-12', bookName: 'Chemistry', chapterName: 's-Block Elements', order: 2, status: 'active' },
  { className: 'class-12', bookName: 'Chemistry', chapterName: 'p-Block Elements', order: 3, status: 'active' },
];

export async function seedChapters() {
  const skipped: string[] = [];
  let createdCount = 0;
  let updatedCount = 0;

  try {
    console.log('Starting Chapter seed...');

    for (const raw of chapters) {
      const classSlug = raw.className.toLowerCase().trim();
      const bookSlug = slugify(raw.bookName);
      const chapterSlug = slugify(raw.chapterName);

      const classDoc = await ClassModel.findOne({ status: 'active', slug: classSlug });
      if (!classDoc) {
        console.log(`Skipping "${raw.chapterName}": class "${raw.className}" not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName}`);
        continue;
      }

      const bookDoc = await BookModel.findOne({ slug: bookSlug, classId: classDoc._id, status: 'active' });
      if (!bookDoc) {
        console.log(`Skipping "${raw.chapterName}": book "${raw.bookName}" not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName}`);
        continue;
      }

      const existing = await ChapterModel.findOne({ slug: chapterSlug, bookId: bookDoc._id });
      if (existing) {
        existing.name = raw.chapterName;
        existing.order = raw.order;
        existing.status = raw.status;
        await existing.save();
        updatedCount += 1;
        console.log(`Updated Chapter: ${raw.chapterName} (${raw.bookName})`);
        continue;
      }

      await ChapterModel.create({
        name: raw.chapterName,
        slug: chapterSlug,
        bookId: bookDoc._id,
        classId: classDoc._id,
        order: raw.order,
        status: raw.status,
      });

      createdCount += 1;
      console.log(`Created Chapter: ${raw.chapterName} (${raw.bookName})`);
    }

    console.log('Chapter seeding completed.');
    console.log(`Created: ${createdCount}, Updated: ${updatedCount}, Skipped: ${skipped.length}`);
  } catch (error) {
    console.error('Error seeding Chapters:', error);
    throw error;
  }
}
