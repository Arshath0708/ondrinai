interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

/**
 * ONDRINAI wordmark logo.
 * Temporary text-based wordmark — replace with the official logo SVG/image when available.
 * To replace: swap this component's internals with an <img> tag pointing to the logo asset,
 * or import an SVG file. The component interface stays the same.
 */
export function Logo({ className = '', variant = 'dark' }: LogoProps) {
  const color = variant === 'light' ? 'text-cream' : 'text-forest';

  return (
    <span
      className={`font-serif font-semibold tracking-tight text-xl sm:text-2xl ${color} ${className}`}
      aria-label="ONDRINAI"
    >
      ONDRINAI
    </span>
  );
}
