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
      className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/10 rounded-2xl shadow-xs hover:shadow-xl hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
        {primaryPhoto && (
          <img
            src={primaryPhoto.url}
            alt={primaryPhoto.alt}
            loading={index < 3 ? 'eager' : 'lazy'}
            className="w-full h-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4">
          <CategoryBadge category={activity.category} light />
        </div>
        <div className="absolute top-4 right-4 bg-black/80 text-amber-300 text-xs font-mono font-semibold px-2.5 py-1 tracking-wider backdrop-blur-md border border-amber-500/30 rounded-md">
          ACT {activity.number}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between bg-white dark:bg-slate-900">
        <div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white text-balance group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {activity.title}
          </h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {activity.shortDescription}
          </p>

          {/* Impact stats */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10 flex flex-wrap gap-x-6 gap-y-2">
            {activity.impacts.map((impact, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-lg font-serif font-extrabold text-amber-600 dark:text-amber-400">
                  {impact.value}
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  {impact.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400 group-hover:gap-3 transition-all duration-300">
          <span>Read verified report</span>
          <ArrowRight className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        </div>
      </div>
    </Link>
  );
}
