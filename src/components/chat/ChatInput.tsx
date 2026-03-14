'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend?: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
  placeholder = '想说点什么...'
}: ChatInputProps) {
  const [internalValue, setInternalValue] = useState('');

  // 受控或非受控模式
  const inputValue = value !== undefined ? value : internalValue;
  const setInputValue = onChange
    ? (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e)
    : (e: React.ChangeEvent<HTMLTextAreaElement>) => setInternalValue(e.target.value);

  const handleSend = () => {
    if (!inputValue.trim() || disabled) return;
    onSend?.(inputValue.trim());
    if (value === undefined) {
      setInternalValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="flex items-end gap-2 p-4 rounded-2xl"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
      }}
    >
      <textarea
        value={inputValue}
        onChange={setInputValue}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none bg-transparent outline-none text-[15px] max-h-32"
        style={{
          color: 'var(--color-text-primary)',
        }}
      />
      <Button
        onClick={handleSend}
        disabled={disabled || !inputValue.trim()}
        size="icon"
        className="rounded-full w-10 h-10 flex-shrink-0 transition-all"
        style={{
          backgroundColor: disabled || !inputValue.trim() ? 'var(--color-border)' : 'var(--color-primary)',
          color: 'var(--color-text-primary)',
        }}
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
}
