
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const HabitCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // This would come from the API - days with completed habits
  const completedDays = [
    new Date(2025, 3, 1),
    new Date(2025, 3, 2),
    new Date(2025, 3, 5),
    new Date(2025, 3, 6),
    new Date(2025, 3, 7),
    new Date(2025, 3, 8),
  ];

  // Days with missed habits
  const missedDays = [
    new Date(2025, 3, 3),
    new Date(2025, 3, 4),
  ];

  const isDayCompleted = (day: Date) => {
    return completedDays.some(d => 
      format(d, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
  };

  const isDayMissed = (day: Date) => {
    return missedDays.some(d => 
      format(d, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
  };

  return (
    <Card className="col-span-12 md:col-span-4">
      <CardHeader>
        <CardTitle>Habit Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow-sm"
          modifiersClassNames={{
            selected: "bg-primary text-primary-foreground",
          }}
          modifiers={{
            completed: (date) => isDayCompleted(date),
            missed: (date) => isDayMissed(date),
          }}
          modifiersStyles={{
            completed: {
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              borderRadius: "50%",
            },
            missed: {
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              borderRadius: "50%",
            },
          }}
        />
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-sm">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <span className="text-sm">Missed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm">Today</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitCalendar;
