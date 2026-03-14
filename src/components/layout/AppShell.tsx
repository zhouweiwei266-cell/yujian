'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, MessageCircle, History, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: ReactNode;
}

const navItems = [
  { href: '/', label: '首页', icon: Heart },
  { href: '/chat', label: '对话', icon: MessageCircle },
  { href: '/history', label: '记录', icon: History },
  { href: '/settings', label: '设置', icon: Settings },
];

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 backdrop-blur-sm" style={{ backgroundColor: 'rgba(250, 247, 242, 0.8)' }}>
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <Heart className="w-4 h-4" style={{ color: 'var(--color-text-primary)' }} />
            </div>
            <span
              className="text-xl font-semibold"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text-primary)'
              }}
            >
              愈见
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "p-2 rounded-full transition-all duration-200",
                    isActive && "font-medium"
                  )}
                  style={{
                    backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                    color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                  }}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* 主内容 */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-6 py-8">
        {children}
      </main>

      {/* 底部留白 */}
      <div className="h-8" />
    </div>
  );
}
