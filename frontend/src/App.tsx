import { useState } from "react";

import WeekCalendar from "./components/weekCalendar";
import DayCards from "./components/DayCards";
import { DayNames } from "./constants";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getWeekDays = () => {
    const days = [];

    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    console.log(days);
    return days;
  };

  const weekDays = getWeekDays();

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <WeekCalendar
        onPreviousWeek={goToPreviousWeek}
        onNextWeek={goToNextWeek}
        weekDays={weekDays}
        selectedDate={selectedDate}
      />
      <div className="px-4 mt-6 pb-6 space-y-4">
        {weekDays.map((date, index) => {
          const dateKey = formatDateKey(date);
          return (
            <DayCards key={dateKey} date={date} dayNames={DayNames[index]} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
