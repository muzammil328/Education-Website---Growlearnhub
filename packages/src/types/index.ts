import type { SortDirection, Mode, FormProps } from '@muzammil328/core';
import {
  StatusEnum,
  PaymentStatusEnum,
  PaymentTypeEnum,
  DifficultyEnum,
  RoleEnum,
} from '../enums';

export type { SortDirection, Mode, FormProps };

export type Status = (typeof StatusEnum)[keyof typeof StatusEnum];
export type SortOrder = 'asc' | 'desc';
export type PaymentStatus = (typeof PaymentStatusEnum)[keyof typeof PaymentStatusEnum];
export type PaymentType = (typeof PaymentTypeEnum)[keyof typeof PaymentTypeEnum];
export type DifficultyLevel = (typeof DifficultyEnum)[keyof typeof DifficultyEnum];
export type RoleType = (typeof RoleEnum)[keyof typeof RoleEnum];

export interface ModalProps {
  trigger?: React.ReactNode;
  triggerLabel?: string;
  title?: string;
  mode?: Mode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export * from './auth.type';
export * from './book.type';
export * from './chapter.type';
export * from './class.type';
export * from './classGroup.type';
export * from './feedback.type';
export * from './adaptiveRecommendation.type';
export * from './analytics.type';
export * from './board.type';
export * from './classGroup.interface';
export * from './heading.type';
export * from './institution.type';
export * from './mcqs.type';
export * from './payment.type';
export * from './result.type';
export * from './service.type';
export * from './subHeading.type';
export * from './user.type';
export * from './userProgress.type';
export * from './otp.type';

export interface PaginationMeta {
  totalRecords: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationMeta;
}