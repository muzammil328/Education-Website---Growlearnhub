export interface EducationBoard {
  slug: string;
  name: string;
}

export interface Subject {
  slug: string;
  name: string;
}

export interface PastPaperClassItem {
  slug: string;
  className: string;
  classShortName: string;
  image: string;
  summary: string;
  keywords: readonly string[];
}

export interface NotesClassItem {
  slug: string;
  className: string;
  classShortName: string;
  image: string;
  summary: string;
  keywords: readonly string[];
}

// Past Paper Configuration
export const PAST_PAPER_BOARDS: EducationBoard[] = [
  { slug: 'faisalabad-board', name: 'Faisalabad Board' },
  { slug: 'lahore-board', name: 'Lahore Board' },
];

export const PAST_PAPER_SUBJECTS: Subject[] = [
  { slug: 'biology', name: 'Biology' },
  { slug: 'chemistry', name: 'Chemistry' },
  { slug: 'physics', name: 'Physics' },
];

const PAST_PAPER_CLASS_CONFIG = [
  {
    slug: 'class-9',
    className: 'Class 9',
    classShortName: '9th Class',
    image: '/9th/class_9_past_paper_growlearnhub.png',
    summary:
      'Access a comprehensive collection of 9th Class past papers for the year 2025, covering all major boards. These past papers are invaluable resources for exam preparation.',
    keywords: [
      '9th class past papers 2025',
      'class 9 past papers Punjab board',
      'past papers class 9 pdf',
      'Faisalabad board past papers 9th',
      'Lahore board past papers class 9',
      'GrowLearnHub past papers',
    ],
  },
  {
    slug: 'class-10',
    className: 'Class 10',
    classShortName: '10th Class',
    image: '/10th/class_10_past_paper.webp',
    summary:
      'Explore 10th Class past papers from all boards to understand exam patterns and practice effectively for your matric exams.',
    keywords: [
      '10th class past papers 2025',
      'class 10 past papers board',
      'matric past papers pdf',
      'Lahore board past papers 10th',
      'Faisalabad board past papers class 10',
      'GrowLearnHub past papers',
    ],
  },
  {
    slug: 'class-11',
    className: 'Class 11',
    classShortName: '11th Class',
    image: '/11th/class_11_past_paper.webp',
    summary:
      'Access 11th Class past papers to prepare for first-year exams. Practice with papers from all boards to strengthen your exam skills.',
    keywords: [
      '11th class past papers 2025',
      'first year past papers',
      'class 11 past papers board',
      'intermediate past papers 11th',
      'GrowLearnHub past papers',
    ],
  },
  {
    slug: 'class-12',
    className: 'Class 12',
    classShortName: '12th Class',
    image: '/12th/class_12_past_paper.webp',
    summary:
      'Download 12th Class past papers from all boards to get ready for final-year exams. Practice with authentic exam questions.',
    keywords: [
      '12th class past papers 2025',
      'second year past papers',
      'class 12 past papers board',
      'intermediate past papers 12th',
      'GrowLearnHub past papers',
    ],
  },
] as const;

// Notes Configuration
export const NOTES_BOARD: EducationBoard = {
  slug: 'punjab-board',
  name: 'Punjab Board',
};

export const NOTES_SUBJECTS: Subject[] = [
  { slug: 'biology', name: 'Biology' },
  { slug: 'chemistry', name: 'Chemistry' },
  { slug: 'physics', name: 'Physics' },
];

const NOTES_CLASS_CONFIG = [
  {
    slug: 'class-9',
    className: 'Class 9',
    classShortName: '9th Class',
    image: '/9th/class_9_notes_growlearnhub.png',
    summary:
      'Download comprehensive 9th Class notes for all subjects in PDF format. Access chapter-wise summaries, key concepts, and practice questions.',
    keywords: [
      '9th class notes 2025',
      'class 9 notes PDF',
      '9th class all subjects notes',
      'class 9 chapter-wise notes',
      'GrowLearnHub 9th class notes',
      'free class 9 notes download',
    ],
  },
  {
    slug: 'class-10',
    className: 'Class 10',
    classShortName: '10th Class',
    image: '/10th/class_10_notes.webp',
    summary:
      'Class 10 notes providing chapter summaries, key concepts, and study guides for effective exam preparation.',
    keywords: [
      '10th class notes 2025',
      'class 10 notes PDF',
      '10th class all subjects notes',
      'class 10 chapter-wise notes',
      'GrowLearnHub 10th class notes',
      'matric notes',
    ],
  },
  {
    slug: 'class-11',
    className: 'Class 11',
    classShortName: '11th Class',
    image: '/11th/class_11_notes.webp',
    summary:
      'Comprehensive 11th Class notes covering all subjects with detailed explanations for first-year exam preparation.',
    keywords: [
      '11th class notes 2025',
      'first year notes PDF',
      'class 11 all subjects notes',
      'class 11 chapter-wise notes',
      'GrowLearnHub 11th class notes',
      'intermediate notes',
    ],
  },
  {
    slug: 'class-12',
    className: 'Class 12',
    classShortName: '12th Class',
    image: '/12th/class_12_notes.webp',
    summary:
      'Class 12 notes with in-depth subject coverage and concept explanations for second-year students.',
    keywords: [
      '12th class notes 2025',
      'second year notes PDF',
      'class 12 all subjects notes',
      'class 12 chapter-wise notes',
      'GrowLearnHub 12th class notes',
      'intermediate notes',
    ],
  },
] as const;

// Export mapped arrays
export const PAST_PAPER_CLASSES: PastPaperClassItem[] = PAST_PAPER_CLASS_CONFIG.map(item => ({
  ...item,
}));
export const NOTES_CLASSES: NotesClassItem[] = NOTES_CLASS_CONFIG.map(item => ({ ...item }));

export const PAST_PAPER_CLASS_CARDS = PAST_PAPER_CLASSES.map((item, index) => ({
  id: index,
  name: item.className,
  slug: `${item.slug}/past-paper`,
}));

export const NOTES_CLASS_CARDS = NOTES_CLASSES.map((item, index) => ({
  id: index,
  name: item.className,
  slug: `${item.slug}/notes`,
}));

// Accessor Functions
export function getPastPaperClass(classSlug: string): PastPaperClassItem | undefined {
  return PAST_PAPER_CLASSES.find(item => item.slug === classSlug);
}

export function getNotesClass(classSlug: string): NotesClassItem | undefined {
  return NOTES_CLASSES.find(item => item.slug === classSlug);
}

export function getPastPaperBoard(boardSlug: string): EducationBoard | undefined {
  return PAST_PAPER_BOARDS.find(board => board.slug === boardSlug);
}

export function getPastPaperSubject(subjectSlug: string): Subject | undefined {
  return PAST_PAPER_SUBJECTS.find(subject => subject.slug === subjectSlug);
}

export function getNotesBoard(boardSlug: string): EducationBoard | undefined {
  return boardSlug === NOTES_BOARD.slug ? NOTES_BOARD : undefined;
}

export function getNotesSubject(subjectSlug: string): Subject | undefined {
  return NOTES_SUBJECTS.find(subject => subject.slug === subjectSlug);
}

export function getPastPaperAdjacentBoards(currentBoardSlug: string) {
  const index = PAST_PAPER_BOARDS.findIndex(board => board.slug === currentBoardSlug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? PAST_PAPER_BOARDS[index - 1] : null,
    next: index < PAST_PAPER_BOARDS.length - 1 ? PAST_PAPER_BOARDS[index + 1] : null,
  };
}

export function getPastPaperAdjacentSubjects(currentSubjectSlug: string) {
  const index = PAST_PAPER_SUBJECTS.findIndex(subject => subject.slug === currentSubjectSlug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? PAST_PAPER_SUBJECTS[index - 1] : null,
    next: index < PAST_PAPER_SUBJECTS.length - 1 ? PAST_PAPER_SUBJECTS[index + 1] : null,
  };
}

export function getNotesAdjacentSubjects(currentSubjectSlug: string) {
  const index = NOTES_SUBJECTS.findIndex(subject => subject.slug === currentSubjectSlug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? NOTES_SUBJECTS[index - 1] : null,
    next: index < NOTES_SUBJECTS.length - 1 ? NOTES_SUBJECTS[index + 1] : null,
  };
}
