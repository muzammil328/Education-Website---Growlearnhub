import { APP_CONFIG } from '@muzammil328/education-packages';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');

function createApiUrl(endpoint: string): string {
  const normalizedBase = API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`;
  const normalizedEndpoint = endpoint.replace(/^\/+/, '');

  if (!API_URL) {
    return `/api/${normalizedEndpoint}`;
  }

  return `${normalizedBase}/${normalizedEndpoint}`;
}

function createTrpcUrl(procedure: string): string {
  if (!API_URL) {
    return `/trpc/${procedure}`;
  }

  return `${API_URL}/trpc/${procedure}`;
}

export const config = {
  API_URL,
  SITE_URL: (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/+$/, ''),
  Frontend_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  GOOGLE_ANALYTICS_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_VERIFICATION,
  GOOGLE_SEARCH_CONSOLE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_VERIFICATION,
  AHREFS_SITE_VERIFICATION: process.env.NEXT_PUBLIC_AHREFS_SITE_VERIFICATION,

  auth: {
    register: createTrpcUrl('auth.register'),
    login: createTrpcUrl('auth.login'),
    logout: createTrpcUrl('auth.logout'),
    forgotPassword: createTrpcUrl('auth.forgotPassword'),
    verifyForgotPassword: createTrpcUrl('auth.verifyForgotPassword'),
    resetPassword: createTrpcUrl('auth.resetPassword'),
    refresh: createTrpcUrl('auth.refresh'),
    getMe: createTrpcUrl('auth.getMe'),
    updateProfile: createTrpcUrl('auth.updateProfile'),
  },

  board: {
    get: '/api/board/get',
    getDropdown: '/api/board/get-dropdown',

    getByIds: (serviceId?: string, status?: string, page?: number) =>
      `/api/board/get-by-ids?serviceId=${serviceId || ''}&status=${status || ''}&page=${page || ''}`,

    getByNames: (boardName?: string, serviceName?: string) =>
      `/api/board/get-by-names?boardName=${boardName || ''}&serviceName=${serviceName || ''}`,

    create: '/api/board/post',

    delete: (id: string) => `/api/board/delete/${id}`,

    update: (id: string) => `/api/board/update/${id}`,
  },

  book: {
    get: '/api/books/get',
    getDropdown: '/api/books/get-dropdown',
    getById: (id: string) => createApiUrl(`books/get/${id}`),
    getByName: (name: string) => createApiUrl(`books/name/${encodeURIComponent(name)}`),

    getByClassName: (className: string) =>
      createApiUrl(`books/class/${encodeURIComponent(className)}`),

    create: '/api/books/post',
    delete: (id: string) => `/api/books/delete/${id}`,
    update: (id: string) => `/api/books/update/${id}`,
  },

  chapter: {
    get: '/api/chapters/get',
    getDropdown: '/api/chapters/get-dropdown',
    getById: (id: string) => createApiUrl(`chapters/get/${id}`),
    getByClassAndBookName: (className: string, bookName: string) =>
      createApiUrl(
        `chapters/class/${encodeURIComponent(className)}/book/${encodeURIComponent(bookName)}`
      ),

    create: '/api/chapters/post',
    delete: (id: string) => `/api/chapters/delete/${id}`,
    update: (id: string) => `/api/chapters/update/${id}`,
  },

  class: {
    get: '/api/classes/get',
    getDropdown: '/api/classes/get-dropdown',
    getById: (id: string) => createApiUrl(`classes/get/${id}`),

    create: '/api/classes/post',
    delete: (id: string) => `/api/classes/delete/${id}`,
    update: (id: string) => `/api/classes/update/${id}`,
  },

  heading: {
    get: '/api/headings/get',
    getDropdown: '/api/headings/get-dropdown',
    getById: (id: string) => createApiUrl(`headings/get/${id}`),
    getByName: (name: string) => createApiUrl(`headings/name/${encodeURIComponent(name)}`),
    getByClassAndBookAndChapterName: (className: string, bookName: string, chapterName: string) =>
      createApiUrl(
        `headings/class/${encodeURIComponent(className)}/book/${encodeURIComponent(bookName)}/chapter/${encodeURIComponent(chapterName)}`
      ),

    getByIds: (
      classId?: string,
      bookId?: string,
      chapterId?: string,
      headingId?: string,
      status?: string
    ) =>
      `/api/headings/get-by-ids?classId=${classId || ''}&bookId=${bookId || ''}&chapterId=${chapterId || ''}&headingId=${headingId || ''}&status=${status || ''}`,

    getByNames: (
      className?: string,
      bookName?: string,
      chapterName?: string,
      headingName?: string,
      status?: string
    ) =>
      `/api/headings/get-by-names?className=${className || ''}&bookName=${bookName || ''}&chapterName=${chapterName || ''}&headingName=${headingName || ''}&status=${status || ''}`,

    create: '/api/headings/post',
    delete: (id: string) => `/api/headings/delete/${id}`,
    update: (id: string) => `/api/headings/update/${id}`,
  },

  mcqs: {
    get: '/api/mcqs/get',
    getDropdown: '/api/mcqs/get-dropdown',

    getByIds: (
      classId?: string,
      bookId?: string,
      chapterId?: string,
      headingId?: string,
      subHeadingId?: string,
      mcqId?: string,
      status?: string
    ) =>
      `/api/mcqs/get-by-ids?classId=${classId || ''}&bookId=${bookId || ''}&chapterId=${chapterId || ''}&headingId=${headingId || ''}&subHeadingId=${subHeadingId || ''}&mcqId=${mcqId || ''}&status=${status || ''}`,

    getByNames: (
      className?: string,
      bookName?: string,
      chapterName?: string,
      headingName?: string,
      subHeadingName?: string,
      question?: string,
      status?: string
    ) =>
      `/api/mcqs/get-by-names?className=${className || ''}&bookName=${bookName || ''}&chapterName=${chapterName || ''}&headingName=${headingName || ''}&subHeadingName=${subHeadingName || ''}&question=${question || ''}&status=${status || ''}`,

    create: '/api/mcqs/post',
    delete: (id: string) => `/api/mcqs/delete/${id}`,
    update: (id: string) => `/api/mcqs/update/${id}`,
  },

  service: {
    get: '/api/services/get',
    getById: (id: string) => createApiUrl(`services/get/${id}`),
    getByName: (name: string) => `${createTrpcUrl('service.getByName')}?batch=1&input=${encodeURIComponent(JSON.stringify({ '0': { name } }))}`,
    getDropdown: '/api/services/get-dropdown',

    getByIds: (serviceId?: string, classId?: string, bookId?: string, status?: string) =>
      `/api/services/get-by-ids?serviceId=${serviceId || ''}&classId=${classId || ''}&bookId=${bookId || ''}&status=${status || ''}`,

    getByNames: (serviceName?: string, className?: string, bookName?: string, status?: string) =>
      `/api/services/get-by-names?serviceName=${serviceName || ''}&className=${className || ''}&bookName=${bookName || ''}&status=${status || ''}`,

    create: '/api/services/post',
    delete: (id: string) => `/api/services/delete/${id}`,
    update: (id: string) => `/api/services/update/${id}`,
  },

  sitemap: {
    classes: createApiUrl('sitemap/class'),
    books: createApiUrl('sitemap/book'),
    chapters: createApiUrl('sitemap/chapter'),
    headings: createApiUrl('sitemap/heading'),
    subHeadings: createApiUrl('sitemap/subHeading'),
    mcqs: createApiUrl('sitemap/mcqs'),
  },

  subHeading: {
    get: '/api/subheadings/get',
    getDropdown: '/api/subheadings/get-dropdown',
    getById: (id: string) => createApiUrl(`subheadings/get/${id}`),
    getByName: (name: string) => createApiUrl(`subheadings/name/${encodeURIComponent(name)}`),
    getByClassAndBookAndChapterAndHeadingName: (
      className: string,
      bookName: string,
      chapterName: string,
      headingName: string
    ) =>
      createApiUrl(
        `subheadings/class/${encodeURIComponent(className)}/book/${encodeURIComponent(bookName)}/chapter/${encodeURIComponent(chapterName)}/heading/${encodeURIComponent(headingName)}`
      ),

    getByIds: (
      classId?: string,
      bookId?: string,
      chapterId?: string,
      headingId?: string,
      subHeadingId?: string,
      status?: string
    ) =>
      `/api/subheadings/get-by-ids?classId=${classId || ''}&bookId=${bookId || ''}&chapterId=${chapterId || ''}&headingId=${headingId || ''}&subHeadingId=${subHeadingId || ''}&status=${status || ''}`,

    getByNames: (
      className?: string,
      bookName?: string,
      chapterName?: string,
      headingName?: string,
      subHeadingName?: string,
      status?: string
    ) =>
      `/api/subheadings/get-by-names?className=${className || ''}&bookName=${bookName || ''}&chapterName=${chapterName || ''}&headingName=${headingName || ''}&subHeadingName=${subHeadingName || ''}&status=${status || ''}`,

    create: '/api/subheadings/post',
    delete: (id: string) => `/api/subheadings/delete/${id}`,
    update: (id: string) => `/api/subheadings/update/${id}`,
  },

  user: {
    getProfile: createTrpcUrl('auth.getMe'),
    updateProfile: createTrpcUrl('auth.updateProfile'),

    create: '/api/users/post',
    update: (userId: string) => `/api/users/update/${userId}`,
    delete: (userId: string) => `/api/users/delete/${userId}`,
  },

  app: {
    NAME: APP_CONFIG.name,
    VERSION: APP_CONFIG.version,
    SUPPORT_EMAIL: APP_CONFIG.supportEmail,
  },

  pdfBookId: {
    CS001_BOOK_ID: '1MzRHGl29oPDXg_1qQa-c1Qx-epeZPFA1',
    CS101_BOOK_ID: '1dU8PTOyoMVR8TyHy8JHK_uJPsg1vdKA1',
    CS201_BOOK_ID: '1lJ8QqEt8u802l4uQVwWAGR5SpgMLJNs1',
    CS202_BOOK_ID: '1AeGjx3nTTpjDHo61mbiswy6CMy436ddk',
    CS205_BOOK_ID: '',
    CS206_BOOK_ID: '',
    CS301_BOOK_ID: '17cgkevqouhidUWOiSKIBN1ru2nyGJARD',
    CS302_BOOK_ID: '',
    CS304_BOOK_ID: '1opP-C3RHzZNCt2vJr2KlZEv67tW7rF-Y',
    CS310_BOOK_ID: '',
    CS311_BOOK_ID: '',
    CS312_BOOK_ID: '',
    CS315_BOOK_ID: '',
    CS401_BOOK_ID: '',
    CS402_BOOK_ID: '',
    CS403_BOOK_ID: '1O95DBWoVvB-RB-fp3wRSz_UOOxeadOXe',
    CS405_BOOK_ID: '',
    CS407_BOOK_ID: '',
    CS408_BOOK_ID: '',
    CS410_BOOK_ID: '',
    CS411_BOOK_ID: '',
    CS432_BOOK_ID: '',
    CS435_BOOK_ID: '',
    CS506_BOOK_ID: '1MFWWLAR_NnpjQp4zT_Qu5FUB5_raw3zH',
    CS508_BOOK_ID: '1RFzHbMJooqfSJxLH6TcHip2Uw_n9TW3P',
    CS602_BOOK_ID: '17cgkevqouhidUWOiSKIBN1ru2nyGJARD',
    CS607_BOOK_ID: '1Y4d2Av5q15CYz-yQMil-6uO75MlguwU6',

    EDU201_BOOK_ID: '18elgecgmBP5x2amVaqomdwagp3qLPdgQ',
    EDU301_BOOK_ID: '1NfI1D0Y7SdT3_pwusNXPdH3wobOResUY',
    EDU401_BOOK_ID: '1O0LH1TbdIpyhQjpM6ymk5tGyx6DsvKdn',
    EDU406_BOOK_ID: '1hR7Ysm-1N1ZF_B6oaJiOEEzecT9kv435',

    ENG101_BOOK_ID: '1gDBtsJSnlExsfZXgzhyf7LaH3pX8MXRA',
    ENG201_BOOK_ID: '',
    ENG501_BOOK_ID: '1lHXy9w9nIf5rxU5Sp2JLAWepsoYMo8Hg',
    ENG502_BOOK_ID: '1iVv5DeUoAGLv_JpBpqlUtAcaxg9CZrLh',
    ENG504_BOOK_ID: '1wgwGMEbn1kxTl-UiB9HDdis0vVwuQKnL',

    ISL202_BOOK_ID: '1Sm3vLHri7rszDBx6DqugcUcicLzzU88m',

    MGT503_BOOK_ID: '1TegWpOjLsECbTgxu_mGbz8vDpVKrbfPt',

    MTH101_BOOK_ID: '11HEKljuPzpA_sE_XqU439xHoAIx0DvDJ',
    MTH202_BOOK_ID: '1ZMORFY4TeLuuASr1H6cnElR1fT261ug3',
    MTH302_BOOK_ID: '116nfqPd15DztyR9KLMtCK_Dz6VH6jhaF',
    MTH501_BOOK_ID: '1AZOY0rsxLQw0V6lbkIlHueilJhAjl0sr',

    PAK301_BOOK_ID: '1isfKdtzjfihDTVAEcXrTn3hEzQDc62Vj',

    PHY101_BOOK_ID: '1fyb07qww0G5XTfuIYk4q7hJc-8vCMZVg',

    PSY409_BOOK_ID: '17trJvamYXe-AUTFwYzmuLRTEeDc94J9x',

    SOC101_BOOK_ID: '1Z50fdXX0VKg0C2Y0dex0UvceCE1M_yPc',
  },

  defaultSEO: {
    title: APP_CONFIG.name,
    description: APP_CONFIG.shortDescription,
    keywords: APP_CONFIG.keywords,
    openGraph: {
      type: 'website',
      locale: APP_CONFIG.locale,
      site_name: APP_CONFIG.name,
    },
  },
};
