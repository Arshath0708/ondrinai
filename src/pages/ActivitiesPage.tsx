import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Reveal, CTASection } from '@/components/ui/Primitives';
import { ActivityCard } from '@/components/ActivityCard';
import { activities } from '@/data/activities';
import { WHATSAPP_COMMUNITY_URL, ASSETS } from '@/config/site';

type FilterCategory = 'ALL' | 'FEED' | 'PLANT' | 'WATER' | 'BUILD' | 'RESPOND';

const filterOptions: FilterCategory[] = ['ALL', 'FEED', 'PLANT', 'WATER', 'BUILD', 'RESPOND'];

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
      <section className="bg-slate-50 dark:bg-[#0B0F19] pt-32 pb-12 sm:pt-36 sm:pb-16 border-b border-slate-200/80 dark:border-slate-800 relative editorial-mesh">
        <div className="container-max container-px relative z-10">
          <Reveal>
            <p className="eyebrow text-amber-700 dark:text-amber-400 mb-5 font-mono font-bold">Activity Archive &bull; Documented On-Ground Action</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900 dark:text-white text-balance max-w-3xl tracking-tight">
              Action speaks louder than promises.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-700 dark:text-slate-300 max-w-2xl text-pretty leading-relaxed">
              We believe meaningful change begins with doing what we can, where we are. Every initiative here has been completed directly on the ground.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Activities with filters */}
      <section className="bg-white dark:bg-[#0B0F19] py-16 sm:py-20">
        <div className="container-max container-px">
          {/* Category Filters */}
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mr-2 font-mono">
                  Filter:
                </span>
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleFilter(option)}
                    className={`px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 rounded-xl border ${
                      activeFilter === option
                        ? 'bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 border-slate-900 dark:border-amber-500 shadow-md font-bold'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-700 dark:hover:text-amber-400 border-slate-200 dark:border-slate-800'
                    }`}
                    aria-pressed={activeFilter === option}
                  >
                    {option === 'ALL' ? 'All Activities' : option}
                  </button>
                ))}
              </div>
              <Link
                to="/gallery"
                className="btn-secondary rounded-xl text-xs inline-flex items-center gap-1.5 py-2.5 px-4"
              >
                <Camera className="w-4 h-4 text-amber-600 dark:text-amber-400" />
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
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
              <p className="text-slate-500 dark:text-slate-400 font-serif text-lg">
                No activities documented in the {activeFilter} category yet.
              </p>
              <button
                type="button"
                onClick={() => handleFilter('ALL')}
                className="mt-4 btn-secondary text-xs rounded-xl"
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
        secondaryLabel="Sponsor a Meal • ₹30"
        secondaryLink="/donate"
        variant="dark"
      />
    </>
  );
}
