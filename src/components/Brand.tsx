/**
 * Lockup oficial de cobrand AUVP + BTG Pactual, publicado no repositório
 * do design system (armandocustodio-ds/designsystemauvp). Usar sempre a
 * peça inteira — não recompor os dois logos separadamente.
 */
export function CobrandLockup({
  variant = 'branco',
  className = '',
}: {
  variant?: 'branco' | 'preto'
  className?: string
}) {
  return (
    <img
      src={`/brand/auvp-btg-${variant}.svg`}
      alt="AUVP Capital em parceria com BTG Pactual"
      className={className}
    />
  )
}

export function PixGlyph({
  size = 16,
  className = '',
}: {
  size?: number
  className?: string
  strokeWidth?: number
}) {
  const d = size * 0.32
  const edge = size * 0.09
  const base = {
    position: 'absolute' as const,
    width: d,
    height: d,
    borderRadius: 3,
    background: 'currentColor',
  }
  return (
    <div className={className} style={{ position: 'relative', width: size, height: size }} aria-hidden>
      <span style={{ ...base, top: edge, left: '50%', transform: 'translateX(-50%) rotate(45deg)' }} />
      <span style={{ ...base, bottom: edge, left: '50%', transform: 'translateX(-50%) rotate(45deg)' }} />
      <span style={{ ...base, left: edge, top: '50%', transform: 'translateY(-50%) rotate(45deg)' }} />
      <span style={{ ...base, right: edge, top: '50%', transform: 'translateY(-50%) rotate(45deg)' }} />
    </div>
  )
}
