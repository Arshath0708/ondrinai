import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Reveal, CTASection } from '@/components/ui/Primitives';
import { ActivityCard } from '@/components/ActivityCard';
import { activities } from '@/data/activities';
import { WHATSAPP_COMMUNITY_URL, ASSETS } from '@/config/site';

type FilterCategory = 'ALL' | 'FEED' | 'PLANT' | 'BUILD' | 'RESPOND';

const filterOptions: FilterCategory[] = ['ALL', 'FEED', 'PLANT', 'BUILD', 'RESPOND'];

export function ActivitiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category')?.toUpperCase() as FilterCategory | undefined;
  
  const [activeFilter, setActiveFilter] = useState<FilterCategory>(
    categoryParam && filterOptions.includes(categoryParam) ? categoryParam : 'ALL'
  );

  useEffect(() => {
    if (categoryParam && filterOptions.includes(categoryParam)) {
      setActiveFilter(categoryParam);
    } else if (!categoryParam) {
      setActiveFilter('ALL');
    }
  }, [categoryParam]);

  const filteredActivities = useMemo(() => {
    if (activeFilter === 'ALL') return activities;
    return activities.filter((a) => a.category === activeFilter);
  }, [activeFilter]);

  const handleFilter = (filter: FilterCategory) => {
    setActiveFilter(filter);
    if (filter === 'ALL') {
      setSearchParams({});
    } else {
      setSearchParams({ category: filter });
    }
  };

  return (
    <>
      <SEO
        title="Our Work — Activity Archive"
        description="Explore ONDRINAI's verified community activities in Madurai — Food distribution, 2,000 Panai seed planting, and Old-Age Home lunch visits."
        image={ASSETS.logo}
      />

      {/* Hero */}
      <section className="bg-cream pt-32 pb-12 sm:pt-36 sm:pb-16 border-b border-forest/10">
        <div className="container-max container-px">
          <Reveal>
            <p className="eyebrow text-accent-dark mb-5">Activity Archive</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-forest text-balance max-w-3xl">
              Action speaks louder than promises.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-charcoal/75 max-w-2xl text-pretty leading-relaxed">
              We believe meaningful change begins with doing what we can, where we are. Every initiative here has been completed directly on the ground.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Activities with filters */}
      <section className="bg-off-white py-16 sm:py-20">
        <div className="container-max container-px">
          {/* Category Filters */}
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-charcoal/50 mr-2">
                  Filter:
                </span>
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleFilter(option)}
                    className={`px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 border ${
                      activeFilter === option
                        ? 'bg-forest text-cream border-forest shadow-sm'
                        : 'bg-cream/70 text-charcoal/70 hover:bg-cream hover:text-forest border-forest/15'
                    }`}
                    aria-pressed={activeFilter === option}
                  >
                    {option === 'ALL' ? 'All Activities' : option}
                  </button>
                ))}
              </div>
              <Link
                to="/gallery"
                className="btn-outline text-xs inline-flex items-center gap-1.5 py-2 px-3.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Visual Photo Gallery</span>
              </Link>
            </div>
          </Reveal>

          {/* Activity grid */}
          {filteredActivities.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredActivities.map((activity, i) => (
                <Reveal key={activity.id} delay={i * 100}>
                  <ActivityCard activity={activity} index={i} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-cream/30 border border-forest/10 p-8">
              <p className="text-charcoal/60 font-serif text-lg">
                No activities documented in the {activeFilter} category yet.
              </p>
              <button
                type="button"
                onClick={() => handleFilter('ALL')}
                className="mt-4 btn-secondary text-xs"
              >
                View all activities
              </button>
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Want to take part in future activities?"
        copy="Join our volunteer WhatsApp community to be notified when the next food drive, seed planting, or community initiative is scheduled."
        primaryLabel="Join Volunteer Community"
        primaryLink={WHATSAPP_COMMUNITY_URL}
        secondaryLabel="Learn About Transparency"
        secondaryLink="/transparency"
        variant="dark"
      />
    </>
  );
}
