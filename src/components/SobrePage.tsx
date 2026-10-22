import React, { useEffect } from 'react';
import { BrushStrokeUnderline } from './common/Doodles';
import { ArrowLeft, Quote } from 'lucide-react';
import { PageView } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SobrePageProps {
  onNavigate: (page: PageView) => void;
}

export const SobrePage: React.FC<SobrePageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen pt-8 sm:pt-12 md:pt-14 pb-20 overflow-hidden select-none">
      
      {/* Warm rustic blurred background */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10 filter blur-[4px] scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1598144062590-7132145e12f6?auto=format&fit=crop&w=2000&q=85')`,
        }}
      />
      <div className="fixed inset-0 bg-amber-950/65 mix-blend-multiply -z-10" />
      <div className="fixed inset-0 bg-black/45 -z-10" />

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm text-sm font-semibold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.nav.backToHome}</span>
          </button>

          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-300 drop-shadow">
            {t.nav.ourStory}
          </span>
        </div>

        {/* Two-Column Card Layout */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-0 max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white">
          
          {/* LEFT COLUMN: Photo of Lea Valacio */}
          <div className="relative w-full lg:w-[42%] min-h-[380px] lg:min-h-[640px] bg-stone-900 overflow-hidden flex flex-col justify-between p-6 sm:p-8">
            <img
              src="https://i.ibb.co/WvbGq2TZ/Gemini-Generated-Image-d1ttzqd1ttzqd1tt.jpg"
              alt="Lea Valacio - Tradição e Sabor"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Ambient gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />

            {/* Top: Custom Brand Icon */}
            <div className="relative z-10 self-start animate-bounce">
              <img
                src="https://i.ibb.co/R4yVQvwL/patitour-2026-10-21-T160019-104.png"
                alt="Valacio's"
                className="w-11 h-11 object-contain drop-shadow-lg"
              />
            </div>

            {/* Bottom: "DESDE 2019" / Sabor Inesquecível */}
            <div className="relative z-10 text-white">
              <span className="block font-brand font-black text-3xl sm:text-4xl text-amber-300 uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {t.sobrePage.sinceText}
              </span>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 drop-shadow">
                {t.sobrePage.sinceSub}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Story & Content */}
          <div className="w-full lg:w-[58%] bg-white p-6 sm:p-10 md:p-12 flex flex-col justify-between">
            
            <div>
              {/* Subtitle */}
              <span className="inline-block text-xs sm:text-sm font-brand font-black text-[#de8a27] uppercase tracking-wider mb-1">
                {t.sobrePage.subtitle}
              </span>

              {/* Main Title */}
              <h1 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#412213] leading-tight">
                {t.sobrePage.title}
              </h1>

              {/* Brush stroke underline */}
              <div className="mt-2 mb-6">
                <BrushStrokeUnderline className="w-28 sm:w-36 h-2.5" color="#412213" />
              </div>

              {/* Intro highlight */}
              <p className="text-stone-800 text-sm sm:text-base font-semibold leading-relaxed mb-4">
                {t.sobrePage.intro}
              </p>

              {/* Story */}
              <div className="space-y-3.5 text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
                <p>{t.sobrePage.creatorP1}</p>

                {/* Quote Block */}
                <div className="relative my-4 p-4 rounded-xl bg-amber-50/80 border-l-4 border-[#de8a27] text-stone-800 italic font-medium">
                  <Quote className="w-5 h-5 text-[#de8a27] mb-1 opacity-70" />
                  <p>{t.sobrePage.quote}</p>
                </div>

                <p>{t.sobrePage.creatorP2}</p>
              </div>

              {/* Pillars Section */}
              <div className="mt-8 pt-6 border-t border-stone-200">
                <h2 className="font-brand font-black text-sm sm:text-base text-[#412213] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <img
                    src="https://i.ibb.co/R4yVQvwL/patitour-2026-10-21-T160019-104.png"
                    alt="Icon"
                    className="w-4 h-4 object-contain inline"
                  />
                  <span>{t.sobrePage.pillarsHeading}</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {t.sobrePage.pillars.map((p) => {
                    return (
                      <div
                        key={p.pilar}
                        className="p-3.5 rounded-xl bg-[#fbf8f3] border border-amber-900/10 hover:border-[#de8a27]/30 transition-all flex items-start gap-3"
                      >
                        <div className="p-1.5 rounded-lg ring-1 shrink-0 bg-amber-100/80 ring-amber-200/80 flex items-center justify-center">
                          <img
                            src="https://i.ibb.co/R4yVQvwL/patitour-2026-10-21-T160019-104.png"
                            alt="Pilar"
                            className="w-5 h-5 object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-brand font-extrabold text-xs sm:text-sm text-[#412213]">
                            {p.pilar}
                          </h3>
                          <p className="text-[11px] sm:text-xs text-stone-600 leading-snug mt-0.5">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 pt-6 border-t border-stone-100 flex flex-wrap items-center gap-4">
              <button
                id="sobre-conhecer-produtos-btn"
                onClick={() => onNavigate('produtos')}
                className="px-6 py-2.5 rounded-full bg-[#de8a27] hover:bg-[#c9781b] text-white font-brand font-black text-xs sm:text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition cursor-pointer"
              >
                {t.sobrePage.btnProducts}
              </button>

              <button
                onClick={() => onNavigate('home')}
                className="px-6 py-2.5 rounded-full border border-stone-300 hover:bg-stone-50 text-stone-700 font-brand font-bold text-xs sm:text-sm tracking-wider uppercase transition cursor-pointer"
              >
                {t.sobrePage.btnBack}
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
