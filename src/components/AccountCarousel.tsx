import { useRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { carouselSlides, type CardTone } from '../data/mock'
import { formatBRL } from '../lib/format'

const toneBg: Record<CardTone, string> = {
  mint: 'from-brand-300 via-brand-500 to-brand-700',
  forest: 'from-brand-400 via-brand-600 to-brand-800',
  deep: 'from-brand-600 via-brand-800 to-brand-950',
  olive: 'from-brand-500 via-brand-700 to-brand-900',
  navy: 'from-navy-900 via-navy-950 to-brand-950',
}

function Masked({ digits = 6 }: { digits?: number }) {
  return <span className="tracking-[3px]">{'•'.repeat(digits)}</span>
}

export function AccountCarousel() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  function onScroll() {
    const el = trackRef.current
    if (!el) return
    const i = Math.round(el.scrollLeft / el.clientWidth)
    if (i !== index) setIndex(i)
  }

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
      >
        {carouselSlides.map((slide) => (
          <div key={slide.id} className="w-full shrink-0 snap-center px-6">
            <div
              className={`bg-gradient-to-br ${toneBg[slide.tone]} -mx-6 px-6 rounded-2xl`}
            >
              <div className="flex items-center gap-2 pt-1">
                <h2 className="font-display text-[21px] font-semibold">{slide.title}</h2>
                {slide.badge && (
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-ui font-semibold uppercase tracking-wide">
                    {slide.badge}
                  </span>
                )}
              </div>

              <p className="mt-5 font-ui text-[13px] text-white/75">{slide.amountLabel}</p>
              <div className="mt-1 flex items-center justify-between">
                <div className="font-display text-[30px] font-bold tabular-nums">
                  {visible ? (
                    formatBRL(slide.amount)
                  ) : (
                    <>
                      R$ <Masked />
                    </>
                  )}
                </div>
                <button
                  aria-label={visible ? 'Ocultar saldo' : 'Mostrar saldo'}
                  onClick={() => setVisible((v) => !v)}
                  className="rounded-full p-2 transition active:scale-90 active:bg-white/10"
                >
                  {visible ? (
                    <EyeOff size={20} strokeWidth={1.8} />
                  ) : (
                    <Eye size={20} strokeWidth={1.8} />
                  )}
                </button>
              </div>

              {slide.progress && (
                <div className="mt-5">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-sky-400"
                      style={{
                        width: `${Math.min(
                          100,
                          (slide.progress.used / slide.progress.total) * 100,
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between font-ui text-[12px] text-white/75">
                    <span>
                      {visible ? formatBRL(slide.progress.used) : <>R$ <Masked digits={5} /></>}
                      <br />
                      Utilizado
                    </span>
                    <span className="text-right">
                      {visible ? (
                        formatBRL(slide.progress.total - slide.progress.used)
                      ) : (
                        <>
                          R$ <Masked digits={5} />
                        </>
                      )}
                      <br />
                      Disponível
                    </span>
                  </div>
                </div>
              )}

              {slide.secondaryLines && (
                <div className="mt-4 divide-y divide-white/10 border-t border-white/10 text-[14px]">
                  {slide.secondaryLines.map((line) => (
                    <div key={line.label} className="flex items-center justify-between py-2.5">
                      <span className="font-ui text-white/75">{line.label}</span>
                      <span className="font-ui font-medium tabular-nums">
                        {visible ? formatBRL(line.amount) : <>R$ <Masked /></>}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex items-center justify-between pb-6">
                <button className="rounded-xl border border-white/40 px-4 py-2.5 font-ui text-[13px] font-medium transition active:scale-95 active:bg-white/10">
                  {slide.cta}
                </button>
                <div className="flex gap-1.5">
                  {carouselSlides.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/35'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
