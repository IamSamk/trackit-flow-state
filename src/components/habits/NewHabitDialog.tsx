
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { createHabit } from "@/services/notionService";

interface NewHabitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = [
  { id: "health", name: "Health", color: "#10B981" },
  { id: "mental", name: "Mental Health", color: "#8B5CF6" },
  { id: "productivity", name: "Productivity", color: "#F59E0B" },
  { id: "skills", name: "Skills", color: "#3B82F6" }
];

const frequencies = [
  { id: "daily", name: "Daily" },
  { id: "weekdays", name: "Weekdays" },
  { id: "weekends", name: "Weekends" },
  { id: "weekly", name: "Weekly" },
  { id: "custom", name: "Custom" }
];

const NewHabitDialog = ({ open, onOpenChange }: NewHabitDialogProps) => {
  const [habitName, setHabitName] = useState("");
  const [category, setCategory] = useState("health");
  const [frequency, setFrequency] = useState("daily");
  const [reminder, setReminder] = useState("none");
  const [notes, setNotes] = useState("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const createHabitMutation = useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      resetForm();
      onOpenChange(false);
      toast({
        title: "Habit created",
        description: "Your new habit has been successfully created.",
      });
    },
    onError: (error) => {
      console.error("Error creating habit:", error);
      toast({
        title: "Creation failed",
        description: "Could not create habit. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const resetForm = () => {
    setHabitName("");
    setCategory("health");
    setFrequency("daily");
    setReminder("none");
    setNotes("");
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createHabitMutation.mutate({
      name: habitName,
      category: categories.find(c => c.id === category)?.name || "Health",
      frequency: frequencies.find(f => f.id === frequency)?.name || "Daily",
    });
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetForm();
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Habit</DialogTitle>
          <DialogDescription>
            Add a new habit to track. Fill out the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Habit Name</Label>
              <Input 
                id="name" 
                placeholder="e.g., Morning Run" 
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                required 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                required 
                value={category} 
                onValueChange={setCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: cat.color }}
                        />
                        {cat.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label>Frequency</Label>
              <Select 
                required 
                value={frequency} 
                onValueChange={setFrequency}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq.id} value={freq.id}>
                      {freq.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="reminder">Reminder</Label>
              <RadioGroup 
                value={reminder} 
                onValueChange={setReminder} 
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">No reminder</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="morning" id="morning" />
                  <Label htmlFor="morning">Morning (8:00 AM)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="evening" id="evening" />
                  <Label htmlFor="evening">Evening (8:00 PM)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea 
                id="notes" 
                placeholder="Any additional details..." 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={createHabitMutation.isPending}
            >
              {createHabitMutation.isPending ? "Creating..." : "Create Habit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewHabitDialog;
