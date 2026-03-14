'use client';

import { useRouter } from 'next/navigation';
import { MessageCircle, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WelcomeCardProps {
  userName?: string;
  hasMemory?: boolean;
  lastMood?: {
    score: number;
    note: string;
    date: Date;
  };
}

export function WelcomeCard({ userName = '朋友', hasMemory = true, lastMood }: WelcomeCardProps) {
  const router = useRouter();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '早上好';
    if (hour < 18) return '下午好';
    return '晚上好';
  };

  const getMemoryText = () => {
    if (!hasMemory) return `${getGreeting()}，${userName}。欢迎来到愈见。`;

    if (lastMood) {
      const days = Math.floor((new Date().getTime() - lastMood.date.getTime()) / (1000 * 60 * 60 * 24));
      if (days === 0) return `${getGreeting()}，${userName}。今天已经记录过情绪了呢。`;
      if (days === 1) return `${getGreeting()}，${userName}。昨天你说"${lastMood.note.slice(0, 20)}..."，今天感觉怎么样？`;
      return `${getGreeting()}，${userName}。好久不见，最近过得好吗？`;
    }

    return `${getGreeting()}，${userName}。又见面了。`;
  };

  return (
    <Card
      className="relative overflow-hidden border-0"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {/* 装饰元素 */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-30"
        style={{
          background: 'radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%)',
        }}
      />

      <div className="relative p-8">
        <div className="flex items-start gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'var(--color-primary-subtle)' }}
          >
            <Sparkles className="w-5 h-5" style={{ color: 'var(--color-text-secondary)' }} />
          </div>
          <div>
            <h2
              className="text-2xl mb-2"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text-primary)',
              }}
            >
              {getMemoryText()}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              每天花3-5分钟，和内心聊聊天。
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={() => router.push('/chat')}
            className="flex items-center gap-2 px-6 py-3 h-auto rounded-full font-semibold transition-all hover:scale-[1.02]"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text-primary)',
            }}
          >
            <MessageCircle className="w-5 h-5" />
            开始今日签到
          </Button>

          {lastMood && (
            <Button
              variant="outline"
              onClick={() => router.push('/history')}
              className="px-6 py-3 h-auto rounded-full font-medium"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-secondary)',
              }}
            >
              查看记录
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
