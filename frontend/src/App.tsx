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

function App() {
  const [data, setData] = useState<ArrayData | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [status, setStatus] = useState('Loading AI array data...');

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/array`);
        if (!response.ok) {
          throw new Error('Failed to load array data');
        }

        const result = await response.json();
        setData(result);
        setStatus('AI Array connected and ready.');
      } catch (error) {
        setStatus(`Connection issue: ${(error as Error).message}`);
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
        {
          role: 'assistant',
          text: `System error: ${(error as Error).message}`,
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
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Advanced Intelligence Platform</p>
          <h1>{data.name}</h1>
        </div>
        <button className="primary-button" onClick={handleVoice}>
          Voice Assistant
        </button>
      </header>

      <main className="content-grid">
        <section className="panel hero-panel">
          <div>
            <p className="eyebrow accent">{data.type}</p>
            <h2>AI-powered research, thinking, and creation engine</h2>
            <p>{data.description}</p>
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

        <section className="panel">
          <div className="section-title-row">
            <h3>Core Features</h3>
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
          <div className="section-title-row">
            <h3>Laboratory Modules</h3>
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
          <div className="section-title-row">
            <h3>AI Chatbot</h3>
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
            <button className="primary-button" onClick={handleSend}>
              Send
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
