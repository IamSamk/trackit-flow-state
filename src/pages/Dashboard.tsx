
import OverviewSection from "@/components/dashboard/OverviewSection";
import WeeklyProgress from "@/components/dashboard/WeeklyProgress";
import CategoryPerformance from "@/components/dashboard/CategoryPerformance";
import HabitTable from "@/components/habits/HabitTable";
import HabitCalendar from "@/components/habits/HabitCalendar";

const Dashboard = () => {
  return (
    <div className="space-y-8 fade-in">
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
