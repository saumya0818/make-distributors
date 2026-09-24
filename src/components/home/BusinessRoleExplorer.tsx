import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Building2,
  Factory,
  Boxes,
  Truck,
  Layers,
} from 'lucide-react';

// 5 Dedicated Role Scene Illustrations
const RoleSceneIllustration: React.FC<{ role: string }> = ({ role }) => {
  switch (role) {
    case 'Brands':
      return (
        <svg className="w-full h-full" viewBox="0 0 200 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Packaging Box & Bottle & Brand Card */}
          <rect x="20" y="25" width="45" height="55" rx="4" fill="#F59E0B" fillOpacity="0.3" stroke="#FDE68A" strokeWidth="1.5" />
          <rect x="75" y="18" width="30" height="62" rx="6" fill="#D97706" fillOpacity="0.4" stroke="#FDE68A" strokeWidth="1.5" />
          <circle cx="90" cy="12" r="5" fill="#FDE68A" />
          <rect x="115" y="32" width="65" height="42" rx="4" fill="#78350F" stroke="#FBBF24" strokeWidth="1.5" />
          <line x1="125" y1="42" x2="160" y2="42" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" />
          <line x1="125" y1="52" x2="150" y2="52" stroke="#FEF3C7" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="165" cy="62" r="4" fill="#10B981" />
        </svg>
      );

    case 'Manufacturers':
      return (
        <svg className="w-full h-full" viewBox="0 0 200 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Production Line Conveyor + Factory Silhouette */}
          <path d="M15 75 H185" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="40" cy="80" r="5" fill="#0284C7" />
          <circle cx="80" cy="80" r="5" fill="#0284C7" />
          <circle cx="120" cy="80" r="5" fill="#0284C7" />
          <circle cx="160" cy="80" r="5" fill="#0284C7" />
          {/* Conveyor items */}
          <rect x="30" y="52" width="20" height="20" rx="3" fill="#0369A1" stroke="#BAE6FD" strokeWidth="1.5" />
          <rect x="70" y="52" width="20" height="20" rx="3" fill="#0369A1" stroke="#BAE6FD" strokeWidth="1.5" />
          <rect x="110" y="52" width="20" height="20" rx="3" fill="#0369A1" stroke="#BAE6FD" strokeWidth="1.5" />
          {/* Robotic QA Arm */}
          <path d="M150 20 L150 42 L130 50" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="130" cy="50" r="3" fill="#10B981" />
          {/* Factory Chimneys in background */}
          <path d="M25 45 L35 30 L45 30 L55 45" fill="#075985" fillOpacity="0.4" />
        </svg>
      );

    case 'Wholesalers':
      return (
        <svg className="w-full h-full" viewBox="0 0 200 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Tiered Pallet Racks & Cartons */}
          <line x1="25" y1="15" x2="25" y2="85" stroke="#34D399" strokeWidth="2.5" />
          <line x1="175" y1="15" x2="175" y2="85" stroke="#34D399" strokeWidth="2.5" />
          <line x1="25" y1="38" x2="175" y2="38" stroke="#059669" strokeWidth="2" />
          <line x1="25" y1="65" x2="175" y2="65" stroke="#059669" strokeWidth="2" />
          {/* Tier 1 Cartons */}
          <rect x="40" y="20" width="22" height="16" rx="2" fill="#065F46" stroke="#6EE7B7" strokeWidth="1" />
          <rect x="68" y="20" width="22" height="16" rx="2" fill="#065F46" stroke="#6EE7B7" strokeWidth="1" />
          <rect x="96" y="20" width="22" height="16" rx="2" fill="#065F46" stroke="#6EE7B7" strokeWidth="1" />
          {/* Tier 2 Cartons */}
          <rect x="45" y="47" width="26" height="16" rx="2" fill="#047857" stroke="#A7F3D0" strokeWidth="1" />
          <rect x="78" y="47" width="26" height="16" rx="2" fill="#047857" stroke="#A7F3D0" strokeWidth="1" />
          {/* Pallet Base on Ground */}
          <rect x="40" y="72" width="70" height="8" rx="1" fill="#78350F" />
        </svg>
      );

    case 'Suppliers':
      return (
        <svg className="w-full h-full" viewBox="0 0 200 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shipment Box & Document Invoice with Route */}
          <path d="M25 50 L60 32 L95 50 L60 68 Z" fill="#C2410C" stroke="#FED7AA" strokeWidth="1.5" />
          <path d="M25 50 L25 80 L60 92 L60 68 Z" fill="#9A3412" stroke="#FED7AA" strokeWidth="1.5" />
          <path d="M95 50 L95 80 L60 92 L60 68 Z" fill="#7C2D12" stroke="#FED7AA" strokeWidth="1.5" />
          {/* Formal Quotation Sheet */}
          <rect x="110" y="20" width="65" height="60" rx="4" fill="#FFFFFF" fillOpacity="0.9" stroke="#EA580C" strokeWidth="1.5" />
          <rect x="120" y="30" width="30" height="4" rx="2" fill="#EA580C" />
          <line x1="120" y1="40" x2="160" y2="40" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="120" y1="48" x2="155" y2="48" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="120" y1="56" x2="145" y2="56" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="158" cy="65" r="5" fill="#10B981" />
        </svg>
      );

    case 'Distributors':
    default:
      return (
        <svg className="w-full h-full" viewBox="0 0 200 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Route Delivery Van & Storefront Awning & Map Pin */}
          {/* Delivery Van */}
          <path d="M20 50 L55 50 L70 60 L70 78 L20 78 Z" fill="#6D28D9" stroke="#DDD6FE" strokeWidth="1.5" />
          <rect x="52" y="55" width="12" height="8" rx="1" fill="#DDD6FE" />
          <circle cx="32" cy="78" r="6" fill="#1E1B4B" stroke="#A78BFA" strokeWidth="1.5" />
          <circle cx="60" cy="78" r="6" fill="#1E1B4B" stroke="#A78BFA" strokeWidth="1.5" />
          {/* Storefront with Awning */}
          <path d="M120 45 L175 45 L165 58 L110 58 Z" fill="#7C3AED" stroke="#E9D5FF" strokeWidth="1.5" />
          <rect x="115" y="58" width="55" height="26" fill="#4C1D95" stroke="#E9D5FF" strokeWidth="1" />
          <rect x="135" y="66" width="15" height="18" fill="#DDD6FE" />
          {/* Territory Map Pin */}
          <circle cx="95" cy="28" r="8" fill="#EF4444" stroke="#FEE2E2" strokeWidth="1.5" />
          <circle cx="95" cy="28" r="3" fill="#FFFFFF" />
          <path d="M95 36 L95 48" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
        </svg>
      );
  }
};

interface BusinessRoleExplorerProps {
  onSelectRole: (role: string) => void;
}

const ROLES = [
  {
    role: 'Brands',
    title: 'Fast-Moving & Premium Brands',
    subtitle: 'Scale retail store presence across regional markets with vetted stocking distributors.',
    cta: 'List Your Brand',
    accent: '#D7A83D',
    gradient: 'from-amber-600 to-amber-950',
    icon: Sparkles,
    metrics: '85+ FMCG Product Lines',
  },
  {
    role: 'Manufacturers',
    title: 'Industrial & OEM Producers',
    subtitle: 'Appoint master stockists and bulk C&F agents to absorb high-volume factory production.',
    cta: 'Find Distribution Partners',
    accent: '#0284C7',
    gradient: 'from-sky-700 to-slate-950',
    icon: Factory,
    metrics: 'Full-Truckload Direct Dispatch',
  },
  {
    role: 'Wholesalers',
    title: 'Regional Supply Houses',
    subtitle: 'Aggregate high-turnover consumer & industrial products at competitive institutional tier margins.',
    cta: 'Reach New Markets',
    accent: '#16805C',
    gradient: 'from-emerald-700 to-teal-950',
    icon: Boxes,
    metrics: 'Multi-Category Warehousing',
  },
  {
    role: 'Suppliers',
    title: 'Packaging & Raw Material Suppliers',
    subtitle: 'Connect directly with consumer brands and manufacturers seeking reliable bulk input materials.',
    cta: 'Discover Buyers',
    accent: '#EA580C',
    gradient: 'from-orange-700 to-stone-950',
    icon: Layers,
    metrics: 'Standardized Grade Barcodes',
  },
  {
    role: 'Distributors',
    title: 'Frontline Route Stockists',
    subtitle: 'Secure exclusive regional franchise territories and expand your active retail store portfolio.',
    cta: 'Find Opportunities',
    accent: '#7C3AED',
    gradient: 'from-purple-700 to-slate-950',
    icon: Truck,
    metrics: 'Direct-Store Delivery (DSD)',
  },
];

export const BusinessRoleExplorer: React.FC<BusinessRoleExplorerProps> = ({ onSelectRole }) => {
  return (
    <section className="bg-[#F5F7FA] py-16 lg:py-24 border-b border-slate-200 text-[#102131]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#16805C] mb-1.5 flex items-center justify-center gap-1.5">
            <Building2 className="w-4 h-4 text-[#16805C]" />
            <span>Targeted Value Ecosystem</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#071A2B]">
            Who Can Grow With Make Distributors?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Tailored commercial workflows engineered specifically for each tier of the global distribution supply chain.
          </p>
        </div>

        {/* 5 Distinct Business Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {ROLES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.role}
                className="rounded-2xl border border-slate-200 bg-white hover:border-[#D7A83D] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                {/* Visual Header Banner */}
                <div className={`h-28 bg-gradient-to-br ${item.gradient} p-3 flex flex-col justify-between relative overflow-hidden`}>
                  {/* Thematic Role Scene Illustration */}
                  <div className="absolute inset-0 opacity-70 group-hover:opacity-90 transition-opacity">
                    <RoleSceneIllustration role={item.role} />
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs border border-white/20">
                      {item.role}
                    </span>
                    <div className="w-6 h-6 rounded-md bg-black/30 backdrop-blur-xs flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-white/90 bg-black/40 px-1.5 py-0.5 rounded w-fit relative z-10">
                    {item.metrics}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#071A2B] group-hover:text-[#D7A83D] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => onSelectRole(item.role.toLowerCase())}
                      className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-[#071A2B] hover:text-white text-[#071A2B] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{item.cta}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BusinessRoleExplorer;
