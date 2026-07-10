import { motion } from 'framer-motion'
import { X, ChevronRight, Bell, Search, Eye } from 'lucide-react'
import { StatusBar } from './StatusBar'
import { PixGlyph } from './Brand'
import { ScanLine, Settings } from 'lucide-react'
import { menuSections } from '../data/mock'
import { formatBRL } from '../lib/format'
import { user } from '../data/mock'

const bandStyles = [
  'bg-brand-100 text-ink',
  'bg-brand-200 text-ink',
  'bg-brand-400 text-white',
  'bg-brand-600 text-white',
  'bg-brand-800 text-white',
  'bg-brand-950 text-white',
]

export function MenuOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 32, stiffness: 300 }}
      className="absolute inset-0 z-40 flex flex-col overflow-y-auto bg-brand-100"
    >
      <div className="bg-white">
        <StatusBar tone="dark" />
        <div className="flex items-center justify-between px-6 pb-4 pt-2">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 font-ui text-[13px] font-semibold text-brand-900">
              {user.initials}
            </div>
          </div>
          <div className="flex items-center gap-4 text-ink">
            <Eye size={20} strokeWidth={1.8} />
            <div className="relative">
              <Bell size={20} strokeWidth={1.8} />
              <span className="absolute -right-1.5 -top-1.5 rounded-full bg-error px-1 text-[9px] font-bold text-white">
                9+
              </span>
            </div>
            <Search size={20} strokeWidth={1.8} />
            <button
              onClick={onClose}
              aria-label="Fechar menu"
              className="rounded-full bg-brand-50 p-1.5 transition active:scale-90"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 border-t border-hairline px-6 py-3.5 font-ui text-[13.5px] font-medium text-ink">
          <span className="flex items-center gap-2">
            <PixGlyph size={15} /> Pix e transferir
          </span>
          <span className="flex items-center gap-2">
            <ScanLine size={16} strokeWidth={1.8} /> Pagar
          </span>
          <span className="ml-auto flex items-center gap-2 text-ink-soft">
            <Settings size={16} strokeWidth={1.8} /> Configurações
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        {menuSections.map((section, i) => (
          <button
            key={section.id}
            className={`flex flex-1 min-h-[104px] items-center justify-between px-6 py-5 text-left transition active:brightness-95 ${bandStyles[i]}`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-[20px] font-semibold">{section.title}</span>
                {section.badge && (
                  <span className="rounded-full bg-black/10 px-2 py-0.5 font-ui text-[10px] font-semibold uppercase tracking-wide">
                    {section.badge}
                  </span>
                )}
              </div>
              {section.helper && (
                <p className="mt-1 font-body text-[13px] opacity-75">{section.helper}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {section.amount !== undefined && (
                <div className="text-right">
                  <div className="font-ui text-[16px] font-semibold tabular-nums">
                    {formatBRL(section.amount)}
                  </div>
                  <div className="font-body text-[11.5px] opacity-70">{section.amountLabel}</div>
                </div>
              )}
              <ChevronRight size={18} strokeWidth={2} className="opacity-60" />
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  )
}
