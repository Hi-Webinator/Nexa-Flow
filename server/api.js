// server/api.js — NexaFlow AI API
// Uses any OpenAI-compatible chat provider. Defaults to Groq's free tier;
// works with OpenRouter, Google Gemini (OpenAI endpoint), Together, etc.
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
const LLM_BASE_URL = (
  process.env.LLM_BASE_URL || 'https://api.groq.com/openai/v1'
).replace(/\/$/, '');
const LLM_MODEL = process.env.LLM_MODEL || 'llama-3.3-70b-versatile';
const LLM_API_KEY = process.env.LLM_API_KEY || '';
const MAX_MESSAGE_LENGTH = 4000;
const MAX_HISTORY_MESSAGES = 20;
const LLM_TIMEOUT_MS = 30_000;
const IS_PROD = process.env.NODE_ENV === 'production';

const app = express();

// Trust exactly one proxy hop (the host's load balancer) so req.ip is the real
// client. Without this the rate limiter below keys every visitor on the proxy's
// IP and collapses into a single shared bucket; trusting *all* hops instead
// would let clients spoof X-Forwarded-For and bypass it entirely.
app.set('trust proxy', 1);

// ── Middleware
app.use(helmet());

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
  })
);
app.use(express.json({ limit: '100kb' }));

// Simple in-memory rate limiter (per IP, sliding window)
const RATE_LIMIT = { windowMs: 60_000, max: 20 };
const hits = new Map();
app.use('/api/', (req, res, next) => {
  const now = Date.now();
  const key = req.ip;
  const recent = (hits.get(key) || []).filter(
    (t) => now - t < RATE_LIMIT.windowMs
  );
  if (recent.length >= RATE_LIMIT.max) {
    return res
      .status(429)
      .json({ error: 'Too many requests. Please slow down and try again.' });
  }
  recent.push(now);
  hits.set(key, recent);
  next();
});
// Prevent the hits map from growing without bound
setInterval(() => {
  const now = Date.now();
  for (const [key, times] of hits) {
    const recent = times.filter((t) => now - t < RATE_LIMIT.windowMs);
    if (recent.length === 0) hits.delete(key);
    else hits.set(key, recent);
  }
}, RATE_LIMIT.windowMs).unref();

// ── System prompt for the assistant
const SYSTEM_PROMPT = `You are NexaFlow AI Assistant, a helpful and professional assistant for a modern SaaS workspace platform. You help users with:

1. Task Management - Create, organize, and prioritize tasks
2. Content Creation - Draft emails, proposals, documentation
3. Data Analysis - Analyze metrics and provide insights
4. General Assistance - Answer questions about productivity and workflows

Guidelines:
- Be concise but helpful
- Use professional tone
- Provide actionable suggestions
- If you don't know something, say so honestly
- Suggest alternatives when appropriate
- Format responses clearly with bullet points or numbering when relevant
- Acknowledge the context of NexaFlow platform when relevant

Current context: User is working in NexaFlow workspace management platform.`;

// ── LLM client (OpenAI-compatible chat completions)
async function llmRequest(messages, { stream = false, maxTokens = 1024 } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (LLM_API_KEY) headers.Authorization = `Bearer ${LLM_API_KEY}`;

  const response = await fetch(`${LLM_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers,
    // Without this a stalled provider pins the request slot indefinitely.
    signal: AbortSignal.timeout(LLM_TIMEOUT_MS),
    body: JSON.stringify({
      model: LLM_MODEL,
      max_tokens: maxTokens,
      stream,
      messages,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`LLM request failed (${response.status}): ${detail}`);
  }
  return response;
}

// Strip markdown code fences if the model wraps JSON in them
function parseJsonLoose(text) {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/, '');
  return JSON.parse(cleaned);
}

// ── Request validation
function buildMessages(body) {
  const { message, conversationHistory } = body || {};

  if (typeof message !== 'string' || !message.trim()) {
    return { error: 'Message is required.' };
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return {
      error: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).`,
    };
  }

  const history = Array.isArray(conversationHistory)
    ? conversationHistory
        .filter(
          (m) =>
            m &&
            (m.role === 'user' || m.role === 'assistant') &&
            typeof m.content === 'string' &&
            m.content.trim()
        )
        .slice(-MAX_HISTORY_MESSAGES)
        .map((m) => ({
          role: m.role,
          content: m.content.slice(0, MAX_MESSAGE_LENGTH),
        }))
    : [];

  return {
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: message },
    ],
  };
}

// ── Chat endpoint (non-streaming)
app.post('/api/chat', async (req, res) => {
  const { error, messages } = buildMessages(req.body);
  if (error) return res.status(400).json({ error });

  try {
    const response = await llmRequest(messages);
    const data = await response.json();

    res.json({
      success: true,
      reply: data.choices?.[0]?.message?.content ?? '',
      usage: {
        input_tokens: data.usage?.prompt_tokens ?? 0,
        output_tokens: data.usage?.completion_tokens ?? 0,
      },
    });
  } catch (err) {
    console.error('Chat API error:', err);
    res.status(502).json({
      error: 'The AI service is temporarily unavailable. Please try again.',
    });
  }
});

// ── Streaming chat endpoint (Server-Sent Events)
app.post('/api/chat-stream', async (req, res) => {
  const { error, messages } = buildMessages(req.body);
  if (error) return res.status(400).json({ error });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const response = await llmRequest(messages, { stream: true });

    // Re-emit the provider's OpenAI-style SSE stream as our simple
    // `data: {"text": "..."}` format the client already understands.
    const decoder = new TextDecoder();
    let buffer = '';

    for await (const chunk of response.body) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data: ')) continue;
        const data = trimmed.slice(6);
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          const text = parsed.choices?.[0]?.delta?.content;
          if (text) {
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
          }
        } catch {
          // Ignore malformed keep-alive/partial lines
        }
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('Streaming chat error:', err);
    res.write(
      `data: ${JSON.stringify({
        error: 'The AI service is temporarily unavailable. Please try again.',
      })}\n\n`
    );
    res.end();
  }
});

// ── Generate tasks endpoint
app.post('/api/generate-tasks', async (req, res) => {
  const { projectDescription } = req.body || {};

  if (
    typeof projectDescription !== 'string' ||
    !projectDescription.trim() ||
    projectDescription.length > MAX_MESSAGE_LENGTH
  ) {
    return res.status(400).json({ error: 'Project description is required.' });
  }

  try {
    const response = await llmRequest([
      {
        role: 'user',
        content: `You are a project manager. Break down this project into 5-8 actionable tasks.

Project: ${projectDescription}

Respond with ONLY a JSON object (no markdown, no extra text) in this exact shape:
{"tasks": [{"id": 1, "title": "...", "description": "...", "priority": "high|medium|low", "estimatedHours": 4}]}`,
      },
    ]);
    const data = await response.json();
    const { tasks } = parseJsonLoose(data.choices?.[0]?.message?.content ?? '');

    res.json({ success: true, tasks });
  } catch (err) {
    console.error('Task generation error:', err);
    res.status(502).json({ error: 'Failed to generate tasks.' });
  }
});

// ── Generate content endpoint
app.post('/api/generate-content', async (req, res) => {
  const { type, topic, tone, additionalContext } = req.body || {};

  if (
    typeof type !== 'string' ||
    typeof topic !== 'string' ||
    !topic.trim() ||
    topic.length > MAX_MESSAGE_LENGTH
  ) {
    return res.status(400).json({ error: 'Type and topic are required.' });
  }

  const safeTone =
    typeof tone === 'string' ? tone.slice(0, 100) : 'professional';
  const safeContext =
    typeof additionalContext === 'string'
      ? additionalContext.slice(0, 1000)
      : '';

  const prompts = {
    email: `Draft a professional email about: ${topic}. Tone: ${safeTone}. Context: ${safeContext || 'general workplace'}`,
    proposal: `Create a brief proposal for: ${topic}. Tone: ${safeTone}. Context: ${safeContext || 'business'}`,
    summary: `Summarize the key points of: ${topic}. Make it concise and actionable.`,
    report: `Create a brief report about: ${topic}. Include key findings and recommendations.`,
    brainstorm: `Brainstorm ideas for: ${topic}. Provide 5-7 creative suggestions.`,
  };

  const prompt = prompts[type] || prompts.email;

  try {
    const response = await llmRequest([{ role: 'user', content: prompt }]);
    const data = await response.json();

    res.json({
      success: true,
      content: data.choices?.[0]?.message?.content ?? '',
      type,
      metadata: {
        topic,
        tone: safeTone,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('Content generation error:', err);
    res.status(502).json({ error: 'Failed to generate content.' });
  }
});

// ── Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'NexaFlow AI API' });
});

// ── Error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'Internal server error',
    message: IS_PROD ? undefined : err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 NexaFlow AI API running on port ${PORT}`);
  console.log(`🤖 Provider: ${LLM_BASE_URL}`);
  console.log(`🧠 Model: ${LLM_MODEL}`);
  console.log(`📡 API key configured: ${LLM_API_KEY ? '✅' : '❌'}`);
});
