import ClassModel from '../models/class.model';
import BoardModel from '../models/board.model';
import PairingSchemeModel from '../models/pairingScheme.model';

const DUMMY_IMAGE_URL = 'https://via.placeholder.com/800x1100.png?text=Pairing+Scheme+2025';
const PAIRING_YEAR = 2025;

const CLASS_NAMES = ['class-9', 'class-10', 'class-11', 'class-12'];

export async function seedPairingSchemes() {
  let createdCount = 0;
  let updatedCount = 0;

  try {
    console.log('Starting PairingScheme seed...');

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
        const existing = await PairingSchemeModel.findOne({
          classId: classDoc._id,
          boardId: board._id,
          year: PAIRING_YEAR,
        });

        if (existing) {
          existing.image = DUMMY_IMAGE_URL;
          existing.status = 'active';
          await existing.save();
          updatedCount += 1;
          console.log(`  Updated PairingScheme: ${board.name} (${classSlug}, ${PAIRING_YEAR})`);
        } else {
          await PairingSchemeModel.create({
            classId: classDoc._id,
            boardId: board._id,
            year: PAIRING_YEAR,
            image: DUMMY_IMAGE_URL,
            status: 'active',
          });
          createdCount += 1;
          console.log(`  Created PairingScheme: ${board.name} (${classSlug}, ${PAIRING_YEAR})`);
        }
      }
    }

    console.log('PairingScheme seeding completed.');
    console.log(`Created: ${createdCount}, Updated: ${updatedCount}`);
  } catch (error) {
    console.error('Error seeding PairingSchemes:', error);
    throw error;
  }
}
