import React, { useState } from 'react';
import { X, CheckCircle2, Store, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { saveLead } from '../utils/leadsStore';

interface InfoModalsProps {
  activeModal: 'parceiro' | 'onde-encontrar' | null;
  onClose: () => void;
  onSwitchModal?: (modal: 'parceiro' | 'onde-encontrar') => void;
}

/**
 * Formats input into standard US phone format: (###) ###-####
 */
const formatUSPhone = (value: string): string => {
  let digits = value.replace(/\D/g, '');
  // If user pasted 1-###-###-####, remove leading US country code 1
  if (digits.length > 10 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }
  digits = digits.slice(0, 10);

  if (!digits) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export const InfoModals: React.FC<InfoModalsProps> = ({ activeModal, onClose, onSwitchModal }) => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCity, setFormCity] = useState('');

  if (!activeModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeModal === 'parceiro') {
      // Save lead to local storage / admin store so it appears in #/admin
      saveLead({
        type: 'parceiro',
        name: formName,
        contact: formPhone,
        phone: formPhone,
        cityState: formCity,
        message: 'Questionário Seja um Parceiro preenchido no site.',
      });
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormName('');
      setFormPhone('');
      setFormCity('');
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-amber-200 overflow-hidden text-stone-900 animate-in zoom-in-95">
        
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-[#412213] via-[#4d2817] to-[#2e170d] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition cursor-pointer"
            aria-label={t.modals.close}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            {activeModal === 'parceiro' && <Store className="w-8 h-8 text-[#de8a27]" />}
            {activeModal === 'onde-encontrar' && <MapPin className="w-8 h-8 text-[#de8a27]" />}
            <div>
              <h3 className="font-brand font-black text-xl uppercase tracking-wide text-[#de8a27]">
                {activeModal === 'parceiro' && t.modals.partnerTitle}
                {activeModal === 'onde-encontrar' && t.modals.whereToFindTitle}
              </h3>
              <p className="text-xs text-amber-100/90 font-medium leading-relaxed">
                {activeModal === 'parceiro' && t.modals.partnerSubtitle}
                {activeModal === 'onde-encontrar' && t.modals.whereToFindSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center flex flex-col items-center">
              <CheckCircle2 className="w-12 h-12 text-green-600 mb-3 animate-bounce" />
              <h4 className="font-brand font-bold text-lg text-stone-900">
                {t.modals.successTitle}
              </h4>
              <p className="text-xs text-stone-600 mt-1 max-w-xs">
                {t.modals.successMsg}
              </p>
            </div>
          ) : (
            <>
              {activeModal === 'parceiro' && (
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                    {t.modals.partnerCall}
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder={t.modals.nameEmpresaPlaceholder}
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-stone-100 rounded-lg text-xs sm:text-sm border border-stone-300 focus:border-amber-500 focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="tel"
                          required
                          maxLength={14}
                          inputMode="tel"
                          placeholder={t.modals.whatsappPlaceholder || "(###) ###-####"}
                          value={formPhone}
                          onChange={(e) => setFormPhone(formatUSPhone(e.target.value))}
                          className="w-full px-3.5 py-2.5 bg-stone-100 rounded-lg text-xs sm:text-sm border border-stone-300 focus:border-amber-500 focus:bg-white focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          placeholder={t.modals.cityStatePlaceholder}
                          value={formCity}
                          onChange={(e) => setFormCity(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-stone-100 rounded-lg text-xs sm:text-sm border border-stone-300 focus:border-amber-500 focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#de8a27] hover:bg-[#c9781b] text-white font-brand font-black text-xs sm:text-sm uppercase tracking-wider rounded-lg transition shadow-md cursor-pointer hover:scale-[1.01] active:scale-95"
                    >
                      {t.modals.partnerBtn}
                    </button>
                  </form>
                </div>
              )}

              {activeModal === 'onde-encontrar' && (
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {t.modals.whereToFindText}
                  </p>
                  
                  {/* The 3 locations requested by the user */}
                  <div className="space-y-2.5 text-xs">
                    {(t.modals.locations || [
                      {
                        title: "International Fresh Market",
                        desc: "em Naperville, Illinois.",
                      },
                      {
                        title: "El Guero",
                        desc: "in Crest Hill, Illinois.",
                      },
                      {
                        title: "Garden Fresh Market",
                        desc: "in Mundelein, IL.",
                      },
                    ]).map((loc, idx) => (
                      <div key={idx} className="p-3.5 bg-stone-50 hover:bg-amber-50/60 transition rounded-xl border border-stone-200 flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#de8a27] mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-stone-900 block font-bold text-xs sm:text-sm">
                            {loc.title}
                          </strong>
                          <span className="text-stone-600 text-xs font-medium">
                            {loc.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Button "Quero ter os produtos na minha loja!" opening Parceiro modal */}
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (onSwitchModal) {
                          onSwitchModal('parceiro');
                        }
                      }}
                      className="w-full py-3.5 bg-[#de8a27] hover:bg-[#c9781b] text-white font-brand font-black text-xs sm:text-sm uppercase tracking-wider rounded-lg transition shadow-md cursor-pointer hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Store className="w-4 h-4" />
                      <span>{t.modals.wantInMyStoreBtn || "Quero ter os produtos na minha loja!"}</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
