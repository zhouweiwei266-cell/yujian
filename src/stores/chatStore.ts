// 聊天状态管理
import { create } from 'zustand';
import { Message, Task } from '@/types';

interface ChatState {
  // 对话状态
  conversationId: string | null;
  messages: Message[];
  isLoading: boolean;
  isAiTyping: boolean;

  // 任务状态
  currentTask: Task | null;
  taskStatus: 'idle' | 'pending' | 'doing' | 'completed';

  // 记忆状态
  memoryContext: string;

  // 当前情绪（临时）
  currentMood: {
    score: number | null;
    detected: boolean;
  };
}

interface ChatActions {
  startConversation: () => void;
  addMessage: (message: Message) => void;
  setIsLoading: (loading: boolean) => void;
  setIsAiTyping: (typing: boolean) => void;
  setCurrentTask: (task: Task | null) => void;
  setTaskStatus: (status: ChatState['taskStatus']) => void;
  completeTask: (feedback?: string) => void;
  skipTask: () => void;
  setMemoryContext: (context: string) => void;
  setCurrentMood: (mood: { score: number | null; detected: boolean }) => void;
  reset: () => void;
}

const initialState: ChatState = {
  conversationId: null,
  messages: [],
  isLoading: false,
  isAiTyping: false,
  currentTask: null,
  taskStatus: 'idle',
  memoryContext: '',
  currentMood: {
    score: null,
    detected: false,
  },
};

export const useChatStore = create<ChatState & ChatActions>((set, get) => ({
  ...initialState,

  startConversation: () => {
    const id = `conv_${Date.now()}`;
    set({
      conversationId: id,
      messages: [],
      isLoading: false,
      isAiTyping: false,
      currentTask: null,
      taskStatus: 'idle',
      currentMood: { score: null, detected: false },
    });
  },

  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  setIsLoading: (loading) => set({ isLoading: loading }),
  setIsAiTyping: (typing) => set({ isAiTyping: typing }),
  setCurrentTask: (task) => set({ currentTask: task }),
  setTaskStatus: (status) => set({ taskStatus: status }),

  completeTask: (feedback) => {
    const { currentTask } = get();
    if (currentTask) {
      set({
        currentTask: {
          ...currentTask,
          status: 'completed',
          feedback,
          completedAt: new Date(),
        },
        taskStatus: 'completed',
      });
    }
  },

  skipTask: () => {
    const { currentTask } = get();
    if (currentTask) {
      set({
        currentTask: {
          ...currentTask,
          status: 'skipped',
        },
        taskStatus: 'idle',
      });
    }
  },

  setMemoryContext: (context) => set({ memoryContext: context }),
  setCurrentMood: (mood) => set({ currentMood: mood }),

  reset: () => set(initialState),
}));
