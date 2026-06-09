import ClassModel from '../models/class.model';
import BookModel from '../models/book.model';
import BookPdfModel from '../models/bookPdf.model';
import { slugify } from '@muzammil328/utils';

const DUMMY_PDF_URL = 'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf';
const DUMMY_FILE_ID = 'sample-local-pdf';

interface RawBookPdfSeed {
  className: string;
  bookName: string;
  medium: 'english' | 'urdu';
  pages?: number;
  fileSize?: number;
}

// Generate english + urdu entries for every class-9 book
const class9Books = [
  'Biology', 'Mathematics', 'Physics', 'Chemistry',
  'English', 'Urdu', 'Islamiat', 'Pakistan Studies',
];

export const bookPdfs: RawBookPdfSeed[] = class9Books.flatMap(bookName => [
  { className: 'class-9', bookName, medium: 'english', pages: 220, fileSize: 5_242_880 },
  { className: 'class-9', bookName, medium: 'urdu',    pages: 220, fileSize: 5_500_000 },
]);

export async function seedBookPdfs() {
  let created = 0, updated = 0, skipped = 0;

  console.log('Starting BookPdf seed...');

  for (const raw of bookPdfs) {
    const classDoc = await ClassModel.findOne({ slug: raw.className, status: 'active' });
    if (!classDoc) {
      console.log(`Skipping: class "${raw.className}" not found`);
      skipped++; continue;
    }

    const bookDoc = await BookModel.findOne({ slug: slugify(raw.bookName), classId: classDoc._id, status: 'active' });
    if (!bookDoc) {
      console.log(`Skipping: book "${raw.bookName}" not found in ${raw.className}`);
      skipped++; continue;
    }

    const existing = await BookPdfModel.findOne({ bookId: bookDoc._id, medium: raw.medium });
    if (existing) {
      existing.fileUrl  = DUMMY_PDF_URL;
      existing.fileId   = DUMMY_FILE_ID;
      existing.pages    = raw.pages;
      existing.fileSize = raw.fileSize;
      existing.status   = 'active';
      await existing.save();
      console.log(`Updated BookPdf: ${raw.bookName} (${raw.medium})`);
      updated++; continue;
    }

    await BookPdfModel.create({
      classId:  classDoc._id,
      bookId:   bookDoc._id,
      medium:   raw.medium,
      fileId:   DUMMY_FILE_ID,
      fileUrl:  DUMMY_PDF_URL,
      pages:    raw.pages,
      fileSize: raw.fileSize,
      status:   'active',
    });
    console.log(`Created BookPdf: ${raw.bookName} (${raw.medium})`);
    created++;
  }

  console.log(`BookPdf seeding done. Created: ${created}, Updated: ${updated}, Skipped: ${skipped}`);
}
