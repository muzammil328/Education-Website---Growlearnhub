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
];

export async function seedBooks() {
  const skipped: string[] = [];
  let createdCount = 0;
  let updatedCount = 0;

  try {
    console.log('Starting Book seed...');

    const booksService = await ServiceModel.findOne({ slug: 'books', status: 'active' });

    for (const raw of books) {
      const classSlug = raw.className.toLowerCase().trim();
      const classDoc = await ClassModel.findOne({ status: 'active', slug: classSlug });

      if (!classDoc) {
        console.log(`Skipping "${raw.name}": class "${raw.className}" not found.`);
        skipped.push(`${raw.className} - ${raw.name}`);
        continue;
      }

      const bookSlug = slugify(raw.name);
      const existingBook = await BookModel.findOne({
        $or: [{ slug: bookSlug, classId: classDoc._id }, { code: raw.code }],
      });

      if (existingBook) {
        existingBook.name = raw.name;
        existingBook.code = raw.code;
        existingBook.description = raw.description;
        existingBook.status = raw.status ?? 'active';
        if (booksService && !existingBook.serviceId?.includes(booksService._id)) {
          existingBook.serviceId = [booksService._id];
        }
        await existingBook.save();
        updatedCount += 1;
        console.log(`Updated Book: ${raw.name} (${raw.className})`);

        if (raw.className === 'class-9') {
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
        serviceId: booksService ? [booksService._id] : [],
        components: [],
      });

      createdCount += 1;
      console.log(`Created Book: ${raw.name} (${raw.className})`);

      // Seed BookPdfs for class-9 only
      if (raw.className === 'class-9') {
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
