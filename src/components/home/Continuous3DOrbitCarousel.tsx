import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

interface CarouselItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  image: string;
  color: string;
  route: string;
}

const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: 'brand-products',
    title: 'Brand Packaged Goods',
    category: 'High-Velocity FMCG & Consumer Lines',
    badge: '01 · BRANDS',
    image: '/src/assets/images/hero_brand_product_package_1790224052078.jpg',
    color: '#D7A83D',
    route: '/opportunities',
  },
  {
    id: 'manufacturing-factory',
    title: 'Precision Manufacturing',
    category: 'Automated Batch Production Lines',
    badge: '02 · FACTORIES',
    image: '/src/assets/images/hero_manufacturer_factory_1790224040673.jpg',
    color: '#38BDF8',
    route: '/opportunities',
  },
  {
    id: 'wholesale-warehouse',
    title: 'Wholesale Inventory Hub',
    category: 'Bulk Pallet Storage & Dispatch',
    badge: '03 · WHOLESALERS',
    image: '/src/assets/images/hero_wholesaler_warehouse_1790224068006.jpg',
    color: '#10B981',
    route: '/distributors',
  },
  {
    id: 'distributor-fleet',
    title: 'Route Distribution Fleet',
    category: 'Direct Store Delivery (DSD) Corridors',
    badge: '04 · DISTRIBUTORS',
    image: '/src/assets/images/hero_distributor_delivery_1790224094988.jpg',
    color: '#F59E0B',
    route: '/distributors',
  },
  {
    id: 'retail-partnership',
    title: 'Retail Storefront Counters',
    category: 'Consumer Shelf Velocity & Sales',
    badge: '05 · RETAIL',
    image: '/src/assets/images/hero_business_partnership_1790224106581.jpg',
    color: '#A855F7',
    route: '/opportunities',
  },
];

interface Continuous3DOrbitCarouselProps {
  onNavigate?: (path: string) => void;
}

export const Continuous3DOrbitCarousel: React.FC<Continuous3DOrbitCarouselProps> = ({
  onNavigate,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Speed: ~18 degrees per second = one full 360° revolution every 20 seconds
  const ROTATION_SPEED = 18;

  // Continuous animation frame loop
  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (time - lastTimeRef.current) / 1000;
        if (isPlaying && !isHovered && !isDragging) {
          setRotationAngle((prev) => (prev + delta * ROTATION_SPEED) % 360);
        }
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, isHovered, isDragging]);

  // Keep track of which item is closest to the front (0 deg)
  useEffect(() => {
    // Normalizing angle to find the card facing camera
    const normalized = (360 - (rotationAngle % 360) + 36) % 360;
    const index = Math.floor(normalized / 72) % 5;
    setActiveItemIndex(index);
  }, [rotationAngle]);

  // Manual rotation controls
  const handlePrev = () => {
    setRotationAngle((prev) => prev - 72);
  };

  const handleNext = () => {
    setRotationAngle((prev) => prev + 72);
  };

  // Mouse & touch drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    setRotationAngle((prev) => prev + deltaX * 0.5);
    setDragStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStartX;
    setRotationAngle((prev) => prev + deltaX * 0.5);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full relative flex flex-col items-center select-none py-4">
      {/* Top Section Header Accent */}
      <div className="flex items-center gap-2 mb-3">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D263A] border border-[#D7A83D]/40 text-[#F2D27B] text-[11px] font-bold uppercase tracking-wider shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#D7A83D]" />
          <span>Interactive 3D Distribution Network</span>
        </span>
        <span className="text-xs text-slate-400 font-mono hidden sm:inline">
          5 CONNECTED PILLARS
        </span>
      </div>

      {/* Main 3D Stage Container */}
      <div
        className="relative w-full max-w-4xl h-[340px] sm:h-[390px] flex items-center justify-center cursor-grab active:cursor-grabbing perspective-1200 overflow-visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsDragging(false);
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 3D Floor Grid & Concentric Orbital Rings */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[680px] h-[480px] sm:h-[680px] rounded-full pointer-events-none opacity-40"
          style={{
            transform: 'rotateX(75deg) translateZ(-60px)',
            background: 'radial-gradient(circle, rgba(215, 168, 61, 0.15) 0%, rgba(56, 189, 248, 0.08) 50%, transparent 70%)',
            border: '1px dashed rgba(215, 168, 61, 0.4)',
          }}
        >
          {/* Inner orbit ring */}
          <div className="absolute inset-16 rounded-full border border-[#38BDF8]/30" />
          <div className="absolute inset-32 rounded-full border border-[#D7A83D]/25" />
        </div>

        {/* Central Luminous Hub Base with Golden Light Reflection */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none flex flex-col items-center justify-center"
          style={{ transform: 'translateZ(-10px)' }}
        >
          {/* Glowing central golden coin aura */}
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#D7A83D] to-[#FEF08A] opacity-35 blur-xl animate-pulse" />
          <div className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-[#D7A83D] shadow-[0_0_25px_rgba(215,168,61,0.6)] flex items-center justify-center bg-[#07131D]/90">
            <span className="text-xs sm:text-sm font-black text-[#FEF08A] tracking-wider">
              MD
            </span>
          </div>
        </div>

        {/* The 3D Rotating Carousel Cylinder containing the 5 Images */}
        <div
          className="relative w-full h-full flex items-center justify-center preserve-3d transition-transform duration-75"
          style={{
            transform: `rotateX(-5deg) rotateY(${rotationAngle}deg)`,
          }}
        >
          {CAROUSEL_ITEMS.map((item, index) => {
            const baseAngle = index * 72; // 360 / 5 = 72 deg
            // Responsive radius: ~200px on small screens, ~290px on medium/large
            const isFront = index === activeItemIndex;

            return (
              <div
                key={item.id}
                className="absolute w-[180px] sm:w-[230px] h-[240px] sm:h-[290px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl transition-shadow duration-300 group"
                style={{
                  transform: `rotateY(${baseAngle}deg) translateZ(var(--carousel-radius, 280px))`,
                  // Using CSS custom property for responsive translateZ in style
                  borderColor: isFront ? item.color : 'rgba(100, 116, 139, 0.4)',
                  boxShadow: isFront
                    ? `0 15px 35px -5px ${item.color}40, 0 0 20px ${item.color}30`
                    : '0 10px 25px -5px rgba(0, 0, 0, 0.6)',
                }}
                onClick={() => {
                  if (onNavigate) {
                    onNavigate(item.route);
                  }
                }}
              >
                {/* Visual Image */}
                <div className="relative w-full h-full bg-[#071A2B] rounded-2xl overflow-hidden border-2 border-slate-700/80 group-hover:border-[#D7A83D] transition-colors">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient Scrim for readable text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-[#071A2B]/40 to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span
                      className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black uppercase tracking-wider backdrop-blur-md border shadow-sm"
                      style={{
                        backgroundColor: 'rgba(7, 26, 43, 0.85)',
                        borderColor: item.color,
                        color: item.color,
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Bottom Information Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10 text-left">
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#F2D27B] transition-colors leading-tight drop-shadow-sm">
                      {item.title}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-300 line-clamp-1 mt-0.5 leading-normal">
                      {item.category}
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-[#D7A83D] group-hover:translate-x-1 transition-transform">
                      <span>Explore Sector</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>

                {/* Sub-card Ground Shadow & Ambient Light */}
                <div
                  className="absolute -bottom-4 left-4 right-4 h-3 rounded-full opacity-60 blur-sm pointer-events-none"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Control Bar: Play/Pause, Step Prev/Next, and Active Indicator */}
      <div className="mt-2 flex items-center gap-4 z-20">
        <button
          onClick={handlePrev}
          aria-label="Rotate 3D carousel previous"
          className="w-8 h-8 rounded-full bg-[#0D263A] hover:bg-[#1E3A56] border border-slate-700 hover:border-[#D7A83D] text-slate-200 hover:text-white flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause 3D rotation' : 'Resume 3D continuous rotation'}
          className="px-3 py-1 rounded-full bg-[#0D263A] hover:bg-[#1E3A56] border border-[#D7A83D]/50 text-xs font-semibold text-[#F2D27B] flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-sm"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-[#D7A83D]" />
              <span>Pause 3D Spin</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[#D7A83D]" />
              <span>Resume 3D Spin</span>
            </>
          )}
        </button>

        <button
          onClick={handleNext}
          aria-label="Rotate 3D carousel next"
          className="w-8 h-8 rounded-full bg-[#0D263A] hover:bg-[#1E3A56] border border-slate-700 hover:border-[#D7A83D] text-slate-200 hover:text-white flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-sm"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Active Indicator Dots for the 5 Pillars */}
      <div className="flex items-center gap-1.5 mt-2.5">
        {CAROUSEL_ITEMS.map((item, index) => (
          <button
            key={item.id}
            onClick={() => {
              // Rotate directly to target item
              const targetAngle = -(index * 72);
              setRotationAngle(targetAngle);
            }}
            aria-label={`Jump to ${item.title}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === activeItemIndex
                ? 'w-6 bg-[#D7A83D]'
                : 'w-2 bg-slate-700 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>

      {/* Embedded CSS for responsive 3D radius */}
      <style>{`
        :root {
          --carousel-radius: 290px;
        }
        @media (max-width: 640px) {
          :root {
            --carousel-radius: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default Continuous3DOrbitCarousel;
