@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  color-scheme: dark;
  --bg: #05070a;
  --bg-2: #0b1018;
  --bg-3: #121b27;
  --panel: rgba(12, 18, 25, 0.88);
  --panel-alt: rgba(18, 23, 31, 0.92);
  --panel-border: rgba(255, 153, 51, 0.2);
  --text: #f5f2eb;
  --muted: #c7c4bd;
  --accent: #ff9933;
  --accent-2: #f5c76b;
  --green: #138808;
  --green-soft: rgba(19, 136, 8, 0.15);
  --shadow: rgba(0, 0, 0, 0.42);
  --danger: #ff7a7a;
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  min-height: 100%;
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(255, 153, 51, 0.16), transparent 28%),
    radial-gradient(circle at bottom right, rgba(19, 136, 8, 0.16), transparent 30%),
    linear-gradient(135deg, var(--bg), var(--bg-2));
  color: var(--text);
  font-family: 'Inter', sans-serif;
}

body {
  background-attachment: fixed;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input {
  font: inherit;
}

.app-shell {
  max-width: 1320px;
  margin: 0 auto;
  padding: 18px 18px 64px;
}

.content-shell {
  width: min(1200px, 100%);
  margin: 0 auto;
  display: grid;
  gap: 22px;
}

.topbar {
  width: min(1200px, 100%);
  margin: 0 auto 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 22px;
  border: 1px solid var(--panel-border);
  border-radius: 18px;
  background: rgba(10, 14, 18, 0.78);
  backdrop-filter: blur(12px);
  box-shadow: 0 18px 34px var(--shadow);
}

.brand-link {
  display: inline-flex;
  align-items: center;
}

.logo-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-logo {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(255, 153, 51, 0.22);
}

.brand-copy {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
}

.brand-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  letter-spacing: 0.06em;
  color: var(--text);
}

.brand-copy small {
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  color: var(--accent-2);
  text-transform: uppercase;
}

.nav-bar {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.nav-bar a {
  color: var(--muted);
  font-weight: 600;
  transition: color 0.2s ease;
}

.nav-bar a:hover {
  color: var(--text);
}

.eyebrow {
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
  color: var(--muted);
}

.eyebrow.accent {
  color: var(--accent-2);
}

.lead-text {
  font-size: 1.08rem;
  line-height: 1.8;
  color: var(--muted);
  max-width: 660px;
}

h1,
h2,
h3,
h4,
p {
  margin-top: 0;
}

h1,
h2,
h3,
h4 {
  font-family: 'Playfair Display', serif;
}

h1 {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  margin-bottom: 16px;
  line-height: 1.05;
}

h2 {
  font-size: clamp(1.7rem, 3vw, 2.8rem);
  margin-bottom: 8px;
}

h3 {
  font-size: clamp(1.4rem, 2vw, 2rem);
  margin-bottom: 10px;
}

.hero-panel {
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 26px;
  align-items: center;
}

.panel {
  background: linear-gradient(180deg, rgba(15, 20, 27, 0.94), rgba(10, 14, 18, 0.92));
  border: 1px solid var(--panel-border);
  border-radius: 28px;
  padding: 28px;
  box-shadow: 0 30px 60px var(--shadow);
}

.hero-copy {
  display: grid;
  gap: 18px;
}

.cta-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.primary-button,
.secondary-button,
.ghost-button {
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.primary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 20px;
  background: linear-gradient(135deg, var(--accent), #ffb75a);
  color: #140d07;
  box-shadow: 0 14px 30px rgba(255, 153, 51, 0.22);
}

.primary-button:hover,
.secondary-button:hover,
.ghost-button:hover {
  transform: translateY(-1px);
}

.secondary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 20px;
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
  border: 1px solid rgba(255, 255, 255, 0.09);
}

.ghost-button {
  padding: 11px 15px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.small-button {
  padding: 12px 18px;
  font-size: 0.95rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.stat-card {
  padding: 18px 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.stat-card span {
  display: block;
  margin-bottom: 10px;
  color: var(--muted);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.stat-card strong {
  font-size: 1.35rem;
}

.feature-panel,
.labs-panel,
.chat-panel {
  display: grid;
  gap: 18px;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

.feature-card {
  padding: 20px 18px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
}

.feature-card p {
  margin-bottom: 0;
  color: var(--muted);
  line-height: 1.75;
}

.video-shell {
  width: 100%;
  min-height: 420px;
}

.video-surface {
  position: relative;
  display: flex;
  align-items: flex-end;
  height: 100%;
  min-height: 420px;
  padding: 24px;
  background:
    linear-gradient(180deg, rgba(8, 10, 13, 0.18), rgba(10, 12, 18, 0.72)),
    url('/assets/intro-poster.svg') center/cover no-repeat;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  box-shadow: 0 24px 40px rgba(0, 0, 0, 0.35);
}

.video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(8, 10, 12, 0.1), rgba(8, 12, 18, 0.74));
}

.video-topline,
.video-meta,
.play-button {
  position: relative;
  z-index: 1;
}

.video-topline {
  position: absolute;
  top: 18px;
  left: 20px;
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  color: var(--accent-2);
  text-transform: uppercase;
}

.play-button {
  position: absolute;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  width: 92px;
  height: 92px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(8, 12, 17, 0.7);
  color: var(--text);
  font-size: 2rem;
  cursor: pointer;
  box-shadow: 0 24px 34px rgba(0, 0, 0, 0.38);
}

.play-button span {
  display: inline-block;
  transform: translateX(4px);
}

.video-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px 20px;
  border-radius: 12px;
  background: rgba(8, 12, 18, 0.68);
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
}

.video-meta span {
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.68rem;
}

.video-meta strong {
  font-size: 1rem;
  color: var(--text);
}

.pill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.pill {
  display: inline-flex;
  align-items: center;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 153, 51, 0.2);
  background: rgba(255, 153, 51, 0.06);
  color: var(--text);
}

.lab-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

.lab-card {
  padding: 18px 18px 10px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.lab-card h4 {
  margin-bottom: 10px;
}

.lab-card p {
  color: var(--muted);
  line-height: 1.7;
  min-height: 80px;
}

.lab-card ul {
  margin: 0;
  padding-left: 18px;
  color: var(--text);
  line-height: 2;
}

.chat-window {
  min-height: 220px;
  max-height: 340px;
  overflow: auto;
  padding: 16px;
  border-radius: 18px;
  background: rgba(11, 15, 20, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.chat-bubble {
  max-width: 80%;
  padding: 12px 14px;
  line-height: 1.65;
  border-radius: 14px;
}

.chat-bubble.user {
  align-self: flex-end;
  background: linear-gradient(135deg, rgba(255, 153, 51, 0.82), rgba(245, 199, 107, 0.8));
  color: #1b1209;
  font-weight: 600;
}

.chat-bubble.assistant {
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.empty-chat {
  margin: auto;
  color: var(--muted);
  text-align: center;
}

.chat-input-row {
  display: flex;
  gap: 12px;
}

.chat-input-row input,
.auth-form input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
}

.chat-input-row input::placeholder,
.auth-form input::placeholder {
  color: rgba(245, 242, 235, 0.52);
}

.chat-input-row input {
  flex: 1;
}

.auth-shell {
  min-height: 60vh;
  display: grid;
  place-items: center;
}

.auth-panel {
  width: min(520px, 100%);
  display: grid;
  gap: 18px;
}

.auth-header {
  display: flex;
  justify-content: center;
}

.auth-panel h2 {
  margin-bottom: 0;
}

.auth-panel p {
  margin-bottom: 0;
  color: var(--muted);
}

.auth-form {
  display: grid;
  gap: 16px;
}

.auth-form label {
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 0.95rem;
}

.form-error {
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255, 122, 122, 0.08);
  border: 1px solid rgba(255, 122, 122, 0.18);
  color: #ffd0d0;
}

.auth-switch {
  text-align: center;
  color: var(--muted);
}

.auth-switch a {
  color: var(--accent-2);
  font-weight: 700;
}

.loader {
  min-height: 60vh;
  display: grid;
  place-items: center;
  font-size: 1.1rem;
  color: var(--muted);
}

@media (max-width: 960px) {
  .hero-panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-bar {
    width: 100%;
    justify-content: space-between;
  }

  .chat-input-row {
    flex-direction: column;
  }

  .panel {
    padding: 20px 16px;
  }
}
