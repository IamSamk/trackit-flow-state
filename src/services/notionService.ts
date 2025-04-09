
// Notion API service with hardcoded credentials

// Hardcoded Notion credentials - typically these would be in .env
const NOTION_API_KEY = "your-notion-api-key-here"; 
const NOTION_DATABASE_ID = "your-notion-database-id-here";

interface NotionHabit {
  id: string;
  name: string;
  category: string;
  frequency: string;
  streak: number;
  completionRate: number;
  status: 'completed' | 'missed' | 'pending';
}

// Mock data, replace with actual API calls
export const fetchHabits = async (): Promise<NotionHabit[]> => {
  console.log("Fetching habits with API Key:", NOTION_API_KEY);
  
  // This would be an actual API call to Notion using the hardcoded credentials
  // Example:
  // const response = await fetch('https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${NOTION_API_KEY}`,
  //     'Notion-Version': '2022-06-28',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ page_size: 100 }),
  // });
  // const data = await response.json();
  // return data.results.map(mapNotionResultToHabit);
  
  // For now, return mock data
  return [
    {
      id: "1",
      name: "Morning Run",
      category: "Health",
      frequency: "Daily",
      streak: 12,
      completionRate: 94,
      status: 'completed',
    },
    {
      id: "2",
      name: "Read 30 Minutes",
      category: "Skills",
      frequency: "Daily",
      streak: 8,
      completionRate: 87,
      status: 'completed',
    },
    {
      id: "3",
      name: "Meditate",
      category: "Mental Health",
      frequency: "Daily",
      streak: 24,
      completionRate: 92,
      status: 'completed',
    },
    {
      id: "4",
      name: "Project Work",
      category: "Productivity",
      frequency: "Weekdays",
      streak: 5,
      completionRate: 78,
      status: 'missed',
    },
    {
      id: "5",
      name: "Journal",
      category: "Mental Health",
      frequency: "Daily",
      streak: 15,
      completionRate: 85,
      status: 'pending',
    },
  ];
};

export const createHabit = async (habitData: Partial<NotionHabit>): Promise<NotionHabit> => {
  console.log("Creating habit with API Key:", NOTION_API_KEY);
  // This would be an actual API call to Notion
  // Example:
  // const response = await fetch('https://api.notion.com/v1/pages', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${NOTION_API_KEY}`,
  //     'Notion-Version': '2022-06-28',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     parent: { database_id: NOTION_DATABASE_ID },
  //     properties: {
  //       Name: { title: [{ text: { content: habitData.name } }] },
  //       Category: { select: { name: habitData.category } },
  //       Frequency: { select: { name: habitData.frequency } },
  //       // Add other properties
  //     },
  //   }),
  // });
  // const data = await response.json();
  // return mapNotionResultToHabit(data);
  
  // For now, return mock data with a generated ID
  return {
    id: Math.random().toString(36).substring(2, 9),
    name: habitData.name || 'New Habit',
    category: habitData.category || 'Health',
    frequency: habitData.frequency || 'Daily',
    streak: 0,
    completionRate: 0,
    status: 'pending',
  };
};

export const updateHabitStatus = async (
  habitId: string, 
  status: 'completed' | 'missed' | 'pending'
): Promise<NotionHabit> => {
  console.log("Updating habit status with API Key:", NOTION_API_KEY);
  // This would be an actual API call to Notion
  // For now, return mock data
  return {
    id: habitId,
    name: "Updated Habit",
    category: "Health",
    frequency: "Daily",
    streak: status === 'completed' ? 1 : 0,
    completionRate: status === 'completed' ? 100 : 0,
    status,
  };
};
