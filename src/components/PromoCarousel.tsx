import { useRef, useState } from 'react'
import { Heart, Sparkles, Send } from 'lucide-react'
import { promoSlides } from '../data/mock'

const icons = { pix: Send, heart: Heart, sparkles: Sparkles }

export function PromoCarousel() {
  const [index, setIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  function onScroll() {
    const el = trackRef.current
    if (!el) return
    const i = Math.round(el.scrollLeft / el.clientWidth)
    if (i !== index) setIndex(i)
  }

  return (
    <div
      ref={trackRef}
      onScroll={onScroll}
      className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
    >
      {promoSlides.map((slide) => {
        const Icon = icons[slide.icon]
        return (
          <div key={slide.id} className="w-full shrink-0 snap-center px-6 py-6">
            <div className="relative overflow-hidden rounded-2xl bg-secondary px-6 py-7 text-secondary-foreground shadow-card">
              <div className="absolute -right-6 -top-6 flex h-28 w-28 items-center justify-center rounded-full bg-white/5">
                <Icon size={34} strokeWidth={1.5} className="text-secondary-foreground/60" />
              </div>
              <p className="max-w-[75%] font-display text-[19px] font-medium leading-snug">
                {slide.title}
              </p>
              <button className="mt-5 rounded-lg bg-secondary-foreground px-4 py-2.5 font-ui text-[13px] font-semibold text-secondary transition active:scale-95">
                {slide.cta}
              </button>
              <div className="mt-5 flex gap-1.5">
                {promoSlides.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index
                        ? 'w-4 bg-secondary-foreground'
                        : 'w-1.5 bg-secondary-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
