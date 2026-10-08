import puppeteer from 'puppeteer-core'
import path from 'node:path'
const dir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'instagram')
const only = (process.argv[2] || '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15').split(',').map(Number)
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--allow-file-access-from-files'] })
const p = await b.newPage()
await p.setViewport({ width: 1080, height: 1350 })
for (const i of only) {
  await p.goto(`file://${dir}/posts.html?i=${i}`, { waitUntil: 'networkidle0' })
  await p.evaluate(() => window.ready())
  await new Promise((r) => setTimeout(r, 300))
  await p.screenshot({ path: path.join(dir, `post_${String(i).padStart(2, '0')}.png`) })
}
await b.close()
