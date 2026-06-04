import { classRepository } from '../repository/class.repository';
import { bookRepository } from '../repository/book.repository';
import { chapterRepository } from '../repository/chapter.repository';
import { headingRepository } from '../repository/heading.repository';
import { subHeadingRepository } from '../repository/subHeading.repository';
import { mcqsRepository } from '../repository/mcqs.repository';

const BASE_URL = 'https://growlearnhub.com';

export interface SitemapUrl {
  loc: string;
  lastmod?: Date;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SitemapResult {
  urls: string[];
  count: number;
}

export const sitemapService = {
  async getClasses(): Promise<SitemapResult> {
    const classes = await classRepository.findAll({
      query: { status: 'active' },
    });

    const urls = [...new Set(classes.map(cls => `${BASE_URL}/${cls.slug}/mcqs/`))];

    return { urls, count: urls.length };
  },

  async getBooks(): Promise<SitemapResult> {
    const books = await bookRepository.aggregate<{ slug?: string; classSlug?: string }>([
      { $match: { status: 'active' } },
      {
        $lookup: {
          from: 'classes',
          localField: 'classId',
          foreignField: '_id',
          as: 'classDoc',
        },
      },
      { $unwind: { path: '$classDoc', preserveNullAndEmptyArrays: true } },
      { $project: { slug: 1, classSlug: '$classDoc.slug' } },
    ]);

    const urls = [
      ...new Set(books.map(book => `${BASE_URL}/${book.classSlug}/mcqs/${book.slug}/`)),
    ];

    return { urls, count: urls.length };
  },

  async getChapters(): Promise<SitemapResult> {
    const chapters = await chapterRepository.aggregate<{
      slug?: string;
      classSlug?: string;
      bookSlug?: string;
    }>([
      { $match: { status: 'active' } },
      {
        $lookup: {
          from: 'classes',
          localField: 'classId',
          foreignField: '_id',
          as: 'classDoc',
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'bookDoc',
        },
      },
      { $unwind: { path: '$classDoc', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$bookDoc', preserveNullAndEmptyArrays: true } },
      { $project: { slug: 1, classSlug: '$classDoc.slug', bookSlug: '$bookDoc.slug' } },
    ]);

    const urls = [
      ...new Set(chapters.map(ch => `${BASE_URL}/${ch.classSlug}/mcqs/${ch.bookSlug}/${ch.slug}/`)),
    ];

    return { urls, count: urls.length };
  },

  async getHeadings(): Promise<SitemapResult> {
    const headings = await headingRepository.aggregate<{ slug?: string; bookSlug?: string }>([
      { $match: { status: 'active' } },
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'bookDoc',
        },
      },
      { $unwind: { path: '$bookDoc', preserveNullAndEmptyArrays: true } },
      { $project: { slug: 1, bookSlug: '$bookDoc.slug' } },
    ]);

    const urls = [...new Set(headings.map(h => `${BASE_URL}/mcqs-point/${h.bookSlug}/${h.slug}/`))];

    return { urls, count: urls.length };
  },

  async getSubHeadings(): Promise<SitemapResult> {
    const subHeadings = await subHeadingRepository.aggregate<{
      slug?: string;
      headingSlug?: string;
      bookSlug?: string;
    }>([
      { $match: { status: 'active' } },
      {
        $lookup: {
          from: 'headings',
          localField: 'headingId',
          foreignField: '_id',
          as: 'headingDoc',
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'bookDoc',
        },
      },
      { $unwind: { path: '$headingDoc', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$bookDoc', preserveNullAndEmptyArrays: true } },
      { $project: { slug: 1, headingSlug: '$headingDoc.slug', bookSlug: '$bookDoc.slug' } },
    ]);

    const urls = [
      ...new Set(
        subHeadings.map(sh => `${BASE_URL}/mcqs-point/${sh.bookSlug}/${sh.headingSlug}/${sh.slug}/`)
      ),
    ];

    return { urls, count: urls.length };
  },

  async getMcqs(): Promise<SitemapResult> {
    const questions = await mcqsRepository.findAll({
      query: { status: 'active' },
    });

    const urls = [...new Set(questions.map(q => `${BASE_URL}/mcqs-point/${q.slug}/`))];

    return { urls, count: urls.length };
  },

  async getAll(): Promise<Record<string, SitemapResult>> {
    const [classes, books, chapters, headings, subHeadings, mcqs] = await Promise.all([
      this.getClasses(),
      this.getBooks(),
      this.getChapters(),
      this.getHeadings(),
      this.getSubHeadings(),
      this.getMcqs(),
    ]);

    return {
      classes,
      books,
      chapters,
      headings,
      subHeadings,
      mcqs,
    };
  },
};
