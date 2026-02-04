'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryLightboxProps {
  images: string[];
}

export function GalleryLightbox({ images }: GalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartTime = useRef(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(null);
    } else if (e.key === 'ArrowLeft' && selectedIndex !== null) {
      goToPrevious();
    } else if (e.key === 'ArrowRight' && selectedIndex !== null) {
      goToNext();
    }
  }, [isOpen, selectedIndex]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
    touchStartTime.current = Date.now();
  }, []);

  const handleSwipe = useCallback((endX: number) => {
    const swipeDistance = touchStartX.current - endX;
    const swipeTime = Date.now() - touchStartTime.current;
    const minSwipeDistance = 30;
    const maxSwipeTime = 1000; // 1 second

    if (selectedIndex === null || swipeTime > maxSwipeTime) return;

    // Swipe left - go to next image
    if (swipeDistance > minSwipeDistance) {
      goToNext();
    }
    // Swipe right - go to previous image
    else if (swipeDistance < -minSwipeDistance) {
      goToPrevious();
    }
  }, [selectedIndex]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe(touchEndX.current);
  }, [handleSwipe]);

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, false);
    window.addEventListener('touchend', handleTouchEnd, false);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen, handleKeyDown, handleTouchStart, handleTouchEnd]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedIndex(null), 300);
  };

  const goToPrevious = useCallback(() => {
    if (selectedIndex === null || isTransitioning) return;
    setIsTransitioning(true);
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev! - 1));
    setTimeout(() => setIsTransitioning(false), 300);
  }, [selectedIndex, isTransitioning, images.length]);

  const goToNext = useCallback(() => {
    if (selectedIndex === null || isTransitioning) return;
    setIsTransitioning(true);
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev! + 1));
    setTimeout(() => setIsTransitioning(false), 300);
  }, [selectedIndex, isTransitioning, images.length]);

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid gap-3 sm:gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => openLightbox(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 transition hover:shadow-2xl hover:ring-brand-orange/50 cursor-pointer"
          >
            <img
              src={src}
              alt={`Balloon creations ${i + 1}`}
              className="w-full h-full object-contain bg-gradient-to-br from-slate-50 to-slate-100 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/0 to-transparent opacity-0 transition group-hover:opacity-20" />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
              <div className="rounded-full bg-white/90 p-3">
                <div className="text-slate-900">🔍</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isOpen && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
          onClick={closeLightbox}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideInFromLeft {
              from { opacity: 0; transform: translateX(-30px); }
              to { opacity: 1; transform: translateX(0); }
            }
            @keyframes slideInFromRight {
              from { opacity: 0; transform: translateX(30px); }
              to { opacity: 1; transform: translateX(0); }
            }
            .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
            .animate-slideImage { animation: slideInFromLeft 0.3s ease-out; }
            .animate-slideImageReverse { animation: slideInFromRight 0.3s ease-out; }
          `}</style>
          <div className="relative flex items-center justify-center w-full h-full" onClick={(e) => e.stopPropagation()}>
            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                key={selectedIndex}
                src={images[selectedIndex]}
                alt={`Balloon creations ${selectedIndex + 1}`}
                className="max-h-[80vh] sm:max-h-[85vh] max-w-[95vw] sm:max-w-[90vw] h-auto w-auto object-contain animate-slideImage"
              />
            </div>

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 sm:p-3 rounded-full bg-white/90 hover:bg-white transition text-black shadow-lg z-10"
              aria-label="Close lightbox"
            >
              <X size={24} className="sm:w-7 sm:h-7" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              disabled={isTransitioning}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 md:left-0 md:-translate-x-12 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition text-white disabled:opacity-50 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} className="sm:w-8 sm:h-8" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              disabled={isTransitioning}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 md:right-0 md:translate-x-12 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition text-white disabled:opacity-50 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={28} className="sm:w-8 sm:h-8" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-12 text-white font-semibold bg-black/50 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm z-10">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Keyboard Hint (Desktop) */}
            <div className="hidden md:block absolute bottom-0 right-0 md:translate-x-12 md:translate-y-12 text-white/60 text-xs sm:text-sm">
              <div>← → Keys or swipe to navigate</div>
              <div>ESC to close</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
