import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { BotanicalDivider } from '@/components/ui/Primitives';
import { siteConfig } from '@/config/site';

export function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you are looking for does not exist." />
      <section className="bg-cream min-h-[70vh] flex items-center justify-center pt-32 pb-20">
        <div className="container-max container-px text-center">
          <p className="font-serif text-7xl sm:text-8xl font-medium text-forest/20">404</p>
          <BotanicalDivider className="my-6" />
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-forest mb-4">
            This page doesn&rsquo;t exist.
          </h1>
          <p className="text-base text-charcoal/60 max-w-md mx-auto mb-8">
            The page you&rsquo;re looking for may have been moved or was never created. Let&rsquo;s get you back on track.
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
          <p className="mt-10 text-sm text-charcoal/40">
            {siteConfig.brandName} &mdash; {siteConfig.tagline}
          </p>
        </div>
      </section>
    </>
  );
}
