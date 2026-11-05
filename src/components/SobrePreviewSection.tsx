import React from 'react';
import { BrushStrokeUnderline } from './common/Doodles';
import { PageView } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SobrePreviewSectionProps {
  onNavigate: (page: PageView, targetProductId?: string) => void;
}

export const SobrePreviewSection: React.FC<SobrePreviewSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section
      id="sobre-preview-section"
      className="relative w-full py-16 sm:py-24 bg-white text-center px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Imagem 1: Line-up das 4 embalagens oficiais lado a lado sem fundo (aumentadas em 30%) */}
        <div className="w-full max-w-5xl lg:max-w-6xl mx-auto mb-12 sm:mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-end justify-center px-2">
            {[
              {
                id: 'tradicional',
                name: 'Pão de Queijo Tradicional',
                img: 'https://raw.githubusercontent.com/easybyzcreator/imagens/730d5c8d986bbfcea1c8f811d934d5e8fa8ce9a7/site%20-%20tradicional%20-%20frente.png',
              },
              {
                id: 'goiabada',
                name: 'Pão de Queijo com Goiabada',
                img: 'https://raw.githubusercontent.com/easybyzcreator/imagens/730d5c8d986bbfcea1c8f811d934d5e8fa8ce9a7/site%20-%20guava%20-%20frente.png',
              },
              {
                id: 'jalapeno',
                name: 'Pão de Queijo com Jalapeño',
                img: 'https://raw.githubusercontent.com/easybyzcreator/imagens/730d5c8d986bbfcea1c8f811d934d5e8fa8ce9a7/site%20-%20jalapeno%20-%20frente.png',
              },
              {
                id: 'waffle',
                name: 'Waffle de Pão de Queijo',
                img: 'https://raw.githubusercontent.com/easybyzcreator/imagens/730d5c8d986bbfcea1c8f811d934d5e8fa8ce9a7/site%20-%20waffle.png',
              },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('produtos', item.id)}
                className="relative flex flex-col items-center group cursor-pointer"
                title={`${item.name} - Ver detalhes`}
              >
                <div className="relative w-full flex items-end justify-center">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full max-h-72 sm:max-h-84 md:max-h-96 lg:max-h-[420px] object-contain group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Script Heading & Text Content */}
        <div className="max-w-3xl flex flex-col items-center">
          <h2
            className="font-script text-4xl sm:text-5xl md:text-6xl text-[#412213] leading-tight"
          >
            {t.sobrePreview.title}
          </h2>

          {/* Brush Stroke Underline */}
          <div className="my-4">
            <BrushStrokeUnderline className="w-24 sm:w-32 h-2.5" color="#412213" />
          </div>

          {/* Content Paragraphs */}
          <div className="space-y-4 max-w-2xl text-stone-600 text-sm sm:text-base md:text-[17px] leading-relaxed font-normal mt-4">
            <p>{t.sobrePreview.p1}</p>
            <p>{t.sobrePreview.p2}</p>
          </div>

          {/* Action Button */}
          <div className="mt-8">
            <button
              id="sobre-conheca-produtos-btn"
              onClick={() => onNavigate('sobre')}
              className="px-8 sm:px-10 py-3 rounded-full bg-[#de8a27] hover:bg-[#c9781b] text-white font-brand font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {t.sobrePreview.button}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
