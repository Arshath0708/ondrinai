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
      className="card-advanced card-sheen group flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
    >
      {/* Image Container with Ambient Shadow */}
      <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
        {primaryPhoto && (
          <img
            src={primaryPhoto.url}
            alt={primaryPhoto.alt}
            loading={index < 3 ? 'eager' : 'lazy'}
            className="w-full h-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-108"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4 z-10">
          <CategoryBadge category={activity.category} light />
        </div>
        <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 bg-black/75 text-amber-300 text-xs font-mono font-bold px-3 py-1 tracking-wider backdrop-blur-md border border-amber-500/40 rounded-full shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>ACT {activity.number}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white text-balance group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {activity.title}
          </h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {activity.shortDescription}
          </p>

          {/* Impact stats */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/10 grid grid-cols-2 gap-3">
            {activity.impacts.map((impact, i) => (
              <div key={i} className="flex flex-col p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-white/5">
                <span className="text-xl font-serif font-extrabold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                  {impact.value}
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5 font-semibold">
                  {impact.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-sm font-semibold text-amber-600 dark:text-amber-400">
          <span>Read verified report</span>
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/10 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
