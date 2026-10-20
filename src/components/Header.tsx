import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Instagram, Linkedin, Youtube, Facebook } from 'lucide-react';
import { navItems, siteConfig, WHATSAPP_COMMUNITY_URL } from '@/config/site';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 10);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }
    };
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
      {/* High-Impact Announcement & Live Signal Strip */}
      <div className="bg-[#0B0F19] border-b border-amber-500/20 text-slate-200 py-2 px-4 text-xs tracking-wider flex items-center justify-center gap-2.5 overflow-hidden">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
        </span>
        <span className="font-tamil font-medium text-amber-300 text-xs sm:text-sm tracking-wide text-center">
          ஒன்றிணைந்து, சிறந்த எதிர்காலத்தை உருவாக்குவோம்
        </span>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 dark:bg-[#0B0F19]/85 backdrop-blur-xl shadow-[0_10px_35px_-10px_rgba(0,0,0,0.12)] dark:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.85)] border-b border-amber-500/25'
            : 'bg-white/70 dark:bg-[#0B0F19]/70 backdrop-blur-md border-b border-slate-200/60 dark:border-white/5'
        }`}
      >
        {/* Dynamic Scroll Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 transition-all duration-75 origin-left z-20 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />

        <div className="container-max container-px">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? 'h-14 sm:h-15' : 'h-16 sm:h-18'
            }`}
          >
            {/* Left: Brand Identity */}
            <div className="flex items-center shrink-0">
              <Link to="/" className="flex items-center group py-1" aria-label="ONDRINAI home">
                <Logo variant={isDark ? 'light' : 'dark'} size="md" className="group-hover:opacity-90 transition-opacity" />
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 px-2" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold tracking-wide transition-all duration-200 flex items-center ${
                    isActive(item.path)
                      ? 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/90 dark:border-amber-500/30 shadow-2xs font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-400 hover:bg-slate-100/80 dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right: Desktop Action Hub */}
            <div className="hidden lg:flex items-center justify-end gap-2.5 xl:gap-3 shrink-0">
              <ThemeToggle />

              <Link
                to="/donate?cause_breakfast-person=1"
                className="h-9 sm:h-10 px-3.5 sm:px-4 rounded-xl btn-donate text-xs font-bold shadow-sm inline-flex items-center justify-center gap-1.5 shrink-0 hover:scale-[1.02] active:scale-100 transition-all"
                title="Sponsor a warm meal directly"
              >
                <span>⚡ Sponsor a Meal &bull; ₹30</span>
              </Link>

              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 sm:h-10 px-3.5 xl:px-4 rounded-xl border border-slate-300 dark:border-amber-500/30 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-amber-500/10 text-xs font-semibold transition-colors hidden xl:inline-flex items-center justify-center gap-1.5 shrink-0"
                title="Join our volunteer WhatsApp community"
              >
                <span>Join Community</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile actions: ThemeToggle + Symmetrical Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />

              <button
                type="button"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-white dark:bg-[#0B0F19] lg:hidden animate-fade-in flex flex-col justify-between overflow-y-auto"
          id="mobile-menu"
        >
          {/* Mobile Menu Top Bar */}
          <div className="h-16 px-4 sm:px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 shrink-0">
            <Link to="/" onClick={() => setIsOpen(false)} aria-label="ONDRINAI home">
              <Logo variant={isDark ? 'light' : 'dark'} size="md" />
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 focus:outline-none transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Micro-Sponsorship Card on Mobile */}
          <div className="px-5 pt-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 text-white shadow-xl">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">Fast Micro-Sponsorship</span>
                <span className="text-xs font-serif font-extrabold text-amber-400">₹30 = 1 Soul Fed</span>
              </div>
              <p className="text-xs text-slate-300 mb-3 leading-snug">
                Feed an elderly street resident or stray dog in Madurai today. Zero admin cuts.
              </p>
              <Link
                to="/donate?cause_breakfast-person=1"
                onClick={() => setIsOpen(false)}
                className="btn-donate w-full justify-center text-xs py-2.5 rounded-xl shadow-md font-bold"
              >
                ⚡ Sponsor a Meal &bull; ₹30
              </Link>
            </div>
          </div>

          <nav className="flex flex-col px-6 py-3 gap-0.5" aria-label="Mobile navigation">
            {navItems.map((item, idx) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg sm:text-xl font-serif font-medium py-3 border-b border-slate-100 dark:border-slate-800/80 transition-colors ${
                  isActive(item.path) ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-800 dark:text-slate-200'
                }`}
                style={{ animationDelay: `${idx * 30}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-6 pb-safe border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80">
            <div className="flex items-center justify-center gap-3 mb-4">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ONDRINAI on Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-amber-400 hover:bg-amber-600 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ONDRINAI on LinkedIn"
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-amber-400 hover:bg-amber-600 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ONDRINAI on YouTube"
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-amber-400 hover:bg-amber-600 hover:text-white transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ONDRINAI on Facebook"
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-amber-400 hover:bg-amber-600 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 text-center leading-relaxed">
              {siteConfig.volunteerExplanation}
            </p>
            <a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center rounded-xl py-3 font-semibold text-sm shadow-md"
            >
              Join Our WhatsApp Community
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
