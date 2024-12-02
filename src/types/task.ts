export enum ETaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGHT = 'high',
}

export interface ITask {
  id: number;
  title: string;
  description?: string;
  priority: ETaskPriority;
  dueDate: string;
  isCompleted: boolean;
}