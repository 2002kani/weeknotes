import { useEffect, useMemo } from "react";
import { DateParam, useQueryParams } from "use-query-params";

import WeekCalendar from "@/components/weekCalendar";
import DayCards from "@/components/DayCards";
import { DayNames } from "@/constants";
import { useTodos } from "@/hooks/useTodos";
import { formatDateForUrl } from "@/lib/formatDate";

function WeekView() {
  const [query, setQuery] = useQueryParams({
    startDate: DateParam,
    endDate: DateParam,
  });

  // Berechne Wochentage basierend auf Query-Parametern oder heute
  const weekDays = useMemo(() => {
    const days: Date[] = [];

    // Wenn Query-Parameter vorhanden, nutze startDate
    const baseDate = query.startDate || new Date();

    const startOfWeek = new Date(baseDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }

    return days;
  }, [query.startDate]);

  // Setze Query-Parameter beim ersten Laden, wenn nicht vorhanden
  useEffect(() => {
    if (!query.startDate || !query.endDate) {
      setQuery(
        {
          startDate: weekDays[0],
          endDate: weekDays[6],
        },
        "replace" // 'replace' verhindert zusätzlichen History-Eintrag
      );
    }
  }, [query.startDate, query.endDate, weekDays, setQuery]);

  // Hole Todos für die aktuelle Woche
  const startDateStr = query.startDate ? formatDateForUrl(query.startDate) : "";
  const endDateStr = query.endDate ? formatDateForUrl(query.endDate) : "";

  const { todos, isLoading, isError } = useTodos(startDateStr, endDateStr);

  console.log(todos);

  // Gruppiere Todos nach Datum
  const todosByDate = useMemo(() => {
    return todos.reduce((acc, todo) => {
      if (!acc[todo.date]) {
        acc[todo.date] = [];
      }
      acc[todo.date].push(todo);
      return acc;
    }, {} as Record<string, typeof todos>);
  }, [todos]);

  const goToPreviousWeek = () => {
    const newDate = new Date(weekDays[0]);
    newDate.setDate(newDate.getDate() - 7);

    const newStartOfWeek = new Date(newDate);
    const day = newStartOfWeek.getDay();
    const diff = newStartOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    newStartOfWeek.setDate(diff);

    const newEndOfWeek = new Date(newStartOfWeek);
    newEndOfWeek.setDate(newStartOfWeek.getDate() + 6);

    setQuery({
      startDate: newStartOfWeek,
      endDate: newEndOfWeek,
    });
  };

  const goToNextWeek = () => {
    const newDate = new Date(weekDays[0]);
    newDate.setDate(newDate.getDate() + 7);

    const newStartOfWeek = new Date(newDate);
    const day = newStartOfWeek.getDay();
    const diff = newStartOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    newStartOfWeek.setDate(diff);

    const newEndOfWeek = new Date(newStartOfWeek);
    newEndOfWeek.setDate(newStartOfWeek.getDate() + 6);

    setQuery({
      startDate: newStartOfWeek,
      endDate: newEndOfWeek,
    });
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">Fehler beim Laden der Todos</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WeekCalendar
        onPreviousWeek={goToPreviousWeek}
        onNextWeek={goToNextWeek}
        weekDays={weekDays}
        selectedDate={weekDays[0]}
      />

      {isLoading ? (
        <div className="px-4 mt-6 pb-6">
          <div className="text-center text-gray-500">Lade Todos...</div>
        </div>
      ) : (
        <div className="px-4 mt-6 pb-6 space-y-4">
          {weekDays.map((date, index) => {
            const dateKey = formatDateForUrl(date);
            const todosForDay = todosByDate[dateKey] || [];

            return (
              <DayCards
                key={dateKey}
                date={date}
                dayNames={DayNames[index]}
                todos={todosForDay}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default WeekView;
