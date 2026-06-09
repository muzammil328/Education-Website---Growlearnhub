import ClassModel from '../models/class.model';
import BoardModel from '../models/board.model';
import ResultModel from '../models/result.model';

const DUMMY_PDF_URL = 'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf';
const DUMMY_FILE_ID = 'sample-result-pdf';
const RESULT_YEAR = 2025;

const CLASS_NAMES = ['class-9', 'class-10', 'class-11', 'class-12'];

export async function seedResults() {
  let createdCount = 0;
  let updatedCount = 0;
  const skipped: string[] = [];

  try {
    console.log('Starting Result seed...');

    for (const classSlug of CLASS_NAMES) {
      const classDoc = await ClassModel.findOne({ slug: classSlug, status: 'active' });
      if (!classDoc) {
        console.log(`Skipping class "${classSlug}": not found.`);
        continue;
      }

      const boards = await BoardModel.find({ classId: classDoc._id, status: 'active' });
      if (!boards.length) {
        console.log(`No boards found for class "${classSlug}", skipping.`);
        continue;
      }

      for (const board of boards) {
        const existing = await ResultModel.findOne({
          classId: classDoc._id,
          boardId: board._id,
          year: RESULT_YEAR,
        });

        if (existing) {
          existing.fileId = DUMMY_FILE_ID;
          existing.fileUrl = DUMMY_PDF_URL;
          existing.status = 'active';
          await existing.save();
          updatedCount += 1;
          console.log(`  Updated Result: ${board.name} (${classSlug}, ${RESULT_YEAR})`);
        } else {
          await ResultModel.create({
            classId: classDoc._id,
            boardId: board._id,
            year: RESULT_YEAR,
            fileId: DUMMY_FILE_ID,
            fileUrl: DUMMY_PDF_URL,
            status: 'active',
          });
          createdCount += 1;
          console.log(`  Created Result: ${board.name} (${classSlug}, ${RESULT_YEAR})`);
        }
      }
    }

    console.log('Result seeding completed.');
    console.log(`Created: ${createdCount}, Updated: ${updatedCount}, Skipped: ${skipped.length}`);
  } catch (error) {
    console.error('Error seeding Results:', error);
    throw error;
  }
}
