import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

// Carte du monde interactive (SVG) : zoom (molette, pincement, boutons), déplacement au doigt,
// clic sur un pays. Les tracés sont chargés à la demande (≈150 Ko compressés).
let MAP_CACHE = null
const loadMap = () => (MAP_CACHE ||= import('../data/worldmap.gen.js'))

export default function WorldMap({ fill, onPick, highlight, focus, onBBoxes, height = 420, stroke = '#FFFFFF' }) {
  const [data, setData] = useState(null)
  const svg = useRef(null)
  const paths = useRef({})
  const base = useMemo(() => (data ? data.VIEWBOX.split(' ').map(Number) : [0, 0, 1010, 666]), [data])
  const [vb, setVb] = useState(null)
  const drag = useRef(null)
  const pointers = useRef(new Map())

  useEffect(() => { loadMap().then((m) => setData(m)) }, [])
  useEffect(() => { if (data) setVb(base) }, [data, base])

  // Boîtes englobantes de chaque pays (pour exclure les pays trop petits dans les jeux)
  const measured = useRef(false)
  useLayoutEffect(() => {
    if (!data || !vb || !onBBoxes || measured.current) return
    measured.current = true
    const out = {}
    for (const [code, el] of Object.entries(paths.current)) {
      try { const b = el.getBBox(); out[code] = { x: b.x, y: b.y, w: b.width, h: b.height } } catch {}
    }
    onBBoxes(out)
  }, [data, vb])

  // Centrer la vue sur un pays
  useEffect(() => {
    if (!focus || !data) { if (data && focus === null) setVb(base); return }
    const el = paths.current[focus]
    if (!el) return
    try {
      const b = el.getBBox()
      const size = Math.max(b.width, b.height * 1.5, 90) * 2.2
      const w = Math.min(size, base[2]); const h = w * (base[3] / base[2])
      setVb([b.x + b.width / 2 - w / 2, b.y + b.height / 2 - h / 2, w, h])
    } catch {}
  }, [focus, data])

  const toSvg = (cx, cy) => {
    const r = svg.current.getBoundingClientRect()
    return [vb[0] + ((cx - r.left) / r.width) * vb[2], vb[1] + ((cy - r.top) / r.height) * vb[3]]
  }
  const zoom = (factor, cx, cy) => {
    setVb((v) => {
      const w = Math.min(base[2], Math.max(40, v[2] * factor)); const h = w * (base[3] / base[2])
      const [px, py] = cx == null ? [v[0] + v[2] / 2, v[1] + v[3] / 2] : toSvg(cx, cy)
      const rx = (px - v[0]) / v[2]; const ry = (py - v[1]) / v[3]
      return [px - rx * w, py - ry * h, w, h]
    })
  }

  const onPointerDown = (e) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    drag.current = { x: e.clientX, y: e.clientY, vb, moved: false, dist: null }
  }
  const onPointerMove = (e) => {
    if (!drag.current || !pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const pts = [...pointers.current.values()]
    if (pts.length === 2) {
      const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y)
      if (drag.current.dist) zoom(drag.current.dist / d, (pts[0].x + pts[1].x) / 2, (pts[0].y + pts[1].y) / 2)
      drag.current.dist = d; drag.current.moved = true
      return
    }
    const r = svg.current.getBoundingClientRect()
    const dx = e.clientX - drag.current.x; const dy = e.clientY - drag.current.y
    if (!drag.current.moved && Math.abs(dx) + Math.abs(dy) > 6) {
      drag.current.moved = true
      try { svg.current.setPointerCapture(e.pointerId) } catch {}
    }
    if (!drag.current.moved) return
    const v = drag.current.vb
    setVb([v[0] - (dx / r.width) * v[2], v[1] - (dy / r.height) * v[3], v[2], v[3]])
  }
  // Un appui sans glisser = choix du pays sous le doigt
  const onPointerUp = (e) => {
    const wasTap = drag.current && !drag.current.moved && pointers.current.size === 1
    pointers.current.delete(e.pointerId)
    if (wasTap) {
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const code = el?.getAttribute?.('data-code')
      if (code) onPick?.(code)
    }
    if (pointers.current.size === 0) drag.current = null
  }

  const box = { width: '100%', aspectRatio: '1010 / 620', maxHeight: height, minHeight: 230 }
  if (!data || !vb) return <div style={{ ...box, borderRadius: 24, background: '#D6EEFB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }} className="float">🌍</div>

  const btn = { width: 40, height: 40, borderRadius: 14, border: 'none', background: 'white', fontSize: 22, fontWeight: 900, color: '#1A2A4F', boxShadow: '0 3px 10px rgba(26,42,79,0.18)', cursor: 'pointer' }
  return (
    <div style={{ ...box, position: 'relative', borderRadius: 24, overflow: 'hidden', background: 'linear-gradient(180deg,#BEE6FB,#D9F1FD)', touchAction: 'none' }}>
      <svg ref={svg} viewBox={vb.join(' ')} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab' }}
        onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
        onWheel={(e) => zoom(e.deltaY > 0 ? 1.2 : 0.83, e.clientX, e.clientY)}>
        {Object.entries(data.PATHS).map(([code, d]) => (
          <path key={code} ref={(el) => { if (el) paths.current[code] = el }} d={d}
            fill={fill ? fill(code) : '#CFD8DC'} stroke={stroke} strokeWidth={Math.max(0.15, vb[2] / 1400)}
            data-code={code} className={highlight === code ? 'map-pulse' : undefined} style={{ cursor: 'pointer' }} />
        ))}
      </svg>
      <div style={{ position: 'absolute', right: 10, bottom: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button type="button" style={btn} onClick={() => zoom(0.7)} aria-label="Zoom +">+</button>
        <button type="button" style={btn} onClick={() => zoom(1.4)} aria-label="Zoom −">−</button>
        <button type="button" style={{ ...btn, fontSize: 18 }} onClick={() => setVb(base)} aria-label="Toute la carte">🌍</button>
      </div>
    </div>
  )
}
