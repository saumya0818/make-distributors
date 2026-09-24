import React from 'react';
import { ImageWithFallback } from '../common/ImageWithFallback';

export interface FloatingHeroAssetProps {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  altText: string;
  className?: string;
  animationDelay?: string;
  animationDuration?: string;
  animationType?: 'float-slow' | 'float-subtle' | 'float-horizontal' | 'float-card' | 'static';
  hideOnTablet?: boolean;
  hideOnMobile?: boolean;
  badgeAccent?: string;
  icon?: React.ReactNode;
}

export const FloatingHeroAsset: React.FC<FloatingHeroAssetProps> = ({
  id,
  title,
  subtitle,
  imageSrc,
  altText,
  className = '',
  animationDelay = '0s',
  animationDuration = '6s',
  animationType = 'float-slow',
  hideOnTablet = false,
  hideOnMobile = true,
  badgeAccent = '#0284C7',
  icon,
}) => {
  const responsiveVisibility = `
    ${hideOnMobile ? 'hidden sm:flex' : 'flex'}
    ${hideOnTablet ? 'md:hidden lg:flex' : 'flex'}
  `;

  // Animation class mapping (transforms only!)
  const animClass = {
    'float-slow': 'animate-float-vertical',
    'float-subtle': 'animate-float-subtle',
    'float-horizontal': 'animate-float-drift',
    'float-card': 'animate-float-pulse',
    'static': '',
  }[animationType];

  return (
    <div
      id={id}
      className={`absolute z-20 group pointer-events-auto ${responsiveVisibility} ${className}`}
      style={{
        animationDelay,
        animationDuration,
      }}
    >
      <div
        className={`relative flex items-center gap-3 p-2 sm:p-2.5 rounded-2xl bg-[#071A2B]/90 backdrop-blur-md border border-slate-700/80 shadow-2xl transition-transform duration-300 hover:scale-105 hover:border-sky-400/50 ${animClass}`}
      >
        {/* 3D Visual Asset Thumbnail */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-[#0A1D33] border border-sky-500/20 shrink-0 p-0.5 shadow-inner">
          <ImageWithFallback
            src={imageSrc}
            alt={altText}
            loading="eager"
            objectFit="contain"
            className="w-full h-full rounded-lg"
            fallback={
              <div
                className="w-full h-full flex items-center justify-center text-white"
                style={{ backgroundColor: badgeAccent }}
              >
                {icon}
              </div>
            }
          />
        </div>

        {/* Text Details */}
        <div className="pr-2 min-w-0">
          <div className="flex items-center gap-1.5">
            {icon && <span className="text-sky-400">{icon}</span>}
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
              {title}
            </h3>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-300 truncate font-medium">
            {subtitle}
          </p>
        </div>

        {/* Corner glowing node */}
        <div
          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-slate-900"
          style={{ backgroundColor: badgeAccent, boxShadow: `0 0 8px ${badgeAccent}` }}
        />
      </div>
    </div>
  );
};

export default FloatingHeroAsset;
