import { createTRPCRouter } from '@/trpc/trpc';
import { serviceByClassSlug } from './serviceByClassSlug';
import { bookGetByClassAndServiceSlug } from './bookGetByClassAndServiceSlug';
import { chapterGetByClassAndServiceAndSubjectSlug } from './chapterGetByClassAndServiceAndSubjectSlug';
import { headingGetByClassAndServiceAndSubjectAndChapterSlug } from './headingGetByClassAndServiceAndSubjectAndChapterSlug';
import { subHeadingGetByClassAndServiceAndSubjectAndChapterAndHeadingSlug } from './subHeadingGetByClassAndServiceAndSubjectAndChapterAndHeadingSlug';
import { boardGetBySlug } from './boardGetBySlug';
import { classGetByServiceSlug } from './classGetByServiceSlug';
import { mcqsBySlug } from './mcqsBySlug';
import { mcqsSetsBySlug } from './mcqsSetsBySlug';
import { getMcqBySlug } from './getMcqBySlug';

export const publicRouter = createTRPCRouter({
  getServiceByClassSlug: serviceByClassSlug,
  getBookByClassAndServiceSlug: bookGetByClassAndServiceSlug,
  getChapterByClassAndServiceAndSubjectSlug: chapterGetByClassAndServiceAndSubjectSlug,
  getByHeadingClassAndServiceAndSubjectAndChapterSlug: headingGetByClassAndServiceAndSubjectAndChapterSlug,
  getBySubHeadingClassAndServiceAndSubjectAndChapterAndHeadingSlug: subHeadingGetByClassAndServiceAndSubjectAndChapterAndHeadingSlug,
  getMcqsBySlug: mcqsBySlug,
  getMcqsSetsBySlug: mcqsSetsBySlug,
  getMcqBySlug: getMcqBySlug,

  getByBoardSlug: boardGetBySlug,
  getByClassServiceSlug: classGetByServiceSlug,
});
