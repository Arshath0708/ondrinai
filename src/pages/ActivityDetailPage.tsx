import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, MapPin, Calendar, Handshake, Quote } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Reveal, CategoryBadge, CTASection } from '@/components/ui/Primitives';
import { PhotoGallery } from '@/components/PhotoGallery';
import { getActivityBySlug, activities } from '@/data/activities';
import { VOLUNTEER_FORM_URL } from '@/config/site';

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
        title={`${activity.title}`}
        description={activity.shortDescription}
        image={activity.photos[0]?.url}
      />

      {/* Hero */}
      <section className="bg-cream pt-32 pb-12 sm:pt-36 sm:pb-16">
        <div className="container-max container-px">
          <Reveal>
            <Link
              to="/activities"
              className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal/60 hover:text-forest transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              All activities
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <CategoryBadge category={activity.category} />
              <span className="text-xs font-mono font-semibold text-charcoal/50 tracking-wider">
                ACTIVITY {activity.number}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-forest text-balance max-w-3xl">
              {activity.title}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Meta info bar */}
      {(activity.date || activity.location || activity.collaborators) && (
        <section className="bg-off-white border-y border-forest/10 py-6">
          <div className="container-max container-px">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {activity.date && (
                <div className="flex items-center gap-2 text-sm text-charcoal/70">
                  <Calendar className="w-4 h-4 text-accent-dark" />
                  {activity.date}
                </div>
              )}
              {activity.location && (
                <div className="flex items-center gap-2 text-sm text-charcoal/70">
                  <MapPin className="w-4 h-4 text-accent-dark" />
                  {activity.location}
                </div>
              )}
              {activity.collaborators && activity.collaborators.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-charcoal/70">
                  <Handshake className="w-4 h-4 text-accent-dark" />
                  In collaboration with {activity.collaborators.join(', ')}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Photo gallery */}
      <section className="bg-off-white py-16 sm:py-20">
        <div className="container-max container-px">
          <Reveal>
            <PhotoGallery photos={activity.photos} />
            <p className="mt-4 text-xs text-charcoal/40 text-center">
              Placeholder photographs shown. Authentic ONDRINAI activity photos will replace these when supplied.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Content */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-accent-dark mb-4">Purpose</p>
                <p className="text-lg text-charcoal/80 leading-relaxed text-pretty mb-10">
                  {activity.purpose}
                </p>

                <p className="eyebrow text-accent-dark mb-4">What happened</p>
                <p className="text-lg text-charcoal/80 leading-relaxed text-pretty">
                  {activity.whatHappened}
                </p>
              </Reveal>
            </div>

            {/* Sidebar: impact + cost */}
            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <div className="bg-forest text-cream p-7 sm:p-8">
                  <p className="eyebrow text-sage mb-6">Verified impact</p>
                  <div className="space-y-5">
                    {activity.impacts.map((impact, i) => (
                      <div key={i} className="border-b border-cream/15 pb-5 last:border-0 last:pb-0">
                        <p className="text-2xl sm:text-3xl font-serif font-medium">
                          {impact.value}
                        </p>
                        <p className="text-sm text-cream/60 mt-1">{impact.label}</p>
                      </div>
                    ))}
                  </div>

                  {activity.cost && (
                    <div className="mt-6 pt-6 border-t border-cream/15">
                      <p className="text-sm text-cream/60">Documented activity cost</p>
                      <p className="text-xl font-serif font-medium mt-1">{activity.cost}</p>
                    </div>
                  )}

                  {activity.collaborators && activity.collaborators.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-cream/15">
                      <p className="text-sm text-cream/60">Collaborators</p>
                      <p className="text-base font-medium mt-1">
                        {activity.collaborators.join(' × ')}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>

          {/* Reflection */}
          {activity.reflection && (
            <Reveal>
              <div className="mt-16 lg:mt-20 max-w-3xl">
                <div className="flex items-start gap-4">
                  <Quote className="w-8 h-8 text-accent shrink-0 mt-1" />
                  <div>
                    <p className="eyebrow text-accent-dark mb-3">Reflection</p>
                    <p className="text-lg sm:text-xl font-serif italic text-charcoal/80 leading-relaxed text-pretty">
                      {activity.reflection}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Next activity link */}
      <section className="bg-off-white border-t border-forest/10 py-12">
        <div className="container-max container-px">
          <Link
            to={`/activities/${nextActivity.slug}`}
            className="group flex items-center justify-between gap-4"
          >
            <div>
              <p className="text-xs text-charcoal/40 uppercase tracking-wide mb-1">
                Next activity
              </p>
              <p className="text-lg font-serif font-medium text-forest group-hover:text-deep-green transition-colors">
                {nextActivity.title}
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-forest group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </section>

      <CTASection
        title="Want to join the next activity?"
        copy="ONDRINAI activities are carried out by volunteers. Whether you can join on the ground or support from afar, your effort matters."
        primaryLabel="Become a Volunteer"
        primaryLink={VOLUNTEER_FORM_URL || '/get-involved'}
        secondaryLabel="See All Activities"
        secondaryLink="/activities"
        variant="dark"
      />
    </>
  );
}
