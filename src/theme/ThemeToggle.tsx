import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
      className={`transition active:scale-90 ${className}`}
    >
      {theme === 'dark' ? (
        <Sun size={21} strokeWidth={1.8} />
      ) : (
        <Moon size={21} strokeWidth={1.8} />
      )}
    </button>
  )
}
