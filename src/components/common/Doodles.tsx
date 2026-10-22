import React from 'react';

/**
 * Hand-drawn rustic brown brush stroke underline matching the official logo brown #412213
 */
export const BrushStrokeUnderline: React.FC<{ className?: string; color?: string }> = ({
  className = "w-28 h-2",
  color = "#412213"
}) => (
  <svg
    viewBox="0 0 120 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <path
      d="M3 6.5C25 4.5 50 7.8 80 5.2C95 3.9 112 6.1 117 7C114 8 98 7.5 78 8.8C48 10.7 20 7.2 3 6.5Z"
      fill={color}
    />
  </svg>
);

/**
 * Hand-drawn curved arrow pointing to products matching #412213
 */
export const CurvedArrowDown: React.FC<{ className?: string; color?: string }> = ({
  className = "w-10 h-10",
  color = "#412213"
}) => (
  <svg
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 10C24 16 38 28 35 44"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 45C30 46 36 45 37 45C37 42 36 34 33 30"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Hand-drawn warm yellow sunburst rays doodle matching the logo heart #de8a27
 */
export const SunburstRays: React.FC<{ className?: string; color?: string }> = ({
  className = "w-12 h-12",
  color = "#de8a27"
}) => (
  <svg
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 42L4 46M18 28L8 26M28 16L24 6M42 20L52 14M46 34L56 36"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Golden heart doodle matching the official logo heart #de8a27
 */
export const HeartDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = "w-8 h-8",
  color = "#de8a27"
}) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M20 33C14 28 6 21 6 13.5C6 8.5 10 5 15 5C17.5 5 19.5 6.5 20 7.8C20.5 6.5 22.5 5 25 5C30 5 34 8.5 34 13.5C34 21 26 28 20 33Z"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Hand-drawn envelope with heart seal doodle matching #412213 and heart #de8a27
 */
export const EnvelopeWithHeartDoodle: React.FC<{ className?: string }> = ({
  className = "w-16 h-16"
}) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Envelope body */}
    <rect
      x="12"
      y="22"
      width="56"
      height="40"
      rx="4"
      stroke="#412213"
      strokeWidth="3.5"
      fill="#ffffff"
    />
    {/* Envelope fold flap */}
    <path
      d="M14 24L40 44L66 24"
      stroke="#412213"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Authentic Brand Heart Seal matching the 'o' from the official Valacio's logo - Proportionally sized with subtle heartbeat motion */}
    <g className="animate-heart-pulse" style={{ transformOrigin: '40px 42px' }}>
      <g transform="translate(40, 42) scale(0.60) translate(-14, -13.5)">
        {/* Background card disc for clean contrast against the envelope flap */}
        <circle cx="14" cy="13.5" r="14" fill="#ffffff" stroke="#fce7c8" strokeWidth="0.8" />
        {/* Official amber brand heart outline from Valacio's logo */}
        <path
          d="M14 24.5 C12.2 22.5 4 15.5 4 9.5 C4 5.2 7.2 2.2 11 2.2 C12.8 2.2 13.6 3.2 14 3.8 C14.4 3.2 15.2 2.2 17 2.2 C20.8 2.2 24 5.2 24 9.5 C24 15.5 15.8 22.5 14 24.5 Z"
          fill="#ffffff"
          stroke="#de8a27"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
);

/**
 * Notched ribbon banner matching logo colors
 */
export const RibbonBanner: React.FC<{
  text: string;
  className?: string;
  textColor?: string;
  bgColor?: string;
}> = ({
  text,
  className = "",
  textColor = "#de8a27", // warm amber heart color
  bgColor = "#412213",   // deep official brand brown
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Left ribbon tail */}
      <div
        className="w-4 h-9 -mr-1"
        style={{
          backgroundColor: bgColor,
          clipPath: 'polygon(100% 0, 100% 100%, 0% 50%)',
          transform: 'rotate(180deg)',
          filter: 'brightness(0.85)',
        }}
      />
      {/* Main ribbon rectangle */}
      <div
        className="px-6 py-1.5 font-brand font-black tracking-wider text-base md:text-lg uppercase text-center shadow-md select-none rounded-xs"
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
      >
        {text}
      </div>
      {/* Right ribbon tail */}
      <div
        className="w-4 h-9 -ml-1"
        style={{
          backgroundColor: bgColor,
          clipPath: 'polygon(100% 0, 100% 100%, 0% 50%)',
          filter: 'brightness(0.85)',
        }}
      />
    </div>
  );
};
