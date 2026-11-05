import React, { useState, useRef, useEffect } from 'react';
import { BrushStrokeUnderline } from './common/Doodles';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface GalleryPhoto {
  id: number;
  url: string;
  title: string;
  tag?: string;
  aspectClass?: string;
  objectPosition?: string;
}

export const GaleriaSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Photos organized matching the user's exact mosaic:
  // First 6 photos:
  // 1: Pão de queijo bowl (galeria 10) [1:1 Square]
  // 2: Waffle with ice cream (galeria 2) [1:1 Square]
  // 3: Family kitchen table (header 1) [1.79:1 Landscape]
  // 4: Family in garden (header 2) [1.79:1 Landscape]
  // 5: All 4 packages on wood table (header 3) [1.79:1 Landscape]
  // 6: Jucilea at table with products (header site valacio) [1.79:1 Landscape]
  const allPhotos: GalleryPhoto[] = [
    // 1. Top Left 1 (Square 1:1)
    {
      id: 1,
      url: 'https://raw.githubusercontent.com/easybyzcreator/imagens/83d96ba4629ef13f956945aa7a19ea0cfa989fd5/galeria%20site%20valacio%2010.jpg',
      title: 'Pão de Queijo Dourado na Tigela',
      tag: 'Tradicional',
      aspectClass: 'aspect-square',
    },
    // 2. Top Left 2 (Square 1:1)
    {
      id: 2,
      url: 'https://raw.githubusercontent.com/easybyzcreator/imagens/83d96ba4629ef13f956945aa7a19ea0cfa989fd5/galeria%20site%20valacio%202.jpg',
      title: 'Waffle com Sorvete e Frutas Vermelhas',
      tag: 'Waffle Especial',
      aspectClass: 'aspect-square',
    },
    // 3. Top Right (Family kitchen table 1.79:1)
    {
      id: 3,
      url: 'https://raw.githubusercontent.com/easybyzcreator/imagens/94a3d61448cc8472f15cad90cee185afc90ae5d7/header%20site%20valacio%201.jpg',
      title: 'Família Saboreando Waffles na Cozinha',
      tag: 'Momento Família',
      aspectClass: 'aspect-[2752/1536]',
    },
    // 4. Bottom Left (Family in garden 1.79:1)
    {
      id: 4,
      url: 'https://raw.githubusercontent.com/easybyzcreator/imagens/94a3d61448cc8472f15cad90cee185afc90ae5d7/header%20site%20valacio%202.jpg',
      title: 'Café da Manhã em Família ao Ar Livre',
      tag: 'Café Colonial',
      aspectClass: 'aspect-[2752/1536]',
    },
    // 5. Bottom Middle (4 Packages on wood table 1.79:1)
    {
      id: 5,
      url: 'https://raw.githubusercontent.com/easybyzcreator/imagens/94a3d61448cc8472f15cad90cee185afc90ae5d7/header%20site%20valacio%203.jpg',
      title: 'Linha Completa de Embalagens Artesanais',
      tag: 'Embalagens Oficiais',
      aspectClass: 'aspect-[2752/1536]',
    },
    // 6. Bottom Right (Jucilea with products 1.79:1)
    {
      id: 6,
      url: 'https://raw.githubusercontent.com/easybyzcreator/imagens/181452c0a817344ae3c32f0f5d3c771f97a2f45a/header%20site%20valacio.jpg',
      title: 'Jucilea & A Paixão pelas Receitas Valacio\'s',
      tag: 'Nossa Criadora',
      aspectClass: 'aspect-[2752/1536]',
    },
    // 7. (galeria 1)
    {
      id: 7,
      url: 'https://raw.githubusercontent.com/easybyzcreator/imagens/83d96ba4629ef13f956945aa7a19ea0cfa989fd5/galeria%20site%20valacio%201.jpg',
      title: 'Pão de Queijo com Molho e Cheddar',
      tag: 'Cheddar',
      aspectClass: 'aspect-square',
    },
    // 8. (galeria 3)
    {
      id: 8,
      url: 'https://raw.githubusercontent.com/easybyzcreator/imagens/83d96ba4629ef13f956945aa7a19ea0cfa989fd5/galeria%20site%20valacio%203.jpg',
      title: 'Tábua com Goiabada Cascão & Café',
      tag: 'Romeu & Julieta',
      aspectClass: 'aspect-square',
    },
    // 9. (galeria 4)
    {
      id: 9,
      url: 'https://raw.githubusercontent.com/easybyzcreator/imagens/83d96ba4629ef13f956945aa7a19ea0cfa989fd5/galeria%20site%20valacio%204.jpg',
      title: 'Doces, Brigadeiros e Novidades',
      tag: 'Sweets & Bites',
      aspectClass: 'aspect-square',
    },
    // 10. (galeria 5)
    {
      id: 10,
      url: 'https://raw.githubusercontent.com/easybyzcreator/imagens/83d96ba4629ef13f956945aa7a19ea0cfa989fd5/galeria%20site%20valacio%205.jpg',
      title: 'Fornada Quentinha de Pão de Queijo',
      tag: 'Tradição',
      aspectClass: 'aspect-square',
    },
    // 11. (galeria 6) Mulher preparando na air fryer
    {
      id: 11,
      url: 'https://raw.githubusercontent.com/easybyzcreator/imagens/83d96ba4629ef13f956945aa7a19ea0cfa989fd5/galeria%20site%20valacio%206.jpg',
      title: 'Receita Artesanal com Queijo Meia Cura',
      tag: 'Puro Queijo',
      aspectClass: 'aspect-[4/3]',
    },
    // 12. (galeria 7)
    {
      id: 12,
      url: 'https://raw.githubusercontent.com/easybyzcreator/imagens/83d96ba4629ef13f956945aa7a19ea0cfa989fd5/galeria%20site%20valacio%207.jpg',
      title: 'Waffle de Pão de Queijo Crocante Dourado',
      tag: 'Waffle',
      aspectClass: 'aspect-square',
    },
    // 13. (galeria 8)
    {
      id: 13,
      url: 'https://raw.githubusercontent.com/easybyzcreator/imagens/83d96ba4629ef13f956945aa7a19ea0cfa989fd5/galeria%20site%20valacio%208.jpg',
      title: 'Pão de Queijo Recém-saído do Forno',
      tag: 'No Forno',
      aspectClass: 'aspect-square',
    },
    // 14. (galeria 9)
    {
      id: 14,
      url: 'https://raw.githubusercontent.com/easybyzcreator/imagens/83d96ba4629ef13f956945aa7a19ea0cfa989fd5/galeria%20site%20valacio%209.jpg',
      title: 'Porção Artesanal Servida na Madeira',
      tag: 'Sabor de Minas',
      aspectClass: 'aspect-square',
    },
    // 15. Jucilea na Cozinha Artesanal - Positioned to preserve full head & face
    {
      id: 15,
      url: 'https://raw.githubusercontent.com/easybyzcreator/imagens/11853d02bf370bd85c461a56a6656e243b28a6ec/jucilea%20-%20site.jpg',
      title: 'Jucilea na Cozinha Artesanal Valacio\'s',
      tag: 'Nossa Criadora',
      aspectClass: 'aspect-[3/4]',
      objectPosition: 'object-top',
    },
  ];

  // Distribution into Row 1 and Row 2 - Mathematically balanced to eliminate any empty gap
  // Row 1 starts with [Bowl 1:1], [Waffle plate 1:1], [Family kitchen 1.79:1]
  // Total aspect units = 1.0 + 1.0 + 1.79 + 1.0 + 1.0 + 1.0 + 1.0 + 1.33 = 9.12
  const row1Photos = [
    allPhotos[0], // Bowl 1:1
    allPhotos[1], // Waffle 1:1
    allPhotos[2], // Family kitchen 1.79:1
    allPhotos[6], // Cheddar 1:1
    allPhotos[7], // Romeu & Julieta 1:1
    allPhotos[8], // Sweets & Bites 1:1
    allPhotos[9], // Fornada 1:1
    allPhotos[10], // Mulher air fryer 4:3
  ];

  // Row 2 starts with [Family garden 1.79:1], [4 Packages 1.79:1], [Jucilea 1.79:1]
  // Total aspect units = 1.79 + 1.79 + 1.79 + 1.0 + 1.0 + 1.0 + 0.75 = 9.12 (Exact match!)
  const row2Photos = [
    allPhotos[3], // Family garden 1.79:1
    allPhotos[4], // 4 Packages 1.79:1
    allPhotos[5], // Jucilea 1.79:1
    allPhotos[11], // Waffle crocante 1:1
    allPhotos[12], // No forno 1:1
    allPhotos[13], // Porção madeira 1:1
    allPhotos[14], // Jucilea cozinha 3:4 with object-top
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

  // Render photo tile component with exact proportional aspect ratio
  const renderTile = (photo: GalleryPhoto, isLast: boolean = false) => {
    const data = getPhotoData(photo);
    return (
      <div
        key={photo.id}
        onClick={() => handleOpenPhoto(photo)}
        className={`relative h-full ${photo.aspectClass || 'aspect-square'} ${
          isLast ? 'flex-grow min-w-0' : 'flex-shrink-0'
        } overflow-hidden cursor-pointer group/tile bg-stone-100 select-none shadow-sm hover:shadow-md transition-shadow`}
      >
        <img
          src={photo.url}
          alt={data.title}
          className={`w-full h-full object-cover ${
            photo.objectPosition || 'object-center'
          } group-hover/tile:scale-105 transition-transform duration-700 ease-out`}
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

      {/* Proportional Mosaic Track - Perfectly Balanced with Zero Holes */}
      <div className="relative w-full group/gallery">
        {/* Scroll Track with seamless tight gaps between rows and columns */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 scrollbar-none scroll-smooth snap-x snap-mandatory px-1 sm:px-2 md:px-3"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 w-max">
            {/* Row 1: [Photo 0: Bowl 1:1] [Photo 1: Waffle 1:1] [Photo 2: Kitchen 1.79:1] ... */}
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 h-[170px] sm:h-[220px] md:h-[260px] lg:h-[295px] w-full">
              {row1Photos.map((photo, i) => renderTile(photo, i === row1Photos.length - 1))}
            </div>

            {/* Row 2: [Photo 3: Garden 1.79:1] [Photo 4: 4 Packages 1.79:1] [Photo 5: Jucilea 1.79:1] ... */}
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 h-[170px] sm:h-[220px] md:h-[260px] lg:h-[295px] w-full">
              {row2Photos.map((photo, i) => renderTile(photo, i === row2Photos.length - 1))}
            </div>
          </div>
        </div>

        {/* Floating Right Navigation Arrow */}
        {canScrollRight && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-stone-900 shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer z-20 border border-stone-200/80 backdrop-blur-sm"
            aria-label="Ver mais fotos"
          >
            <ChevronRight className="w-6 h-6 text-stone-900" />
          </button>
        )}

        {/* Floating Left Navigation Arrow */}
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
