import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, MapPin, Calendar, Handshake, Quote, Instagram, ExternalLink, ShieldCheck } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Reveal, CategoryBadge, CTASection } from '@/components/ui/Primitives';
import { PhotoGallery } from '@/components/PhotoGallery';
import { getActivityBySlug, activities } from '@/data/activities';
import { WHATSAPP_COMMUNITY_URL } from '@/config/site';

export function ActivityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const activity = slug ? getActivityBySlug(slug) : undefined;

  if (!activity) {
    return <Navigate to="/activities" replace />;
  }

  const currentIndex = activities.findIndex((a) => a.slug === activity.slug);
  const nextActivity = activities[(currentIndex + 1) % activities.length];

  return (
    <>
      <SEO
        title={`Activity ${activity.number}: ${activity.title}`}
        description={activity.shortDescription}
        image={activity.photos[0]?.url}
      />

      {/* Hero Header */}
      <section className="bg-cream pt-32 pb-12 sm:pt-36 sm:pb-16 border-b border-forest/10">
        <div className="container-max container-px">
          <Reveal>
            <Link
              to="/activities"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-charcoal/60 hover:text-forest transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all activities
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <CategoryBadge category={activity.category} />
              <span className="text-xs font-mono font-bold text-forest/80 bg-forest/10 px-2.5 py-1 tracking-wider">
                ACTIVITY #{activity.number}
              </span>
              <span className="text-xs font-sans text-forest/70 font-medium inline-flex items-center gap-1 bg-sage/25 px-2.5 py-1 border border-sage/40">
                <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                Verified Ground Activity
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-medium text-forest text-balance max-w-4xl leading-tight">
              {activity.title}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-charcoal/75 max-w-3xl leading-relaxed text-pretty">
              {activity.shortDescription}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Meta info bar */}
      {(activity.date || activity.location || (activity.collaborators && activity.collaborators.length > 0)) && (
        <section className="bg-off-white border-b border-forest/10 py-5">
          <div className="container-max container-px">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-charcoal/80">
              {activity.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-forest shrink-0" />
                  <span>{activity.location}</span>
                </div>
              )}
              {activity.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-forest shrink-0" />
                  <span>{activity.date}</span>
                </div>
              )}
              {activity.collaborators && activity.collaborators.length > 0 && (
                <div className="flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-forest shrink-0" />
                  <span>Collaboration with <strong>{activity.collaborators.join(', ')}</strong></span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Content & Gallery */}
      <section className="bg-off-white py-14 sm:py-20">
        <div className="container-max container-px">
          {/* Photo Gallery with authentic photography */}
          <Reveal>
            <div className="mb-14">
              <PhotoGallery photos={activity.photos} />
            </div>
          </Reveal>

          {/* Details & Impact Breakdown */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left: What happened & Purpose */}
            <div className="lg:col-span-7 space-y-10">
              <Reveal>
                <div>
                  <h2 className="eyebrow text-accent-dark mb-3">Activity Purpose</h2>
                  <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-serif">
                    {activity.purpose}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div>
                  <h2 className="eyebrow text-accent-dark mb-3">What Actually Happened</h2>
                  <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed">
                    {activity.whatHappened}
                  </p>
                </div>
              </Reveal>

              {/* Instagram Reel Support Media Card */}
              {activity.reelUrl && (
                <Reveal delay={120}>
                  <div className="border border-forest/20 bg-cream/60 p-6 sm:p-7">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shrink-0 shadow-sm rounded-sm">
                        <Instagram className="w-6 h-6" />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-forest font-sans">
                            Official Activity Media
                          </span>
                        </div>
                        <h3 className="text-lg font-serif font-bold text-forest mt-1">
                          Watch Activity Reel on Instagram
                        </h3>
                        <p className="text-xs sm:text-sm text-charcoal/70 mt-1.5 leading-relaxed">
                          View original ground video documentation, community participation, and updates from this activity.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <a
                            href={activity.reelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-xs sm:text-sm inline-flex items-center gap-2"
                          >
                            <Instagram className="w-4 h-4" />
                            Watch Reel
                            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Reflection */}
              {activity.reflection && (
                <Reveal delay={160}>
                  <div className="bg-cream/40 border-l-4 border-forest p-6 sm:p-7">
                    <div className="flex items-start gap-3">
                      <Quote className="w-6 h-6 text-forest shrink-0 mt-0.5" />
                      <div>
                        <p className="eyebrow text-accent-dark mb-2">Team Reflection</p>
                        <p className="text-base sm:text-lg font-serif italic text-charcoal/85 leading-relaxed">
                          &ldquo;{activity.reflection}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            {/* Right: Verified Impact Ledger Card */}
            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <div className="bg-forest text-cream p-7 sm:p-9 shadow-lg border border-forest/30 sticky top-28">
                  <div className="flex items-center justify-between pb-4 border-b border-cream/15">
                    <p className="eyebrow text-sage">Verified Impact</p>
                    <span className="text-xs font-mono bg-cream/10 px-2 py-0.5 text-cream/90">
                      ACT #{activity.number}
                    </span>
                  </div>

                  <div className="mt-6 space-y-6">
                    {activity.impacts.map((impact, i) => (
                      <div key={i} className="border-b border-cream/15 pb-5 last:border-0 last:pb-0">
                        <p className="text-2xl sm:text-3xl font-serif font-bold text-cream">
                          {impact.value}
                        </p>
                        <p className="text-xs sm:text-sm text-cream/70 uppercase tracking-wide mt-1">
                          {impact.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {activity.cost && (
                    <div className="mt-6 pt-6 border-t border-cream/15">
                      <p className="text-xs uppercase tracking-wider text-sage font-semibold">
                        Documented Activity Cost
                      </p>
                      <p className="text-2xl font-serif font-bold mt-1 text-cream">
                        {activity.cost}
                      </p>
                    </div>
                  )}

                  {activity.collaborators && activity.collaborators.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-cream/15">
                      <p className="text-xs uppercase tracking-wider text-sage font-semibold">
                        Collaborating Organization
                      </p>
                      <p className="text-base font-serif font-medium mt-1 text-cream">
                        {activity.collaborators.join(' × ')}
                      </p>
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-cream/15">
                    <p className="text-xs text-cream/60 leading-relaxed mb-4">
                      All activity outcomes are published transparently in accordance with our reporting principles.
                    </p>
                    <div className="flex flex-col gap-2.5">
                      <Link
                        to="/transparency"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-sage hover:text-cream transition-colors uppercase tracking-wider"
                      >
                        <span>View transparency ledger</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to="/gallery"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-sage hover:text-cream transition-colors uppercase tracking-wider"
                      >
                        <span>View photo archive</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to="/donate"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-sage hover:text-cream transition-colors uppercase tracking-wider"
                      >
                        <span>Contribute toward future drives</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Next activity navigation banner */}
      <section className="bg-cream border-t border-forest/10 py-10">
        <div className="container-max container-px">
          <Link
            to={`/activities/${nextActivity.slug}`}
            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-off-white border border-forest/15 hover:border-forest/40 transition-all duration-300"
          >
            <div>
              <p className="text-xs font-mono font-semibold text-forest uppercase tracking-wider mb-1">
                Next Activity &bull; #{nextActivity.number}
              </p>
              <p className="text-lg sm:text-xl font-serif font-medium text-charcoal group-hover:text-forest transition-colors">
                {nextActivity.title}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-forest group-hover:translate-x-1 transition-transform">
              <span>View Activity</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Want to join our next activity?"
        copy="ONDRINAI activities are organized and carried out by volunteers. Join our WhatsApp group to hear about upcoming initiatives and take part."
        primaryLabel="Join Volunteer Community"
        primaryLink={WHATSAPP_COMMUNITY_URL}
        secondaryLabel="Explore All Activities"
        secondaryLink="/activities"
        variant="dark"
      />
    </>
  );
}
