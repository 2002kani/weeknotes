import useSWR from "swr";
import { fetchTodosByDateRange } from "@/api/todoApi";

export interface Todo {
  id: number;
  date: string;
  task: string;
  completed: boolean;
}

export const useTodos = (startDate: string, endDate: string) => {
  const { data, error, isLoading, mutate } = useSWR<Todo[]>(
    startDate && endDate ? ["todos", startDate, endDate] : null,
    () => fetchTodosByDateRange(startDate, endDate),
    {
      revalidateOnFocus: false, // Nicht bei jedem Tab-Fokus neu laden
      revalidateOnReconnect: true, // Bei Internet-Reconnect neu laden
    }
  );

  return {
    todos: data || [],
    isLoading,
    isError: error,
    mutate,
  };
};
