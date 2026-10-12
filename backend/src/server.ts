import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { aiArray } from './data/aiArray.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);
app.use(express.json());

const createResponse = (response: string, status: string) => ({
  status,
  response,
});

const detectIntent = (message: string) => {
  const lower = message.toLowerCase();

  if (lower.includes('stock') || lower.includes('market')) return 'stock';
  if (lower.includes('science') || lower.includes('research') || lower.includes('study')) return 'research';
  if (lower.includes('song') || lower.includes('music') || lower.includes('tune')) return 'music';
  if (lower.includes('image') || lower.includes('picture')) return 'image';
  return 'general';
};

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'AI Array System',
    version: '1.0.0',
    labs: aiArray.chatbot.labOptions.map((lab) => lab.name),
  });
});

app.get('/api/array', (_req, res) => {
  res.json(aiArray);
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body as { message?: string };

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required.' });
  }

  const intent = detectIntent(message);

  const map: Record<string, string> = {
    general: `I can help you with your AI workflow. Ask me about research, science, stocks, music, or image search.`,
    research: `I can analyze the topic, summarize the most relevant findings, and structure a research brief for you.`,
    stock: `I can help track a country's stock market, monitor trends, and summarize performance and risk signals.`,
    music: `I can help generate song ideas, lyrics concepts, tune direction, and creative prompts for your music lab.`,
    image: `I can support image-based search, visual understanding, and visual intelligence workflows.`,
  };

  return res.json({
    message,
    intent,
    response: map[intent] || map.general,
  });
});

app.post('/api/labs/science/search', (req, res) => {
  const { query } = req.body as { query?: string };

  if (!query) {
    return res.status(400).json({ error: 'A science query is required.' });
  }

  return res.json({
    lab: 'Science Lab',
    query,
    insight: `${query} is a strong scientific topic. The system can break it down into principles, key discoveries, and a simple explanation suitable for further research.`,
    summary: `Overview: ${query}. Key areas include foundational theory, real-world applications, experimental validation, and emerging insights.`,
  });
});

app.post('/api/labs/stock/track', (req, res) => {
  const { country, symbol } = req.body as { country?: string; symbol?: string };

  if (!country && !symbol) {
    return res.status(400).json({ error: 'Provide a country or stock symbol.' });
  }

  return res.json({
    lab: 'Stock Lab',
    country: country || 'Selected market',
    symbol: symbol || 'INDEX',
    trend: 'Bullish momentum with medium volatility',
    summary: `The selected market is being tracked for trend changes, sector movement, and risk signals. This lab can help summarize the market context and monitoring updates.`,
  });
});

app.post('/api/labs/research/summarize', (req, res) => {
  const { text } = req.body as { text?: string };

  if (!text) {
    return res.status(400).json({ error: 'Research text is required.' });
  }

  const cleaned = text.trim();
  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
  const summary = sentences.slice(0, 3).join(' ');

  return res.json({
    lab: 'Research Lab',
    summary,
    keyPoints: [
      'Core concept identified',
      'Main evidence and findings extracted',
      'Actionable conclusion prepared',
    ],
  });
});

app.post('/api/labs/music/create', (req, res) => {
  const { mood, theme } = req.body as { mood?: string; theme?: string };

  if (!mood && !theme) {
    return res.status(400).json({ error: 'Provide a mood or theme for the composition.' });
  }

  return res.json({
    lab: 'Music Lab',
    mood: mood || 'Energetic',
    theme: theme || 'Future dreams',
    prompt: `Create a ${mood || 'energetic'} track with a ${theme || 'future dreams'} theme, featuring a flowing melody, layered harmony, and an uplifting chorus structure.`,
    result: 'AI-assisted composition outline generated successfully.',
  });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.listen(port, () => {
  console.log(`AI Array backend running on http://localhost:${port}`);
});
