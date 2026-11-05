import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { PRODUCTS_CATALOG } from '../data/mockData';
import { BrushStrokeUnderline, RibbonBanner } from './common/Doodles';
import { ProductPackageView } from './common/ProductPackageView';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  FileText,
  ImageIcon,
  X,
  ZoomIn,
} from 'lucide-react';

interface ProdutosPageProps {
  onNavigate: (page: PageView) => void;
  targetProductId?: string | null;
  onClearTargetProduct?: () => void;
}

export const ProdutosPage: React.FC<ProdutosPageProps> = ({
  onNavigate,
  targetProductId,
  onClearTargetProduct,
}) => {
  const { t } = useLanguage();
  const products = PRODUCTS_CATALOG;

  // View state per product for packaging image side: 'front' (frente) vs 'back' (verso)
  const [productSideModes, setProductSideModes] = useState<Record<string, 'front' | 'back'>>({});
  // View state per product for right column: 'table' (tabela formatada) vs 'card' (imagem do rótulo)
  const [nutritionViewModes, setNutritionViewModes] = useState<Record<string, 'table' | 'card'>>({});
  // Modal for zoomed image inspection
  const [modalImage, setModalImage] = useState<{ src: string; title: string } | null>(null);

  // Smooth scroll to targeted product if passed from header navigation
  useEffect(() => {
    if (targetProductId) {
      const element = document.getElementById(`produto-${targetProductId}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
      if (onClearTargetProduct) {
        onClearTargetProduct();
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [targetProductId, onClearTargetProduct]);

  const toggleProductSide = (productId: string) => {
    setProductSideModes((prev) => ({
      ...prev,
      [productId]: prev[productId] === 'back' ? 'front' : 'back',
    }));
  };

  const setProductSide = (productId: string, side: 'front' | 'back') => {
    setProductSideModes((prev) => ({
      ...prev,
      [productId]: side,
    }));
  };

  const setNutritionMode = (productId: string, mode: 'table' | 'card') => {
    setNutritionViewModes((prev) => ({
      ...prev,
      [productId]: mode,
    }));
  };

  const scrollToProduct = (productId: string) => {
    const element = document.getElementById(`produto-${productId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#faf5ec] pb-24 overflow-hidden select-none">
      
      {/* Background Subtle Flour / Dots Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#78350f 1.5px, transparent 1.5px), radial-gradient(#b45309 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0, 14px 14px',
        }}
      />

      {/* TOP HERO BANNER */}
      <div className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden bg-stone-900 mb-2">
        {/* High-res background image requested by user */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.ibb.co/LXqsvjhP/Gemini-Generated-Image-e36d7ge36d7ge36d.jpg')`,
          }}
        />
        {/* Dark warm overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/80" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-[#de8a27] text-white text-[11px] sm:text-xs font-black tracking-widest uppercase mb-3 sm:mb-4 shadow-md">
            {t.produtosPage.heroBadge || "LINHA ARTESANAL"}
          </span>
          <h1 className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg leading-tight">
            {t.produtosPage.heroTitle || "Nossos Produtos"}
          </h1>
          <div className="mt-2.5">
            <BrushStrokeUnderline className="w-36 sm:w-52 h-3 mx-auto" color="#de8a27" />
          </div>
          <p className="mt-3.5 font-brand text-amber-100/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto tracking-wide drop-shadow">
            {t.produtosPage.heroSubtitle || "Feito com amor, tradição e muito queijo de verdade em cada receita"}
          </p>
        </div>
      </div>

      {/* Main Interactive Product Showcase */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Sticky Quick-Jump Navigation Bar */}
        <div className="sticky top-0 z-30 bg-[#faf5ec]/95 backdrop-blur-md py-3.5 border-b border-stone-300/80 mb-8 sm:mb-12 shadow-xs">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs sm:text-sm font-bold transition cursor-pointer self-start sm:self-auto shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.produtosPage.backToHome || 'Voltar ao início'}</span>
            </button>

            {/* Quick Flavor Anchors - wraps seamlessly on mobile so all chips fit on screen */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5 sm:gap-2 w-full sm:w-auto">
              {products.map((p) => {
                const localized = t.produtosPage.catalog[p.id];
                const label = localized?.badgeLabel || p.badgeLabel;

                return (
                  <button
                    key={p.id}
                    onClick={() => scrollToProduct(p.id)}
                    className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition cursor-pointer text-center uppercase tracking-wider bg-white text-stone-700 hover:bg-[#412213] hover:text-[#de8a27] border border-stone-300 shadow-2xs active:scale-95"
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Vertical Product Catalog: Each product placed SEPARATELY */}
        <div className="space-y-16 md:space-y-24">
          {products.map((product, idx) => {
            const isOdd = idx % 2 === 1;
            const currentSide = productSideModes[product.id] || 'front';
            const hasBackImage = Boolean(product.backImageUrl);
            const currentNutritionMode = nutritionViewModes[product.id] || 'table';

            const localized = t.produtosPage.catalog[product.id];
            const badgeLabel = localized?.badgeLabel || product.badgeLabel;
            const subname = localized?.subname || product.subname;
            const description = localized?.description || product.description;
            const ingredients = localized?.ingredients || product.ingredients;
            const allergens = localized?.allergens || product.allergens;

            const activeDisplayImage =
              hasBackImage && currentSide === 'back'
                ? product.backImageUrl
                : product.imageUrl;

            return (
              <section
                key={product.id}
                id={`produto-${product.id}`}
                className="scroll-mt-44 sm:scroll-mt-48 pt-4 pb-14 border-b border-stone-300/60 last:border-b-0"
              >
                {/* Product Title & Ribbon Banner */}
                <div className="text-center mb-8 sm:mb-10">
                  <span className="block text-stone-700 font-brand font-bold text-base sm:text-lg md:text-xl mb-2 tracking-wide">
                    {subname}
                  </span>
                  <RibbonBanner
                    text={badgeLabel}
                    bgColor="#412213"
                    textColor="#de8a27"
                  />
                </div>

                {/* 2-Column Alternating Showcase: Packaging (Enlarged) vs Nutrition (Compact/Halved) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Image Column - Packaging stands freely without enclosing box/square, prominently sized */}
                  <div
                    className={`lg:col-span-7 flex flex-col items-center ${
                      isOdd ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    {/* Free-standing packaging container enlarged */}
                    <div className="relative w-full max-w-lg flex flex-col items-center group py-2">
                      
                      {/* Left Arrow Button */}
                      {hasBackImage && (
                        <button
                          onClick={() => toggleProductSide(product.id)}
                          className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white/95 hover:bg-white text-[#de8a27] shadow-lg border border-stone-200 hover:scale-110 active:scale-95 transition cursor-pointer"
                          title="Girar embalagem"
                          aria-label="Girar embalagem"
                        >
                          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                      )}

                      {/* Main Image Display - packaging floats naturally with realistic shadow */}
                      <div
                        className="w-full h-80 sm:h-96 md:h-[440px] lg:h-[490px] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105"
                        onClick={() =>
                          setModalImage({
                            src: activeDisplayImage || '',
                            title: `${badgeLabel} (${currentSide === 'back' ? 'Verso' : 'Frente'})`,
                          })
                        }
                      >
                        {activeDisplayImage ? (
                          <img
                            src={activeDisplayImage}
                            alt={`${badgeLabel} ${currentSide === 'back' ? 'Verso' : 'Frente'}`}
                            className="max-w-full max-h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)] transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <ProductPackageView
                            product={product}
                            size="lg"
                            showShadow={true}
                          />
                        )}
                      </div>

                      {/* Right Arrow Button */}
                      {hasBackImage && (
                        <button
                          onClick={() => toggleProductSide(product.id)}
                          className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white/95 hover:bg-white text-[#de8a27] shadow-lg border border-stone-200 hover:scale-110 active:scale-95 transition cursor-pointer"
                          title="Girar embalagem"
                          aria-label="Girar embalagem"
                        >
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                      )}

                      {/* View Indicator Dots below packaging */}
                      {hasBackImage && (
                        <div className="flex items-center justify-center gap-2 mt-3">
                          <button
                            onClick={() => setProductSide(product.id, 'front')}
                            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                              currentSide === 'front'
                                ? 'bg-[#de8a27] scale-125 shadow-xs'
                                : 'border border-amber-600 bg-transparent hover:bg-amber-100'
                            }`}
                            title="Frente"
                            aria-label="Frente"
                          />
                          <button
                            onClick={() => setProductSide(product.id, 'back')}
                            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                              currentSide === 'back'
                                ? 'bg-[#de8a27] scale-125 shadow-xs'
                                : 'border border-amber-600 bg-transparent hover:bg-amber-100'
                            }`}
                            title="Verso"
                            aria-label="Verso"
                          />
                        </div>
                      )}
                    </div>

                    {/* Brown Hand-Drawn Brush Stroke Underline */}
                    <div className="mt-3 flex justify-center">
                      <BrushStrokeUnderline color="#412213" className="w-44 sm:w-56 h-3" />
                    </div>

                    {/* Descriptive Text & Prep Time Icons */}
                    <div className="text-center mt-3 max-w-md">
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                        {description}
                      </p>

                      {product.prepIconsUrl && (
                        <div className="mt-4 flex justify-center items-center">
                          <img
                            src={product.prepIconsUrl}
                            alt="Instruções de preparo e especificações"
                            className="h-18 sm:h-22 md:h-24 w-auto object-contain drop-shadow-xs"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Nutritional Table Column - Compact/Halved size */}
                  <div
                    className={`lg:col-span-5 w-full max-w-md mx-auto bg-white rounded-xl shadow-md border border-stone-200/90 p-4 sm:p-5 ${
                      isOdd ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    {/* Header: INFORMAÇÕES NUTRICIONAIS */}
                    <div className="border-b-2 border-stone-800 pb-2 mb-3 flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-brand font-black text-sm sm:text-base text-stone-900 tracking-wider uppercase">
                        {t.produtosPage.nutritionalInfo}
                      </h3>

                      {product.nutritionImageUrl && (
                        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs">
                          <button
                            onClick={() => setNutritionMode(product.id, 'table')}
                            className={`px-2 py-0.5 rounded font-bold transition flex items-center gap-1 cursor-pointer text-[11px] ${
                              currentNutritionMode === 'table'
                                ? 'bg-white text-stone-900 shadow-2xs'
                                : 'text-stone-500 hover:text-stone-800'
                            }`}
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>{t.produtosPage.tableMode}</span>
                          </button>
                          <button
                            onClick={() => setNutritionMode(product.id, 'card')}
                            className={`px-2 py-0.5 rounded font-bold transition flex items-center gap-1 cursor-pointer text-[11px] ${
                              currentNutritionMode === 'card'
                                ? 'bg-white text-stone-900 shadow-2xs'
                                : 'text-stone-500 hover:text-stone-800'
                            }`}
                          >
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>{t.produtosPage.labelMode}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* View Mode: Official Image Card */}
                    {currentNutritionMode === 'card' && product.nutritionImageUrl ? (
                      <div
                        className="relative group/card cursor-pointer my-2"
                        onClick={() =>
                          setModalImage({
                            src: product.nutritionImageUrl || '',
                            title: badgeLabel,
                          })
                        }
                      >
                        <div className="rounded-xl overflow-hidden border border-stone-200 shadow-xs bg-white max-h-[220px] flex items-center justify-center p-2">
                          <img
                            src={product.nutritionImageUrl}
                            alt={`${badgeLabel} Nutrition Label`}
                            className="max-h-[200px] w-auto object-contain mx-auto"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/card:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-white font-bold gap-2">
                          <ZoomIn className="w-5 h-5" />
                          <span>{t.produtosPage.clickToZoom}</span>
                        </div>
                      </div>
                    ) : (
                      /* View Mode: Formatted HTML Table */
                      <>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-[10.5px] sm:text-[11.5px] border-collapse">
                            <thead>
                              <tr className="border-b border-stone-300 text-stone-700 font-bold uppercase">
                                <th className="py-1 pr-1.5">{t.produtosPage.component}</th>
                                <th className="py-1 px-1.5 text-center">{t.produtosPage.serving100g}</th>
                                <th className="py-1 px-1.5 text-center">{t.produtosPage.serving50g}</th>
                                <th className="py-1 pl-1.5 text-right">{t.produtosPage.vdHeader}</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-200 text-stone-800 font-medium">
                              <tr>
                                <td className="py-1 font-bold uppercase">{t.produtosPage.energy}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.energy.q100}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.energy.q50}</td>
                                <td className="py-1 pl-1.5 text-right font-bold text-amber-900">{product.nutrition.energy.vd}</td>
                              </tr>
                              <tr>
                                <td className="py-1 font-bold uppercase">{t.produtosPage.carbs}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.carbs.q100}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.carbs.q50}</td>
                                <td className="py-1 pl-1.5 text-right font-bold text-amber-900">{product.nutrition.carbs.vd}</td>
                              </tr>
                              <tr>
                                <td className="py-1 font-bold uppercase">{t.produtosPage.sugars}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.sugars.q100}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.sugars.q50}</td>
                                <td className="py-1 pl-1.5 text-right text-stone-400">{product.nutrition.sugars.vd}</td>
                              </tr>
                              {product.nutrition.addedSugars && (
                                <tr>
                                  <td className="py-1 font-bold uppercase text-stone-600 pl-1.5">
                                    {t.produtosPage.addedSugars}
                                  </td>
                                  <td className="py-1 px-1.5 text-center text-stone-600">{product.nutrition.addedSugars.q100}</td>
                                  <td className="py-1 px-1.5 text-center text-stone-600">{product.nutrition.addedSugars.q50}</td>
                                  <td className="py-1 pl-1.5 text-right font-bold text-amber-900">{product.nutrition.addedSugars.vd}</td>
                                </tr>
                              )}
                              <tr>
                                <td className="py-1 font-bold uppercase">{t.produtosPage.proteins}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.proteins.q100}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.proteins.q50}</td>
                                <td className="py-1 pl-1.5 text-right font-bold text-amber-900">{product.nutrition.proteins.vd}</td>
                              </tr>
                              <tr>
                                <td className="py-1 font-bold uppercase">{t.produtosPage.totalFat}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.totalFat.q100}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.totalFat.q50}</td>
                                <td className="py-1 pl-1.5 text-right font-bold text-amber-900">{product.nutrition.totalFat.vd}</td>
                              </tr>
                              <tr>
                                <td className="py-1 font-bold uppercase">{t.produtosPage.saturatedFat}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.saturatedFat.q100}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.saturatedFat.q50}</td>
                                <td className="py-1 pl-1.5 text-right font-bold text-amber-900">{product.nutrition.saturatedFat.vd}</td>
                              </tr>
                              <tr>
                                <td className="py-1 font-bold uppercase">{t.produtosPage.transFat}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.transFat.q100}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.transFat.q50}</td>
                                <td className="py-1 pl-1.5 text-right text-stone-400">{product.nutrition.transFat.vd}</td>
                              </tr>
                              <tr>
                                <td className="py-1 font-bold uppercase">{t.produtosPage.fiber}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.fiber.q100}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.fiber.q50}</td>
                                <td className="py-1 pl-1.5 text-right font-bold text-amber-900">{product.nutrition.fiber.vd}</td>
                              </tr>
                              <tr>
                                <td className="py-1 font-bold uppercase">{t.produtosPage.sodium}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.sodium.q100}</td>
                                <td className="py-1 px-1.5 text-center">{product.nutrition.sodium.q50}</td>
                                <td className="py-1 pl-1.5 text-right font-bold text-amber-900">{product.nutrition.sodium.vd}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Yellow / Golden indicator dots below table */}
                        {product.nutritionImageUrl && (
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <button
                              onClick={() => setNutritionMode(product.id, 'table')}
                              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                                currentNutritionMode === 'table'
                                  ? 'border border-amber-600 bg-transparent'
                                  : 'bg-[#de8a27]'
                              }`}
                              aria-label={t.produtosPage.viewTable}
                            />
                            <button
                              onClick={() => setNutritionMode(product.id, 'card')}
                              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                                currentNutritionMode === 'card'
                                  ? 'bg-[#de8a27]'
                                  : 'border border-amber-600 bg-transparent'
                              }`}
                              aria-label={t.produtosPage.viewLabel}
                            />
                          </div>
                        )}

                        {/* Table Footnote */}
                        <p className="text-[9px] sm:text-[10px] text-stone-500 mt-1.5 italic leading-tight">
                          {t.produtosPage.tableFootnote}
                        </p>
                      </>
                    )}

                    {/* Ingredients & Allergens Box */}
                    <div className="mt-3 p-2.5 sm:p-3 bg-stone-50 rounded-lg border border-stone-200 text-[10.5px] sm:text-[11px] space-y-1 shadow-2xs">
                      <p className="text-stone-700 leading-relaxed">
                        <strong className="text-stone-900 font-bold">{t.produtosPage.ingredientsLabel}</strong> {ingredients}
                      </p>
                      <p className="text-[#412213] font-bold tracking-wide">
                        {allergens}
                      </p>
                    </div>

                    {/* View Official Nutrition Label Modal Trigger */}
                    {product.nutritionImageUrl && (
                      <div className="mt-3.5 flex justify-center">
                        <button
                          onClick={() =>
                            setModalImage({
                              src: product.nutritionImageUrl || '',
                              title: badgeLabel,
                            })
                          }
                          className="w-full py-2.5 px-3.5 rounded-lg bg-amber-50 hover:bg-[#de8a27] hover:text-white text-stone-800 font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-amber-300/80 shadow-2xs cursor-pointer group"
                        >
                          <ZoomIn className="w-4 h-4 text-[#de8a27] group-hover:text-white transition-colors" />
                          <span>{t.produtosPage.viewOfficialLabel}</span>
                        </button>
                      </div>
                    )}

                  </div>

                </div>
              </section>
            );
          })}
        </div>

      </div>

      {/* Full-Screen Zoom Modal for Nutrition Labels and Packages */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col items-center overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-stone-200">
              <h4 className="font-brand font-bold text-base sm:text-lg text-stone-900">
                {modalImage.title}
              </h4>
              <button
                onClick={() => setModalImage(null)}
                className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                aria-label={t.produtosPage.closeModal}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={modalImage.src}
              alt={modalImage.title}
              className="max-h-[75vh] w-auto object-contain rounded-lg shadow-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
};
