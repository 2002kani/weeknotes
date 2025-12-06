import useSWR from "swr";
import { fetchTodosByDateRange } from "@/api/todoApi";
import type { Todo } from "@/types/todo";

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
