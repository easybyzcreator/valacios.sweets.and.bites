/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView } from './types';
import { HeaderNav } from './components/HeaderNav';
import { HeroCarousel } from './components/HeroCarousel';
import { SobrePreviewSection } from './components/SobrePreviewSection';
import { SobrePage } from './components/SobrePage';
import { ProdutosPreviewSection } from './components/ProdutosPreviewSection';
import { ProdutosPage } from './components/ProdutosPage';
import { DiferenciaisSection } from './components/DiferenciaisSection';
import { GaleriaSection } from './components/GaleriaSection';
import { ContatoSection } from './components/ContatoSection';
import { Footer } from './components/Footer';
import { InfoModals } from './components/InfoModals';
import { AdminQrCodePage } from './components/AdminQrCodePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [activeModal, setActiveModal] = useState<'parceiro' | 'onde-encontrar' | null>(null);
  const [targetProductId, setTargetProductId] = useState<string | null>(null);

  // Detect and handle hidden #/admin route via hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#/admin' || hash === '#admin') {
        setCurrentPage('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '' || hash === '#' || hash === '#/') {
        setCurrentPage((prev) => (prev === 'admin' ? 'home' : prev));
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageView, targetProductId?: string) => {
    if (page !== 'admin' && window.location.hash.includes('admin')) {
      // Clean URL hash when navigating away from admin
      window.history.replaceState(null, '', window.location.pathname);
    }
    if (page === 'parceiro' || page === 'onde-encontrar') {
      setActiveModal(page);
      return;
    }
    if (page === 'contato') {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          document.getElementById('contato-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('contato-section')?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    setCurrentPage(page);
    if (page === 'produtos' && targetProductId) {
      setTargetProductId(targetProductId);
      setTimeout(() => {
        document.getElementById(`produto-${targetProductId}`)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExitAdmin = () => {
    window.location.hash = '';
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If on hidden admin route (#/admin)
  if (currentPage === 'admin') {
    return <AdminQrCodePage onBackToHome={handleExitAdmin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-900 text-stone-100 font-sans selection:bg-amber-400 selection:text-amber-950">
      
      {/* Top Navigation Header (Zero mention or link to #/admin) */}
      <HeaderNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenModal={(modal) => setActiveModal(modal)}
      />

      {/* Main Content Router */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <>
            {/* Header Slides 1-4 with auto-play and vertical side dots */}
            <HeroCarousel onNavigate={handleNavigate} />

            {/* Image 5: Sobre preview with basket & "CONTINUAR LENDO" */}
            <SobrePreviewSection onNavigate={handleNavigate} />

            {/* Image 7: Produtos preview with arc fan & "VER TODOS OS PRODUTOS" */}
            <ProdutosPreviewSection onNavigate={handleNavigate} />

            {/* Image 9: Diferenciais (Fácil de preparar, Sem aromatizantes, E irresistível!) */}
            <DiferenciaisSection />

            {/* Galeria de Fotos - Novo bloco solicitado igual imagem 1 */}
            <GaleriaSection />

            {/* Image 10: Contato form on vertical dark wood paneling */}
            <ContatoSection />
          </>
        )}

        {currentPage === 'sobre' && (
          /* Image 6: Dedicated Sobre page with "DESDE 2019" */
          <SobrePage onNavigate={handleNavigate} />
        )}

        {currentPage === 'produtos' && (
          /* Dedicated Produtos page with all items listed separately (Imagem 1 & 3) */
          <ProdutosPage onNavigate={handleNavigate} targetProductId={targetProductId} />
        )}
      </main>

      {/* Modals for Seja um Parceiro, Seja um Franqueado, Onde Encontrar */}
      <InfoModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        onSwitchModal={(modal) => setActiveModal(modal)}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenModal={(modal) => setActiveModal(modal)}
      />

    </div>
  );
}

