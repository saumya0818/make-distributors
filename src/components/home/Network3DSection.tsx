import React, { useState } from 'react';
import {
  Factory,
  Package,
  Warehouse,
  Truck,
  Store,
  FileCheck2,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Building2,
  ArrowRight,
  Activity,
  Layers,
} from 'lucide-react';

interface Network3DSectionProps {
  onExplore: () => void;
}

export const Network3DSection: React.FC<Network3DSectionProps> = ({ onExplore }) => {
  const [reduceMotion, setReduceMotion] = useState(false);

  return (
    <section className="relative bg-gradient-to-b from-[#E0F2FE] via-[#F0F9FF] to-[#E0F2FE] text-[#071A2B] py-20 lg:py-28 overflow-hidden border-b-2 border-[#BAE6FD]">
      {/* Background Architectural Mesh */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="network3DGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D7A83D" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="1.5" fill="#D7A83D" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network3DGrid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition, Copy & CTA */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#D7A83D]/60 text-xs font-bold text-[#92400E] shadow-xs">
              <Layers className="w-3.5 h-3.5 text-[#D7A83D]" />
              <span>Omni-Channel Trade Architecture</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#071A2B] leading-[1.15] text-balance">
              Every Business Partner, Connected in{' '}
              <span className="bg-gradient-to-r from-[#B45309] via-[#D7A83D] to-[#F59E0B] bg-clip-text text-transparent">
                One Network
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              Make Distributors unites industrial manufacturers, consumer product brands, regional wholesalers, raw suppliers, and frontline route distributors. Trade intelligence, protected agreements, and vetted warehouse capacities integrate into one seamless pipeline.
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D7A83D] shrink-0" />
                <span>Verified financial standing & warehouse capacity checks</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FileCheck2 className="w-4 h-4 text-[#D7A83D] shrink-0" />
                <span>Standardized mutual non-disclosure & distribution agreements</span>
              </div>
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-[#D7A83D] shrink-0" />
                <span>Direct territorial reservation without broker markups</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onExplore}
                className="px-6 py-3.5 rounded-xl bg-[#D7A83D] hover:bg-[#C29632] text-[#071A2B] font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-[#D7A83D]/30 flex items-center gap-2 cursor-pointer active:scale-98 border border-[#FDE68A]"
              >
                <span>Explore the Network</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Reduced Motion Toggle for Accessibility */}
              <button
                onClick={() => setReduceMotion(!reduceMotion)}
                className="text-xs text-slate-600 hover:text-[#071A2B] px-3 py-2 rounded-lg border border-[#BAE6FD] bg-white hover:border-[#D7A83D] transition-colors"
                aria-pressed={reduceMotion}
              >
                {reduceMotion ? 'Enable Animation' : 'Reduce Motion'}
              </button>
            </div>
          </div>

          {/* Right Side: Large Premium Full Distribution Network Panoramic Scene */}
          <div className="lg:col-span-7 relative">
            <div
              className={`relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-white border-2 border-[#BAE6FD] shadow-2xl ${
                reduceMotion ? '' : 'transition-all'
              }`}
            >
              {/* Dedicated Panoramic Distribution Network Scene Image Asset */}
              <img
                src="/src/assets/images/network_panoramic_scene_1790224130839.jpg"
                alt="End-to-end B2B distribution pipeline from factory to retail store"
                className="w-full h-full object-cover object-center"
              />

              {/* Luminous Brand Scrim with Route Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/85 via-[#071A2B]/35 to-transparent pointer-events-none" />

              {/* Bottom Pipeline Progress Track: Factory -> Supplier -> Wholesaler -> Distributor -> Retail */}
              <div className="absolute bottom-4 left-4 right-4 z-20 p-3 sm:p-4 rounded-2xl bg-[#071A2B]/90 backdrop-blur-md border border-[#D7A83D]/50 shadow-xl">
                <div className="flex items-center justify-between text-[11px] font-bold text-white mb-2">
                  <span className="flex items-center gap-1.5 text-[#F2D27B]">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Synchronized Commercial Flow</span>
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px]">VERIFIED ZERO-LEAKAGE</span>
                </div>

                <div className="grid grid-cols-5 gap-1 text-center">
                  <div className="p-1.5 rounded-lg bg-[#0D263A] border border-sky-500/30">
                    <div className="text-[9px] sm:text-[10px] font-extrabold text-white truncate">Factory</div>
                    <div className="text-[8px] text-sky-400 truncate">Production</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#0D263A] border border-sky-500/30">
                    <div className="text-[9px] sm:text-[10px] font-extrabold text-white truncate">Supplier</div>
                    <div className="text-[8px] text-sky-400 truncate">Dispatch</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#0D263A] border border-amber-500/30">
                    <div className="text-[9px] sm:text-[10px] font-extrabold text-[#F2D27B] truncate">Wholesale</div>
                    <div className="text-[8px] text-amber-400 truncate">Stockist</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#0D263A] border border-emerald-500/30">
                    <div className="text-[9px] sm:text-[10px] font-extrabold text-emerald-300 truncate">Distributor</div>
                    <div className="text-[8px] text-emerald-400 truncate">Last-Mile</div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-[#0D263A] border border-purple-500/30">
                    <div className="text-[9px] sm:text-[10px] font-extrabold text-purple-300 truncate">Retail</div>
                    <div className="text-[8px] text-purple-400 truncate">Counters</div>
                  </div>
                </div>
              </div>

              {/* Floating Agreement Security Shield Top-Right */}
              <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-[#071A2B]/85 backdrop-blur-md border border-[#D7A83D]/60 text-xs font-bold text-white flex items-center gap-1.5 shadow-lg">
                <FileCheck2 className="w-3.5 h-3.5 text-[#D7A83D]" />
                <span>Protected Territory Agreements</span>
              </div>

              {/* Live Dispatch Indicator Top-Left */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-[#071A2B]/85 backdrop-blur-md border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-slate-200">National Corridor Hub</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Network3DSection;
