import { useState } from "react";

import { createTodo, deleteTodoById, updateTodoCompleted } from "@/api/todoApi";
import type { Todo } from "@/types/todo";

import { Item, ItemContent } from "./ui/item";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { isToday } from "@/lib/utils";
import { formatDateForUrl } from "@/lib/formatDate";

interface IDayCardsProps {
  dayNames: string;
  date: Date;
  todos: Todo[];
  onTodosChange: () => void;
}

function DayCards({ dayNames, date, todos, onTodosChange }: IDayCardsProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [todoInput, setTodoInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dateKey = formatDateForUrl(date);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoInput || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createTodo({
        date: dateKey,
        task: todoInput,
        completed: false,
      });

      setIsCreating(false);
      setTodoInput("");
      onTodosChange();
    } catch (err) {
      console.error("Failed to create todo:", err);
      alert("Error while creating a Todo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteUpdate = async (todo: Todo) => {
    try {
      await updateTodoCompleted(todo.id, {
        ...todo,
        completed: !todo.completed,
      });
      onTodosChange();
    } catch (err) {
      console.error("Failed to update todo:", err);
      alert("Error while updating a Todo.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodoById(id);
      onTodosChange();
    } catch (err) {
      console.error("Failed to delete todo:", err);
      alert("Error while deleting a Todo.");
    }
  };

  return (
    <Item variant="outline">
      <ItemContent>
        <div className="flex flex-row items-center justify-between mb-3">
          <h1 className={`font-medium ${isToday(date) ? "text-blue-500" : ""}`}>
            {dayNames}
          </h1>
          <Button
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 cursor-pointer"
            variant="default"
            onClick={() => setIsCreating(!isCreating)}
          >
            <Plus />
            <span>Create</span>
          </Button>
        </div>

        {isCreating && (
          <form onSubmit={handleSubmit} className="mb-3">
            <Input
              onChange={(e) => setTodoInput(e.target.value)}
              value={todoInput}
              type="text"
              className="mb-4"
              placeholder="What do you want to do?"
            />
            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 cursor-pointer"
              >
                Add
              </Button>
              <Button
                type="button"
                className="flex-1 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 cursor-pointer text-gray-700"
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {todos.length > 0 ? (
          <div className="space-y-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg"
              >
                <Checkbox
                  onClick={() => handleCompleteUpdate(todo)}
                  className="h-5 w-5 rounded-sm border-2 border-blue-500 transition-all duration-50 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-900"
                  }`}
                >
                  {todo.task}
                </span>
                <Trash2
                  onClick={() => handleDelete(todo.id)}
                  className="text-gray-500 h-4 w-4 cursor-pointer hover:text-red-500 active:text-red-500"
                />
              </div>
            ))}
          </div>
        ) : (
          !isCreating && (
            <p className="text-gray-400 text-sm text-center py-2">
              No todos yet
            </p>
          )
        )}
      </ItemContent>
    </Item>
  );
}

export default DayCards;
