import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  Heart,
} from 'lucide-react';
import { galleryItems } from '@/data/gallery';
import { Reveal, PageHeader } from '@/components/ui/Primitives';
import type { GalleryItem, ActivityCategory } from '@/types';

type FilterCategory = 'ALL' | ActivityCategory;

const CATEGORIES: { label: string; value: FilterCategory }[] = [
  { label: 'All Photos', value: 'ALL' },
  { label: 'FEED', value: 'FEED' },
  { label: 'PLANT', value: 'PLANT' },
  { label: 'BUILD', value: 'BUILD' },
  { label: 'RESPOND', value: 'RESPOND' },
];

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('ALL');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  // Filter items based on selected category
  const filteredItems = galleryItems.filter((item) =>
    activeCategory === 'ALL' ? true : item.category === activeCategory
  );

  // Open lightbox
  const openLightbox = (index: number) => {
    setActiveItemIndex(index);
  };

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setActiveItemIndex(null);
  }, []);

  // Previous item in lightbox
  const prevLightbox = useCallback(() => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
    );
  }, [activeItemIndex, filteredItems.length]);

  // Next item in lightbox
  const nextLightbox = useCallback(() => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredItems.length
    );
  }, [activeItemIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex, closeLightbox, prevLightbox, nextLightbox]);

  // Disable body scroll when lightbox is open
  useEffect(() => {
    if (activeItemIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeItemIndex]);

  const currentItem: GalleryItem | null =
    activeItemIndex !== null ? filteredItems[activeItemIndex] || null : null;

  return (
    <>
      <PageHeader
        eyebrow="Visual Archive"
        title="Authentic Community Moments"
        subtitle="Genuine photographic documentation from our on-ground activities in Madurai. Real volunteers, verified actions, and unfiltered community care."
      />

      {/* Category Filter Tabs */}
      <section className="bg-cream/40 border-b border-forest/10 py-4 sticky top-20 sm:top-24 z-30 backdrop-blur-md">
        <div className="container-max container-px">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none" role="tablist" aria-label="Gallery category filters">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveCategory(cat.value);
                    setActiveItemIndex(null);
                  }}
                  className={`px-4 py-2 text-xs font-semibold rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-forest text-cream shadow-sm'
                      : 'bg-off-white text-charcoal/70 border border-forest/15 hover:border-forest/30 hover:text-forest'
                  }`}
                >
                  {cat.label}
                  {cat.value !== 'ALL' && (
                    <span className="ml-1.5 opacity-60 font-mono text-[10px]">
                      ({galleryItems.filter((i) => i.category === cat.value).length})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="py-12 sm:py-16">
        <div className="container-max container-px">
          {filteredItems.length === 0 ? (
            /* Graceful Empty State for Categories with No Published Images */
            <div className="py-20 text-center max-w-md mx-auto">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-forest/10 flex items-center justify-center text-forest">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-forest mb-2">
                No Photos Published in {activeCategory} Yet
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed mb-6">
                We only publish authentic photographs from confirmed, completed initiatives. New photographic records will be published after our upcoming drives.
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory('ALL')}
                className="btn-outline text-xs"
              >
                View All Activity Photos
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item, index) => (
                <Reveal key={item.id} delay={index * 80}>
                  <div className="group bg-off-white border border-forest/15 rounded-sm overflow-hidden shadow-2xs hover:shadow-md hover:border-forest/30 transition-all flex flex-col justify-between h-full">
                    
                    {/* Clickable Image Container */}
                    <div
                      className="relative h-64 overflow-hidden cursor-pointer bg-forest/5"
                      onClick={() => openLightbox(index)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View full image: ${item.title}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openLightbox(index);
                        }
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Category Badge overlay */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider text-cream bg-deep-green/90 rounded-full uppercase shadow-xs">
                          {item.category}
                        </span>
                      </div>

                      {/* Expand overlay icon */}
                      <div className="absolute inset-0 bg-forest/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1.5 bg-off-white/95 text-forest text-xs font-semibold rounded-sm shadow-md flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5" /> Click to Expand
                        </span>
                      </div>
                    </div>

                    {/* Metadata & Description */}
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center gap-3 text-[11px] text-charcoal/60 mb-2">
                          {item.date && (
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-forest" />
                              {item.date}
                            </span>
                          )}
                          {item.location && (
                            <span className="inline-flex items-center gap-1 line-clamp-1">
                              <MapPin className="w-3 h-3 text-forest" />
                              {item.location}
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif font-bold text-forest text-base mb-2 group-hover:text-deep-green transition-colors">
                          {item.title}
                        </h3>

                        {item.description && (
                          <p className="text-xs text-charcoal/70 leading-relaxed mb-4">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Bottom Link to Detailed Activity */}
                      {item.activitySlug && (
                        <div className="pt-3 border-t border-forest/10">
                          <Link
                            to={`/activities/${item.activitySlug}`}
                            className="text-xs font-semibold text-forest hover:text-deep-green inline-flex items-center gap-1.5 group/link"
                          >
                            <span>Read Verified Activity Report</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {/* Photographic Ethics & Dignity Note */}
          <div className="mt-14 p-5 bg-cream/40 border border-forest/15 rounded-sm max-w-3xl mx-auto text-xs text-charcoal/70 leading-relaxed">
            <strong className="text-forest font-semibold block mb-1">
              Ethical Photography Notice:
            </strong>
            ONDRINAI documents community activities to maintain public transparency and inspire collective responsibility. We respect the dignity and privacy of all participants, elderly residents, and community members. Sensitive locations, personal identifying numbers, and private data are never published.
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title}
          className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-sm flex flex-col justify-between animate-fade-in p-4 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between text-cream max-w-6xl w-full mx-auto pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-[10px] font-mono uppercase text-sage tracking-widest font-bold">
                {currentItem.category} &bull; {currentItem.date}
              </span>
              <h3 className="text-base sm:text-lg font-serif font-semibold text-cream">
                {currentItem.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={closeLightbox}
              className="p-2 rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition-colors"
              aria-label="Close image preview"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image Stage */}
          <div
            className="relative flex items-center justify-center flex-1 my-2 max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            {filteredItems.length > 1 && (
              <button
                type="button"
                onClick={prevLightbox}
                className="absolute left-2 sm:left-4 z-10 p-2 sm:p-3 rounded-full bg-charcoal/70 hover:bg-charcoal text-cream transition-all border border-cream/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Displayed Image */}
            <img
              src={currentItem.image}
              alt={currentItem.alt}
              className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-sm shadow-2xl border border-cream/15"
            />

            {/* Next Button */}
            {filteredItems.length > 1 && (
              <button
                type="button"
                onClick={nextLightbox}
                className="absolute right-2 sm:right-4 z-10 p-2 sm:p-3 rounded-full bg-charcoal/70 hover:bg-charcoal text-cream transition-all border border-cream/20"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Caption & Activity Link */}
          <div
            className="max-w-4xl w-full mx-auto text-center pt-3 text-xs text-cream/75 flex flex-col sm:flex-row items-center justify-between gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="max-w-xl text-left">
              {currentItem.description}
            </p>
            {currentItem.activitySlug && (
              <Link
                to={`/activities/${currentItem.activitySlug}`}
                onClick={closeLightbox}
                className="btn-light text-xs shrink-0 py-2 px-3"
              >
                <span>View Full Activity Report</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
