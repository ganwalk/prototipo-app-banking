import { Calendar, SlidersHorizontal, ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { transactions } from '../data/mock'
import { formatBRL } from '../lib/format'
import { ColorTag } from './ColorTag'

export function ActivityList() {
  const scheduledTotal = 218.07

  return (
    <div className="bg-background px-6 pb-32 pt-7">
      <div className="flex items-center gap-2">
        <h2 className="font-display text-[19px] font-semibold text-foreground">Atividades</h2>
        <ColorTag token="background" />
      </div>

      <button className="relative mt-4 flex w-full items-center gap-3.5 rounded-2xl bg-card p-4 text-left shadow-soft transition active:scale-[0.99]">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted text-primary">
          <Calendar size={20} strokeWidth={1.8} />
        </div>
        <div>
          <p className="font-ui text-[14.5px] font-medium text-foreground">Agendamentos</p>
          <p className="font-body text-[13px] text-muted-foreground">
            1 a pagar no total {formatBRL(scheduledTotal)}
          </p>
        </div>
        <ColorTag token="card" className="absolute -bottom-2 -right-2" />
      </button>

      <div className="mt-7 flex items-center justify-between">
        <span className="font-ui text-[13px] font-medium text-muted-foreground">
          Ontem · 09/Jul
        </span>
        <button className="flex items-center gap-1.5 font-ui text-[13px] font-medium text-primary">
          Filtrar
          <SlidersHorizontal size={14} strokeWidth={2} />
        </button>
      </div>

      <div className="relative mt-3">
        <ColorTag token="card" className="absolute right-3 top-3 z-10" />
        <div className="divide-y divide-border overflow-hidden rounded-2xl bg-card shadow-soft">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center gap-3.5 p-4">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  t.direction === 'in' ? 'bg-success/10 text-success' : 'bg-muted text-primary'
                }`}
              >
                {t.direction === 'in' ? (
                  <ArrowDownLeft size={18} strokeWidth={2} />
                ) : (
                  <ArrowUpRight size={18} strokeWidth={2} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-ui text-[14px] font-medium text-foreground">
                  {t.title}
                </p>
                <p className="font-body text-[12.5px] text-muted-foreground">{t.subtitle}</p>
              </div>
              <span
                className={`shrink-0 font-ui text-[14px] font-semibold tabular-nums ${
                  t.direction === 'in' ? 'text-success' : 'text-foreground'
                }`}
              >
                {t.direction === 'in' ? '+ ' : '- '}
                {formatBRL(t.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
