import { Item, ItemContent } from "./ui/item";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";

import { isToday } from "@/lib/utils";
import { useState } from "react";

interface IDayCardsProps {
  dayNames: string;
  date: Date;
}

function DayCards({ dayNames, date }: IDayCardsProps) {
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
            <span> Create </span>
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
      </ItemContent>
    </Item>
  );
}

export default DayCards;
