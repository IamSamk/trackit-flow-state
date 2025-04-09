
// Notion API service implementation

// Notion credentials
const NOTION_API_KEY = "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"; 
const NOTION_DATABASE_ID = "1ce69fb2b87280a6be7efea4e080dc35";

interface NotionHabit {
  id: string;
  name: string;
  category: string;
  frequency: string;
  streak: number;
  completionRate: number;
  status: 'completed' | 'missed' | 'pending';
}

// Map Notion API response to our habit interface
const mapNotionResultToHabit = (result: any): NotionHabit => {
  const properties = result.properties;
  
  return {
    id: result.id,
    name: properties.Name?.title?.[0]?.text?.content || "Unnamed Habit",
    category: properties.Category?.select?.name || "Uncategorized",
    frequency: properties.Frequency?.select?.name || "Daily",
    streak: properties.Streak?.number || 0,
    completionRate: properties.CompletionRate?.number || 0,
    status: properties.Status?.select?.name?.toLowerCase() || 'pending',
  };
};

export const fetchHabits = async (): Promise<NotionHabit[]> => {
  console.log("Fetching habits from Notion API");
  
  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page_size: 100 }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Notion API error:", errorText);
      throw new Error(`Notion API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results.map(mapNotionResultToHabit);
  } catch (error) {
    console.error("Error fetching habits from Notion:", error);
    
    // Fallback to mock data if API call fails
    console.warn("Using mock data as fallback");
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
  }
};

export const createHabit = async (habitData: Partial<NotionHabit>): Promise<NotionHabit> => {
  console.log("Creating habit with API Key:", NOTION_API_KEY);
  
  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          Name: { 
            title: [{ text: { content: habitData.name || "New Habit" } }] 
          },
          Category: { 
            select: { name: habitData.category || "Health" } 
          },
          Frequency: { 
            select: { name: habitData.frequency || "Daily" } 
          },
          Streak: {
            number: 0
          },
          CompletionRate: {
            number: 0
          },
          Status: {
            select: { name: "Pending" }
          }
        },
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Notion API error:", errorText);
      throw new Error(`Notion API error: ${response.status}`);
    }
    
    const data = await response.json();
    return mapNotionResultToHabit(data);
  } catch (error) {
    console.error("Error creating habit in Notion:", error);
    
    // Fallback to mock response if API call fails
    return {
      id: Math.random().toString(36).substring(2, 9),
      name: habitData.name || 'New Habit',
      category: habitData.category || 'Health',
      frequency: habitData.frequency || 'Daily',
      streak: 0,
      completionRate: 0,
      status: 'pending',
    };
  }
};

export const updateHabitStatus = async (
  habitId: string, 
  status: 'completed' | 'missed' | 'pending'
): Promise<NotionHabit> => {
  console.log("Updating habit status with API Key:", NOTION_API_KEY);
  
  try {
    // Get the current habit data first
    const response = await fetch(`https://api.notion.com/v1/pages/${habitId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Notion API error:", errorText);
      throw new Error(`Notion API error: ${response.status}`);
    }
    
    const habitData = await response.json();
    const currentStreak = habitData.properties.Streak?.number || 0;
    
    // Calculate new streak based on status
    const newStreak = status === 'completed' ? currentStreak + 1 : 0;
    
    // Update the habit
    const updateResponse = await fetch(`https://api.notion.com/v1/pages/${habitId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          Status: { 
            select: { name: status.charAt(0).toUpperCase() + status.slice(1) } 
          },
          Streak: {
            number: newStreak
          }
        },
      }),
    });
    
    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error("Notion API error:", errorText);
      throw new Error(`Notion API error: ${updateResponse.status}`);
    }
    
    const updatedData = await updateResponse.json();
    return mapNotionResultToHabit(updatedData);
  } catch (error) {
    console.error("Error updating habit status in Notion:", error);
    
    // Fallback to mock response if API call fails
    return {
      id: habitId,
      name: "Updated Habit",
      category: "Health",
      frequency: "Daily",
      streak: status === 'completed' ? 1 : 0,
      completionRate: status === 'completed' ? 100 : 0,
      status,
    };
  }
};

// Integrate React Query with these functions to manage cache and data fetching
