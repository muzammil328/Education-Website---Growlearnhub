import ClassModel from '../models/class.model';
import BookModel from '../models/book.model';
import ChapterModel from '../models/chapter.model';
import ChapterPdfModel from '../models/chapterPdf.model';

const DUMMY_PDF_URL = 'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf';
const DUMMY_FILE_ID = 'sample-local-pdf';

export async function seedChapterPdfs() {
  let created = 0, updated = 0, skipped = 0;

  console.log('Starting ChapterPdf seed...');

  // Seed all active class-9 chapters with english + urdu PDFs
  const classDoc = await ClassModel.findOne({ slug: 'class-9', status: 'active' });
  if (!classDoc) {
    console.log('Skipping ChapterPdf seed: class-9 not found');
    return;
  }

  const books = await BookModel.find({ classId: classDoc._id, status: 'active' });

  for (const book of books) {
    const chapters = await ChapterModel.find({ bookId: book._id, classId: classDoc._id, status: 'active' });

    for (const chapter of chapters) {
      for (const medium of ['english', 'urdu'] as const) {
        const existing = await ChapterPdfModel.findOne({ chapterId: chapter._id, medium });

        if (existing) {
          existing.fileUrl  = DUMMY_PDF_URL;
          existing.fileId   = DUMMY_FILE_ID;
          existing.pages    = 30;
          existing.fileSize = 1_048_576;
          existing.status   = 'active';
          await existing.save();
          console.log(`Updated ChapterPdf: ${chapter.name} (${medium})`);
          updated++; continue;
        }

        await ChapterPdfModel.create({
          classId:   classDoc._id,
          bookId:    book._id,
          chapterId: chapter._id,
          medium,
          fileId:    DUMMY_FILE_ID,
          fileUrl:   DUMMY_PDF_URL,
          pages:     30,
          fileSize:  1_048_576,
          status:    'active',
        });
        console.log(`Created ChapterPdf: ${chapter.name} / ${book.name} (${medium})`);
        created++;
      }
    }
  }

  console.log(`ChapterPdf seeding done. Created: ${created}, Updated: ${updated}, Skipped: ${skipped}`);
}
