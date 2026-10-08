import puppeteer from 'puppeteer-core'
import path from 'node:path'
const lang = process.argv[2] || 'fr'
const times = (process.argv[3] || '5,10,17,23,35,44,50,57').split(',').map(Number)
const dir = path.dirname(new URL(import.meta.url).pathname)
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1080, height: 1920 })
await page.goto(`file://${dir}/scene.html?lang=${lang}`, { waitUntil: 'networkidle0' })
await page.evaluate(() => window.fontsReady())
for (const t of times) {
  await page.evaluate((t) => window.render(t), t)
  await page.screenshot({ path: path.join(dir, 'out', `still_${lang}_${t}.jpg`), type: 'jpeg', quality: 70 })
}
await browser.close()
