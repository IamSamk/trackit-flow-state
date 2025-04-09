
import { useQuery } from "@tanstack/react-query";
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
import { Button } from "@/components/ui/button";
import { Flame, Calendar, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchHabits, updateHabitStatus } from "@/services/notionService";

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
  const { toast } = useToast();
  
  const { 
    data: habits = [], 
    isLoading, 
    isError,
    refetch 
  } = useQuery({
    queryKey: ['habits'],
    queryFn: fetchHabits,
  });

  const handleStatusUpdate = async (habitId: string, status: 'completed' | 'missed' | 'pending') => {
    try {
      await updateHabitStatus(habitId, status);
      refetch(); // Refresh habits after update
      
      toast({
        title: "Status updated",
        description: `Habit marked as ${status}`,
      });
    } catch (error) {
      console.error("Error updating habit status:", error);
      toast({
        title: "Update failed",
        description: "Could not update habit status",
        variant: "destructive",
      });
    }
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Habits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Habits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-destructive p-4">
            Error loading habits. Please check your Notion API settings.
          </div>
          <div className="flex justify-center">
            <Button onClick={() => refetch()} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

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
              {habits.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No habits found. Create your first habit to get started.
                  </TableCell>
                </TableRow>
              ) : (
                habits.map((habit) => (
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
                          <DropdownMenuItem onClick={() => handleStatusUpdate(habit.id, 'completed')}>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            Mark Complete
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(habit.id, 'missed')}>
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitTable;
