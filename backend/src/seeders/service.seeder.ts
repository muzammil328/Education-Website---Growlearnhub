import ServiceModel from '../models/service.model';
import { slugify } from '@muzammil328/core';

export interface RawServiceSeed {
  className: string;
  name: string;
  description?: string;
  image?: string;
  status?: 'active' | 'inactive';
  order?: number;
  keywords?: string[];
}

const SERVICE_TYPES = [
  {
    name: 'Online Test',
    description: 'Online tests and quizzes for exam preparation',
    keywords: ['online test', 'quiz', 'exam', 'practice'],
  },
  {
    name: 'MCQs',
    description: 'Chapter-wise multiple choice questions',
    keywords: ['mcqs', 'multiple choice', 'questions', 'quiz'],
  },
  {
    name: 'Books',
    description: 'Textbooks and study material',
    keywords: ['books', 'textbook', 'study material'],
  },
  {
    name: 'Past Paper',
    description: 'Previous year exam papers for practice',
    keywords: ['past paper', 'previous paper', 'exam paper'],
  },
  {
    name: 'Notes',
    description: 'Study notes and summaries',
    keywords: ['notes', 'study notes', 'summary'],
  },
  {
    name: 'Date Sheet',
    description: 'Exam schedules and date sheets',
    keywords: ['date sheet', 'exam schedule', 'timetable'],
  },
  {
    name: 'Pairing Scheme',
    description: 'Question paper pairing schemes',
    keywords: ['pairing scheme', 'paper pattern', 'question distribution'],
  },
  {
    name: 'Result',
    description: 'Exam results and updates',
    keywords: ['result', 'exam result', 'marks'],
  },
];

export async function seedServices() {
  const skipped: string[] = [];
  let createdCount = 0;
  let updatedCount = 0;

  try {
    console.log('Starting Service seed...');

    for (const raw of SERVICE_TYPES) {
      const serviceSlug = slugify(raw.name);

      const existingService = await ServiceModel.findOne({
        slug: serviceSlug,
      });

      if (existingService) {
        existingService.name = raw.name;
        existingService.description = raw.description;
        existingService.status = 'active';
        await existingService.save();
        updatedCount += 1;
        console.log(`Updated Service: ${raw.name}`);
        continue;
      }

      await ServiceModel.create({
        name: raw.name,
        slug: serviceSlug,
        description: raw.description,
        status: 'active',
        keywords: raw.keywords,
      });

      createdCount += 1;
      console.log(`Created Service: ${raw.name}`);
    }

    console.log('Service seeding completed.');
    console.log(`Created: ${createdCount}, Updated: ${updatedCount}, Skipped: ${skipped.length}`);
  } catch (error) {
    console.error('Error seeding Services:', error);
    throw error;
  }
}
