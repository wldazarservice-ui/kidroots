import puppeteer from 'puppeteer-core'
import path from 'node:path'
const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..')
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--allow-file-access-from-files'] })
const p = await b.newPage()
const shoot = async (file, q, w, h, out) => {
  await p.setViewport({ width: w, height: h })
  await p.goto(`file://${root}/${file}?${q}`, { waitUntil: 'networkidle0' })
  await p.evaluate(async () => { await document.fonts.ready; await document.fonts.load('100px "Noto Color Emoji"', document.body.innerText) })
  await new Promise((r) => setTimeout(r, 500))
  await p.screenshot({ path: path.join(root, out) })
}
for (const v of ['essai', 'comment', 'quiz', 'parents', 'voyage']) await shoot('instagram/highlights/cover.html', `v=${v}`, 1080, 1920, `instagram/highlights/a_la_une_${v}.png`)
for (let s = 0; s <= 6; s++) await shoot('posts/carrousel/carrousel.html', `s=${s}`, 1080, 1350, `posts/carrousel/slide_${s + 1}.png`)
await b.close()
console.log('ok')
