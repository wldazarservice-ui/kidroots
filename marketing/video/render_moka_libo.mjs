// Rend un episode de Moka & Libo (moka_libo.html) en MP4 9:16 avec la musique Mokalibo.
// Usage : node render_moka_libo.mjs   |   STILLS=1 node render_moka_libo.mjs (images de controle)
import puppeteer from 'puppeteer-core'
import { spawn } from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'
const FPS = 30, SECONDS = 32
const dir = path.dirname(new URL(import.meta.url).pathname)
const outDir = path.join(dir, 'out', 'moka_libo'); fs.mkdirSync(outDir, { recursive: true })
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--hide-scrollbars', '--force-color-profile=srgb'] })
const page = await browser.newPage()
await page.setViewport({ width: 1080, height: 1920 })
await page.goto(`file://${dir}/moka_libo.html`, { waitUntil: 'networkidle0' })
await page.evaluate(() => window.ready())
if (process.env.STILLS) {
  for (const t of (process.env.STILLS === '1' ? [1.5, 5.5, 9.5, 14, 19, 24, 27, 30.5] : process.env.STILLS.split(',').map(Number))) {
    await page.evaluate((t) => window.render(t), t)
    await page.screenshot({ path: path.join(outDir, `still_${t}.jpg`), type: 'jpeg', quality: 60 })
  }
} else {
  const out = path.join(outDir, 'moka_libo_ep01_japon_fr.mp4')
  // Musique : theme Mokalibo, coupe a la duree de l'episode avec fondu de fin
  const ff = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y',
    '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-i', path.join(dir, 'out', 'mokalibo_theme.wav'),
    '-filter_complex', `[1:a]atrim=0:${SECONDS},afade=t=in:d=0.5,afade=t=out:st=${SECONDS - 2}:d=2,volume=0.9[a]`,
    '-map', '0:v', '-map', '[a]', '-t', String(SECONDS),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(FPS),
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
