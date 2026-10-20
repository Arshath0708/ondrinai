import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
        isDark
          ? 'bg-emerald-950/60 border border-emerald-500/30 text-amber-400 hover:text-amber-300 hover:bg-emerald-900/60 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
          : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-emerald-700 hover:bg-slate-200/80 shadow-2xs'
      } ${className}`}
      title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
      aria-label={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? (
        <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400 animate-scale-in" />
      ) : (
        <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-700 animate-scale-in" />
      )}
    </button>
  );
}
