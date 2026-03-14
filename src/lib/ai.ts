// AI 配置与调用封装
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// 从环境变量读取配置
const MOONSHOT_API_KEY = process.env.MOONSHOT_API_KEY || '';
const MOONSHOT_BASE_URL = process.env.MOONSHOT_BASE_URL || 'https://api.moonshot.cn/v1';
const MOONSHOT_MODEL = process.env.MOONSHOT_MODEL || 'kimi-k2.5';

// 创建 Moonshot 客户端（兼容 OpenAI 格式）
export const moonshot = createOpenAI({
  apiKey: MOONSHOT_API_KEY,
  baseURL: MOONSHOT_BASE_URL,
});

// 默认 AI 配置
export const defaultAIConfig = {
  provider: 'moonshot' as const,
  model: MOONSHOT_MODEL,
  baseUrl: MOONSHOT_BASE_URL,
  maxTokens: 4096,
  temperature: 0.75,
};

// 系统 Prompt 模板
export function generateSystemPrompt(memoryContext: string, userName: string): string {
  return `你是"愈见"，一位温暖、专业的AI疗愈助手，陪伴20岁左右的大学生疏导情绪、缓解焦虑。

【你的角色】
- 你不是医生，不是心理咨询师，而是一个理解用户的陪伴者
- 你的语气应该是温柔的、有耐心的，但不失边界感
- 你不会评判用户的情绪，而是接纳和引导

【记忆信息】
${memoryContext}

【当前对话信息】
- 用户姓名：${userName}
- 今天日期：${new Date().toLocaleDateString('zh-CN')}

【你的任务】
1. 引导用户完成3-5分钟的情绪签到，帮助他们表达当下的情绪
2. 在对话中自然地确认用户的情绪状态（1-5分）
3. 根据情绪状态，适时推荐一个"微行动"（5-15分钟可完成的小任务）
4. 如果用户完成了微行动，给予肯定和鼓励

【对话原则】
- 每次回应控制在100字以内，保持对话流畅
- 多用开放式问题引导用户表达
- 不要一次性问太多问题
- 当用户情绪低于3分时，给予更多支持和理解
- 当用户完成微行动后，真诚地肯定他们的努力

【微行动类型参考】
- 呼吸练习：5分钟深呼吸
- 身体活动：起身走动、伸展
- 书写：写下3件感恩的事
- 观察：看看窗外的景色，描述给你听
- 小确幸：喝一杯温水、整理桌面

【重要】
- 不要给出医学建议
- 如果用户表达自伤念头，温柔地建议他们寻求专业帮助
- 保持对话的自然感，不要像机器人一样列清单`;
}

// 流式对话函数
export async function streamChat(messages: any[], userName: string, memoryContext: string = '') {
  const systemPrompt = generateSystemPrompt(memoryContext, userName);

  const result = streamText({
    model: moonshot(MOONSHOT_MODEL),
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
    maxTokens: defaultAIConfig.maxTokens,
    temperature: defaultAIConfig.temperature,
  });

  return result;
}

// 生成微行动 Prompt
export function generateTaskPrompt(moodScore: number, userMessage: string, conversationSummary: string): string {
  return `基于用户的情绪状态，推荐一个合适的"微行动"。

用户当前状态：
- 情绪分数：${moodScore}/5
- 用户表达的内容：${userMessage}
- 今天的对话上下文：${conversationSummary}

微行动要求：
- 能在5-15分钟内完成
- 适合当前情绪状态
- 具体、可操作
- 不给用户压力

请直接返回以下内容格式：
标题：行动标题（10字以内）
描述：行动描述（30字以内）
预计时间：如 5分钟
类型：breathing/walking/writing/observing/other`;
}

// 情绪分析 Prompt
export function generateMoodAnalysisPrompt(conversationHistory: string): string {
  return `分析以下对话，提取用户的情绪状态。

对话记录：
${conversationHistory}

要求：
- 给出1-5的情绪分数（1=很糟，5=很好）
- 提取一句用户表达的核心内容（用户原话）
- 判断是否有需要关注的情绪信号

请返回以下内容格式：
情绪分数：数字
核心内容：用户原话摘要
关键词：关键词1,关键词2
需要关注：是/否
总结：简短总结用户今天的情绪状态`;
}
