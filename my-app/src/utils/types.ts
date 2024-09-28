export interface ITask {
  id: string;
  text: string;
  status: string;
  date: string;
}

export interface ITaskState {
  tasks: ITask[];
  filteredTasks: ITask[];
  task: ITask | null;
}

export type TaskFormData  = Omit<ITask, 'id'>