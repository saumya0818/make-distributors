import React, { useState } from 'react';
import { Search, MapPin, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';
import { CATEGORIES_DATA } from '../../data/categories';
import { Continuous3DOrbitCarousel } from './Continuous3DOrbitCarousel';

interface HeroSectionProps {
  onSearch: (params: { query?: string; category?: string; state?: string; investment?: string }) => void;
  onNavigate: (path: string) => void;
}

const US_STATES = [
  'All Locations',
  'California',
  'Texas',
  'New York',
  'Florida',
  'Illinois',
  'Georgia',
  'North Carolina',
  'Michigan',
  'Ohio',
  'Pennsylvania',
  'Washington',
];

const INVESTMENT_RANGES = [
  'Any Investment',
  'Under $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000+',
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [state, setState] = useState('');
  const [investment, setInvestment] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query, category, state, investment });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#E0F2FE] via-[#F0F9FF] to-[#DDF0FD] text-[#071A2B] pt-10 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Architectural Grid Pattern & Golden Ambient Radial Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D7A83D" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>

      {/* Golden halo lighting bloom from top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#D7A83D]/25 via-[#38BDF8]/15 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Subtle Editorial Trust Marker */}
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#92400E] bg-white/90 px-4 py-1.5 rounded-full border border-[#D7A83D]/60 backdrop-blur-md shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#D7A83D]" />
          <span>Verified Enterprise Distribution Marketplace</span>
          <span className="text-slate-400" aria-hidden="true">·</span>
          <span className="text-slate-600">100% Privacy-Preserving</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#071A2B] leading-[1.12] max-w-4xl mx-auto text-balance">
          Find the Right Partners to Grow Your{' '}
          <span className="bg-gradient-to-r from-[#B45309] via-[#D7A83D] to-[#F59E0B] bg-clip-text text-transparent">
            Distribution Business.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Connect brands, manufacturers, wholesalers, suppliers, and distributors through one trusted business network.
        </p>

        {/* TOP CENTER: 3D MOVING 5 IMAGES CONTINUOUSLY MOVING IN 3D */}
        <div className="w-full my-6">
          <Continuous3DOrbitCarousel onNavigate={onNavigate} />
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <button
            onClick={() => onNavigate('/distributors')}
            className="px-7 py-3.5 rounded-xl bg-[#D7A83D] hover:bg-[#C29632] text-[#071A2B] font-bold text-sm sm:text-base shadow-xl hover:shadow-[#D7A83D]/30 transition-all flex items-center gap-2 cursor-pointer active:scale-98 border border-[#FDE68A]"
          >
            <span>Find Distributors</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('/opportunities')}
            className="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#071A2B] border border-[#BAE6FD] hover:border-[#D7A83D] font-bold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Explore Opportunities</span>
          </button>
        </div>

        {/* Quick Search Panel */}
        <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-[#BAE6FD]">
          <form
            onSubmit={handleSearchSubmit}
            className="p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-[#BAE6FD] shadow-2xl space-y-3.5 text-left"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Category select */}
              <div className="relative">
                <label htmlFor="hero-cat" className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  id="hero-cat"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#F0F9FF] text-[#071A2B] text-xs sm:text-sm rounded-lg px-3 py-2.5 border border-[#BAE6FD] focus:border-[#D7A83D] focus:outline-none appearance-none cursor-pointer font-medium"
                >
                  <option value="">All Categories (12 Sectors)</option>
                  {CATEGORIES_DATA.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* State select */}
              <div className="relative">
                <label htmlFor="hero-state" className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target State / Territory
                </label>
                <div className="relative">
                  <select
                    id="hero-state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-[#F0F9FF] text-[#071A2B] text-xs sm:text-sm rounded-lg px-3 py-2.5 border border-[#BAE6FD] focus:border-[#D7A83D] focus:outline-none appearance-none cursor-pointer pl-8 font-medium"
                  >
                    {US_STATES.map((s) => (
                      <option key={s} value={s === 'All Locations' ? '' : s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <MapPin className="w-3.5 h-3.5 text-[#D7A83D] absolute left-2.5 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Investment Range */}
              <div className="relative">
                <label htmlFor="hero-inv" className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Investment Range
                </label>
                <div className="relative">
                  <select
                    id="hero-inv"
                    value={investment}
                    onChange={(e) => setInvestment(e.target.value)}
                    className="w-full bg-[#F0F9FF] text-[#071A2B] text-xs sm:text-sm rounded-lg px-3 py-2.5 border border-[#BAE6FD] focus:border-[#D7A83D] focus:outline-none appearance-none cursor-pointer pl-8 font-medium"
                  >
                    {INVESTMENT_RANGES.map((r) => (
                      <option key={r} value={r === 'Any Investment' ? '' : r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <DollarSign className="w-3.5 h-3.5 text-[#D7A83D] absolute left-2.5 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Keyword search & submit button */}
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search product line, brand name, or SKU (e.g. Organic staples, Engine oils)..."
                  className="w-full bg-[#F0F9FF] text-[#071A2B] text-xs sm:text-sm rounded-lg px-3 py-2.5 pl-9 border border-[#BAE6FD] focus:border-[#D7A83D] focus:outline-none font-medium placeholder-slate-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#D7A83D] hover:bg-[#C29632] text-[#071A2B] font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-sm border border-[#FDE68A]"
              >
                <Search className="w-4 h-4" />
                <span>Search Network</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
