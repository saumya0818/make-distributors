import React, { useState } from 'react';

export interface ListingCoverProps {
  src?: string;
  alt: string;
  category?: string;
  slug?: string;
  aspectRatio?: 'video' | 'wide' | 'square' | 'standard';
  className?: string;
  accentColor?: string;
}

// Domain-specific vector illustrations for individual listings (prevents repeating images)
const ThematicCoverScene: React.FC<{ category: string; alt: string }> = ({ category, alt }) => {
  if (category.includes('Food') || alt.toLowerCase().includes('food') || alt.toLowerCase().includes('grain')) {
    return (
      <svg className="w-full h-full" viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="360" height="200" fill="#1C1408" />
        <circle cx="270" cy="70" r="80" fill="#D97706" fillOpacity="0.25" filter="blur(30px)" />
        {/* Grain Sack & Staples Box */}
        <path d="M60 85 L120 75 L130 160 L50 160 Z" fill="#92400E" stroke="#FBBF24" strokeWidth="1.5" />
        <circle cx="90" cy="118" r="16" fill="#78350F" />
        <line x1="78" y1="118" x2="102" y2="118" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
        {/* Oil / Sauce Bottle */}
        <rect x="145" y="80" width="36" height="80" rx="6" fill="#B45309" stroke="#FDE68A" strokeWidth="1.5" />
        <rect x="153" y="60" width="20" height="22" rx="2" fill="#D97706" stroke="#FDE68A" strokeWidth="1.5" />
        <rect x="150" y="52" width="26" height="8" rx="2" fill="#FBBF24" />
        {/* Spices in bowl */}
        <ellipse cx="240" cy="140" rx="42" ry="18" fill="#78350F" stroke="#F59E0B" strokeWidth="1.5" />
        <ellipse cx="240" cy="136" rx="36" ry="14" fill="#D97706" />
        <circle cx="230" cy="132" r="3" fill="#FEF3C7" />
        <circle cx="245" cy="130" r="2.5" fill="#FEF3C7" />
      </svg>
    );
  }

  if (category.includes('Health') || category.includes('Personal') || alt.toLowerCase().includes('skincare') || alt.toLowerCase().includes('cosmetic')) {
    return (
      <svg className="w-full h-full" viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="360" height="200" fill="#041816" />
        <circle cx="260" cy="70" r="80" fill="#0D9488" fillOpacity="0.25" filter="blur(30px)" />
        {/* Serum Dropper Bottle */}
        <rect x="70" y="80" width="40" height="80" rx="8" fill="#0F766E" stroke="#5EEAD4" strokeWidth="1.5" />
        <rect x="80" y="60" width="20" height="22" rx="3" fill="#134E4A" stroke="#5EEAD4" strokeWidth="1.5" />
        <rect x="85" y="46" width="10" height="15" rx="4" fill="#5EEAD4" />
        <rect x="75" y="100" width="30" height="32" rx="4" fill="#CCFBF1" fillOpacity="0.9" />
        {/* Jar */}
        <rect x="135" y="98" width="60" height="62" rx="10" fill="#115E59" stroke="#2DD4BF" strokeWidth="1.5" />
        <rect x="140" y="86" width="50" height="14" rx="4" fill="#2DD4BF" />
        {/* Luminous Bubbles */}
        <circle cx="240" cy="90" r="16" fill="#2DD4BF" fillOpacity="0.35" stroke="#5EEAD4" strokeWidth="1.5" />
        <circle cx="270" cy="125" r="24" fill="#14B8A6" fillOpacity="0.2" stroke="#99F6E4" strokeWidth="1.5" />
      </svg>
    );
  }

  if (category.includes('Ayurvedic') || category.includes('Herbal') || alt.toLowerCase().includes('herb')) {
    return (
      <svg className="w-full h-full" viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="360" height="200" fill="#05170B" />
        <circle cx="200" cy="80" r="80" fill="#16A34A" fillOpacity="0.2" filter="blur(30px)" />
        {/* Mortar & Pestle */}
        <path d="M80 115 C80 150 145 150 145 115 Z" fill="#14532D" stroke="#86EFAC" strokeWidth="2" />
        <line x1="90" y1="95" x2="125" y2="140" stroke="#4ADE80" strokeWidth="6" strokeLinecap="round" />
        {/* Organic Neem Leaves */}
        <path d="M190 145 C170 115 195 75 225 70 C225 100 215 130 190 145 Z" fill="#16A34A" stroke="#BBF7D0" strokeWidth="1.5" />
        <path d="M195 135 C215 115 245 110 265 85 C250 115 230 135 195 135 Z" fill="#22C55E" stroke="#BBF7D0" strokeWidth="1.5" />
      </svg>
    );
  }

  if (category.includes('Home') || category.includes('Cleaning')) {
    return (
      <svg className="w-full h-full" viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="360" height="200" fill="#041424" />
        <circle cx="250" cy="80" r="80" fill="#0284C7" fillOpacity="0.25" filter="blur(30px)" />
        {/* Detergent Spray Bottle */}
        <path d="M80 95 L80 160 L120 160 L120 115 L100 95 Z" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
        <path d="M85 75 L120 70 L110 60 L80 68 Z" fill="#38BDF8" />
        <path d="M85 75 L70 85" stroke="#BAE6FD" strokeWidth="3" strokeLinecap="round" />
        {/* Laundry Jug */}
        <path d="M145 90 C145 80 155 80 165 80 L190 80 C200 80 200 90 200 100 L200 160 L145 160 Z" fill="#075985" stroke="#7DD3FC" strokeWidth="1.5" />
        <circle cx="245" cy="80" r="12" fill="#38BDF8" fillOpacity="0.3" stroke="#BAE6FD" strokeWidth="1.5" />
        <circle cx="270" cy="120" r="18" fill="#0EA5E9" fillOpacity="0.2" stroke="#BAE6FD" strokeWidth="1.5" />
      </svg>
    );
  }

  if (category.includes('Agriculture') || category.includes('Farming')) {
    return (
      <svg className="w-full h-full" viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="360" height="200" fill="#121A05" />
        <circle cx="250" cy="80" r="80" fill="#65A30D" fillOpacity="0.25" filter="blur(30px)" />
        {/* Golden Wheat Stalk */}
        <path d="M90 165 Q110 110 120 60" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="123" cy="65" rx="6" ry="12" fill="#FACC15" transform="rotate(25 123 65)" />
        <ellipse cx="111" cy="85" rx="6" ry="12" fill="#FACC15" transform="rotate(-25 111 85)" />
        {/* Bio-Fertilizer Sack */}
        <path d="M150 85 L210 80 L220 165 L140 165 Z" fill="#3F6212" stroke="#A3E635" strokeWidth="1.5" />
        <circle cx="180" cy="120" r="18" fill="#4D7C0F" stroke="#BEF264" strokeWidth="1.5" />
      </svg>
    );
  }

  if (category.includes('Building') || category.includes('Construction') || alt.toLowerCase().includes('tile') || alt.toLowerCase().includes('material')) {
    return (
      <svg className="w-full h-full" viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="360" height="200" fill="#1C1917" />
        <circle cx="260" cy="80" r="80" fill="#EA580C" fillOpacity="0.2" filter="blur(30px)" />
        {/* Ceramic Tiles Stack */}
        <polygon points="60,95 120,70 180,95 120,120" fill="#78716C" stroke="#D6D3D1" strokeWidth="1.5" />
        <polygon points="60,110 120,85 180,110 120,135" fill="#57534E" stroke="#D6D3D1" strokeWidth="1.5" />
        <polygon points="60,125 120,100 180,125 120,150" fill="#44403C" stroke="#D6D3D1" strokeWidth="1.5" />
        {/* Architectural Grid / Ruler */}
        <rect x="200" y="70" width="120" height="80" rx="4" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1.5" />
        <line x1="220" y1="70" x2="220" y2="150" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="260" y1="70" x2="260" y2="150" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="200" y1="110" x2="320" y2="110" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    );
  }

  if (category.includes('Automobile') || category.includes('Transportation') || alt.toLowerCase().includes('lubricant') || alt.toLowerCase().includes('auto')) {
    return (
      <svg className="w-full h-full" viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="360" height="200" fill="#0F172A" />
        <circle cx="240" cy="80" r="80" fill="#3B82F6" fillOpacity="0.25" filter="blur(30px)" />
        {/* Motor Oil Canister */}
        <path d="M70 80 L115 80 L125 160 L60 160 Z" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
        <rect x="75" y="60" width="20" height="20" rx="2" fill="#F59E0B" />
        <rect x="80" y="52" width="12" height="8" rx="2" fill="#FDE68A" />
        <circle cx="92" cy="120" r="14" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.5" />
        {/* Engine Gear / Disc Brake */}
        <circle cx="220" cy="115" r="40" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
        <circle cx="220" cy="115" r="22" fill="#0F172A" stroke="#94A3B8" strokeWidth="2" />
        <circle cx="220" cy="115" r="8" fill="#F59E0B" />
        {/* Caliper bolt dots */}
        <circle cx="220" cy="90" r="3" fill="#E2E8F0" />
        <circle cx="245" cy="115" r="3" fill="#E2E8F0" />
        <circle cx="220" cy="140" r="3" fill="#E2E8F0" />
        <circle cx="195" cy="115" r="3" fill="#E2E8F0" />
      </svg>
    );
  }

  if (category.includes('Electronics') || category.includes('Electrical') || alt.toLowerCase().includes('device') || alt.toLowerCase().includes('switch')) {
    return (
      <svg className="w-full h-full" viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="360" height="200" fill="#05192D" />
        <circle cx="240" cy="80" r="80" fill="#0284C7" fillOpacity="0.25" filter="blur(30px)" />
        {/* Modular Switch Board */}
        <rect x="60" y="65" width="100" height="95" rx="8" fill="#0F2942" stroke="#38BDF8" strokeWidth="1.5" />
        <rect x="75" y="80" width="30" height="40" rx="3" fill="#0369A1" stroke="#BAE6FD" strokeWidth="1" />
        <rect x="115" y="80" width="30" height="40" rx="3" fill="#0369A1" stroke="#BAE6FD" strokeWidth="1" />
        <line x1="90" y1="92" x2="90" y2="108" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        <line x1="130" y1="92" x2="130" y2="108" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        {/* Circuit Board Traces & Microchip */}
        <rect x="210" y="80" width="70" height="70" rx="6" fill="#0284C7" fillOpacity="0.2" stroke="#38BDF8" strokeWidth="1.5" />
        <rect x="230" y="100" width="30" height="30" rx="3" fill="#075985" stroke="#FBBF24" strokeWidth="1.5" />
        <path d="M160 115 H210 M245 80 V60 M245 150 V170" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
    );
  }

  // General B2B Logistics Corridor Visual
  return (
    <svg className="w-full h-full" viewBox="0 0 360 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="360" height="200" fill="#071A2B" />
      <circle cx="250" cy="80" r="80" fill="#0284C7" fillOpacity="0.25" filter="blur(30px)" />
      {/* 3D Shipping Box */}
      <path d="M90 95 L150 70 L210 95 L150 120 Z" fill="#0369A1" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M90 95 L90 155 L150 180 L150 120 Z" fill="#075985" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M210 95 L210 155 L150 180 L150 120 Z" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1.5" />
      <circle cx="270" cy="120" r="28" fill="#0284C7" fillOpacity="0.2" stroke="#F2D27B" strokeWidth="1.5" strokeDasharray="4 4" />
    </svg>
  );
};

export const ListingCover: React.FC<ListingCoverProps> = ({
  src,
  alt,
  category = 'Food & Beverage',
  aspectRatio = 'video',
  className = '',
  accentColor,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const aspectClass = {
    video: 'aspect-[16/9]',
    wide: 'aspect-[21/9]',
    square: 'aspect-square',
    standard: 'aspect-[4/3]',
  }[aspectRatio];

  return (
    <div className={`relative overflow-hidden bg-[#071A2B] ${aspectClass} ${className}`}>
      {/* Unique Thematic Vector Illustration Background (Always Unique & Domain-Specific) */}
      <div className="absolute inset-0">
        <ThematicCoverScene category={category} alt={alt} />
      </div>

      {/* Image overlay when available without error */}
      {src && !error && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`relative z-10 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
            loaded ? 'opacity-90' : 'opacity-0'
          }`}
        />
      )}

      {/* Subtle bottom contrast scrim */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

      {/* Domain Badge */}
      <div className="absolute top-3 left-3 z-30 px-2.5 py-0.5 rounded-md bg-[#071A2B]/85 backdrop-blur-xs border border-white/15 text-[10px] font-bold text-[#F2D27B] uppercase tracking-wider shadow-sm">
        {category}
      </div>
    </div>
  );
};

export default ListingCover;

