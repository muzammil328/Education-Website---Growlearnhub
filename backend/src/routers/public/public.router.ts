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
import { booksByClassSlug } from './booksByClassSlug';
import { bookDetailByClassAndBookSlug } from './bookDetailByClassAndBookSlug';
import { chapterDetailByClassBookChapterSlug } from './chapterDetailByClassBookChapterSlug';
import { boardsByClassAndService } from './boardsByClassAndService';
import { resultByClassAndBoard } from './resultByClassAndBoard';
import { pairingSchemeByClassAndBoard } from './pairingSchemeByClassAndBoard';
import { dateSheetByClassAndBoard } from './dateSheetByClassAndBoard';

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

  // Boards & Results
  getBoardsByClassAndService: boardsByClassAndService,
  getResultByClassAndBoard: resultByClassAndBoard,
  getPairingSchemeByClassAndBoard: pairingSchemeByClassAndBoard,
  getDateSheetByClassAndBoard: dateSheetByClassAndBoard,

  // Books public API
  getBooksByClass: booksByClassSlug,
  getBookDetail: bookDetailByClassAndBookSlug,
  getChapterDetail: chapterDetailByClassBookChapterSlug,
});
