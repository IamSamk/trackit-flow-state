
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart, Pie, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Flame } from "lucide-react";

// Mock data for charts
const weeklyData = [
  { name: 'Week 1', completed: 28, missed: 7 },
  { name: 'Week 2', completed: 35, missed: 0 },
  { name: 'Week 3', completed: 30, missed: 5 },
  { name: 'Week 4', completed: 33, missed: 2 },
];

const monthlyData = [
  { name: 'Jan', completed: 120, missed: 30 },
  { name: 'Feb', completed: 110, missed: 25 },
  { name: 'Mar', completed: 130, missed: 20 },
  { name: 'Apr', completed: 125, missed: 15 },
];

const categoryData = [
  { name: 'Health', value: 65, color: '#10B981' },
  { name: 'Mental Health', value: 82, color: '#8B5CF6' },
  { name: 'Productivity', value: 74, color: '#F59E0B' },
  { name: 'Skills', value: 56, color: '#3B82F6' },
];

const habitStreaks = [
  { name: 'Morning Run', streak: 12 },
  { name: 'Meditate', streak: 24 },
  { name: 'Journal', streak: 15 },
  { name: 'Read 30 Minutes', streak: 8 },
  { name: 'Project Work', streak: 5 },
];

const StreakVisual = ({ streak }: { streak: number }) => {
  return (
    <div className="flex">
      {[...Array(Math.min(streak, 10))].map((_, i) => (
        <Flame
          key={i}
          size={16}
          className={i < 3 ? "text-amber-300" : i < 7 ? "text-amber-500" : "text-amber-600"}
        />
      ))}
      {streak > 10 && <span className="ml-1 text-xs">+{streak - 10}</span>}
    </div>
  );
};

const Analytics = () => {
  return (
    <div className="space-y-6 fade-in">
      <h1 className="text-3xl font-bold">Analytics</h1>
      
      <Tabs defaultValue="progress">
        <TabsList className="grid grid-cols-3 max-w-md mb-4">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="streaks">Streaks</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Habit Completion Over Time</CardTitle>
              <CardDescription>Tracking your completed vs missed habits</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="weekly">
                <TabsList className="grid grid-cols-2 max-w-[200px] mb-4">
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                
                <TabsContent value="weekly">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'var(--background)', 
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                          }} 
                        />
                        <Legend />
                        <Bar dataKey="completed" name="Completed" stackId="a" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="missed" name="Missed" stackId="a" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="monthly">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'var(--background)', 
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                          }} 
                        />
                        <Legend />
                        <Line type="monotone" dataKey="completed" name="Completed" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="missed" name="Missed" stroke="hsl(var(--destructive))" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="streaks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Streak Gallery</CardTitle>
              <CardDescription>Your current habit streaks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {habitStreaks.map((habit) => (
                  <Card key={habit.name} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{habit.name}</h4>
                          <p className="text-sm text-muted-foreground">{habit.streak} day streak</p>
                        </div>
                        <StreakVisual streak={habit.streak} />
                      </div>
                      <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500"
                          style={{ width: `${Math.min(habit.streak * 4, 100)}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>Completion rates across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => `${value}%`}
                        contentStyle={{ 
                          backgroundColor: 'var(--background)', 
                          borderColor: 'var(--border)',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={categoryData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip 
                        formatter={(value) => `${value}%`}
                        contentStyle={{ 
                          backgroundColor: 'var(--background)', 
                          borderColor: 'var(--border)',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
