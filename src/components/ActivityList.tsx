import { Calendar, SlidersHorizontal, ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { transactions } from '../data/mock'
import { formatBRL } from '../lib/format'

export function ActivityList() {
  const scheduledTotal = 218.07

  return (
    <div className="bg-brand-50 px-6 pb-32 pt-7">
      <h2 className="font-display text-[19px] font-semibold text-ink">Atividades</h2>

      <button className="mt-4 flex w-full items-center gap-3.5 rounded-2xl bg-white p-4 text-left shadow-soft transition active:scale-[0.99]">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800">
          <Calendar size={20} strokeWidth={1.8} />
        </div>
        <div>
          <p className="font-ui text-[14.5px] font-medium text-ink">Agendamentos</p>
          <p className="font-body text-[13px] text-ink-soft">
            1 a pagar no total {formatBRL(scheduledTotal)}
          </p>
        </div>
      </button>

      <div className="mt-7 flex items-center justify-between">
        <span className="font-ui text-[13px] font-medium text-ink-soft">Ontem · 09/Jul</span>
        <button className="flex items-center gap-1.5 font-ui text-[13px] font-medium text-brand-800">
          Filtrar
          <SlidersHorizontal size={14} strokeWidth={2} />
        </button>
      </div>

      <div className="mt-3 divide-y divide-hairline overflow-hidden rounded-2xl bg-white shadow-soft">
        {transactions.map((t) => (
          <div key={t.id} className="flex items-center gap-3.5 p-4">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                t.direction === 'in' ? 'bg-success/10 text-success' : 'bg-brand-100 text-brand-800'
              }`}
            >
              {t.direction === 'in' ? (
                <ArrowDownLeft size={18} strokeWidth={2} />
              ) : (
                <ArrowUpRight size={18} strokeWidth={2} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-ui text-[14px] font-medium text-ink">{t.title}</p>
              <p className="font-body text-[12.5px] text-ink-soft">{t.subtitle}</p>
            </div>
            <span
              className={`shrink-0 font-ui text-[14px] font-semibold tabular-nums ${
                t.direction === 'in' ? 'text-success' : 'text-ink'
              }`}
            >
              {t.direction === 'in' ? '+ ' : '- '}
              {formatBRL(t.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
