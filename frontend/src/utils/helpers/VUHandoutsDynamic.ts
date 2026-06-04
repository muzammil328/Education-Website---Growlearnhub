export type VUDepartment = 'cs' | 'edu' | 'eng' | 'isl' | 'mgt' | 'mth' | 'pak' | 'phy';

export interface VUChapterItem {
  id: number;
  title: string;
  content: string;
}

export interface VUCourse {
  slug: string;
  code: string;
  department: VUDepartment;
  name: string;
  title: string;
  description: string;
  image: string;
  keywords: string[];
  fileId?: string;
  creditHours?: string;
  totalPages?: string;
  totalChapters?: number;
  midCoverage?: string;
  finalCoverage?: string;
  chapters?: VUChapterItem[];
}

const DEFAULT_PDF_ID = '1SmfqPlQ_8e_XCjKEJp5jN-8CIlqKUT1B';

const COURSE_FILE_IDS: Record<string, string> = {
  cs001: '1MzRHGl29oPDXg_1qQa-c1Qx-epeZPFA1',
  cs101: '1dU8PTOyoMVR8TyHy8JHK_uJPsg1vdKA1',
  cs201: '1lJ8QqEt8u802l4uQVwWAGR5SpgMLJNs1',
  cs202: '1AeGjx3nTTpjDHo61mbiswy6CMy436ddk',
  cs301: '17cgkevqouhidUWOiSKIBN1ru2nyGJARD',
  cs302: '1-gIlWU1bzd1xunZleOZK62hYPe5lAx60',
  cs304: '1opP-C3RHzZNCt2vJr2KlZEv67tW7rF-Y',
  cs403: '1O95DBWoVvB-RB-fp3wRSz_UOOxeadOXe',
  cs506: '1MFWWLAR_NnpjQp4zT_Qu5FUB5_raw3zH',
  cs508: '1RFzHbMJooqfSJxLH6TcHip2Uw_n9TW3P',
  cs602: '17cgkevqouhidUWOiSKIBN1ru2nyGJARD',
  cs607: '1Y4d2Av5q15CYz-yQMil-6uO75MlguwU6',
  edu201: '18elgecgmBP5x2amVaqomdwagp3qLPdgQ',
  edu301: '1NfI1D0Y7SdT3_pwusNXPdH3wobOResUY',
  edu401: '1O0LH1TbdIpyhQjpM6ymk5tGyx6DsvKdn',
  edu406: '1hR7Ysm-1N1ZF_B6oaJiOEEzecT9kv435',
  eng101: '1gDBtsJSnlExsfZXgzhyf7LaH3pX8MXRA',
  eng501: '1lHXy9w9nIf5rxU5Sp2JLAWepsoYMo8Hg',
  eng502: '1iVv5DeUoAGLv_JpBpqlUtAcaxg9CZrLh',
  eng504: '1wgwGMEbn1kxTl-UiB9HDdis0vVwuQKnL',
  isl202: '1Sm3vLHri7rszDBx6DqugcUcicLzzU88m',
  mgt211: '1Long1Eiq5Lhd1vtMgQ8ozlQ3SnSSPkRW',
  mth101: '11HEKljuPzpA_sE_XqU439xHoAIx0DvDJ',
  mth202: '1ZMORFY4TeLuuASr1H6cnElR1fT261ug3',
  mth302: '116nfqPd15DztyR9KLMtCK_Dz6VH6jhaF',
  mth501: '1AZOY0rsxLQw0V6lbkIlHueilJhAjl0sr',
  mth301: DEFAULT_PDF_ID,
  mth303: DEFAULT_PDF_ID,
  mth401: DEFAULT_PDF_ID,
  mth601: DEFAULT_PDF_ID,
  mth603: DEFAULT_PDF_ID,
  mth621: DEFAULT_PDF_ID,
  mth622: DEFAULT_PDF_ID,
  mth631: DEFAULT_PDF_ID,
  mth632: '1BbmeMsqXQumZ3d8l2Mb43hRBMQ9iev7p',
  mth633: DEFAULT_PDF_ID,
  mth634: DEFAULT_PDF_ID,
  mth641: DEFAULT_PDF_ID,
  mth701: DEFAULT_PDF_ID,
  mth706: DEFAULT_PDF_ID,
  mth7123: DEFAULT_PDF_ID,
  mth718: DEFAULT_PDF_ID,
  mth721: DEFAULT_PDF_ID,
  pak301: '1isfKdtzjfihDTVAEcXrTn3hEzQDc62Vj',
  phy101: '1fyb07qww0G5XTfuIYk4q7hJc-8vCMZVg',
};

const MGT211_CHAPTERS: VUChapterItem[] = [
  { id: 1, title: 'Chapter 1', content: 'INTRODUCTION' },
  { id: 2, title: 'Chapter 2', content: 'ORGANIZATIONAL BOUNDARIES AND ENVIRONMENTS' },
  { id: 3, title: 'Chapter 3', content: 'BUSINESS ORGANIZATION & SOLE PROPRIETORSHIP' },
  { id: 4, title: 'Chapter 4', content: 'PARTNERSHIP' },
  { id: 5, title: 'Chapter 5', content: 'JOINT STOCK COMPANY' },
  { id: 6, title: 'Chapter 6', content: 'JOINT STOCK COMPANY II' },
  { id: 7, title: 'Chapter 7', content: 'WHAT IS A MEETING' },
  { id: 8, title: 'Chapter 8', content: 'COOPERATIVE SOCIETY' },
  { id: 9, title: 'Chapter 9', content: 'CONCEPT OF ENTREPRENEURSHIP' },
  { id: 10, title: 'Chapter 10', content: 'FRANCHISING' },
  { id: 11, title: 'Chapter 11', content: 'SUCCESS AND FAILURE OF BUSINESS' },
  { id: 12, title: 'Chapter 12', content: 'FOREIGN TRADE & FOREIGN BUSINESS' },
  { id: 13, title: 'Chapter 13', content: 'BARRIERS TO INTERNATIONAL TRADE' },
  { id: 14, title: 'Chapter 14', content: 'STAKE HOLDERS' },
  { id: 15, title: 'Chapter 15', content: 'SETTING GOALS AND FORMULATING STRATEGY' },
  { id: 16, title: 'Chapter 16', content: 'HUMAN RESOURCE PLANNING' },
  { id: 17, title: 'Chapter 17', content: 'INFRASTRUCTURE FOR TEST' },
  { id: 18, title: 'Chapter 18', content: 'COMPENSATION AND BENEFITS' },
  { id: 19, title: 'Chapter 19', content: 'CONTEMPORARY MOTIVATIONAL THEORIES' },
  { id: 20, title: 'Chapter 20', content: 'TWO-FACTOR THEORY OR HYGIENE THEORY' },
  { id: 21, title: 'Chapter 21', content: 'STRATEGIES FOR ENHANCING JOB SATISFACTION AND MORALE' },
  { id: 22, title: 'Chapter 22', content: 'WHAT IS MARKETING' },
  { id: 23, title: 'Chapter 23', content: 'DIFFERENCE BETWEEN MARKETING AND SELLING' },
  { id: 24, title: 'Chapter 24', content: 'THE MARKETING MIX' },
  { id: 25, title: 'Chapter 25', content: 'MARKETING RESEARCH' },
  { id: 26, title: 'Chapter 26', content: 'CONSUMER BEHAVIOR & MARKETING RESEARCH' },
  { id: 27, title: 'Chapter 27', content: 'PRODUCT TYPES AND PRODUCT DEVELOPMENT STEPS' },
  { id: 28, title: 'Chapter 28', content: 'PRODUCT LIFE CYCLE, BRANDING, PACKAGING, LABELING' },
  { id: 29, title: 'Chapter 29', content: 'PRICING & DISTRIBUTION MIX' },
  { id: 30, title: 'Chapter 30', content: 'WHOLESALING, RETAILING, PHYSICAL DISTRIBUTION' },
  { id: 31, title: 'Chapter 31', content: 'PROMOTION & ADVERTISEMENT' },
  { id: 32, title: 'Chapter 32', content: 'PERSONAL SELLING' },
  { id: 33, title: 'Chapter 33', content: 'PERSONAL SELLING II' },
  { id: 34, title: 'Chapter 34', content: 'SALES PROMOTION' },
  { id: 35, title: 'Chapter 35', content: 'THE PRODUCTIVITY' },
  { id: 36, title: 'Chapter 36', content: 'TOOLS FOR PRODUCTION PLANNING' },
  { id: 37, title: 'Chapter 37', content: 'TOTAL QUALITY MANAGEMENT' },
  { id: 38, title: 'Chapter 38', content: 'TOTAL QUALITY MANAGEMENT II' },
  { id: 39, title: 'Chapter 39', content: 'BENCHMARKING' },
  { id: 40, title: 'Chapter 40', content: 'COMMUNICATION' },
  { id: 41, title: 'Chapter 41', content: 'NON-VERBAL COMMUNICATION' },
  { id: 42, title: 'Chapter 42', content: 'APPLICATION OF INFORMATION SYSTEM IN THE ORGANIZATION' },
  { id: 43, title: 'Chapter 43', content: 'ACCOUNTING' },
  { id: 44, title: 'Chapter 44', content: 'TOOLS OF THE ACCOUNTING TRADE' },
  { id: 45, title: 'Chapter 45', content: 'FINANCIAL MANAGEMENT' },
];

const COURSE_INDEX: Array<{ department: VUDepartment; code: string }> = [
  { department: 'cs', code: 'cs001' },
  { department: 'cs', code: 'cs101' },
  { department: 'cs', code: 'cs201' },
  { department: 'cs', code: 'cs202' },
  { department: 'cs', code: 'cs205' },
  { department: 'cs', code: 'cs206' },
  { department: 'cs', code: 'cs301' },
  { department: 'cs', code: 'cs302' },
  { department: 'cs', code: 'cs304' },
  { department: 'cs', code: 'cs310' },
  { department: 'cs', code: 'cs311' },
  { department: 'cs', code: 'cs312' },
  { department: 'cs', code: 'cs315' },
  { department: 'cs', code: 'cs401' },
  { department: 'cs', code: 'cs402' },
  { department: 'cs', code: 'cs403' },
  { department: 'cs', code: 'cs405' },
  { department: 'cs', code: 'cs407' },
  { department: 'cs', code: 'cs408' },
  { department: 'cs', code: 'cs410' },
  { department: 'cs', code: 'cs411' },
  { department: 'cs', code: 'cs432' },
  { department: 'cs', code: 'cs435' },
  { department: 'cs', code: 'cs506' },
  { department: 'cs', code: 'cs508' },
  { department: 'cs', code: 'cs602' },
  { department: 'cs', code: 'cs607' },
  { department: 'edu', code: 'edu201' },
  { department: 'edu', code: 'edu301' },
  { department: 'edu', code: 'edu401' },
  { department: 'edu', code: 'edu406' },
  { department: 'eng', code: 'eng101' },
  { department: 'eng', code: 'eng201' },
  { department: 'eng', code: 'eng501' },
  { department: 'eng', code: 'eng502' },
  { department: 'eng', code: 'eng504' },
  { department: 'isl', code: 'isl202' },
  { department: 'mgt', code: 'mgt211' },
  { department: 'mth', code: 'mth001' },
  { department: 'mth', code: 'mth100' },
  { department: 'mth', code: 'mth101' },
  { department: 'mth', code: 'mth102' },
  { department: 'mth', code: 'mth201' },
  { department: 'mth', code: 'mth202' },
  { department: 'mth', code: 'mth301' },
  { department: 'mth', code: 'mth302' },
  { department: 'mth', code: 'mth303' },
  { department: 'mth', code: 'mth401' },
  { department: 'mth', code: 'mth501' },
  { department: 'mth', code: 'mth601' },
  { department: 'mth', code: 'mth603' },
  { department: 'mth', code: 'mth621' },
  { department: 'mth', code: 'mth622' },
  { department: 'mth', code: 'mth631' },
  { department: 'mth', code: 'mth632' },
  { department: 'mth', code: 'mth633' },
  { department: 'mth', code: 'mth634' },
  { department: 'mth', code: 'mth641' },
  { department: 'mth', code: 'mth701' },
  { department: 'mth', code: 'mth706' },
  { department: 'mth', code: 'mth7123' },
  { department: 'mth', code: 'mth718' },
  { department: 'mth', code: 'mth721' },
  { department: 'pak', code: 'pak301' },
  { department: 'pak', code: 'pak302' },
  { department: 'phy', code: 'phy101' },
  { department: 'phy', code: 'phy301' },
];

const DEPARTMENT_LABELS: Record<VUDepartment, string> = {
  cs: 'Computer Science',
  edu: 'Education',
  eng: 'English',
  isl: 'Islamic Studies',
  mgt: 'Management',
  mth: 'Mathematics',
  pak: 'Pakistan Studies',
  phy: 'Physics',
};

function toUpperCode(slug: string): string {
  return slug.toUpperCase();
}

function buildImagePath(code: string): string {
  return `/vu/handouts/${code}_handouts.webp`;
}

export const VU_COURSES: VUCourse[] = COURSE_INDEX.map(({ department, code }) => {
  const upperCode = toUpperCode(code);
  const fileId = COURSE_FILE_IDS[code];

  const baseCourse: VUCourse = {
    slug: code,
    code: upperCode,
    department,
    name: `${upperCode} Handouts`,
    title: `${upperCode} Handouts Free PDF Download | VU Students`,
    description: `Download ${upperCode} handouts PDF for free. Get course notes, study support, and exam preparation material for Virtual University students.`,
    image: buildImagePath(code),
    keywords: [
      'growlearnhub',
      `vu ${code} handouts`,
      `${code} handouts pdf`,
      'virtual university handouts',
      `${upperCode} handouts`,
    ],
    fileId,
    creditHours: '3 Credit',
    totalPages: 'N/A',
    totalChapters: 0,
    midCoverage: 'Course dependent',
    finalCoverage: 'Course dependent',
  };

  if (code === 'mgt211') {
    return {
      ...baseCourse,
      description:
        'Download VU MGT211 handouts for free and get access to past papers, study guides, and exam preparation tips.',
      fileId: COURSE_FILE_IDS.mgt211,
      totalPages: '198',
      totalChapters: 45,
      midCoverage: '1 to 21',
      finalCoverage: '22 to 45',
      chapters: MGT211_CHAPTERS,
    };
  }

  return baseCourse;
});

export const VU_COURSE_CARDS = VU_COURSES.map(course => ({
  name: `${course.code} Handouts`,
  slug: course.slug,
}));

export const VU_COURSES_BY_DEPARTMENT = Object.entries(
  VU_COURSES.reduce<Record<VUDepartment, VUCourse[]>>(
    (acc, course) => {
      acc[course.department].push(course);
      return acc;
    },
    {
      cs: [],
      edu: [],
      eng: [],
      isl: [],
      mgt: [],
      mth: [],
      pak: [],
      phy: [],
    }
  )
).map(([department, courses]) => ({
  department: department as VUDepartment,
  label: DEPARTMENT_LABELS[department as VUDepartment],
  courses,
}));

export function getVuCourse(slug: string): VUCourse | undefined {
  return VU_COURSES.find(course => course.slug === slug);
}

export function getVuAdjacentCourses(slug: string) {
  const index = VU_COURSES.findIndex(course => course.slug === slug);

  if (index < 0) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? VU_COURSES[index - 1] : null,
    next: index < VU_COURSES.length - 1 ? VU_COURSES[index + 1] : null,
  };
}
