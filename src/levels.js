// Niveaux de lecture : adaptent le nombre et la longueur des histoires + quiz
import { COUNTRIES } from './data/countries'
import { hasExpert } from './data/expert'

export const LEVELS = {
  mini: {
    emoji: '🐣', ages: '4-5', grad: ['#FFD54F', '#FFA000'], color: '#FF8F00',
    // Version courte : environ 60 % des histoires (au moins 2) et 2 questions par chapitre
    cards: (n) => Math.max(2, Math.ceil(n * 0.6)), quizPerChapter: 2,
  },
  explorer: {
    emoji: '🦊', ages: '6-7', grad: ['#4FC3F7', '#1E88E5'], color: '#1E88E5',
  },
  expert: {
    emoji: '🦉', ages: '8-12', grad: ['#BA68C8', '#7B1FA2'], color: '#7B1FA2',
  },
}
export const LEVEL_KEYS = ['mini', 'explorer', 'expert']

export const defaultLevelForAge = (age) => (age <= 5 ? 'mini' : age <= 7 ? 'explorer' : 'expert')

// Cle de progression : le niveau "explorer" garde l'ancienne cle (compatibilite)
export const doneKey = (chapterId, difficulty) =>
  !difficulty || difficulty === 'explorer' ? chapterId : `${chapterId}@${difficulty}`

export const isDone = (progress, chapterId, difficulty) => !!progress.done[doneKey(chapterId, difficulty)]

// Adapte un pays au niveau choisi. expertData = { [chapterId]: { intro?, cards, quiz } }
export function applyLevel(country, difficulty, expertData) {
  if (!country) return country
  if (difficulty === 'mini') {
    const L = LEVELS.mini
    return {
      ...country,
      chapters: country.chapters.map(ch => ({ ...ch, cards: ch.cards.slice(0, L.cards(ch.cards.length)), quiz: ch.quiz.slice(0, L.quizPerChapter) })),
    }
  }
  if (difficulty === 'expert' && expertData) {
    return {
      ...country,
      chapters: country.chapters.map(ch => {
        const x = expertData[ch.id]
        return x ? { ...ch, intro: x.intro || ch.intro, cards: x.cards, quiz: x.quiz } : ch
      }),
    }
  }
  return country
}

// Nombre d'histoires / questions d'un pays pour un niveau (sans charger les donnees expert)
export function countryStats(code, difficulty) {
  const c = COUNTRIES[code]
  const cards = c.chapters.reduce((a, ch) => a + ch.cards.length, 0)
  const quiz = c.chapters.reduce((a, ch) => a + ch.quiz.length, 0)
  if (difficulty === 'mini') {
    return {
      stories: c.chapters.reduce((a, ch) => a + Math.min(ch.cards.length, LEVELS.mini.cards(ch.cards.length)), 0),
      quiz: c.chapters.reduce((a, ch) => a + Math.min(ch.quiz.length, LEVELS.mini.quizPerChapter), 0),
    }
  }
  if (difficulty === 'expert' && hasExpert(code)) return { stories: c.chapters.length * 12, quiz: c.chapters.length * 8 }
  return { stories: cards, quiz }
}

// Chiffres réels par pays pour comparer les niveaux (moyenne + plus petit / plus grand pays)
export function levelAverages(difficulty) {
  const list = Object.keys(COUNTRIES).map(code => countryStats(code, difficulty))
  const avg = (k) => Math.round(list.reduce((a, s) => a + s[k], 0) / list.length)
  const range = (k) => [Math.min(...list.map(s => s[k])), Math.max(...list.map(s => s[k]))]
  return { stories: avg('stories'), quiz: avg('quiz'), storiesRange: range('stories'), quizRange: range('quiz') }
}
