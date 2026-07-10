import { motion } from 'framer-motion'
import {
  X,
  ChevronRight,
  Bell,
  Search,
  ScanLine,
  Settings,
  Wallet,
  CreditCard,
  HandCoins,
  TrendingUp,
  Globe,
  ShieldCheck,
} from 'lucide-react'
import { StatusBar } from './StatusBar'
import { PixGlyph } from './Brand'
import { ColorTag } from './ColorTag'
import { ThemeToggle } from '../theme/ThemeToggle'
import { menuSections } from '../data/mock'
import { formatBRL } from '../lib/format'
import { user } from '../data/mock'

const sectionIcons: Record<string, typeof Wallet> = {
  conta: Wallet,
  cartao: CreditCard,
  emprestimos: HandCoins,
  investimentos: TrendingUp,
  internacional: Globe,
  seguros: ShieldCheck,
}

export function MenuOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 32, stiffness: 300 }}
      className="absolute inset-0 z-40 flex flex-col overflow-y-auto bg-background text-foreground"
    >
      <ColorTag token="background" className="fixed bottom-3 left-3 z-50" />
      <ColorTag token="card" className="fixed bottom-3 right-3 z-50" />

      <div className="bg-card">
        <StatusBar />
        <div className="flex items-center justify-between px-6 pb-4 pt-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted font-ui text-[13px] font-semibold text-primary">
            {user.initials}
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="relative">
              <Bell size={20} strokeWidth={1.8} />
              <span className="absolute -right-1.5 -top-1.5 rounded-full bg-error px-1 text-[9px] font-bold text-error-foreground">
                9+
              </span>
            </div>
            <Search size={20} strokeWidth={1.8} />
            <button
              onClick={onClose}
              aria-label="Fechar menu"
              className="rounded-full bg-muted p-1.5 transition active:scale-90"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 border-t border-border px-6 py-3.5 font-ui text-[13.5px] font-medium">
          <span className="flex items-center gap-2">
            <PixGlyph size={15} /> Pix e transferir
          </span>
          <span className="flex items-center gap-2">
            <ScanLine size={16} strokeWidth={1.8} /> Pagar
          </span>
          <span className="ml-auto flex items-center gap-2 text-muted-foreground">
            <Settings size={16} strokeWidth={1.8} /> Configurações
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col divide-y divide-border px-2">
        {menuSections.map((section) => {
          const Icon = sectionIcons[section.id]
          return (
            <button
              key={section.id}
              className="flex items-center gap-3.5 px-4 py-4 text-left transition active:bg-muted"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted text-primary">
                <Icon size={19} strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-ui text-[15px] font-medium">{section.title}</span>
                  {section.badge && (
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 font-ui text-[10px] font-semibold uppercase tracking-wide text-accent">
                      {section.badge}
                    </span>
                  )}
                </div>
                {section.helper && (
                  <p className="mt-0.5 font-body text-[12.5px] text-muted-foreground">
                    {section.helper}
                  </p>
                )}
              </div>
              {section.amount !== undefined && (
                <div className="text-right">
                  <div className="font-ui text-[14.5px] font-semibold tabular-nums">
                    {formatBRL(section.amount)}
                  </div>
                  <div className="font-body text-[11px] text-muted-foreground">
                    {section.amountLabel}
                  </div>
                </div>
              )}
              <ChevronRight size={18} strokeWidth={2} className="shrink-0 text-muted-foreground" />
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
