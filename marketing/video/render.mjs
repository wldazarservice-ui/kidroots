// Rend scene.html image par image (30 i/s) et assemble la vidéo avec la musique.
// Usage : node render.mjs fr [secondes]
import puppeteer from 'puppeteer-core'
import { spawn } from 'node:child_process'
import path from 'node:path'

const lang = process.argv[2] || 'fr'
const seconds = Number(process.argv[3] || 60)
const FPS = 30
const dir = path.dirname(new URL(import.meta.url).pathname)
const out = path.join(dir, 'out', `mokalibo_${lang}${seconds < 60 ? '_test' : ''}.mp4`)

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--hide-scrollbars', '--force-color-profile=srgb'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 })
await page.goto(`file://${dir}/scene.html?lang=${lang}`, { waitUntil: 'networkidle0' })
await page.evaluate(() => window.fontsReady())

const ff = spawn('ffmpeg', [
  '-hide_banner', '-loglevel', 'error', '-y',
  '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
  '-i', path.join(dir, 'out', 'music.wav'),
  '-map', '0:v', '-map', '1:a', '-shortest',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', String(FPS),
  '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out,
], { stdio: ['pipe', 'inherit', 'inherit'] })

const total = Math.round(seconds * FPS)
const started = Date.now()
for (let i = 0; i < total; i++) {
  await page.evaluate((t) => window.render(t), i / FPS)
  const buf = await page.screenshot({ type: 'jpeg', quality: 92 })
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
  if (i % 150 === 0) console.log(`${lang} ${i}/${total} ${Math.round((Date.now() - started) / 1000)}s`)
}
ff.stdin.end()
await new Promise((r) => ff.on('close', r))
await browser.close()
console.log('OK', out)
