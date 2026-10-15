import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { aiArray } from './data/aiArray.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
const jwtSecret = process.env.JWT_SECRET || 'damru-ai-secret';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersPath = path.join(__dirname, 'data', 'users.json');

const ensureUsersFile = () => {
  if (!fs.existsSync(usersPath)) {
    fs.writeFileSync(usersPath, '[]', 'utf8');
  }
};

type UserRecord = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

type AuthenticatedRequest = express.Request & {
  user?: {
    id: string;
    email: string;
    name: string;
  };
};

const readUsers = (): UserRecord[] => {
  ensureUsersFile();
  const raw = fs.readFileSync(usersPath, 'utf8');
  if (!raw.trim()) return [];
  try {
    return JSON.parse(raw) as UserRecord[];
  } catch {
    return [];
  }
};

const writeUsers = (users: UserRecord[]) => {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf8');
};

const signToken = (user: Pick<UserRecord, 'id' | 'email' | 'name'>) =>
  jwt.sign({ id: user.id, email: user.email, name: user.name }, jwtSecret, {
    expiresIn: '7d',
  });

const authMiddleware = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, jwtSecret) as {
      id: string;
      email: string;
      name: string;
    };
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

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
    version: '1.1.0',
    labs: aiArray.chatbot.labOptions.map((lab) => lab.name),
  });
});

app.get('/api/array', (_req, res) => {
  res.json(aiArray);
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Invalid registration payload.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const existing = users.find((user) => user.email === normalizedEmail);

  if (existing) {
    return res.status(409).json({ error: 'User already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: UserRecord = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  const token = signToken({ id: newUser.id, email: newUser.email, name: newUser.name });

  return res.status(201).json({
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((entry) => entry.email === normalizedEmail);

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = signToken({ id: user.id, email: user.email, name: user.name });

  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

app.get('/api/auth/me', authMiddleware, (req: AuthenticatedRequest, res) => {
  const users = readUsers();
  const user = users.find((entry) => entry.id === req.user?.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
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

app.listen(port, "0.0.0.0", () => {
  console.log(`AI Array backend running on port ${port}`);
});

export { app, createResponse };
