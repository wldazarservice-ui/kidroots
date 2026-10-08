// Fiches « faune et monuments » de chaque pays (jeux et passeport)
import africa from './discover_africa.js'
import europe from './discover_europe.js'
import asia from './discover_asia.js'
import americas from './discover_americas.js'

const RAW = { ...africa, ...europe, ...asia, ...americas }

export const DISCOVER = Object.fromEntries(Object.entries(RAW).map(([code, d]) => [code, {
  animal: { emoji: d.a[0], name: d.a[1], fact: d.a[2], habitat: d.a[3], protect: d.a[4] },
  monument: { emoji: d.m[0], name: d.m[1], riddle: d.m[2] },
}]))
