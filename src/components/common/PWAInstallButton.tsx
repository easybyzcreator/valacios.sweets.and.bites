import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { useLanguage } from '../../context/LanguageContext';
import { Download, Share, X } from 'lucide-react';

export const PWAInstallButton: React.FC<{ variant?: 'header' | 'footer' | 'floating' | 'menu' }> = ({
  variant = 'header',
}) => {
  const { t } = useLanguage();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  // If already installed as PWA, hide button
  if (isInstalled) {
    return null;
  }

  // If neither installable event fired nor on iOS, we can still show a helpful app launcher/install option
  const handleClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // Desktop / Android browser where prompt hasn't fired yet
      setShowIOSModal(true);
    }
  };

  const buttonStyle =
    variant === 'header'
      ? 'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#de8a27] text-white hover:bg-[#c9781b] hover:shadow-md transition-all cursor-pointer'
      : variant === 'floating'
      ? 'fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#de8a27] text-white font-bold text-sm shadow-xl hover:bg-[#c9781b] hover:scale-105 transition-all cursor-pointer'
      : variant === 'menu'
      ? 'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-[#de8a27] text-white hover:bg-[#c9781b] transition-all cursor-pointer'
      : 'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-[#de8a27] text-white hover:bg-[#c9781b] transition-all cursor-pointer';

  return (
    <>
      <button
        id="pwa-install-btn"
        onClick={handleClick}
        className={buttonStyle}
        title={t.nav.installApp}
      >
        <Download className="w-3.5 h-3.5" />
        <span>{t.nav.installApp}</span>
      </button>

      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-stone-900 border border-amber-200">
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-full hover:bg-stone-100"
              aria-label={t.pwaModal?.close || 'Fechar'}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://i.ibb.co/8L8chyDJ/patitour-2026-10-21-T170043-322.png"
                alt="Valacio's App"
                className="w-12 h-12 rounded-xl shadow-md object-contain border border-amber-300 bg-white"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <h3 className="font-brand font-bold text-base text-stone-900">
                  {t.pwaModal?.title || "Instalar Valacio's"}
                </h3>
                <p className="text-xs text-stone-500">
                  {t.pwaModal?.desc || "Acesse direto da tela inicial"}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-stone-600 bg-amber-50/70 p-3.5 rounded-xl border border-amber-100 mb-5">
              <div className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#de8a27] text-white font-bold flex items-center justify-center text-[10px]">
                  1
                </span>
                <p>
                  {t.pwaModal?.step1 || "Toque no botão Compartilhar na barra do navegador"} <Share className="w-3.5 h-3.5 inline mx-0.5" />
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#de8a27] text-white font-bold flex items-center justify-center text-[10px]">
                  2
                </span>
                <p>
                  {t.pwaModal?.step2 || "Role as opções para baixo e selecione 'Adicionar à Tela de Início'"}
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#de8a27] text-white font-bold flex items-center justify-center text-[10px]">
                  3
                </span>
                <p>
                  {t.pwaModal?.step3 || "Confirme em Adicionar no canto superior. Pronto!"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 bg-[#de8a27] hover:bg-[#c9781b] text-white font-bold text-sm rounded-xl transition cursor-pointer"
            >
              {t.pwaModal?.close || 'OK'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
