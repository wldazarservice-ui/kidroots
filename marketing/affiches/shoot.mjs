import puppeteer from '../video/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js'
import path from 'node:path'
const dir = path.dirname(new URL(import.meta.url).pathname)
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--allow-file-access-from-files'] })
const p = await b.newPage()
await p.setViewport({ width: 794, height: 1123, deviceScaleFactor: 3 })
await p.goto(`file://${dir}/bamako.html`, { waitUntil: 'networkidle0' })
await p.evaluate(() => window.ready())
await new Promise((r) => setTimeout(r, 700))
await p.pdf({ path: path.join(dir, 'affiche_mokalibo_bamako_A4.pdf'), format: 'A4', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } })
await p.screenshot({ path: path.join(dir, 'affiche_mokalibo_bamako.png') })
await b.close()
console.log('ok')
