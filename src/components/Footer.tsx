import { Link } from 'react-router-dom';
import { Mail, Instagram, MessageCircle, ArrowRight, Linkedin, Youtube, Facebook } from 'lucide-react';
import {
  siteConfig,
  navItems,
  WHATSAPP_COMMUNITY_URL,
  LINKEDIN_URL,
  FACEBOOK_URL,
  YOUTUBE_URL,
  INSTAGRAM_URL,
} from '@/config/site';
import { Logo } from '@/components/Logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0F19] text-white border-t border-slate-800 relative overflow-hidden">
      {/* Soft ambient atmospheric glow without any harsh dots */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main footer content */}
      <div className="container-max container-px py-16 sm:py-20 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Logo variant="light" size="lg" />
            <p className="mt-5 text-slate-300 text-sm leading-relaxed max-w-sm">
              {siteConfig.tagline}
            </p>
            <p className="mt-2.5 font-tamil text-slate-400 text-sm leading-relaxed">
              {siteConfig.tamilTagline}
            </p>
            <p className="mt-4 text-xs text-emerald-400/70 font-mono italic">
              &ldquo;{siteConfig.philosophy}&rdquo;
            </p>
          </div>

          {/* Navigation column */}
          <div className="lg:col-span-3">
            <p className="eyebrow text-emerald-400 mb-5 font-mono">Navigate</p>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-slate-300 hover:text-white hover:text-emerald-300 transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-sm text-slate-400 hover:text-white transition-colors inline-block py-0.5"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + social column */}
          <div className="lg:col-span-5">
            <p className="eyebrow text-emerald-400 mb-5 font-mono">Connect</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors mb-6 group"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                <Mail className="w-4 h-4 text-emerald-400" />
              </span>
              {siteConfig.email}
            </a>

            <div className="flex flex-wrap gap-2.5 mb-6">
              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join ONDRINAI WhatsApp Community"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-500/20 bg-white/5 text-slate-300 hover:text-white hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-all text-xs font-medium"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ONDRINAI on Instagram"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-500/20 bg-white/5 text-slate-300 hover:text-white hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-all text-xs font-medium"
              >
                <Instagram className="w-4 h-4 text-emerald-400" />
                Instagram
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ONDRINAI on LinkedIn"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-500/20 bg-white/5 text-slate-300 hover:text-white hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-all text-xs font-medium"
              >
                <Linkedin className="w-4 h-4 text-emerald-400" />
                LinkedIn
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ONDRINAI on YouTube"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-500/20 bg-white/5 text-slate-300 hover:text-white hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-all text-xs font-medium"
              >
                <Youtube className="w-4 h-4 text-emerald-400" />
                YouTube
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ONDRINAI on Facebook"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-500/20 bg-white/5 text-slate-300 hover:text-white hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-all text-xs font-medium"
              >
                <Facebook className="w-4 h-4 text-emerald-400" />
                Facebook
              </a>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/donate?cause_breakfast-person=1"
                className="btn-donate text-xs sm:text-sm rounded-xl py-3 px-5 text-center"
              >
                ⚡ Sponsor a Meal &bull; ₹30
              </Link>
              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light text-xs sm:text-sm rounded-xl py-3 px-5 text-center flex items-center justify-center gap-2"
              >
                <span>Join as Volunteer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom telemetry bar */}
      <div className="border-t border-slate-800 bg-slate-950/80">
        <div className="container-max container-px py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-beacon" />
              &copy; {year} {siteConfig.brandName}. Madurai, Tamil Nadu.
            </p>
            <p className="text-center sm:text-right text-emerald-400/80 text-[11px] font-sans font-medium">
              100% Direct Citizen Action &bull; Verified On-Ground Community Drives &bull; Non-Governmental
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
