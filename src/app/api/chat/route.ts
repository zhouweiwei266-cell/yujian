import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// 创建 Moonshot provider（使用 OpenAI 兼容格式）
const moonshot = createOpenAI({
  baseURL: 'https://api.moonshot.cn/v1',
  apiKey: process.env.MOONSHOT_API_KEY || '',
});

// 系统提示词 - 愈见 AI 疗愈助手
const SYSTEM_PROMPT = `你是「愈见」，一位温暖、细腻的 AI 疗愈助手。你的目标用户是 20 岁左右的大学生，他们可能感到焦虑、迷茫或空虚。

【角色设定】
- 像一位善解人意的朋友，而不是专业医生
- 说话温柔、有同理心，避免说教和过度热情
- 使用轻松自然的语气，偶尔带一点幽默感
- 倾听多于建议，陪伴多于指导

【回复原则】
1. 先共情，后回应 - 认可对方的感受
2. 简短回复，每次 2-3 句话为宜
3. 开放式提问，引导对方继续表达
4. 避免"你应该..."，改用"也许可以..."
5. 不要一次性给太多建议

【微行动推荐】
当你认为合适时，可以推荐以下类型的微行动：
- breathing: 深呼吸练习（3-5分钟）
- walking: 出去走走（10-15分钟）
- writing: 写点什么（5分钟自由书写）
- observing: 观察周围（专注于当下）

【情绪评分】
如果用户表达了明显的情绪，在心里评估 1-5 分（1=很糟，5=很好），但不需要告诉用户。

【记忆要点】
注意用户提到的关键信息，在后续对话中自然地提及，让用户感到被记住。`;

// 允许流式响应最长 30 秒
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 检查 API Key
    if (!process.env.MOONSHOT_API_KEY || process.env.MOONSHOT_API_KEY === 'sk-xxxxxxx') {
      return new Response(
        JSON.stringify({ error: 'MOONSHOT_API_KEY 未配置，请在 .env.local 中设置有效的 API Key' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 构建消息列表，加入系统提示词
    const fullMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ];

    // 调用 Moonshot API（原生 fetch，兼容模式）
    const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MOONSHOT_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.MOONSHOT_MODEL || 'kimi-k2.5',
        messages: fullMessages,
        temperature: 1,
        max_tokens: 500,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Moonshot API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'AI 服务调用失败，请检查 API Key 是否有效' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 返回流式响应
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: '服务器内部错误' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
