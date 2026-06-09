import { trpc } from '@/trpc/trpc';

// get service by class slug
export const useServiceByClassSlug = (classSlug?: string) => {
  return trpc.public.getServiceByClassSlug.useQuery(
    { classSlug: classSlug || '' },
    { enabled: Boolean(classSlug), retry: false, refetchOnWindowFocus: false }
  );
};

// get books by class and service slug
export const useBooksByClassAndServiceSlug = (classSlug: string, serviceSlug?: string) => {
  const { data, isLoading, error } = trpc.public.getBookByClassAndServiceSlug.useQuery({
    classSlug,
    serviceSlug,
  });

  return {
    books: data?.data ?? [],
    isLoading,
    error,
  };
};

// get chapters by class, service and subject slug
export const useChapterByClassAndBookSlug = (classSlug?: string, bookSlug?: string) => {
  return trpc.public.getChapterByClassAndServiceAndSubjectSlug.useQuery(
    { classSlug: classSlug || '', bookSlug: bookSlug || '' },
    {
      enabled: Boolean(classSlug && bookSlug),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

// get headings by class, service, subject and chapter slug
export const useHeadingByClassAndSubjectAndChapterSlug = (classSlug?: string, bookSlug?: string, chapterSlug?: string) => {
  return trpc.public.getByHeadingClassAndServiceAndSubjectAndChapterSlug.useQuery(
    { classSlug: classSlug || '', bookSlug: bookSlug || '', chapterSlug: chapterSlug || '' },
    {
      enabled: Boolean(classSlug && bookSlug && chapterSlug),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

// get subheading by class, service, subject, chapter and heading slug
export const useSubHeadingByClassAndSubjectAndChapterAndHeadingSlug = (
  classSlug?: string,
  bookSlug?: string,
  chapterSlug?: string,
  headingSlug?: string
) => {
  return trpc.public.getBySubHeadingClassAndServiceAndSubjectAndChapterAndHeadingSlug.useQuery(
    {
      classSlug: classSlug || '',
      bookSlug: bookSlug || '',
      chapterSlug: chapterSlug || '',
      headingSlug: headingSlug || '',
    },
    {
      enabled: Boolean(classSlug && bookSlug && chapterSlug && headingSlug),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

// get mcqs by class, book, chapter, heading, subHeading slugs
export const useMcqsBySlug = (
  classSlug?: string,
  bookSlug?: string,
  chapterSlug?: string,
  headingSlug?: string,
  subHeadingSlug?: string,
  page: number = 1,
  limit: number = 10
) => {
  return trpc.public.getMcqsBySlug.useQuery(
    {
      classSlug: classSlug || '',
      bookSlug: bookSlug || undefined,
      chapterSlug: chapterSlug || undefined,
      headingSlug: headingSlug || undefined,
      subHeadingSlug: subHeadingSlug || undefined,
      page,
      limit,
    },
    {
      enabled: Boolean(classSlug),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

// get mcq sets metadata (count, sets info) by slugs
export const useMcqsSetsBySlug = (
  classSlug?: string,
  bookSlug?: string,
  chapterSlug?: string,
  headingSlug?: string,
  subHeadingSlug?: string
) => {
  return trpc.public.getMcqsSetsBySlug.useQuery(
    {
      classSlug: classSlug || '',
      bookSlug: bookSlug || undefined,
      chapterSlug: chapterSlug || undefined,
      headingSlug: headingSlug || undefined,
      subHeadingSlug: subHeadingSlug || undefined,
    },
    {
      enabled: Boolean(classSlug),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useClassesBySlug = (serviceSlug: string) => {
  const { data, isLoading, error } = trpc.public.getByClassServiceSlug.useQuery({
    serviceSlug,
  });

  return {
    classes: data?.data ?? [],
    isLoading,
    error,
  };
};

// get all books for a class (no service filter)
export const useBooksByClass = (classSlug?: string) => {
  return trpc.public.getBooksByClass.useQuery(
    { classSlug: classSlug || '' },
    { enabled: Boolean(classSlug), retry: false, refetchOnWindowFocus: false }
  );
};

// get book detail with full-book PDFs and chapters (each with their PDFs)
export const useBookDetail = (classSlug?: string, bookSlug?: string) => {
  return trpc.public.getBookDetail.useQuery(
    { classSlug: classSlug || '', bookSlug: bookSlug || '' },
    { enabled: Boolean(classSlug && bookSlug), retry: false, refetchOnWindowFocus: false }
  );
};

// get chapter detail with PDFs, full-book PDFs, and sibling chapters
export const useChapterDetail = (classSlug?: string, bookSlug?: string, chapterSlug?: string) => {
  return trpc.public.getChapterDetail.useQuery(
    { classSlug: classSlug || '', bookSlug: bookSlug || '', chapterSlug: chapterSlug || '' },
    { enabled: Boolean(classSlug && bookSlug && chapterSlug), retry: false, refetchOnWindowFocus: false }
  );
};

// get boards for a class filtered by service slug
export const useBoardsByClassAndService = (classSlug?: string, serviceSlug?: string) => {
  return trpc.public.getBoardsByClassAndService.useQuery(
    { classSlug: classSlug || '', serviceSlug: serviceSlug || '' },
    { enabled: Boolean(classSlug && serviceSlug), retry: false, refetchOnWindowFocus: false }
  );
};

// get latest result PDF for a class + board
export const useResultByClassAndBoard = (classSlug?: string, boardSlug?: string) => {
  return trpc.public.getResultByClassAndBoard.useQuery(
    { classSlug: classSlug || '', boardSlug: boardSlug || '' },
    { enabled: Boolean(classSlug && boardSlug), retry: false, refetchOnWindowFocus: false }
  );
};

// get latest pairing scheme image for a class + board
export const usePairingSchemeByClassAndBoard = (classSlug?: string, boardSlug?: string) => {
  return trpc.public.getPairingSchemeByClassAndBoard.useQuery(
    { classSlug: classSlug || '', boardSlug: boardSlug || '' },
    { enabled: Boolean(classSlug && boardSlug), retry: false, refetchOnWindowFocus: false }
  );
};
