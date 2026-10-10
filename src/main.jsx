import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SupportSheet from './components/SupportSheet'
import WelcomePremium from './components/WelcomePremium'
import OfflineBanner from './components/OfflineBanner'
import { AuthProvider } from './auth.jsx'
// Polices hebergees sur notre domaine (RGPD : aucune connexion aux serveurs Google)
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'
import '@fontsource/nunito/800.css'
import '@fontsource/nunito/900.css'
import '@fontsource/fredoka/500.css'
import '@fontsource/fredoka/600.css'
import '@fontsource/fredoka/700.css'
import './index.css'
import './pwaInstall' // capture tot de l'evenement d'installation

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <SupportSheet />
      <WelcomePremium />
      <OfflineBanner />
    </AuthProvider>
  </React.StrictMode>,
)

// Mode hors-ligne : service worker (uniquement en production pour ne pas gener Vite en dev)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((e) => console.error('SW registration failed:', e))
  })
}
