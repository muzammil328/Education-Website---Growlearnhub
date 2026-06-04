import SubHeading from '../models/subHeading.model';
import Heading from '../models/heading.model';
import Class from '../models/class.model';
import Book from '../models/book.model';
import Chapter from '../models/chapter.model';
import Mcqs from '../models/mcqs.model';
import { slugify } from '@muzammil328/core';

export interface RawMcq {
  bookName: string;
  className: string;
  chapterName: string;
  headingName?: string;
  subHeadingName?: string;
  questions: {
    name: string;
    description?: string;
    tags?: string[];
    options: { text: string; is_correct: boolean }[];
    correctOptions: string[];
    type: string;
  }[];
}

export const mcqs: RawMcq[] = [
  {
    className: 'class-9',
    bookName: 'Biology',
    chapterName: 'Cell Structure',
    headingName: 'Cell: The Unit of Life',
    subHeadingName: 'Introduction to Cell',
    questions: [
      {
        name: 'What is the basic structural and functional unit of life?',
        description:
          'This question tests knowledge of the fundamental unit of all living organisms.',
        tags: ['biology', 'cell', 'basic'],
        options: [
          { text: 'Atom', is_correct: false },
          { text: 'Molecule', is_correct: false },
          { text: 'Cell', is_correct: true },
          { text: 'Tissue', is_correct: false },
        ],
        correctOptions: ['Cell'],
        type: 'multipleChoice',
      },
      {
        name: 'Which organelle is known as the powerhouse of the cell?',
        description: 'This question is about cellular organelles and their functions.',
        tags: ['biology', 'organelle', 'mitochondria'],
        options: [
          { text: 'Nucleus', is_correct: false },
          { text: 'Mitochondria', is_correct: true },
          { text: 'Ribosome', is_correct: false },
          { text: 'Golgi apparatus', is_correct: false },
        ],
        correctOptions: ['Mitochondria'],
        type: 'multipleChoice',
      },
      {
        name: 'What is the function of ribosomes?',
        description: 'Tests understanding of protein synthesis in cells.',
        tags: ['biology', 'ribosome', 'protein'],
        options: [
          { text: 'Energy production', is_correct: false },
          { text: 'Protein synthesis', is_correct: true },
          { text: 'Cell division', is_correct: false },
          { text: 'Waste removal', is_correct: false },
        ],
        correctOptions: ['Protein synthesis'],
        type: 'multipleChoice',
      },
      {
        name: 'Which organelle contains genetic material?',
        description: 'Understanding of DNA location in cells.',
        tags: ['biology', 'DNA', 'nucleus'],
        options: [
          { text: 'Nucleus', is_correct: true },
          { text: 'Mitochondria', is_correct: false },
          { text: 'Ribosome', is_correct: false },
          { text: 'Lysosome', is_correct: false },
        ],
        correctOptions: ['Nucleus'],
        type: 'multipleChoice',
      },
      {
        name: 'What is the function of the cell membrane?',
        description: 'Understanding of cell membrane structure and function.',
        tags: ['biology', 'membrane', 'transport'],
        options: [
          { text: 'Protein synthesis', is_correct: false },
          { text: 'Energy production', is_correct: false },
          { text: 'Control of substances entering and leaving cell', is_correct: true },
          { text: 'Cell division', is_correct: false },
        ],
        correctOptions: ['Control of substances entering and leaving cell'],
        type: 'multipleChoice',
      },
      {
        name: 'Which cell organelle is responsible for photosynthesis?',
        description: 'Tests knowledge of plant cell organelles.',
        tags: ['biology', 'chloroplast', 'photosynthesis'],
        options: [
          { text: 'Chloroplast', is_correct: true },
          { text: 'Mitochondria', is_correct: false },
          { text: 'Nucleus', is_correct: false },
          { text: 'Vacuole', is_correct: false },
        ],
        correctOptions: ['Chloroplast'],
        type: 'multipleChoice',
      },
      {
        name: 'What is the largest organelle in a plant cell?',
        description: 'Understanding of plant cell structure.',
        tags: ['biology', 'vacuole', 'plant'],
        options: [
          { text: 'Nucleus', is_correct: false },
          { text: 'Vacuole', is_correct: true },
          { text: 'Mitochondria', is_correct: false },
          { text: 'Chloroplast', is_correct: false },
        ],
        correctOptions: ['Vacuole'],
        type: 'multipleChoice',
      },
      {
        name: 'Which organelle digests waste materials and cellular debris?',
        description: 'Knowledge of lysosome function.',
        tags: ['biology', 'lysosome', 'digestion'],
        options: [
          { text: 'Ribosome', is_correct: false },
          { text: 'Lysosome', is_correct: true },
          { text: 'Golgi apparatus', is_correct: false },
          { text: 'Endoplasmic reticulum', is_correct: false },
        ],
        correctOptions: ['Lysosome'],
        type: 'multipleChoice',
      },
      {
        name: 'What is the function of the Golgi apparatus?',
        description: 'Understanding of packaging and transport within cells.',
        tags: ['biology', 'Golgi', 'packaging'],
        options: [
          { text: 'Energy production', is_correct: false },
          { text: 'Protein synthesis', is_correct: false },
          { text: 'Modifying and packaging proteins', is_correct: true },
          { text: 'DNA replication', is_correct: false },
        ],
        correctOptions: ['Modifying and packaging proteins'],
        type: 'multipleChoice',
      },
      {
        name: 'Which structure is found in plant cells but not in animal cells?',
        description: 'Comparing plant and animal cell structures.',
        tags: ['biology', 'plant', 'cell wall'],
        options: [
          { text: 'Cell wall', is_correct: true },
          { text: 'Nucleus', is_correct: false },
          { text: 'Mitochondria', is_correct: false },
          { text: 'Cell membrane', is_correct: false },
        ],
        correctOptions: ['Cell wall'],
        type: 'multipleChoice',
      },
      {
        name: 'What is the function of the endoplasmic reticulum?',
        description: 'Understanding of cellular transport systems.',
        tags: ['biology', 'ER', 'transport'],
        options: [
          { text: 'Protein synthesis and transport', is_correct: true },
          { text: 'Energy production', is_correct: false },
          { text: 'Cell division', is_correct: false },
          { text: 'DNA replication', is_correct: false },
        ],
        correctOptions: ['Protein synthesis and transport'],
        type: 'multipleChoice',
      },
      {
        name: 'What type of cell lacks a nucleus?',
        description: 'Understanding of prokaryotic vs eukaryotic cells.',
        tags: ['biology', 'prokaryote', 'nucleus'],
        options: [
          { text: 'Plant cell', is_correct: false },
          { text: 'Animal cell', is_correct: false },
          { text: 'Bacterial cell', is_correct: true },
          { text: 'Fungal cell', is_correct: false },
        ],
        correctOptions: ['Bacterial cell'],
        type: 'multipleChoice',
      },
      {
        name: 'Which organelle is responsible for ATP production?',
        description: 'Understanding of cellular energy generation.',
        tags: ['biology', 'ATP', 'mitochondria'],
        options: [
          { text: 'Nucleus', is_correct: false },
          { text: 'Mitochondria', is_correct: true },
          { text: 'Ribosome', is_correct: false },
          { text: 'Chloroplast', is_correct: false },
        ],
        correctOptions: ['Mitochondria'],
        type: 'multipleChoice',
      },
      {
        name: 'What is the nucleolus?',
        description: 'Knowledge of nuclear structures.',
        tags: ['biology', 'nucleolus', 'nucleus'],
        options: [
          { text: 'Another name for nucleus', is_correct: false },
          { text: 'A structure inside the nucleus that produces ribosomes', is_correct: true },
          { text: 'A type of organelle', is_correct: false },
          { text: 'Part of the cell membrane', is_correct: false },
        ],
        correctOptions: ['A structure inside the nucleus that produces ribosomes'],
        type: 'multipleChoice',
      },
      {
        name: 'What is the function of vacuoles in animal cells?',
        description: 'Understanding of vacuole functions across cell types.',
        tags: ['biology', 'vacuole', 'storage'],
        options: [
          { text: 'Energy production', is_correct: false },
          { text: 'Storage of water and nutrients', is_correct: true },
          { text: 'Protein synthesis', is_correct: false },
          { text: 'Cell division', is_correct: false },
        ],
        correctOptions: ['Storage of water and nutrients'],
        type: 'multipleChoice',
      },
      {
        name: 'Which structure is responsible for movement in flagella?',
        description: 'Understanding of cell motility structures.',
        tags: ['biology', 'flagella', 'movement'],
        options: [
          { text: 'Cilia', is_correct: false },
          { text: 'Microtubules', is_correct: true },
          { text: 'Cell wall', is_correct: false },
          { text: 'Cell membrane', is_correct: false },
        ],
        correctOptions: ['Microtubules'],
        type: 'multipleChoice',
      },
      {
        name: 'What is the fluid-filled space inside the cell called?',
        description: 'Understanding of cytoplasm.',
        tags: ['biology', 'cytoplasm', 'fluid'],
        options: [
          { text: 'Cytoplasm', is_correct: true },
          { text: 'Nucleoplasm', is_correct: false },
          { text: 'Protoplasm', is_correct: false },
          { text: 'Cytosol', is_correct: false },
        ],
        correctOptions: ['Cytoplasm'],
        type: 'multipleChoice',
      },
      {
        name: 'Which organelle is involved in lipid synthesis?',
        description: 'Understanding of cellular organelles.',
        tags: ['biology', 'smooth ER', 'lipid'],
        options: [
          { text: 'Rough endoplasmic reticulum', is_correct: false },
          { text: 'Smooth endoplasmic reticulum', is_correct: true },
          { text: 'Ribosome', is_correct: false },
          { text: 'Golgi apparatus', is_correct: false },
        ],
        correctOptions: ['Smooth endoplasmic reticulum'],
        type: 'multipleChoice',
      },
      {
        name: 'What is the primary function of chloroplasts?',
        description: 'Understanding of photosynthesis in plant cells.',
        tags: ['biology', 'chloroplast', 'photosynthesis'],
        options: [
          { text: 'Cellular respiration', is_correct: false },
          { text: 'Photosynthesis', is_correct: true },
          { text: 'Protein synthesis', is_correct: false },
          { text: 'Waste removal', is_correct: false },
        ],
        correctOptions: ['Photosynthesis'],
        type: 'multipleChoice',
      },
      {
        name: 'Which type of cell has a cell wall made of cellulose?',
        description: 'Understanding of plant cell structure.',
        tags: ['biology', 'cell wall', 'cellulose'],
        options: [
          { text: 'Animal cells', is_correct: false },
          { text: 'Bacterial cells', is_correct: false },
          { text: 'Plant cells', is_correct: true },
          { text: 'Fungal cells', is_correct: false },
        ],
        correctOptions: ['Plant cells'],
        type: 'multipleChoice',
      },
      {
        name: 'What is the role of peroxisomes in the cell?',
        description: 'Understanding of specialized organelles.',
        tags: ['biology', 'peroxisome', 'detox'],
        options: [
          { text: 'Energy production', is_correct: false },
          { text: 'Breaking down hydrogen peroxide', is_correct: true },
          { text: 'Protein synthesis', is_correct: false },
          { text: 'DNA replication', is_correct: false },
        ],
        correctOptions: ['Breaking down hydrogen peroxide'],
        type: 'multipleChoice',
      },
      {
        name: 'Which organelle is responsible for degrading old organelles?',
        description: 'Understanding of cellular recycling.',
        tags: ['biology', 'autophagy', 'lysosome'],
        options: [
          { text: 'Ribosome', is_correct: false },
          { text: 'Lysosome', is_correct: true },
          { text: 'Mitochondria', is_correct: false },
          { text: 'Nucleus', is_correct: false },
        ],
        correctOptions: ['Lysosome'],
        type: 'multipleChoice',
      },
    ],
  },
  {
    className: 'class-10',
    bookName: 'Biology',
    chapterName: 'Life Processes',
    headingName: 'Nutrition',
    subHeadingName: 'Nutrition in Plants',
    questions: [
      {
        name: 'What is nutrition?',
        description: 'Understanding the basic concept of nutrition.',
        tags: ['biology', 'nutrition', 'life processes'],
        options: [
          { text: 'Process of taking food', is_correct: true },
          { text: 'Process of breathing', is_correct: false },
          { text: 'Process of excretion', is_correct: false },
          { text: 'Process of reproduction', is_correct: false },
        ],
        correctOptions: ['Process of taking food'],
        type: 'multipleChoice',
      },
      {
        name: 'Which organ is responsible for pumping blood in humans?',
        description: 'Understanding of circulatory system.',
        tags: ['biology', 'heart', 'circulatory'],
        options: [
          { text: 'Lungs', is_correct: false },
          { text: 'Brain', is_correct: false },
          { text: 'Heart', is_correct: true },
          { text: 'Liver', is_correct: false },
        ],
        correctOptions: ['Heart'],
        type: 'multipleChoice',
      },
      {
        name: 'What is the function of hemoglobin?',
        description: 'Understanding of blood components.',
        tags: ['biology', 'hemoglobin', 'blood'],
        options: [
          { text: 'Fight infections', is_correct: false },
          { text: 'Carry oxygen', is_correct: true },
          { text: 'Clot blood', is_correct: false },
          { text: 'Produce hormones', is_correct: false },
        ],
        correctOptions: ['Carry oxygen'],
        type: 'multipleChoice',
      },
      {
        name: 'Which organ is the main organ of respiration?',
        description: 'Understanding of respiratory system.',
        tags: ['biology', 'respiration', 'lungs'],
        options: [
          { text: 'Heart', is_correct: false },
          { text: 'Lungs', is_correct: true },
          { text: 'Liver', is_correct: false },
          { text: 'Kidney', is_correct: false },
        ],
        correctOptions: ['Lungs'],
        type: 'multipleChoice',
      },
      {
        name: 'What is excretion?',
        description: 'Understanding of waste removal.',
        tags: ['biology', 'excretion', 'waste'],
        options: [
          { text: 'Taking in food', is_correct: false },
          { text: 'Removal of waste products', is_correct: true },
          { text: 'Movement of body', is_correct: false },
          { text: 'Response to stimuli', is_correct: false },
        ],
        correctOptions: ['Removal of waste products'],
        type: 'multipleChoice',
      },
    ],
  },
  {
    className: 'class-11',
    bookName: 'Biology',
    chapterName: 'Diversity of Living Organisms',
    headingName: 'Taxonomy',
    subHeadingName: 'Classification of Living Organisms',
    questions: [
      {
        name: 'What is the basic unit of classification?',
        description: 'Understanding of taxonomic hierarchy.',
        tags: ['biology', 'taxonomy', 'classification'],
        options: [
          { text: 'Species', is_correct: true },
          { text: 'Genus', is_correct: false },
          { text: 'Family', is_correct: false },
          { text: 'Order', is_correct: false },
        ],
        correctOptions: ['Species'],
        type: 'multipleChoice',
      },
      {
        name: 'Which kingdom includes prokaryotes?',
        description: 'Understanding of five kingdom classification.',
        tags: ['biology', 'kingdom', 'prokaryote'],
        options: [
          { text: 'Animalia', is_correct: false },
          { text: 'Plantae', is_correct: false },
          { text: 'Monera', is_correct: true },
          { text: 'Fungi', is_correct: false },
        ],
        correctOptions: ['Monera'],
        type: 'multipleChoice',
      },
      {
        name: 'What is the mode of nutrition in fungi?',
        description: 'Understanding of fungal nutrition.',
        tags: ['biology', 'fungi', 'nutrition'],
        options: [
          { text: 'Autotrophic', is_correct: false },
          { text: 'Saprophytic', is_correct: true },
          { text: 'Parasitic', is_correct: false },
          { text: 'Holozolic', is_correct: false },
        ],
        correctOptions: ['Saprophytic'],
        type: 'multipleChoice',
      },
      {
        name: 'Which organism is called the friendly bacterium?',
        description: 'Understanding of beneficial bacteria.',
        tags: ['biology', 'bacteria', 'intestine'],
        options: [
          { text: 'E. coli', is_correct: true },
          { text: 'Salmonella', is_correct: false },
          { text: 'Streptococcus', is_correct: false },
          { text: 'Clostridium', is_correct: false },
        ],
        correctOptions: ['E. coli'],
        type: 'multipleChoice',
      },
      {
        name: 'What is the scientific name of onion?',
        description: 'Understanding of binomial nomenclature.',
        tags: ['biology', 'taxonomy', 'scientific name'],
        options: [
          { text: 'Allium cepa', is_correct: true },
          { text: 'Solanum tuberosum', is_correct: false },
          { text: 'Musa paradisiaca', is_correct: false },
          { text: 'Carica papaya', is_correct: false },
        ],
        correctOptions: ['Allium cepa'],
        type: 'multipleChoice',
      },
    ],
  },
  {
    className: 'class-12',
    bookName: 'Biology',
    chapterName: 'Reproduction',
    headingName: 'Reproduction in Organisms',
    subHeadingName: 'Asexual Reproduction',
    questions: [
      {
        name: 'What is asexual reproduction?',
        description: 'Understanding of reproduction types.',
        tags: ['biology', 'reproduction', 'asexual'],
        options: [
          { text: 'Fusion of gametes', is_correct: false },
          { text: 'Reproduction without gamete fusion', is_correct: true },
          { text: 'Reproduction involving two parents', is_correct: false },
          { text: 'Formation of buds', is_correct: false },
        ],
        correctOptions: ['Reproduction without gamete fusion'],
        type: 'multipleChoice',
      },
      {
        name: 'Which organ produces eggs in humans?',
        description: 'Understanding of human reproductive system.',
        tags: ['biology', 'reproduction', 'ovary'],
        options: [
          { text: 'Uterus', is_correct: false },
          { text: 'Ovary', is_correct: true },
          { text: 'Fallopian tube', is_correct: false },
          { text: 'Testis', is_correct: false },
        ],
        correctOptions: ['Ovary'],
        type: 'multipleChoice',
      },
      {
        name: 'What is fertilization?',
        description: 'Understanding of reproduction process.',
        tags: ['biology', 'fertilization', 'gametes'],
        options: [
          { text: 'Fusion of male and female gametes', is_correct: true },
          { text: 'Release of egg', is_correct: false },
          { text: 'Formation of zygote', is_correct: false },
          { text: 'Development of embryo', is_correct: false },
        ],
        correctOptions: ['Fusion of male and female gametes'],
        type: 'multipleChoice',
      },
      {
        name: 'What is the function of placenta?',
        description: 'Understanding of embryonic development.',
        tags: ['biology', 'placenta', 'embryo'],
        options: [
          { text: 'Produce eggs', is_correct: false },
          { text: 'Exchange of substances between mother and embryo', is_correct: true },
          { text: 'Produce sperm', is_correct: false },
          { text: 'Store nutrients', is_correct: false },
        ],
        correctOptions: ['Exchange of substances between mother and embryo'],
        type: 'multipleChoice',
      },
      {
        name: 'Which type of reproduction occurs in yeast?',
        description: 'Understanding of asexual reproduction in organisms.',
        tags: ['biology', 'yeast', 'budding'],
        options: [
          { text: 'Binary fission', is_correct: false },
          { text: 'Budding', is_correct: true },
          { text: 'Spore formation', is_correct: false },
          { text: 'Fragmentation', is_correct: false },
        ],
        correctOptions: ['Budding'],
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

      const classDoc = await Class.findOne({
        status: 'active',
        slug: classSlug,
      });

      if (!classDoc) {
        console.log(`Skipping "${raw.chapterName}": class "${raw.className}" not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName}`);
        continue;
      }

      const bookDoc = await Book.findOne({
        slug: bookSlug,
        classId: classDoc._id,
        status: 'active',
      });

      if (!bookDoc) {
        console.log(`Skipping "${raw.chapterName}": book "${raw.bookName}" not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName}`);
        continue;
      }

      const chapterDoc = await Chapter.findOne({
        slug: chapterSlug,
        bookId: bookDoc._id,
        status: 'active',
      });

      if (!chapterDoc) {
        console.log(`Skipping "${raw.chapterName}": chapter "${raw.chapterName}" not found.`);
        skipped.push(`${raw.className} - ${raw.bookName} - ${raw.chapterName}`);
        continue;
      }

      let headingDoc: typeof Heading.prototype | null = null;
      if (raw.headingName) {
        const headingSlug = slugify(raw.headingName);
        headingDoc = await Heading.findOne({
          slug: headingSlug,
          chapterId: chapterDoc._id,
          status: 'active',
        });
      }

      let subHeadingDoc: typeof SubHeading.prototype | null = null;
      if (raw.subHeadingName && headingDoc) {
        const subHeadingSlug = slugify(raw.subHeadingName);
        subHeadingDoc = await SubHeading.findOne({
          slug: subHeadingSlug,
          headingId: headingDoc._id,
          status: 'active',
        });
      }

      for (const question of raw.questions) {
        const mcqSlug = slugify(question.name);

        const correctOptionIndex = question.options.findIndex(opt => opt.is_correct);

        const mcqData = {
          name: question.name,
          slug: mcqSlug,
          description: question.description || '',
          question: question.name,
          options: question.options.map(opt => opt.text),
          correctOption: correctOptionIndex >= 0 ? correctOptionIndex : 0,
          status: 'active' as const,
          classId: classDoc._id,
          bookId: bookDoc._id,
          chapterId: chapterDoc._id,
          headingId: headingDoc?._id || undefined,
          subHeadingId: subHeadingDoc?._id || undefined,
        };

        const existingMcq = await Mcqs.findOne({ slug: mcqSlug });

        if (existingMcq) {
          existingMcq.name = question.name;
          existingMcq.question = question.name;
          existingMcq.options = question.options.map(opt => opt.text);
          existingMcq.correctOption = correctOptionIndex >= 0 ? correctOptionIndex : 0;
          existingMcq.description = question.description || '';
          existingMcq.classId = classDoc._id;
          existingMcq.bookId = bookDoc._id;
          existingMcq.chapterId = chapterDoc._id;
          existingMcq.headingId = headingDoc?._id || undefined;
          existingMcq.subHeadingId = subHeadingDoc?._id || undefined;
          await existingMcq.save();
          updatedCount += 1;
          console.log(`Updated MCQ: ${question.name}`);
          continue;
        }

        await Mcqs.create(mcqData);
        createdCount += 1;
        console.log(`Created MCQ: ${question.name}`);
      }
    }

    console.log('MCQ seeding completed.');
    console.log(`Created: ${createdCount}, Updated: ${updatedCount}, Skipped: ${skipped.length}`);
  } catch (error) {
    console.error('Error seeding MCQs:', error);
    throw error;
  }
}
