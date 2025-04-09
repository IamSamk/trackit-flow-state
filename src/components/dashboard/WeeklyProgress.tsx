
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, Tooltip, CartesianGrid } from "recharts";

// Mock data for the weekly progress
const weeklyData = [
  {
    day: "Mon",
    completed: 4,
    missed: 1,
  },
  {
    day: "Tue",
    completed: 5,
    missed: 0,
  },
  {
    day: "Wed",
    completed: 3,
    missed: 2,
  },
  {
    day: "Thu",
    completed: 6,
    missed: 0,
  },
  {
    day: "Fri",
    completed: 4,
    missed: 1,
  },
  {
    day: "Sat",
    completed: 5,
    missed: 0,
  },
  {
    day: "Sun",
    completed: 4,
    missed: 1,
  },
];

const WeeklyProgress = () => {
  return (
    <Card className="col-span-12 md:col-span-8">
      <CardHeader>
        <CardTitle>Weekly Progress</CardTitle>
        <CardDescription>Completed vs Missed habits this week</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--background)', 
                borderColor: 'var(--border)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Bar 
              dataKey="completed" 
              stackId="a" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="missed" 
              stackId="a" 
              fill="hsl(var(--destructive) / 0.7)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WeeklyProgress;
