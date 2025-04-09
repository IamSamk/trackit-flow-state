
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Mock data for habits
const habits = [
  {
    id: "1",
    name: "Morning Run",
    category: "Health",
    dates: [
      new Date(2025, 3, 1),
      new Date(2025, 3, 3),
      new Date(2025, 3, 5),
      new Date(2025, 3, 7),
    ]
  },
  {
    id: "2",
    name: "Read 30 Minutes",
    category: "Skills",
    dates: [
      new Date(2025, 3, 2),
      new Date(2025, 3, 4),
      new Date(2025, 3, 6),
      new Date(2025, 3, 8),
    ]
  },
  {
    id: "3",
    name: "Meditate",
    category: "Mental Health",
    dates: [
      new Date(2025, 3, 1),
      new Date(2025, 3, 2),
      new Date(2025, 3, 3),
      new Date(2025, 3, 4),
    ]
  }
];

const getCategoryColor = (category: string): string => {
  const colors = {
    "Health": "bg-habit-health text-white",
    "Mental Health": "bg-habit-mental text-white",
    "Productivity": "bg-habit-productivity text-white",
    "Skills": "bg-habit-skills text-white"
  };
  
  return colors[category as keyof typeof colors] || "bg-primary";
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [habitFilter, setHabitFilter] = useState("all");
  
  const selectedDateStr = date ? format(date, "yyyy-MM-dd") : "";

  // Get habits completed on selected date
  const habitsOnSelectedDate = habits.filter(habit => 
    habit.dates.some(d => format(d, "yyyy-MM-dd") === selectedDateStr)
  );
  
  // Filter habits for display
  const displayHabits = habitFilter === "all" 
    ? habitsOnSelectedDate 
    : habitsOnSelectedDate.filter(h => h.id === habitFilter);

  return (
    <div className="space-y-6 fade-in">
      <h1 className="text-3xl font-bold">Calendar View</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={habitFilter} onValueChange={setHabitFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select habit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Habits</SelectItem>
                  {habits.map(habit => (
                    <SelectItem key={habit.id} value={habit.id}>
                      {habit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Selected Day</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-medium">
                {date ? format(date, "MMMM d, yyyy") : "No date selected"}
              </p>
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Completed Habits:</h3>
                {displayHabits.length > 0 ? (
                  <div className="space-y-2">
                    {displayHabits.map(habit => (
                      <div 
                        key={habit.id} 
                        className="flex items-center gap-2 p-2 rounded-md bg-secondary/50"
                      >
                        <Badge className={getCategoryColor(habit.category)}>
                          {habit.category}
                        </Badge>
                        <span>{habit.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No habits completed on this day</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Habit Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiersClassNames={{
                selected: "bg-primary text-primary-foreground",
              }}
              modifiers={{
                hasHabits: (day) => {
                  const dayStr = format(day, "yyyy-MM-dd");
                  return habits.some(habit => 
                    habit.dates.some(d => format(d, "yyyy-MM-dd") === dayStr)
                  );
                },
              }}
              modifiersStyles={{
                hasHabits: {
                  backgroundColor: "rgba(139, 92, 246, 0.2)",
                  fontWeight: "bold",
                },
              }}
            />
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary/30" />
                <span className="text-sm">Has Completed Habits</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-sm">Selected</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
