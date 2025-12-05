export const VITE_BASE_URL = import.meta.env.VITE_API_URL;

export const ENDPOINT = {
  TODOS: `${VITE_BASE_URL}/todos`,
  TODOS_WEEK: `${VITE_BASE_URL}/todos/week`,
} as const;
