export interface Todo {
  id: number;
  date: string;
  task: string;
  completed: boolean;
}

// Partial - to make all props optional
export type updateTodoDto = Partial<Omit<Todo, "id">>;

export type createTodoDto = Omit<Todo, "id">;
