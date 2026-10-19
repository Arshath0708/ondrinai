import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Activity } from '@/types';
import { CategoryBadge } from '@/components/ui/Primitives';

interface ActivityCardProps {
  activity: Activity;
  index?: number;
}

export function ActivityCard({ activity, index = 0 }: ActivityCardProps) {
  const primaryPhoto = activity.photos[0];

  return (
    <Link
      to={`/activities/${activity.slug}`}
      className="group flex flex-col bg-off-white border border-forest/15 card-hover overflow-hidden h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sage/20">
        {primaryPhoto && (
          <img
            src={primaryPhoto.url}
            alt={primaryPhoto.alt}
            loading={index < 3 ? 'eager' : 'lazy'}
            className="w-full h-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-green/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4">
          <CategoryBadge category={activity.category} light />
        </div>
        <div className="absolute top-4 right-4 bg-deep-green/90 text-cream text-xs font-mono font-semibold px-2.5 py-1 tracking-wider backdrop-blur-sm border border-cream/10">
          ACT {activity.number}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-serif font-medium text-charcoal text-balance group-hover:text-forest transition-colors">
            {activity.title}
          </h3>
          <p className="mt-3 text-sm text-charcoal/70 leading-relaxed line-clamp-3">
            {activity.shortDescription}
          </p>

          {/* Impact stats */}
          <div className="mt-5 pt-4 border-t border-forest/10 flex flex-wrap gap-x-6 gap-y-2">
            {activity.impacts.map((impact, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-lg font-serif font-semibold text-forest">
                  {impact.value}
                </span>
                <span className="text-xs text-charcoal/60 uppercase tracking-wide">
                  {impact.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-forest/10 flex items-center gap-2 text-sm font-semibold text-forest group-hover:gap-3 transition-all duration-300">
          <span>Read full activity report</span>
          <ArrowRight className="w-4 h-4 text-forest" />
        </div>
      </div>
    </Link>
  );
}
