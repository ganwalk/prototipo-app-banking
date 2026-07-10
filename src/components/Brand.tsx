export function AuvpLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <path
          d="M1 13C1 13 6 4 13 4C20 4 25 13 25 13C25 13 20 22 13 22C6 22 1 13 1 13Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="13" cy="13" r="5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="13" cy="13" r="1.8" fill="currentColor" />
      </svg>
      <div className="leading-[0.95]">
        <div className="font-display font-bold tracking-tight text-[19px]">AUVP</div>
        <div className="font-ui text-[9px] tracking-[0.3em] -mt-0.5">CAPITAL</div>
      </div>
    </div>
  )
}

export function BtgBadge({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-full border border-white/70 px-3.5 py-1.5 ${className}`}
    >
      <span className="font-display font-extrabold text-[13px] tracking-tight">btg</span>
      <span className="font-body text-[13px] font-light opacity-90">pactual</span>
    </div>
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
