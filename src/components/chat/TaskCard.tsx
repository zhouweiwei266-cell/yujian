'use client';

import { useState } from 'react';
import { Check, X, Clock, Wind, Footprints, Pen, Eye, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  status: 'idle' | 'pending' | 'doing' | 'completed';
  onAccept: () => void;
  onSkip: () => void;
  onComplete: (feedback?: string) => void;
}

const taskIcons = {
  breathing: Wind,
  walking: Footprints,
  writing: Pen,
  observing: Eye,
  other: Sparkles,
};

const taskColors = {
  breathing: '#9CAFBE',
  walking: '#A8B5A0',
  writing: '#D4C5B5',
  observing: '#B8A99A',
  other: '#C9B8A7',
};

export function TaskCard({ task, status, onAccept, onSkip, onComplete }: TaskCardProps) {
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const Icon = taskIcons[task.type];
  const color = taskColors[task.type];

  const handleComplete = () => {
    onComplete(feedback);
    setFeedback('');
    setShowFeedback(false);
  };

  if (status === 'completed') {
    return (
      <Card
        className="p-5 max-w-[80%]"
        style={{
          backgroundColor: 'var(--color-mood-bg)',
          border: '1px solid var(--color-mood-secondary)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-success)' }}
          >
            <Check className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
              已完成：{task.title}
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              真棒！为自己的小小进步鼓个掌 👏
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (showFeedback) {
    return (
      <Card
        className="p-5 max-w-[80%] w-full"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <p className="mb-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          完成感受如何？（可选）
        </p>
        <Textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="做完这个任务，我感觉..."
          className="mb-3 min-h-[80px]"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            borderColor: 'var(--color-border)',
          }}
        />
        <div className="flex gap-2">
          <Button
            onClick={handleComplete}
            className="flex-1 rounded-full"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text-primary)',
            }}
          >
            提交反馈
          </Button>
          <Button
            variant="outline"
            onClick={() => onComplete()}
            className="rounded-full"
            style={{ borderColor: 'var(--color-border)' }}
          >
            跳过
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="p-5 max-w-[85%] w-full"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        border: `2px solid ${color}`,
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>

        <div className="flex-1">
          <h4
            className="font-semibold text-lg mb-1"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            {task.title}
          </h4>
          <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
            {task.description}
          </p>

          <div
            className="flex items-center gap-1 text-xs mb-4"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <Clock className="w-3 h-3" />
            <span>预计 {task.estimatedTime}</span>
          </div>

          {status === 'doing' ? (
            <Button
              onClick={() => setShowFeedback(true)}
              className="w-full rounded-full"
              style={{
                backgroundColor: color,
                color: 'white',
              }}
            >
              <Check className="w-4 h-4 mr-2" />
              我完成了
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={onAccept}
                className="flex-1 rounded-full"
                style={{
                  backgroundColor: color,
                  color: 'white',
                }}
              >
                现在就做
              </Button>
              <Button
                variant="outline"
                onClick={onSkip}
                className="rounded-full px-4"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
