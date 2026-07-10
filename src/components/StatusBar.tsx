import { useEffect, useState } from 'react'
import { SignalHigh, Wifi, BatteryFull } from 'lucide-react'
import { formatTime } from '../lib/format'

export function StatusBar({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const color = tone === 'light' ? 'text-white' : 'text-ink'

  return (
    <div
      className={`safe-top flex items-center justify-between px-6 pt-2 pb-1 text-[13px] font-medium ${color}`}
    >
      <span className="tabular-nums">{formatTime(now)}</span>
      <div className="flex items-center gap-1.5">
        <SignalHigh size={15} strokeWidth={2.4} />
        <Wifi size={15} strokeWidth={2.4} />
        <BatteryFull size={17} strokeWidth={2} />
      </div>
    </div>
  )
}
