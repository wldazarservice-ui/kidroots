import puppeteer from 'puppeteer-core'
import path from 'node:path'
const dir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'stories')
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--allow-file-access-from-files'] })
const p = await b.newPage()
await p.setViewport({ width: 1080, height: 1920 })
await p.goto(`file://${dir}/${process.argv[2] || 'story'}.html`, { waitUntil: 'networkidle0' })
await p.evaluate(async () => { await document.fonts.ready; await document.fonts.load('100px "Noto Color Emoji"', '🌍✈️⭐🎁👇🧡') })
await new Promise((r) => setTimeout(r, 500))
await p.screenshot({ path: path.join(dir, `${process.argv[2] || 'story'}.png`) })
await b.close()
