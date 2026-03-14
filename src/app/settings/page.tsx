import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { User, Key, Thermometer, Info, LogOut } from 'lucide-react';

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        {/* 页面标题 */}
        <div>
          <h1
            className="text-2xl font-semibold mb-2"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            设置
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            管理你的账户和 AI 偏好
          </p>
        </div>

        {/* 账户信息 */}
        <section>
          <h2
            className="text-lg font-semibold mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            账户
          </h2>

          <Card
            className="p-6 border-0"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <User className="w-8 h-8" style={{ color: 'var(--color-text-primary)' }} />
              </div>
              <div>
                <p
                  className="font-semibold text-lg"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  朋友
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  user@example.com
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full rounded-full"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              退出登录
            </Button>
          </Card>
        </section>

        {/* AI 配置 */}
        <section>
          <h2
            className="text-lg font-semibold mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            AI 配置
          </h2>

          <Card
            className="p-6 space-y-6 border-0"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* API Key */}
            <div className="space-y-2">
              <Label
                htmlFor="api-key"
                className="flex items-center gap-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <Key className="w-4 h-4" />
                Moonshot API Key
              </Label>
              <Input
                id="api-key"
                type="password"
                placeholder="sk-..."
                defaultValue="sk-xxxxxxx"
                className="rounded-xl"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border)',
                }}
              />
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                你的 API Key 仅存储在本地，不会上传到服务器
              </p>
            </div>

            {/* 温度调节 */}
            <div className="space-y-4">
              <Label
                className="flex items-center gap-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <Thermometer className="w-4 h-4" />
                AI 回复风格
              </Label>
              <Slider
                defaultValue={[0.75]}
                max={1}
                min={0}
                step={0.05}
                className="w-full"
              />
              <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
                <span>更保守</span>
                <span>平衡</span>
                <span>更有创意</span>
              </div>
            </div>

            {/* 模型选择 */}
            <div className="space-y-2">
              <Label style={{ color: 'var(--color-text-primary)' }}>模型</Label>
              <div
                className="p-3 rounded-xl text-sm"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                Kimi K2.5
              </div>
            </div>
          </Card>
        </section>

        {/* 关于 */}
        <section>
          <h2
            className="text-lg font-semibold mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            关于
          </h2>

          <Card
            className="p-6 border-0"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <Info className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} />
              </div>
              <div>
                <p
                  className="font-semibold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  愈见
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  版本 1.0.0
                </p>
              </div>
            </div>

            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              愈见是一款 AI 疗愈助手，帮助大学生疏导焦虑、缓解空虚。
              通过每日情绪签到和微行动，让每个人都能被倾听、被记住、在变好。
            </p>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
