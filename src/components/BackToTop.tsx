import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Back to top"
      className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-emerald-300 border border-slate-200/90 dark:border-slate-800 shadow-lg hover:shadow-xl dark:shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:scale-105 active:scale-95 backdrop-blur-md transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200 text-slate-800 dark:text-emerald-400" />
      <span className="sr-only">Back to top</span>
    </button>
  );
}
