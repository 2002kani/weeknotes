import { Item, ItemContent } from "./ui/item";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, Trash2, Check } from "lucide-react";
import { isToday } from "@/lib/utils";
import { useState } from "react";
import type { Todo } from "@/api/todoApi";

interface IDayCardsProps {
  dayNames: string;
  date: Date;
  todos: Todo[];
  onTodosChange: () => void;
}

function DayCards({ dayNames, date, todos, onTodosChange }: IDayCardsProps) {
  const [isCreating, setIsCreating] = useState(false);

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
          <form className="mb-3">
            <Input
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

        {/* Todo Liste anzeigen */}
        {todos.length > 0 && (
          <div className="space-y-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <span className="flex-1 text-gray-900">{todo.task}</span>
              </div>
            ))}
          </div>
        )}
      </ItemContent>
    </Item>
  );
}

export default DayCards;
