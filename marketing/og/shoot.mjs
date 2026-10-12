import puppeteer from '../video/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js'
import path from 'node:path'
const dir = path.dirname(new URL(import.meta.url).pathname)
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--allow-file-access-from-files'] })
const p = await b.newPage()
await p.setViewport({ width: 1200, height: 630 })
await p.goto(`file://${dir}/og.html`, { waitUntil: 'networkidle0' })
await p.evaluate(async () => { await document.fonts.ready; await document.fonts.load('60px "Noto Color Emoji"', '🇯🇵🇪🇬🇧🇷🌍🎁🚫🔊') })
await new Promise((r) => setTimeout(r, 500))
await p.screenshot({ path: path.join(dir, '../../public/og-image.jpg'), type: 'jpeg', quality: 86 })
await b.close()
console.log('ok')
