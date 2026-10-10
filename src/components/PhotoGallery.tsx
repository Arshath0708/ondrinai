import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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

  if (photos.length === 1) {
    return (
      <div className={className}>
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          className="block w-full overflow-hidden bg-sage/20 aspect-[16/10] group"
          aria-label="Open photo in full view"
        >
          <img
            src={photos[0].url}
            alt={photos[0].alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={`grid grid-cols-2 gap-3 sm:gap-4 ${className}`}>
        {photos.map((photo, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className={`overflow-hidden bg-sage/20 group ${i === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-square'}`}
            aria-label={`Open photo ${i + 1} in full view`}
          >
            <img
              src={photo.url}
              alt={photo.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-deep-green/95 backdrop-blur-sm flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-cream/80 hover:text-cream p-2"
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
                className="absolute left-3 sm:left-6 text-cream/80 hover:text-cream p-2"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
                className="absolute right-3 sm:right-6 text-cream/80 hover:text-cream p-2"
                aria-label="Next photo"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <figure
            className="max-w-5xl w-full px-12 sm:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightboxIndex].url}
              alt={photos[lightboxIndex].alt}
              className="w-full max-h-[75vh] object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-cream/60">
              {photos[lightboxIndex].alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
