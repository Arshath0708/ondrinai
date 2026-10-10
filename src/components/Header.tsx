import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { navItems, siteConfig, VOLUNTEER_FORM_URL } from '@/config/site';
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
            ? 'bg-off-white/95 backdrop-blur-md shadow-sm border-b border-forest/10'
            : 'bg-off-white border-b border-transparent'
        }`}
      >
        <div className="container-max container-px">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2 group" aria-label="ONDRINAI home">
              <Logo variant="dark" className="group-hover:opacity-80 transition-opacity" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-semibold tracking-wide transition-colors duration-200 relative py-2 ${
                    isActive(item.path)
                      ? 'text-forest'
                      : 'text-charcoal/70 hover:text-forest'
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
            <div className="hidden lg:block">
              {VOLUNTEER_FORM_URL ? (
                <a
                  href={VOLUNTEER_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Join Us
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <Link to="/get-involved" className="btn-primary">
                  Join Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 -mr-2 text-forest"
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
          className="fixed inset-0 top-0 z-40 bg-cream lg:hidden animate-fade-in"
          id="mobile-menu"
          style={{ paddingTop: '3.5rem' }}
        >
          <nav className="flex flex-col px-6 pt-8 gap-1" aria-label="Mobile navigation">
            {navItems.map((item, idx) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-2xl font-serif font-medium py-4 border-b border-forest/10 transition-colors animate-slide-in-right ${
                  isActive(item.path) ? 'text-forest' : 'text-charcoal/80'
                }`}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-8">
              {VOLUNTEER_FORM_URL ? (
                <a
                  href={VOLUNTEER_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full"
                >
                  Join Our Community
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <Link to="/get-involved" className="btn-primary w-full">
                  Join Our Community
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
