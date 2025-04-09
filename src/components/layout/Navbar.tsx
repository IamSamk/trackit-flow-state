
import React from 'react';
import { Menu, Search, Bell, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import NewHabitDialog from '@/components/habits/NewHabitDialog';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [isNewHabitOpen, setIsNewHabitOpen] = React.useState(false);

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <h1 className="text-xl font-semibold md:text-2xl">Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search habits..."
            className="w-full pl-8 rounded-lg bg-background"
          />
        </div>

        <Button variant="outline" size="icon" className="md:hidden">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>

        <Button
          onClick={() => setIsNewHabitOpen(true)}
          className="hidden md:flex"
          size="sm"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Habit
        </Button>

        <Button 
          size="icon" 
          variant="ghost"
          className="rounded-full"
          onClick={() => setIsNewHabitOpen(true)}
        >
          <PlusCircle className="h-5 w-5 md:hidden" />
          <span className="sr-only">Add Habit</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-primary" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-4 text-center">
              <p className="text-sm font-medium">No new notifications</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <NewHabitDialog open={isNewHabitOpen} onOpenChange={setIsNewHabitOpen} />
    </header>
  );
};

export default Navbar;
