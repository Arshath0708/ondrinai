import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { BotanicalDivider } from '@/components/ui/Primitives';
import { siteConfig, ASSETS } from '@/config/site';

export function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist on ONDRINAI."
        image={ASSETS.logo}
      />
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-[75vh] flex items-center justify-center pt-32 pb-20 cyber-grid">
        <div className="container-max container-px text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-mono uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>404 Protocol Error &bull; Route Not Located</span>
          </span>
          <p className="font-serif text-7xl sm:text-9xl font-extrabold text-slate-200 tracking-tight">404</p>
          <BotanicalDivider className="my-6" />
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mb-4">
            This sector doesn&rsquo;t exist.
          </h1>
          <p className="text-base text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
            The link you followed may be incorrect, or the page has moved. Let&rsquo;s get you back to our community hub.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn-primary py-3 px-6 rounded-xl font-semibold flex items-center gap-2 shadow-xs">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link to="/activities" className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold flex items-center gap-2 transition-colors">
              Explore Our Work
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/donate" className="btn-donate py-3 px-6 rounded-xl font-bold flex items-center gap-2 shadow-md">
              <span>⚡ Sponsor • ₹30</span>
            </Link>
          </div>
          <p className="mt-12 text-sm text-slate-400 italic">
            &ldquo;{siteConfig.philosophy}&rdquo;
          </p>
        </div>
      </section>
    </>
  );
}
