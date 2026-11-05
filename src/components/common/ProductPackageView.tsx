import React from 'react';
import { ProductItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface ProductPackageViewProps {
  product: ProductItem;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showShadow?: boolean;
}

export const ProductPackageView: React.FC<ProductPackageViewProps> = ({
  product,
  className = '',
  size = 'md',
  showShadow = true,
}) => {
  const { t, language } = useLanguage();
  const localized = t.produtosPage?.catalog?.[product.id];
  const badgeLabel = localized?.badgeLabel || product.badgeLabel;
  const productName = localized?.name || product.name;

  const subtitle =
    language === 'EN'
      ? 'Real Cheese Bread'
      : language === 'ES'
      ? 'Mucho queso de verdad'
      : 'Muito queijo de verdade';

  const categoryLabel = product.filling
    ? language === 'EN'
      ? 'Filled'
      : language === 'ES'
      ? 'Relleno'
      : 'Recheio'
    : language === 'EN'
    ? 'Cheese Bread'
    : language === 'ES'
    ? 'Pan de Queso'
    : 'Pão de Queijo';

  const sizeClasses = {
    sm: 'w-28 h-40 text-[9px]',
    md: 'w-44 h-64 md:w-52 md:h-76 text-[10px]',
    lg: 'w-64 h-92 md:w-72 md:h-100 text-xs',
  };

  if (product.imageUrl) {
    return (
      <div
        className={`relative select-none flex-shrink-0 transition-transform duration-300 hover:scale-105 flex items-center justify-center ${sizeClasses[size]} ${className}`}
      >
        <img
          src={product.imageUrl}
          alt={productName}
          className="max-w-full max-h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)]"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative select-none flex-shrink-0 transition-transform duration-300 hover:scale-105 ${sizeClasses[size]} ${className}`}
    >
      {/* 3D Drop shadow under the bag - subtle and discreet */}
      {showShadow && (
        <div className="absolute -bottom-2 left-6 right-6 h-3 bg-black/15 blur-sm rounded-full pointer-events-none" />
      )}

      {/* Main Bag Envelope */}
      <div className="relative w-full h-full rounded-t-lg rounded-b-md overflow-hidden bg-gradient-to-b from-[#2a1b14] via-[#1f140f] to-[#120a07] border border-white/20 shadow-xl flex flex-col justify-between">
        
        {/* Top Crimped Seal with Euro-slot punch hole */}
        <div className="relative w-full h-4 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 border-b border-black/50 flex items-center justify-center">
          <div className="w-5 h-1.5 rounded-full bg-black/60 border border-white/10" />
        </div>

        {/* Top Brand Header Banner */}
        <div className="pt-2 px-2 pb-1 text-center bg-gradient-to-b from-[#3a2016] to-[#25150f] border-b border-amber-900/40 relative">
          {/* Mini Buns Mascot */}
          <div className="flex items-center justify-center gap-0.5 mb-0.5">
            <span className="w-2.5 h-2 rounded-full bg-amber-400 border border-amber-600/40 inline-block shadow-xs" />
            <span className="w-3 h-2.5 rounded-full bg-amber-500 border border-amber-700/40 inline-block shadow-xs" />
          </div>

          <p
            className="font-brand font-black uppercase text-amber-400 leading-tight tracking-tight text-[11px] md:text-sm drop-shadow-sm"
            style={{ WebkitTextStroke: '0.5px #78350f' }}
          >
            VALACIO’S
          </p>
          <p className="text-[7px] md:text-[8px] font-medium tracking-wide text-amber-200/90 leading-tight">
            {subtitle}
          </p>
        </div>

        {/* Clear Window Simulation (Showing fresh white dough balls) */}
        <div className="relative flex-1 bg-gradient-to-b from-stone-200 to-stone-100/90 overflow-hidden flex items-center justify-center p-1 border-y border-white/30">
          {/* Plastic highlight gloss sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/35 to-transparent pointer-events-none transform -skew-x-12" />

          {/* Grid pattern of round frozen cheese dough balls */}
          <div className="grid grid-cols-4 gap-1.5 opacity-95">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-amber-50 via-stone-100 to-amber-200/80 shadow-inner border border-amber-300/40 flex items-center justify-center"
              >
                <div className="w-1 h-1 rounded-full bg-amber-400/25" />
              </div>
            ))}
          </div>

          {/* Flavor Badge Overlay across the window */}
          <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
            <div
              className="px-2.5 py-1 rounded shadow-lg border border-white/40 flex flex-col items-center max-w-[90%]"
              style={{ backgroundColor: product.packageGraphic.badgeBg }}
            >
              <span className="text-[8px] md:text-[9px] uppercase font-bold text-amber-200 leading-none">
                {categoryLabel}
              </span>
              <span
                className="font-brand font-black text-[10px] md:text-xs leading-tight uppercase text-center whitespace-nowrap"
                style={{ color: product.packageGraphic.badgeText }}
              >
                {badgeLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Serving Suggestion & Weight */}
        <div className="relative bg-gradient-to-t from-stone-950 via-[#26150f] to-[#3a1d13] p-1.5 border-t border-amber-700/30">
          <div className="flex items-end justify-between">
            {/* Baked cheese bread teaser */}
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 border border-amber-800 shadow flex items-center justify-center overflow-hidden">
                <span className="text-[7px] text-amber-950 font-black">100%</span>
              </div>
              <div className="leading-tight">
                <span className="block text-[7px] font-semibold text-amber-200 uppercase">
                  {product.packageGraphic.highlightDetail}
                </span>
                <span className="block text-[6.5px] text-stone-300">
                  {product.unitsApprox}
                </span>
              </div>
            </div>

            {/* Weight Stamp */}
            <div className="bg-amber-500 text-amber-950 font-black px-1.5 py-0.5 rounded text-[8px] md:text-[9px] shadow-sm">
              {product.weight}
            </div>
          </div>
        </div>

        {/* Bottom Crimped edge */}
        <div className="w-full h-2 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-t border-black/60" />
      </div>
    </div>
  );
};
