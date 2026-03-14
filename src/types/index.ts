// 愈见 - 类型定义

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  preferences: {
    aiTemperature: number;
    dailyReminderTime?: string;
  };
}

export interface Memory {
  id: string;
  userId: string;
  key: string;
  value: string;
  category: 'event' | 'fact' | 'preference' | 'emotion';
  importance: number;
  sourceEntryId: string;
  createdAt: Date;
  updatedAt: Date;
  lastAccessedAt: Date;
}

export interface MoodEntry {
  id: string;
  userId: string;
  date: Date;
  score: number;
  note: string;
  conversationSummary: string;
  keyTopics: string[];
  taskId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    isMemoryTrigger?: boolean;
    isTaskSuggestion?: boolean;
  };
}

export interface Conversation {
  id: string;
  userId: string;
  entryId: string;
  messages: Message[];
  startedAt: Date;
  endedAt?: Date;
  status: 'active' | 'completed' | 'abandoned';
}

export interface Task {
  id: string;
  userId: string;
  entryId: string;
  title: string;
  description: string;
  type: 'breathing' | 'walking' | 'writing' | 'observing' | 'other';
  estimatedTime: string;
  status: 'pending' | 'accepted' | 'completed' | 'skipped';
  feedback?: string;
  completedAt?: Date;
  createdAt: Date;
}

export interface AIConfig {
  provider: 'moonshot';
  model: string;
  apiKey: string;
  baseUrl: string;
  maxTokens: number;
  temperature: number;
}
