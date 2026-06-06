import SubHeading from '../models/subHeading.model';
import Heading from '../models/heading.model';
import Class from '../models/class.model';
import Book from '../models/book.model';
import Chapter from '../models/chapter.model';
import Mcqs from '../models/mcqs.model';
import { slugify } from '@muzammil328/utils';

// chapterName, headingName, subHeadingName must exactly match their seeder names
export const mcqs = [
  {
    className: 'class-9',
    bookName: 'Biology',
    chapterName: 'Cells and Tissues',
    headingName: 'Cell Structure',
    subHeadingName: 'Prokaryotic Cells',
    questions: [
      {
        name: 'What is the basic structural and functional unit of life?',
        options: [{ text: 'Atom', is_correct: false }, { text: 'Cell', is_correct: true }, { text: 'Tissue', is_correct: false }, { text: 'Organ', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Which cells lack a membrane-bound nucleus?',
        options: [{ text: 'Eukaryotic cells', is_correct: false }, { text: 'Prokaryotic cells', is_correct: true }, { text: 'Plant cells', is_correct: false }, { text: 'Animal cells', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Bacteria are examples of which type of cell?',
        options: [{ text: 'Eukaryotic', is_correct: false }, { text: 'Multicellular', is_correct: false }, { text: 'Prokaryotic', is_correct: true }, { text: 'Animal', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'What is the outermost layer of a prokaryotic cell?',
        options: [{ text: 'Cell membrane', is_correct: false }, { text: 'Cell wall', is_correct: true }, { text: 'Capsule', is_correct: false }, { text: 'Nucleus', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Which structure controls what enters and leaves the cell?',
        options: [{ text: 'Cell wall', is_correct: false }, { text: 'Nucleus', is_correct: false }, { text: 'Cell membrane', is_correct: true }, { text: 'Ribosome', is_correct: false }],
        type: 'multipleChoice',
      },
    ],
  },
  {
    className: 'class-9',
    bookName: 'Biology',
    chapterName: 'Cells and Tissues',
    headingName: 'Cell Organelles',
    subHeadingName: 'Mitochondria',
    questions: [
      {
        name: 'Which organelle is known as the powerhouse of the cell?',
        options: [{ text: 'Nucleus', is_correct: false }, { text: 'Mitochondria', is_correct: true }, { text: 'Ribosome', is_correct: false }, { text: 'Golgi apparatus', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'What is produced in mitochondria?',
        options: [{ text: 'Protein', is_correct: false }, { text: 'DNA', is_correct: false }, { text: 'ATP', is_correct: true }, { text: 'Glucose', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'What is the function of ribosomes?',
        options: [{ text: 'Energy production', is_correct: false }, { text: 'Protein synthesis', is_correct: true }, { text: 'Cell division', is_correct: false }, { text: 'Waste removal', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Which organelle contains genetic material?',
        options: [{ text: 'Nucleus', is_correct: true }, { text: 'Mitochondria', is_correct: false }, { text: 'Ribosome', is_correct: false }, { text: 'Lysosome', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'What is the function of the Golgi apparatus?',
        options: [{ text: 'Energy production', is_correct: false }, { text: 'Protein synthesis', is_correct: false }, { text: 'Modifying and packaging proteins', is_correct: true }, { text: 'DNA replication', is_correct: false }],
        type: 'multipleChoice',
      },
    ],
  },
  {
    className: 'class-9',
    bookName: 'Mathematics',
    chapterName: 'Number Systems',
    headingName: 'Rational Numbers',
    subHeadingName: 'Properties of Rational Numbers',
    questions: [
      {
        name: 'Which of the following is a rational number?',
        options: [{ text: '√2', is_correct: false }, { text: 'π', is_correct: false }, { text: '3/4', is_correct: true }, { text: '√3', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'The sum of two rational numbers is always?',
        options: [{ text: 'Irrational', is_correct: false }, { text: 'Rational', is_correct: true }, { text: 'Integer', is_correct: false }, { text: 'Natural', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Which of the following is NOT a rational number?',
        options: [{ text: '0.5', is_correct: false }, { text: '7', is_correct: false }, { text: '√5', is_correct: true }, { text: '-3', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Every integer is a rational number. This statement is?',
        options: [{ text: 'False', is_correct: false }, { text: 'True', is_correct: true }, { text: 'Sometimes true', is_correct: false }, { text: 'Cannot be determined', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'What is the decimal expansion of 1/3?',
        options: [{ text: '0.3', is_correct: false }, { text: '0.33', is_correct: false }, { text: '0.333... (repeating)', is_correct: true }, { text: '0.13', is_correct: false }],
        type: 'multipleChoice',
      },
    ],
  },
  {
    className: 'class-9',
    bookName: 'Physics',
    chapterName: 'Physical Quantities and Measurement',
    headingName: 'Physical Quantities',
    subHeadingName: 'Base Quantities',
    questions: [
      {
        name: 'How many base quantities are defined in the SI system?',
        options: [{ text: '5', is_correct: false }, { text: '6', is_correct: false }, { text: '7', is_correct: true }, { text: '8', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'What is the SI unit of mass?',
        options: [{ text: 'Gram', is_correct: false }, { text: 'Kilogram', is_correct: true }, { text: 'Pound', is_correct: false }, { text: 'Newton', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Which is a base quantity?',
        options: [{ text: 'Force', is_correct: false }, { text: 'Velocity', is_correct: false }, { text: 'Length', is_correct: true }, { text: 'Pressure', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'The SI unit of electric current is?',
        options: [{ text: 'Volt', is_correct: false }, { text: 'Watt', is_correct: false }, { text: 'Ampere', is_correct: true }, { text: 'Ohm', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Which of the following is a derived quantity?',
        options: [{ text: 'Mass', is_correct: false }, { text: 'Time', is_correct: false }, { text: 'Speed', is_correct: true }, { text: 'Temperature', is_correct: false }],
        type: 'multipleChoice',
      },
    ],
  },
  {
    className: 'class-10',
    bookName: 'Biology',
    chapterName: 'Gaseous Exchange',
    headingName: 'Gaseous Exchange in Animals',
    subHeadingName: 'Gills and Lungs',
    questions: [
      {
        name: 'Which organ is responsible for gaseous exchange in fish?',
        options: [{ text: 'Lungs', is_correct: false }, { text: 'Skin', is_correct: false }, { text: 'Gills', is_correct: true }, { text: 'Trachea', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'What gas is taken in during breathing?',
        options: [{ text: 'Carbon dioxide', is_correct: false }, { text: 'Nitrogen', is_correct: false }, { text: 'Oxygen', is_correct: true }, { text: 'Hydrogen', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'What is the main organ of respiration in humans?',
        options: [{ text: 'Heart', is_correct: false }, { text: 'Lungs', is_correct: true }, { text: 'Kidney', is_correct: false }, { text: 'Liver', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Breathing in is called?',
        options: [{ text: 'Exhalation', is_correct: false }, { text: 'Inhalation', is_correct: true }, { text: 'Expiration', is_correct: false }, { text: 'Diffusion', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Which gas is released during exhalation?',
        options: [{ text: 'Oxygen', is_correct: false }, { text: 'Nitrogen', is_correct: false }, { text: 'Carbon dioxide', is_correct: true }, { text: 'Hydrogen', is_correct: false }],
        type: 'multipleChoice',
      },
    ],
  },
  {
    className: 'class-10',
    bookName: 'Mathematics',
    chapterName: 'Quadratic Equations',
    headingName: 'Methods of Solving Quadratic Equations',
    subHeadingName: 'Quadratic Formula',
    questions: [
      {
        name: 'The quadratic formula is used to find the roots of which type of equation?',
        options: [{ text: 'Linear', is_correct: false }, { text: 'Cubic', is_correct: false }, { text: 'Quadratic', is_correct: true }, { text: 'Exponential', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'What is the standard form of a quadratic equation?',
        options: [{ text: 'ax + b = 0', is_correct: false }, { text: 'ax² + bx + c = 0', is_correct: true }, { text: 'ax³ + b = 0', is_correct: false }, { text: 'a/x + b = 0', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'The discriminant b² - 4ac < 0 means roots are?',
        options: [{ text: 'Real and equal', is_correct: false }, { text: 'Real and unequal', is_correct: false }, { text: 'Complex (imaginary)', is_correct: true }, { text: 'Zero', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'If discriminant = 0, the quadratic has?',
        options: [{ text: 'No real roots', is_correct: false }, { text: 'Two distinct roots', is_correct: false }, { text: 'Two equal real roots', is_correct: true }, { text: 'Infinite roots', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'What is the sum of roots of ax² + bx + c = 0?',
        options: [{ text: 'c/a', is_correct: false }, { text: 'b/a', is_correct: false }, { text: '-b/a', is_correct: true }, { text: '-c/a', is_correct: false }],
        type: 'multipleChoice',
      },
    ],
  },
  {
    className: 'class-11',
    bookName: 'Biology',
    chapterName: 'The Cell',
    headingName: 'Cell Division',
    subHeadingName: 'Mitosis',
    questions: [
      {
        name: 'Mitosis results in how many daughter cells?',
        options: [{ text: 'One', is_correct: false }, { text: 'Two', is_correct: true }, { text: 'Four', is_correct: false }, { text: 'Eight', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Which phase of mitosis involves chromosome alignment at the cell equator?',
        options: [{ text: 'Prophase', is_correct: false }, { text: 'Anaphase', is_correct: false }, { text: 'Metaphase', is_correct: true }, { text: 'Telophase', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'What is the purpose of mitosis in multicellular organisms?',
        options: [{ text: 'Sexual reproduction', is_correct: false }, { text: 'Growth and repair', is_correct: true }, { text: 'Genetic variation', is_correct: false }, { text: 'Gamete formation', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'In mitosis, the daughter cells are genetically?',
        options: [{ text: 'Different from parent', is_correct: false }, { text: 'Identical to parent', is_correct: true }, { text: 'Haploid', is_correct: false }, { text: 'Triploid', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Which phase comes first in mitosis?',
        options: [{ text: 'Metaphase', is_correct: false }, { text: 'Anaphase', is_correct: false }, { text: 'Prophase', is_correct: true }, { text: 'Telophase', is_correct: false }],
        type: 'multipleChoice',
      },
    ],
  },
  {
    className: 'class-11',
    bookName: 'Physics',
    chapterName: 'Measurements',
    headingName: 'Physical Quantities and Units',
    subHeadingName: 'SI Units',
    questions: [
      {
        name: 'SI stands for?',
        options: [{ text: 'Standard International', is_correct: false }, { text: 'Systeme Internationale', is_correct: true }, { text: 'Scientific Index', is_correct: false }, { text: 'System of Instruments', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'The SI unit of force is?',
        options: [{ text: 'Joule', is_correct: false }, { text: 'Watt', is_correct: false }, { text: 'Newton', is_correct: true }, { text: 'Pascal', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'What is the SI unit of temperature?',
        options: [{ text: 'Celsius', is_correct: false }, { text: 'Fahrenheit', is_correct: false }, { text: 'Kelvin', is_correct: true }, { text: 'Rankine', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'The SI unit of energy is?',
        options: [{ text: 'Watt', is_correct: false }, { text: 'Newton', is_correct: false }, { text: 'Joule', is_correct: true }, { text: 'Calorie', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Which is the SI unit of luminous intensity?',
        options: [{ text: 'Lux', is_correct: false }, { text: 'Candela', is_correct: true }, { text: 'Lumen', is_correct: false }, { text: 'Watt', is_correct: false }],
        type: 'multipleChoice',
      },
    ],
  },
  {
    className: 'class-12',
    bookName: 'Biology',
    chapterName: 'Nervous Coordination',
    headingName: 'Nervous System',
    subHeadingName: 'Central Nervous System',
    questions: [
      {
        name: 'The Central Nervous System consists of?',
        options: [{ text: 'Spinal cord only', is_correct: false }, { text: 'Brain only', is_correct: false }, { text: 'Brain and spinal cord', is_correct: true }, { text: 'Nerves and ganglia', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Which part of the brain controls balance and coordination?',
        options: [{ text: 'Cerebrum', is_correct: false }, { text: 'Medulla', is_correct: false }, { text: 'Cerebellum', is_correct: true }, { text: 'Hypothalamus', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Neurons transmit signals using?',
        options: [{ text: 'Blood', is_correct: false }, { text: 'Electrical impulses', is_correct: true }, { text: 'Hormones', is_correct: false }, { text: 'Enzymes', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'The gap between two neurons is called?',
        options: [{ text: 'Axon', is_correct: false }, { text: 'Dendrite', is_correct: false }, { text: 'Synapse', is_correct: true }, { text: 'Myelin', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Which part of the brain controls breathing and heartbeat?',
        options: [{ text: 'Cerebrum', is_correct: false }, { text: 'Cerebellum', is_correct: false }, { text: 'Medulla oblongata', is_correct: true }, { text: 'Thalamus', is_correct: false }],
        type: 'multipleChoice',
      },
    ],
  },
  {
    className: 'class-12',
    bookName: 'Physics',
    chapterName: 'Electrostatics',
    headingName: 'Electric Charge',
    subHeadingName: 'Coulombs Law',
    questions: [
      {
        name: 'Coulombs law gives the force between?',
        options: [{ text: 'Magnets', is_correct: false }, { text: 'Point charges', is_correct: true }, { text: 'Masses', is_correct: false }, { text: 'Currents', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'The SI unit of electric charge is?',
        options: [{ text: 'Ampere', is_correct: false }, { text: 'Volt', is_correct: false }, { text: 'Coulomb', is_correct: true }, { text: 'Farad', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Like charges?',
        options: [{ text: 'Attract each other', is_correct: false }, { text: 'Repel each other', is_correct: true }, { text: 'Have no effect', is_correct: false }, { text: 'Neutralize each other', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Electric force is inversely proportional to?',
        options: [{ text: 'Distance', is_correct: false }, { text: 'Square of distance', is_correct: true }, { text: 'Cube of distance', is_correct: false }, { text: 'Product of charges', is_correct: false }],
        type: 'multipleChoice',
      },
      {
        name: 'Which particle carries negative charge?',
        options: [{ text: 'Proton', is_correct: false }, { text: 'Neutron', is_correct: false }, { text: 'Electron', is_correct: true }, { text: 'Positron', is_correct: false }],
        type: 'multipleChoice',
      },
    ],
  },
];

export async function seedMcqs() {
  const skipped: string[] = [];
  let createdCount = 0;
  let updatedCount = 0;

  try {
    console.log('Starting MCQ seed...');

    for (const raw of mcqs) {
      const classSlug = raw.className.toLowerCase().trim();
      const bookSlug = slugify(raw.bookName);
      const chapterSlug = slugify(raw.chapterName);

      const classDoc = await Class.findOne({ status: 'active', slug: classSlug });
      if (!classDoc) {
        console.log(`Skipping "${raw.chapterName}": class not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName}`);
        continue;
      }

      const bookDoc = await Book.findOne({ slug: bookSlug, classId: classDoc._id, status: 'active' });
      if (!bookDoc) {
        console.log(`Skipping "${raw.chapterName}": book "${raw.bookName}" not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName}`);
        continue;
      }

      const chapterDoc = await Chapter.findOne({ slug: chapterSlug, bookId: bookDoc._id, status: 'active' });
      if (!chapterDoc) {
        console.log(`Skipping "${raw.chapterName}": chapter not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName}`);
        continue;
      }

      let headingDoc: any = null;
      if (raw.headingName) {
        headingDoc = await Heading.findOne({ slug: slugify(raw.headingName), chapterId: chapterDoc._id });
      }

      let subHeadingDoc: any = null;
      if (raw.subHeadingName && headingDoc) {
        subHeadingDoc = await SubHeading.findOne({ slug: slugify(raw.subHeadingName), headingId: headingDoc._id });
      }

      for (const q of raw.questions) {
        const mcqSlug = slugify(q.name);
        const correctOptionIndex = q.options.findIndex(opt => opt.is_correct);

        const existing = await Mcqs.findOne({ slug: mcqSlug });
        if (existing) {
          existing.name = q.name;
          existing.question = q.name;
          existing.options = q.options.map(o => o.text);
          existing.correctOption = correctOptionIndex >= 0 ? correctOptionIndex : 0;
          existing.classId = classDoc._id;
          existing.bookId = bookDoc._id;
          existing.chapterId = chapterDoc._id;
          existing.headingId = headingDoc?._id;
          existing.subHeadingId = subHeadingDoc?._id;
          await existing.save();
          updatedCount += 1;
          console.log(`Updated MCQ: ${q.name}`);
          continue;
        }

        await Mcqs.create({
          name: q.name,
          slug: mcqSlug,
          question: q.name,
          options: q.options.map(o => o.text),
          correctOption: correctOptionIndex >= 0 ? correctOptionIndex : 0,
          status: 'active',
          classId: classDoc._id,
          bookId: bookDoc._id,
          chapterId: chapterDoc._id,
          headingId: headingDoc?._id,
          subHeadingId: subHeadingDoc?._id,
        });

        createdCount += 1;
        console.log(`Created MCQ: ${q.name}`);
      }
    }

    console.log('MCQ seeding completed.');
    console.log(`Created: ${createdCount}, Updated: ${updatedCount}, Skipped: ${skipped.length}`);
  } catch (error) {
    console.error('Error seeding MCQs:', error);
    throw error;
  }
}
