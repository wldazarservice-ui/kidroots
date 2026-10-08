// Chargement a la demande du contenu complet d'un pays « monde »
const loaders = import.meta.glob(['./[A-Z][A-Z].js'])

export const hasWorld = (code) => !!loaders[`./${code}.js`]

export async function loadWorld(code) {
  const load = loaders[`./${code}.js`]
  if (!load) return null
  return (await load()).default
}
