
import { cn } from '@/lib/utils';
import {
  BarChart,
  Calendar,
  Home,
  Kanban,
  List,
  Settings,
  X,
  PieChart
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeModeToggle from '@/components/ThemeModeToggle';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ href, icon, label, isActive }: NavItemProps) => (
  <Link to={href} className="w-full">
    <Button
      variant={isActive ? "default" : "ghost"}
      size="lg"
      className={cn(
        "w-full justify-start gap-3 font-medium",
        isActive ? "bg-primary text-primary-foreground" : "text-foreground/70"
      )}
    >
      {icon}
      <span>{label}</span>
    </Button>
  </Link>
);

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    {
      href: "/",
      icon: <Home size={20} />,
      label: "Dashboard"
    },
    {
      href: "/table",
      icon: <List size={20} />,
      label: "Habits Table"
    },
    {
      href: "/calendar",
      icon: <Calendar size={20} />,
      label: "Calendar"
    },
    {
      href: "/categories",
      icon: <Kanban size={20} />,
      label: "Categories"
    },
    {
      href: "/analytics",
      icon: <BarChart size={20} />,
      label: "Analytics"
    },
    {
      href: "/settings",
      icon: <Settings size={20} />,
      label: "Settings"
    }
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 z-50 flex w-72 flex-col border-r bg-sidebar transition-transform duration-300 lg:static",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
      )}
    >
      <div className="flex h-16 items-center justify-between px-6 border-b">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">T</div>
          {isOpen && <span className="text-xl font-bold">TrackIT</span>}
        </Link>
      </div>
      
      <div className="flex-1 overflow-auto py-4 px-3">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathname === item.href}
            />
          ))}
        </nav>
      </div>
      
      <div className="border-t p-4 mt-auto">
        <ThemeModeToggle />
      </div>
    </aside>
  );
};

export default Sidebar;
