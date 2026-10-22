import React from 'react';
import { BrandLogo } from './common/BrandLogo';
import { BRAND_INFO } from '../data/mockData';
import { PageView } from '../types';
import { Instagram, Facebook, MessageCircle, MessageSquare, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenModal: (modalType: 'parceiro' | 'onde-encontrar') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenModal }) => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#201009] text-stone-300 py-12 border-t border-[#412213] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 items-center md:items-start text-center md:text-left">
          
          {/* Brand Info */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <BrandLogo size="md" onClick={() => onNavigate('home')} />
            <div className="mt-3 text-xs leading-relaxed max-w-xs text-stone-300">
              <p className="font-brand font-bold text-amber-200/90 mb-1">
                {t.footer.sloganTitle}
              </p>
              <p className="text-stone-400">
                {t.footer.sloganDesc}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1">
            <h4 className="font-brand font-black text-xs uppercase tracking-wider text-[#de8a27] mb-3">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-stone-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#de8a27] transition cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sobre')}
                  className="hover:text-[#de8a27] transition cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('produtos')}
                  className="hover:text-[#de8a27] transition cursor-pointer"
                >
                  {t.nav.products}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('contato-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#de8a27] transition cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional / Partnerships */}
          <div className="md:col-span-1">
            <h4 className="font-brand font-black text-xs uppercase tracking-wider text-[#de8a27] mb-3">
              {t.modals.partnerTitle}
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-stone-300">
              <li>
                <button
                  onClick={() => onOpenModal('parceiro')}
                  className="hover:text-[#de8a27] transition cursor-pointer"
                >
                  {t.nav.partner}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('onde-encontrar')}
                  className="hover:text-[#de8a27] transition cursor-pointer"
                >
                  {t.nav.whereToFind}
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h4 className="font-brand font-black text-xs uppercase tracking-wider text-[#de8a27] mb-3">
              {t.footer.social}
            </h4>
            <div className="flex items-center gap-3 mb-4">
              <a
                href={BRAND_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-stone-900 text-stone-300 hover:text-[#de8a27] hover:bg-stone-800 transition"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-stone-900 text-stone-300 hover:text-[#de8a27] hover:bg-stone-800 transition"
                aria-label="Facebook"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={BRAND_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-stone-900 text-stone-300 hover:text-[#de8a27] hover:bg-stone-800 transition"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="sms:+17327684298"
                className="p-2 rounded-full bg-stone-900 text-stone-300 hover:text-[#de8a27] hover:bg-stone-800 transition"
                aria-label="SMS"
                title="SMS"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
            <div className="text-[11px] text-stone-400 space-y-0.5">
              <p className="font-bold text-[#de8a27] tracking-wider uppercase text-[10px]">
                {t.footer.distributedBy}
              </p>
              <p className="font-semibold text-stone-200">Valacio's Sweets Party & Bites, LLC</p>
              <p>Joliet, IL 60435</p>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-3">
          <p>© {new Date().getFullYear()} {BRAND_INFO.name}. {t.footer.rights}</p>

          {/* Desenvolvido por EasyByzCreator */}
          <a
            href="https://easybyzcreator.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 hover:opacity-90 transition group py-1 cursor-pointer"
            title="EasyByzCreator - easybyzcreator.com"
          >
            <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">
              {t.footer.developedBy}
            </span>
            <img
              src="https://i.ibb.co/tgyHd35/ebcb.png"
              alt="EasyByzCreator"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain brightness-0 invert filter group-hover:scale-105 transition-transform"
            />
          </a>

          <p className="flex items-center gap-1 text-stone-400">
            {t.footer.madeWithLove} <Heart className="w-3 h-3 text-[#de8a27] fill-[#de8a27] inline" />
          </p>
        </div>

      </div>
    </footer>
  );
};
