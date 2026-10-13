import puppeteer from '../video/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js'
import path from 'node:path'
import fs from 'node:fs'
const dir = path.dirname(new URL(import.meta.url).pathname)
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--allow-file-access-from-files'] })
const p = await b.newPage()
// 1. Image tres haute definition (A4 a ~300 dpi)
await p.setViewport({ width: 794, height: 1123, deviceScaleFactor: 3.125 })
await p.goto(`file://${dir}/bamako_v2.html`, { waitUntil: 'networkidle0' })
await p.evaluate(() => window.ready())
await new Promise((r) => setTimeout(r, 700))
const png = path.join(dir, 'affiche_mokalibo_bamako.png')
await p.screenshot({ path: png })
// 2. PDF = cette image en pleine page (aucune ombre ni transparence a reinterpreter : rendu identique partout)
const data = fs.readFileSync(png).toString('base64')
await p.setContent(`<html><head><style>@page{size:A4;margin:0}html,body{margin:0;padding:0}img{width:210mm;height:297mm;display:block}</style></head><body><img src="data:image/png;base64,${data}"></body></html>`, { waitUntil: 'load' })
await p.pdf({ path: path.join(dir, 'affiche_mokalibo_bamako_A4.pdf'), format: 'A4', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } })
await b.close()
console.log('ok')
