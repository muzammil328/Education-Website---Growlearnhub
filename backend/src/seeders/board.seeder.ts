import Class from '../models/class.model';
import Board from '../models/board.model';
import { Status } from '@muzammil328/education-packages/types';
import { slugify } from '@muzammil328/core';

export interface RawBoardSeed {
  className: string;
  name: string;
  description?: string;
  status?: Status;
}

const BOARD_NAMES = [
  'Bahawalpur Board',
  'DG Khan Board',
  'Faisalabad Board',
  'Gujranwala Board',
  'Lahore Board',
  'Multan Board',
  'Rawalpindi Board',
  'Sahiwal Board',
  'Sargodha Board',
];

const CLASS_NAMES = ['class-9', 'class-10', 'class-11', 'class-12'];

export const boards: RawBoardSeed[] = CLASS_NAMES.flatMap(className =>
  BOARD_NAMES.map(name => ({
    className,
    name,
    description: `Board of Intermediate and Secondary Education ${name.replace(' Board', '')}`,
    status: 'active' as const,
  }))
);

export async function seedBoards() {
  const skipped: string[] = [];
  let createdCount = 0;
  let updatedCount = 0;

  try {
    console.log('Starting Board seed...');

    for (const raw of boards) {
      const classSlug = raw.className.toLowerCase().trim();
      const boardSlug = slugify(raw.name);

      const classDoc = await Class.findOne({
        status: 'active',
        slug: classSlug,
      });

      if (!classDoc) {
        console.log(`Skipping "${raw.name}": class "${raw.className}" not found.`);
        skipped.push(`${raw.className} - ${raw.name}`);
        continue;
      }

      const existingBoard = await Board.findOne({
        slug: boardSlug,
        classId: classDoc._id,
      });

      if (existingBoard) {
        existingBoard.name = raw.name;
        existingBoard.description = raw.description;
        existingBoard.status = raw.status ?? 'active';
        await existingBoard.save();
        updatedCount += 1;
        console.log(`Updated Board: ${raw.name} (${raw.className})`);
        continue;
      }

      await Board.create({
        name: raw.name,
        slug: boardSlug,
        classId: classDoc._id,
        description: raw.description,
        status: raw.status ?? 'active',
      });

      createdCount += 1;
      console.log(`Created Board: ${raw.name} (${raw.className})`);
    }

    console.log('Board seeding completed.');
    console.log(`Created: ${createdCount}, Updated: ${updatedCount}, Skipped: ${skipped.length}`);
  } catch (error) {
    console.error('Error seeding Boards:', error);
    throw error;
  }
}
