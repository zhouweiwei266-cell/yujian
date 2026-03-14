import { AppShell } from '@/components/layout/AppShell';
import { MoodDots } from '@/components/mood/MoodDots';
import { Calendar, Clock, MessageSquare } from 'lucide-react';

// Mock 数据
const mockRecentMoods = [
  { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), score: 3, hasEntry: true },
  { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), score: 2, hasEntry: true },
  { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), score: 4, hasEntry: true },
  { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), score: 3, hasEntry: true },
  { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), score: 5, hasEntry: true },
  { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), score: 4, hasEntry: true },
  { date: new Date(), score: 0, hasEntry: false },
];

const mockHistoryEntries = [
  {
    id: '1',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    score: 4,
    note: '昨天面试准备得还不错',
    summary: '对即将到来的面试感到既期待又紧张，整体情绪较积极',
    hasTask: true,
    taskCompleted: true,
  },
  {
    id: '2',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    score: 5,
    note: '和朋友聚餐很开心',
    summary: '今天和朋友聚餐，聊了很多心里话，感觉很放松',
    hasTask: false,
    taskCompleted: false,
  },
  {
    id: '3',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    score: 3,
    note: '有点累，但完成了任务',
    summary: '今天工作比较忙，有点疲惫，但还是坚持完成了计划',
    hasTask: true,
    taskCompleted: true,
  },
];

const moodLabels = ['', '很糟', '不太好', '一般', '不错', '很好'];
const moodColors = ['', '#E8DFD5', '#D4C5B5', '#C9B8A7', '#9CAFBE', '#7A93A4'];

export default function HistoryPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        {/* 页面标题 */}
        <div>
          <h1
            className="text-2xl font-semibold mb-2"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            情绪记录
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            回顾过去的心情轨迹，看见自己的成长
          </p>
        </div>

        {/* 情绪小点图 */}
        <section>
          <MoodDots moods={mockRecentMoods} />
        </section>

        {/* 历史记录列表 */}
        <section>
          <h2
            className="text-lg font-semibold mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            近期记录
          </h2>

          <div className="space-y-4">
            {mockHistoryEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-5 rounded-2xl transition-all hover:shadow-md cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* 头部信息 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: moodColors[entry.score] }}
                    >
                      <span className="text-sm font-semibold text-white">
                        {entry.score}
                      </span>
                    </div>
                    <div>
                      <p
                        className="font-medium"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {moodLabels[entry.score]}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        {entry.date.toLocaleDateString('zh-CN', {
                          month: 'long',
                          day: 'numeric',
                          weekday: 'short',
                        })}
                      </p>
                    </div>
                  </div>

                  {entry.hasTask && (
                    <div
                      className="flex items-center gap-1 px-3 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: entry.taskCompleted
                          ? 'rgba(168, 181, 160, 0.2)'
                          : 'var(--color-bg-tertiary)',
                        color: entry.taskCompleted
                          ? 'var(--color-success)'
                          : 'var(--color-text-muted)',
                      }}
                    >
                      {entry.taskCompleted ? '✓ 完成微行动' : '待完成'}
                    </div>
                  )}
                </div>

                {/* 内容摘要 */}
                <p
                  className="text-sm mb-2 line-clamp-2"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  "{entry.note}"
                </p>

                {/* 底部信息 */}
                <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{entry.date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    <span>查看对话</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
