import puppeteer from 'puppeteer-core'
import path from 'node:path'
const dir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'brand')
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const p = await b.newPage()
await p.setViewport({ width: 1640, height: 624 })
await p.goto(`file://${dir}/cover.html`, { waitUntil: 'networkidle0' })
await p.evaluate(async () => { await document.fonts.ready; await document.fonts.load('60px "Noto Color Emoji"', '☁️✈️🌍📖🔊🎯👧🎁') })
await new Promise(r => setTimeout(r, 500))
await p.screenshot({ path: path.join(dir, 'mokalibo_couverture_facebook.png') })
await b.close()
