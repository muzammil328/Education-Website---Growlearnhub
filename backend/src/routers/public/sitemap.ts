import { publicProcedure } from '@/trpc/trpc';
import BookModel from '@/models/book.model';
import ChapterModel from '@/models/chapter.model';
import HeadingModel from '@/models/heading.model';
import SubHeadingModel from '@/models/subHeading.model';
import ClassModel from '@/models/class.model';
import BoardModel from '@/models/board.model';
import VuHandoutModel from '@/models/vuHandout.model';

const BASE = 'https://growlearnhub.com';

// Static pages that always exist
const STATIC_URLS = [
  `${BASE}/`,
  `${BASE}/mcqs/`,
  `${BASE}/online-test/`,
  `${BASE}/blogs/`,
  `${BASE}/books/`,
  `${BASE}/notes/`,
  `${BASE}/date-sheet/`,
  `${BASE}/result/`,
  `${BASE}/pairing-scheme/`,
  `${BASE}/past-paper/`,
  `${BASE}/explore-topics/`,
  `${BASE}/jobs-opportunities/`,
  `${BASE}/vu/`,
  `${BASE}/vu/handouts/`,
  `${BASE}/vu/final-mcqs/`,
  `${BASE}/vu/mid-mcqs/`,
  `${BASE}/vu/mid-mark-calculator/`,
];

// Per-class static sub-pages (9,10,11,12)
const CLASS_STATIC_SERVICES = [
  'mcqs',
  'online-test',
  'books',
  'notes',
  'past-paper',
  'pairing-scheme',
  'result',
  'date-sheet',
];

export const sitemapStatic = publicProcedure.query(() => STATIC_URLS);

export const sitemapClasses = publicProcedure.query(async () => {
  const classes = (await ClassModel.find().select('slug').lean()) as unknown as { slug: string }[];
  const matricClasses = classes.filter(c =>
    ['class-9', 'class-10', 'class-11', 'class-12'].includes(c.slug)
  );

  const urls: string[] = [];
  for (const cls of matricClasses) {
    urls.push(`${BASE}/${cls.slug}/`);
    for (const service of CLASS_STATIC_SERVICES) {
      urls.push(`${BASE}/${cls.slug}/${service}/`);
    }
  }
  return urls;
});

export const sitemapBooks = publicProcedure.query(async () => {
  const books = (await BookModel.find({ classId: { $ne: null } })
    .populate('classId', 'slug')
    .select('slug classId')
    .lean()) as unknown as { slug: string; classId: { slug: string } }[];

  const urls: string[] = [];
  for (const { slug, classId } of books) {
    if (!classId?.slug) continue;
    const cls = classId.slug;
    // MCQs book listing
    urls.push(`${BASE}/${cls}/mcqs/${slug}/`);
    // Online test book listing
    urls.push(`${BASE}/${cls}/online-test/${slug}/`);
    // Books viewer
    urls.push(`${BASE}/${cls}/books/${slug}/`);
    // Past paper book listing (class-9 uses [board])
    if (cls === 'class-9') {
      // board-level past papers handled in sitemapBoards
    } else {
      urls.push(`${BASE}/${cls}/past-paper/${slug}/`);
    }
    // Pairing scheme subject
    if (['class-10', 'class-11', 'class-12'].includes(cls)) {
      urls.push(`${BASE}/${cls}/pairing-scheme/${slug}/`);
    }
  }
  return [...new Set(urls)];
});

export const sitemapChapters = publicProcedure.query(async () => {
  const chapters = (await ChapterModel.find({
    classId: { $ne: null },
    bookId: { $ne: null },
  })
    .populate('classId', 'slug')
    .populate('bookId', 'slug')
    .select('slug classId bookId')
    .lean()) as unknown as { slug: string; classId: { slug: string }; bookId: { slug: string } }[];

  const urls: string[] = [];
  for (const { slug, classId, bookId } of chapters) {
    if (!classId?.slug || !bookId?.slug) continue;
    const cls = classId.slug;
    const book = bookId.slug;
    // MCQs chapter
    urls.push(`${BASE}/${cls}/mcqs/${book}/${slug}/`);
    // Online test chapter
    urls.push(`${BASE}/${cls}/online-test/${book}/${slug}/`);
    // Books chapter
    urls.push(`${BASE}/${cls}/books/${book}/${slug}/`);
    // Past paper chapter (class-9 past-paper uses [board] not [subject])
    if (cls !== 'class-9') {
      urls.push(`${BASE}/${cls}/past-paper/${book}/${slug}/`);
    }
  }
  return [...new Set(urls)];
});

export const sitemapBoards = publicProcedure.query(async () => {
  const boards = (await BoardModel.find()
    .populate('classId', 'slug')
    .select('slug classId')
    .lean()) as unknown as { slug: string; classId: { slug: string }[] }[];

  const urls: string[] = [];
  for (const { slug, classId } of boards) {
    for (const cls of classId ?? []) {
      if (!cls?.slug) continue;
      const c = cls.slug;
      urls.push(`${BASE}/${c}/result/${slug}/`);
      urls.push(`${BASE}/${c}/date-sheet/${slug}/`);
      // class-9 past-paper uses [board] segment
      if (c === 'class-9') {
        urls.push(`${BASE}/${c}/past-paper/${slug}/`);
      }
    }
  }
  return [...new Set(urls)];
});

export const sitemapHeadings = publicProcedure.query(async () => {
  const headings = (await HeadingModel.find({ bookId: { $ne: null } })
    .populate('bookId', 'slug')
    .select('slug bookId')
    .lean()) as unknown as { slug: string; bookId: { slug: string } }[];

  const urls = headings
    .filter(h => h.bookId?.slug)
    .map(({ slug, bookId }) => `${BASE}/mcqs/${bookId.slug}/${slug}/`);
  return [...new Set(urls)];
});

export const sitemapSubHeadings = publicProcedure.query(async () => {
  const subHeadings = (await SubHeadingModel.find({
    headingId: { $ne: null },
    bookId: { $ne: null },
  })
    .populate('headingId', 'slug')
    .populate('bookId', 'slug')
    .select('slug headingId bookId')
    .lean()) as unknown as { slug: string; headingId: { slug: string }; bookId: { slug: string } }[];

  const urls = subHeadings
    .filter(s => s.headingId?.slug && s.bookId?.slug)
    .map(
      ({ slug, headingId, bookId }) =>
        `${BASE}/mcqs/${bookId.slug}/${headingId.slug}/${slug}/`
    );
  return [...new Set(urls)];
});

export const sitemapOnlineTest = publicProcedure.query(async () => {
  const headings = (await HeadingModel.find({ bookId: { $ne: null } })
    .populate('bookId', 'slug')
    .select('slug bookId')
    .lean()) as unknown as { slug: string; bookId: { slug: string } }[];

  const subHeadings = (await SubHeadingModel.find({
    headingId: { $ne: null },
    bookId: { $ne: null },
  })
    .populate('headingId', 'slug')
    .populate('bookId', 'slug')
    .select('slug headingId bookId')
    .lean()) as unknown as { slug: string; headingId: { slug: string }; bookId: { slug: string } }[];

  const headingUrls = headings
    .filter(h => h.bookId?.slug)
    .map(({ slug, bookId }) => `${BASE}/online-test/${bookId.slug}/${slug}/`);

  const subHeadingUrls = subHeadings
    .filter(s => s.headingId?.slug && s.bookId?.slug)
    .map(
      ({ slug, headingId, bookId }) =>
        `${BASE}/online-test/${bookId.slug}/${headingId.slug}/${slug}/`
    );

  return [...new Set([...headingUrls, ...subHeadingUrls])];
});

export const sitemapVu = publicProcedure.query(async () => {
  // VU Handouts
  const handouts = (await VuHandoutModel.find({ status: 'active' })
    .select('slug')
    .lean()) as unknown as { slug: string }[];

  const handoutUrls = handouts.map(h => `${BASE}/vu/handouts/${h.slug}/`);

  // VU Books (final-mcqs and mid-mcqs are books with serviceId pointing to Final Exam / Mid Exam)
  const vuBooks = (await BookModel.find({ classId: { $ne: null } })
    .populate('classId', 'slug')
    .populate('serviceId', 'slug')
    .select('slug classId serviceId externalLinks')
    .lean()) as unknown as {
    slug: string;
    classId: { slug: string };
    serviceId: { slug: string }[];
    externalLinks?: { name: string; slug: string; url: string }[];
  }[];

  const vuFinalUrls: string[] = [];
  const vuMidUrls: string[] = [];

  for (const book of vuBooks) {
    if (book.classId?.slug !== 'vu') continue;
    const services = (book.serviceId ?? []).map(s => s?.slug);

    if (services.includes('final-exam')) {
      vuFinalUrls.push(`${BASE}/vu/final-mcqs/${book.slug}/`);
      for (const link of book.externalLinks ?? []) {
        vuFinalUrls.push(`${BASE}/vu/final-mcqs/${book.slug}/${link.slug}/`);
      }
    }

    if (services.includes('mid-exam')) {
      vuMidUrls.push(`${BASE}/vu/mid-mcqs/${book.slug}/`);
      for (const link of book.externalLinks ?? []) {
        vuMidUrls.push(`${BASE}/vu/mid-mcqs/${book.slug}/${link.slug}/`);
      }
    }
  }

  return [...new Set([...handoutUrls, ...vuFinalUrls, ...vuMidUrls])];
});
