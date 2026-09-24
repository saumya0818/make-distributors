import React, { useState, useEffect, useRef } from 'react';
import { BrandOpportunity, Category, DistributorProfile, ResourceArticle } from '../../types';
import { Search, X, Building2, Warehouse, Grid, BookOpen, ArrowRight } from 'lucide-react';

interface GlobalCommandSearchProps {
  isOpen: boolean;
  onClose: () => void;
  opportunities: BrandOpportunity[];
  categories: Category[];
  distributors: DistributorProfile[];
  resources: ResourceArticle[];
  onSelectOpportunity: (slug: string) => void;
  onSelectCategory: (slug: string) => void;
  onSelectDistributor: (slug: string) => void;
  onSelectResource: (slug: string) => void;
}

export const GlobalCommandSearch: React.FC<GlobalCommandSearchProps> = ({
  isOpen,
  onClose,
  opportunities,
  categories,
  distributors,
  resources,
  onSelectOpportunity,
  onSelectCategory,
  onSelectDistributor,
  onSelectResource,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K and Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  // Filtered results
  const filteredOpps = cleanQ
    ? opportunities.filter(
        (o) =>
          o.brandName.toLowerCase().includes(cleanQ) ||
          o.title.toLowerCase().includes(cleanQ) ||
          o.category.toLowerCase().includes(cleanQ) ||
          o.productLine.some((p) => p.toLowerCase().includes(cleanQ))
      ).slice(0, 4)
    : opportunities.slice(0, 3);

  const filteredCats = cleanQ
    ? categories.filter(
        (c) =>
          c.name.toLowerCase().includes(cleanQ) ||
          c.description.toLowerCase().includes(cleanQ) ||
          c.subcategories.some((s) => s.toLowerCase().includes(cleanQ))
      ).slice(0, 3)
    : categories.slice(0, 3);

  const filteredDists = cleanQ
    ? distributors.filter(
        (d) =>
          d.companyName.toLowerCase().includes(cleanQ) ||
          d.name.toLowerCase().includes(cleanQ) ||
          d.city.toLowerCase().includes(cleanQ) ||
          d.state.toLowerCase().includes(cleanQ) ||
          d.categories.some((c) => c.toLowerCase().includes(cleanQ))
      ).slice(0, 3)
    : distributors.slice(0, 2);

  const filteredArticles = cleanQ
    ? resources.filter(
        (r) =>
          r.title.toLowerCase().includes(cleanQ) ||
          r.summary.toLowerCase().includes(cleanQ) ||
          r.category.toLowerCase().includes(cleanQ)
      ).slice(0, 2)
    : [];

  const totalResults =
    filteredOpps.length + filteredCats.length + filteredDists.length + filteredArticles.length;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] text-[#102131]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Global Search"
      >
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-[#D7A83D] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brand listings, distributor profiles, sectors, and trade guides..."
            className="w-full pl-3 pr-2 text-sm bg-transparent text-[#071A2B] placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-5">
          {totalResults === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No matching records found for "{query}". Try searching by category like "Food", "Lubricants", or "Electrical".
            </div>
          ) : (
            <>
              {/* Brand Opportunities */}
              {filteredOpps.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#D7A83D]" />
                    <span>Brand Opportunities</span>
                  </div>
                  <div className="space-y-1">
                    {filteredOpps.map((opp) => (
                      <button
                        key={opp.id}
                        onClick={() => {
                          onSelectOpportunity(opp.slug);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-bold text-[#071A2B] group-hover:text-[#D7A83D] transition-colors truncate">
                            {opp.brandName}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {opp.category} · {opp.city}, {opp.state} · ${opp.investmentMin / 1000}k - ${opp.investmentMax / 1000}k
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#071A2B] transition-transform group-hover:translate-x-1 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              {filteredCats.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Grid className="w-3.5 h-3.5 text-sky-600" />
                    <span>Industry Sectors</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {filteredCats.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.slug);
                          onClose();
                        }}
                        className="text-left p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200/80 cursor-pointer"
                      >
                        <div className="text-xs font-bold text-[#071A2B] truncate">{cat.name}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{cat.opportunityCount} Listings</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Distributor Leads */}
              {filteredDists.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Warehouse className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Distributor Leads</span>
                  </div>
                  <div className="space-y-1">
                    {filteredDists.map((dist) => (
                      <button
                        key={dist.id}
                        onClick={() => {
                          onSelectDistributor(dist.slug);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-bold text-[#071A2B] group-hover:text-[#D7A83D] transition-colors truncate">
                            {dist.companyName}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {dist.businessType} · {dist.city}, {dist.state} · {dist.warehouseCapacitySqFt.toLocaleString()} sq.ft
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#071A2B] transition-transform group-hover:translate-x-1 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              {filteredArticles.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                    <span>Trade Guides</span>
                  </div>
                  <div className="space-y-1">
                    {filteredArticles.map((art) => (
                      <button
                        key={art.id}
                        onClick={() => {
                          onSelectResource(art.slug);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div className="text-xs font-semibold text-[#071A2B] group-hover:text-[#D7A83D] truncate">
                          {art.title}
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>
              Press <kbd className="px-1 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Esc</kbd> to exit
            </span>
            <span>Private phone numbers and contact emails remain hidden in search previews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalCommandSearch;
