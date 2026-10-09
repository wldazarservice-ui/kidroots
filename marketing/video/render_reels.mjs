// Rend les Reels « Le savais-tu ? » (reel.html), 18 s, 30 i/s, avec musique.
// Usage : node render_reels.mjs fr 0,1,2   |   STILLS=1 node render_reels.mjs fr 0  (images de controle)
import puppeteer from 'puppeteer-core'
import { spawn } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'
const lang = process.argv[2] || 'fr'
const ids = (process.argv[3] || '0,1,2,3,4,5,6,7,8,9').split(',').map(Number)
const FPS = 30, SECONDS = 18
const dir = path.dirname(new URL(import.meta.url).pathname)
const outDir = path.join(dir, 'out', 'reels'); fs.mkdirSync(outDir, { recursive: true })
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--hide-scrollbars', '--force-color-profile=srgb'] })
const page = await browser.newPage()
await page.setViewport({ width: 1080, height: 1920 })
for (const id of ids) {
  await page.goto(`file://${dir}/reel.html?lang=${lang}&id=${id}`, { waitUntil: 'networkidle0' })
  await page.evaluate(() => window.ready())
  if (process.env.STILLS) {
    for (const t of [1.5, 9, 13.5, 17.5]) {
      await page.evaluate((t) => window.render(t), t)
      await page.screenshot({ path: path.join(outDir, `still_${lang}_${id}_${t}.jpg`), type: 'jpeg', quality: 60 })
    }
    continue
  }
  const out = path.join(outDir, `reel_${lang}_${String(id + 1).padStart(2, '0')}.mp4`)
  const ff = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y',
    '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-i', path.join(dir, 'out', 'music_reel.wav'),
    '-map', '0:v', '-map', '1:a', '-shortest',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '21', '-pix_fmt', 'yuv420p', '-r', String(FPS),
    '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] })
  for (let i = 0; i < SECONDS * FPS; i++) {
    await page.evaluate((t) => window.render(t), i / FPS)
    const buf = await page.screenshot({ type: 'jpeg', quality: 90 })
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r))
  }
  ff.stdin.end(); await new Promise((r) => ff.on('close', r))
  console.log('OK', out)
}
await browser.close()
