import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { galleryItems } from '@/data/gallery';
import { Reveal, PageHeader } from '@/components/ui/Primitives';
import type { GalleryItem } from '@/types';

type GalleryCategory = 'ALL' | 'FEED' | 'PLANT' | 'BUILD';

const CATEGORIES: { label: string; value: GalleryCategory }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Feed', value: 'FEED' },
  { label: 'Plant', value: 'PLANT' },
  { label: 'Build', value: 'BUILD' },
];

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('ALL');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (id: string) => {
    setFailedImages((prev) => new Set(prev).add(id));
  };

  // Filter items based on selected category (Feed, Plant, Build) and exclude missing/deleted images
  const filteredItems = galleryItems
    .filter((item) => !failedImages.has(item.id))
    .filter((item) =>
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

  // Previous image in lightbox
  const prevLightbox = useCallback(() => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
    );
  }, [activeItemIndex, filteredItems.length]);

  // Next image in lightbox
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
        eyebrow="Photo Archive &bull; Ground Documentation"
        title="Our Work in Photos"
        subtitle="A living visual record of verified on-ground care, nourishment, and environmental renewal."
      />

      {/* Category Filter Tabs */}
      <section className="glass-light dark:bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 py-4 sticky top-20 sm:top-24 z-30 shadow-xs">
        <div className="container-max container-px">
          <div
            className="flex items-center gap-2.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none"
            role="tablist"
            aria-label="Gallery category filters"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.value;
              const count =
                cat.value === 'ALL'
                  ? galleryItems.length
                  : galleryItems.filter((i) => i.category === cat.value).length;

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
                  className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 dark:bg-emerald-400 text-white dark:text-slate-950 shadow-md font-bold'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400'
                  }`}
                >
                  {cat.label}
                  <span className="ml-1.5 opacity-60 font-mono text-[11px]">
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pure Photo Grid Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-[#0B0F19]">
        <div className="container-max container-px">
          {filteredItems.length === 0 ? (
            /* Empty State */
            <div className="py-24 text-center max-w-md mx-auto">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-2">
                No Photos in {activeCategory} Yet
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-sans">
                Photos for this category will be added soon as new community initiatives are completed.
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory('ALL')}
                className="btn-secondary rounded-xl text-xs"
              >
                View All Photos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <Reveal key={item.id} delay={index * 40}>
                  <div
                    onClick={() => openLightbox(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View photo ${index + 1}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(index);
                      }
                    }}
                    className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-900 border border-slate-200/90 dark:border-white/10 shadow-xs hover:shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      onError={() => handleImageError(item.id)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-3 rounded-full bg-white text-slate-900 shadow-lg scale-90 group-hover:scale-100 transition-transform">
                        <Camera className="w-4 h-4 text-emerald-700" />
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal (Pure Photo View) */}
      {currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex flex-col justify-between animate-fade-in p-4 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Top Bar with Counter and Close */}
          <div
            className="flex items-center justify-between text-white max-w-6xl w-full mx-auto pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs font-mono tracking-widest text-emerald-400 font-semibold uppercase">
              {(activeItemIndex ?? 0) + 1} / {filteredItems.length} &bull; Ground Archive
            </span>
            <button
              type="button"
              onClick={closeLightbox}
              className="p-2 rounded-full bg-white/10 hover:bg-emerald-500/30 text-white transition-colors cursor-pointer border border-emerald-500/30"
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
                className="absolute left-2 sm:left-4 z-10 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black text-white transition-all border border-emerald-500/30 cursor-pointer shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Displayed Full Image */}
            <img
              src={currentItem.image}
              alt={currentItem.alt}
              className="max-h-[82vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-emerald-500/30"
            />

            {/* Next Button */}
            {filteredItems.length > 1 && (
              <button
                type="button"
                onClick={nextLightbox}
                className="absolute right-2 sm:right-4 z-10 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black text-white transition-all border border-emerald-500/30 cursor-pointer shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom spacer for balance */}
          <div className="h-6" />
        </div>
      )}
    </>
  );
}
