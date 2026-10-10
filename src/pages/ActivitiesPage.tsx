import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Reveal, SectionHeading } from '@/components/ui/Primitives';
import { ActivityCard } from '@/components/ActivityCard';
import { activities } from '@/data/activities';

type FilterCategory = 'ALL' | 'FEED' | 'PLANT' | 'BUILD';

const filterOptions: FilterCategory[] = ['ALL', 'FEED', 'PLANT', 'BUILD'];

export function ActivitiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = (searchParams.get('category')?.toUpperCase() as FilterCategory) || 'ALL';
  const [activeFilter, setActiveFilter] = useState<FilterCategory>(
    filterOptions.includes(initialFilter) ? initialFilter : 'ALL'
  );

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
        title="Our Work"
        description="Explore ONDRINAI's completed community activities — food distribution, Panai seed planting, and old-age home visits in Madurai, Tamil Nadu."
      />

      {/* Hero */}
      <section className="bg-cream pt-32 pb-12 sm:pt-36 sm:pb-16">
        <div className="container-max container-px">
          <Reveal>
            <p className="eyebrow text-accent-dark mb-5">Our Work</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-forest text-balance max-w-3xl">
              Action speaks louder than promises.
            </h1>
            <p className="mt-6 text-lg text-charcoal/70 max-w-2xl text-pretty">
              We believe meaningful change begins with doing what we can, where we are. Here is what we have done so far.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Activities with filters */}
      <section className="bg-off-white py-16 sm:py-20">
        <div className="container-max container-px">
          {/* Filters */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleFilter(option)}
                  className={`px-5 py-2.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                    activeFilter === option
                      ? 'bg-forest text-cream'
                      : 'bg-cream/60 text-charcoal/60 hover:bg-cream hover:text-forest border border-forest/10'
                  }`}
                  aria-pressed={activeFilter === option}
                >
                  {option}
                </button>
              ))}
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
            <p className="text-center text-charcoal/50 py-20">
              No activities in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
