export interface EducationBoard {
  slug: string;
  name: string;
}

export interface ResultClassItem {
  slug: string;
  className: string;
  classShortName: string;
  image: string;
  summary: string;
  keywords: readonly string[];
}

export interface DateSheetClassItem {
  slug: string;
  className: string;
  classShortName: string;
  image: string;
  summary: string;
  keywords: readonly string[];
}

export const PUNJAB_BOARDS: EducationBoard[] = [
  { slug: 'bahawalpur-board', name: 'Bahawalpur Board' },
  { slug: 'dg-khan-board', name: 'DG Khan Board' },
  { slug: 'faisalabad-board', name: 'Faisalabad Board' },
  { slug: 'gujranwala-board', name: 'Gujranwala Board' },
  { slug: 'lahore-board', name: 'Lahore Board' },
  { slug: 'multan-board', name: 'Multan Board' },
  { slug: 'rawalpindi-board', name: 'Rawalpindi Board' },
  { slug: 'sahiwal-board', name: 'Sahiwal Board' },
  { slug: 'sargodha-board', name: 'Sargodha Board' },
];

const RESULT_CLASS_CONFIG = [
  {
    slug: 'class-9',
    className: 'Class 9',
    classShortName: '9th Class',
    image: '/9th/class_9_result_growlearnhub.png',
    summary:
      'Check Class 9 board results by roll number and name for all Punjab boards with latest official updates.',
    keywords: [
      '9th class result 2025',
      'class 9 result by roll number',
      'punjab board class 9 result',
      'class 9 marksheet',
    ],
  },
  {
    slug: 'class-10',
    className: 'Class 10',
    classShortName: '10th Class',
    image: '/10th/class_10_result_growlearnhub.png',
    summary:
      'Find Class 10 board result links and board-wise updates to check marks quickly and accurately.',
    keywords: [
      '10th class result 2025',
      'class 10 result by roll number',
      'punjab board class 10 result',
      'matric result',
    ],
  },
  {
    slug: 'class-11',
    className: 'Class 11',
    classShortName: '11th Class',
    image: '/11th/class_11_result.webp',
    summary:
      'Access Class 11 result pages for all Punjab boards and track expected announcements and marksheet details.',
    keywords: [
      '11th class result 2025',
      'first year result',
      'class 11 result by name',
      'punjab board class 11 result',
    ],
  },
  {
    slug: 'class-12',
    className: 'Class 12',
    classShortName: '12th Class',
    image: '/12th/class_12_result.webp',
    summary:
      'Check Class 12 result by board with quick links, expected timings, and practical guidance for students.',
    keywords: [
      '12th class result 2025',
      'second year result',
      'class 12 result by roll number',
      'punjab board class 12 result',
    ],
  },
] as const;

const DATE_SHEET_CLASS_CONFIG = [
  {
    slug: 'class-9',
    className: 'Class 9',
    classShortName: '9th Class',
    image: '/9th/class_9_date_sheet_growlearnhub.png',
    summary:
      'Get the latest Class 9 date sheet updates for all Punjab boards and plan your exam preparation timeline.',
    keywords: [
      '9th class date sheet 2025',
      'class 9 board date sheet',
      'punjab board class 9 datesheet',
      '9th class exam schedule',
    ],
  },
  {
    slug: 'class-10',
    className: 'Class 10',
    classShortName: '10th Class',
    image: '/10th/class_10_date_sheet_growlearnhub.png',
    summary:
      'View board-wise Class 10 date sheets and prepare for each paper using an organized timetable approach.',
    keywords: [
      '10th class date sheet 2025',
      'class 10 board date sheet',
      'punjab board class 10 datesheet',
      'matric date sheet',
    ],
  },
  {
    slug: 'class-11',
    className: 'Class 11',
    classShortName: '11th Class',
    image: '/11th/class_11_date_sheet.webp',
    summary:
      'Track Class 11 date sheet announcements board-wise to build a consistent first-year revision schedule.',
    keywords: [
      '11th class date sheet 2025',
      'first year date sheet',
      'class 11 board date sheet',
      'punjab board class 11 datesheet',
    ],
  },
  {
    slug: 'class-12',
    className: 'Class 12',
    classShortName: '12th Class',
    image: '/12th/class_12_date_sheet.webp',
    summary:
      'Explore Class 12 date sheets across Punjab boards and schedule your final-year preparation effectively.',
    keywords: [
      '12th class date sheet 2025',
      'second year date sheet',
      'class 12 board date sheet',
      'punjab board class 12 datesheet',
    ],
  },
] as const;

export const RESULT_CLASSES: ResultClassItem[] = RESULT_CLASS_CONFIG.map(item => ({ ...item }));
export const DATE_SHEET_CLASSES: DateSheetClassItem[] = DATE_SHEET_CLASS_CONFIG.map(item => ({
  ...item,
}));

export const RESULT_CLASS_CARDS = RESULT_CLASSES.map((item, index) => ({
  id: index,
  name: item.className,
  slug: `${item.slug}/result`,
}));

export const DATE_SHEET_CLASS_CARDS = DATE_SHEET_CLASSES.map((item, index) => ({
  id: index,
  name: item.className,
  slug: `${item.slug}/date-sheet`,
}));

export function getResultClass(classSlug: string): ResultClassItem | undefined {
  return RESULT_CLASSES.find(item => item.slug === classSlug);
}

export function getDateSheetClass(classSlug: string): DateSheetClassItem | undefined {
  return DATE_SHEET_CLASSES.find(item => item.slug === classSlug);
}

export function getBoard(boardSlug: string): EducationBoard | undefined {
  return PUNJAB_BOARDS.find(board => board.slug === boardSlug);
}

export function getAdjacentBoards(currentBoardSlug: string) {
  const index = PUNJAB_BOARDS.findIndex(board => board.slug === currentBoardSlug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? PUNJAB_BOARDS[index - 1] : null,
    next: index < PUNJAB_BOARDS.length - 1 ? PUNJAB_BOARDS[index + 1] : null,
  };
}
