import React from 'react';
import { ASSET_MANIFEST } from '../../data/assetManifest';
import { FloatingHeroAsset } from './FloatingHeroAsset';
import { ImageWithFallback } from '../common/ImageWithFallback';
import {
  Factory,
  Package,
  Warehouse,
  FileSpreadsheet,
  Truck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface HeroNetworkSceneProps {
  onNavigate?: (path: string) => void;
}

export const HeroNetworkScene: React.FC<HeroNetworkSceneProps> = ({ onNavigate }) => {
  const hubAsset = ASSET_MANIFEST['hero-central-hub'];
  const manufacturerAsset = ASSET_MANIFEST['hero-manufacturer-factory'];
  const brandAsset = ASSET_MANIFEST['hero-brand-product-package'];
  const wholesalerAsset = ASSET_MANIFEST['hero-wholesaler-warehouse'];
  const supplierAsset = ASSET_MANIFEST['hero-supplier-shipment'];
  const distributorAsset = ASSET_MANIFEST['hero-distributor-delivery'];
  const partnershipAsset = ASSET_MANIFEST['hero-business-partnership'];

  return (
    <div className="relative w-full max-w-[620px] mx-auto aspect-[4/3] sm:aspect-[16/12] lg:aspect-[16/13] flex items-center justify-center select-none overflow-visible">
      {/* 1. Ambient Background Glow & Radial Network Lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Luminous Glow Spheres */}
        <div className="w-72 h-72 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute w-44 h-44 rounded-full bg-amber-400/10 blur-2xl" />

        {/* Dynamic Glowing Vector Connection Web (Circuit & Route Traces) */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 600 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Pulsing Light Beam Gradients */}
            <linearGradient id="hubBeam1" x1="300" y1="250" x2="480" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="hubBeam2" x1="300" y1="250" x2="100" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="hubBeam3" x1="300" y1="250" x2="510" y2="250" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F2D27B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D7A83D" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="hubBeam4" x1="300" y1="250" x2="90" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0B2545" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="hubBeam5" x1="300" y1="250" x2="480" y2="420" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
            </linearGradient>

            {/* Glowing filter */}
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Concentric Orbital Rings */}
          <circle cx="300" cy="250" r="190" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="300" cy="250" r="135" stroke="rgba(215, 168, 61, 0.2)" strokeWidth="1.2" strokeDasharray="6 6" />
          <circle cx="300" cy="250" r="85" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1.5" />

          {/* Connected Circuit & Route Traces from Hub to the 6 nodes */}
          <path d="M 300 250 L 460 90" stroke="url(#hubBeam1)" strokeWidth="1.75" filter="url(#glowEffect)" />
          <path d="M 300 250 L 140 90" stroke="url(#hubBeam2)" strokeWidth="1.75" filter="url(#glowEffect)" />
          <path d="M 300 250 L 480 250" stroke="url(#hubBeam3)" strokeWidth="1.75" filter="url(#glowEffect)" />
          <path d="M 300 250 L 130 380" stroke="url(#hubBeam4)" strokeWidth="1.75" filter="url(#glowEffect)" />
          <path d="M 300 250 L 460 390" stroke="url(#hubBeam5)" strokeWidth="1.75" filter="url(#glowEffect)" />

          {/* Subtle light particles drifting on route lines */}
          <circle cx="380" cy="170" r="2.5" fill="#38BDF8" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="220" cy="170" r="2.5" fill="#38BDF8" className="animate-ping" style={{ animationDuration: '3.5s' }} />
          <circle cx="390" cy="250" r="2.5" fill="#F2D27B" className="animate-ping" style={{ animationDuration: '2.5s' }} />
          <circle cx="215" cy="315" r="2.5" fill="#38BDF8" className="animate-ping" style={{ animationDuration: '4s' }} />
          <circle cx="380" cy="320" r="2.5" fill="#34D399" className="animate-ping" style={{ animationDuration: '3.2s' }} />
        </svg>
      </div>

      {/* 2. CENTRAL MAKE DISTRIBUTORS NETWORK HUB (Brighter, Radiant Circular Medallion with Highlights) */}
      <div className="relative z-30 flex flex-col items-center justify-center pointer-events-auto">
        {/* Radiant Highlight Burst behind the medallion */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-sky-400/25 via-amber-300/30 to-cyan-400/25 blur-xl animate-pulse" />

        {/* The Medallion Container */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-[#0284C7] via-[#F2D27B] to-[#38BDF8] shadow-[0_0_50px_rgba(56,189,248,0.45),0_0_20px_rgba(215,168,61,0.35)] transition-transform duration-300 hover:scale-105">
          {/* Inner metallic dark ring */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#081B30] to-[#040E1A] p-2 flex flex-col items-center justify-center text-center overflow-hidden border border-white/20 relative">
            {/* Generated Radiant Central Hub Asset */}
            <ImageWithFallback
              src={hubAsset.file_path}
              alt={hubAsset.alt_text}
              loading="eager"
              objectFit="cover"
              className="absolute inset-0 w-full h-full rounded-full opacity-90 mix-blend-screen"
              fallback={
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0284C7] to-[#071A2B] rounded-full" />
              }
            />

            {/* Specular Highlight Glint Bar */}
            <div className="absolute -top-6 -left-6 w-20 h-40 bg-gradient-to-r from-transparent via-white/25 to-transparent rotate-45 pointer-events-none" />

            {/* Foreground Brand Badge */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#38BDF8] via-[#0284C7] to-[#071A2B] border-2 border-white/80 flex items-center justify-center text-white font-black text-base sm:text-xl shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                MD
              </div>
              <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-white mt-1 drop-shadow-md">
                Make Network
              </div>
              <div className="text-[8px] sm:text-[9px] font-bold font-mono tracking-widest text-amber-300 drop-shadow">
                CENTRAL HUB
              </div>
            </div>
          </div>
        </div>

        {/* Live Network Activity Marker */}
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071A2B]/90 backdrop-blur-md border border-sky-400/30 text-[10px] sm:text-xs text-sky-200 font-semibold shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Active Trade Exchange</span>
        </div>
      </div>

      {/* 3. THE 6 UNIQUE FLOATING 3D/2.5D BUSINESS ASSETS (Desktop/Tablet arrangement with layered depth) */}

      {/* IMAGE 2: Brand Product — Upper Left inside visual area */}
      <FloatingHeroAsset
        id="hero-asset-brand"
        title="Consumer Brands"
        subtitle="Packaged SKUs Ready"
        imageSrc={brandAsset.file_path}
        altText={brandAsset.alt_text}
        className="top-0 left-0 sm:top-2 sm:left-4"
        animationDelay="0.2s"
        animationDuration="5.5s"
        animationType="float-subtle"
        hideOnMobile={true}
        hideOnTablet={false}
        badgeAccent="#38BDF8"
        icon={<Package className="w-3.5 h-3.5" />}
      />

      {/* IMAGE 1: Manufacturer — Upper Right */}
      <FloatingHeroAsset
        id="hero-asset-manufacturer"
        title="Industrial Producers"
        subtitle="Direct Factory Capacity"
        imageSrc={manufacturerAsset.file_path}
        altText={manufacturerAsset.alt_text}
        className="top-0 right-0 sm:top-2 sm:right-4"
        animationDelay="0s"
        animationDuration="6s"
        animationType="float-slow"
        hideOnMobile={false}
        hideOnTablet={false}
        badgeAccent="#0284C7"
        icon={<Factory className="w-3.5 h-3.5" />}
      />

      {/* IMAGE 3: Wholesaler — Middle Right */}
      <FloatingHeroAsset
        id="hero-asset-wholesaler"
        title="Regional Wholesalers"
        subtitle="Pallet Inventory Hubs"
        imageSrc={wholesalerAsset.file_path}
        altText={wholesalerAsset.alt_text}
        className="top-[45%] -translate-y-1/2 right-[-10px] sm:right-0"
        animationDelay="0.8s"
        animationDuration="6.2s"
        animationType="float-horizontal"
        hideOnMobile={true}
        hideOnTablet={false}
        badgeAccent="#D7A83D"
        icon={<Warehouse className="w-3.5 h-3.5" />}
      />

      {/* IMAGE 6: Business Partnership — Center Right near the network hub */}
      <FloatingHeroAsset
        id="hero-asset-partnership"
        title="Verified Contracts"
        subtitle="Zero-Leakage Security"
        imageSrc={partnershipAsset.file_path}
        altText={partnershipAsset.alt_text}
        className="top-[28%] left-[-15px] sm:left-4"
        animationDelay="1.2s"
        animationDuration="5.8s"
        animationType="float-card"
        hideOnMobile={true}
        hideOnTablet={true}
        badgeAccent="#F2D27B"
        icon={<ShieldCheck className="w-3.5 h-3.5" />}
      />

      {/* IMAGE 4: Supplier — Lower Left */}
      <FloatingHeroAsset
        id="hero-asset-supplier"
        title="Material Suppliers"
        subtitle="B2B Invoice & Quotes"
        imageSrc={supplierAsset.file_path}
        altText={supplierAsset.alt_text}
        className="bottom-2 left-0 sm:bottom-4 sm:left-4"
        animationDelay="1.5s"
        animationDuration="6.5s"
        animationType="float-slow"
        hideOnMobile={true}
        hideOnTablet={true}
        badgeAccent="#0284C7"
        icon={<FileSpreadsheet className="w-3.5 h-3.5" />}
      />

      {/* IMAGE 5: Distributor — Lower Right */}
      <FloatingHeroAsset
        id="hero-asset-distributor"
        title="Route Distributors"
        subtitle="Direct Store Delivery"
        imageSrc={distributorAsset.file_path}
        altText={distributorAsset.alt_text}
        className="bottom-2 right-0 sm:bottom-4 sm:right-4"
        animationDelay="0.5s"
        animationDuration="5.2s"
        animationType="float-horizontal"
        hideOnMobile={false}
        hideOnTablet={false}
        badgeAccent="#10B981"
        icon={<Truck className="w-3.5 h-3.5" />}
      />
    </div>
  );
};

export default HeroNetworkScene;
