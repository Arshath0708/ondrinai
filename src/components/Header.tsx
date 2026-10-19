import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { navItems, siteConfig, WHATSAPP_COMMUNITY_URL } from '@/config/site';
import { Logo } from '@/components/Logo';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      {/* Announcement strip */}
      <div className="bg-deep-green text-cream/90 text-center py-2 px-4 text-xs sm:text-sm font-medium tracking-wide">
        {siteConfig.announcement}
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-off-white/95 backdrop-blur-md shadow-md border-b border-forest/15'
            : 'bg-off-white border-b border-forest/10'
        }`}
      >
        <div className="container-max container-px">
          <div className="flex items-center justify-between h-20 sm:h-24">
            <Link to="/" className="flex items-center gap-2 group py-2" aria-label="ONDRINAI home">
              <Logo variant="dark" size="md" className="group-hover:opacity-90 transition-opacity" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-xs xl:text-sm font-semibold tracking-wide transition-colors duration-200 relative py-2 ${
                    isActive(item.path)
                      ? 'text-forest font-bold'
                      : 'text-charcoal/70 hover:text-forest'
                  } ${
                    item.path === '/donate'
                      ? 'text-forest/90 font-bold'
                      : ''
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs"
                title="Join our volunteer WhatsApp community"
              >
                Join Us
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 -mr-2 text-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-0 z-40 bg-cream lg:hidden animate-fade-in flex flex-col justify-between overflow-y-auto"
          id="mobile-menu"
          style={{ paddingTop: '5.5rem' }}
        >
          <nav className="flex flex-col px-6 pt-2 pb-4 gap-0.5" aria-label="Mobile navigation">
            {navItems.map((item, idx) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xl sm:text-2xl font-serif font-medium py-3 border-b border-forest/10 transition-colors animate-slide-in-right ${
                  isActive(item.path) ? 'text-forest font-semibold' : 'text-charcoal/80'
                }`}
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-6 pb-10 border-t border-forest/10 bg-cream/80">
            <p className="text-xs text-charcoal/60 mb-3 leading-relaxed">
              {siteConfig.volunteerExplanation}
            </p>
            <a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center"
            >
              Join Our Community
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
