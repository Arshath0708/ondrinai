import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';

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
  const textColor = light ? 'text-cream' : 'text-charcoal';
  const introColor = light ? 'text-cream/70' : 'text-charcoal/70';
  const eyebrowColor = light ? 'text-sage' : 'text-accent-dark';

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
  category: 'FEED' | 'PLANT' | 'BUILD';
  light?: boolean;
}

export function CategoryBadge({ category, light = false }: CategoryBadgeProps) {
  const styles: Record<string, string> = light
    ? {
        FEED: 'bg-cream/15 text-cream border-cream/25',
        PLANT: 'bg-cream/15 text-cream border-cream/25',
        BUILD: 'bg-cream/15 text-cream border-cream/25',
      }
    : {
        FEED: 'bg-sage/30 text-forest border-sage/50',
        PLANT: 'bg-sage/30 text-forest border-sage/50',
        BUILD: 'bg-accent/20 text-forest border-accent/40',
      };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wider uppercase border ${styles[category]}`}
    >
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
    <section className={`${isDark ? 'bg-forest text-cream' : 'bg-cream text-charcoal'} py-20 sm:py-28`}>
      <div className="container-max container-px text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-balance max-w-3xl mx-auto">
            {title}
          </h2>
          <p className={`mt-6 text-base sm:text-lg max-w-2xl mx-auto text-pretty ${isDark ? 'text-cream/75' : 'text-charcoal/70'}`}>
            {copy}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryLink.startsWith('/') ? (
              <Link to={primaryLink} className={isDark ? 'btn-light' : 'btn-primary'}>
                {primaryLabel}
              </Link>
            ) : (
              <a href={primaryLink} className={isDark ? 'btn-light' : 'btn-primary'} target={primaryLink.startsWith('http') ? '_blank' : undefined} rel={primaryLink.startsWith('http') ? 'noopener noreferrer' : undefined}>
                {primaryLabel}
              </a>
            )}
            {secondaryLabel && secondaryLink && (
              secondaryLink.startsWith('/') ? (
                <Link to={secondaryLink} className={isDark ? 'btn-outline-light' : 'btn-secondary'}>
                  {secondaryLabel}
                </Link>
              ) : (
                <a href={secondaryLink} className={isDark ? 'btn-outline-light' : 'btn-secondary'}>
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
  variant?: 'cream' | 'forest';
}

export function PageHero({ eyebrow, title, intro, variant = 'cream' }: PageHeroProps) {
  const isForest = variant === 'forest';

  return (
    <section className={`${isForest ? 'bg-forest text-cream' : 'bg-cream text-charcoal'} pt-32 pb-16 sm:pt-36 sm:pb-20`}>
      <div className="container-max container-px">
        <Reveal>
          {eyebrow && (
            <p className={`eyebrow mb-5 ${isForest ? 'text-sage' : 'text-accent-dark'}`}>{eyebrow}</p>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-balance max-w-3xl">
            {title}
          </h1>
          {intro && (
            <p className={`mt-6 text-lg sm:text-xl max-w-2xl text-pretty ${isForest ? 'text-cream/75' : 'text-charcoal/70'}`}>
              {intro}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Botanical decorative line — a subtle organic SVG element.
 */
export function BotanicalDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px w-12 bg-accent/40" />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-accent">
        <path
          d="M10 2C10 2 6 6 6 10C6 14 10 18 10 18M10 2C10 2 14 6 14 10C14 14 10 18 10 18M10 2V18M4 8C4 8 7 9 10 9M16 8C16 8 13 9 10 9M4 12C4 12 7 11 10 11M16 12C16 12 13 11 10 11"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
      <div className="h-px w-12 bg-accent/40" />
    </div>
  );
}
