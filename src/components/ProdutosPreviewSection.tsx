import React from 'react';
import { BrushStrokeUnderline } from './common/Doodles';
import { PageView } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProdutosPreviewSectionProps {
  onNavigate: (page: PageView, targetProductId?: string) => void;
}

export const ProdutosPreviewSection: React.FC<ProdutosPreviewSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const benefits = [
    {
      id: 'queijo',
      title: t.wafflePreview.benefits.queijo.title,
      description: t.wafflePreview.benefits.queijo.desc,
    },
    {
      id: 'conservantes',
      title: t.wafflePreview.benefits.conservantes.title,
      description: t.wafflePreview.benefits.conservantes.desc,
    },
    {
      id: 'assar',
      title: t.wafflePreview.benefits.assar.title,
      description: t.wafflePreview.benefits.assar.desc,
    },
  ];

  return (
    <section
      id="produtos-preview-section"
      className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#f7eede] via-[#fbf6ed] to-[#f4e8d3] overflow-hidden select-none text-center px-4 sm:px-6"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Título Principal (Destaque para o Lançamento) */}
        <div className="relative inline-block mb-3 sm:mb-4">
          <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#412213] leading-tight">
            {t.wafflePreview.title}
          </h2>
          
          <div className="mt-3">
            <BrushStrokeUnderline className="w-32 sm:w-44 h-2.5 mx-auto" color="#412213" />
          </div>
        </div>

        {/* Subtítulo / Texto Descritivo */}
        <p className="max-w-3xl text-stone-700 text-sm sm:text-base md:text-lg leading-relaxed font-normal mt-2 mb-8 sm:mb-12">
          {t.wafflePreview.description}
        </p>

        {/* Imagem 2: Composição em leque das embalagens oficiais sem cenário de fundo e sem sombras */}
        <div className="relative w-full max-w-4xl mx-auto mb-12 sm:mb-16 flex items-end justify-center select-none pt-4 pb-2 px-2 overflow-visible">
          
          {/* 1. Tradicional (Ponta Esquerda) */}
          <div
            onClick={() => onNavigate('produtos', 'tradicional')}
            className="relative z-10 w-28 sm:w-40 md:w-48 lg:w-52 -mr-6 sm:-mr-12 md:-mr-14 transform -rotate-6 hover:rotate-0 hover:scale-110 hover:z-30 transition-all duration-300 cursor-pointer flex flex-col items-center"
            title="Pão de Queijo Tradicional"
          >
            <img
              src="https://i.ibb.co/fzGyGZ73/patitour-2026-10-21-T153757-738.png"
              alt="Pão de Queijo Tradicional Valacio's"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>

          {/* 2. Goiabada (Meio Esquerda) */}
          <div
            onClick={() => onNavigate('produtos', 'goiabada')}
            className="relative z-15 w-32 sm:w-44 md:w-52 lg:w-56 -mr-5 sm:-mr-10 md:-mr-12 transform -rotate-3 hover:rotate-0 hover:scale-110 hover:z-30 transition-all duration-300 cursor-pointer flex flex-col items-center"
            title="Pão de Queijo com Goiabada"
          >
            <img
              src="https://i.ibb.co/N2K3HCsT/patitour-2026-10-21-T154337-253.png"
              alt="Pão de Queijo com Goiabada Valacio's"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>

          {/* 3. Waffle (Centro em Destaque - Frente) */}
          <div
            onClick={() => onNavigate('produtos', 'waffle')}
            className="relative z-20 w-36 sm:w-52 md:w-60 lg:w-64 transform hover:scale-110 hover:z-30 transition-all duration-300 cursor-pointer flex flex-col items-center"
            title="Waffle de Pão de Queijo"
          >
            <img
              src="https://i.ibb.co/RGBNMsqQ/patitour-2026-10-21-T153145-285.png"
              alt="Waffle de Pão de Queijo Valacio's"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>

          {/* 4. Jalapeño (Meio Direita) */}
          <div
            onClick={() => onNavigate('produtos', 'jalapeno')}
            className="relative z-15 w-32 sm:w-44 md:w-52 lg:w-56 -ml-5 sm:-ml-10 md:-ml-12 transform rotate-3 hover:rotate-0 hover:scale-110 hover:z-30 transition-all duration-300 cursor-pointer flex flex-col items-center"
            title="Pão de Queijo com Jalapeño"
          >
            <img
              src="https://i.ibb.co/DccM3Ff/patitour-2026-10-21-T154729-728.png"
              alt="Pão de Queijo com Jalapeño Valacio's"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>

          {/* 5. Tradicional (Ponta Direita para simetria idêntica à imagem 2) */}
          <div
            onClick={() => onNavigate('produtos', 'tradicional')}
            className="relative z-10 w-28 sm:w-40 md:w-48 lg:w-52 -ml-6 sm:-ml-12 md:-ml-14 transform rotate-6 hover:rotate-0 hover:scale-110 hover:z-30 transition-all duration-300 cursor-pointer flex flex-col items-center"
            title="Pão de Queijo Tradicional"
          >
            <img
              src="https://i.ibb.co/fzGyGZ73/patitour-2026-10-21-T153757-738.png"
              alt="Pão de Queijo Tradicional Valacio's"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>

        </div>

        {/* Textos de Benefícios / Pilares - Somente textos puros, sem cards e sem ícones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 w-full max-w-4xl text-center md:text-left mb-12 sm:mb-16">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex flex-col space-y-2">
              <h3 className="font-brand font-black text-lg sm:text-xl text-[#412213] tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Botão CTA para catálogo completo (sem rabisco ao lado) */}
        <div className="relative flex flex-col items-center">
          <button
            id="produtos-preview-ver-todos-btn"
            onClick={() => onNavigate('produtos')}
            className="px-10 sm:px-14 py-3 sm:py-3.5 rounded-full bg-[#de8a27] hover:bg-[#c9781b] text-white font-brand font-black text-sm sm:text-base tracking-wider uppercase shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {t.wafflePreview.viewAllBtn}
          </button>
        </div>

      </div>
    </section>
  );
};
