# 愈见 - AI疗愈助手

一款帮20岁大学生疏导焦虑、缓解空虚的AI疗愈助手。

## 技术栈

- Next.js 15 + React + TypeScript
- Tailwind CSS + shadcn/ui
- Zustand 状态管理
- Kimi 2.5 (Moonshot) AI
- Prisma + PostgreSQL

## 快速开始

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入实际的 API Key

# 启动开发服务器
npm run dev
```

## 环境变量

复制 `.env.example` 为 `.env.local`，并填入：

- `MOONSHOT_API_KEY` - 从 https://platform.moonshot.cn 获取
- `NEXT_PUBLIC_CLERK_*` - 从 https://dashboard.clerk.com 获取（第3步）
- `DATABASE_URL` / `DIRECT_URL` - Supabase 数据库 URL（第4步）

## 开发计划

- [x] 第1步：项目初始化
- [ ] 第2步：纯静态界面
- [ ] 第3步：接入核心功能
- [ ] 第4步：数据持久化
