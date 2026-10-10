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
      className="group block bg-off-white border border-forest/10 card-hover overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sage/20">
        <img
          src={primaryPhoto.url}
          alt={primaryPhoto.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-green/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 left-4">
          <CategoryBadge category={activity.category} light />
        </div>
        <div className="absolute top-4 right-4 bg-deep-green/80 text-cream text-xs font-mono font-semibold px-2.5 py-1 tracking-wider backdrop-blur-sm">
          {activity.number}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7">
        <h3 className="text-xl sm:text-2xl font-serif font-medium text-charcoal text-balance group-hover:text-forest transition-colors">
          {activity.title}
        </h3>
        <p className="mt-3 text-sm text-charcoal/65 leading-relaxed line-clamp-3">
          {activity.shortDescription}
        </p>

        {/* Impact stats */}
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          {activity.impacts.map((impact, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-lg font-serif font-semibold text-forest">
                {impact.value}
              </span>
              <span className="text-xs text-charcoal/50 uppercase tracking-wide">
                {impact.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-forest group-hover:gap-3 transition-all duration-300">
          Read activity details
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
