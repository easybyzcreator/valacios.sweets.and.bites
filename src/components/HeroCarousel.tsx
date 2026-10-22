import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PageView } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HeroCarouselProps {
  onNavigate: (page: PageView) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = t.carousel;
  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  // Auto-play feature requested by the user: "se quiser colocar para q tbem possa ser alterado depois de alguns segundos q a imagem aparece ali"
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5500); // changes every 5.5 seconds

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const currentSlide = slides[currentSlideIndex];

  return (
    <section
      id="hero-carousel"
      className="relative w-full h-[680px] sm:h-[740px] md:h-[820px] lg:h-[880px] overflow-hidden bg-stone-900 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Destaques e Novidades"
    >
      {/* Background Slides */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlideIndex;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Photography */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-7000 ease-out transform scale-105"
              style={{
                backgroundImage: `url(${slide.bgImage})`,
              }}
            />

            {/* Dark & warm ambient overlays to ensure pristine contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/70" />
            <div className="absolute inset-0 bg-amber-950/20 mix-blend-multiply" />

            {/* Slide Content Layout - Generous top spacing so cursive heading has plenty of room below navigation menu */}
            <div className="relative z-20 w-full h-full max-w-5xl mx-auto px-5 sm:px-12 flex flex-col items-center justify-center text-center pt-44 sm:pt-48 md:pt-56 lg:pt-64 pb-14 sm:pb-16">
              <h1
                className="font-script text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)] leading-[1.25] tracking-wide mt-4 sm:mt-6 mb-3 sm:mb-5 px-2 whitespace-pre-line"
                style={{ color: slide.scriptColor || '#ffffff' }}
              >
                {slide.scriptHeading}
              </h1>

              <p
                className="max-w-3xl text-xs sm:text-base md:text-xl lg:text-2xl font-brand font-medium text-stone-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] px-3 leading-relaxed"
                style={{ color: slide.subtitleColor || '#ffffff' }}
              >
                {slide.subtitle}
              </p>

              {slide.buttonText && slide.buttonTarget && (
                <div className="mt-5 sm:mt-8">
                  <button
                    onClick={() => onNavigate(slide.buttonTarget!)}
                    className="px-6 sm:px-9 py-2.5 sm:py-3.5 rounded-full bg-[#de8a27] hover:bg-[#c9781b] text-white font-brand font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    {slide.buttonText}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Left Chevron Button */}
      <button
        id="carousel-prev-btn"
        onClick={prevSlide}
        className="absolute left-1.5 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-1.5 sm:p-3 text-white/80 hover:text-white hover:bg-black/30 rounded-full transition-colors backdrop-blur-xs cursor-pointer"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6 sm:w-10 sm:h-10" />
      </button>

      {/* Right Chevron Button */}
      <button
        id="carousel-next-btn"
        onClick={nextSlide}
        className="absolute right-1.5 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-1.5 sm:p-3 text-white/80 hover:text-white hover:bg-black/30 rounded-full transition-colors backdrop-blur-xs cursor-pointer"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-10 sm:h-10" />
      </button>

      {/* Dots Indicator: Horizontal bottom on mobile, vertical right on desktop */}
      <div
        className="absolute bottom-4 sm:bottom-auto sm:top-1/2 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 -translate-y-0 sm:-translate-y-1/2 z-30 flex flex-row sm:flex-col items-center gap-2 sm:gap-2.5"
        role="tablist"
        aria-label="Controle de slides"
      >
        {slides.map((_, dotIdx) => {
          const isActive = currentSlideIndex === dotIdx;

          return (
            <button
              key={dotIdx}
              id={`carousel-dot-${dotIdx}`}
              onClick={() => goToSlide(dotIdx)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 cursor-pointer border ${
                isActive
                  ? 'bg-[#de8a27] border-[#de8a27] scale-125 shadow-[0_0_8px_rgba(222,138,39,0.8)]'
                  : 'bg-transparent border-[#de8a27]/70 hover:border-[#de8a27] hover:bg-[#de8a27]/40'
              }`}
              title={`Ir para destaque ${dotIdx + 1}`}
              aria-label={`Slide ${dotIdx + 1}`}
              aria-selected={isActive}
            />
          );
        })}
      </div>

    </section>
  );
};
