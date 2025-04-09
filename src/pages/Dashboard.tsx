
import OverviewSection from "@/components/dashboard/OverviewSection";
import WeeklyProgress from "@/components/dashboard/WeeklyProgress";
import CategoryPerformance from "@/components/dashboard/CategoryPerformance";
import HabitTable from "@/components/habits/HabitTable";
import HabitCalendar from "@/components/habits/HabitCalendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Key } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [isNotionConfigured] = useState(false);

  return (
    <div className="space-y-8 fade-in">
      {!isNotionConfigured && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-xl font-bold">Connect Your Notion Database</h2>
                <p className="text-muted-foreground">
                  To get started with TrackIT, connect your Notion database to sync your habits data.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2" 
                  onClick={() => window.open("https://developers.notion.com/docs/create-a-notion-integration", "_blank")}
                >
                  <Key className="h-4 w-4" />
                  Get Notion API Key
                </Button>
                <Button 
                  className="flex items-center gap-2" 
                  onClick={() => window.location.href = '/settings'}
                >
                  <FileText className="h-4 w-4" />
                  Configure Integration
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <OverviewSection />
      
      <div className="grid grid-cols-12 gap-4">
        <WeeklyProgress />
        <CategoryPerformance />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <HabitTable />
        </div>
        <HabitCalendar />
      </div>
    </div>
  );
};

export default Dashboard;
