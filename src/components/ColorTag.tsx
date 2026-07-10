import { isDarkHex, useTokenHex } from '../theme/colorTokens'

/**
 * Etiqueta permanente de cor — deixa o hex do token escrito na tela,
 * sem depender do inspetor por hover. O contraste da própria etiqueta
 * se ajusta automaticamente à cor que ela está rotulando.
 */
export function ColorTag({ token, className = '' }: { token: string; className?: string }) {
  const hex = useTokenHex(token)
  const dark = isDarkHex(hex)
  const toneClasses = dark
    ? 'bg-black/35 text-white'
    : 'bg-white/85 text-neutral-900 shadow-[0_1px_2px_rgba(0,0,0,0.08)]'

  return (
    <span
      className={`pointer-events-none inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-mono text-[10px] font-medium leading-none tracking-wide backdrop-blur-sm ${toneClasses} ${className}`}
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full ring-1 ring-black/10"
        style={{ background: hex }}
      />
      {hex.toUpperCase()}
    </span>
  )
}
