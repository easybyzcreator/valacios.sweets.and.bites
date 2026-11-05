import React, { useState, useEffect, useRef } from 'react';
import { PageView, Language } from '../types';
import { BrandLogo } from './common/BrandLogo';
import { PWAInstallButton } from './common/PWAInstallButton';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS_CATALOG } from '../data/mockData';

interface HeaderNavProps {
  currentPage: PageView;
  onNavigate: (page: PageView, targetProductId?: string) => void;
  onOpenModal?: (modalType: 'parceiro' | 'onde-encontrar') => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentPage,
  onNavigate,
  onOpenModal,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnterProducts = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setProductsDropdownOpen(true);
  };

  const handleMouseLeaveProducts = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 180);
  };

  const handleProductSelect = (productId: string) => {
    setProductsDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate('produtos', productId);
  };

  const navLinks: { label: string; page: PageView; isModal?: boolean; modalType?: 'parceiro' | 'onde-encontrar' }[] = [
    { label: t.nav.home, page: 'home' },
    { label: t.nav.about, page: 'sobre' },
    { label: t.nav.products, page: 'produtos' },
    { label: t.nav.partner, page: 'parceiro', isModal: true, modalType: 'parceiro' },
    { label: t.nav.whereToFind, page: 'onde-encontrar', isModal: true, modalType: 'onde-encontrar' },
    { label: t.nav.contact, page: 'contato' },
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);
    if (link.isModal && link.modalType && onOpenModal) {
      onOpenModal(link.modalType);
    } else if (link.page === 'contato') {
      const scrollToContact = () => {
        const contactEl = document.getElementById('contato-section');
        if (contactEl) {
          const headerOffset = 130;
          const elementPosition = contactEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth',
          });
        }
      };

      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(scrollToContact, 200);
      } else {
        scrollToContact();
      }
    } else {
      onNavigate(link.page);
    }
  };

  // Primary language English first, then Portuguese, then Spanish
  const languageOptions: { code: Language; tag: string; label: string; flag: string }[] = [
    { code: 'EN', tag: 'US EN', label: 'English', flag: '🇺🇸' },
    { code: 'PT', tag: 'BR PT', label: 'Português', flag: '🇧🇷' },
    { code: 'ES', tag: 'ES ES', label: 'Español', flag: '🇪🇸' },
  ];

  const currentOption = languageOptions.find((l) => l.code === language) || languageOptions[0];

  const isHome = currentPage === 'home';

  return (
    <header
      className={`${
        isHome
          ? `fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
              scrolled
                ? 'bg-stone-950/90 backdrop-blur-md shadow-lg py-2'
                : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent pt-3 pb-4'
            }`
          : 'relative z-40 bg-[#241108] border-b border-[#3d1e10] shadow-xl pt-3 pb-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center relative">
        
        {/* Top bar row: Language selector (right) */}
        <div className="w-full flex items-center justify-end pointer-events-auto">
          {/* Right: Language Pill selector matching Imagem 2 (US EN with chevron) */}
          <div className="relative">
            <button
              id="language-selector-btn"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#de8a27] hover:bg-[#c9781b] text-white font-extrabold text-xs shadow-md transition select-none cursor-pointer tracking-wider"
              aria-expanded={langDropdownOpen}
            >
              <span className="font-brand font-black text-white text-xs sm:text-sm">{currentOption.tag}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-white transition-transform ${
                  langDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {langDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-40 bg-white rounded-lg shadow-xl border border-stone-200 py-1 z-50 text-xs font-semibold text-stone-800 animate-in fade-in">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLanguage(opt.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-amber-50 cursor-pointer transition ${
                      language === opt.code ? 'text-amber-800 bg-amber-50 font-bold' : 'text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{opt.flag}</span>
                      <span>{opt.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-stone-400 font-bold">{opt.tag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Brand Logo (+20% size requested by user) */}
        <div className="my-1 mb-2 lg:mb-4">
          <BrandLogo
            size="header"
            onClick={() => onNavigate('home')}
          />
        </div>

        {/* Desktop Navigation Links (below the logo, centered with ~2 lines extra breathing room) */}
        <nav className="hidden lg:flex items-center justify-center gap-7 xl:gap-9 mt-4 lg:mt-6 pb-1">
          {navLinks.map((link) => {
            const isActive =
              currentPage === link.page ||
              (link.page === 'home' && currentPage === 'home');

            if (link.page === 'produtos') {
              return (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={handleMouseEnterProducts}
                  onMouseLeave={handleMouseLeaveProducts}
                >
                  <button
                    id="nav-link-produtos"
                    onClick={() => handleLinkClick(link)}
                    className={`font-brand font-black text-xs xl:text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer relative py-1 drop-shadow-md flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#de8a27]'
                        : 'text-white hover:text-[#de8a27]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        productsDropdownOpen ? 'rotate-180 text-[#de8a27]' : 'text-white/70'
                      }`}
                    />
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#de8a27] rounded-full" />
                    )}
                  </button>

                  {/* Dropdown Menu matching Imagem 2 (warm chocolate brown box, bold uppercase white text) */}
                  {productsDropdownOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1.5 z-50 min-w-[270px] animate-in fade-in zoom-in-95 duration-150">
                      <div className="bg-[#4d2517] border border-[#6b3724] shadow-2xl rounded-sm overflow-hidden py-2 text-center">
                        {PRODUCTS_CATALOG.map((prod) => {
                          const localized = t.produtosPage.catalog[prod.id];
                          const label = localized?.badgeLabel || prod.badgeLabel;

                          return (
                            <button
                              key={prod.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProductSelect(prod.id);
                              }}
                              className="w-full text-center py-2.5 px-4 font-brand font-black text-xs sm:text-[13px] text-white hover:text-[#fde047] hover:bg-[#633321] transition-colors cursor-pointer uppercase tracking-wider block"
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={link.label}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleLinkClick(link)}
                className={`font-brand font-black text-xs xl:text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer relative py-1 drop-shadow-md ${
                  isActive
                    ? 'text-[#de8a27]'
                    : 'text-white hover:text-[#de8a27]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#de8a27] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="lg:hidden absolute top-3 left-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-black/40 text-white hover:bg-black/60 transition cursor-pointer"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950/95 border-b border-stone-800 px-6 py-6 animate-in slide-in-from-top duration-200 backdrop-blur-lg">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              if (link.page === 'produtos') {
                return (
                  <div key={link.label} className="border-b border-white/5 pb-2">
                    <div className="flex items-center justify-between py-2">
                      <button
                        onClick={() => handleLinkClick(link)}
                        className="text-left font-brand font-black text-sm tracking-wider uppercase text-white hover:text-[#de8a27] transition cursor-pointer"
                      >
                        {link.label}
                      </button>
                      <button
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                        className="p-1 text-white/70 hover:text-white"
                        aria-label="Expandir produtos"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {mobileProductsOpen && (
                      <div className="pl-3 py-1 space-y-2 bg-stone-900/60 rounded-lg my-1">
                        {PRODUCTS_CATALOG.map((prod) => {
                          const localized = t.produtosPage.catalog[prod.id];
                          const label = localized?.badgeLabel || prod.badgeLabel;

                          return (
                            <button
                              key={prod.id}
                              onClick={() => handleProductSelect(prod.id)}
                              className="block w-full text-left font-brand font-bold text-xs uppercase text-amber-200/90 hover:text-amber-300 py-1 cursor-pointer tracking-wider"
                            >
                              • {label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link)}
                  className="text-left font-brand font-black text-sm tracking-wider uppercase py-2 text-white hover:text-[#de8a27] transition border-b border-white/5 cursor-pointer"
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-2 flex justify-center">
              <PWAInstallButton variant="menu" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
