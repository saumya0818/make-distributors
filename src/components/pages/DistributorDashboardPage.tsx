import React from 'react';
import { db } from '../../services/db';
import { authService } from '../../services/auth';
import { SEOHelmet } from '../layout/SEOHelmet';
import { Warehouse, Briefcase, Bookmark, Send, ShieldCheck, Truck, Store } from 'lucide-react';

interface DistributorDashboardPageProps {
  onNavigate: (path: string) => void;
  onViewOpportunity: (slug: string) => void;
}

export const DistributorDashboardPage: React.FC<DistributorDashboardPageProps> = ({
  onNavigate,
  onViewOpportunity,
}) => {
  const currentUser = authService.getCurrentUser();
  const savedIds = db.getSavedOpportunityIds();
  const allOpps = db.getOpportunities();
  const savedOpps = allOpps.filter((o) => savedIds.includes(o.id));
  const sentEnquiries = db.getEnquiries(currentUser?.id);

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-10 text-[#102131]">
      <SEOHelmet title="Distributor Partner Portal | Make Distributors" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#071A2B] text-white flex items-center justify-center font-bold text-xl shadow-xs">
              <Warehouse className="w-7 h-7 text-[#D7A83D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Stockist & Distributor Portal
                </span>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Verified Credentials</span>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#071A2B] mt-0.5">
                {currentUser?.companyName || 'Pinnacle Trade Networks LLC'}
              </h1>
              <div className="text-xs text-slate-500">
                Partner Lead: {currentUser?.fullName || 'Marcus Vance'} · {currentUser?.city || 'Los Angeles'}, {currentUser?.state || 'California'}
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('/opportunities')}
            className="px-4 py-2.5 bg-[#071A2B] hover:bg-[#D7A83D] hover:text-[#071A2B] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Explore Brand Opportunities
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-400 uppercase font-semibold">Warehouse Space</div>
            <div className="text-xl font-bold text-[#071A2B] mt-1 flex items-center gap-1.5">
              <Warehouse className="w-5 h-5 text-slate-400" />
              <span>18,000 sq.ft</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-400 uppercase font-semibold">Delivery Fleet</div>
            <div className="text-xl font-bold text-[#071A2B] mt-1 flex items-center gap-1.5">
              <Truck className="w-5 h-5 text-slate-400" />
              <span>8 Scheduled Trucks</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-400 uppercase font-semibold">Saved Opportunities</div>
            <div className="text-xl font-bold text-[#071A2B] mt-1 flex items-center gap-1.5">
              <Bookmark className="w-5 h-5 text-[#D7A83D]" />
              <span>{savedOpps.length} Bookmarks</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-400 uppercase font-semibold">Active Inquiries</div>
            <div className="text-xl font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
              <Send className="w-5 h-5 text-emerald-600" />
              <span>{sentEnquiries.length} Transmitted</span>
            </div>
          </div>
        </div>

        {/* Saved Opportunities Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-base font-bold text-[#071A2B] mb-4 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#D7A83D]" />
            <span>Saved Distributorship Opportunities</span>
          </h2>

          {savedOpps.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No saved opportunities yet. Browse our directory and bookmark opportunities to review them here.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savedOpps.map((opp) => (
                <div
                  key={opp.id}
                  onClick={() => onViewOpportunity(opp.slug)}
                  className="p-4 rounded-xl border border-slate-200 hover:border-[#D7A83D] transition-colors cursor-pointer bg-slate-50 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {opp.category}
                    </span>
                    <h3 className="font-bold text-[#071A2B] text-sm mt-1">{opp.brandName}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1">{opp.title}</p>
                  </div>
                  <div className="mt-4 pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>Margin: {opp.marginPercentage}</span>
                    <span className="text-[#071A2B] hover:underline">View</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DistributorDashboardPage;
