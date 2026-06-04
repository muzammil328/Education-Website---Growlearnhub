import type { EntityStatus, UserRole as DomainUserRole, SortOrderEnum } from '@muzammil328/education-packages/enums';

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export type Status = `${EntityStatus}`;
export type SortOrder = `${SortOrderEnum}`;

export type UserRole = `${DomainUserRole}`;
export type Dropdown = { value: string; label: string };

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message?: string;
  pagination?: PaginationTypes;
  data?: T;
}

export type DeleteResponse = ApiResponse<null>;

export interface Session {
  userRole: string;
  userId: number;
  userEmail: string;
  userUsername: string;
}

export interface PaginationTypes {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface SmallCardProps {
  title: string;
  link: string;
  className?: string;
}

export interface IpropsTags {
  id: string;
  name: string;
}
