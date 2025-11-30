import { ChevronLeft, ChevronRight } from "lucide-react";

import { isToday } from "@/lib/utils";

interface IWeekCalendarProps {
  weekDays: Date[];
  selectedDate: Date;
}

function WeekCalendar({ weekDays, selectedDate }: IWeekCalendarProps) {
  const formatWeekDay = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const formatDay = (date: Date) => {
    return date.getDate();
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-10">
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">{formatMonthYear(selectedDate)}</h3>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <ChevronLeft className="w-5 h-5 font-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <ChevronRight className="w-5 h-5 font-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex justify-between gap-2">
          {weekDays.map((date, index) => {
            const today = isToday(date);
            return (
              <div key={index} className="flex flex-col items-center min-w-0">
                <span className="text-gray-500 text-sm mb-2">
                  {formatWeekDay(date)}
                </span>
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${
                    today ? "bg-blue-500 text-white" : "text-gray-900"
                  }`}
                >
                  {formatDay(date)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WeekCalendar;
