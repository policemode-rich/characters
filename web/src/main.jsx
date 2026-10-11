import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { isEnvBrowser } from './utils/misc';
import ErrorBoundary from './providers/errorBoundary';
import { startGameGlass } from 'mri-fivem-liquid-glass';

library.add(fas, far, fab);

const devBg = 'https://cdn.discordapp.com/attachments/1554625210685071514/1558522436381573302/image.png?ex=6acbbea0&is=6aca6d20&hm=d4a63779dc5b650785677b5de45360cc7ebe0ce796f2e8835ff66a5e0ffdad81&';

if (isEnvBrowser()) {
  const root = document.getElementById('root');

  // https://i.imgur.com/iPTAdYV.png - Night time img
  root.style.backgroundImage = 'url("https://cdn.discordapp.com/attachments/1554625210685071514/1558522436381573302/image.png?ex=6acbbea0&is=6aca6d20&hm=d4a63779dc5b650785677b5de45360cc7ebe0ce796f2e8835ff66a5e0ffdad81&")';
  root.style.backgroundSize = 'cover';
  root.style.backgroundRepeat = 'no-repeat';
  root.style.backgroundPosition = 'center';
  root.style.position = "absolute"
  root.style.top = '0%'
  root.style.left = '0%'
  root.style.width = '100%'
  root.style.height = '100%'
}

// Start liquid glass once at NUI boot
startGameGlass({
  fallbackImage: isEnvBrowser() ? devBg : null,
});

const root = document.getElementById('root');

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary> {/* Catches JS errors without hiding UI and keeps the app running */}
      <App />
    </ErrorBoundary>
  </StrictMode>
);
