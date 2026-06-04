import ClassModel from '../models/class.model';
import BookModel from '../models/book.model';
import { slugify } from '@muzammil328/core';

export interface RawBookSeed {
  className: string;
  name: string;
  code: string;
  description?: string;
  image?: string;
  status?: 'active' | 'inactive';
}

export const books: RawBookSeed[] = [
  {
    className: 'class-9',
    name: 'Biology',
    code: 'BIO9',
    description: 'Biology textbook for Class 9',
    status: 'active',
  },
  {
    className: 'class-9',
    name: 'Mathematics',
    code: 'MATH9',
    description: 'Mathematics textbook for Class 9',
    status: 'active',
  },
  {
    className: 'class-9',
    name: 'Science',
    code: 'SCI9',
    description: 'Science textbook for Class 9',
    status: 'active',
  },
  {
    className: 'class-9',
    name: 'English',
    code: 'ENG9',
    description: 'English textbook for Class 9',
    status: 'active',
  },
  {
    className: 'class-10',
    name: 'Biology',
    code: 'BIO10',
    description: 'Biology textbook for Class 10',
    status: 'active',
  },
  {
    className: 'class-10',
    name: 'Mathematics',
    code: 'MATH10',
    description: 'Mathematics textbook for Class 10',
    status: 'active',
  },
  {
    className: 'class-10',
    name: 'Science',
    code: 'SCI10',
    description: 'Science textbook for Class 10',
    status: 'active',
  },
  {
    className: 'class-10',
    name: 'English',
    code: 'ENG10',
    description: 'English textbook for Class 10',
    status: 'active',
  },
  {
    className: 'class-11',
    name: 'Biology',
    code: 'BIO11',
    description: 'Biology textbook for Class 11',
    status: 'active',
  },
  {
    className: 'class-11',
    name: 'Mathematics',
    code: 'MATH11',
    description: 'Mathematics textbook for Class 11',
    status: 'active',
  },
  {
    className: 'class-11',
    name: 'Physics',
    code: 'PHY11',
    description: 'Physics textbook for Class 11',
    status: 'active',
  },
  {
    className: 'class-11',
    name: 'Chemistry',
    code: 'CHEM11',
    description: 'Chemistry textbook for Class 11',
    status: 'active',
  },
  {
    className: 'class-12',
    name: 'Biology',
    code: 'BIO12',
    description: 'Biology textbook for Class 12',
    status: 'active',
  },
  {
    className: 'class-12',
    name: 'Mathematics',
    code: 'MATH12',
    description: 'Mathematics textbook for Class 12',
    status: 'active',
  },
  {
    className: 'class-12',
    name: 'Physics',
    code: 'PHY12',
    description: 'Physics textbook for Class 12',
    status: 'active',
  },
  {
    className: 'class-12',
    name: 'Chemistry',
    code: 'CHEM12',
    description: 'Chemistry textbook for Class 12',
    status: 'active',
  },
];

export async function seedBooks() {
  const skippedBooks: string[] = [];
  let createdCount = 0;
  let updatedCount = 0;

  try {
    console.log('Starting Book seed...');

    for (const raw of books) {
      const classSlug = raw.className.toLowerCase().trim();

      const classDoc = await ClassModel.findOne({
        status: 'active',
        slug: classSlug,
      });

      if (!classDoc) {
        console.log(`Skipping "${raw.name}": class "${raw.className}" not found.`);
        skippedBooks.push(`${raw.className} - ${raw.name}`);
        continue;
      }

      const bookSlug = slugify(raw.name);
      const existingBook = await BookModel.findOne({
        slug: bookSlug,
        classId: classDoc._id,
      });

      if (existingBook) {
        existingBook.name = raw.name;
        existingBook.code = raw.code;
        existingBook.description = raw.description;
        existingBook.image = raw.image;
        existingBook.status = raw.status ?? 'active';
        await existingBook.save();
        updatedCount += 1;
        console.log(`Updated Book: ${raw.name} (${raw.className})`);
        continue;
      }

      await BookModel.create({
        name: raw.name,
        slug: bookSlug,
        code: raw.code,
        description: raw.description,
        image: raw.image,
        status: raw.status ?? 'active',
        classId: classDoc._id,
      });

      createdCount += 1;
      console.log(`Created Book: ${raw.name} (${raw.className})`);
    }

    console.log('Book seeding completed.');
    console.log(
      `Created: ${createdCount}, Updated: ${updatedCount}, Skipped: ${skippedBooks.length}`
    );
  } catch (error) {
    console.error('Error seeding Books:', error);
    throw error;
  }
}
