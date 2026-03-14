'use client';

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div
        className="px-5 py-4 flex items-center gap-1"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
          borderRadius: '20px 20px 20px 8px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse-soft"
          style={{
            backgroundColor: 'var(--color-text-muted)',
            animationDelay: '0ms',
          }}
        />
        <span
          className="w-2 h-2 rounded-full animate-pulse-soft"
          style={{
            backgroundColor: 'var(--color-text-muted)',
            animationDelay: '200ms',
          }}
        />
        <span
          className="w-2 h-2 rounded-full animate-pulse-soft"
          style={{
            backgroundColor: 'var(--color-text-muted)',
            animationDelay: '400ms',
          }}
        />
      </div>
    </div>
  );
}
