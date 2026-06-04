import type { SortOrder, Status } from './index';

export interface DashboardClassTableProps {
  classId: string;
  name: string;
  slug?: string;
  status: string;
  serviceName?: string[];
}

export type DashboardClassPageProps = {
  status?: Status;
  sort?: string;
  order?: SortOrder;
};

export interface GetClassProps {
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortDirection?: string;
  search?: string;
}

export interface DashboardClassFormProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  classId?: string;
  onClose?: () => void;
  mode?: 'add' | 'edit' | 'view';
}
