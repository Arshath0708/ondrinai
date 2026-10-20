import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { ActivityCategory } from '@/types';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
}

/**
 * Wraps children with a scroll-triggered fade-up animation.
 */
export function Reveal({ children, className = '', delay = 0, as = 'div' }: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const Tag = as;

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`animate-on-scroll ${isVisible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const textColor = light ? 'text-cream' : 'text-slate-900 dark:text-cream';
  const introColor = light ? 'text-cream/70' : 'text-slate-600 dark:text-slate-300';
  const eyebrowColor = light ? 'text-sage' : 'text-emerald-700 dark:text-emerald-400';

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow mb-4 ${eyebrowColor}`}>{eyebrow}</p>
      )}
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-medium ${textColor} text-balance`}>
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-base sm:text-lg ${introColor} text-pretty leading-relaxed`}>
          {intro}
        </p>
      )}
    </div>
  );
}

interface CategoryBadgeProps {
  category: ActivityCategory;
  light?: boolean;
}

export function CategoryBadge({ category, light = false }: CategoryBadgeProps) {
  const styles: Record<ActivityCategory, string> = light
    ? {
        FEED: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
        PLANT: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
        BUILD: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
        RESPOND: 'bg-sky-500/20 text-sky-300 border-sky-400/30',
        WATER: 'bg-sky-500/20 text-sky-300 border-sky-400/30',
      }
    : {
        FEED: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800',
        PLANT: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800',
        BUILD: 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-200/80 dark:border-amber-800',
        RESPOND: 'bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-300 border-sky-200/80 dark:border-sky-800',
        WATER: 'bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-300 border-sky-200/80 dark:border-sky-800',
      };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase border shadow-xs ${styles[category]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 mr-1.5" />
      {category}
    </span>
  );
}

interface CTASectionProps {
  title: string;
  copy: string;
  primaryLabel: string;
  primaryLink: string;
  secondaryLabel?: string;
  secondaryLink?: string;
  variant?: 'dark' | 'light';
}

export function CTASection({
  title,
  copy,
  primaryLabel,
  primaryLink,
  secondaryLabel,
  secondaryLink,
  variant = 'dark',
}: CTASectionProps) {
  const isDark = variant === 'dark';

  return (
    <section className={`relative overflow-hidden py-20 sm:py-28 ${isDark ? 'bg-[#02140C] text-white border-t border-emerald-500/20' : 'bg-slate-50 dark:bg-[#02140C] text-slate-900 dark:text-white border-t border-slate-200/80 dark:border-white/10'}`}>
      {/* Solarpunk subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="container-max container-px text-center relative z-10">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Direct Citizen Action &bull; 100% to the Ground</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-balance max-w-3xl mx-auto">
            {title}
          </h2>
          <p className="mt-6 text-base sm:text-lg max-w-2xl mx-auto text-pretty leading-relaxed text-slate-600 dark:text-slate-300">
            {copy}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryLink.startsWith('/') ? (
              <Link to={primaryLink} className="btn-donate py-3.5 px-7 rounded-xl text-sm font-bold shadow-lg hover:scale-105 transition-all">
                {primaryLabel}
              </Link>
            ) : (
              <a href={primaryLink} className="btn-donate py-3.5 px-7 rounded-xl text-sm font-bold shadow-lg hover:scale-105 transition-all" target={primaryLink.startsWith('http') ? '_blank' : undefined} rel={primaryLink.startsWith('http') ? 'noopener noreferrer' : undefined}>
                {primaryLabel}
              </a>
            )}
            {secondaryLabel && secondaryLink && (
              secondaryLink.startsWith('/') ? (
                <Link to={secondaryLink} className="px-6 py-3.5 rounded-xl border border-slate-300 dark:border-emerald-500/30 text-slate-700 dark:text-emerald-300 hover:bg-slate-100 dark:hover:bg-emerald-500/10 text-sm font-semibold transition-colors">
                  {secondaryLabel}
                </Link>
              ) : (
                <a href={secondaryLink} className="px-6 py-3.5 rounded-xl border border-slate-300 dark:border-emerald-500/30 text-slate-700 dark:text-emerald-300 hover:bg-slate-100 dark:hover:bg-emerald-500/10 text-sm font-semibold transition-colors">
                  {secondaryLabel}
                </a>
              )
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  subtitle?: string;
  variant?: 'cream' | 'forest';
}

export function PageHero({ eyebrow, title, intro, subtitle, variant = 'cream' }: PageHeroProps) {
  const isForest = variant === 'forest';
  const description = intro || subtitle;

  return (
    <section className={`relative pt-32 pb-16 sm:pt-36 sm:pb-20 border-b ${isForest ? 'bg-[#02140C] text-white border-emerald-500/20' : 'bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#03150D] dark:via-[#02140C] dark:to-[#03150D] text-slate-900 dark:text-white border-slate-200/80 dark:border-white/10'}`}>
      <div className="container-max container-px relative z-10">
        <Reveal>
          {eyebrow && (
            <p className={`eyebrow mb-5 font-mono tracking-widest text-xs uppercase ${isForest ? 'text-emerald-400' : 'text-emerald-700 dark:text-emerald-400 font-bold'}`}>{eyebrow}</p>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-balance max-w-3xl">
            {title}
          </h1>
          {description && (
            <p className={`mt-6 text-lg sm:text-xl max-w-2xl text-pretty leading-relaxed ${isForest ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'}`}>
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export const PageHeader = PageHero;

/**
 * Botanical decorative line — a subtle organic SVG element.
 */
export function BotanicalDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px w-12 bg-emerald-500/30" />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-emerald-500">
        <path
          d="M10 2C10 2 6 6 6 10C6 14 10 18 10 18M10 2C10 2 14 6 14 10C14 14 10 18 10 18M10 2V18M4 8C4 8 7 9 10 9M16 8C16 8 13 9 10 9M4 12C4 12 7 11 10 11M16 12C16 12 13 11 10 11"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
      <div className="h-px w-12 bg-emerald-500/30" />
    </div>
  );
}
