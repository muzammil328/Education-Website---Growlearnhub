import { createTRPCRouter } from '@/trpc/trpc';
import { serviceByClassSlug } from './serviceByClassSlug';
import { bookGetByClassAndServiceSlug } from './bookGetByClassAndServiceSlug';
import { chapterGetByClassAndServiceAndSubjectSlug } from './chapterGetByClassAndServiceAndSubjectSlug';
import { headingGetByClassAndServiceAndSubjectAndChapterSlug } from './headingGetByClassAndServiceAndSubjectAndChapterSlug';
import { subHeadingGetByClassAndServiceAndSubjectAndChapterAndHeadingSlug } from './subHeadingGetByClassAndServiceAndSubjectAndChapterAndHeadingSlug';
import { boardGetBySlug } from './boardGetBySlug';
import { classGetByServiceSlug } from './classGetByServiceSlug';
import { mcqsBySlug } from './mcqsBySlug';

export const publicRouter = createTRPCRouter({
  getServiceByClassSlug: serviceByClassSlug,
  getBookByClassAndServiceSlug: bookGetByClassAndServiceSlug,
  getChapterByClassAndServiceAndSubjectSlug: chapterGetByClassAndServiceAndSubjectSlug,
  getByHeadingClassAndServiceAndSubjectAndChapterSlug: headingGetByClassAndServiceAndSubjectAndChapterSlug,
  getBySubHeadingClassAndServiceAndSubjectAndChapterAndHeadingSlug: subHeadingGetByClassAndServiceAndSubjectAndChapterAndHeadingSlug,

  getByBoardSlug: boardGetBySlug,
  getByClassServiceSlug: classGetByServiceSlug,
  mcqsBySlug,
});
