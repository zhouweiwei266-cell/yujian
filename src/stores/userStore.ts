// 用户状态管理
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, MoodEntry, AIConfig } from '@/types';

const defaultAIConfig: AIConfig = {
  provider: 'moonshot',
  model: process.env.NEXT_PUBLIC_MOONSHOT_MODEL || 'kimi-k2.5',
  apiKey: '',
  baseUrl: 'https://api.moonshot.cn/v1',
  maxTokens: 4096,
  temperature: 0.75,
};

interface UserState {
  // 用户信息
  user: User | null;
  isAuthenticated: boolean;

  // 设置
  aiConfig: AIConfig;

  // 今日状态
  todayEntry: MoodEntry | null;
  hasCompletedToday: boolean;

  // 7天情绪数据
  recentMoods: {
    date: Date;
    score: number;
    hasEntry: boolean;
  }[];
}

interface UserActions {
  setUser: (user: User | null) => void;
  updateAIConfig: (config: Partial<AIConfig>) => void;
  setTodayEntry: (entry: MoodEntry | null) => void;
  setHasCompletedToday: (completed: boolean) => void;
  setRecentMoods: (moods: UserState['recentMoods']) => void;
  checkTodayStatus: () => Promise<void>;
  fetchRecentMoods: () => Promise<void>;
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set, get) => ({
      // 初始状态
      user: null,
      isAuthenticated: false,
      aiConfig: defaultAIConfig,
      todayEntry: null,
      hasCompletedToday: false,
      recentMoods: [],

      // Actions
      setUser: (user) => set({
        user,
        isAuthenticated: !!user
      }),

      updateAIConfig: (config) => set((state) => ({
        aiConfig: { ...state.aiConfig, ...config },
      })),

      setTodayEntry: (entry) => set({
        todayEntry: entry,
        hasCompletedToday: !!entry
      }),

      setHasCompletedToday: (completed) => set({
        hasCompletedToday: completed
      }),

      setRecentMoods: (moods) => set({ recentMoods: moods }),

      checkTodayStatus: async () => {
        // Mock 实现 - 第4步替换为真实API调用
        console.log('检查今日状态...');
      },

      fetchRecentMoods: async () => {
        // Mock 实现 - 第4步替换为真实API调用
        console.log('获取最近情绪数据...');
      },
    }),
    {
      name: 'yujian-user-storage',
      partialize: (state) => ({
        aiConfig: state.aiConfig,
        user: state.user,
      }),
    }
  )
);
