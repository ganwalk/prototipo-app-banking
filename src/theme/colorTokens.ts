import { useEffect, useState } from 'react'

export const FIXED_TOKEN_HEX: Record<string, string> = {
  brand: '#023620',
  'brand-foreground': '#ffffff',
  'brand-secondary': '#3e8555',
}

export function hslStringToHex(hsl: string): string | null {
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

export function resolveTokenHex(name: string): string {
  const fixed = FIXED_TOKEN_HEX[name]
  if (fixed) return fixed
  if (typeof document === 'undefined') return '#000000'
  const raw = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`)
  return hslStringToHex(raw) ?? '#000000'
}

export function isDarkHex(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.55
}

/** Recomputa quando o tema (classe .dark) muda, já que os tokens são CSS vars. */
export function useTokenHex(name: string): string {
  const [hex, setHex] = useState(() => resolveTokenHex(name))

  useEffect(() => {
    setHex(resolveTokenHex(name))
    const observer = new MutationObserver(() => setHex(resolveTokenHex(name)))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [name])

  return hex
}
