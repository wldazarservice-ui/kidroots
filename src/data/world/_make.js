// Format compact des pays « monde » (un fichier par pays, charge a la demande).
// country(meta, chapters) -> meme forme que les pays de src/data/countries.js
// ch(id, era, title, subtitle, emoji, intro, figure, cards, quiz)
//   figure = [nom, emoji, description]
//   cards  = [[emoji, titre, texte, anecdote], ...]
//   quiz   = [[question, bonne reponse, mauvaise 1, mauvaise 2, emoji], ...]
const PALETTE = [
  ['#6D4C41', '#EFEBE9'], // origines
  ['#E65100', '#FFF3E0'], // royaumes / moyen age
  ['#1565C0', '#E3F2FD'], // epoque moderne
  ['#2E7D32', '#E8F5E9'], // independance / 20e siecle
  ['#6A1B9A', '#F3E5F5'], // aujourd'hui
]

export function ch(id, era, title, subtitle, emoji, intro, figure, cards, quiz) {
  return { id, era, title, subtitle, emoji, intro, figure, cards, quiz }
}

export function country(meta, chapters) {
  return {
    ...meta,
    dark: meta.dark || meta.color,
    chapters: chapters.map((c, i) => ({
      id: c.id, era: c.era, title: c.title, subtitle: c.subtitle, emoji: c.emoji,
      color: PALETTE[i % PALETTE.length][0], light: PALETTE[i % PALETTE.length][1],
      intro: c.intro,
      figure: { name: c.figure[0], emoji: c.figure[1], desc: c.figure[2] },
      cards: c.cards.map(([emoji, title, text, fact]) => ({ emoji, title, text, fact })),
      quiz: c.quiz.map(([q, correct, wrong1, wrong2, emoji]) => ({ q, correct, wrong1, wrong2, emoji })),
    })),
  }
}
