import puppeteer from '/Users/Macbookpro/Desktop/kidroots/marketing/video/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js'
const dir = '/Users/Macbookpro/Desktop/kidroots/marketing/posts'
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--allow-file-access-from-files', '--force-color-profile=srgb'] })
const p = await b.newPage()
await p.setViewport({ width: 1080, height: 1350 })
await p.goto(`file://${dir}/post_avenir.html`, { waitUntil: 'load' })
await p.evaluate(async () => { await document.fonts.ready; await document.fonts.load('60px "Noto Color Emoji"', '🚀🔊🗺️💬') })
await new Promise((r) => setTimeout(r, 600))
await p.screenshot({ path: `${dir}/post_avenir.png` })
await b.close()
