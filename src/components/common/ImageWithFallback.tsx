import React, { useState } from 'react';

export interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
  aspectRatio?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain' | 'fill';
  onLoad?: () => void;
  onError?: () => void;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallback,
  aspectRatio,
  width,
  height,
  loading = 'lazy',
  objectFit = 'cover',
  onLoad,
  onError,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(!src);

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const fitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
  }[objectFit];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: aspectRatio,
        width: width,
        height: height,
      }}
    >
      {/* Loading Skeleton */}
      {!loaded && !hasError && src && (
        <div className="absolute inset-0 bg-slate-800/80 animate-pulse flex items-center justify-center pointer-events-none">
          <div className="w-5 h-5 rounded-full border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
        </div>
      )}

      {/* Main Image */}
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          referrerPolicy="no-referrer"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full ${fitClass} transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        /* Fallback Container */
        fallback || (
          <div className="w-full h-full bg-gradient-to-br from-[#071A2B] via-[#0D263A] to-[#0A1A2E] flex flex-col items-center justify-center p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-2">
              <span className="text-xs font-bold font-mono">MD</span>
            </div>
            <span className="text-[11px] text-slate-300 font-medium line-clamp-1">{alt}</span>
          </div>
        )
      )}
    </div>
  );
};

export default ImageWithFallback;
