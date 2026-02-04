'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryLightboxProps {
  images: string[];
}

export function GalleryLightbox({ images }: GalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSelectedIndex(null);
      } else if (e.key === 'ArrowLeft' && selectedIndex !== null) {
        setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight' && selectedIndex !== null) {
        setSelectedIndex((selectedIndex + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, images.length]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative flex items-center justify-center w-full h-full md:p-4" onClick={(e) => e.stopPropagation()}>
            {/* Image Container */}
            <img
              src={images[selectedIndex]}
              alt={`Balloon creations ${selectedIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] h-auto w-auto object-contain"
            />

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/90 hover:bg-white transition text-black shadow-lg"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 md:left-0 md:-translate-x-12 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 md:right-0 md:translate-x-12 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-4 md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-12 text-white font-semibold bg-black/50 px-4 py-2 rounded-full">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Keyboard Hint (Desktop) */}
            <div className="hidden md:block absolute bottom-0 right-0 md:translate-x-12 md:translate-y-12 text-white/60 text-sm">
              <div>← → Keys to navigate</div>
              <div>ESC to close</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
