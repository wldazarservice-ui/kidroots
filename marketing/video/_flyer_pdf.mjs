// Regenere les flyers A5 (PDF + apercu PNG) a partir de kit/flyer.html
import puppeteer from 'puppeteer-core'
import path from 'node:path'
const dir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'kit')
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--allow-file-access-from-files'] })
const p = await b.newPage()
for (const lang of ['fr', 'de']) {
  await p.goto(`file://${dir}/flyer.html?lang=${lang}`, { waitUntil: 'networkidle0' })
  await p.evaluate(async () => { await document.fonts.ready; if (window.ready) await window.ready() })
  await new Promise((r) => setTimeout(r, 500))
  await p.pdf({ path: path.join(dir, `flyer_mokalibo_${lang}.pdf`), format: 'A5', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } })
  await p.setViewport({ width: 560, height: 794, deviceScaleFactor: 2 })
  await p.screenshot({ path: path.join(dir, `flyer_apercu_${lang}.png`) })
}
await b.close()
console.log('ok')
