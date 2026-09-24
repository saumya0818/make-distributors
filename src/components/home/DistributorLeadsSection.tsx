import React from 'react';
import { DistributorProfile } from '../../types';
import {
  MapPin,
  Warehouse,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  Send,
  Eye,
  Lock,
} from 'lucide-react';

interface DistributorLeadsSectionProps {
  distributors: DistributorProfile[];
  onViewProfile: (slug: string) => void;
  onSendEnquiry: (distributor: DistributorProfile) => void;
  onViewAll: () => void;
}

export const DistributorLeadsSection: React.FC<DistributorLeadsSectionProps> = ({
  distributors,
  onViewProfile,
  onSendEnquiry,
  onViewAll,
}) => {
  return (
    <section className="bg-[#F5F7FA] py-16 lg:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title & CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#16805C] mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#16805C]" />
              <span>Vetted Channel Capacity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#071A2B]">
              Latest Verified Distributor Leads
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Qualified stockists, wholesalers, and route distributors actively seeking new manufacturing and FMCG brand partnerships.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#071A2B] hover:text-[#D7A83D] transition-colors group cursor-pointer"
          >
            <span>View All Distributor Leads</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Distributor Cards Grid */}
        {distributors.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <Warehouse className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#071A2B]">No distributor leads available</h3>
            <p className="text-xs text-slate-500 mt-1">Check back shortly or submit your requirement to be notified.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {distributors.slice(0, 6).map((dist) => (
              <div
                key={dist.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-[#D7A83D]/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Upper Body */}
                <div className="p-6">
                  {/* Top row: Business Type + Verification Shield */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      {dist.businessType}
                    </span>

                    {dist.isVerified && (
                      <div
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
                        title={dist.verificationLevel}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified Lead</span>
                      </div>
                    )}
                  </div>

                  {/* Company & Name */}
                  <h3 className="text-base font-bold text-[#071A2B] group-hover:text-[#D7A83D] transition-colors leading-snug line-clamp-1">
                    {dist.companyName}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">{dist.name}</div>

                  {/* Categories */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {dist.categories.map((c) => (
                      <span key={c} className="text-[11px] font-medium text-slate-600 bg-[#F5F7FA] px-2 py-0.5 rounded">
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Metric Highlights */}
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

                  {/* Sample Data Disclaimer Tag & Privacy Notice */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-400" />
                      <span>Phone & Email Protected</span>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">Demo Record</span>
                  </div>
                </div>

                {/* Card Action Footer */}
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
        )}
      </div>
    </section>
  );
};

export default DistributorLeadsSection;
