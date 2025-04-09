
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotionBanner, setShowNotionBanner] = useState(true);
  const { toast } = useToast();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dismissNotionBanner = () => {
    setShowNotionBanner(false);
    toast({
      title: "Notion banner dismissed",
      description: "You can still configure Notion API in Settings.",
    });
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        
        {showNotionBanner && (
          <Card className="mx-4 md:mx-6 mt-4 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">Notion API Connection Required</p>
                <p className="text-sm text-muted-foreground">
                  To fully use TrackIT, please add your Notion API Key and Database ID in Settings.
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-amber-300"
                  onClick={() => window.location.href = '/settings'}
                >
                  Configure Now
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={dismissNotionBanner}
                >
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
