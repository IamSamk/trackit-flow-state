
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Flame, Calendar, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for habits
const habits = [
  {
    id: "1",
    name: "Morning Run",
    category: "Health",
    frequency: "Daily",
    streak: 12,
    completionRate: 94,
    status: "completed",
  },
  {
    id: "2",
    name: "Read 30 Minutes",
    category: "Skills",
    frequency: "Daily",
    streak: 8,
    completionRate: 87,
    status: "completed",
  },
  {
    id: "3",
    name: "Meditate",
    category: "Mental Health",
    frequency: "Daily",
    streak: 24,
    completionRate: 92,
    status: "completed",
  },
  {
    id: "4",
    name: "Project Work",
    category: "Productivity",
    frequency: "Weekdays",
    streak: 5,
    completionRate: 78,
    status: "missed",
  },
  {
    id: "5",
    name: "Journal",
    category: "Mental Health",
    frequency: "Daily",
    streak: 15,
    completionRate: 85,
    status: "pending",
  },
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

const getStatusBadge = (status: string) => {
  switch(status) {
    case 'completed':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
    case 'missed':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Missed</Badge>;
    case 'pending':
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
    default:
      return null;
  }
};

const HabitTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Habits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead className="text-center">Streak</TableHead>
                <TableHead className="text-center">Completion</TableHead>
                <TableHead className="text-center">Today</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {habits.map((habit) => (
                <TableRow key={habit.id}>
                  <TableCell className="font-medium">{habit.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getCategoryColor(habit.category)}>
                      {habit.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{habit.frequency}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Flame size={16} className="text-amber-500" />
                      <span>{habit.streak} days</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{habit.completionRate}%</TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(habit.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          Mark Complete
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <XCircle className="mr-2 h-4 w-4 text-red-500" />
                          Mark Missed
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          View History
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitTable;
