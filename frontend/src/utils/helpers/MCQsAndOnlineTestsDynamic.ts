export interface Subject {
  slug: string;
  name: string;
  color?: string;
}

export interface MCQsClassItem {
  slug: string;
  className: string;
  classShortName: string;
  image: string;
  summary: string;
  keywords: readonly string[];
  subjects: readonly string[];
}

export interface OnlineTestClassItem {
  slug: string;
  className: string;
  classShortName: string;
  image: string;
  summary: string;
  keywords: readonly string[];
  subjects: readonly string[];
}

// Subjects available for MCQs and Online Tests
export const MCQS_SUBJECTS: Subject[] = [
  { slug: 'biology', name: 'Biology', color: 'from-green-500 to-green-600' },
  { slug: 'chemistry', name: 'Chemistry', color: 'from-blue-500 to-blue-600' },
  { slug: 'physics', name: 'Physics', color: 'from-purple-500 to-purple-600' },
];

// MCQs Class Configuration
const MCQS_CLASS_CONFIG = [
  {
    slug: 'class-9',
    className: 'Class 9',
    classShortName: '9th Class',
    image: '/9th/class_9_mcqs_growlearnhub.png',
    summary:
      'Practice comprehensive Class 9 MCQs covering Biology, Chemistry, and Physics. Chapter-wise questions with detailed explanations for exam preparation.',
    keywords: [
      'class 9 mcqs',
      '9th class multiple choice questions',
      'class 9 chapter-wise mcqs',
      'class 9 mcq practice',
      'growlearnhub class 9 mcqs',
      '9th class biology chemistry physics mcqs',
      'free class 9 mcq tests',
    ],
    subjects: ['biology', 'chemistry', 'physics'],
  },
  {
    slug: 'class-10',
    className: 'Class 10',
    classShortName: '10th Class',
    image: '/10th/class_10_mcqs.webp',
    summary:
      'Prepare for matric exams with Class 10 MCQs. Comprehensive chapter-wise questions in Biology, Chemistry, and Physics with instant feedback.',
    keywords: [
      'class 10 mcqs',
      '10th class multiple choice questions',
      'matric mcqs',
      'class 10 chapter-wise mcqs',
      'class 10 mcq practice',
      'growlearnhub class 10 mcqs',
      '10th class biology chemistry physics mcqs',
      'free matric mcq tests',
    ],
    subjects: ['biology', 'chemistry', 'physics'],
  },
  {
    slug: 'class-11',
    className: 'Class 11',
    classShortName: '11th Class',
    image: '/11th/class_11_mcqs.webp',
    summary:
      'Master Class 11 concepts with comprehensive MCQs. Subject-specific questions in Biology, Chemistry, and Physics for first-year students.',
    keywords: [
      'class 11 mcqs',
      '11th class multiple choice questions',
      'first year mcqs',
      'class 11 chapter-wise mcqs',
      'intermediate mcqs',
      'class 11 mcq practice',
      'growlearnhub class 11 mcqs',
      '11th class biology chemistry physics mcqs',
    ],
    subjects: ['biology', 'chemistry', 'physics'],
  },
  {
    slug: 'class-12',
    className: 'Class 12',
    classShortName: '12th Class',
    image: '/12th/class_12_mcqs.webp',
    summary:
      'Ace your final exams with Class 12 MCQs. In-depth questions covering all chapters in Biology, Chemistry, and Physics with complete solutions.',
    keywords: [
      'class 12 mcqs',
      '12th class multiple choice questions',
      'second year mcqs',
      'class 12 chapter-wise mcqs',
      'intermediate part 2 mcqs',
      'class 12 mcq practice',
      'growlearnhub class 12 mcqs',
      '12th class biology chemistry physics mcqs',
      'free class 12 mcq tests',
    ],
    subjects: ['biology', 'chemistry', 'physics'],
  },
] as const;

// Online Tests Class Configuration
const ONLINE_TEST_CLASS_CONFIG = [
  {
    slug: 'class-9',
    className: 'Class 9',
    classShortName: '9th Class',
    image: '/9th/class_9_online_test_growlearnhub.png',
    summary:
      'Take interactive Class 9 online tests covering all chapters. Get instant feedback, detailed explanations, and performance analytics for focused learning.',
    keywords: [
      'class 9 online test',
      '9th class MCQs quiz',
      'class 9 quizzes',
      'class 9 practice exams',
      'free class 9 tests',
      '9th class online quizzes',
      'growlearnhub class 9 tests',
      'class 9 chapter-wise tests',
    ],
    subjects: ['biology', 'chemistry', 'physics'],
  },
  {
    slug: 'class-10',
    className: 'Class 10',
    classShortName: '10th Class',
    image: '/10th/class_10_online_test.webp',
    summary:
      'Prepare for matric with Class 10 online tests. Interactive quizzes with timed practice, instant scoring, and detailed answer explanations.',
    keywords: [
      'class 10 online test',
      '10th class MCQ quiz',
      'matric online tests',
      'class 10 quizzes',
      'class 10 practice exams',
      'free matric tests',
      'growlearnhub class 10 tests',
      'class 10 chapter-wise tests with answers',
    ],
    subjects: ['biology', 'chemistry', 'physics'],
  },
  {
    slug: 'class-11',
    className: 'Class 11',
    classShortName: '11th Class',
    image: '/11th/class_11_online_test.webp',
    summary:
      'Access Class 11 online tests with real-time performance tracking. Comprehensive quizzes for Biology, Chemistry, and Physics with detailed solutions.',
    keywords: [
      'class 11 online test',
      '11th class MCQ quiz',
      'first year online tests',
      'intermediate tests',
      'class 11 chapter-wise tests',
      'class 11 practice exams',
      'growlearnhub class 11 tests',
      '11th class biology chemistry physics tests',
    ],
    subjects: ['biology', 'chemistry', 'physics'],
  },
  {
    slug: 'class-12',
    className: 'Class 12',
    classShortName: '12th Class',
    image: '/12th/class_12_online_test.webp',
    summary:
      'Ace your final exams with Class 12 online tests. Full-length practice exams with instant feedback, performance analytics, and expert explanations.',
    keywords: [
      'class 12 online test',
      '12th class MCQ quiz',
      'second year online tests',
      'intermediate part 2 tests',
      'class 12 chapter-wise tests',
      'class 12 practice exams',
      'growlearnhub class 12 tests',
      '12th class biology chemistry physics tests',
      'pre-board exams practice',
    ],
    subjects: ['biology', 'chemistry', 'physics'],
  },
] as const;

export const MCQS_CLASSES: MCQsClassItem[] = MCQS_CLASS_CONFIG.map(item => ({ ...item }));
export const ONLINE_TEST_CLASSES: OnlineTestClassItem[] = ONLINE_TEST_CLASS_CONFIG.map(item => ({
  ...item,
}));

export const MCQS_CLASS_CARDS = MCQS_CLASSES.map((item, index) => ({
  id: index,
  name: item.className,
  slug: `${item.slug}/mcqs`,
}));

export const ONLINE_TEST_CLASS_CARDS = ONLINE_TEST_CLASSES.map((item, index) => ({
  id: index,
  name: item.className,
  slug: `${item.slug}/online-test`,
}));

// Accessor Functions
export function getMCQsClass(classSlug: string): MCQsClassItem | undefined {
  return MCQS_CLASSES.find(item => item.slug === classSlug);
}

export function getOnlineTestClass(classSlug: string): OnlineTestClassItem | undefined {
  return ONLINE_TEST_CLASSES.find(item => item.slug === classSlug);
}

export function getSubject(subjectSlug: string): Subject | undefined {
  return MCQS_SUBJECTS.find(subject => subject.slug === subjectSlug);
}

export function getAdjacentSubjects(currentSubjectSlug: string) {
  const index = MCQS_SUBJECTS.findIndex(subject => subject.slug === currentSubjectSlug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? MCQS_SUBJECTS[index - 1] : null,
    next: index < MCQS_SUBJECTS.length - 1 ? MCQS_SUBJECTS[index + 1] : null,
  };
}

// Helper for generating SEO metadata
export function generateMCQsMetadata(classItem: MCQsClassItem, subjectSlug?: string) {
  if (!subjectSlug) {
    const title = `${classItem.className} MCQs – Free Chapter-wise Practice | GrowLearnHub`;
    const description = classItem.summary;
    return { title, description, keywords: classItem.keywords };
  }

  const subject = getSubject(subjectSlug);
  if (!subject) return {};

  const title = `${classItem.className} ${subject.name} MCQs – Free Chapter-wise Questions | GrowLearnHub`;
  const description = `Practice ${classItem.classShortName} ${subject.name} multiple-choice questions with chapter-wise organization. Get instant feedback and detailed answers.`;
  const keywords = [
    `${classItem.classShortName.toLowerCase()} ${subject.name.toLowerCase()} mcqs`,
    `${classItem.className} ${subject.name} questions`,
    `free ${classItem.classShortName.toLowerCase()} ${subject.name.toLowerCase()} quz`,
  ];

  return { title, description, keywords };
}

export function generateOnlineTestMetadata(classItem: OnlineTestClassItem, subjectSlug?: string) {
  if (!subjectSlug) {
    const title = `${classItem.className} Online Tests – Interactive Quizzes & Practice | GrowLearnHub`;
    const description = classItem.summary;
    return { title, description, keywords: classItem.keywords };
  }

  const subject = getSubject(subjectSlug);
  if (!subject) return {};

  const title = `${classItem.className} ${subject.name} Online Test – Free Quiz & Practice Exam | GrowLearnHub`;
  const description = `Take interactive ${classItem.classShortName} ${subject.name} online tests with timed quizzes, instant scoring, and detailed explanations for every answer.`;
  const keywords = [
    `${classItem.classShortName.toLowerCase()} ${subject.name.toLowerCase()} online test`,
    `${classItem.className} ${subject.name} quiz`,
    `${classItem.className} ${subject.name} practice test`,
    `free ${classItem.className} online test`,
  ];

  return { title, description, keywords };
}
