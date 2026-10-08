// Installation de l'app depuis le site (PWA) : sans App Store ni Google Play.
// Chrome / Edge / Android : on capture l'evenement « beforeinstallprompt » des le chargement.
// iPhone / iPad : Apple ne fournit pas de bouton, on affiche un guide « Partager → Sur l'écran d'accueil ».
import { useEffect, useState } from 'react'

let deferredPrompt = null
const listeners = new Set()
const notify = () => listeners.forEach((fn) => fn())

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    notify()
  })
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null
    notify()
  })
}

export const isStandalone = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true)

export const isIOS = () => {
  const ua = navigator.userAgent || ''
  return /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
}

export function usePwaInstall() {
  const [, force] = useState(0)
  useEffect(() => {
    const fn = () => force((n) => n + 1)
    listeners.add(fn)
    return () => listeners.delete(fn)
  }, [])
  const installed = isStandalone()
  return {
    installed,
    canPrompt: !installed && !!deferredPrompt,
    ios: !installed && isIOS(),
    async prompt() {
      if (!deferredPrompt) return false
      deferredPrompt.prompt()
      const choice = await deferredPrompt.userChoice.catch(() => null)
      deferredPrompt = null
      notify()
      return choice?.outcome === 'accepted'
    },
  }
}
