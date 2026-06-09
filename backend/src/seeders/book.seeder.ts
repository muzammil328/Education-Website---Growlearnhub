import ClassModel from '../models/class.model';
import BookModel from '../models/book.model';
import BookPdfModel from '../models/bookPdf.model';
import ServiceModel from '../models/service.model';
import { slugify } from '@muzammil328/utils';

const DUMMY_PDF_URL = 'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf';
const DUMMY_FILE_ID = 'sample-local-pdf';

export interface RawBookSeed {
  className: string;
  name: string;
  code: string;
  description?: string;
  status?: 'active' | 'inactive';
  serviceSlug?: string;
}

export const books: RawBookSeed[] = [
  // Class 9
  { className: 'class-9', name: 'Biology', code: 'BIO9', description: 'Biology for Class 9', status: 'active' },
  { className: 'class-9', name: 'Mathematics', code: 'MATH9', description: 'Mathematics for Class 9', status: 'active' },
  { className: 'class-9', name: 'Physics', code: 'PHY9', description: 'Physics for Class 9', status: 'active' },
  { className: 'class-9', name: 'Chemistry', code: 'CHEM9', description: 'Chemistry for Class 9', status: 'active' },
  { className: 'class-9', name: 'English', code: 'ENG9', description: 'English for Class 9', status: 'active' },
  { className: 'class-9', name: 'Urdu', code: 'URD9', description: 'Urdu for Class 9', status: 'active' },
  { className: 'class-9', name: 'Islamiat', code: 'ISL9', description: 'Islamiat for Class 9', status: 'active' },
  { className: 'class-9', name: 'Pakistan Studies', code: 'PAK9', description: 'Pakistan Studies for Class 9', status: 'active' },
  // Class 10
  { className: 'class-10', name: 'Biology', code: 'BIO10', description: 'Biology for Class 10', status: 'active' },
  { className: 'class-10', name: 'Mathematics', code: 'MATH10', description: 'Mathematics for Class 10', status: 'active' },
  { className: 'class-10', name: 'Physics', code: 'PHY10', description: 'Physics for Class 10', status: 'active' },
  { className: 'class-10', name: 'Chemistry', code: 'CHEM10', description: 'Chemistry for Class 10', status: 'active' },
  { className: 'class-10', name: 'English', code: 'ENG10', description: 'English for Class 10', status: 'active' },
  { className: 'class-10', name: 'Urdu', code: 'URD10', description: 'Urdu for Class 10', status: 'active' },
  { className: 'class-10', name: 'Islamiat', code: 'ISL10', description: 'Islamiat for Class 10', status: 'active' },
  { className: 'class-10', name: 'Pakistan Studies', code: 'PAK10', description: 'Pakistan Studies for Class 10', status: 'active' },
  // Class 11
  { className: 'class-11', name: 'Biology', code: 'BIO11', description: 'Biology for Class 11', status: 'active' },
  { className: 'class-11', name: 'Mathematics', code: 'MATH11', description: 'Mathematics for Class 11', status: 'active' },
  { className: 'class-11', name: 'Physics', code: 'PHY11', description: 'Physics for Class 11', status: 'active' },
  { className: 'class-11', name: 'Chemistry', code: 'CHEM11', description: 'Chemistry for Class 11', status: 'active' },
  { className: 'class-11', name: 'English', code: 'ENG11', description: 'English for Class 11', status: 'active' },
  { className: 'class-11', name: 'Urdu', code: 'URD11', description: 'Urdu for Class 11', status: 'active' },
  // Class 12
  { className: 'class-12', name: 'Biology', code: 'BIO12', description: 'Biology for Class 12', status: 'active' },
  { className: 'class-12', name: 'Mathematics', code: 'MATH12', description: 'Mathematics for Class 12', status: 'active' },
  { className: 'class-12', name: 'Physics', code: 'PHY12', description: 'Physics for Class 12', status: 'active' },
  { className: 'class-12', name: 'Chemistry', code: 'CHEM12', description: 'Chemistry for Class 12', status: 'active' },
  { className: 'class-12', name: 'English', code: 'ENG12', description: 'English for Class 12', status: 'active' },
  { className: 'class-12', name: 'Urdu', code: 'URD12', description: 'Urdu for Class 12', status: 'active' },
  // VU — General Handouts (Books service)
  { className: 'vu', name: 'CS001 Handout', code: 'CS001', description: 'Introduction to IT – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS101 Handout', code: 'CS101', description: 'Introduction to Computing – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS201 Handout', code: 'CS201', description: 'Introduction to Programming – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS202 Handout', code: 'CS202', description: 'Object Oriented Programming – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS205 Handout', code: 'CS205', description: 'Data Structures – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS206 Handout', code: 'CS206', description: 'Database Management Systems – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS301 Handout', code: 'CS301', description: 'Data Structures – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS302 Handout', code: 'CS302', description: 'Digital Logic Design – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS304 Handout', code: 'CS304', description: 'Object Oriented Programming – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS310 Handout', code: 'CS310', description: 'Operating Systems – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS311 Handout', code: 'CS311', description: 'Introduction to Web Technologies – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS312 Handout', code: 'CS312', description: 'Database Management Systems – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS315 Handout', code: 'CS315', description: 'Network Technologies – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS401 Handout', code: 'CS401', description: 'Computer Architecture & Assembly – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS402 Handout', code: 'CS402', description: 'Theory of Automata – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS403 Handout', code: 'CS403', description: 'Database Management Systems – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS405 Handout', code: 'CS405', description: 'Advance Operating Systems – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS407 Handout', code: 'CS407', description: 'Software Engineering – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS408 Handout', code: 'CS408', description: 'Human Computer Interaction – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS410 Handout', code: 'CS410', description: 'Visual Programming – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS411 Handout', code: 'CS411', description: 'Visual Programming – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS432 Handout', code: 'CS432', description: 'Network Security – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS435 Handout', code: 'CS435', description: 'Compiler Construction – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS506 Handout', code: 'CS506', description: 'Web Design & Development – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS508 Handout', code: 'CS508', description: 'Modern Programming Languages – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS602 Handout', code: 'CS602', description: 'Computer Graphics – VU Handout', status: 'active' },
  { className: 'vu', name: 'CS607 Handout', code: 'CS607', description: 'Artificial Intelligence – VU Handout', status: 'active' },
  { className: 'vu', name: 'EDU201 Handout', code: 'EDU201', description: 'Philosophy of Education – VU Handout', status: 'active' },
  { className: 'vu', name: 'EDU301 Handout', code: 'EDU301', description: 'Curriculum Development – VU Handout', status: 'active' },
  { className: 'vu', name: 'EDU401 Handout', code: 'EDU401', description: 'Educational Research – VU Handout', status: 'active' },
  { className: 'vu', name: 'EDU406 Handout', code: 'EDU406', description: 'Teaching of English – VU Handout', status: 'active' },
  { className: 'vu', name: 'ENG101 Handout', code: 'ENG101', description: 'Functional English – VU Handout', status: 'active' },
  { className: 'vu', name: 'ENG201 Handout', code: 'ENG201', description: 'Business and Technical English – VU Handout', status: 'active' },
  { className: 'vu', name: 'ENG501 Handout', code: 'ENG501', description: 'Advanced English Grammar – VU Handout', status: 'active' },
  { className: 'vu', name: 'ENG502 Handout', code: 'ENG502', description: 'Linguistics – VU Handout', status: 'active' },
  { className: 'vu', name: 'ENG504 Handout', code: 'ENG504', description: 'Essay Writing – VU Handout', status: 'active' },
  { className: 'vu', name: 'ISL202 Handout', code: 'ISL202', description: 'Islamic Studies – VU Handout', status: 'active' },
  { className: 'vu', name: 'MGT211 Handout', code: 'MGT211', description: 'Introduction to Business – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH001 Handout', code: 'MTH001', description: 'Remedial Mathematics – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH100 Handout', code: 'MTH100', description: 'General Mathematics – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH101 Handout', code: 'MTH101', description: 'Calculus and Analytical Geometry – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH102 Handout', code: 'MTH102', description: 'Calculus II – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH201 Handout', code: 'MTH201', description: 'Multivariable Calculus – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH202 Handout', code: 'MTH202', description: 'Discrete Mathematics – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH301 Handout', code: 'MTH301', description: 'Calculus II – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH302 Handout', code: 'MTH302', description: 'Business Mathematics & Statistics – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH303 Handout', code: 'MTH303', description: 'Probability Theory – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH401 Handout', code: 'MTH401', description: 'Differential Equations – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH501 Handout', code: 'MTH501', description: 'Linear Algebra – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH601 Handout', code: 'MTH601', description: 'Operations Research – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH603 Handout', code: 'MTH603', description: 'Numerical Analysis – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH621 Handout', code: 'MTH621', description: 'Real Analysis I – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH622 Handout', code: 'MTH622', description: 'Real Analysis II – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH631 Handout', code: 'MTH631', description: 'Complex Analysis – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH632 Handout', code: 'MTH632', description: 'Complex Analysis II – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH633 Handout', code: 'MTH633', description: 'Functional Analysis – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH634 Handout', code: 'MTH634', description: 'Topology – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH641 Handout', code: 'MTH641', description: 'Measure Theory – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH701 Handout', code: 'MTH701', description: 'Graph Theory – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH706 Handout', code: 'MTH706', description: 'Combinatorics – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH7123 Handout', code: 'MTH7123', description: 'Advanced Mathematics – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH718 Handout', code: 'MTH718', description: 'Number Theory – VU Handout', status: 'active' },
  { className: 'vu', name: 'MTH721 Handout', code: 'MTH721', description: 'Advanced Mathematics II – VU Handout', status: 'active' },
  { className: 'vu', name: 'PAK301 Handout', code: 'PAK301', description: 'Pakistan Studies – VU Handout', status: 'active' },
  { className: 'vu', name: 'PAK302 Handout', code: 'PAK302', description: 'Pakistan Studies II – VU Handout', status: 'active' },
  { className: 'vu', name: 'PHY101 Handout', code: 'PHY101', description: 'Physics – VU Handout', status: 'active' },
  { className: 'vu', name: 'PHY301 Handout', code: 'PHY301', description: 'Electricity & Magnetism – VU Handout', status: 'active' },
  // VU — Final Exam handouts
  { className: 'vu', name: 'CS101 Final Handout', code: 'CS101-FIN', description: 'Introduction to Computing – Final Exam Handout', status: 'active', serviceSlug: 'final-exam' },
  { className: 'vu', name: 'CS201 Final Handout', code: 'CS201-FIN', description: 'Introduction to Programming – Final Exam Handout', status: 'active', serviceSlug: 'final-exam' },
  { className: 'vu', name: 'CS302 Final Handout', code: 'CS302-FIN', description: 'Digital Logic Design – Final Exam Handout', status: 'active', serviceSlug: 'final-exam' },
  { className: 'vu', name: 'ENG201 Final Handout', code: 'ENG201-FIN', description: 'Business and Technical English – Final Exam Handout', status: 'active', serviceSlug: 'final-exam' },
  { className: 'vu', name: 'MGT211 Final Handout', code: 'MGT211-FIN', description: 'Introduction to Business – Final Exam Handout', status: 'active', serviceSlug: 'final-exam' },
  { className: 'vu', name: 'MTH101 Final Handout', code: 'MTH101-FIN', description: 'Calculus and Analytical Geometry – Final Exam Handout', status: 'active', serviceSlug: 'final-exam' },
  // VU — Mid Exam handouts
  { className: 'vu', name: 'CS101 Mid Handout', code: 'CS101-MID', description: 'Introduction to Computing – Mid Exam Handout', status: 'active', serviceSlug: 'mid-exam' },
  { className: 'vu', name: 'CS201 Mid Handout', code: 'CS201-MID', description: 'Introduction to Programming – Mid Exam Handout', status: 'active', serviceSlug: 'mid-exam' },
  { className: 'vu', name: 'CS302 Mid Handout', code: 'CS302-MID', description: 'Digital Logic Design – Mid Exam Handout', status: 'active', serviceSlug: 'mid-exam' },
  { className: 'vu', name: 'ENG201 Mid Handout', code: 'ENG201-MID', description: 'Business and Technical English – Mid Exam Handout', status: 'active', serviceSlug: 'mid-exam' },
  { className: 'vu', name: 'MGT211 Mid Handout', code: 'MGT211-MID', description: 'Introduction to Business – Mid Exam Handout', status: 'active', serviceSlug: 'mid-exam' },
  { className: 'vu', name: 'MTH101 Mid Handout', code: 'MTH101-MID', description: 'Calculus and Analytical Geometry – Mid Exam Handout', status: 'active', serviceSlug: 'mid-exam' },
];

export async function seedBooks() {
  const skipped: string[] = [];
  let createdCount = 0;
  let updatedCount = 0;

  try {
    console.log('Starting Book seed...');

    const booksService = await ServiceModel.findOne({ slug: 'books', status: 'active' });
    const mcqsService = await ServiceModel.findOne({ slug: 'mcqs', status: 'active' });

    for (const raw of books) {
      const classSlug = raw.className.toLowerCase().trim();
      const classDoc = await ClassModel.findOne({ status: 'active', slug: classSlug });

      if (!classDoc) {
        console.log(`Skipping "${raw.name}": class "${raw.className}" not found.`);
        skipped.push(`${raw.className} - ${raw.name}`);
        continue;
      }

      // Resolve service: use raw.serviceSlug if provided, otherwise fall back to 'books'
      const resolvedServiceSlug = raw.serviceSlug ?? 'books';
      const serviceDoc = raw.serviceSlug
        ? await ServiceModel.findOne({ slug: raw.serviceSlug, status: 'active' })
        : booksService;

      const bookSlug = slugify(raw.name);
      const existingBook = await BookModel.findOne({
        $or: [{ slug: bookSlug, classId: classDoc._id }, { code: raw.code }],
      });

      if (existingBook) {
        existingBook.name = raw.name;
        existingBook.code = raw.code;
        existingBook.description = raw.description;
        existingBook.status = raw.status ?? 'active';
        if (raw.serviceSlug) {
          existingBook.serviceId = serviceDoc ? [serviceDoc._id] : [];
        } else {
          const ids = [booksService?._id, mcqsService?._id].filter(Boolean);
          existingBook.serviceId = ids as any;
        }
        await existingBook.save();
        updatedCount += 1;
        console.log(`Updated Book: ${raw.name} (${raw.className})`);

        if (raw.className === 'class-9') {
          await seedBookPdfsForBook(classDoc._id, existingBook._id, raw.name);
        }
        if (raw.serviceSlug) {
          await seedBookPdfsForBook(classDoc._id, existingBook._id, raw.name);
        }
        continue;
      }

      const bookDoc = await BookModel.create({
        name: raw.name,
        slug: bookSlug,
        code: raw.code,
        description: raw.description,
        status: raw.status ?? 'active',
        classId: classDoc._id,
        serviceId: raw.serviceSlug
          ? (serviceDoc ? [serviceDoc._id] : [])
          : [booksService?._id, mcqsService?._id].filter(Boolean) as any,
        components: [],
      });

      createdCount += 1;
      console.log(`Created Book: ${raw.name} (${raw.className}) [service: ${resolvedServiceSlug}]`);

      // Seed BookPdfs for class-9 books and all VU handouts
      if (raw.className === 'class-9' || raw.serviceSlug) {
        await seedBookPdfsForBook(classDoc._id, bookDoc._id, raw.name);
      }
    }

    console.log('Book seeding completed.');
    console.log(`Created: ${createdCount}, Updated: ${updatedCount}, Skipped: ${skipped.length}`);
  } catch (error) {
    console.error('Error seeding Books:', error);
    throw error;
  }
}

async function seedBookPdfsForBook(classId: unknown, bookId: unknown, bookName: string) {
  for (const medium of ['english', 'urdu'] as const) {
    const existing = await BookPdfModel.findOne({ bookId, medium });
    if (existing) {
      existing.fileUrl  = DUMMY_PDF_URL;
      existing.fileId   = DUMMY_FILE_ID;
      existing.pages    = 220;
      existing.fileSize = 5_242_880;
      existing.status   = 'active';
      await existing.save();
      console.log(`  Updated BookPdf: ${bookName} (${medium})`);
    } else {
      await BookPdfModel.create({ classId, bookId, medium, fileId: DUMMY_FILE_ID, fileUrl: DUMMY_PDF_URL, pages: 220, fileSize: 5_242_880, status: 'active' });
      console.log(`  Created BookPdf: ${bookName} (${medium})`);
    }
  }
}
