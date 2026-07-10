import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Bell, Search, ChevronDown, ScanLine, Settings, Menu as MenuIcon } from 'lucide-react'
import { StatusBar } from '../components/StatusBar'
import { PixGlyph } from '../components/Brand'
import { ColorTag } from '../components/ColorTag'
import { AccountCarousel } from '../components/AccountCarousel'
import { PromoCarousel } from '../components/PromoCarousel'
import { ActivityList } from '../components/ActivityList'
import { MenuOverlay } from '../components/MenuOverlay'
import { ThemeToggle } from '../theme/ThemeToggle'
import { user } from '../data/mock'

export function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const heroBg = slideIndex % 2 === 0 ? 'bg-brand' : 'bg-brand-secondary'
  const heroToken = slideIndex % 2 === 0 ? 'brand' : 'brand-secondary'

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <div className="no-scrollbar flex-1 overflow-y-auto bg-background">
        <div
          className={`relative ${heroBg} pb-2 text-brand-foreground transition-colors duration-500`}
        >
          <StatusBar tone="brand" />

          <div className="flex items-center justify-between px-6 pt-3">
            <button className="flex items-center gap-3 text-left transition active:opacity-80">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 font-ui text-[13px] font-semibold">
                {user.initials}
              </div>
              <span className="font-ui text-[15px] leading-tight">
                Olá,
                <br />
                <span className="inline-flex items-center gap-1 font-medium">
                  {user.firstName} <ChevronDown size={15} strokeWidth={2.5} />
                </span>
              </span>
            </button>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button aria-label="Notificações" className="relative">
                <Bell size={21} strokeWidth={1.8} />
                <span className="absolute -right-1.5 -top-1.5 rounded-full bg-white px-1 text-[9px] font-bold text-error">
                  9+
                </span>
              </button>
              <button aria-label="Buscar">
                <Search size={21} strokeWidth={1.8} />
              </button>
            </div>
          </div>

          <div className="mt-6">
            <AccountCarousel onSlideChange={setSlideIndex} />
          </div>

          <div className="mt-1 flex items-center gap-6 border-t border-white/15 px-6 py-4 font-ui text-[13.5px] font-medium">
            <button className="flex items-center gap-2 transition active:opacity-70">
              <PixGlyph size={16} /> Pix e transferir
            </button>
            <button className="flex items-center gap-2 transition active:opacity-70">
              <ScanLine size={17} strokeWidth={1.8} /> Pagar
            </button>
            <span className="h-4 w-px bg-white/25" />
            <button className="flex items-center gap-2 text-white/85 transition active:opacity-70">
              <Settings size={16} strokeWidth={1.8} /> Configurações
            </button>
          </div>

          <ColorTag token={heroToken} className="absolute bottom-3 right-3" />
        </div>

        <PromoCarousel />

        <ActivityList />
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <button
          onClick={() => setMenuOpen(true)}
          className="relative flex items-center gap-2.5 rounded-full bg-foreground px-6 py-3.5 font-ui text-[14px] font-semibold text-background shadow-float transition active:scale-95"
        >
          <MenuIcon size={17} strokeWidth={2} /> Menu
          <ColorTag token="foreground" className="absolute -bottom-2 -right-2" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}
