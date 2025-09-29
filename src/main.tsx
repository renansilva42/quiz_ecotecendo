import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('main.tsx - Starting React app...');
console.log('main.tsx - Root element:', document.getElementById('root'));
console.log('main.tsx - Current URL:', window.location.href);
console.log('main.tsx - WATER_QUIZ_MODE:', (window as any).WATER_QUIZ_MODE);

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('main.tsx - Root element not found!');
} else {
  console.log('main.tsx - Root element found, creating React root...');
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('main.tsx - React app rendered!');
}
