import { useState, useEffect } from 'react'
import { translateObject, translateString, isTranslatable } from './translator'

// Traduit recursivement un objet (chapitre, pays...) selon la langue.
// Pendant le chargement, retourne l'original (francais) immediatement.
export function useTranslatedObj(obj, lang) {
  const [out, setOut] = useState(obj)
  useEffect(() => {
    setOut(obj)
    if (!obj || !isTranslatable(lang)) return
    let cancel = false
    translateObject(obj, lang).then(r => { if (!cancel) setOut(r) })
    return () => { cancel = true }
  }, [obj, lang])
  return out
}

// Traduit une chaine simple (utile dans une boucle via le composant TText).
export function useTranslatedString(text, lang) {
  const [out, setOut] = useState(text)
  useEffect(() => {
    setOut(text)
    if (!text || !isTranslatable(lang)) return
    let cancel = false
    translateString(text, lang).then(r => { if (!cancel) setOut(r) })
    return () => { cancel = true }
  }, [text, lang])
  return out
}

// Composant pratique pour rendre un texte traduit dans une boucle JSX.
export function TText({ text, lang }) {
  const out = useTranslatedString(text, lang)
  return out
}
