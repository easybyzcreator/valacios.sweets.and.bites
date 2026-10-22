import React, { useState } from 'react';
import { BRAND_INFO } from '../../data/mockData';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'header';
  onClick?: () => void;
  preferPwaImage?: boolean;
  withGlass?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  onClick,
  withGlass = false,
}) => {
  const [imgError, setImgError] = useState(false);

  const containerSizes = {
    sm: 'h-10 sm:h-12',
    md: 'h-14 sm:h-16 md:h-20',
    header: 'h-[68px] sm:h-[78px] md:h-24',
    lg: 'h-20 sm:h-24 md:h-28',
  };

  const glassClasses = withGlass
    ? 'bg-white/95 hover:bg-white backdrop-blur-md px-5 sm:px-7 py-2 sm:py-2.5 rounded-2xl border border-white/90 shadow-[0_6px_25px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)]'
    : '';

  // New official logo with golden heart for header and footer requested by the user: https://i.ibb.co/DgRtxr65/patitour-2026-10-22-T094759-023.png
  const logoSrc = imgError
    ? 'https://i.ibb.co/DgRtxr65/patitour-2026-10-22-T094759-023.png'
    : '/assets/logo-header-footer.png';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center cursor-pointer select-none group transition-all duration-300 hover:scale-105 active:scale-95 ${containerSizes[size]} ${glassClasses} ${className}`}
      role="button"
      tabIndex={0}
      title={BRAND_INFO.name}
    >
      <img
        src={logoSrc}
        alt={BRAND_INFO.name}
        className="h-full w-auto max-h-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-all duration-300"
        onError={() => {
          if (!imgError) {
            setImgError(true);
          }
        }}
      />
    </div>
  );
};

