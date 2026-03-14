'use client';

import { useRef, useEffect } from 'react';
import { ChatBubble } from './ChatBubble';
import { TypingIndicator } from './TypingIndicator';
import { TaskCard } from './TaskCard';
import { Message, Task } from '@/types';

interface ChatContainerProps {
  messages: Message[];
  isAiTyping: boolean;
  currentTask?: Task | null;
  taskStatus: 'idle' | 'pending' | 'doing' | 'completed';
  onAcceptTask: () => void;
  onSkipTask: () => void;
  onCompleteTask: (feedback?: string) => void;
}

export function ChatContainer({
  messages,
  isAiTyping,
  currentTask,
  taskStatus,
  onAcceptTask,
  onSkipTask,
  onCompleteTask,
}: ChatContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isAiTyping]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-6 space-y-2"
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* 欢迎语 */}
      {messages.length === 0 && (
        <div className="text-center py-12">
          <p style={{ color: 'var(--color-text-muted)' }}>
            今天想聊点什么？我在这里倾听。
          </p>
        </div>
      )}

      {/* 消息列表 */}
      {messages.map((message, index) => (
        <ChatBubble
          key={message.id}
          role={message.role}
          content={message.content}
          timestamp={message.timestamp}
          isFirst={index === 0}
          isLast={index === messages.length - 1}
        />
      ))}

      {/* AI正在输入 */}
      {isAiTyping && <TypingIndicator />}

      {/* 微行动卡片 */}
      {currentTask && taskStatus === 'pending' && (
        <div className="flex justify-start my-4">
          <TaskCard
            task={currentTask}
            onAccept={onAcceptTask}
            onSkip={onSkipTask}
            onComplete={onCompleteTask}
            status={taskStatus}
          />
        </div>
      )}

      {/* 底部留白 */}
      <div className="h-4" />
    </div>
  );
}
