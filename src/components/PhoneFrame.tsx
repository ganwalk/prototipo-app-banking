import type { ReactNode } from 'react'

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh w-full bg-[#0c1210] flex items-center justify-center sm:p-10">
      <div
        className="relative w-full h-svh bg-background overflow-hidden
        sm:h-[880px] sm:max-h-[94svh] sm:w-[412px] sm:rounded-[3rem] sm:border-[10px] sm:border-neutral-950
        sm:shadow-[0_50px_120px_-24px_rgba(0,0,0,0.65)] flex flex-col"
      >
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 z-50 h-6 w-28 bg-neutral-950 rounded-b-2xl" />
        <div className="relative flex-1 min-h-0 flex flex-col">{children}</div>
      </div>
    </div>
  )
}
