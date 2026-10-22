import React from 'react';
import { BrushStrokeUnderline, SunburstRays } from './common/Doodles';
import { useLanguage } from '../context/LanguageContext';

export const DiferenciaisSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="diferenciais-section"
      className="relative w-full py-16 sm:py-24 bg-[#faf5ec] overflow-hidden select-none px-4 sm:px-6"
    >
      {/* Subtle cheese sketches background pattern matching Image 9 */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#78350f 1.5px, transparent 1.5px), radial-gradient(#b45309 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 16px 16px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 3 Circular Cards Grid matching Image 9 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 text-center">
          {t.differentials.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-col items-center group transition-transform duration-300 hover:-translate-y-1.5"
            >
              
              {/* Circular Photo Container with yellow doodle rays */}
              <div className="relative mb-6">
                {/* Sunburst rays doodle (on 1st and 3rd items as seen in Image 9) */}
                {item.doodleRays && (
                  <div
                    className={`absolute -top-4 pointer-events-none ${
                      index === 0 ? '-left-4' : '-right-4'
                    }`}
                  >
                    <SunburstRays className="w-12 h-12" />
                  </div>
                )}

                {/* Circular image */}
                <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:shadow-xl group-hover:border-[#de8a27]/60 transition-all duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Title with brush stroke underline matching logo brown #412213 */}
              <div className="mb-3">
                <h3 className="font-brand font-black text-lg sm:text-xl text-[#412213] uppercase tracking-wide">
                  {item.title}
                </h3>
                <div className="mt-1">
                  <BrushStrokeUnderline className="w-20 sm:w-24 h-2" color="#412213" />
                </div>
              </div>

              {/* Description */}
              <p className="max-w-xs text-stone-600 text-xs sm:text-sm leading-relaxed font-medium">
                {item.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
