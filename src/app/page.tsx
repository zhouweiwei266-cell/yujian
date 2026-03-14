import { WelcomeCard } from '@/components/home/WelcomeCard';
import { MoodDots } from '@/components/mood/MoodDots';
import { AppShell } from '@/components/layout/AppShell';

// Mock 数据
const mockRecentMoods = [
  { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), score: 3, hasEntry: true },
  { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), score: 2, hasEntry: true },
  { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), score: 4, hasEntry: true },
  { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), score: 3, hasEntry: true },
  { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), score: 5, hasEntry: true },
  { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), score: 4, hasEntry: true },
  { date: new Date(), score: 0, hasEntry: false }, // 今天还未记录
];

const mockLastMood = {
  score: 4,
  note: '昨天面试准备得还不错',
  date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
};

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-8">
        {/* 欢迎卡片 */}
        <WelcomeCard
          userName="朋友"
          hasMemory={true}
          lastMood={mockLastMood}
        />

        {/* 情绪小点图 */}
        <section>
          <MoodDots moods={mockRecentMoods} />
        </section>

        {/* 快捷功能 */}
        <section
          className="p-6 rounded-2xl"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <h3
            className="text-lg font-semibold mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
            }}
          >
            今日建议
          </h3>
          <div className="space-y-3">
            <div
              className="p-4 rounded-xl flex items-center gap-3"
              style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-primary-light)' }}
              >
                <span className="text-lg">🌅</span>
              </div>
              <div>
                <p
                  className="font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  晨间深呼吸
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  醒来后的5分钟，给大脑一个温柔的启动
                </p>
              </div>
            </div>

            <div
              className="p-4 rounded-xl flex items-center gap-3"
              style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-mood-secondary)' }}
              >
                <span className="text-lg">📝</span>
              </div>
              <div>
                <p
                  className="font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  三件小事
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  写下今天让你感恩或开心的小事
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
