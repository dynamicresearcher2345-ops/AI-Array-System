import { useEffect, useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

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

const initialMessages = [
  { role: 'assistant' as const, text: 'Hello! I am Array. Ask me about science, stock markets, research, or music.' },
];

function App() {
  const [data, setData] = useState<ArrayData | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>(initialMessages);
  const [status, setStatus] = useState('Loading Array AI...');

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/array`);
        if (!response.ok) {
          throw new Error('Failed to load system data');
        }

        const result = await response.json();
        setData(result);
        setStatus('Array is ready to assist.');
      } catch (error) {
        setStatus(`Connection issue: ${(error as Error).message}`);
      }
    };

    loadData();
  }, []);

  const stats = useMemo(
    () => [
      { label: 'Voice enabled', value: data?.chatbot.voiceFeature ? 'Yes' : 'No' },
      { label: 'Image search', value: data?.chatbot.imageSearch ? 'Enabled' : 'Disabled' },
      { label: 'Deep research', value: data?.chatbot.deepResearch ? 'Active' : 'Offline' },
      { label: 'AI labs', value: String(data?.chatbot.labOptions.length ?? 0) },
    ],
    [data]
  );

  const handleSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Chat request failed');

      const result = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', text: result.response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: `System issue: ${(error as Error).message}` },
      ]);
    }
  };

  const handleVoice = () => {
    if (!('speechSynthesis' in window)) {
      setStatus('Voice support is not available in this browser.');
      return;
    }

    const lastAssistant = [...messages].reverse().find((message) => message.role === 'assistant');
    const text = lastAssistant?.text || 'Array is ready.';
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setStatus('Voice playback started.');
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="container nav-row">
          <div className="brand-block">
            <div className="brand-mark">A</div>
            <span>ARRAY</span>
          </div>

          <nav className="nav-links" aria-label="Main navigation">
            <a href="#features">Features</a>
            <a href="#labs">Labs</a>
            <a href="#technology">Technology</a>
            <a href="#pricing">Pricing</a>
          </nav>

          <div className="nav-actions">
            <button className="ghost-button">Sign in</button>
            <button className="primary-button">Try Array</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">AI DATA SYSTEM</span>
              <h1>
                Think faster. Research deeper. Build smarter with <span>Array</span>.
              </h1>
              <p>
                Array combines voice AI, image search, deep research, stock understanding, science discovery,
                and music generation into one advanced intelligence system designed for modern thinking and action.
              </p>

              <div className="hero-actions">
                <button className="primary-button large">Get Started</button>
                <button className="secondary-button large">Book a Demo</button>
              </div>

              <div className="hero-stats">
                {stats.map((item) => (
                  <div key={item.label} className="mini-stat">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <div className="glow glow-one" />
              <div className="glow glow-two" />

              <div className="dashboard-card">
                <div className="window-bar">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>

                <div className="dashboard-panel">
                  <div className="panel-head">
                    <p>Array AI</p>
                    <span>Live</span>
                  </div>

                  <div className="chip-row">
                    <span>Voice</span>
                    <span>Image</span>
                    <span>Research</span>
                  </div>

                  <div className="metric-grid">
                    <div className="metric-box">
                      <small>Science</small>
                      <strong>128</strong>
                    </div>
                    <div className="metric-box">
                      <small>Stocks</small>
                      <strong>+4.8%</strong>
                    </div>
                    <div className="metric-box">
                      <small>Research</small>
                      <strong>72</strong>
                    </div>
                    <div className="metric-box">
                      <small>Music</small>
                      <strong>18</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section-block">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">FEATURES</span>
                <h2>One intelligent system for every workflow</h2>
              </div>
              <p>
                From chat to deep analysis, Array brings the power of specialized AI modules into one clean and adaptive experience.
              </p>
            </div>

            <div className="feature-grid">
              <article className="feature-card">
                <div className="feature-icon">🎙️</div>
                <h3>Voice AI</h3>
                <p>Talk naturally, get fast answers, and build interactive conversations with a voice-first assistant.</p>
              </article>

              <article className="feature-card">
                <div className="feature-icon">🖼️</div>
                <h3>Image Search</h3>
                <p>Explore visual content, understanding, and content discovery through a powerful AI-powered workflow.</p>
              </article>

              <article className="feature-card">
                <div className="feature-icon">🔎</div>
                <h3>Deep Research</h3>
                <p>Search broad knowledge spaces and transform raw information into meaningful conclusions and summaries.</p>
              </article>

              <article className="feature-card">
                <div className="feature-icon">🧪</div>
                <h3>Science Lab</h3>
                <p>Investigate scientific topics, simplify complex concepts, and build structured understanding around any subject.</p>
              </article>

              <article className="feature-card">
                <div className="feature-icon">📈</div>
                <h3>Stock Lab</h3>
                <p>Track selected country markets and understand macro and sector movement with a smart market overview.</p>
              </article>

              <article className="feature-card">
                <div className="feature-icon">🎵</div>
                <h3>Music Lab</h3>
                <p>Create songs, tune ideas, mood direction, and lyrical concepts with an AI-assisted creative workflow.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="labs" className="labs-section">
          <div className="container">
            <div className="section-heading narrow">
              <div>
                <span className="eyebrow">LAB MODULES</span>
                <h2>Specialized research and creativity spaces</h2>
              </div>
            </div>

            <div className="lab-grid">
              {data?.chatbot.labOptions.map((lab) => (
                <div key={lab.name} className="lab-card">
                  <h3>{lab.name}</h3>
                  <p>{lab.description}</p>
                  <ul>
                    {lab.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )) ?? [
                ['Science Lab', 'Search scientific topics and explain concepts clearly.', ['Scientific search', 'Concept breakdown', 'Research insights']],
                ['Stock Lab', 'Understand market performance and selected country trends.', ['Stock tracking', 'Country analysis', 'Trend overview']],
                ['Research Lab', 'Summarize complex topics and create useful briefs.', ['Research query', 'Summary generation', 'Insight extraction']],
                ['Music Lab', 'Generate song ideas and tune concepts.', ['Song prompts', 'Tune ideas', 'Creative direction']],
              ].map(([name, desc, features]) => (
                <div key={String(name)} className="lab-card">
                  <h3>{String(name)}</h3>
                  <p>{String(desc)}</p>
                  <ul>
                    {features.map((feature) => (
                      <li key={String(feature)}>{String(feature)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="technology" className="section-block">
          <div className="container workflow-grid">
            <div className="workflow-copy">
              <span className="eyebrow">HOW IT WORKS</span>
              <h2>Built for clarity, speed, and smart execution</h2>
              <p>
                Array is assembled around a modern AI workflow: gather context, search intelligently, reason with structure,
                and deliver clear output across text, voice, images, and research tasks.
              </p>
              <ul className="check-list">
                <li>Context-aware AI conversations</li>
                <li>Multi-lab intelligence system</li>
                <li>Structured research and summarization</li>
                <li>Actionable insights and creative output</li>
              </ul>
            </div>

            <div className="workflow-panel">
              <div className="workflow-node">
                <span>01</span>
                <div>
                  <strong>Gather</strong>
                  <small>Collect input, prompts, and context</small>
                </div>
              </div>
              <div className="workflow-node">
                <span>02</span>
                <div>
                  <strong>Analyze</strong>
                  <small>Search and reason across data domains</small>
                </div>
              </div>
              <div className="workflow-node">
                <span>03</span>
                <div>
                  <strong>Deliver</strong>
                  <small>Summaries, music, insight, and actions</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <div className="container demo-box">
            <div className="demo-copy">
              <span className="eyebrow">LIVE DEMO</span>
              <h2>Talk with the Array AI assistant</h2>
              <p>Use the chat window to ask about science, stock markets, research topics, or music ideas.</p>
            </div>

            <div className="chat-card">
              <div className="chat-window">
                {messages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className={`chat-bubble ${message.role}`}>
                    {message.text}
                  </div>
                ))}
              </div>

              <div className="chat-controls">
                <input
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder="Ask Array anything..."
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') handleSend();
                  }}
                />
                <button className="primary-button" onClick={handleSend}>Send</button>
                <button className="secondary-button" onClick={handleVoice}>Voice</button>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="section-block">
          <div className="container">
            <div className="section-heading center">
              <div>
                <span className="eyebrow">PRICING</span>
                <h2>Choose the plan that matches your ambition</h2>
              </div>
            </div>

            <div className="pricing-grid">
              <div className="pricing-card">
                <h3>Starter</h3>
                <div className="price">$19<span>/mo</span></div>
                <ul>
                  <li>Basic AI chat</li>
                  <li>Science and research tools</li>
                  <li>Voice assistant access</li>
                </ul>
                <button className="secondary-button full-width">Get Started</button>
              </div>

              <div className="pricing-card featured">
                <span className="popular-tag">Most Popular</span>
                <h3>Pro</h3>
                <div className="price">$49<span>/mo</span></div>
                <ul>
                  <li>Everything in Starter</li>
                  <li>Advanced lab workflows</li>
                  <li>Deep research features</li>
                  <li>Priority response</li>
                </ul>
                <button className="primary-button full-width">Start Pro</button>
              </div>

              <div className="pricing-card">
                <h3>Enterprise</h3>
                <div className="price">Custom</div>
                <ul>
                  <li>Custom AI workflows</li>
                  <li>Team access and governance</li>
                  <li>Private deployment options</li>
                </ul>
                <button className="secondary-button full-width">Talk to Sales</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-row">
          <div className="brand-block footer-brand">
            <div className="brand-mark">A</div>
            <span>ARRAY</span>
          </div>

          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#labs">Labs</a>
            <a href="#pricing">Pricing</a>
          </div>

          <p>© 2026 Array AI</p>
        </div>
      </footer>
    </div>
  );
}

export default App;



























































