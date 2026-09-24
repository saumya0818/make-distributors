import React from 'react';
import { BrandOpportunity } from '../../types';
import { BrandLogo } from '../brand/BrandLogo';
import { ListingCover } from '../brand/ListingCover';
import {
  MapPin,
  Warehouse,
  ShieldCheck,
  Bookmark,
  Send,
  Eye,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface FeaturedBrandsSectionProps {
  opportunities: BrandOpportunity[];
  savedIds: string[];
  onToggleSave: (oppId: string) => void;
  onViewOpportunity: (slug: string) => void;
  onSendEnquiry: (opp: BrandOpportunity) => void;
  onViewAll: () => void;
}

export const FeaturedBrandsSection: React.FC<FeaturedBrandsSectionProps> = ({
  opportunities,
  savedIds,
  onToggleSave,
  onViewOpportunity,
  onSendEnquiry,
  onViewAll,
}) => {
  const featured = opportunities.filter((o) => o.isFeatured).slice(0, 6);

  return (
    <section className="bg-white py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#C78519] mb-1.5 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#D7A83D]" />
              <span>Verified Brand Opportunities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#071A2B]">
              Featured Brand Distributorship Opportunities
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              High-growth manufacturing brands seeking exclusive regional distributors, stockists, and C&F partners with guaranteed territorial rights.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#071A2B] hover:text-[#D7A83D] transition-colors group cursor-pointer"
          >
            <span>View All Opportunities</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((opp) => {
            const isSaved = savedIds.includes(opp.id);
            return (
              <div
                key={opp.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-[#D7A83D]/50 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Visual Cover Area */}
                <div className="relative">
                  <ListingCover
                    src={opp.coverImageUrl}
                    alt={`${opp.brandName} Distributorship`}
                    category={opp.category}
                    aspectRatio="video"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm">
                      {opp.businessType}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(opp.id);
                      }}
                      className={`p-1.5 rounded-full backdrop-blur-md shadow-sm transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-[#D7A83D] text-[#071A2B]'
                          : 'bg-black/40 text-white hover:bg-black/60'
                      }`}
                      aria-label={isSaved ? 'Remove from saved' : 'Save opportunity'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Brand Logo Floating Overlay */}
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

                {/* Card Body */}
                <div className="pt-8 px-5 pb-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Brand name & Verification */}
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

                    {/* Key Metrics */}
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
                        <div className="text-[10px] uppercase font-semibold text-slate-500">Est. Margin</div>
                        <div className="font-bold text-emerald-700 mt-0.5">
                          {opp.marginPercentage}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] uppercase font-semibold text-slate-500">Origin / Base</div>
                        <div className="font-bold text-[#071A2B] truncate mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{opp.city}, {opp.state}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
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
      </div>
    </section>
  );
};

export default FeaturedBrandsSection;
