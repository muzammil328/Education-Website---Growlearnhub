export interface PairingSchemeRow {
  chapter: string;
  mcqs: number;
  short: number;
  long: number;
}

export interface PairingSchemeSubject {
  slug: string;
  name: string;
  summary: string;
  keywords: string[];
  scheme?: PairingSchemeRow[];
}

export interface PairingSchemeBoard {
  slug: string;
  name: string;
  subjects: PairingSchemeSubject[];
}

export interface PairingSchemeClass {
  slug: string;
  className: string;
  classShortName: string;
  image: string;
  summary: string;
  keywords: readonly string[];
  board: PairingSchemeBoard;
}

const DEFAULT_SUBJECTS: PairingSchemeSubject[] = [
  {
    slug: 'biology',
    name: 'Biology',
    summary:
      'Biology pairing scheme with chapter-wise question distribution for MCQs, short questions, and long questions.',
    keywords: ['biology pairing scheme', 'chapter wise biology paper pattern'],
  },
  {
    slug: 'chemistry',
    name: 'Chemistry',
    summary:
      'Chemistry pairing scheme focused on paper pattern, high-weight chapters, and practical preparation strategy.',
    keywords: ['chemistry pairing scheme', 'chemistry marks distribution'],
  },
  {
    slug: 'physics',
    name: 'Physics',
    summary:
      'Physics pairing scheme to understand unit weightage, objective portion coverage, and long-question planning.',
    keywords: ['physics pairing scheme', 'physics chapter wise paper pattern'],
  },
  {
    slug: 'math',
    name: 'Math',
    summary:
      'Mathematics pairing scheme for smart revision of theorem-heavy and exercise-based chapters before board exams.',
    keywords: ['math pairing scheme', 'math chapter wise distribution'],
  },
];

const CLASS9_BIOLOGY_SCHEME: PairingSchemeRow[] = [
  { chapter: '1 - Introduction to Biology', mcqs: 1, short: 1, long: 0 },
  { chapter: '2 - Solving a Biological Problem', mcqs: 1, short: 1, long: 0 },
  { chapter: '3 - Biodiversity', mcqs: 1, short: 2, long: 0 },
  { chapter: '4 - Cells and Tissues', mcqs: 2, short: 2, long: 1 },
  { chapter: '5 - Cell Cycle', mcqs: 1, short: 1, long: 1 },
  { chapter: '6 - Enzymes', mcqs: 1, short: 2, long: 0 },
  { chapter: '7 - Bioenergetics', mcqs: 2, short: 2, long: 1 },
  { chapter: '8 - Nutrition', mcqs: 2, short: 2, long: 1 },
  { chapter: '9 - Transport', mcqs: 3, short: 3, long: 1 },
];

function createSubjects(classSlug: string): PairingSchemeSubject[] {
  return DEFAULT_SUBJECTS.map(subject => {
    if (classSlug === 'class-9' && subject.slug === 'biology') {
      return { ...subject, scheme: CLASS9_BIOLOGY_SCHEME };
    }

    return subject;
  });
}

const CLASS_CONFIG = [
  {
    slug: 'class-9',
    className: 'Class 9',
    classShortName: '9th Class',
    image: '/9th/class_9_pairing_scheme_growlearnhub.png',
    summary:
      'Get updated Class 9 pairing schemes for Punjab Board subjects with chapter-wise marks distribution and paper pattern guidance.',
    keywords: [
      '9th class pairing scheme 2025',
      'class 9 paper scheme',
      'class 9 marks distribution',
      'punjab board class 9 pairing scheme',
    ],
  },
  {
    slug: 'class-10',
    className: 'Class 10',
    classShortName: '10th Class',
    image: '/10th/class_10_pairing_scheme_growlearnhub.png',
    summary:
      'Access Class 10 pairing schemes for Biology, Chemistry, Physics, and Math to plan revision according to board pattern.',
    keywords: [
      '10th class pairing scheme 2025',
      'class 10 paper scheme',
      'class 10 marks distribution',
      'punjab board class 10 pairing scheme',
    ],
  },
  {
    slug: 'class-11',
    className: 'Class 11',
    classShortName: '11th Class',
    image: '/11th/class_11_pairing_scheme_growlearnhub.png',
    summary:
      'Explore Class 11 pairing schemes with subject-level structure for first-year board exam preparation.',
    keywords: [
      '11th class pairing scheme 2025',
      'class 11 paper scheme',
      'first year pairing scheme',
      'punjab board class 11 pairing scheme',
    ],
  },
  {
    slug: 'class-12',
    className: 'Class 12',
    classShortName: '12th Class',
    image: '/12th/class_12_pairing_scheme_growlearnhub.png',
    summary:
      'Review Class 12 pairing schemes and align your second-year exam strategy with board question distribution.',
    keywords: [
      '12th class pairing scheme 2025',
      'class 12 paper scheme',
      'second year pairing scheme',
      'punjab board class 12 pairing scheme',
    ],
  },
] as const;

export const PAIRING_SCHEME_CLASSES: PairingSchemeClass[] = CLASS_CONFIG.map(classItem => ({
  ...classItem,
  board: {
    slug: 'punjab-board',
    name: 'Punjab Board',
    subjects: createSubjects(classItem.slug),
  },
}));

export const PAIRING_SCHEME_CLASS_CARDS = PAIRING_SCHEME_CLASSES.map((classItem, index) => ({
  id: index,
  name: classItem.className,
  slug: `${classItem.slug}/pairing-scheme`,
}));

export function getPairingClass(classSlug: string): PairingSchemeClass | undefined {
  return PAIRING_SCHEME_CLASSES.find(classItem => classItem.slug === classSlug);
}

export function getPairingBoard(
  classItem: PairingSchemeClass,
  boardSlug: string
): PairingSchemeBoard | undefined {
  return classItem.board.slug === boardSlug ? classItem.board : undefined;
}

export function getPairingSubject(
  board: PairingSchemeBoard,
  subjectSlug: string
): PairingSchemeSubject | undefined {
  return board.subjects.find(subject => subject.slug === subjectSlug);
}

export function getPairingAdjacentSubjects(board: PairingSchemeBoard, currentSubjectSlug: string) {
  const currentIndex = board.subjects.findIndex(subject => subject.slug === currentSubjectSlug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? board.subjects[currentIndex - 1] : null,
    next: currentIndex < board.subjects.length - 1 ? board.subjects[currentIndex + 1] : null,
  };
}
