import puppeteer from 'puppeteer-core'
import path from 'node:path'
const dir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'posts')
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--allow-file-access-from-files'] })
const p = await b.newPage()
await p.setViewport({ width: 1080, height: 1350 })
for (const v of ['parents', 'egypte', 'quiz', 'voyage']) {
  await p.goto(`file://${dir}/post_semaine.html?v=${v}`, { waitUntil: 'networkidle0' })
  await p.evaluate(async () => { await document.fonts.ready; await document.fonts.load('100px "Noto Color Emoji"', document.body.innerText) })
  await new Promise((r) => setTimeout(r, 600))
  await p.screenshot({ path: path.join(dir, `post_${v}.png`) })
}
await b.close()
