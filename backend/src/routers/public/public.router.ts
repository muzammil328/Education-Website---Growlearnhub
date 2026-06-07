import { createTRPCRouter } from '@/trpc/trpc';
import { serviceByClassSlug } from './serviceByClassSlug';
import { bookGetByClassAndServiceSlug } from './bookGetByClassAndServiceSlug';
import { chapterGetByClassAndServiceAndSubjectSlug } from './chapterGetByClassAndServiceAndSubjectSlug';
import { boardGetBySlug } from './boardGetBySlug';
import { classGetByServiceSlug } from './classGetByServiceSlug';
import { headingGetBySlug } from './headingGetBySlug';
import { subHeadingGetBySlug } from './subHeadingGetBySlug';

export const publicRouter = createTRPCRouter({
  getServiceByClassSlug: serviceByClassSlug,
  getBookByClassAndServiceSlug: bookGetByClassAndServiceSlug,
  getChapterByClassAndServiceAndSubjectSlug: chapterGetByClassAndServiceAndSubjectSlug,

  getByBoardSlug: boardGetBySlug,
  getByHeadingSlug: headingGetBySlug,
  getBySubHeadingSlug: subHeadingGetBySlug,
  getByClassServiceSlug: classGetByServiceSlug,
});
