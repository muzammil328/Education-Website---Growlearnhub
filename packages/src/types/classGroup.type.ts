
export interface CreateClassGroupInput {
  name: string;
  classIds?: string[];
}

export interface AddStudentsToClassGroupInput {
  groupId: string;
  studentIds: string[];
}

export interface ClassGroupListItem {
  _id: unknown;
  name: string;
  members: unknown[];
  createdAt?: Date;
}

export interface ClassGroupDetail {
  groupId: unknown;
  name: string;
  memberCount: number;
  members: Array<{ userId: string; username: string; email: string }>;
  createdAt?: Date;
}

export interface ClassGroupCreateResult {
  _id: unknown;
  name: string;
}

export interface ClassGroupUpdateResult {
  _id?: unknown;
  members: unknown[];
}
