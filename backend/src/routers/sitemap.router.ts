import { createTRPCRouter, publicProcedure } from '@/trpc/trpc';
import Mcqs from '@/models/mcqs.model';
import ClassModel from '@/models/class.model';
import BookModel from '@/models/book.model';
import ChapterModel from '@/models/chapter.model';
import HeadingModel from '@/models/heading.model';
import SubHeadingModel from '@/models/subHeading.model';

export const sitemapRouter = createTRPCRouter({
  getClasses: publicProcedure.query(async () => {
    const mcqs = (await Mcqs.find({ status: 'active' }).select('slug').lean()) as unknown as {
      slug: string;
    }[];

    const urls = [
      ...new Set(mcqs.map(({ slug }) => `https://growlearnhub.com/mcqs-point/${slug}/`)),
    ];

    return urls;
  }),

  getBooks: publicProcedure.query(async () => {
    const books = (await BookModel.find({ classId: { $ne: null } })
      .populate('classId', 'slug')
      .select('slug classId')
      .lean()) as unknown as { slug: string; classId: { slug: string } }[];

    const urls = [
      ...new Set(
        books.map(({ slug, classId }) => `https://growlearnhub.com/${classId.slug}/mcqs/${slug}/`)
      ),
    ];

    return urls;
  }),

  getChapters: publicProcedure.query(async () => {
    const chapters = (await ChapterModel.find({
      classId: { $ne: null },
      bookId: { $ne: null },
    })
      .populate('classId', 'slug')
      .populate('bookId', 'slug')
      .select('slug classId bookId')
      .lean()) as unknown as {
      slug: string;
      classId: { slug: string };
      bookId: { slug: string };
    }[];

    const urls = [
      ...new Set(
        chapters.map(
          ({ slug, classId, bookId }) =>
            `https://growlearnhub.com/${classId.slug}/mcqs/${bookId.slug}/${slug}/`
        )
      ),
    ];

    return urls;
  }),

  getMcqs: publicProcedure.query(async () => {
    const classes = await ClassModel.find().select('slug').lean();
    const books = await BookModel.find({ status: 'active', classId: null }).select('slug').lean();

    const classUrls = [
      ...new Set(classes.map(({ slug }) => `https://growlearnhub.com/${slug}/mcqs/`)),
    ];
    const bookUrls = [
      ...new Set(books.map(({ slug }) => `https://growlearnhub.com/mcqs-point/${slug}/`)),
    ];

    return [...classUrls, ...bookUrls];
  }),

  getHeadings: publicProcedure.query(async () => {
    const headings = (await HeadingModel.find({ bookId: { $ne: null } })
      .populate('bookId', 'slug')
      .select('slug bookId')
      .lean()) as unknown as { slug: string; bookId: { slug: string } }[];

    const urls = [
      ...new Set(
        headings.map(
          ({ slug, bookId }) => `https://growlearnhub.com/mcqs-point/${bookId.slug}/${slug}/`
        )
      ),
    ];

    return urls;
  }),

  getSubHeadings: publicProcedure.query(async () => {
    const subHeadings = (await SubHeadingModel.find({
      headingId: { $ne: null },
      bookId: { $ne: null },
    })
      .populate('headingId', 'slug')
      .populate('bookId', 'slug')
      .select('slug headingId bookId')
      .lean()) as unknown as {
      slug: string;
      headingId: { slug: string };
      bookId: { slug: string };
    }[];

    const urls = [
      ...new Set(
        subHeadings.map(
          ({ slug, headingId, bookId }) =>
            `https://growlearnhub.com/mcqs-point/${bookId.slug}/${headingId.slug}/${slug}/`
        )
      ),
    ];

    return urls;
  }),
});
