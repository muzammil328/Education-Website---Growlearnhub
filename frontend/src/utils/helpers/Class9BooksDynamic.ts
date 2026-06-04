export type MediumSlug = 'english-medium' | 'urdu-medium';

export interface Class9BookMedium {
  slug: MediumSlug;
  name: string;
  fileId: string;
}

export interface Class9BookBoard {
  slug: string;
  name: string;
  image: string;
  summary: string;
  mediums: Class9BookMedium[];
  chapterCount: number;
}

export const CLASS9_PUNJAB_BOARDS: Class9BookBoard[] = [
  {
    slug: 'punjab-board-biology',
    name: 'Biology',
    image: '/9th/book/punjab/class_9_biology_book_punjab_board.webp',
    summary: 'Download Class 9 Biology Punjab Board textbook in English and Urdu medium.',
    chapterCount: 20,
    mediums: [
      {
        slug: 'english-medium',
        name: 'English Medium',
        fileId: '1MFRZ5yO0SrrfTkAM_ewXBp_Pec4zTOA-',
      },
      { slug: 'urdu-medium', name: 'Urdu Medium', fileId: '1ty3cPG8aWvjPla3xJAT4F__bLNJHKiZv' },
    ],
  },
  {
    slug: 'punjab-board-chemistry',
    name: 'Chemistry',
    image: '/9th/book/punjab/class_9_chemistry_book_punjab_board.webp',
    summary: 'Access Class 9 Chemistry Punjab Board textbook PDF in both mediums.',
    chapterCount: 20,
    mediums: [
      {
        slug: 'english-medium',
        name: 'English Medium',
        fileId: '1LhWG65hJibow48tOzY7L_w9gWTWfeqvE',
      },
      { slug: 'urdu-medium', name: 'Urdu Medium', fileId: '14GOV_BVtoIoE8SlNNnxDgLAvrwAMdhU4' },
    ],
  },
  {
    slug: 'punjab-board-physics',
    name: 'Physics',
    image: '/9th/book/punjab/class_9_physics_book_punjab_board.webp',
    summary: 'Read and download Class 9 Physics Punjab Board book for exam preparation.',
    chapterCount: 20,
    mediums: [
      {
        slug: 'english-medium',
        name: 'English Medium',
        fileId: '1my_m9qLxXF3LCw4eCFlCJGexOmsazJmg',
      },
      { slug: 'urdu-medium', name: 'Urdu Medium', fileId: '1_cp-urrPMokhCSCExs-B8uEujlIfqDjd' },
    ],
  },
  {
    slug: 'punjab-board-math',
    name: 'Math',
    image: '/9th/book/punjab/class_9_math_book_punjab_board.webp',
    summary: 'Download 9th Class Math Punjab Board textbook in English and Urdu medium.',
    chapterCount: 20,
    mediums: [
      {
        slug: 'english-medium',
        name: 'English Medium',
        fileId: '1m0c4RwJH1loIwLaWurWOarhBYzncf2lQ',
      },
      { slug: 'urdu-medium', name: 'Urdu Medium', fileId: '13Y8JmTqRvSsKUTCk6muXFG2ql-ef_AbZ' },
    ],
  },
  {
    slug: 'punjab-board-english',
    name: 'English',
    image: '/9th/book/punjab/class_9_english_book_punjab_board.webp',
    summary: 'Get Class 9 English Punjab Board textbook PDF for guided reading.',
    chapterCount: 20,
    mediums: [
      { slug: 'urdu-medium', name: 'Book PDF', fileId: '1jWMXA8MZxT5x13EPrpYhC_3ZnCwmnDYi' },
    ],
  },
  {
    slug: 'punjab-board-urdu',
    name: 'Urdu',
    image: '/9th/book/punjab/class_9_urdu_book_punjab_board.webp',
    summary: 'Download Class 9 Urdu Punjab Board book in PDF format.',
    chapterCount: 20,
    mediums: [
      { slug: 'urdu-medium', name: 'Book PDF', fileId: '1OIiCbYItblJQN0RGgo5Qjv6HSNJXrDQv' },
    ],
  },
  {
    slug: 'punjab-board-economics',
    name: 'Economics',
    image: '/9th/book/punjab/class_9_economics_book_punjab_board.webp',
    summary: 'Access Class 9 Economics Punjab Board textbook with complete syllabus coverage.',
    chapterCount: 20,
    mediums: [
      { slug: 'urdu-medium', name: 'Book PDF', fileId: '1JIhmsCKh20DfmqwWuHtwBWa1cZdsu7B1' },
    ],
  },
  {
    slug: 'punjab-board-islamiyat',
    name: 'Islamiyat',
    image: '/9th/book/punjab/class_9_islamiyat_book_punjab_board.webp',
    summary: 'Read Class 9 Islamiyat Punjab Board textbook online or download as PDF.',
    chapterCount: 20,
    mediums: [
      { slug: 'urdu-medium', name: 'Book PDF', fileId: '1pQBiMwAhDVQZgls4tgV6uL6Ngo-Vo4_a' },
    ],
  },
  {
    slug: 'punjab-board-ikhlaqiat',
    name: 'Ikhlaqiat',
    image: '/9th/book/punjab/class_9_ikhlaqiat_book_punjab_board.webp',
    summary: 'Download Class 9 Ikhlaqiat Punjab Board textbook for moral education studies.',
    chapterCount: 20,
    mediums: [
      { slug: 'urdu-medium', name: 'Book PDF', fileId: '1fwK6qscOFekmeFq0XIPVeN9Ww3eBg6jF' },
    ],
  },
  {
    slug: 'punjab-board-tarjuma-tul-quran',
    name: 'Tarjuma Tul Quran',
    image: '/9th/book/punjab/class_9_tarjuma_tul_quran_book_punjab_board.webp',
    summary: 'Access Tarjuma Tul Quran Class 9 Punjab Board book in PDF format.',
    chapterCount: 20,
    mediums: [
      { slug: 'urdu-medium', name: 'Book PDF', fileId: '1qKP8ytj1ahOqFTE-y9oul_nFytNWtd6F' },
    ],
  },
  {
    slug: 'punjab-board-general-math',
    name: 'General Math',
    image: '/9th/book/punjab/class_9_general_math_book_punjab_board.webp',
    summary: 'Download Class 9 General Math Punjab Board textbook in both mediums.',
    chapterCount: 20,
    mediums: [
      {
        slug: 'english-medium',
        name: 'English Medium',
        fileId: '1GLuEwJZ05noDPB3TaendOazBHvDOZ6Cs',
      },
      { slug: 'urdu-medium', name: 'Urdu Medium', fileId: '1UC6ijj0pKUgZFP3-QIX2JpCoP6CbMGIO' },
    ],
  },
  {
    slug: 'punjab-board-pak-study',
    name: 'Pak Study',
    image: '/9th/book/punjab/class_9_pak_study_book_punjab_board.webp',
    summary: 'Read and download Class 9 Pak Study Punjab Board textbook PDFs.',
    chapterCount: 20,
    mediums: [
      {
        slug: 'english-medium',
        name: 'English Medium',
        fileId: '1RKP3Z62EpOE6fY4C7i0eCdDSYZcB38TE',
      },
      { slug: 'urdu-medium', name: 'Urdu Medium', fileId: '1H4DK2mlhoPcIAb7PywX0-5PWcqNr7VqU' },
    ],
  },
  {
    slug: 'punjab-board-computer-science',
    name: 'Computer Science',
    image: '/9th/book/punjab/class_9_computer_science_book_punjab_board.webp',
    summary: 'Get Class 9 Computer Science Punjab Board textbook PDFs for both mediums.',
    chapterCount: 20,
    mediums: [
      {
        slug: 'english-medium',
        name: 'English Medium',
        fileId: '1o5fPLG7_lTK2sAs5smLAgJEopLTf8fsR',
      },
      { slug: 'urdu-medium', name: 'Urdu Medium', fileId: '1dSyB9KxtY59L541KRu55BmWEVbmy6rnz' },
    ],
  },
];

export const class9BookBoardCards = [
  {
    title: 'Punjab Board',
    child: CLASS9_PUNJAB_BOARDS.map(board => ({ name: board.name, slug: board.slug })),
  },
];

export function getClass9Board(slug: string): Class9BookBoard | undefined {
  return CLASS9_PUNJAB_BOARDS.find(board => board.slug === slug);
}

export function getClass9Medium(
  board: Class9BookBoard,
  mediumSlug: string
): Class9BookMedium | undefined {
  return board.mediums.find(medium => medium.slug === mediumSlug);
}

export function getClass9Chapters(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const chapterNo = index + 1;
    return {
      number: chapterNo,
      slug: `chapter-${chapterNo}`,
      title: `Chapter ${chapterNo}`,
    };
  });
}
