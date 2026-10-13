import puppeteer from '../../video/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js'
import path from 'node:path'
const dir = path.dirname(new URL(import.meta.url).pathname)
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--allow-file-access-from-files'] })
const p = await b.newPage()
await p.setViewport({ width: 1080, height: 1920 })
for (const lang of ['fr', 'de']) for (let s = 0; s < 7; s++) {
  await p.goto(`file://${dir}/kit.html?s=${s}&lang=${lang}`, { waitUntil: 'networkidle0' })
  await p.evaluate(() => window.ready())
  await new Promise((r) => setTimeout(r, 300))
  await p.screenshot({ path: path.join(dir, `story_${lang}_${s + 1}.png`) })
}
await b.close()
console.log('ok')
