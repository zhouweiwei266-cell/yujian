'use client';

import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  isFirst?: boolean;
  isLast?: boolean;
}

export function ChatBubble({ role, content, timestamp, isLast }: ChatBubbleProps) {
  const isUser = role === 'user';

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in-up`}
    >
      <div
        className={`max-w-[80%] px-5 py-4 ${
          isUser
            ? 'chat-bubble-user'
            : 'chat-bubble-ai'
        }`}
        style={{
          backgroundColor: isUser ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
          color: 'var(--color-text-primary)',
          borderRadius: isUser ? '20px 20px 8px 20px' : '20px 20px 20px 8px',
          border: isUser ? 'none' : '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{content}</p>

        {isLast && timestamp && (
          <p
            className="text-xs mt-2"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {format(timestamp, 'HH:mm', { locale: zhCN })}
          </p>
        )}
      </div>
    </div>
  );
}
