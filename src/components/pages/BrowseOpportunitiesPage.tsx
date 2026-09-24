import React, { useState, useMemo } from 'react';
import { BrandOpportunity } from '../../types';
import { CATEGORIES_DATA } from '../../data/categories';
import { BrandLogo } from '../brand/BrandLogo';
import { ListingCover } from '../brand/ListingCover';
import { SEOHelmet } from '../layout/SEOHelmet';
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Warehouse,
  ShieldCheck,
  Bookmark,
  Send,
  Eye,
  Plus,
  Bell,
  TrendingUp,
} from 'lucide-react';

interface BrowseOpportunitiesPageProps {
  opportunities: BrandOpportunity[];
  savedIds: string[];
  comparedIds: string[];
  onToggleSave: (oppId: string) => void;
  onToggleCompare: (opp: BrandOpportunity) => void;
  onViewOpportunity: (slug: string) => void;
  onSendEnquiry: (opp: BrandOpportunity) => void;
  initialCategory?: string;
  initialQuery?: string;
  initialState?: string;
  initialInvestment?: string;
}

export const BrowseOpportunitiesPage: React.FC<BrowseOpportunitiesPageProps> = ({
  opportunities,
  savedIds,
  comparedIds,
  onToggleSave,
  onToggleCompare,
  onViewOpportunity,
  onSendEnquiry,
  initialCategory = '',
  initialQuery = '',
  initialState = '',
  initialInvestment = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBusinessType, setSelectedBusinessType] = useState('');
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedInvestmentRange, setSelectedInvestmentRange] = useState(initialInvestment);
  const [sortBy, setSortBy] = useState<'newest' | 'investment_asc' | 'investment_desc' | 'margin' | 'views'>('newest');
  const [savedAlertCreated, setSavedAlertCreated] = useState(false);

  // States list from data
  const availableStates = useMemo(() => {
    const set = new Set<string>();
    opportunities.forEach((o) => set.add(o.state));
    return Array.from(set).sort();
  }, [opportunities]);

  const businessTypes = ['Distributor', 'Super Stockist', 'C&F Agent', 'Franchise', 'Wholesaler'];

  // Filter & Sort computation
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      // Keyword
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesQ =
          opp.brandName.toLowerCase().includes(q) ||
          opp.title.toLowerCase().includes(q) ||
          opp.productLine.some((p) => p.toLowerCase().includes(q)) ||
          opp.description.toLowerCase().includes(q);
        if (!matchesQ) return false;
      }

      // Category
      if (selectedCategory && opp.category !== selectedCategory) {
        return false;
      }

      // Business Type
      if (selectedBusinessType && opp.businessType !== selectedBusinessType) {
        return false;
      }

      // State
      if (selectedState && opp.state !== selectedState) {
        return false;
      }

      // Investment Range
      if (selectedInvestmentRange) {
        if (selectedInvestmentRange === 'Under $25,000' && opp.investmentMin >= 25000) return false;
        if (selectedInvestmentRange === '$25,000 - $50,000' && (opp.investmentMax < 25000 || opp.investmentMin > 50000)) return false;
        if (selectedInvestmentRange === '$50,000 - $100,000' && (opp.investmentMax < 50000 || opp.investmentMin > 100000)) return false;
        if (selectedInvestmentRange === '$100,000+' && opp.investmentMax < 100000) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'investment_asc') return a.investmentMin - b.investmentMin;
      if (sortBy === 'investment_desc') return b.investmentMax - a.investmentMax;
      if (sortBy === 'views') return b.viewsCount - a.viewsCount;
      if (sortBy === 'margin') return parseInt(b.marginPercentage) - parseInt(a.marginPercentage);
      // Newest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [
    opportunities,
    query,
    selectedCategory,
    selectedBusinessType,
    selectedState,
    selectedInvestmentRange,
    sortBy,
  ]);

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    (selectedBusinessType ? 1 : 0) +
    (selectedState ? 1 : 0) +
    (selectedInvestmentRange ? 1 : 0) +
    (query ? 1 : 0);

  const resetAllFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setSelectedBusinessType('');
    setSelectedState('');
    setSelectedInvestmentRange('');
  };

  const handleSaveAlert = () => {
    setSavedAlertCreated(true);
    setTimeout(() => setSavedAlertCreated(false), 3000);
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-10 text-[#102131]">
      <SEOHelmet
        title="Browse Distributorship Opportunities | Make Distributors"
        description="Explore verified brand distribution opportunities across 12 sectors with real warehouse and investment parameters."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#C78519] mb-1.5 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#D7A83D]" />
              <span>Commercial Pipeline</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#071A2B]">
              Browse Distributorship Opportunities
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Direct manufacturer territories available for licensed regional distributors, super stockists, and wholesale partners.
            </p>
          </div>

          {/* Save Search Alert CTA */}
          <div>
            <button
              onClick={handleSaveAlert}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:text-[#071A2B] hover:border-slate-400 transition-colors shadow-xs cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-[#D7A83D]" />
              <span>{savedAlertCreated ? 'Search Alert Saved!' : 'Save Search Alert'}</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs mb-8 space-y-4">
          {/* Main search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by brand name, product line, SKU, or keywords (e.g. Organic, Lubricants, Apparel)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-[#D7A83D] focus:outline-none"
            />
          </div>

          {/* Select Dropdowns Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Category */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Category
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

            {/* Business Type */}
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
                {businessTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* State Location */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                State / Location
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

            {/* Investment Range */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Investment Capital
              </label>
              <select
                value={selectedInvestmentRange}
                onChange={(e) => setSelectedInvestmentRange(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#D7A83D] cursor-pointer"
              >
                <option value="">Any Capital Level</option>
                <option value="Under $25,000">Under $25,000</option>
                <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                <option value="$100,000+">$100,000+</option>
              </select>
            </div>
          </div>

          {/* Filter Status & Sort Header */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-[#071A2B]">
                {filteredOpportunities.length} opportunities found
              </span>

              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="text-red-600 hover:underline flex items-center gap-1 font-semibold ml-2 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset filters ({activeFiltersCount})</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-semibold uppercase text-[10px]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#D7A83D] cursor-pointer"
              >
                <option value="newest">Newest Listed</option>
                <option value="investment_asc">Investment: Low to High</option>
                <option value="investment_desc">Investment: High to Low</option>
                <option value="margin">Highest Margin %</option>
                <option value="views">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-[#071A2B]">No matching opportunities found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your category filter, expanding your investment range, or searching for broader keywords.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-2 px-4 py-2 bg-[#071A2B] text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp) => {
              const isSaved = savedIds.includes(opp.id);
              const isCompared = comparedIds.includes(opp.id);
              return (
                <div
                  key={opp.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-[#D7A83D]/50 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="relative">
                    <ListingCover
                      src={opp.coverImageUrl}
                      alt={opp.brandName}
                      category={opp.category}
                      aspectRatio="video"
                    />

                    {/* Top badging & save button */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md shadow-xs">
                        {opp.businessType}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {/* Compare toggle button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleCompare(opp);
                          }}
                          className={`px-2 py-1 rounded-md text-[10px] font-bold backdrop-blur-md transition-colors cursor-pointer ${
                            isCompared
                              ? 'bg-[#071A2B] text-[#F2D27B]'
                              : 'bg-black/50 text-white hover:bg-black/70'
                          }`}
                          title="Compare up to 3 opportunities"
                        >
                          {isCompared ? 'Compared' : '+ Compare'}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSave(opp.id);
                          }}
                          className={`p-1.5 rounded-full backdrop-blur-md shadow-xs transition-colors cursor-pointer ${
                            isSaved ? 'bg-[#D7A83D] text-[#071A2B]' : 'bg-black/50 text-white hover:bg-black/70'
                          }`}
                          aria-label={isSaved ? 'Unsave' : 'Save'}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <div className="absolute -bottom-6 left-5 z-20">
                      <BrandLogo
                        name={opp.brandName}
                        logoUrl={opp.logoUrl}
                        category={opp.category}
                        size="md"
                        shape="rounded"
                        className="border-2 border-white shadow-md"
                      />
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="pt-8 px-5 pb-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          {opp.category}
                        </span>
                        {opp.isVerified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Verified</span>
                          </span>
                        )}
                      </div>

                      <h3
                        onClick={() => onViewOpportunity(opp.slug)}
                        className="text-base font-bold text-[#071A2B] group-hover:text-[#D7A83D] transition-colors leading-snug line-clamp-1 cursor-pointer"
                      >
                        {opp.brandName}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {opp.title}
                      </p>

                      {/* Metrics */}
                      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2.5 text-xs">
                        <div>
                          <div className="text-[10px] uppercase font-semibold text-slate-500">Investment</div>
                          <div className="font-bold text-[#071A2B] tabular-nums mt-0.5">
                            ${(opp.investmentMin / 1000).toFixed(0)}k - ${(opp.investmentMax / 1000).toFixed(0)}k
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] uppercase font-semibold text-slate-500">Space Req.</div>
                          <div className="font-bold text-[#071A2B] tabular-nums mt-0.5 flex items-center gap-1">
                            <Warehouse className="w-3 h-3 text-slate-400" />
                            <span>{opp.spaceRequiredSqFt} sq.ft</span>
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] uppercase font-semibold text-slate-500">Gross Margin</div>
                          <div className="font-bold text-emerald-700 mt-0.5">
                            {opp.marginPercentage}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] uppercase font-semibold text-slate-500">Territory Base</div>
                          <div className="font-bold text-[#071A2B] truncate mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{opp.city}, {opp.state}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onViewOpportunity(opp.slug)}
                        className="text-xs font-semibold text-[#071A2B] hover:text-[#D7A83D] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>

                      <button
                        onClick={() => onSendEnquiry(opp)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#071A2B] hover:bg-[#D7A83D] hover:text-[#071A2B] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Send className="w-3 h-3" />
                        <span>Send Enquiry</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseOpportunitiesPage;
