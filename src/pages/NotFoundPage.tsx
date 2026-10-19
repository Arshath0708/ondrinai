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
      <section className="bg-cream min-h-[70vh] flex items-center justify-center pt-32 pb-20">
        <div className="container-max container-px text-center">
          <p className="font-serif text-7xl sm:text-8xl font-bold text-forest/25">404</p>
          <BotanicalDivider className="my-6" />
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-forest mb-4">
            This page doesn&rsquo;t exist.
          </h1>
          <p className="text-base text-charcoal/70 max-w-md mx-auto mb-8 leading-relaxed">
            The link you followed may be incorrect, or the page has moved. Let&rsquo;s get you back to our community hub.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn-primary">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link to="/activities" className="btn-secondary">
              Explore Our Work
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="mt-12 text-sm text-charcoal/50 italic">
            &ldquo;{siteConfig.philosophy}&rdquo;
          </p>
        </div>
      </section>
    </>
  );
}
