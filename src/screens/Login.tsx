import { motion } from 'framer-motion'
import { ChevronRight, Lock, CreditCard, CircleHelp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/StatusBar'
import { AuvpLogo, PixGlyph } from '../components/Brand'
import { ColorTag } from '../components/ColorTag'
import { user } from '../data/mock'

const quickActions = [
  { icon: Lock, label: 'Token' },
  { icon: PixGlyph, label: 'Pix e transferir' },
  { icon: CreditCard, label: 'Cartão virtual' },
  { icon: CircleHelp, label: 'Ajuda' },
]

export function Login() {
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col bg-brand text-brand-foreground">
      <StatusBar tone="brand" />

      <div className="flex items-center justify-between px-6 pt-6">
        <AuvpLogo variant="branca" className="h-16 w-auto" />
        <ColorTag token="brand" />
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 -mt-10">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="font-display text-[34px] leading-[1.12] font-semibold tracking-tight"
        >
          Que bom te ver
          <br />
          por aqui, {user.firstName}!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="mt-9"
        >
          <div className="relative w-full max-w-[180px]">
            <button
              onClick={() => navigate('/home')}
              className="w-full rounded-xl bg-white py-3.5 font-ui font-semibold text-brand shadow-soft transition active:scale-[0.97]"
            >
              Entrar
            </button>
            <ColorTag token="brand-foreground" className="absolute -bottom-2 -right-2" />
          </div>

          <div className="mt-7 flex flex-col gap-4 font-ui text-[15px]">
            <button className="flex items-center gap-1 text-left text-white/95 transition active:opacity-70">
              Entrar com outra conta <ChevronRight size={16} strokeWidth={2.5} />
            </button>
            <button className="flex items-center gap-1 text-left text-white/95 transition active:opacity-70">
              Iniciar novo cadastro <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="safe-bottom grid grid-cols-4 gap-1 border-t border-white/15 px-2 pt-4 pb-5">
        {quickActions.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-2 rounded-xl py-1 transition active:scale-95 active:bg-white/10"
          >
            <Icon size={22} strokeWidth={1.8} />
            <span className="text-center font-ui text-[11.5px] leading-tight text-white/95">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
