import { createTRPCRouter } from './trpc';
import { authRouter } from '../routers/auth.router';
import { userAuthRouter } from '../routers';
import { classRouter } from '../routers/class/class.router';
import { bookRouter } from '../routers/book/book.router';
import { chapterRouter } from '../routers/chapter/chapter.router';
import { headingRouter } from '../routers/heading/heading.router';
import { subHeadingRouter } from '../routers/subHeading/subHeading.router';
import { serviceRouter } from '../routers/service/service.router';
import { boardRouter } from '../routers/board/board.router';
import { mcqsRouter } from '../routers/mcqs.router';
import { feedbackRouter } from '../routers/feedback.router';
import { commentRouter } from '../routers/comment.router';
import { studentRouter } from '../routers/student.router';
import { institutionRouter } from '../routers/institution.router';
import { mcqAttemptRouter } from '../routers/mcqAttempt.router';
import { publicRouter } from '../routers/public/public.router';
import { userProgressRouter } from '../routers/userProgress.router';
import { adaptiveMcqRouter } from '../routers/adaptiveMcq.router';
import { analyticsRouter } from '../routers/analytics.router';
import { paymentRouter } from '../routers/payment.router';
import { bulkImportRouter } from '../routers/bulkImport.router';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userAuthRouter,
  class: classRouter,
  book: bookRouter,
  chapter: chapterRouter,
  heading: headingRouter,
  subHeading: subHeadingRouter,
  service: serviceRouter,
  board: boardRouter,
  mcqs: mcqsRouter,
  mcqAttempt: mcqAttemptRouter,
  institution: institutionRouter,
  feedback: feedbackRouter,
  comment: commentRouter,
  student: studentRouter,
  public: publicRouter,
  userProgress: userProgressRouter,
  adaptiveMcq: adaptiveMcqRouter,
  analytics: analyticsRouter,
  payment: paymentRouter,
  bulkImport: bulkImportRouter,
});

export type AppRouter = typeof appRouter;
