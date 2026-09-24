import React, { useState } from 'react';

export type LogoVariant =
  | 'dark'
  | 'light'
  | 'icon'
  | 'blue-monochrome'
  | 'white-monochrome'
  | 'social-square';

export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';

interface MakeDistributorsLogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  showWordmark?: boolean;
  tagline?: boolean | string;
  className?: string;
  idSuffix?: string;
}

// Path to the high-resolution glowing golden coin medallion asset
const GOLDEN_COIN_IMAGE_SRC = '/src/assets/images/golden_coin_logo_1790225127638.jpg';

export const MakeDistributorsLogo: React.FC<MakeDistributorsLogoProps> = ({
  variant = 'light',
  size = 'md',
  showWordmark = true,
  tagline = false,
  className = '',
  idSuffix = '',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Dimension sizing map for the icon emblem
  const sizeMap: Record<LogoSize, { iconSize: number; textSize: string; subTextSize: string; gap: string }> = {
    xs: { iconSize: 24, textSize: 'text-xs', subTextSize: 'text-[9px]', gap: 'gap-1.5' },
    sm: { iconSize: 32, textSize: 'text-sm', subTextSize: 'text-[10px]', gap: 'gap-2' },
    md: { iconSize: 42, textSize: 'text-base', subTextSize: 'text-[11px]', gap: 'gap-2.5' },
    lg: { iconSize: 52, textSize: 'text-lg', subTextSize: 'text-xs', gap: 'gap-3' },
    xl: { iconSize: 64, textSize: 'text-xl', subTextSize: 'text-xs', gap: 'gap-3.5' },
    hero: { iconSize: 84, textSize: 'text-2xl sm:text-3xl', subTextSize: 'text-xs sm:text-sm', gap: 'gap-4' },
  };

  const currentSize = sizeMap[size];
  const isDark = variant === 'dark';
  const isWhiteMono = variant === 'white-monochrome';
  const isBlueMono = variant === 'blue-monochrome';
  const isSocialSquare = variant === 'social-square';
  const isIconOnly = variant === 'icon' || !showWordmark;

  // Social Profile Square Layout (Full High-Resolution Golden Coin Showcase)
  if (isSocialSquare) {
    return (
      <div
        className={`w-full aspect-square rounded-3xl bg-[#07131D] border-2 border-[#D7A83D]/40 shadow-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden ${className}`}
      >
        {/* Background glow flare & radial dust reflection */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D7A83D]/25 via-[#071A2B]/80 to-[#050D15] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-[0_0_40px_rgba(215,168,61,0.6)] border-2 border-[#F2D27B]">
            <img
              src={GOLDEN_COIN_IMAGE_SRC}
              alt="Make Distributors Golden Coin Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center gap-2">
              <span className="text-white drop-shadow-md">MAKE</span>
              <span className="bg-gradient-to-r from-[#FDE68A] via-[#D7A83D] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(215,168,61,0.5)]">
                DISTRIBUTORS
              </span>
            </div>
            <div className="text-xs text-[#F2D27B]/80 font-medium tracking-wide mt-1">
              Where Brands Meet Growth Partners.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Golden Coin Medallion Emblem
  const Emblem = () => {
    return (
      <div
        style={{ width: currentSize.iconSize, height: currentSize.iconSize }}
        className="relative shrink-0 rounded-full group-hover:scale-105 transition-transform duration-300"
      >
        {/* Golden halo glow behind the coin */}
        <div
          className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#D7A83D] to-[#FDE68A] opacity-40 blur-xs group-hover:opacity-75 transition-opacity"
          aria-hidden="true"
        />

        {/* Primary Golden Coin Render with crisp circular clipping */}
        <div className="relative w-full h-full rounded-full overflow-hidden border border-[#D7A83D]/80 shadow-[0_0_14px_rgba(215,168,61,0.5)] bg-[#071420] flex items-center justify-center">
          {!imageError ? (
            <img
              src={GOLDEN_COIN_IMAGE_SRC}
              alt="Make Distributors Golden Coin Logo"
              loading="eager"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-90'
              }`}
            />
          ) : (
            /* Resilient SVG fallback matching the golden coin circuit medallion */
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id={`gold-rim-${idSuffix}`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="50%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                <radialGradient id={`gold-core-${idSuffix}`} cx="24" cy="24" r="20" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#B45309" />
                  <stop offset="70%" stopColor="#0B131D" />
                  <stop offset="100%" stopColor="#000000" />
                </radialGradient>
              </defs>
              <circle cx="24" cy="24" r="23" fill="#07131D" stroke={`url(#gold-rim-${idSuffix})`} strokeWidth="2" />
              <circle cx="24" cy="24" r="19" stroke="#FDE68A" strokeWidth="0.8" strokeDasharray="2 2" />
              <circle cx="24" cy="24" r="16" fill={`url(#gold-core-${idSuffix})`} />
              {/* Circuit tracks */}
              <path d="M12 24 H18 L21 20 H27" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M36 24 H30 L27 28 H21" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="21" cy="20" r="1.5" fill="#FEF08A" />
              <circle cx="27" cy="28" r="1.5" fill="#FEF08A" />
              {/* Central Monogram */}
              <text x="24" y="29" textAnchor="middle" fill="#FEF08A" fontSize="14" fontWeight="900" fontFamily="sans-serif">
                M
              </text>
            </svg>
          )}
        </div>
      </div>
    );
  };

  // Regular Inline / Header Logo Rendering
  return (
    <div className={`inline-flex items-center ${currentSize.gap} select-none group ${className}`}>
      <Emblem />

      {!isIconOnly && (
        <div className="flex flex-col text-left">
          <div
            className={`font-black tracking-tight leading-none ${currentSize.textSize} flex items-center gap-1`}
          >
            <span className={isDark || isWhiteMono ? 'text-white' : 'text-[#071A2B]'}>
              MAKE
            </span>
            <span
              className={
                isWhiteMono
                  ? 'text-white/90'
                  : isBlueMono
                  ? 'text-[#0284C7]'
                  : 'bg-gradient-to-r from-[#FDE68A] via-[#D7A83D] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-[0_1px_4px_rgba(215,168,61,0.3)]'
              }
            >
              DISTRIBUTORS
            </span>
          </div>

          {tagline && (
            <span
              className={`tracking-tight font-medium ${currentSize.subTextSize} ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              } mt-0.5`}
            >
              {typeof tagline === 'string' ? tagline : 'Where Brands Meet Growth Partners.'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Convenience wrappers for required logo variants
export const MakeDistributorsFullLogo: React.FC<Omit<MakeDistributorsLogoProps, 'variant'>> = (props) => (
  <MakeDistributorsLogo variant="light" showWordmark={true} {...props} />
);

export const MakeDistributorsIcon: React.FC<Omit<MakeDistributorsLogoProps, 'variant' | 'showWordmark'>> = (props) => (
  <MakeDistributorsLogo variant="icon" showWordmark={false} {...props} />
);

export const MakeDistributorsDarkLogo: React.FC<Omit<MakeDistributorsLogoProps, 'variant'>> = (props) => (
  <MakeDistributorsLogo variant="dark" showWordmark={true} {...props} />
);

export const MakeDistributorsLightLogo: React.FC<Omit<MakeDistributorsLogoProps, 'variant'>> = (props) => (
  <MakeDistributorsLogo variant="light" showWordmark={true} {...props} />
);

export const MakeDistributorsBlueMonoLogo: React.FC<Omit<MakeDistributorsLogoProps, 'variant'>> = (props) => (
  <MakeDistributorsLogo variant="blue-monochrome" {...props} />
);

export const MakeDistributorsWhiteMonoLogo: React.FC<Omit<MakeDistributorsLogoProps, 'variant'>> = (props) => (
  <MakeDistributorsLogo variant="white-monochrome" {...props} />
);

export const MakeDistributorsSocialSquareLogo: React.FC<Omit<MakeDistributorsLogoProps, 'variant'>> = (props) => (
  <MakeDistributorsLogo variant="social-square" {...props} />
);

export default MakeDistributorsLogo;
