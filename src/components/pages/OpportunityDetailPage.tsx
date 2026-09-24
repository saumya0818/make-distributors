import React, { useState, useEffect } from 'react';
import { BrandOpportunity } from '../../types';
import { db } from '../../services/db';
import { BrandLogo } from '../brand/BrandLogo';
import { ListingCover } from '../brand/ListingCover';
import { SEOHelmet } from '../layout/SEOHelmet';
import {
  ShieldCheck,
  MapPin,
  Warehouse,
  TrendingUp,
  Clock,
  CheckCircle2,
  Share2,
  Bookmark,
  Send,
  Lock,
  ArrowLeft,
  ChevronRight,
  Copy,
  Check,
  Building2,
  AlertCircle,
} from 'lucide-react';

interface OpportunityDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (opp: BrandOpportunity) => void;
  onSelectSimilar: (slug: string) => void;
}

export const OpportunityDetailPage: React.FC<OpportunityDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenEnquiry,
  onSelectSimilar,
}) => {
  const [opp, setOpp] = useState<BrandOpportunity | undefined>(() => db.getOpportunityBySlug(slug));
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showProtectedPrompt, setShowProtectedPrompt] = useState(false);

  useEffect(() => {
    const current = db.getOpportunityBySlug(slug);
    setOpp(current);
    if (current) {
      db.addRecentlyViewed(current.id);
      setIsSaved(db.getSavedOpportunityIds().includes(current.id));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!opp) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-[#102131]">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-[#071A2B]">Opportunity Not Found</h2>
        <p className="text-sm text-slate-500 mt-1">This brand listing may have expired or been archived.</p>
        <button
          onClick={() => onNavigate('/opportunities')}
          className="mt-4 px-5 py-2 rounded-lg bg-[#071A2B] text-white text-xs font-bold"
        >
          Back to All Opportunities
        </button>
      </div>
    );
  }

  const handleToggleSave = () => {
    const state = db.toggleSaveOpportunity(opp.id);
    setIsSaved(state);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const allOpps = db.getOpportunities();
  const similarOpps = allOpps
    .filter((o) => o.id !== opp.id && (o.category === opp.category || o.businessType === opp.businessType))
    .slice(0, 3);

  return (
    <div className="bg-[#F5F7FA] min-h-screen pb-20 text-[#102131]">
      <SEOHelmet
        title={`${opp.brandName} Distributorship Opportunity | Make Distributors`}
        description={`Become an authorized ${opp.businessType} for ${opp.brandName} in ${opp.state}. Margin: ${opp.marginPercentage}. Space required: ${opp.spaceRequiredSqFt} sq.ft.`}
        schemaType="WebApplication"
        schemaData={{
          '@type': 'Product',
          name: `${opp.brandName} Distributorship`,
          description: opp.description,
          category: opp.category,
          brand: {
            '@type': 'Brand',
            name: opp.brandName,
          },
        }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => onNavigate('/')} className="hover:text-[#071A2B]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button onClick={() => onNavigate('/opportunities')} className="hover:text-[#071A2B]">
            Opportunities
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button onClick={() => onNavigate(`/categories?cat=${encodeURIComponent(opp.category)}`)} className="hover:text-[#071A2B]">
            {opp.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-[#071A2B] truncate">{opp.brandName}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('/opportunities')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#071A2B] mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Opportunities</span>
        </button>

        {/* Main Grid: Left Detailed Dossier / Right Action Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              {/* Cover Banner */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                <ListingCover
                  src={opp.coverImageUrl}
                  alt={opp.brandName}
                  category={opp.category}
                  aspectRatio="wide"
                  className="w-full h-full"
                />

                <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 backdrop-blur-md transition-colors text-xs flex items-center gap-1"
                    title="Copy Share Link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
                  </button>

                  <button
                    onClick={handleToggleSave}
                    className={`p-2 rounded-lg backdrop-blur-md shadow-sm transition-colors text-xs flex items-center gap-1 cursor-pointer ${
                      isSaved ? 'bg-[#D7A83D] text-[#071A2B]' : 'bg-black/50 text-white hover:bg-black/70'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              </div>

              {/* Brand Overview Row */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <BrandLogo
                      name={opp.brandName}
                      logoUrl={opp.logoUrl}
                      category={opp.category}
                      size="lg"
                      shape="rounded"
                      className="border-2 border-slate-100 shadow-sm shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {opp.category} · {opp.subcategory}
                        </span>
                        {opp.isVerified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Verified Brand</span>
                          </span>
                        )}
                      </div>

                      <h1 className="text-2xl sm:text-3xl font-black text-[#071A2B] mt-1 leading-tight">
                        {opp.brandName}
                      </h1>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        {opp.companyName} · Headquartered in {opp.city}, {opp.state}
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-[#071A2B] text-white">
                      {opp.businessType}
                    </span>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Listing Ref: #{opp.id.slice(0, 8)}
                    </div>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-100">
                  <div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Investment Required</div>
                    <div className="text-base font-bold text-[#071A2B] mt-0.5">
                      ${(opp.investmentMin / 1000).toFixed(0)}k - ${(opp.investmentMax / 1000).toFixed(0)}k {opp.currency}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Warehouse Space</div>
                    <div className="text-base font-bold text-[#071A2B] mt-0.5 flex items-center gap-1">
                      <Warehouse className="w-4 h-4 text-slate-400" />
                      <span>{opp.spaceRequiredSqFt.toLocaleString()} sq.ft</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Estimated Gross Margin</div>
                    <div className="text-base font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span>{opp.marginPercentage}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Expected Break-Even ROI</div>
                    <div className="text-base font-bold text-[#071A2B] mt-0.5 flex items-center gap-1">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{opp.roiMonths}</span>
                    </div>
                  </div>
                </div>

                {/* Narrative Summary */}
                <div className="pt-6 space-y-4">
                  <h2 className="text-base font-bold text-[#071A2B]">Opportunity Brief</h2>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {opp.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Product Lines & Benefits */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#071A2B] mb-3">
                  Authorized Product Lines & SKUs
                </h3>
                <div className="flex flex-wrap gap-2">
                  {opp.productLine.map((prod, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-3 py-1.5 bg-[#F5F7FA] border border-slate-200 rounded-lg text-[#071A2B]"
                    >
                      {prod}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#071A2B] mb-3">
                  Distributor Benefits & Support Package
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {opp.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#071A2B] mb-3">
                  Candidate Distributor Requirements
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {opp.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D7A83D] shrink-0 mt-1.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#071A2B] mb-3">
                  Available Target Territories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {opp.territoriesAvailable.map((territory, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-md flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3 text-amber-700" />
                      <span>{territory}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column (4 Cols): CTA, Contact Security, Similar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Primary Action Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-4">
              <h3 className="text-base font-bold text-[#071A2B]">Apply for Territory Rights</h3>
              <p className="text-xs text-slate-600">
                Directly connect with the brand’s commercial channel director to reserve your regional exclusivity.
              </p>

              <button
                onClick={() => onOpenEnquiry(opp)}
                className="w-full py-3 bg-[#D7A83D] hover:bg-[#C29632] text-[#071A2B] font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Send Direct Enquiry</span>
              </button>

              {/* Protected Phone / Email trigger */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => setShowProtectedPrompt(!showProtectedPrompt)}
                  className="w-full py-2.5 px-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Request Direct Phone / Contact</span>
                </button>

                {showProtectedPrompt && (
                  <div className="mt-3 p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 space-y-2 animate-in fade-in duration-150">
                    <div className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Verified Contact Policy</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-emerald-800">
                      To protect brands from automated spam and unvetted inquiries, phone numbers and direct email lines are released upon sending a qualified initial enquiry or partner request.
                    </p>
                    <button
                      onClick={() => onOpenEnquiry(opp)}
                      className="text-xs font-bold text-[#071A2B] underline"
                    >
                      Send Enquiry to Unlock Direct Call
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Similar Opportunities */}
            {similarOpps.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Similar Brand Opportunities
                </h3>
                <div className="space-y-3">
                  {similarOpps.map((sim) => (
                    <button
                      key={sim.id}
                      onClick={() => onSelectSimilar(sim.slug)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all flex items-start gap-3 group cursor-pointer"
                    >
                      <BrandLogo
                        name={sim.brandName}
                        logoUrl={sim.logoUrl}
                        category={sim.category}
                        size="sm"
                        className="shrink-0 mt-0.5"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-[#071A2B] group-hover:text-[#D7A83D] truncate">
                          {sim.brandName}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {sim.category} · ${(sim.investmentMin / 1000).toFixed(0)}k+
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetailPage;
