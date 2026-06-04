import { slugify } from '@muzammil328/core';
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
  // Class 9 Mathematics
  {
    className: 'class-9',
    bookName: 'Mathematics',
    chapterName: 'Number Systems',
    order: 1,
    status: 'active',
  },
  {
    className: 'class-9',
    bookName: 'Mathematics',
    chapterName: 'Algebra',
    order: 2,
    status: 'active',
  },
  {
    className: 'class-9',
    bookName: 'Mathematics',
    chapterName: 'Geometry',
    order: 3,
    status: 'active',
  },
  // Class 9 Science
  {
    className: 'class-9',
    bookName: 'Science',
    chapterName: 'Matter',
    order: 1,
    status: 'active',
  },
  {
    className: 'class-9',
    bookName: 'Science',
    chapterName: 'Force and Motion',
    order: 2,
    status: 'active',
  },
  {
    className: 'class-9',
    bookName: 'Science',
    chapterName: 'Work and Energy',
    order: 3,
    status: 'active',
  },
  // Class 9 Biology
  {
    className: 'class-9',
    bookName: 'Biology',
    chapterName: 'Cell Structure',
    order: 1,
    status: 'active',
  },
  {
    className: 'class-9',
    bookName: 'Biology',
    chapterName: 'Diversity of Life',
    order: 2,
    status: 'active',
  },
  // Class 10 Mathematics
  {
    className: 'class-10',
    bookName: 'Mathematics',
    chapterName: 'Real Numbers',
    order: 1,
    status: 'active',
  },
  {
    className: 'class-10',
    bookName: 'Mathematics',
    chapterName: 'Polynomials',
    order: 2,
    status: 'active',
  },
  {
    className: 'class-10',
    bookName: 'Mathematics',
    chapterName: 'Linear Equations',
    order: 3,
    status: 'active',
  },
  // Class 10 Science
  {
    className: 'class-10',
    bookName: 'Science',
    chapterName: 'Chemical Reactions',
    order: 1,
    status: 'active',
  },
  {
    className: 'class-10',
    bookName: 'Science',
    chapterName: 'Acids and Bases',
    order: 2,
    status: 'active',
  },
  // Class 10 Biology
  {
    className: 'class-10',
    bookName: 'Biology',
    chapterName: 'Life Processes',
    order: 1,
    status: 'active',
  },
  // Class 11 Mathematics
  {
    className: 'class-11',
    bookName: 'Mathematics',
    chapterName: 'Sets and Functions',
    order: 1,
    status: 'active',
  },
  {
    className: 'class-11',
    bookName: 'Mathematics',
    chapterName: 'Trigonometry',
    order: 2,
    status: 'active',
  },
  // Class 11 Physics
  {
    className: 'class-11',
    bookName: 'Physics',
    chapterName: 'Physical World',
    order: 1,
    status: 'active',
  },
  {
    className: 'class-11',
    bookName: 'Physics',
    chapterName: 'Kinematics',
    order: 2,
    status: 'active',
  },
  // Class 11 Chemistry
  {
    className: 'class-11',
    bookName: 'Chemistry',
    chapterName: 'Structure of Atom',
    order: 1,
    status: 'active',
  },
  {
    className: 'class-11',
    bookName: 'Chemistry',
    chapterName: 'Chemical Bonding',
    order: 2,
    status: 'active',
  },
  // Class 11 Biology
  {
    className: 'class-11',
    bookName: 'Biology',
    chapterName: 'Diversity of Living Organisms',
    order: 1,
    status: 'active',
  },
  // Class 12 Mathematics
  {
    className: 'class-12',
    bookName: 'Mathematics',
    chapterName: 'Relations and Functions',
    order: 1,
    status: 'active',
  },
  {
    className: 'class-12',
    bookName: 'Mathematics',
    chapterName: 'Calculus',
    order: 2,
    status: 'active',
  },
  // Class 12 Physics
  {
    className: 'class-12',
    bookName: 'Physics',
    chapterName: 'Electric Charges',
    order: 1,
    status: 'active',
  },
  {
    className: 'class-12',
    bookName: 'Physics',
    chapterName: 'Current Electricity',
    order: 2,
    status: 'active',
  },
  // Class 12 Chemistry
  {
    className: 'class-12',
    bookName: 'Chemistry',
    chapterName: 'Solid State',
    order: 1,
    status: 'active',
  },
  // Class 12 Biology
  {
    className: 'class-12',
    bookName: 'Biology',
    chapterName: 'Reproduction',
    order: 1,
    status: 'active',
  },
];

export async function seedChapters() {
  const skipped: string[] = [];
  let createdCount = 0;
  let updatedCount = 0;

  try {
    console.log('Starting Chapter seed...');

    for (const raw of chapters) {
      const classSlug = raw.className.toLowerCase().trim();
      const bookSlug = raw.bookName.toLowerCase().trim();
      const chapterSlug = slugify(raw.chapterName);

      const classDoc = await ClassModel.findOne({
        status: 'active',
        slug: classSlug,
      });

      if (!classDoc) {
        console.log(`Skipping "${raw.chapterName}": class "${raw.className}" not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName}`);
        continue;
      }

      const bookDoc = await BookModel.findOne({
        slug: bookSlug,
        classId: classDoc._id,
        status: 'active',
      });

      if (!bookDoc) {
        console.log(`Skipping "${raw.chapterName}": book "${raw.bookName}" not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName}`);
        continue;
      }

      const existingChapter = await ChapterModel.findOne({
        slug: chapterSlug,
        bookId: bookDoc._id,
      });

      if (existingChapter) {
        existingChapter.name = raw.chapterName;
        existingChapter.order = raw.order;
        existingChapter.status = raw.status ?? 'active';
        await existingChapter.save();
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
        status: raw.status ?? 'active',
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
