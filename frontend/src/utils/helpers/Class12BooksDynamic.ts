export type MediumSlug = 'english-medium' | 'urdu-medium';

export interface Class12BookMedium {
  slug: MediumSlug;
  name: string;
  fileId: string;
}

export interface Class12BookBoard {
  slug: string;
  name: string;
  image: string;
  summary: string;
  mediums: Class12BookMedium[];
  chapterCount: number;
}

export const CLASS12_PUNJAB_BOARDS: Class12BookBoard[] = [
  {
    slug: 'punjab-board-biology',
    name: 'Biology',
    image: '/12th/book/punjab/class_12_biology_book_punjab_board.webp',
    summary: 'Download Class 12 Biology Punjab Board textbook in English and Urdu medium.',
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
    image: '/12th/book/punjab/class_12_chemistry_book_punjab_board.webp',
    summary: 'Access Class 12 Chemistry Punjab Board textbook PDF in both mediums.',
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
    image: '/12th/book/punjab/class_12_physics_book_punjab_board.webp',
    summary: 'Read and download Class 12 Physics Punjab Board book for exam preparation.',
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
    image: '/12th/book/punjab/class_12_math_book_punjab_board.webp',
    summary: 'Download 12th Class Math Punjab Board textbook in English and Urdu medium.',
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
    image: '/12th/book/punjab/class_12_english_book_punjab_board.webp',
    summary: 'Get Class 12 English Punjab Board textbook PDF for guided reading.',
    chapterCount: 20,
    mediums: [
      { slug: 'urdu-medium', name: 'Book PDF', fileId: '1jWMXA8MZxT5x13EPrpYhC_3ZnCwmnDYi' },
    ],
  },
  {
    slug: 'punjab-board-urdu',
    name: 'Urdu',
    image: '/12th/book/punjab/class_12_urdu_book_punjab_board.webp',
    summary: 'Download Class 12 Urdu Punjab Board book in PDF format.',
    chapterCount: 20,
    mediums: [
      { slug: 'urdu-medium', name: 'Book PDF', fileId: '1OIiCbYItblJQN0RGgo5Qjv6HSNJXrDQv' },
    ],
  },
  {
    slug: 'punjab-board-islamiyat',
    name: 'Islamiyat',
    image: '/12th/book/punjab/class_12_islamiyat_book_punjab_board.webp',
    summary: 'Read Class 12 Islamiyat Punjab Board textbook online or download as PDF.',
    chapterCount: 20,
    mediums: [
      { slug: 'urdu-medium', name: 'Book PDF', fileId: '1pQBiMwAhDVQZgls4tgV6uL6Ngo-Vo4_a' },
    ],
  },
  {
    slug: 'punjab-board-tarjuma-tul-quran',
    name: 'Tarjuma Tul Quran',
    image: '/12th/book/punjab/class_12_tarjuma_tul_quran_book_punjab_board.webp',
    summary: 'Access Tarjuma Tul Quran Class 12 Punjab Board book in PDF format.',
    chapterCount: 20,
    mediums: [
      { slug: 'urdu-medium', name: 'Book PDF', fileId: '1qKP8ytj1ahOqFTE-y9oul_nFytNWtd6F' },
    ],
  },
  {
    slug: 'punjab-board-pak-study',
    name: 'Pak Study',
    image: '/12th/book/punjab/class_12_pak_study_book_punjab_board.webp',
    summary: 'Read and download Class 12 Pak Study Punjab Board textbook PDFs.',
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
    image: '/12th/book/punjab/class_12_computer_science_book_punjab_board.webp',
    summary: 'Get Class 12 Computer Science Punjab Board textbook PDFs for both mediums.',
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

export const class12BookBoardCards = [
  {
    title: 'Punjab Board',
    child: CLASS12_PUNJAB_BOARDS.map(board => ({ name: board.name, slug: board.slug })),
  },
];

export function getClass12Board(slug: string): Class12BookBoard | undefined {
  return CLASS12_PUNJAB_BOARDS.find(board => board.slug === slug);
}

export function getClass12Medium(
  board: Class12BookBoard,
  mediumSlug: string
): Class12BookMedium | undefined {
  return board.mediums.find(medium => medium.slug === mediumSlug);
}

export function getClass12Chapters(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const chapterNo = index + 1;
    return {
      number: chapterNo,
      slug: `chapter-${chapterNo}`,
      title: `Chapter ${chapterNo}`,
    };
  });
}
