import { createTRPCRouter } from './trpc';
import { authRouter } from '../routers/auth.router';
import { classRouter } from '../routers/class.router';
import { bookRouter } from '../routers/book.router';
import { chapterRouter } from '../routers/chapter.router';
import { headingRouter } from '../routers/heading.router';
import { subHeadingRouter } from '../routers/subHeading.router';
import { serviceRouter } from '../routers/service.router';
import { boardRouter } from '../routers/board.router';
import { sitemapRouter } from '../routers/sitemap.router';
import { mcqsRouter } from '../routers/mcqs.router';
import { feedbackRouter } from '../routers/feedback.router';
import { studentRouter } from '../routers/student.router';
import { institutionRouter } from '../routers/institution.router';
import { mcqAttemptRouter } from '../routers/mcqAttempt.router';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  class: classRouter,
  book: bookRouter,
  chapter: chapterRouter,
  heading: headingRouter,
  subHeading: subHeadingRouter,
  service: serviceRouter,
  board: boardRouter,
  sitemap: sitemapRouter,
  mcqs: mcqsRouter,
  mcqAttempt: mcqAttemptRouter,
  institution: institutionRouter,
  feedback: feedbackRouter,
  student: studentRouter,
});

export type AppRouter = typeof appRouter;
