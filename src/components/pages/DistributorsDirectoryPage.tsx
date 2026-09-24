import React, { useState, useMemo } from 'react';
import { DistributorProfile } from '../../types';
import { CATEGORIES_DATA } from '../../data/categories';
import { SEOHelmet } from '../layout/SEOHelmet';
import {
  Search,
  Warehouse,
  Briefcase,
  MapPin,
  ShieldCheck,
  Send,
  Eye,
  Lock,
  X,
  Truck,
} from 'lucide-react';

interface DistributorsDirectoryPageProps {
  distributors: DistributorProfile[];
  onViewProfile: (slug: string) => void;
  onSendEnquiry: (dist: DistributorProfile) => void;
  initialRole?: string;
}

export const DistributorsDirectoryPage: React.FC<DistributorsDirectoryPageProps> = ({
  distributors,
  onViewProfile,
  onSendEnquiry,
  initialRole = '',
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedBusinessType, setSelectedBusinessType] = useState(
    initialRole ? (initialRole.toLowerCase() === 'wholesaler' ? 'Wholesaler' : 'Distributor') : ''
  );

  const availableStates = useMemo(() => {
    const set = new Set<string>();
    distributors.forEach((d) => set.add(d.state));
    return Array.from(set).sort();
  }, [distributors]);

  const filteredDistributors = useMemo(() => {
    return distributors.filter((d) => {
      if (query.trim()) {
        const q = query.toLowerCase();
        const match =
          d.companyName.toLowerCase().includes(q) ||
          d.name.toLowerCase().includes(q) ||
          d.about.toLowerCase().includes(q) ||
          d.categories.some((c) => c.toLowerCase().includes(q));
        if (!match) return false;
      }

      if (selectedCategory && !d.categories.includes(selectedCategory)) {
        return false;
      }

      if (selectedBusinessType && d.businessType !== selectedBusinessType) {
        return false;
      }

      if (selectedState && d.state !== selectedState) {
        return false;
      }

      return true;
    });
  }, [distributors, query, selectedCategory, selectedBusinessType, selectedState]);

  const resetFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setSelectedState('');
    setSelectedBusinessType('');
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-10 text-[#102131]">
      <SEOHelmet
        title="Find Verified Distributors & Stockists | Make Distributors"
        description="Search vetted regional distributors, wholesale houses, and stockists with verified warehouse capacities."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#16805C] mb-1.5 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#16805C]" />
            <span>Commercial Channel Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#071A2B]">
            Find Verified Regional Distributors & Stockists
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Connect with pre-vetted wholesale partners equipped with route delivery vehicles, warehouse square footage, and direct retail reach.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs mb-8 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by company name, category, or city (e.g. Apex, Food, Los Angeles)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#D7A83D] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Category Handled
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#D7A83D] cursor-pointer"
              >
                <option value="">All Categories</option>
                {CATEGORIES_DATA.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Business Type
              </label>
              <select
                value={selectedBusinessType}
                onChange={(e) => setSelectedBusinessType(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#D7A83D] cursor-pointer"
              >
                <option value="">All Business Types</option>
                <option value="Distributor">Distributor</option>
                <option value="Wholesaler">Wholesaler</option>
                <option value="Stockist">Stockist</option>
                <option value="Dealer">Dealer</option>
                <option value="Importer">Importer</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Operating State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#D7A83D] cursor-pointer"
              >
                <option value="">All States</option>
                {availableStates.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="font-bold text-[#071A2B]">
              {filteredDistributors.length} verified distributors found
            </span>

            {(selectedCategory || selectedBusinessType || selectedState || query) && (
              <button
                onClick={resetFilters}
                className="text-red-600 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDistributors.map((dist) => (
            <div
              key={dist.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-[#D7A83D]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                    {dist.businessType}
                  </span>

                  {dist.isVerified && (
                    <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Lead</span>
                    </div>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#071A2B] group-hover:text-[#D7A83D] transition-colors leading-snug line-clamp-1">
                  {dist.companyName}
                </h3>
                <div className="text-xs text-slate-500 mt-0.5">{dist.name}</div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {dist.categories.map((c) => (
                    <span key={c} className="text-[11px] font-medium text-slate-600 bg-[#F5F7FA] px-2 py-0.5 rounded">
                      {c}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase font-semibold">Capital Capacity</div>
                    <div className="font-bold text-[#071A2B] tabular-nums mt-0.5">
                      ${(dist.investmentMin / 1000).toFixed(0)}k - ${(dist.investmentMax / 1000).toFixed(0)}k
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-500 text-[10px] uppercase font-semibold">Warehouse Space</div>
                    <div className="font-bold text-[#071A2B] tabular-nums mt-0.5 flex items-center gap-1">
                      <Warehouse className="w-3 h-3 text-slate-400" />
                      <span>{dist.warehouseCapacitySqFt.toLocaleString()} sq.ft</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-500 text-[10px] uppercase font-semibold">Experience</div>
                    <div className="font-bold text-[#071A2B] tabular-nums mt-0.5 flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-slate-400" />
                      <span>{dist.yearsExperience} Years</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-500 text-[10px] uppercase font-semibold">Location</div>
                    <div className="font-bold text-[#071A2B] truncate mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{dist.city}, {dist.state}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span>Phone & Email Protected</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Vetted Entity</span>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onViewProfile(dist.slug)}
                  className="text-xs font-semibold text-[#071A2B] hover:text-[#D7A83D] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Profile</span>
                </button>

                <button
                  onClick={() => onSendEnquiry(dist)}
                  className="px-3 py-1.5 rounded-lg bg-[#071A2B] hover:bg-[#D7A83D] hover:text-[#071A2B] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Send Enquiry</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DistributorsDirectoryPage;
