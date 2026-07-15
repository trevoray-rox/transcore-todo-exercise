export type TaskStatus = 'New' | 'InProgress' | 'Rejected' | 'Verified' | 'Completed';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
}
