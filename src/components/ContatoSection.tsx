import React, { useState } from 'react';
import { EnvelopeWithHeartDoodle, BrushStrokeUnderline } from './common/Doodles';
import { CheckCircle2, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { saveLead } from '../utils/leadsStore';

export const ContatoSection: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome && !formData.email) return;

    setStatus('submitting');
    // Save contact message to store so it is accessible in #/admin
    saveLead({
      type: 'contato',
      name: formData.nome,
      contact: formData.email,
      email: formData.email,
      message: formData.mensagem,
    });

    setTimeout(() => {
      setStatus('success');
      setFormData({ nome: '', email: '', mensagem: '' });
      setTimeout(() => setStatus('idle'), 6000);
    }, 400);
  };

  return (
    <section
      id="contato-section"
      className="relative w-full py-20 sm:py-28 overflow-hidden select-none px-4 scroll-mt-32 md:scroll-mt-40"
      style={{
        // Dark vertical wood paneling texture matching the brand brown #412213
        backgroundColor: '#351b0f',
        backgroundImage: `
          repeating-linear-gradient(90deg, 
            #31180d 0px, #31180d 40px, 
            #2a140b 41px, 
            #3a1e11 42px, #3a1e11 84px, 
            #26120a 85px,
            #361c10 86px, #361c10 128px,
            #220f08 129px
          )
        `,
      }}
    >
      {/* Soft warm vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto">
        
        {/* Centered White Card (Layout matching Image 3) */}
        <div className="bg-white rounded-none sm:rounded-md shadow-2xl p-8 sm:p-12 md:p-14 flex flex-col items-center">
          
          {/* Hand-drawn Envelope with Heart Icon */}
          <div className="mb-3 transform hover:scale-105 transition-transform">
            <EnvelopeWithHeartDoodle className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>

          {/* Title with authentic Logo - Adjusted proportions as requested */}
          <h2 className="font-brand font-black text-lg sm:text-xl md:text-2xl text-[#412213] tracking-tight text-center leading-snug flex flex-wrap items-center justify-center gap-x-2.5 max-w-lg mx-auto">
            {(() => {
              const rawTitle = t.contato.title;
              const parts = rawTitle.split(/Valacio['’]s/i);
              if (parts.length === 2) {
                return (
                  <>
                    <span>{parts[0].trim()}</span>
                    <img
                      src="/logo.png"
                      alt="Valacio's"
                      className="inline-block h-12 sm:h-16 md:h-20 w-auto object-contain align-middle my-1"
                    />
                    <span>{parts[1].trim()}</span>
                  </>
                );
              }
              return <span>{rawTitle}</span>;
            })()}
          </h2>

          {/* Brush stroke underline */}
          <div className="mt-2 mb-4">
            <BrushStrokeUnderline className="w-28 sm:w-36 h-2.5" color="#412213" />
          </div>

          {/* Descriptive text */}
          <p className="text-stone-600 text-xs sm:text-sm text-center leading-relaxed font-normal mb-8 max-w-md">
            {t.contato.description}
          </p>

          {/* Success notification banner */}
          {status === 'success' && (
            <div className="w-full mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-900 flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div className="text-xs sm:text-sm font-medium">
                <strong>{t.contato.successTitle}</strong>
                <p>{t.contato.successMsg}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            
            {/* Side-by-side inputs: Nome and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="contato-nome" className="sr-only">{t.contato.namePlaceholder}</label>
                <input
                  id="contato-nome"
                  type="text"
                  required
                  placeholder={t.contato.namePlaceholder}
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-3 bg-[#f2f4f5] rounded-none sm:rounded text-stone-900 text-xs sm:text-sm placeholder-stone-500 border border-transparent focus:border-[#de8a27] focus:bg-white focus:outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="contato-email" className="sr-only">{t.contato.emailPlaceholder}</label>
                <input
                  id="contato-email"
                  type="email"
                  required
                  placeholder={t.contato.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#f2f4f5] rounded-none sm:rounded text-stone-900 text-xs sm:text-sm placeholder-stone-500 border border-transparent focus:border-[#de8a27] focus:bg-white focus:outline-none transition"
                />
              </div>
            </div>

            {/* Message textarea */}
            <div>
              <label htmlFor="contato-mensagem" className="sr-only">{t.contato.msgPlaceholder}</label>
              <textarea
                id="contato-mensagem"
                rows={4}
                required
                placeholder={t.contato.msgPlaceholder}
                value={formData.mensagem}
                onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                className="w-full px-4 py-3 bg-[#f2f4f5] rounded-none sm:rounded text-stone-900 text-xs sm:text-sm placeholder-stone-500 border border-transparent focus:border-[#de8a27] focus:bg-white focus:outline-none transition resize-none"
              />
            </div>

            {/* Action button */}
            <div className="pt-2 flex justify-center">
              <button
                id="contato-enviar-btn"
                type="submit"
                disabled={status === 'submitting'}
                className="px-8 sm:px-12 py-3.5 rounded-full bg-[#de8a27] hover:bg-[#c9781b] text-white font-brand font-black text-xs sm:text-sm tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{status === 'submitting' ? t.contato.sending : (t.contato.submitBtn || t.contato.whatsappBtn)}</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
