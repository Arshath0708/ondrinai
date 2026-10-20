import { ASSETS } from '@/config/site';

interface LogoProps {
  className?: string;
  imgClassName?: string;
  textClassName?: string;
  variant?: 'dark' | 'light';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * ONDRINAI official logo component.
 * Displays the authentic original logo image from public/assets paired with the editorial wordmark.
 */
export function Logo({
  className = '',
  imgClassName = '',
  textClassName = '',
  variant = 'dark',
  showText = true,
  size = 'md',
}: LogoProps) {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-slate-900 dark:text-white';
  const subTextColor = isLight ? 'text-slate-300' : 'text-slate-500 dark:text-emerald-400';

  const sizeClasses = {
    sm: { img: 'w-8 h-8 sm:w-9 sm:h-9', text: 'text-sm sm:text-base', sub: 'text-[9px]' },
    md: { img: 'w-10 h-10 sm:w-11 sm:h-11', text: 'text-base sm:text-lg', sub: 'text-[9px] sm:text-[10px]' },
    lg: { img: 'w-14 h-14 sm:w-16 sm:h-16', text: 'text-2xl sm:text-3xl', sub: 'text-xs sm:text-sm' },
    xl: { img: 'w-20 h-20 sm:w-24 sm:h-24', text: 'text-3xl sm:text-4xl', sub: 'text-sm' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <img
        src={ASSETS.logo}
        alt="ONDRINAI Logo"
        className={`${sizeClasses.img} object-contain rounded-full shrink-0 ${imgClassName}`}
      />
      {showText && (
        <div className="flex flex-col justify-center">
          <span
            className={`font-serif font-bold tracking-tight leading-none ${sizeClasses.text} ${textColor} ${textClassName}`}
          >
            ONDRINAI
          </span>
          <span
            className={`font-sans uppercase tracking-editorial font-semibold leading-tight mt-0.5 ${sizeClasses.sub} ${subTextColor}`}
          >
            Madurai
          </span>
        </div>
      )}
    </div>
  );
}
