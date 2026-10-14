import IntroVideo from './components/IntroVideo';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
