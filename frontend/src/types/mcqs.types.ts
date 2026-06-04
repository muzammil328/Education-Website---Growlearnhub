import type { FilterTypes, PaginationTypes, Status, SortOrder } from './index';
import type { Difficulty } from '@muzammil328/education-packages/enums';
import { ReactNode } from 'react';

type DifficultyValue = `${Difficulty}`;

export type DashboardMcqsPageProps = {
  status?: Status;
  sort?: string;
  order?: SortOrder;
};

// modal
export interface DashboardMcqModalProps {
  mode: 'add' | 'edit' | 'view';
  mcqId?: string;
  trigger?: ReactNode;
  triggerLabel?: ReactNode;
  title?: string;
}

// form
export interface DashboardMcqFormProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  mcqId?: string;
  onClose?: () => void;
  mode?: 'add' | 'edit' | 'view';
}

export interface UseMcqsParams extends FilterTypes {
  classId?: string;
  bookId?: string;
  chapterId?: string;
  headingId?: string;
  subHeadingId?: string;

  className?: string;
  bookName?: string;
  chapterName?: string;
  headingName?: string;
  subHeadingName?: string;
  status?: string;
}

// Single MCQ item from backend (get endpoint response)
export interface McqItem {
  mcqId: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string;
  status: Status;
  difficulty?: DifficultyValue;
  classId?: string;
  className?: string;
  classSlug?: string;
  bookId?: string;
  bookName?: string;
  bookSlug?: string;
  chapterId?: string;
  chapterName?: string;
  chapterSlug?: string;
  headingId?: string;
  headingName?: string;
  headingSlug?: string;
  subHeadingId?: string;
  subHeadingName?: string;
  subHeadingSlug?: string;
}

// Response with pagination
export interface UseMcqsResponse {
  success: boolean;
  message: string;
  data: McqItem[];
  pagination: PaginationTypes;
}

// CRUD Types - matching backend model
export interface CreateMcqsRequest {
  classId: string;
  bookId: string;
  chapterId: string;
  headingId?: string;
  subHeadingId?: string;
  questions: {
    question: string;
    options: string[];
    correctOption: number;
    explanation?: string;
    difficulty?: DifficultyValue;
    status?: Status;
  }[];
}

export interface UpdateMcqsRequest extends Partial<CreateMcqsRequest> {
  status?: Status;
}

export interface McqsResponse {
  success: boolean;
  message: string;
  data: McqItem;
}

export interface McqsDropdownResponse {
  success: boolean;
  message: string;
  data: { _id: string; name: string }[];
}

export interface DeleteMcqsResponse {
  success: boolean;
  message: string;
}

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface SingleQuiz {
  id?: number;
  name: string;
  slug: string;
  options: QuizOption[];
  correctOption: string;
}

export interface DetailQuiz {
  name: string;
  className?: string;
  options: QuizOption[];
  correctOption: string;
  explanation?: string;
  tags: string[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  setPage: (page: number) => void;
}

export interface FetchQuestions extends PaginationProps {
  data: SingleQuiz[];
}

export interface Question {
  data: any;
  totalPages: number;
}

export interface QuestionFilters {
  classes?: string;
  book?: string;
  books?: string;
  chapter?: string;
  heading?: string;
  subHeading?: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}
