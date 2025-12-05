import { ENDPOINT } from "@/config/api";

export interface Todo {
  id: number;
  date: string;
  task: string;
  completed: boolean;
}

export const fetchTodosByDateRange = async (
  startDate: string,
  endDate: string
): Promise<Todo[]> => {
  const url = `${ENDPOINT.TODOS_WEEK}?startDate=${startDate}&endDate=${endDate}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.statusText}`);
  }

  return response.json();
};
