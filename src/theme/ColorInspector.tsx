import { useCallback, useEffect, useRef, useState } from 'react'
import { Pipette, X } from 'lucide-react'

interface TokenEntry {
  name: string
  hex: string
}

interface Swatch {
  hex: string
  alpha: number
  tokenNames: string[]
}

interface Inspection {
  rect: DOMRect
  bg: Swatch | null
  text: Swatch
}

const HSL_TOKENS = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'success',
  'success-foreground',
  'warning',
  'warning-foreground',
  'error',
  'error-foreground',
  'info',
  'info-foreground',
  'border',
]

const FIXED_TOKENS: TokenEntry[] = [
  { name: 'brand', hex: '#023620' },
  { name: 'brand-foreground', hex: '#ffffff' },
]

function hslStringToHex(hsl: string): string | null {
  const m = hsl.trim().match(/^(-?[\d.]+)\s+([\d.]+)%\s+([\d.]+)%$/)
  if (!m) return null
  const h = parseFloat(m[1])
  const s = parseFloat(m[2]) / 100
  const l = parseFloat(m[3]) / 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0')
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`
}

function rgbStringToHex(rgb: string): { hex: string; alpha: number } | null {
  const m = rgb.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\s*\)/)
  if (!m) return null
  const toHex = (n: string) => Math.round(parseFloat(n)).toString(16).padStart(2, '0')
  const alpha = m[4] !== undefined ? parseFloat(m[4]) : 1
  return { hex: `#${toHex(m[1])}${toHex(m[2])}${toHex(m[3])}`, alpha }
}

function buildTokenMap(): TokenEntry[] {
  const styles = getComputedStyle(document.documentElement)
  const entries: TokenEntry[] = [...FIXED_TOKENS]
  for (const name of HSL_TOKENS) {
    const hex = hslStringToHex(styles.getPropertyValue(`--${name}`))
    if (hex) entries.push({ name, hex })
  }
  return entries
}

/**
 * Ferramenta de inspeção de cores — o objetivo deste protótipo é
 * justamente decidir a paleta, então passar o mouse sobre qualquer
 * elemento revela a cor de fundo/texto real e o token do design
 * system que a originou (quando há correspondência).
 */
export function ColorInspector() {
  const [active, setActive] = useState(false)
  const [inspection, setInspection] = useState<Inspection | null>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const tokenMapRef = useRef<TokenEntry[]>([])

  const refreshTokenMap = useCallback(() => {
    tokenMapRef.current = buildTokenMap()
  }, [])

  useEffect(() => {
    document.body.style.cursor = active ? 'crosshair' : ''
    return () => {
      document.body.style.cursor = ''
    }
  }, [active])

  useEffect(() => {
    if (!active) return
    refreshTokenMap()
    const observer = new MutationObserver(refreshTokenMap)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [active, refreshTokenMap])

  useEffect(() => {
    if (!active) {
      setInspection(null)
      return
    }

    function lookup(hex: string): string[] {
      return tokenMapRef.current
        .filter((t) => t.hex.toLowerCase() === hex.toLowerCase())
        .map((t) => t.name)
    }

    function handleMove(e: PointerEvent) {
      setCursor({ x: e.clientX, y: e.clientY })
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      if (!el || el.closest('[data-color-inspector-ui]')) {
        setInspection(null)
        return
      }

      let bgEl: HTMLElement | null = el
      let bgSwatch: Swatch | null = null
      for (let i = 0; i < 8 && bgEl; i++) {
        const parsed = rgbStringToHex(getComputedStyle(bgEl).backgroundColor)
        if (parsed && parsed.alpha > 0) {
          bgSwatch = { ...parsed, tokenNames: lookup(parsed.hex) }
          break
        }
        bgEl = bgEl.parentElement
      }

      const textParsed = rgbStringToHex(getComputedStyle(el).color) ?? { hex: '#000000', alpha: 1 }
      const textSwatch: Swatch = { ...textParsed, tokenNames: lookup(textParsed.hex) }

      setInspection({ rect: (bgEl ?? el).getBoundingClientRect(), bg: bgSwatch, text: textSwatch })
    }

    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [active])

  return (
    <>
      <button
        data-color-inspector-ui
        onClick={() => setActive((a) => !a)}
        aria-pressed={active}
        aria-label={active ? 'Desativar inspetor de cores' : 'Ativar inspetor de cores'}
        className={`absolute bottom-24 right-3 z-50 flex h-8 w-8 items-center justify-center rounded-full shadow-soft transition active:scale-90 ${
          active ? 'bg-error text-error-foreground' : 'bg-black/35 text-white backdrop-blur'
        }`}
      >
        {active ? <X size={15} strokeWidth={2.2} /> : <Pipette size={15} strokeWidth={2} />}
      </button>

      {active && inspection && (
        <>
          <div
            className="pointer-events-none fixed z-40 rounded-md ring-2 ring-white shadow-[0_0_0_9999px_rgba(0,0,0,0.35)] transition-all duration-100"
            style={{
              top: inspection.rect.top,
              left: inspection.rect.left,
              width: inspection.rect.width,
              height: inspection.rect.height,
            }}
          />
          <Tooltip cursor={cursor} inspection={inspection} />
        </>
      )}
    </>
  )
}

function SwatchRow({ label, swatch }: { label: string; swatch: Swatch }) {
  const shown = swatch.tokenNames.slice(0, 2)
  const extra = swatch.tokenNames.length - shown.length

  return (
    <div className="flex items-start gap-2">
      <span
        className="mt-0.5 h-4 w-4 shrink-0 rounded border border-white/20"
        style={{ backgroundColor: swatch.hex, opacity: Math.max(swatch.alpha, 0.15) }}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-baseline gap-1.5">
          <span className="w-8 shrink-0 font-ui text-[10.5px] text-white/55">{label}</span>
          <span className="font-ui text-[12px] font-semibold tabular-nums">
            {swatch.hex.toUpperCase()}
            {swatch.alpha < 1 ? ` · ${Math.round(swatch.alpha * 100)}%` : ''}
          </span>
        </div>
        {shown.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {shown.map((name) => (
              <span
                key={name}
                className="rounded bg-white/10 px-1.5 py-0.5 font-ui text-[10px] text-white/80"
              >
                {name}
              </span>
            ))}
            {extra > 0 && (
              <span className="rounded px-1.5 py-0.5 font-ui text-[10px] text-white/45">
                +{extra}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function Tooltip({
  cursor,
  inspection,
}: {
  cursor: { x: number; y: number }
  inspection: Inspection
}) {
  const width = 230
  const left = Math.max(8, Math.min(cursor.x + 16, window.innerWidth - width - 8))
  const top = Math.max(8, Math.min(cursor.y + 16, window.innerHeight - 116))

  return (
    <div
      data-color-inspector-ui
      className="pointer-events-none fixed z-40 flex flex-col gap-1.5 rounded-lg bg-neutral-950/95 px-3 py-2.5 text-white shadow-float"
      style={{ left, top, width }}
    >
      {inspection.bg && <SwatchRow label="fundo" swatch={inspection.bg} />}
      <SwatchRow label="texto" swatch={inspection.text} />
    </div>
  )
}
