export interface TaskInput {
  title: string;
  completed: boolean;
}

export interface Task extends TaskInput {
  id: number;
}
