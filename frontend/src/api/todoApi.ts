import { ENDPOINT } from "@/config/api";
import type { createTodoDto, Todo } from "@/types/todo";
import type { updateTodoDto } from "@/types/todo";

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

export const deleteTodoById = async (id: number): Promise<void> => {
  const response = await fetch(`${ENDPOINT.TODOS}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete Todo: ${response.statusText}`);
  }
};

export const updateTodoCompleted = async (
  id: number,
  updatedTodo: updateTodoDto
): Promise<Todo> => {
  const response = await fetch(`${ENDPOINT.TODOS}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(updatedTodo),
  });

  if (!response.ok) {
    throw new Error(`Failed to update todo: ${response.statusText}`);
  }

  return response.json();
};

export const createTodo = async (todo: createTodoDto): Promise<Todo> => {
  const response = await fetch(`${ENDPOINT.TODOS}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error(`Failed to update todo: ${response.statusText}`);
  }

  return response.json();
};
