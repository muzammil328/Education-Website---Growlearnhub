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

// headingName must exactly match heading.seeder names
export const subHeadings: RawSubHeadingSeed[] = [
  // Class 9 - Biology - Cells and Tissues - Cell Structure
  { className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues', headingName: 'Cell Structure', name: 'Prokaryotic Cells', order: 1, status: 'active' },
  { className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues', headingName: 'Cell Structure', name: 'Eukaryotic Cells', order: 2, status: 'active' },
  // Class 9 - Biology - Cells and Tissues - Cell Organelles
  { className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues', headingName: 'Cell Organelles', name: 'Mitochondria', order: 1, status: 'active' },
  { className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues', headingName: 'Cell Organelles', name: 'Chloroplast', order: 2, status: 'active' },
  { className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues', headingName: 'Cell Organelles', name: 'Nucleus and Ribosome', order: 3, status: 'active' },
  // Class 9 - Biology - Biodiversity - Classification of Living Things
  { className: 'class-9', bookName: 'Biology', chapterName: 'Biodiversity', headingName: 'Classification of Living Things', name: 'Five Kingdom Classification', order: 1, status: 'active' },
  { className: 'class-9', bookName: 'Biology', chapterName: 'Biodiversity', headingName: 'Classification of Living Things', name: 'Binomial Nomenclature System', order: 2, status: 'active' },
  // Class 9 - Mathematics - Number Systems - Rational Numbers
  { className: 'class-9', bookName: 'Mathematics', chapterName: 'Number Systems', headingName: 'Rational Numbers', name: 'Definition of Rational Numbers', order: 1, status: 'active' },
  { className: 'class-9', bookName: 'Mathematics', chapterName: 'Number Systems', headingName: 'Rational Numbers', name: 'Properties of Rational Numbers', order: 2, status: 'active' },
  // Class 9 - Mathematics - Number Systems - Irrational Numbers
  { className: 'class-9', bookName: 'Mathematics', chapterName: 'Number Systems', headingName: 'Irrational Numbers', name: 'Definition of Irrational Numbers', order: 1, status: 'active' },
  { className: 'class-9', bookName: 'Mathematics', chapterName: 'Number Systems', headingName: 'Irrational Numbers', name: 'Surds', order: 2, status: 'active' },
  // Class 9 - Mathematics - Algebra - Polynomials
  { className: 'class-9', bookName: 'Mathematics', chapterName: 'Algebra', headingName: 'Polynomials', name: 'Types of Polynomials', order: 1, status: 'active' },
  { className: 'class-9', bookName: 'Mathematics', chapterName: 'Algebra', headingName: 'Polynomials', name: 'Degree of Polynomial', order: 2, status: 'active' },
  // Class 9 - Physics - Physical Quantities and Measurement - Physical Quantities
  { className: 'class-9', bookName: 'Physics', chapterName: 'Physical Quantities and Measurement', headingName: 'Physical Quantities', name: 'Base Quantities', order: 1, status: 'active' },
  { className: 'class-9', bookName: 'Physics', chapterName: 'Physical Quantities and Measurement', headingName: 'Physical Quantities', name: 'Derived Quantities', order: 2, status: 'active' },
  // Class 9 - Physics - Kinematics - Motion
  { className: 'class-9', bookName: 'Physics', chapterName: 'Kinematics', headingName: 'Motion', name: 'Types of Motion', order: 1, status: 'active' },
  { className: 'class-9', bookName: 'Physics', chapterName: 'Kinematics', headingName: 'Motion', name: 'Distance and Displacement', order: 2, status: 'active' },
  // Class 9 - Chemistry - Fundamentals of Chemistry - Basic Definitions
  { className: 'class-9', bookName: 'Chemistry', chapterName: 'Fundamentals of Chemistry', headingName: 'Basic Definitions', name: 'Atom', order: 1, status: 'active' },
  { className: 'class-9', bookName: 'Chemistry', chapterName: 'Fundamentals of Chemistry', headingName: 'Basic Definitions', name: 'Molecule and Ion', order: 2, status: 'active' },
  // Class 10 - Biology - Gaseous Exchange - Gaseous Exchange in Plants
  { className: 'class-10', bookName: 'Biology', chapterName: 'Gaseous Exchange', headingName: 'Gaseous Exchange in Plants', name: 'Stomata', order: 1, status: 'active' },
  { className: 'class-10', bookName: 'Biology', chapterName: 'Gaseous Exchange', headingName: 'Gaseous Exchange in Plants', name: 'Lenticels', order: 2, status: 'active' },
  // Class 10 - Biology - Gaseous Exchange - Gaseous Exchange in Animals
  { className: 'class-10', bookName: 'Biology', chapterName: 'Gaseous Exchange', headingName: 'Gaseous Exchange in Animals', name: 'Gills and Lungs', order: 1, status: 'active' },
  { className: 'class-10', bookName: 'Biology', chapterName: 'Gaseous Exchange', headingName: 'Gaseous Exchange in Animals', name: 'Diffusion in Animals', order: 2, status: 'active' },
  // Class 10 - Biology - Homeostasis - Introduction to Homeostasis
  { className: 'class-10', bookName: 'Biology', chapterName: 'Homeostasis', headingName: 'Introduction to Homeostasis', name: 'Concept of Homeostasis', order: 1, status: 'active' },
  { className: 'class-10', bookName: 'Biology', chapterName: 'Homeostasis', headingName: 'Introduction to Homeostasis', name: 'Feedback Mechanisms', order: 2, status: 'active' },
  // Class 10 - Biology - Homeostasis - Osmoregulation
  { className: 'class-10', bookName: 'Biology', chapterName: 'Homeostasis', headingName: 'Osmoregulation', name: 'Role of Kidneys', order: 1, status: 'active' },
  { className: 'class-10', bookName: 'Biology', chapterName: 'Homeostasis', headingName: 'Osmoregulation', name: 'Kidney Structure', order: 2, status: 'active' },
  // Class 10 - Mathematics - Quadratic Equations - Methods of Solving Quadratic Equations
  { className: 'class-10', bookName: 'Mathematics', chapterName: 'Quadratic Equations', headingName: 'Methods of Solving Quadratic Equations', name: 'Factorization Method', order: 1, status: 'active' },
  { className: 'class-10', bookName: 'Mathematics', chapterName: 'Quadratic Equations', headingName: 'Methods of Solving Quadratic Equations', name: 'Quadratic Formula', order: 2, status: 'active' },
  // Class 11 - Biology - The Cell - Cell Division
  { className: 'class-11', bookName: 'Biology', chapterName: 'The Cell', headingName: 'Cell Division', name: 'Mitosis', order: 1, status: 'active' },
  { className: 'class-11', bookName: 'Biology', chapterName: 'The Cell', headingName: 'Cell Division', name: 'Meiosis', order: 2, status: 'active' },
  // Class 11 - Biology - The Cell - Cell Structure and Function
  { className: 'class-11', bookName: 'Biology', chapterName: 'The Cell', headingName: 'Cell Structure and Function', name: 'Plasma Membrane', order: 1, status: 'active' },
  { className: 'class-11', bookName: 'Biology', chapterName: 'The Cell', headingName: 'Cell Structure and Function', name: 'Nucleus', order: 2, status: 'active' },
  // Class 11 - Biology - Bioenergetics - Photosynthesis
  { className: 'class-11', bookName: 'Biology', chapterName: 'Bioenergetics', headingName: 'Photosynthesis', name: 'Light Reactions', order: 1, status: 'active' },
  { className: 'class-11', bookName: 'Biology', chapterName: 'Bioenergetics', headingName: 'Photosynthesis', name: 'Dark Reactions', order: 2, status: 'active' },
  // Class 11 - Mathematics - Sets Functions and Groups - Sets
  { className: 'class-11', bookName: 'Mathematics', chapterName: 'Sets Functions and Groups', headingName: 'Sets', name: 'Types of Sets', order: 1, status: 'active' },
  { className: 'class-11', bookName: 'Mathematics', chapterName: 'Sets Functions and Groups', headingName: 'Sets', name: 'Set Operations', order: 2, status: 'active' },
  // Class 11 - Physics - Measurements - Physical Quantities and Units
  { className: 'class-11', bookName: 'Physics', chapterName: 'Measurements', headingName: 'Physical Quantities and Units', name: 'SI Units', order: 1, status: 'active' },
  { className: 'class-11', bookName: 'Physics', chapterName: 'Measurements', headingName: 'Physical Quantities and Units', name: 'Dimensions', order: 2, status: 'active' },
  // Class 11 - Chemistry - Stoichiometry - Mole Concept
  { className: 'class-11', bookName: 'Chemistry', chapterName: 'Stoichiometry', headingName: 'Mole Concept', name: 'Avogadros Number', order: 1, status: 'active' },
  { className: 'class-11', bookName: 'Chemistry', chapterName: 'Stoichiometry', headingName: 'Mole Concept', name: 'Molar Mass', order: 2, status: 'active' },
  // Class 12 - Biology - Nervous Coordination - Nervous System
  { className: 'class-12', bookName: 'Biology', chapterName: 'Nervous Coordination', headingName: 'Nervous System', name: 'Central Nervous System', order: 1, status: 'active' },
  { className: 'class-12', bookName: 'Biology', chapterName: 'Nervous Coordination', headingName: 'Nervous System', name: 'Peripheral Nervous System', order: 2, status: 'active' },
  // Class 12 - Physics - Electrostatics - Electric Charge
  { className: 'class-12', bookName: 'Physics', chapterName: 'Electrostatics', headingName: 'Electric Charge', name: 'Coulombs Law', order: 1, status: 'active' },
  { className: 'class-12', bookName: 'Physics', chapterName: 'Electrostatics', headingName: 'Electric Charge', name: 'Electric Field', order: 2, status: 'active' },
  // Class 12 - Mathematics - Functions and Limits - Limits
  { className: 'class-12', bookName: 'Mathematics', chapterName: 'Functions and Limits', headingName: 'Limits', name: 'Definition of Limit', order: 1, status: 'active' },
  { className: 'class-12', bookName: 'Mathematics', chapterName: 'Functions and Limits', headingName: 'Limits', name: 'Laws of Limits', order: 2, status: 'active' },
  // Class 12 - Chemistry - Periodic Classification of Elements - Periodic Table
  { className: 'class-12', bookName: 'Chemistry', chapterName: 'Periodic Classification of Elements', headingName: 'Periodic Table', name: 'Periods and Groups', order: 1, status: 'active' },
  { className: 'class-12', bookName: 'Chemistry', chapterName: 'Periodic Classification of Elements', headingName: 'Periodic Table', name: 'Periodic Trends', order: 2, status: 'active' },
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

      const classDoc = await Class.findOne({ status: 'active', slug: classSlug });
      if (!classDoc) {
        console.log(`Skipping "${raw.name}": class not found.`);
        skipped.push(`${raw.className} - ${raw.name}`);
        continue;
      }

      const bookDoc = await Book.findOne({ slug: bookSlug, classId: classDoc._id, status: 'active' });
      if (!bookDoc) {
        console.log(`Skipping "${raw.name}": book "${raw.bookName}" not found.`);
        skipped.push(`${raw.bookName} - ${raw.name}`);
        continue;
      }

      const chapterDoc = await Chapter.findOne({ slug: chapterSlug, bookId: bookDoc._id, status: 'active' });
      if (!chapterDoc) {
        console.log(`Skipping "${raw.name}": chapter "${raw.chapterName}" not found.`);
        skipped.push(`${raw.chapterName} - ${raw.name}`);
        continue;
      }

      const headingDoc = await Heading.findOne({ slug: headingSlug, chapterId: chapterDoc._id });
      if (!headingDoc) {
        console.log(`Skipping "${raw.name}": heading "${raw.headingName}" not found.`);
        skipped.push(`${raw.headingName} - ${raw.name}`);
        continue;
      }

      const existing = await SubHeading.findOne({ slug: subHeadingSlug, headingId: headingDoc._id });
      if (existing) {
        existing.name = raw.name;
        existing.order = raw.order;
        existing.status = raw.status ?? 'active';
        await existing.save();
        updatedCount += 1;
        console.log(`Updated SubHeading: ${raw.name}`);
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
      console.log(`Created SubHeading: ${raw.name}`);
    }

    console.log('SubHeading seeding completed.');
    console.log(`Created: ${createdCount}, Updated: ${updatedCount}, Skipped: ${skipped.length}`);
  } catch (error) {
    console.error('Error seeding SubHeadings:', error);
    throw error;
  }
}
