
import StatCard from "./StatCard";
import { Activity, ChartPieIcon, Flame, CheckSquare } from "lucide-react";

const OverviewSection = () => {
  // These would normally come from an API
  const stats = {
    activeHabits: 12,
    completionRate: 83,
    longestStreak: 24,
    categories: 4,
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Active Habits"
        value={stats.activeHabits}
        icon={Activity}
        description="Total habits being tracked"
        iconColor="text-primary"
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="Completion Rate"
        value={`${stats.completionRate}%`}
        icon={CheckSquare}
        description="Average habit completion"
        iconColor="text-emerald-500"
        trend={{ value: 4, isPositive: true }}
      />
      <StatCard
        title="Longest Streak"
        value={stats.longestStreak}
        icon={Flame}
        description="Days in a row"
        iconColor="text-amber-500"
        trend={{ value: 8, isPositive: true }}
      />
      <StatCard
        title="Categories"
        value={stats.categories}
        icon={ChartPieIcon}
        description="Habit categories"
        iconColor="text-blue-500"
      />
    </div>
  );
};

export default OverviewSection;
