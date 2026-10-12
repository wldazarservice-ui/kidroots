import { Component } from 'react'
import { reportError } from '../errorReport'
import { t, getLang } from '../i18n'

// Si un ecran plante : message rassurant + bouton pour recharger, et le bug est signale
export default class ErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error, info) {
    reportError(error?.message || String(error), (info?.componentStack || '').trim().split('\n')[0])
  }
  render() {
    if (!this.state.failed) return this.props.children
    const lang = getLang()
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: 24, textAlign: 'center', fontFamily: 'Nunito, sans-serif', background: '#FFFDF7', color: '#1A2A4F' }}>
        <div style={{ fontSize: 64 }}>🧭</div>
        <div style={{ fontSize: 22, fontWeight: 900 }}>{t(lang, 'crash_title')}</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#607D8B', maxWidth: 340 }}>{t(lang, 'crash_sub')}</div>
        <button onClick={() => window.location.reload()} style={{ border: 'none', background: 'linear-gradient(180deg,#FFE04D,#FFC400)', color: '#1A2A4F', fontWeight: 900, fontSize: 17, padding: '14px 26px', borderRadius: 18, boxShadow: '0 5px 0 #E6A100', fontFamily: 'inherit', cursor: 'pointer' }}>↻ {t(lang, 'crash_btn')}</button>
      </div>
    )
  }
}
