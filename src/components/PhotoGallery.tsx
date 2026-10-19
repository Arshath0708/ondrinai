import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import type { ActivityPhoto } from '@/types';

interface PhotoGalleryProps {
  photos: ActivityPhoto[];
  className?: string;
}

export function PhotoGallery({ photos, className = '' }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const nextPhoto = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, prevPhoto, nextPhoto]);

  if (photos.length === 0) return null;

  return (
    <>
      <div className={className}>
        {photos.length === 1 ? (
          <div className="relative group overflow-hidden border border-forest/15 shadow-sm bg-sage/10">
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="block w-full overflow-hidden aspect-[16/10] sm:aspect-[16/9] text-left relative focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              aria-label={`View full size: ${photos[0].alt}`}
            >
              <img
                src={photos[0].url}
                alt={photos[0].alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-green/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                <span className="text-sm font-medium text-cream flex items-center gap-2">
                  <Maximize2 className="w-4 h-4" />
                  Click to view full photo
                </span>
              </div>
            </button>
            <div className="p-4 bg-off-white border-t border-forest/10">
              <p className="text-xs sm:text-sm text-charcoal/75 italic">
                {photos[0].alt}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {photos.map((photo, i) => (
              <div key={i} className="relative group overflow-hidden border border-forest/15 shadow-sm bg-sage/10">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="block w-full aspect-[4/3] relative focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
                  aria-label={`Open photo ${i + 1} in full view`}
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-deep-green/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-xs font-medium text-cream bg-deep-green/80 px-3 py-1.5 backdrop-blur-sm flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5" />
                      View
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-deep-green/95 backdrop-blur-md flex items-center justify-center animate-fade-in p-4 sm:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-cream/80 hover:text-cream p-2.5 rounded-full bg-forest/40 hover:bg-forest/80 transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream"
            aria-label="Close photo viewer"
          >
            <X className="w-6 h-6" />
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevPhoto();
                }}
                className="absolute left-3 sm:left-6 text-cream/80 hover:text-cream p-3 rounded-full bg-forest/40 hover:bg-forest/80 transition-colors z-10"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
                className="absolute right-3 sm:right-6 text-cream/80 hover:text-cream p-3 rounded-full bg-forest/40 hover:bg-forest/80 transition-colors z-10"
                aria-label="Next photo"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          )}

          <figure
            className="max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightboxIndex].url}
              alt={photos[lightboxIndex].alt}
              className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm"
            />
            <figcaption className="mt-4 text-center text-sm text-cream/80 max-w-2xl px-4">
              {photos[lightboxIndex].alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
