import React, { useState } from 'react';

export interface BrandLogoProps {
  name: string;
  logoUrl?: string;
  category?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'rounded' | 'square' | 'circle';
  accentColor?: string;
  className?: string;
}

// Category aesthetic palettes and custom glyph motifs
const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string; motif: string }> = {
  'Food & Beverage': { bg: 'from-amber-500 to-orange-600', text: 'text-amber-50', border: 'border-amber-200', motif: 'leaf' },
  'Health & Personal Care': { bg: 'from-teal-600 to-emerald-700', text: 'text-teal-50', border: 'border-teal-200', motif: 'droplet' },
  'Ayurvedic & Herbal': { bg: 'from-emerald-600 to-green-800', text: 'text-emerald-50', border: 'border-emerald-200', motif: 'lotus' },
  'Home Care & Cleaning': { bg: 'from-cyan-500 to-blue-600', text: 'text-cyan-50', border: 'border-cyan-200', motif: 'spark' },
  'Agriculture & Farming': { bg: 'from-lime-600 to-green-700', text: 'text-lime-50', border: 'border-lime-200', motif: 'sprout' },
  'Apparel & Fashion': { bg: 'from-rose-500 to-purple-600', text: 'text-rose-50', border: 'border-rose-200', motif: 'weave' },
  'Automobile & Transportation': { bg: 'from-slate-700 to-zinc-900', text: 'text-amber-400', border: 'border-slate-500', motif: 'gear' },
  'Building & Construction': { bg: 'from-stone-600 to-amber-800', text: 'text-stone-100', border: 'border-stone-300', motif: 'cube' },
  'Consumer Electronics': { bg: 'from-blue-600 to-indigo-800', text: 'text-sky-200', border: 'border-blue-300', motif: 'bolt' },
  'Electronics & Electrical': { bg: 'from-yellow-500 to-amber-600', text: 'text-amber-950', border: 'border-yellow-200', motif: 'power' },
  'Packaging': { bg: 'from-amber-700 to-orange-800', text: 'text-amber-100', border: 'border-amber-400', motif: 'box' },
  'Business Services': { bg: 'from-sky-700 to-indigo-900', text: 'text-sky-100', border: 'border-sky-300', motif: 'network' },
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  name,
  logoUrl,
  category = 'Food & Beverage',
  size = 'md',
  shape = 'rounded',
  accentColor,
  className = '',
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  const shapeClasses = {
    circle: 'rounded-full',
    rounded: 'rounded-xl',
    square: 'rounded-md',
  };

  const catStyle = CATEGORY_STYLES[category] || {
    bg: 'from-slate-700 to-slate-900',
    text: 'text-white',
    border: 'border-slate-300',
    motif: 'star',
  };

  // Extract distinct initials / monogram
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  if (logoUrl && !imageFailed) {
    return (
      <div
        className={`relative overflow-hidden bg-white border border-slate-200 shadow-sm flex items-center justify-center p-1 shrink-0 ${sizeClasses[size]} ${shapeClasses[shape]} ${className}`}
      >
        <img
          src={logoUrl}
          alt={`${name} brand logo`}
          className="w-full h-full object-contain"
          onError={() => setImageFailed(true)}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Visual geometric procedural logo badge when no external URL
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${catStyle.bg} shadow-sm flex items-center justify-center font-bold tracking-wider shrink-0 select-none border border-black/10 ${sizeClasses[size]} ${shapeClasses[shape]} ${className}`}
      style={accentColor ? { background: `linear-gradient(135deg, ${accentColor}, #071A2B)` } : undefined}
      title={`${name} – ${category}`}
      role="img"
      aria-label={`${name} brand emblem`}
    >
      {/* Subtle geometric motif pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 40 40" className="w-full h-full stroke-current" fill="none">
          <circle cx="20" cy="20" r="14" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M6 6L34 34M6 34L34 6" strokeWidth="1" />
        </svg>
      </div>

      <span className={`relative z-10 font-extrabold ${catStyle.text} drop-shadow-sm`}>
        {initials || name.slice(0, 2).toUpperCase()}
      </span>
    </div>
  );
};

export default BrandLogo;
