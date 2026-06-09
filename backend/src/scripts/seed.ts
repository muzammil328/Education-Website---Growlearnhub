import { seedClasses, linkClassServices, classes } from '@/seeders/class.seeder';
import { seedBoards, boards } from '@/seeders/board.seeder';
import { seedResults } from '@/seeders/result.seeder';
import { seedPairingSchemes } from '@/seeders/pairingScheme.seeder';
import { seedBooks, books } from '@/seeders/book.seeder';
import { seedChapters, chapters } from '@/seeders/chapter.seeder';
import { seedHeadings } from '@/seeders/heading.seeder';
import { seedSubHeadings } from '@/seeders/subHeading.seeder';
import { seedServices } from '@/seeders/service.seeder';
import { seedMcqs } from '@/seeders/mcqs.seeder';
import { seedUsers } from '@/seeders/user.seeder';
import { config, connectMongo, disconnectMongo } from '@/config';

const SEED_ORDER = [
  { name: 'class',            fn: seedClasses,      data: classes },
  { name: 'board',            fn: seedBoards,       data: boards },
  { name: 'book',    fn: seedBooks,    data: books },
  { name: 'chapter', fn: seedChapters, data: chapters },
  { name: 'heading',          fn: seedHeadings,     data: [] },
  { name: 'subHeading',       fn: seedSubHeadings,  data: [] },
  { name: 'service',          fn: seedServices,     data: [] },
  { name: 'linkClassServices',fn: linkClassServices,data: [] },
  { name: 'mcqs',             fn: seedMcqs,         data: [] },
  { name: 'result',          fn: seedResults,         data: [] },
  { name: 'pairing-scheme', fn: seedPairingSchemes,  data: [] },
  { name: 'user',             fn: seedUsers,        data: [] },
];

async function run() {
  const args = process.argv.slice(2);
  const target = args[0]?.replace('--', '');
  const runAll = !target || target === 'all';

  console.log('🚀 Starting seeding...');

  await connectMongo({ uri: config.MONGODB_URI });

  try {
    if (runAll) {
      for (const { name, fn } of SEED_ORDER) {
        console.log(`\n📦 Seeding ${name}...`);
        await fn();
      }
    } else {
      const seeder = SEED_ORDER.find(s => s.name === target);
      if (!seeder) {
        console.error(`❌ Unknown seeder: ${target}`);
        console.log(`Available seeders: ${SEED_ORDER.map(s => s.name).join(', ')}`);
        process.exit(1);
      }
      console.log(`\n📦 Seeding ${seeder.name}...`);
      await seeder.fn();
    }

    console.log('\n✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exitCode = 1;
  } finally {
    await disconnectMongo();
  }
}

run();
