export type MediumSlug = 'english-medium' | 'urdu-medium';

export interface Class11BookMedium {
  slug: MediumSlug;
  name: string;
  fileId: string;
}

export interface Class11BookBoard {
  slug: string;
  name: string;
  image: string;
  summary: string;
  mediums: Class11BookMedium[];
  chapterCount: number;
}

export const CLASS11_PUNJAB_BOARDS: Class11BookBoard[] = [
  {
    slug: 'punjab-board-biology',
    name: 'Biology',
    image: '/11th/book/punjab/class_11_biology_book_punjab_board.webp',
    summary: 'Download Class 11 Biology Punjab Board textbook in English and Urdu medium.',
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
    image: '/11th/book/punjab/class_11_chemistry_book_punjab_board.webp',
    summary: 'Access Class 11 Chemistry Punjab Board textbook PDF in both mediums.',
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
    image: '/11th/book/punjab/class_11_physics_book_punjab_board.webp',
    summary: 'Read and download Class 11 Physics Punjab Board book for exam preparation.',
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
    image: '/11th/book/punjab/class_11_math_book_punjab_board.webp',
    summary: 'Download 11th Class Math Punjab Board textbook in English and Urdu medium.',
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
    image: '/11th/book/punjab/class_11_english_book_punjab_board.webp',
    summary: 'Get Class 11 English Punjab Board textbook PDF for guided reading.',
    chapterCount: 20,
    mediums: [
      { slug: 'urdu-medium', name: 'Book PDF', fileId: '1jWMXA8MZxT5x13EPrpYhC_3ZnCwmnDYi' },
    ],
  },
  {
    slug: 'punjab-board-urdu',
    name: 'Urdu',
    image: '/11th/book/punjab/class_11_urdu_book_punjab_board.webp',
    summary: 'Download Class 11 Urdu Punjab Board book in PDF format.',
    chapterCount: 20,
    mediums: [
      { slug: 'urdu-medium', name: 'Book PDF', fileId: '1OIiCbYItblJQN0RGgo5Qjv6HSNJXrDQv' },
    ],
  },
  {
    slug: 'punjab-board-islamiyat',
    name: 'Islamiyat',
    image: '/11th/book/punjab/class_11_islamiyat_book_punjab_board.webp',
    summary: 'Read Class 11 Islamiyat Punjab Board textbook online or download as PDF.',
    chapterCount: 20,
    mediums: [
      { slug: 'urdu-medium', name: 'Book PDF', fileId: '1pQBiMwAhDVQZgls4tgV6uL6Ngo-Vo4_a' },
    ],
  },
  {
    slug: 'punjab-board-tarjuma-tul-quran',
    name: 'Tarjuma Tul Quran',
    image: '/11th/book/punjab/class_11_tarjuma_tul_quran_book_punjab_board.webp',
    summary: 'Access Tarjuma Tul Quran Class 11 Punjab Board book in PDF format.',
    chapterCount: 20,
    mediums: [
      { slug: 'urdu-medium', name: 'Book PDF', fileId: '1qKP8ytj1ahOqFTE-y9oul_nFytNWtd6F' },
    ],
  },
  {
    slug: 'punjab-board-computer-science',
    name: 'Computer Science',
    image: '/11th/book/punjab/class_11_computer_science_book_punjab_board.webp',
    summary: 'Get Class 11 Computer Science Punjab Board textbook PDFs for both mediums.',
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

export const class11BookBoardCards = [
  {
    title: 'Punjab Board',
    child: CLASS11_PUNJAB_BOARDS.map(board => ({ name: board.name, slug: board.slug })),
  },
];

export function getClass11Board(slug: string): Class11BookBoard | undefined {
  return CLASS11_PUNJAB_BOARDS.find(board => board.slug === slug);
}

export function getClass11Medium(
  board: Class11BookBoard,
  mediumSlug: string
): Class11BookMedium | undefined {
  return board.mediums.find(medium => medium.slug === mediumSlug);
}

export function getClass11Chapters(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const chapterNo = index + 1;
    return {
      number: chapterNo,
      slug: `chapter-${chapterNo}`,
      title: `Chapter ${chapterNo}`,
    };
  });
}
