
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent 
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Habit {
  id: string;
  name: string;
  category: string;
  streak: number;
}

// Mock data for categories and habits
const categories = [
  {
    id: "health",
    name: "Health",
    color: "#10B981",
    habits: [
      { id: "h1", name: "Morning Run", category: "Health", streak: 12 },
      { id: "h2", name: "Drink Water", category: "Health", streak: 20 },
    ],
  },
  {
    id: "mental",
    name: "Mental Health",
    color: "#8B5CF6",
    habits: [
      { id: "m1", name: "Meditate", category: "Mental Health", streak: 24 },
      { id: "m2", name: "Journal", category: "Mental Health", streak: 15 },
    ],
  },
  {
    id: "productivity",
    name: "Productivity",
    color: "#F59E0B",
    habits: [
      { id: "p1", name: "Deep Work", category: "Productivity", streak: 8 },
      { id: "p2", name: "Project Work", category: "Productivity", streak: 5 },
      { id: "p3", name: "Daily Planning", category: "Productivity", streak: 10 },
    ],
  },
  {
    id: "skills",
    name: "Skills",
    color: "#3B82F6",
    habits: [
      { id: "s1", name: "Read 30 Minutes", category: "Skills", streak: 8 },
      { id: "s2", name: "Learn Language", category: "Skills", streak: 14 },
    ],
  },
];

const SortableHabitItem = ({ habit }: { habit: Habit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: habit.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-card p-3 mb-2 rounded-md border flex justify-between items-center cursor-move hover:bg-card/80"
    >
      <div className="flex items-center space-x-2">
        <CheckCircle size={16} className="text-green-500" />
        <span>{habit.name}</span>
        {habit.streak > 0 && (
          <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
            {habit.streak} days
          </Badge>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Mark Complete</DropdownMenuItem>
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Move to Another Category</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Categories = () => {
  const [categoriesData, setCategoriesData] = useState(categories);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return;
    }
    
    // Find which category contains the dragged habit
    const draggedHabitId = active.id.toString();
    let sourceCategory;
    let sourceHabitIndex;
    
    for (const category of categoriesData) {
      const habitIndex = category.habits.findIndex(h => h.id === draggedHabitId);
      if (habitIndex !== -1) {
        sourceCategory = category;
        sourceHabitIndex = habitIndex;
        break;
      }
    }
    
    if (!sourceCategory || sourceHabitIndex === undefined) return;
    
    // Reorder habits
    const newHabits = [...sourceCategory.habits];
    const overHabitIndex = sourceCategory.habits.findIndex(h => h.id === over.id);
    
    if (overHabitIndex !== -1) {
      const updatedHabits = arrayMove(newHabits, sourceHabitIndex, overHabitIndex);
      
      // Update category with new habits order
      const updatedCategories = categoriesData.map(cat => 
        cat.id === sourceCategory!.id ? { ...cat, habits: updatedHabits } : cat
      );
      
      setCategoriesData(updatedCategories);
    }
  };

  return (
    <div className="space-y-6 fade-in">
      <h1 className="text-3xl font-bold">Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoriesData.map((category) => (
          <Card key={category.id} className="h-auto">
            <CardHeader className="pb-3" style={{ borderBottom: `2px solid ${category.color}` }}>
              <CardTitle className="flex justify-between items-center">
                <span>{category.name}</span>
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={category.habits.map(h => h.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {category.habits.map((habit) => (
                    <SortableHabitItem key={habit.id} habit={habit} />
                  ))}
                </SortableContext>
              </DndContext>
              <Button
                variant="ghost" 
                className="w-full mt-2 border border-dashed text-muted-foreground"
              >
                Add Habit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
