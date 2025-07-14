import { createRoot } from 'react-dom/client'
import { Security } from '@okta/okta-react'
import { oktaAuth } from './config/okta.config'
import App from './App.tsx'
import './index.css'

const restoreOriginalUri = (_oktaAuth: any, originalUri: string) => {
  window.location.replace(originalUri || '/');
};

createRoot(document.getElementById("root")!).render(
  <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
    <App />
  </Security>
);
