import SubHeading from '../models/subHeading.model';
import Heading from '../models/heading.model';
import Class from '../models/class.model';
import Book from '../models/book.model';
import Chapter from '../models/chapter.model';
import { slugify } from '@muzammil328/utils';

export interface RawSubHeadingSeed {
  className: string;
  bookName: string;
  chapterName: string;
  headingName: string;
  name: string;
  order?: number;
  status?: 'active' | 'inactive';
}

export const subHeadings: RawSubHeadingSeed[] = [
  {
    className: 'class-9',
    bookName: 'Mathematics',
    chapterName: 'Number Systems',
    headingName: 'Introduction to Real Numbers',
    name: 'Rational Numbers',
    order: 1,
    status: 'active',
  },
  {
    className: 'class-9',
    bookName: 'Mathematics',
    chapterName: 'Number Systems',
    headingName: 'Introduction to Real Numbers',
    name: 'Irrational Numbers',
    order: 2,
    status: 'active',
  },
  {
    className: 'class-9',
    bookName: 'Mathematics',
    chapterName: 'Algebra',
    headingName: 'Polynomials',
    name: 'Degree of Polynomial',
    order: 1,
    status: 'active',
  },
  {
    className: 'class-10',
    bookName: 'Mathematics',
    chapterName: 'Real Numbers',
    headingName: 'Euclids Division Lemma',
    name: 'Fundamental Theorem of Arithmetic',
    order: 1,
    status: 'active',
  },
  {
    className: 'class-11',
    bookName: 'Mathematics',
    chapterName: 'Sets and Functions',
    headingName: 'Sets',
    name: 'Types of Sets',
    order: 1,
    status: 'active',
  },
  {
    className: 'class-12',
    bookName: 'Mathematics',
    chapterName: 'Relations and Functions',
    headingName: 'Types of Relations',
    name: 'Equivalence Relations',
    order: 1,
    status: 'active',
  },
];

export async function seedSubHeadings() {
  const skipped: string[] = [];
  let createdCount = 0;
  let updatedCount = 0;

  try {
    console.log('Starting SubHeading seed...');

    for (const raw of subHeadings) {
      const classSlug = raw.className.toLowerCase().trim();
      const bookSlug = slugify(raw.bookName);
      const chapterSlug = slugify(raw.chapterName);
      const headingSlug = slugify(raw.headingName);
      const subHeadingSlug = slugify(raw.name);

      const classDoc = await Class.findOne({
        status: 'active',
        slug: classSlug,
      });

      if (!classDoc) {
        console.log(`Skipping "${raw.name}": class "${raw.className}" not found.`);
        skipped.push(
          `${raw.className} - ${raw.bookName} - ${raw.chapterName} - ${raw.headingName} - ${raw.name}`
        );
        continue;
      }

      const bookDoc = await Book.findOne({
        slug: bookSlug,
        classId: classDoc._id,
        status: 'active',
      });

      if (!bookDoc) {
        console.log(`Skipping "${raw.name}": book "${raw.bookName}" not found.`);
        skipped.push(
          `${raw.className} - ${raw.bookName} - ${raw.chapterName} - ${raw.headingName} - ${raw.name}`
        );
        continue;
      }

      const chapterDoc = await Chapter.findOne({
        slug: chapterSlug,
        bookId: bookDoc._id,
        status: 'active',
      });

      if (!chapterDoc) {
        console.log(`Skipping "${raw.name}": chapter "${raw.chapterName}" not found.`);
        skipped.push(
          `${raw.className} - ${raw.bookName} - ${raw.chapterName} - ${raw.headingName} - ${raw.name}`
        );
        continue;
      }

      const headingDoc = await Heading.findOne({
        slug: headingSlug,
        chapterId: chapterDoc._id,
      });

      if (!headingDoc) {
        console.log(`Skipping "${raw.name}": heading "${raw.headingName}" not found.`);
        skipped.push(
          `${raw.className} - ${raw.bookName} - ${raw.chapterName} - ${raw.headingName} - ${raw.name}`
        );
        continue;
      }

      const existingSubHeading = await SubHeading.findOne({
        slug: subHeadingSlug,
        headingId: headingDoc._id,
      });

      if (existingSubHeading) {
        existingSubHeading.name = raw.name;
        existingSubHeading.order = raw.order;
        existingSubHeading.status = raw.status ?? 'active';
        await existingSubHeading.save();
        updatedCount += 1;
        console.log(`Updated SubHeading: ${raw.name} (${raw.headingName})`);
        continue;
      }

      await SubHeading.create({
        name: raw.name,
        slug: subHeadingSlug,
        headingId: headingDoc._id,
        chapterId: chapterDoc._id,
        bookId: bookDoc._id,
        classId: classDoc._id,
        order: raw.order,
        status: raw.status ?? 'active',
      });

      createdCount += 1;
      console.log(`Created SubHeading: ${raw.name} (${raw.headingName})`);
    }

    console.log('SubHeading seeding completed.');
    console.log(`Created: ${createdCount}, Updated: ${updatedCount}, Skipped: ${skipped.length}`);
  } catch (error) {
    console.error('Error seeding SubHeadings:', error);
    throw error;
  }
}
