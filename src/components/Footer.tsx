import { Link } from 'react-router-dom';
import { Mail, Instagram, Facebook, Youtube, Linkedin, ArrowRight } from 'lucide-react';
import { siteConfig, socialLinks, navItems, VOLUNTEER_FORM_URL } from '@/config/site';
import { Logo } from '@/components/Logo';

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
};

export function Footer() {
  const year = new Date().getFullYear();

  const hasSocialUrl = (url: string) => url && url.startsWith('http');

  return (
    <footer className="bg-deep-green text-cream">
      {/* Main footer content */}
      <div className="container-max container-px py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-4 text-cream/70 text-sm leading-relaxed max-w-xs">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 font-tamil text-cream/60 text-sm">
              {siteConfig.tamilTagline}
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
                    className="text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/transparency"
                  className="text-sm text-cream/70 hover:text-cream transition-colors"
                >
                  Transparency
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-sm text-cream/70 hover:text-cream transition-colors"
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
              className="inline-flex items-center gap-2 text-sm text-cream/80 hover:text-cream transition-colors mb-5"
            >
              <Mail className="w-4 h-4 text-sage" />
              {siteConfig.email}
            </a>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon];
                if (hasSocialUrl(social.url)) {
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} — ${social.handle}`}
                      className="inline-flex items-center justify-center w-10 h-10 border border-cream/20 text-cream/70 hover:text-cream hover:border-cream/50 transition-all"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                }
                return (
                  <span
                    key={social.label}
                    aria-label={`${social.label} — ${social.handle} (link coming soon)`}
                    className="inline-flex items-center justify-center w-10 h-10 border border-cream/10 text-cream/30 cursor-not-allowed"
                    title={`${social.label} — link coming soon`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                );
              })}
            </div>

            <div className="mt-8">
              {VOLUNTEER_FORM_URL ? (
                <a
                  href={VOLUNTEER_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-light"
                >
                  Become a Volunteer
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <Link to="/get-involved" className="btn-light">
                  Become a Volunteer
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container-max container-px py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-cream/50">
              &copy; {year} {siteConfig.brandName}. All rights reserved.
            </p>
            <p className="text-xs text-cream/40 text-center sm:text-right">
              {siteConfig.location}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
