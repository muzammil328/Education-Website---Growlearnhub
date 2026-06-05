import { slugify } from '@muzammil328/utils';
import Heading from '../models/heading.model';
import Class from '../models/class.model';
import Book from '../models/book.model';
import Chapter from '../models/chapter.model';

const headings = [
  // Class 9 Mathematics - Number Systems
  {
    className: 'class-9',
    bookName: 'Mathematics',
    chapterName: 'Number Systems',
    name: 'Rational Numbers',
    order: 1,
    status: 'active' as const,
  },
  {
    className: 'class-9',
    bookName: 'Mathematics',
    chapterName: 'Number Systems',
    name: 'Irrational Numbers',
    order: 2,
    status: 'active' as const,
  },
  {
    className: 'class-9',
    bookName: 'Mathematics',
    chapterName: 'Number Systems',
    name: 'Real Numbers and Decimal Expansions',
    order: 3,
    status: 'active' as const,
  },
  // Class 9 Mathematics - Algebra
  {
    className: 'class-9',
    bookName: 'Mathematics',
    chapterName: 'Algebra',
    name: 'Polynomials',
    order: 1,
    status: 'active' as const,
  },
  {
    className: 'class-9',
    bookName: 'Mathematics',
    chapterName: 'Algebra',
    name: 'Linear Equations in Two Variables',
    order: 2,
    status: 'active' as const,
  },
  // Class 9 Mathematics - Geometry
  {
    className: 'class-9',
    bookName: 'Mathematics',
    chapterName: 'Geometry',
    name: 'Introduction to Euclid Geometry',
    order: 1,
    status: 'active' as const,
  },
  {
    className: 'class-9',
    bookName: 'Mathematics',
    chapterName: 'Geometry',
    name: 'Lines and Angles',
    order: 2,
    status: 'active' as const,
  },
  {
    className: 'class-9',
    bookName: 'Mathematics',
    chapterName: 'Geometry',
    name: 'Triangles',
    order: 3,
    status: 'active' as const,
  },
  // Class 9 Science - Matter
  {
    className: 'class-9',
    bookName: 'Science',
    chapterName: 'Matter',
    name: 'Matter in Our Surroundings',
    order: 1,
    status: 'active' as const,
  },
  {
    className: 'class-9',
    bookName: 'Science',
    chapterName: 'Matter',
    name: 'Is Matter Pure',
    order: 2,
    status: 'active' as const,
  },
  // Class 9 Science - Force and Motion
  {
    className: 'class-9',
    bookName: 'Science',
    chapterName: 'Force and Motion',
    name: 'Motion',
    order: 1,
    status: 'active' as const,
  },
  {
    className: 'class-9',
    bookName: 'Science',
    chapterName: 'Force and Motion',
    name: 'Force and Laws of Motion',
    order: 2,
    status: 'active' as const,
  },
  // Class 9 Science - Work and Energy
  {
    className: 'class-9',
    bookName: 'Science',
    chapterName: 'Work and Energy',
    name: 'Work and Energy',
    order: 1,
    status: 'active' as const,
  },
  {
    className: 'class-9',
    bookName: 'Science',
    chapterName: 'Work and Energy',
    name: 'Sound',
    order: 2,
    status: 'active' as const,
  },
  // Class 9 Biology - Cell Structure
  {
    className: 'class-9',
    bookName: 'Biology',
    chapterName: 'Cell Structure',
    name: 'The Fundamental Unit of Life',
    order: 1,
    status: 'active' as const,
  },
  {
    className: 'class-9',
    bookName: 'Biology',
    chapterName: 'Cell Structure',
    name: 'Tissues',
    order: 2,
    status: 'active' as const,
  },
  // Class 9 Biology - Diversity of Life
  {
    className: 'class-9',
    bookName: 'Biology',
    chapterName: 'Diversity of Life',
    name: 'Diversity in Living Organisms',
    order: 1,
    status: 'active' as const,
  },
  // Class 10 Mathematics - Real Numbers
  {
    className: 'class-10',
    bookName: 'Mathematics',
    chapterName: 'Real Numbers',
    name: 'Euclid Division Lemma',
    order: 1,
    status: 'active' as const,
  },
  {
    className: 'class-10',
    bookName: 'Mathematics',
    chapterName: 'Real Numbers',
    name: 'Fundamental Theorem of Arithmetic',
    order: 2,
    status: 'active' as const,
  },
  // Class 10 Mathematics - Polynomials
  {
    className: 'class-10',
    bookName: 'Mathematics',
    chapterName: 'Polynomials',
    name: 'Zeros of Polynomials',
    order: 1,
    status: 'active' as const,
  },
  {
    className: 'class-10',
    bookName: 'Mathematics',
    chapterName: 'Polynomials',
    name: 'Division Algorithm for Polynomials',
    order: 2,
    status: 'active' as const,
  },
  // Class 10 Mathematics - Linear Equations
  {
    className: 'class-10',
    bookName: 'Mathematics',
    chapterName: 'Linear Equations',
    name: 'Pair of Linear Equations in Two Variables',
    order: 1,
    status: 'active' as const,
  },
  // Class 10 Science - Chemical Reactions
  {
    className: 'class-10',
    bookName: 'Science',
    chapterName: 'Chemical Reactions',
    name: 'Chemical Reactions and Equations',
    order: 1,
    status: 'active' as const,
  },
  // Class 10 Science - Acids and Bases
  {
    className: 'class-10',
    bookName: 'Science',
    chapterName: 'Acids and Bases',
    name: 'Acids Bases and Salts',
    order: 1,
    status: 'active' as const,
  },
  // Class 10 Biology - Life Processes
  {
    className: 'class-10',
    bookName: 'Biology',
    chapterName: 'Life Processes',
    name: 'Nutrition',
    order: 1,
    status: 'active' as const,
  },
  {
    className: 'class-10',
    bookName: 'Biology',
    chapterName: 'Life Processes',
    name: 'Respiration',
    order: 2,
    status: 'active' as const,
  },
  {
    className: 'class-10',
    bookName: 'Biology',
    chapterName: 'Life Processes',
    name: 'Excretion',
    order: 3,
    status: 'active' as const,
  },
  // Class 11 Mathematics - Sets and Functions
  {
    className: 'class-11',
    bookName: 'Mathematics',
    chapterName: 'Sets and Functions',
    name: 'Sets',
    order: 1,
    status: 'active' as const,
  },
  {
    className: 'class-11',
    bookName: 'Mathematics',
    chapterName: 'Sets and Functions',
    name: 'Relations and Functions',
    order: 2,
    status: 'active' as const,
  },
  // Class 11 Mathematics - Trigonometry
  {
    className: 'class-11',
    bookName: 'Mathematics',
    chapterName: 'Trigonometry',
    name: 'Trigonometric Functions',
    order: 1,
    status: 'active' as const,
  },
  {
    className: 'class-11',
    bookName: 'Mathematics',
    chapterName: 'Trigonometry',
    name: 'Trigonometric Equations',
    order: 2,
    status: 'active' as const,
  },
  // Class 11 Physics - Physical World
  {
    className: 'class-11',
    bookName: 'Physics',
    chapterName: 'Physical World',
    name: 'Physical World and Measurement',
    order: 1,
    status: 'active' as const,
  },
  // Class 11 Physics - Kinematics
  {
    className: 'class-11',
    bookName: 'Physics',
    chapterName: 'Kinematics',
    name: 'Motion in a Straight Line',
    order: 1,
    status: 'active' as const,
  },
  {
    className: 'class-11',
    bookName: 'Physics',
    chapterName: 'Kinematics',
    name: 'Motion in a Plane',
    order: 2,
    status: 'active' as const,
  },
  // Class 11 Chemistry - Structure of Atom
  {
    className: 'class-11',
    bookName: 'Chemistry',
    chapterName: 'Structure of Atom',
    name: 'Atomic Structure',
    order: 1,
    status: 'active' as const,
  },
  // Class 11 Chemistry - Chemical Bonding
  {
    className: 'class-11',
    bookName: 'Chemistry',
    chapterName: 'Chemical Bonding',
    name: 'Chemical Bonding and Molecular Structure',
    order: 1,
    status: 'active' as const,
  },
  // Class 11 Biology - Diversity of Living Organisms
  {
    className: 'class-11',
    bookName: 'Biology',
    chapterName: 'Diversity of Living Organisms',
    name: 'Biological Classification',
    order: 1,
    status: 'active' as const,
  },
  // Class 12 Mathematics - Relations and Functions
  {
    className: 'class-12',
    bookName: 'Mathematics',
    chapterName: 'Relations and Functions',
    name: 'Types of Relations',
    order: 1,
    status: 'active' as const,
  },
  {
    className: 'class-12',
    bookName: 'Mathematics',
    chapterName: 'Relations and Functions',
    name: 'Types of Functions',
    order: 2,
    status: 'active' as const,
  },
  // Class 12 Mathematics - Calculus
  {
    className: 'class-12',
    bookName: 'Mathematics',
    chapterName: 'Calculus',
    name: 'Continuity and Differentiability',
    order: 1,
    status: 'active' as const,
  },
  {
    className: 'class-12',
    bookName: 'Mathematics',
    chapterName: 'Calculus',
    name: 'Application of Derivatives',
    order: 2,
    status: 'active' as const,
  },
  // Class 12 Physics - Electric Charges
  {
    className: 'class-12',
    bookName: 'Physics',
    chapterName: 'Electric Charges',
    name: 'Electric Charges and Fields',
    order: 1,
    status: 'active' as const,
  },
  // Class 12 Physics - Current Electricity
  {
    className: 'class-12',
    bookName: 'Physics',
    chapterName: 'Current Electricity',
    name: 'Current Electricity',
    order: 1,
    status: 'active' as const,
  },
  // Class 12 Chemistry - Solid State
  {
    className: 'class-12',
    bookName: 'Chemistry',
    chapterName: 'Solid State',
    name: 'The Solid State',
    order: 1,
    status: 'active' as const,
  },
  // Class 12 Biology - Reproduction
  {
    className: 'class-12',
    bookName: 'Biology',
    chapterName: 'Reproduction',
    name: 'Reproduction in Organisms',
    order: 1,
    status: 'active' as const,
  },
  {
    className: 'class-12',
    bookName: 'Biology',
    chapterName: 'Reproduction',
    name: 'Sexual Reproduction in Flowering Plants',
    order: 2,
    status: 'active' as const,
  },
];

export async function seedHeadings() {
  const skipped: string[] = [];
  let createdCount = 0;
  let updatedCount = 0;

  try {
    console.log('Starting Heading seed...');

    for (const raw of headings) {
      const classSlug = raw.className.toLowerCase().trim();
      const bookSlug = raw.bookName.toLowerCase().trim();
      const chapterSlug = slugify(raw.chapterName);
      const headingSlug = slugify(raw.name);

      const classDoc = await Class.findOne({
        status: 'active',
        slug: classSlug,
      });

      if (!classDoc) {
        console.log(`Skipping "${raw.name}": class "${raw.className}" not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName} - ${raw.name}`);
        continue;
      }

      const bookDoc = await Book.findOne({
        slug: bookSlug,
        classId: classDoc._id,
        status: 'active',
      });

      if (!bookDoc) {
        console.log(`Skipping "${raw.name}": book "${raw.bookName}" not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName} - ${raw.name}`);
        continue;
      }

      const chapterDoc = await Chapter.findOne({
        slug: chapterSlug,
        bookId: bookDoc._id,
        status: 'active',
      });

      if (!chapterDoc) {
        console.log(`Skipping "${raw.name}": chapter "${raw.chapterName}" not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName} - ${raw.name}`);
        continue;
      }

      const existingHeading = await Heading.findOne({
        slug: headingSlug,
        chapterId: chapterDoc._id,
      });

      if (existingHeading) {
        existingHeading.name = raw.name;
        existingHeading.order = raw.order;
        existingHeading.status = raw.status ?? 'active';
        await existingHeading.save();
        updatedCount += 1;
        console.log(`Updated Heading: ${raw.name} (${raw.chapterName})`);
        continue;
      }

      await Heading.create({
        name: raw.name,
        slug: headingSlug,
        chapterId: chapterDoc._id,
        bookId: bookDoc._id,
        classId: classDoc._id,
        order: raw.order,
        status: raw.status ?? 'active',
      });

      createdCount += 1;
      console.log(`Created Heading: ${raw.name} (${raw.chapterName})`);
    }

    console.log('Heading seeding completed.');
    console.log(`Created: ${createdCount}, Updated: ${updatedCount}, Skipped: ${skipped.length}`);
  } catch (error) {
    console.error('Error seeding Headings:', error);
    throw error;
  }
}
