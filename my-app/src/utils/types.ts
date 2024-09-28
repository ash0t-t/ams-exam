export interface IState {
  tasks: ITask[]
}

export interface ITask {
  id: number,
  text: string,
  completed: string,
  date: string
}

export type PayloadTask = Omit<ITask, 'id'>