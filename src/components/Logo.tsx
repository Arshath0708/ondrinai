import { ASSETS } from '@/config/site';

interface LogoProps {
  className?: string;
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
  variant = 'dark',
  showText = true,
  size = 'md',
}: LogoProps) {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-cream' : 'text-forest';
  const subTextColor = isLight ? 'text-cream/75' : 'text-charcoal/65';
  const imgBorder = isLight ? 'border-cream/30 ring-1 ring-cream/20' : 'border-forest/20 ring-1 ring-forest/10';

  const sizeClasses = {
    sm: { img: 'w-10 h-10', text: 'text-xl', sub: 'text-[10px]' },
    md: { img: 'w-12 h-12 sm:w-14 sm:h-14', text: 'text-2xl sm:text-3xl', sub: 'text-xs' },
    lg: { img: 'w-16 h-16 sm:w-20 sm:h-20', text: 'text-3xl sm:text-4xl', sub: 'text-xs sm:text-sm' },
    xl: { img: 'w-20 h-20 sm:w-24 sm:h-24', text: 'text-4xl sm:text-5xl', sub: 'text-sm' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      <img
        src={ASSETS.logo}
        alt="ONDRINAI Logo"
        className={`${sizeClasses.img} rounded-full object-cover shadow-md border ${imgBorder} shrink-0`}
      />
      {showText && (
        <div className="flex flex-col justify-center">
          <span
            className={`font-serif font-bold tracking-tight leading-none ${sizeClasses.text} ${textColor}`}
          >
            ONDRINAI
          </span>
          <span
            className={`font-sans uppercase tracking-editorial font-semibold leading-tight mt-1 ${sizeClasses.sub} ${subTextColor}`}
          >
            Madurai
          </span>
        </div>
      )}
    </div>
  );
}
