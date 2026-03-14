'use client';

import { useState, useRef, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { ChatInput } from '@/components/chat/ChatInput';
import { Task } from '@/types';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// 初始欢迎消息
const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: '你好呀，朋友。今天感觉怎么样？',
  timestamp: new Date(),
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [taskStatus, setTaskStatus] = useState<'idle' | 'pending' | 'doing' | 'completed'>('idle');
  const [showTask, setShowTask] = useState(false);

  // 检查 AI 回复中是否包含微行动推荐
  const checkForTaskRecommendation = (content: string) => {
    const lowerContent = content.toLowerCase();

    if (lowerContent.includes('呼吸') || lowerContent.includes('放松') || lowerContent.includes('深呼吸')) {
      setCurrentTask({
        id: 'task-breathing',
        userId: 'user-1',
        entryId: 'entry-1',
        title: '3分钟深呼吸',
        description: '慢慢吸气4秒，屏住4秒，呼气6秒。重复几次，让身体放松下来。',
        type: 'breathing',
        estimatedTime: '3分钟',
        status: 'pending',
        createdAt: new Date(),
      });
      setTaskStatus('pending');
      setShowTask(true);
    } else if (lowerContent.includes('走走') || lowerContent.includes('散步') || lowerContent.includes('走路')) {
      setCurrentTask({
        id: 'task-walking',
        userId: 'user-1',
        entryId: 'entry-1',
        title: '出去走走',
        description: '到户外走10分钟，看看周围的风景，让身体动起来。',
        type: 'walking',
        estimatedTime: '10分钟',
        status: 'pending',
        createdAt: new Date(),
      });
      setTaskStatus('pending');
      setShowTask(true);
    } else if (lowerContent.includes('写') || lowerContent.includes('记录')) {
      setCurrentTask({
        id: 'task-writing',
        userId: 'user-1',
        entryId: 'entry-1',
        title: '写点什么',
        description: '花5分钟，把现在的想法写下来，不用在意格式，自由表达。',
        type: 'writing',
        estimatedTime: '5分钟',
        status: 'pending',
        createdAt: new Date(),
      });
      setTaskStatus('pending');
      setShowTask(true);
    }
  };

  // 发送消息并处理流式响应
  const handleSend = useCallback(async (content: string) => {
    if (!content.trim() || isAiTyping) return;

    setError(null);
    setInput('');

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsAiTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || '请求失败');
      }

      // 处理流式响应
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('无法读取响应');
      }

      let aiContent = '';
      const aiMessageId = (Date.now() + 1).toString();

      // 添加空的 AI 消息占位
      setMessages((prev) => [
        ...prev,
        {
          id: aiMessageId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
        },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              // 只显示最终回复内容，不显示推理过程
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                aiContent += delta;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === aiMessageId
                      ? { ...m, content: aiContent }
                      : m
                  )
                );
              }
            } catch {
              // 忽略解析错误
            }
          }
        }
      }

      // 检查是否需要推荐微行动
      checkForTaskRecommendation(aiContent);
    } catch (err) {
      console.error('Chat error:', err);
      setError(err instanceof Error ? err.message : '发送消息失败');
    } finally {
      setIsAiTyping(false);
    }
  }, [messages, isAiTyping]);

  const handleAcceptTask = () => {
    setTaskStatus('doing');
  };

  const handleSkipTask = () => {
    setTaskStatus('idle');
    setShowTask(false);
  };

  const handleCompleteTask = (feedback?: string) => {
    setTaskStatus('completed');
    console.log('Task completed with feedback:', feedback);

    setTimeout(() => {
      setShowTask(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* 顶部导航 */}
      <header
        className="sticky top-0 z-50 px-6 py-4 flex items-center gap-4"
        style={{ backgroundColor: 'rgba(250, 247, 242, 0.9)', backdropFilter: 'blur(8px)' }}
      >
        <Link
          href="/"
          className="p-2 rounded-full transition-colors"
          style={{ backgroundColor: 'var(--color-bg-secondary)' }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} />
        </Link>
        <div>
          <h1
            className="text-lg font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            今日签到
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            3-5分钟的温柔对话
          </p>
        </div>
      </header>

      {/* 错误提示 */}
      {error && (
        <div className="mx-4 mt-2 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* 聊天容器 */}
      <ChatContainer
        messages={messages}
        isAiTyping={isAiTyping}
        currentTask={showTask ? currentTask : null}
        taskStatus={taskStatus}
        onAcceptTask={handleAcceptTask}
        onSkipTask={handleSkipTask}
        onCompleteTask={handleCompleteTask}
      />

      {/* 输入框 */}
      <div className="px-4 py-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSend={handleSend}
          disabled={isAiTyping}
        />
      </div>
    </div>
  );
}
