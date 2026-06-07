import { slugify } from '@muzammil328/utils';
import Heading from '../models/heading.model';
import Class from '../models/class.model';
import Book from '../models/book.model';
import Chapter from '../models/chapter.model';

const headings = [
  // Class 9 - Biology - Introduction to Biology
  { className: 'class-9', bookName: 'Biology', chapterName: 'Introduction to Biology', name: 'What is Biology?', order: 1, status: 'active' as const },
  { className: 'class-9', bookName: 'Biology', chapterName: 'Introduction to Biology', name: 'Branches of Biology', order: 2, status: 'active' as const },
  { className: 'class-9', bookName: 'Biology', chapterName: 'Introduction to Biology', name: 'Relationship of Biology with Other Sciences', order: 3, status: 'active' as const },
  // Class 9 - Biology - Biodiversity
  { className: 'class-9', bookName: 'Biology', chapterName: 'Biodiversity', name: 'Classification of Living Things', order: 1, status: 'active' as const },
  { className: 'class-9', bookName: 'Biology', chapterName: 'Biodiversity', name: 'Binomial Nomenclature', order: 2, status: 'active' as const },
  { className: 'class-9', bookName: 'Biology', chapterName: 'Biodiversity', name: 'Kingdoms of Life', order: 3, status: 'active' as const },
  // Class 9 - Biology - Cells and Tissues
  { className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues', name: 'Cell Structure', order: 1, status: 'active' as const },
  { className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues', name: 'Cell Organelles', order: 2, status: 'active' as const },
  { className: 'class-9', bookName: 'Biology', chapterName: 'Cells and Tissues', name: 'Animal and Plant Cells', order: 3, status: 'active' as const },
  // Class 9 - Mathematics - Number Systems
  { className: 'class-9', bookName: 'Mathematics', chapterName: 'Number Systems', name: 'Rational Numbers', order: 1, status: 'active' as const },
  { className: 'class-9', bookName: 'Mathematics', chapterName: 'Number Systems', name: 'Irrational Numbers', order: 2, status: 'active' as const },
  { className: 'class-9', bookName: 'Mathematics', chapterName: 'Number Systems', name: 'Real Numbers', order: 3, status: 'active' as const },
  // Class 9 - Mathematics - Algebra
  { className: 'class-9', bookName: 'Mathematics', chapterName: 'Algebra', name: 'Polynomials', order: 1, status: 'active' as const },
  { className: 'class-9', bookName: 'Mathematics', chapterName: 'Algebra', name: 'Linear Equations', order: 2, status: 'active' as const },
  // Class 9 - Mathematics - Geometry
  { className: 'class-9', bookName: 'Mathematics', chapterName: 'Geometry', name: 'Lines and Angles', order: 1, status: 'active' as const },
  { className: 'class-9', bookName: 'Mathematics', chapterName: 'Geometry', name: 'Triangles', order: 2, status: 'active' as const },
  // Class 9 - Physics - Physical Quantities and Measurement
  { className: 'class-9', bookName: 'Physics', chapterName: 'Physical Quantities and Measurement', name: 'Physical Quantities', order: 1, status: 'active' as const },
  { className: 'class-9', bookName: 'Physics', chapterName: 'Physical Quantities and Measurement', name: 'Measurement Instruments', order: 2, status: 'active' as const },
  // Class 9 - Physics - Kinematics
  { className: 'class-9', bookName: 'Physics', chapterName: 'Kinematics', name: 'Motion', order: 1, status: 'active' as const },
  { className: 'class-9', bookName: 'Physics', chapterName: 'Kinematics', name: 'Equations of Motion', order: 2, status: 'active' as const },
  // Class 9 - Chemistry - Fundamentals of Chemistry
  { className: 'class-9', bookName: 'Chemistry', chapterName: 'Fundamentals of Chemistry', name: 'Basic Definitions', order: 1, status: 'active' as const },
  { className: 'class-9', bookName: 'Chemistry', chapterName: 'Fundamentals of Chemistry', name: 'Branches of Chemistry', order: 2, status: 'active' as const },
  // Class 9 - Chemistry - Structure of Atoms
  { className: 'class-9', bookName: 'Chemistry', chapterName: 'Structure of Atoms', name: 'Atomic Structure', order: 1, status: 'active' as const },
  { className: 'class-9', bookName: 'Chemistry', chapterName: 'Structure of Atoms', name: 'Electronic Configuration', order: 2, status: 'active' as const },
  // Class 10 - Biology - Gaseous Exchange
  { className: 'class-10', bookName: 'Biology', chapterName: 'Gaseous Exchange', name: 'Gaseous Exchange in Plants', order: 1, status: 'active' as const },
  { className: 'class-10', bookName: 'Biology', chapterName: 'Gaseous Exchange', name: 'Gaseous Exchange in Animals', order: 2, status: 'active' as const },
  { className: 'class-10', bookName: 'Biology', chapterName: 'Gaseous Exchange', name: 'Human Respiratory System', order: 3, status: 'active' as const },
  // Class 10 - Biology - Homeostasis
  { className: 'class-10', bookName: 'Biology', chapterName: 'Homeostasis', name: 'Introduction to Homeostasis', order: 1, status: 'active' as const },
  { className: 'class-10', bookName: 'Biology', chapterName: 'Homeostasis', name: 'Osmoregulation', order: 2, status: 'active' as const },
  { className: 'class-10', bookName: 'Biology', chapterName: 'Homeostasis', name: 'Thermoregulation', order: 3, status: 'active' as const },
  // Class 10 - Mathematics - Quadratic Equations
  { className: 'class-10', bookName: 'Mathematics', chapterName: 'Quadratic Equations', name: 'Definition of Quadratic Equation', order: 1, status: 'active' as const },
  { className: 'class-10', bookName: 'Mathematics', chapterName: 'Quadratic Equations', name: 'Methods of Solving Quadratic Equations', order: 2, status: 'active' as const },
  { className: 'class-10', bookName: 'Mathematics', chapterName: 'Quadratic Equations', name: 'Nature of Roots', order: 3, status: 'active' as const },
  // Class 10 - Physics - Geometrical Optics
  { className: 'class-10', bookName: 'Physics', chapterName: 'Geometrical Optics', name: 'Reflection of Light', order: 1, status: 'active' as const },
  { className: 'class-10', bookName: 'Physics', chapterName: 'Geometrical Optics', name: 'Refraction of Light', order: 2, status: 'active' as const },
  // Class 10 - Chemistry - Acids Bases and Salts
  { className: 'class-10', bookName: 'Chemistry', chapterName: 'Acids Bases and Salts', name: 'Acids', order: 1, status: 'active' as const },
  { className: 'class-10', bookName: 'Chemistry', chapterName: 'Acids Bases and Salts', name: 'Bases', order: 2, status: 'active' as const },
  // Class 11 - Biology - The Cell
  { className: 'class-11', bookName: 'Biology', chapterName: 'The Cell', name: 'Cell Structure and Function', order: 1, status: 'active' as const },
  { className: 'class-11', bookName: 'Biology', chapterName: 'The Cell', name: 'Cell Division', order: 2, status: 'active' as const },
  // Class 11 - Biology - Bioenergetics
  { className: 'class-11', bookName: 'Biology', chapterName: 'Bioenergetics', name: 'Photosynthesis', order: 1, status: 'active' as const },
  { className: 'class-11', bookName: 'Biology', chapterName: 'Bioenergetics', name: 'Respiration', order: 2, status: 'active' as const },
  // Class 11 - Mathematics - Sets Functions and Groups
  { className: 'class-11', bookName: 'Mathematics', chapterName: 'Sets Functions and Groups', name: 'Sets', order: 1, status: 'active' as const },
  { className: 'class-11', bookName: 'Mathematics', chapterName: 'Sets Functions and Groups', name: 'Functions', order: 2, status: 'active' as const },
  // Class 11 - Mathematics - Number Systems
  { className: 'class-11', bookName: 'Mathematics', chapterName: 'Number Systems', name: 'Complex Numbers', order: 1, status: 'active' as const },
  { className: 'class-11', bookName: 'Mathematics', chapterName: 'Number Systems', name: 'Real Number System', order: 2, status: 'active' as const },
  // Class 11 - Physics - Measurements
  { className: 'class-11', bookName: 'Physics', chapterName: 'Measurements', name: 'Physical Quantities and Units', order: 1, status: 'active' as const },
  { className: 'class-11', bookName: 'Physics', chapterName: 'Measurements', name: 'Errors and Uncertainties', order: 2, status: 'active' as const },
  // Class 11 - Physics - Vectors and Equilibrium
  { className: 'class-11', bookName: 'Physics', chapterName: 'Vectors and Equilibrium', name: 'Vectors', order: 1, status: 'active' as const },
  { className: 'class-11', bookName: 'Physics', chapterName: 'Vectors and Equilibrium', name: 'Equilibrium', order: 2, status: 'active' as const },
  // Class 11 - Chemistry - Stoichiometry
  { className: 'class-11', bookName: 'Chemistry', chapterName: 'Stoichiometry', name: 'Mole Concept', order: 1, status: 'active' as const },
  { className: 'class-11', bookName: 'Chemistry', chapterName: 'Stoichiometry', name: 'Chemical Equations', order: 2, status: 'active' as const },
  // Class 11 - Chemistry - Atomic Structure
  { className: 'class-11', bookName: 'Chemistry', chapterName: 'Atomic Structure', name: 'Atomic Models', order: 1, status: 'active' as const },
  // Class 12 - Biology - Nervous Coordination
  { className: 'class-12', bookName: 'Biology', chapterName: 'Nervous Coordination', name: 'Nervous System', order: 1, status: 'active' as const },
  { className: 'class-12', bookName: 'Biology', chapterName: 'Nervous Coordination', name: 'Sense Organs', order: 2, status: 'active' as const },
  // Class 12 - Biology - Homeostasis
  { className: 'class-12', bookName: 'Biology', chapterName: 'Homeostasis', name: 'Osmoregulation', order: 1, status: 'active' as const },
  { className: 'class-12', bookName: 'Biology', chapterName: 'Homeostasis', name: 'Thermoregulation', order: 2, status: 'active' as const },
  // Class 12 - Mathematics - Functions and Limits
  { className: 'class-12', bookName: 'Mathematics', chapterName: 'Functions and Limits', name: 'Functions', order: 1, status: 'active' as const },
  { className: 'class-12', bookName: 'Mathematics', chapterName: 'Functions and Limits', name: 'Limits', order: 2, status: 'active' as const },
  // Class 12 - Mathematics - Differentiation
  { className: 'class-12', bookName: 'Mathematics', chapterName: 'Differentiation', name: 'Derivatives', order: 1, status: 'active' as const },
  // Class 12 - Physics - Electrostatics
  { className: 'class-12', bookName: 'Physics', chapterName: 'Electrostatics', name: 'Electric Charge', order: 1, status: 'active' as const },
  { className: 'class-12', bookName: 'Physics', chapterName: 'Electrostatics', name: 'Electric Potential', order: 2, status: 'active' as const },
  // Class 12 - Physics - Current Electricity
  { className: 'class-12', bookName: 'Physics', chapterName: 'Current Electricity', name: 'Electric Current', order: 1, status: 'active' as const },
  // Class 12 - Chemistry - Periodic Classification of Elements
  { className: 'class-12', bookName: 'Chemistry', chapterName: 'Periodic Classification of Elements', name: 'Periodic Table', order: 1, status: 'active' as const },
  // Class 12 - Chemistry - s-Block Elements
  { className: 'class-12', bookName: 'Chemistry', chapterName: 's-Block Elements', name: 'Alkali Metals', order: 1, status: 'active' as const },
  { className: 'class-12', bookName: 'Chemistry', chapterName: 's-Block Elements', name: 'Alkaline Earth Metals', order: 2, status: 'active' as const },
];

export async function seedHeadings() {
  const skipped: string[] = [];
  let createdCount = 0;
  let updatedCount = 0;

  try {
    console.log('Starting Heading seed...');

    for (const raw of headings) {
      const classSlug = raw.className.toLowerCase().trim();
      const bookSlug = slugify(raw.bookName);
      const chapterSlug = slugify(raw.chapterName);
      const headingSlug = slugify(raw.name);

      const classDoc = await Class.findOne({ status: 'active', slug: classSlug });
      if (!classDoc) {
        console.log(`Skipping "${raw.name}": class not found.`);
        skipped.push(`${raw.className} - ${raw.name}`);
        continue;
      }

      const bookDoc = await Book.findOne({ slug: bookSlug, classId: classDoc._id, status: 'active' });
      if (!bookDoc) {
        console.log(`Skipping "${raw.name}": book "${raw.bookName}" not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.name}`);
        continue;
      }

      const chapterDoc = await Chapter.findOne({ slug: chapterSlug, bookId: bookDoc._id, status: 'active' });
      if (!chapterDoc) {
        console.log(`Skipping "${raw.name}": chapter "${raw.chapterName}" not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName} - ${raw.name}`);
        continue;
      }

      const existing = await Heading.findOne({
        $or: [{ slug: headingSlug, chapterId: chapterDoc._id }, { name: raw.name, chapterId: chapterDoc._id }],
      });
      if (existing) {
        existing.name = raw.name;
        existing.order = raw.order;
        existing.status = raw.status;
        await existing.save();
        updatedCount += 1;
        console.log(`Updated Heading: ${raw.name}`);
        continue;
      }

      try {
        await Heading.create({
          name: raw.name,
          slug: headingSlug,
          chapterId: chapterDoc._id,
          bookId: bookDoc._id,
          classId: classDoc._id,
          order: raw.order,
          status: raw.status,
        });
        createdCount += 1;
        console.log(`Created Heading: ${raw.name}`);
      } catch (err: any) {
        if (err.code === 11000) {
          console.log(`Skipping duplicate Heading: ${raw.name}`);
          skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName} - ${raw.name}`);
        } else {
          throw err;
        }
      }
    }

    console.log('Heading seeding completed.');
    console.log(`Created: ${createdCount}, Updated: ${updatedCount}, Skipped: ${skipped.length}`);
  } catch (error) {
    console.error('Error seeding Headings:', error);
    throw error;
  }
}
