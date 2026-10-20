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
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0B0F19] dark:via-slate-950 dark:to-[#0B0F19] pt-32 pb-12 sm:pt-36 sm:pb-16 border-b border-slate-200/80 dark:border-white/10 cyber-grid">
        <div className="container-max container-px relative z-10">
          <Reveal>
            <Link
              to="/activities"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all activities
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <CategoryBadge category={activity.category} />
              <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-300/50 dark:border-amber-800 tracking-wider">
                ACTIVITY #{activity.number}
              </span>
              <span className="text-xs font-mono text-amber-700 dark:text-amber-300 font-semibold inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200/80 dark:border-amber-800 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Verified Ground Activity
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-slate-900 dark:text-white text-balance max-w-4xl leading-tight">
              {activity.title}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed text-pretty">
              {activity.shortDescription}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Meta info bar */}
      {(activity.date || activity.location || (activity.collaborators && activity.collaborators.length > 0)) && (
        <section className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-white/10 py-5">
          <div className="container-max container-px">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-700 dark:text-slate-300">
              {activity.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="font-medium">{activity.location}</span>
                </div>
              )}
              {activity.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="font-mono text-xs font-medium text-slate-600 dark:text-slate-400">{activity.date}</span>
                </div>
              )}
              {activity.collaborators && activity.collaborators.length > 0 && (
                <div className="flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Collaboration with <strong className="text-slate-900 dark:text-white">{activity.collaborators.join(', ')}</strong></span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Content & Gallery */}
      <section className="bg-slate-50 dark:bg-[#0B0F19] py-14 sm:py-20">
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
                <div className="bg-white dark:bg-slate-900 p-7 sm:p-9 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                  <h2 className="eyebrow text-amber-600 dark:text-amber-400 font-mono tracking-widest text-xs uppercase mb-3">Activity Purpose</h2>
                  <p className="text-base sm:text-lg text-slate-800 dark:text-slate-100 leading-relaxed font-serif font-medium">
                    {activity.purpose}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="bg-white dark:bg-slate-900 p-7 sm:p-9 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                  <h2 className="eyebrow text-amber-600 dark:text-amber-400 font-mono tracking-widest text-xs uppercase mb-3">What Actually Happened</h2>
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activity.whatHappened}
                  </p>
                </div>
              </Reveal>

              {/* Instagram Reel Support Media Card */}
              {activity.reelUrl && (
                <Reveal delay={120}>
                  <div className="border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl shadow-xs hover:border-amber-500/40 transition-colors">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shrink-0 shadow-md rounded-xl">
                        <Instagram className="w-6 h-6" />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                            Official Ground Documentation
                          </span>
                        </div>
                        <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white mt-1">
                          Watch Activity Reel on Instagram
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                          View original ground video documentation, community participation, and updates from this activity.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <a
                            href={activity.reelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-xs sm:text-sm rounded-xl inline-flex items-center gap-2 shadow-xs"
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
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 border-l-4 border-l-amber-500 rounded-2xl p-6 sm:p-7 shadow-xs">
                    <div className="flex items-start gap-3">
                      <Quote className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="eyebrow text-amber-600 dark:text-amber-400 font-mono tracking-widest text-xs uppercase mb-2">Team Reflection</p>
                        <p className="text-base sm:text-lg font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
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
                <div className="bg-slate-900 text-white p-7 sm:p-8 rounded-2xl shadow-2xl border border-slate-800 sticky top-28">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <p className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                        Verified Ledger
                      </p>
                    </div>
                    <span className="text-xs font-mono bg-amber-950/80 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                      ACT #{activity.number}
                    </span>
                  </div>

                  <div className="mt-6 space-y-6">
                    {activity.impacts.map((impact, i) => (
                      <div key={i} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                        <p className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">
                          {impact.value}
                        </p>
                        <p className="text-xs font-mono text-slate-300 uppercase tracking-wide mt-1">
                          {impact.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {activity.cost && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <p className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                        Documented Activity Cost
                      </p>
                      <p className="text-2xl font-serif font-bold mt-1 text-white">
                        {activity.cost}
                      </p>
                    </div>
                  )}

                  {activity.collaborators && activity.collaborators.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <p className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                        Collaborating Organization
                      </p>
                      <p className="text-base font-serif font-medium mt-1 text-slate-200">
                        {activity.collaborators.join(' × ')}
                      </p>
                    </div>
                  )}

                  {/* Fast 1-Click Micro-Sponsorship Prompt */}
                  <div className="mt-8 pt-6 border-t border-amber-500/20">
                    <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-500/40 text-center mb-4">
                      <p className="text-[11px] font-mono text-amber-300 uppercase tracking-widest mb-1">
                        ⚡ Support The Next Drive
                      </p>
                      <p className="text-xs text-slate-300 mb-3.5 leading-relaxed">
                        100% of your ₹30 sponsorship directly funds fresh morning meals for waiting elders.
                      </p>
                      <Link
                        to="/donate?cause_breakfast-person=1"
                        className="btn-donate w-full py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg hover:scale-[1.02] transition-transform"
                      >
                        <span>Sponsor an Elder's Meal • ₹30</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <Link
                        to="/gallery"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider"
                      >
                        <span>View Photo Archive</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to="/donate"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400 hover:text-white transition-colors uppercase tracking-wider"
                      >
                        <span>Explore All Transparent Causes</span>
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
      <section className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-white/10 py-10">
        <div className="container-max container-px">
          <Link
            to={`/activities/${nextActivity.slug}`}
            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-amber-500/40 hover:shadow-md transition-all duration-300"
          >
            <div>
              <p className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                Next Activity &bull; #{nextActivity.number}
              </p>
              <p className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                {nextActivity.title}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
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
