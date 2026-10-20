import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Sparkles, X, ArrowRight } from 'lucide-react';

export function FloatingImpactBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show after scrolling 150px
    const handleScroll = () => {
      if (window.scrollY > 200 && !dismissed) {
        setVisible(true);
      } else if (window.scrollY <= 200) {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  // Don't show if dismissed or already on donate page checkout
  if (dismissed || !visible || location.pathname === '/donate') {
    return null;
  }

  return (
    <aside
      aria-label="Quick sponsorship dock"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-fade-in"
    >
      <div className="glass-hud text-white p-3.5 sm:p-4 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.45)] border border-amber-500/40 flex items-center justify-between gap-3 ring-1 ring-amber-400/20 backdrop-blur-xl">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              <Heart className="w-5 h-5 text-white fill-white/30" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-300 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Direct Ground Impact</span>
            </div>
            <p className="text-xs sm:text-sm font-serif font-bold text-white truncate">
              ₹30 feeds a waiting elder today
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/donate?cause_breakfast-person=1"
            className="btn-donate text-xs py-2 px-3.5 rounded-lg shadow-md hover:scale-105 transition-transform whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Sponsor • ₹30</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss quick donation prompt"
            className="p-1 text-white/50 hover:text-white rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
