import fs from 'fs';
import path from 'path';
import { connectMongo, disconnectMongo } from '@/config/db.config';
import { config } from '@/config/env.config';
import Class from '@/models/class.model';
import Book from '@/models/book.model';
import Chapter from '@/models/chapter.model';
import Heading from '@/models/heading.model';
import SubHeading from '@/models/subHeading.model';
import Question from '@/models/mcqs.model';
import { slugify } from '@muzammil328/utils';

const DATA_DIR = path.join(__dirname, 'data/mcqs');

interface JsonQuestion {
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface JsonMcqEntry {
  className: string;
  bookName: string;
  chapterName: string;
  headingName?: string;
  subHeadingName?: string;
  questions: JsonQuestion[];
}

async function importMcqsFromJson() {
  try {
    await connectMongo({ uri: config.MONGODB_URI });
    console.log('🚀 Starting MCQ import from JSON files...');

    if (!fs.existsSync(DATA_DIR)) {
      console.error(`❌ Data directory not found: ${DATA_DIR}`);
      process.exit(1);
    }

    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

    if (files.length === 0) {
      console.log('⚠️  No JSON files found in data directory');
      return;
    }

    console.log(`📂 Found ${files.length} JSON file(s) to process`);

    let totalCreated = 0;
    let totalSkipped = 0;

    for (const file of files) {
      const filePath = path.join(DATA_DIR, file);
      console.log(`\n📄 Processing: ${file}`);

      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const entries: JsonMcqEntry[] = JSON.parse(fileContent);

        for (const entry of entries) {
          const classSlug = entry.className.toLowerCase().trim();
          const bookSlug = slugify(entry.bookName);
          const chapterSlug = slugify(entry.chapterName);

          const classDoc = await Class.findOne({ slug: classSlug, status: 'active' });
          if (!classDoc) {
            console.log(`  ⏭️  Skipping: class "${entry.className}" not found`);
            totalSkipped++;
            continue;
          }

          const bookDoc = await Book.findOne({
            slug: bookSlug,
            classId: classDoc._id,
            status: 'active',
          });
          if (!bookDoc) {
            console.log(`  ⏭️  Skipping: book "${entry.bookName}" not found`);
            totalSkipped++;
            continue;
          }

          const chapterDoc = await Chapter.findOne({
            slug: chapterSlug,
            bookId: bookDoc._id,
            status: 'active',
          });
          if (!chapterDoc) {
            console.log(`  ⏭️  Skipping: chapter "${entry.chapterName}" not found`);
            totalSkipped++;
            continue;
          }

          let headingDoc = null;
          if (entry.headingName) {
            const headingSlug = slugify(entry.headingName);
            headingDoc = await Heading.findOne({
              slug: headingSlug,
              chapterId: chapterDoc._id,
              status: 'active',
            });
          }

          let subHeadingDoc = null;
          if (entry.subHeadingName && headingDoc) {
            const subHeadingSlug = slugify(entry.subHeadingName);
            subHeadingDoc = await SubHeading.findOne({
              slug: subHeadingSlug,
              headingId: headingDoc._id,
              status: 'active',
            });
          }

          const questionsToInsert = entry.questions.map(q => ({
            name: q.question,
            slug: slugify(q.question),
            question: q.question,
            options: q.options,
            correctOption: q.correctOption,
            explanation: q.explanation || '',
            difficulty: q.difficulty || 'medium',
            status: 'inactive' as const,
            classId: classDoc._id,
            bookId: bookDoc._id,
            chapterId: chapterDoc._id,
            headingId: headingDoc?._id || undefined,
            subHeadingId: subHeadingDoc?._id || undefined,
          }));

          const result = await Question.insertMany(questionsToInsert, { ordered: false });
          totalCreated += result.length;
          console.log(
            `  ✅ Created ${result.length} MCQ(s) for ${entry.className} > ${entry.bookName} > ${entry.chapterName}`
          );
        }
      } catch (error) {
        console.error(`  ❌ Error processing ${file}:`, error);
      }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Import completed!`);
    console.log(`   Created: ${totalCreated}`);
    console.log(`   Skipped: ${totalSkipped}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exitCode = 1;
  } finally {
    await disconnectMongo();
  }
}

importMcqsFromJson();
