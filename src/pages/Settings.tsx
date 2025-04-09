
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { TimerReset } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [databaseId, setDatabaseId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveNotionSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings updated",
        description: "Your Notion API settings have been saved.",
      });
    }, 1000);
  };

  const handleResetData = () => {
    toast({
      title: "Are you sure?",
      description: "This will reset all your habit tracking data. This action cannot be undone.",
      action: (
        <Button 
          variant="destructive" 
          onClick={() => {
            toast({
              title: "Data reset",
              description: "All habit data has been reset.",
            });
          }}
        >
          Reset
        </Button>
      ),
    });
  };

  return (
    <div className="space-y-6 fade-in max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Tabs defaultValue="general">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notion">Notion API</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure your app preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="theme">Theme Preference</Label>
                <Select defaultValue="system">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light Mode</SelectItem>
                    <SelectItem value="dark">Dark Mode</SelectItem>
                    <SelectItem value="system">System Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="date-format">Date Format</Label>
                <Select defaultValue="MM/DD/YYYY">
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive habit reminders and streak alerts
                  </p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekstart">Start Week on Monday</Label>
                  <p className="text-sm text-muted-foreground">
                    Set Monday as the first day of the week
                  </p>
                </div>
                <Switch id="weekstart" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notion" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notion API Connection</CardTitle>
              <CardDescription>Connect TrackIT with your Notion database.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="api-key">Notion API Key</Label>
                <Input 
                  id="api-key" 
                  type="password" 
                  placeholder="secret_..."
                  value={apiKey} 
                  onChange={(e) => setApiKey(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You can get your API key from <a href="https://www.notion.so/my-integrations" target="_blank" rel="noreferrer" className="text-primary hover:underline">Notion Integrations</a>
                </p>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="database-id">Notion Database ID</Label>
                <Input 
                  id="database-id" 
                  placeholder="1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p" 
                  value={databaseId} 
                  onChange={(e) => setDatabaseId(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The ID of your habits database in Notion
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sync">Auto Sync</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically sync data with Notion
                  </p>
                </div>
                <Switch id="sync" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotionSettings} disabled={isLoading}>
                {isLoading ? "Saving..." : "Connect Notion"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Manage your habit tracking data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Export Data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Download your habit tracking data in JSON or CSV format.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline">Export as JSON</Button>
                  <Button variant="outline">Export as CSV</Button>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-medium text-destructive mb-2">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  These actions are irreversible. Please be careful.
                </p>
                <Button 
                  variant="destructive" 
                  onClick={handleResetData}
                  className="flex items-center"
                >
                  <TimerReset className="mr-2 h-4 w-4" />
                  Reset All Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
