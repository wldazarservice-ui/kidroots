// Contenu "Grand explorateur" : un fichier par pays (ex: ML.js), charge a la demande.
// Format : export default { [chapterId]: { intro?, cards: [{ emoji, date, title, text, fact }], quiz: [{ q, correct, wrong1, wrong2, emoji }] } }
const loaders = import.meta.glob(['./*.js', '!./index.js'])

const pathOf = (code) => `./${code}.js`

export const hasExpert = (code) => !!loaders[pathOf(code)]

export async function loadExpert(code) {
  const load = loaders[pathOf(code)]
  if (!load) return null
  const mod = await load()
  return mod.default
}
