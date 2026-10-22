import React, { useState, useRef, useEffect } from 'react';
import { BrushStrokeUnderline } from './common/Doodles';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface GalleryPhoto {
  id: number;
  url: string;
  title: string;
  tag?: string;
}

export const GaleriaSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Photos organized to match the exact bento / mosaic structure of Image 2
  const allPhotos: GalleryPhoto[] = [
    // 1.
    {
      id: 1,
      url: 'https://i.ibb.co/gbpfvrfS/Gemini-Generated-Image-1h6l6u1h6l6u1h6l.jpg',
      title: 'Pão de Queijo com Molho Cremoso',
      tag: 'Cheddar',
    },
    // 2.
    {
      id: 2,
      url: 'https://i.ibb.co/nNPDhtsC/Gemini-Generated-Image-7o6yzr7o6yzr7o6y.jpg',
      title: 'Tigela de Pães Dourados na Porcelana',
      tag: 'Recém-assado',
    },
    // 3.
    {
      id: 3,
      url: 'https://i.ibb.co/B2wd4Jgw/Gemini-Generated-Image-21yv7m21yv7m21yv.jpg',
      title: 'Tábua com Goiabada Cascão & Café',
      tag: 'Romeu & Julieta',
    },
    // 4.
    {
      id: 4,
      url: 'https://i.ibb.co/v6Vpw3XF/Gemini-Generated-Image-sdy1qcsdy1qcsdy1.jpg',
      title: 'Doces, Brigadeiros e Novidades',
      tag: 'Sweets & Bites',
    },
    // 5.
    {
      id: 5,
      url: 'https://i.ibb.co/1fT9K3wS/Gemini-Generated-Image-fnj1eefnj1eefnj1.jpg',
      title: 'Fornada Quentinha de Pão de Queijo',
      tag: 'Tradição',
    },
    // 6. (Center Hero)
    {
      id: 6,
      url: 'https://i.ibb.co/DgKSzjFK/Gemini-Generated-Image-ijk733ijk733ijk7.jpg',
      title: 'Recheio Puxando Puro Queijo de Verdade',
      tag: 'Puro Queijo',
    },
    // 7.
    {
      id: 7,
      url: 'https://i.ibb.co/cSHt2xgk/6565ec7fca0cefe7c7dd2a3f59ea7458.jpg',
      title: 'Waffle de Pão de Queijo Crocante Dourado',
      tag: 'Waffle',
    },
    // 8.
    {
      id: 8,
      url: 'https://i.ibb.co/XH0KKZg/Gemini-Generated-Image-yxm9ytyxm9ytyxm9.jpg',
      title: 'Pão de Queijo Recém-saído do Forno',
      tag: 'No Forno',
    },
    // 9.
    {
      id: 9,
      url: 'https://i.ibb.co/1fT9K3wS/Gemini-Generated-Image-fnj1eefnj1eefnj1.jpg',
      title: 'Porção Artesanal Servida na Madeira',
      tag: 'Sabor de Minas',
    },
    // 10.
    {
      id: 10,
      url: 'https://i.ibb.co/4nV8z245/de5475b096964328db561be7903050f2.jpg',
      title: 'Cesto de Pães de Queijo para a Família',
      tag: 'Família',
    },
    // 11.
    {
      id: 11,
      url: 'https://i.ibb.co/gbFnPVB4/Gemini-Generated-Image-v6bqev6bqev6bqev.jpg',
      title: 'Café Colonial com Pão de Queijo Macio',
      tag: 'Café da Manhã',
    },
    // 12.
    {
      id: 12,
      url: 'https://i.ibb.co/LXqsvjhP/Gemini-Generated-Image-e36d7ge36d7ge36d.jpg',
      title: 'Doces Finos & Delícias Valacio\'s',
      tag: 'Gourmet',
    },
  ];

  // Helper to get localized title and tag
  const getPhotoData = (photo: GalleryPhoto): GalleryPhoto => {
    const loc = t.gallery?.photos?.find((p) => p.id === photo.id);
    return {
      ...photo,
      title: loc?.title || photo.title,
      tag: loc?.tag || photo.tag,
    };
  };

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 20);

    // Estimate active slide
    const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth || 1);
    const totalDots = 6;
    setActiveSlideIndex(Math.min(totalDots - 1, Math.floor(progress * totalDots)));
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distance = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'right' ? distance : -distance,
      behavior: 'smooth',
    });
  };

  const handleOpenPhoto = (photo: GalleryPhoto) => {
    setSelectedPhoto(getPhotoData(photo));
  };

  // Lightbox navigation
  const handleLightboxNav = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return;
    const currentIndex = allPhotos.findIndex((p) => p.id === selectedPhoto.id);
    if (currentIndex === -1) return;
    const newIndex =
      direction === 'next'
        ? (currentIndex + 1) % allPhotos.length
        : (currentIndex - 1 + allPhotos.length) % allPhotos.length;
    setSelectedPhoto(getPhotoData(allPhotos[newIndex]));
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === 'Escape') setSelectedPhoto(null);
      if (e.key === 'ArrowRight') handleLightboxNav('next');
      if (e.key === 'ArrowLeft') handleLightboxNav('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  // Render photo tile component with image-2 aesthetic
  const renderTile = (photo: GalleryPhoto, className: string) => {
    const data = getPhotoData(photo);
    return (
      <div
        key={photo.id}
        onClick={() => handleOpenPhoto(photo)}
        className={`relative overflow-hidden cursor-pointer group/tile bg-stone-200 select-none ${className}`}
      >
        <img
          src={photo.url}
          alt={data.title}
          className="w-full h-full object-cover group-hover/tile:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Hover vignette overlay with title & tag */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/tile:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 text-white">
          {data.tag && (
            <span className="inline-block self-start px-2 py-0.5 rounded bg-[#de8a27] text-white font-black text-[10px] uppercase tracking-wider mb-1 shadow-sm">
              {data.tag}
            </span>
          )}
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-brand font-bold text-xs sm:text-sm drop-shadow-sm line-clamp-1">
              {data.title}
            </h4>
            <ZoomIn className="w-4 h-4 text-amber-300 shrink-0" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="galeria-section"
      className="relative w-full py-12 sm:py-16 md:py-20 bg-[#faf4ea] overflow-hidden"
    >
      {/* Header matching site style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-8 sm:mb-12">
        <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#412213] leading-tight">
          {t.gallery?.title || 'Galeria de fotos'}
        </h2>
        <div className="mt-2.5">
          <BrushStrokeUnderline className="w-32 sm:w-44 h-2.5 mx-auto" color="#412213" />
        </div>
        <p className="mt-3 font-brand font-medium text-stone-600 text-sm sm:text-base tracking-wide">
          {t.gallery?.subtitle || 'De dar água na boca'}
        </p>
      </div>

      {/* Mosaic Container - Exactly Formatted as Image 2 */}
      <div className="relative w-full group/gallery">
        {/* Scroll Track with seamless tight gaps */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-1 sm:gap-1.5 md:gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth snap-x snap-mandatory px-1 sm:px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* ========================================================= */}
          {/* BLOCK 1 (Matches Image 2 Leftmost: 2 small top, 1 wide bot) */}
          {/* ========================================================= */}
          <div className="flex-shrink-0 w-[300px] sm:w-[380px] md:w-[460px] lg:w-[506px] h-[340px] sm:h-[420px] md:h-[480px] lg:h-[515px] flex flex-col gap-1 sm:gap-1.5 md:gap-2 snap-start">
            {/* Top row: 2 photos split 50/50 */}
            <div className="h-[33%] sm:h-[35%] flex gap-1 sm:gap-1.5 md:gap-2">
              {renderTile(allPhotos[0], 'w-1/2 h-full')}
              {renderTile(allPhotos[1], 'w-1/2 h-full')}
            </div>
            {/* Bottom row: 1 wide photo */}
            <div className="h-[67%] sm:h-[65%] w-full">
              {renderTile(allPhotos[2], 'w-full h-full')}
            </div>
          </div>

          {/* ========================================================= */}
          {/* BLOCK 2 (Matches Image 2 Column 2: 2 stacked photos)      */}
          {/* ========================================================= */}
          <div className="flex-shrink-0 w-[220px] sm:w-[280px] md:w-[340px] lg:w-[375px] h-[340px] sm:h-[420px] md:h-[480px] lg:h-[515px] flex flex-col gap-1 sm:gap-1.5 md:gap-2 snap-start">
            {/* Top: Chocolate basket */}
            <div className="h-[49%] w-full">
              {renderTile(allPhotos[3], 'w-full h-full')}
            </div>
            {/* Bottom: Stretched catupiry requeijao */}
            <div className="h-[51%] w-full">
              {renderTile(allPhotos[4], 'w-full h-full')}
            </div>
          </div>

          {/* ========================================================= */}
          {/* BLOCK 3 (Matches Image 2 Center: Hero tall/wide pile)    */}
          {/* ========================================================= */}
          <div className="flex-shrink-0 w-[420px] sm:w-[540px] md:w-[680px] lg:w-[772px] h-[340px] sm:h-[420px] md:h-[480px] lg:h-[515px] snap-start">
            {renderTile(allPhotos[5], 'w-full h-full')}
          </div>

          {/* ========================================================= */}
          {/* BLOCK 4 (Matches Image 2 Right: Thermos & breakfast table)*/}
          {/* ========================================================= */}
          <div className="flex-shrink-0 w-[220px] sm:w-[280px] md:w-[320px] lg:w-[344px] h-[340px] sm:h-[420px] md:h-[480px] lg:h-[515px] relative snap-start">
            {renderTile(allPhotos[6], 'w-full h-full')}

            {/* Vertical Dots Overlay - Identical to Image 2 */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-2 z-10 pointer-events-none">
              {[0, 1, 2, 3, 4, 5].map((dotIdx) => (
                <div
                  key={dotIdx}
                  className={`w-2 h-2 rounded-full border border-amber-400/90 transition-all duration-300 ${
                    activeSlideIndex === dotIdx
                      ? 'bg-amber-400 scale-125 ring-2 ring-amber-300/50'
                      : 'bg-amber-400/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* EXTENSION / CONTINUATION BLOCK (More Artisan Delights)    */}
          {/* ========================================================= */}
          <div className="flex-shrink-0 w-[300px] sm:w-[380px] md:w-[460px] lg:w-[506px] h-[340px] sm:h-[420px] md:h-[480px] lg:h-[515px] flex flex-col gap-1 sm:gap-1.5 md:gap-2 snap-start">
            <div className="h-[48%] flex gap-1 sm:gap-1.5 md:gap-2">
              {renderTile(allPhotos[7], 'w-1/2 h-full')}
              {renderTile(allPhotos[8], 'w-1/2 h-full')}
            </div>
            <div className="h-[52%] w-full">
              {renderTile(allPhotos[9], 'w-full h-full')}
            </div>
          </div>

          <div className="flex-shrink-0 w-[240px] sm:w-[300px] md:w-[360px] lg:w-[400px] h-[340px] sm:h-[420px] md:h-[480px] lg:h-[515px] flex flex-col gap-1 sm:gap-1.5 md:gap-2 snap-start">
            <div className="h-[50%] w-full">
              {renderTile(allPhotos[10], 'w-full h-full')}
            </div>
            <div className="h-[50%] w-full">
              {renderTile(allPhotos[11], 'w-full h-full')}
            </div>
          </div>
        </div>

        {/* Floating Right Navigation Arrow (as seen on Image 2 right edge) */}
        {canScrollRight && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-stone-900 shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer z-20 border border-stone-200/80 backdrop-blur-sm"
            aria-label="Ver mais fotos"
          >
            <ChevronRight className="w-6 h-6 text-stone-900" />
          </button>
        )}

        {/* Floating Left Navigation Arrow (shows when scrolled right) */}
        {canScrollLeft && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-stone-900 shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer z-20 border border-stone-200/80 backdrop-blur-sm"
            aria-label="Fotos anteriores"
          >
            <ChevronLeft className="w-6 h-6 text-stone-900" />
          </button>
        )}
      </div>

      {/* Lightbox Modal with Zoom & Navigation */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition cursor-pointer border border-white/20"
            aria-label="Fechar modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous in Lightbox */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLightboxNav('prev');
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/60 hover:bg-black text-white transition hover:scale-110 active:scale-95 cursor-pointer border border-white/20"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next in Lightbox */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLightboxNav('next');
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/60 hover:bg-black text-white transition hover:scale-110 active:scale-95 cursor-pointer border border-white/20"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Card */}
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-stone-950 rounded-xl overflow-hidden shadow-2xl border border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 min-h-0 flex items-center justify-center bg-stone-950 overflow-hidden">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-[75vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>

            <div className="p-4 sm:p-5 bg-[#32170c] text-white flex items-center justify-between border-t border-amber-950/40">
              <div>
                {selectedPhoto.tag && (
                  <span className="inline-block px-2.5 py-0.5 rounded bg-[#de8a27] text-white font-bold text-xs uppercase tracking-wide mb-1">
                    {selectedPhoto.tag}
                  </span>
                )}
                <h3 className="font-brand font-black text-base sm:text-xl">
                  {selectedPhoto.title}
                </h3>
              </div>
              <span className="text-xs text-amber-200/90 font-brand hidden sm:inline-block">
                Valacio's Sweets & Bites
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
