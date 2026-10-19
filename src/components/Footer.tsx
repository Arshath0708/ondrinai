import { Link } from 'react-router-dom';
import { Mail, Instagram, MessageCircle, ArrowRight } from 'lucide-react';
import { siteConfig, navItems, WHATSAPP_COMMUNITY_URL } from '@/config/site';
import { Logo } from '@/components/Logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep-green text-cream">
      {/* Main footer content */}
      <div className="container-max container-px py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Logo variant="light" size="lg" />
            <p className="mt-5 text-cream/75 text-sm leading-relaxed max-w-sm">
              {siteConfig.tagline}
            </p>
            <p className="mt-2.5 font-tamil text-cream/60 text-sm leading-relaxed">
              {siteConfig.tamilTagline}
            </p>
            <p className="mt-4 text-xs text-cream/40 italic">
              &ldquo;{siteConfig.philosophy}&rdquo;
            </p>
          </div>

          {/* Navigation column */}
          <div className="lg:col-span-3">
            <p className="eyebrow text-sage mb-5">Navigate</p>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-cream/70 hover:text-cream transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-sm text-cream/70 hover:text-cream transition-colors inline-block py-0.5"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + social column */}
          <div className="lg:col-span-5">
            <p className="eyebrow text-sage mb-5">Connect</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2.5 text-sm text-cream/80 hover:text-cream transition-colors mb-6 group"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cream/10 group-hover:bg-cream/20 transition-colors">
                <Mail className="w-4 h-4 text-sage" />
              </span>
              {siteConfig.email}
            </a>

            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join ONDRINAI WhatsApp Community"
                className="inline-flex items-center gap-2 px-3.5 py-2 border border-cream/20 text-cream/80 hover:text-cream hover:border-cream/50 transition-all text-xs font-medium"
              >
                <MessageCircle className="w-4 h-4 text-sage" />
                WhatsApp Community
              </a>
              <a
                href="https://www.instagram.com/reel/DcjDeSazK4K/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ONDRINAI on Instagram"
                className="inline-flex items-center gap-2 px-3.5 py-2 border border-cream/20 text-cream/80 hover:text-cream hover:border-cream/50 transition-all text-xs font-medium"
              >
                <Instagram className="w-4 h-4 text-sage" />
                Instagram
              </a>
            </div>

            <div className="pt-2">
              <p className="text-xs text-cream/60 mb-3 leading-relaxed">
                {siteConfig.volunteerExplanation}
              </p>
              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-light text-xs sm:text-sm"
              >
                Join as a Volunteer
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container-max container-px py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/50">
            <p>
              &copy; {year} {siteConfig.brandName}. Madurai, Tamil Nadu.
            </p>
            <p className="text-center sm:text-right text-cream/40">
              Student-led community initiative &bull; Non-governmental
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
