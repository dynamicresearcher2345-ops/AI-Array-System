import { useMemo, useEffect, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

type User = {
  id: string;
  name: string;
  email: string;
};

type Lab = {
  name: string;
  description: string;
  features: string[];
};

type ArrayData = {
  name: string;
  type: string;
  description: string;
  coreFeatures: string[];
  chatbot: {
    voiceFeature: boolean;
    imageSearch: boolean;
    deepResearch: boolean;
    labOptions: Lab[];
  };
};

type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
};

const getStoredToken = () => localStorage.getItem('damru-token') || '';

const getStoredUser = (): User | null => {
  try {
    const data = localStorage.getItem('damru-user');
    return data ? (JSON.parse(data) as User) : null;
  } catch {
    return null;
  }
};

const authHeaders = (token?: string) => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const activeToken = token || getStoredToken();
  if (activeToken) {
    headers.Authorization = `Bearer ${activeToken}`;
  }
  return headers;
};

const apiFetch = async (path: string, options: RequestInit = {}, token?: string) => {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...authHeaders(token),
      ...(options.headers || {}),
    },
  });

  const contentType = response.headers.get('content-type');
  const payload = contentType && contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    throw new Error((payload && payload.error) || 'Request failed.');
  }

  return payload;
};

function LogoMark() {
  return (
    <div className="logo-wrap" aria-label="Damru AI Array logo">
      <img src="/assets/damru-logo.svg" alt="Damru logo" className="brand-logo" />
      <div className="brand-copy">
        <span className="brand-name">Damru</span>
        <small>AI Array</small>
      </div>
    </div>
  );
}

function HeaderBar({ user, onLogout }: { user: User | null; onLogout: () => void }) {
  return (
    <header className="topbar">
      <Link to="/" className="brand-link">
        <LogoMark />
      </Link>

      <nav className="nav-bar">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button type="button" className="ghost-button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signin">Sign in</Link>
            <Link to="/signup" className="primary-button small-button">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

function IntroVideo() {
  return (
    <div className="video-shell" aria-label="Damru introduction preview">
      <div className="video-surface">
        <div className="video-overlay" />
        <div className="video-topline">Introductory Presentation</div>
        <button type="button" className="play-button" aria-label="Play intro video">
          <span>▶</span>
        </button>
        <div className="video-meta">
          <span>Damru AI Systems</span>
          <strong>Unified intelligence • research • automation</strong>
        </div>
      </div>
    </div>
  );
}

function LandingPage({ user }: { user: User | null }) {
  const stats = [
    { label: 'AI Labs', value: '4' },
    { label: 'Voice Ready', value: 'Live' },
    { label: 'Research Mode', value: 'Active' },
    { label: 'System Core', value: 'Damru' },
  ];

  return (
    <main className="content-shell">
      <section className="hero-panel panel">
        <div className="hero-copy">
          <p className="eyebrow accent">MULTI-AGENT INTELLIGENCE</p>
          <h1>Damru AI Array</h1>
          <p className="lead-text">
            A premium AI operating environment for research, automation, music, stock insights,
            and smart business workflows — all connected through a single Damru-powered platform.
          </p>

          <div className="cta-row">
            {user ? (
              <Link to="/dashboard" className="primary-button">
                Open dashboard
              </Link>
            ) : (
              <>
                <Link to="/signup" className="primary-button">
                  Create account
                </Link>
                <Link to="/signin" className="secondary-button">
                  Sign in
                </Link>
              </>
            )}
          </div>

          <div className="stats-grid">
            {stats.map((item) => (
              <div key={item.label} className="stat-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-video">
          <IntroVideo />
        </div>
      </section>

      <section className="panel feature-panel">
        <div className="section-heading">
          <p className="eyebrow accent">SYSTEM CAPABILITIES</p>
          <h2>Unified AI for every digital workflow</h2>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <h3>Voice AI</h3>
            <p>Natural, conversational interactions with smart command and response orchestration.</p>
          </article>
          <article className="feature-card">
            <h3>Research Engine</h3>
            <p>Gather context, summarize findings, and build structured briefs for deeper insight.</p>
          </article>
          <article className="feature-card">
            <h3>Science & Stock Labs</h3>
            <p>Track technical, economic, and market signals across multiple specialized environments.</p>
          </article>
          <article className="feature-card">
            <h3>Creative Studio</h3>
            <p>Create musical direction, ideation prompts, and image-aware flows in a single platform.</p>
          </article>
        </div>
      </section>
    </main>
  );
}

function AuthPage({
  mode,
  onAuthSuccess,
}: {
  mode: 'login' | 'register';
  onAuthSuccess: (user: User, token: string) => void;
}) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const title = mode === 'login' ? 'Welcome back' : 'Create your Damru account';
  const subtitle =
    mode === 'login'
      ? 'Sign in to continue to your AI workspace.'
      : 'Set up your account to unlock the Damru AI Array system.';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const response = await apiFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(
          mode === 'login'
            ? { email: form.email, password: form.password }
            : { name: form.name, email: form.email, password: form.password }
        ),
      });

      const { token, user } = response;
      localStorage.setItem('damru-token', token);
      localStorage.setItem('damru-user', JSON.stringify(user));
      onAuthSuccess(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell">
      <div className="auth-panel panel">
        <div className="auth-header">
          <LogoMark />
        </div>

        <h2>{title}</h2>
        <p>{subtitle}</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label>
              Full name
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Your name"
                required
              />
            </label>
          )}

          <label>
            Email address
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="name@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              placeholder="••••••••"
              required
            />
          </label>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="auth-switch">
          {mode === 'login' ? 'Need an account?' : 'Already have an account?'}{' '}
          <Link to={mode === 'login' ? '/signup' : '/signin'}>
            {mode === 'login' ? 'Create one' : 'Sign in'}
          </Link>
        </div>
      </div>
    </main>
  );
}

function DashboardPage({ user }: { user: User | null }) {
  const [data, setData] = useState<ArrayData | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState('Loading AI array data...');

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await apiFetch('/api/array');
        setData(response);
        setStatus('AI Array connected and ready.');
      } catch (error) {
        setStatus(`Connection issue: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    loadData();
  }, []);

  const summaryStats = useMemo(
    () => [
      { label: 'Voice active', value: data?.chatbot.voiceFeature ? 'Yes' : 'No' },
      { label: 'Image search', value: data?.chatbot.imageSearch ? 'Enabled' : 'Disabled' },
      { label: 'Deep research', value: data?.chatbot.deepResearch ? 'On' : 'Off' },
      { label: 'Labs', value: data?.chatbot.labOptions.length?.toString() || '0' },
    ],
    [data]
  );

  const handleSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');

    try {
      const result = await apiFetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: userMessage }),
      });

      setMessages((prev) => [...prev, { role: 'assistant', text: result.response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `System error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ]);
    }
  };

  const handleVoice = () => {
    if (!('speechSynthesis' in window)) {
      setStatus('Voice support is not available in this browser.');
      return;
    }

    const lastAssistant = [...messages].reverse().find((message) => message.role === 'assistant');
    const text = lastAssistant?.text || 'AI Array ready for voice interaction.';
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setStatus('Voice playback started.');
  };

  if (!data) {
    return <div className="app-shell"><div className="loader">{status}</div></div>;
  }

  return (
    <main className="content-shell dashboard-shell">
      <section className="panel hero-panel">
        <div>
          <p className="eyebrow accent">WELCOME BACK</p>
          <h1>{user?.name || 'Damru User'}</h1>
        </div>

        <button className="primary-button" onClick={handleVoice} type="button">
          Voice assistant
        </button>
      </section>

      <section className="panel">
        <div className="section-heading">
          <h2>{data.name}</h2>
        </div>

        <div className="stats-grid">
          {summaryStats.map((item) => (
            <div key={item.label} className="stat-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="panel feature-panel">
        <div className="section-heading">
          <h3>Core features</h3>
        </div>

        <div className="pill-list">
          {data.coreFeatures.map((feature) => (
            <span key={feature} className="pill">
              {feature}
            </span>
          ))}
        </div>
      </section>

      <section className="panel labs-panel">
        <div className="section-heading">
          <h3>Laboratory modules</h3>
        </div>

        <div className="lab-grid">
          {data.chatbot.labOptions.map((lab) => (
            <article key={lab.name} className="lab-card">
              <h4>{lab.name}</h4>
              <p>{lab.description}</p>
              <ul>
                {lab.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="panel chat-panel">
        <div className="section-heading">
          <h3>AI chatbot</h3>
        </div>

        <div className="chat-window">
          {messages.length === 0 ? (
            <p className="empty-chat">Ask about science, markets, research, or music.</p>
          ) : (
            messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`chat-bubble ${message.role}`}>
                {message.text}
              </div>
            ))
          )}
        </div>

        <div className="chat-input-row">
          <input
            value={chatInput}
            onChange={(event) => setChatInput(event.target.value)}
            placeholder="Type your question..."
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleSend();
            }}
          />
          <button className="primary-button" onClick={handleSend} type="button">
            Send
          </button>
        </div>
      </section>
    </main>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(() => getStoredUser());

  const handleAuthSuccess = (authenticatedUser: User, token: string) => {
    localStorage.setItem('damru-token', token);
    localStorage.setItem('damru-user', JSON.stringify(authenticatedUser));
    setUser(authenticatedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('damru-token');
    localStorage.removeItem('damru-user');
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div className="app-shell">
        <HeaderBar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<LandingPage user={user} />} />
          <Route path="/signin" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage mode="login" onAuthSuccess={handleAuthSuccess} />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage mode="register" onAuthSuccess={handleAuthSuccess} />} />
          <Route path="/dashboard" element={user ? <DashboardPage user={user} /> : <Navigate to="/signin" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
