import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface FinalCTASectionProps {
  onPostRequirement: () => void;
  onCreateProfile: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  onPostRequirement,
  onCreateProfile,
}) => {
  return (
    <section className="relative bg-gradient-to-b from-[#E0F2FE] via-[#F0F9FF] to-[#DDF0FD] text-[#071A2B] py-20 lg:py-28 overflow-hidden border-t-2 border-[#BAE6FD]">
      {/* Background Graphic & Subtle Vector Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ctaGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#D7A83D" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctaGlow)" />
          {/* Subtle grid pattern */}
          <path d="M0 100 H800 M0 200 H800 M0 300 H800" stroke="#0284C7" strokeWidth="0.5" strokeDasharray="6 8" strokeOpacity="0.3" />
          <path d="M200 0 V400 M400 0 V400 M600 0 V400" stroke="#0284C7" strokeWidth="0.5" strokeDasharray="6 8" strokeOpacity="0.3" />
          <circle cx="200" cy="100" r="3" fill="#D7A83D" />
          <circle cx="400" cy="200" r="4" fill="#38BDF8" />
          <circle cx="600" cy="300" r="3" fill="#D7A83D" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#D7A83D]/60 text-xs font-bold text-[#92400E] shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#D7A83D]" />
          <span>Vetted Expansion Platform</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#071A2B] leading-tight">
          Ready to Build Stronger{' '}
          <span className="bg-gradient-to-r from-[#B45309] via-[#D7A83D] to-[#F59E0B] bg-clip-text text-transparent">
            Distribution Partnerships?
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Whether you are a manufacturing brand seeking territory coverage or an established stockist expanding your SKU portfolio, Make Distributors is your growth network.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onPostRequirement}
            className="px-8 py-3.5 rounded-xl bg-[#D7A83D] hover:bg-[#C29632] text-[#071A2B] font-bold text-sm sm:text-base shadow-xl hover:shadow-[#D7A83D]/30 transition-all flex items-center gap-2 cursor-pointer active:scale-98 border border-[#FDE68A]"
          >
            <span>Post Your Requirement</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onCreateProfile}
            className="px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#071A2B] border border-[#BAE6FD] hover:border-[#D7A83D] font-bold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Create Your Profile</span>
          </button>
        </div>

        <div className="pt-6 text-xs text-slate-500 font-medium">
          No credit card required · Free initial requirement listing · Rigorous enterprise privacy
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
