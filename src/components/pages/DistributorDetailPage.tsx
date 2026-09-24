import React, { useState, useEffect } from 'react';
import { DistributorProfile } from '../../types';
import { db } from '../../services/db';
import { SEOHelmet } from '../layout/SEOHelmet';
import {
  ShieldCheck,
  MapPin,
  Warehouse,
  Truck,
  Briefcase,
  Send,
  Lock,
  ArrowLeft,
  ChevronRight,
  Store,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface DistributorDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (distributor: DistributorProfile) => void;
}

export const DistributorDetailPage: React.FC<DistributorDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenEnquiry,
}) => {
  const [dist, setDist] = useState<DistributorProfile | undefined>(() => db.getDistributorBySlug(slug));
  const [showProtectedNotice, setShowProtectedNotice] = useState(false);

  useEffect(() => {
    setDist(db.getDistributorBySlug(slug));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!dist) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-[#102131]">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-[#071A2B]">Distributor Profile Not Found</h2>
        <p className="text-sm text-slate-500 mt-1">This distributor account may be private or unlisted.</p>
        <button
          onClick={() => onNavigate('/distributors')}
          className="mt-4 px-5 py-2 rounded-lg bg-[#071A2B] text-white text-xs font-bold"
        >
          Back to Distributor Directory
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F7FA] min-h-screen pb-20 text-[#102131]">
      <SEOHelmet
        title={`${dist.companyName} – Verified Distributor Profile | Make Distributors`}
        description={`${dist.companyName} is a verified ${dist.businessType} in ${dist.city}, ${dist.state} with ${dist.warehouseCapacitySqFt} sq.ft warehouse capacity.`}
        schemaType="Organization"
      />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => onNavigate('/')} className="hover:text-[#071A2B]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button onClick={() => onNavigate('/distributors')} className="hover:text-[#071A2B]">
            Distributors
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-[#071A2B] truncate">{dist.companyName}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => onNavigate('/distributors')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#071A2B] mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Distributor Leads</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Profile Info (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#071A2B] text-white flex items-center justify-center font-bold text-xl shadow-sm">
                    {dist.companyName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {dist.businessType}
                      </span>
                      {dist.isVerified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{dist.verificationLevel}</span>
                        </span>
                      )}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071A2B] mt-1">
                      {dist.companyName}
                    </h1>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Key Contact: {dist.name} · {dist.city}, {dist.state}, {dist.country}
                    </div>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs font-semibold text-slate-400 uppercase">Capital Range</div>
                  <div className="text-base font-bold text-[#071A2B] mt-0.5">
                    ${(dist.investmentMin / 1000).toFixed(0)}k - ${(dist.investmentMax / 1000).toFixed(0)}k
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-100">
                <div>
                  <div className="text-[10px] uppercase font-semibold text-slate-500">Warehouse Capacity</div>
                  <div className="text-base font-bold text-[#071A2B] mt-0.5 flex items-center gap-1">
                    <Warehouse className="w-4 h-4 text-slate-400" />
                    <span>{dist.warehouseCapacitySqFt.toLocaleString()} sq.ft</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-semibold text-slate-500">Commercial Experience</div>
                  <div className="text-base font-bold text-[#071A2B] mt-0.5 flex items-center gap-1">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span>{dist.yearsExperience} Years</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-semibold text-slate-500">Delivery Fleet</div>
                  <div className="text-base font-bold text-[#071A2B] mt-0.5 flex items-center gap-1">
                    <Truck className="w-4 h-4 text-slate-400" />
                    <span>{dist.deliveryVehiclesCount} Commercial Trucks</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-semibold text-slate-500">Retail Network Reach</div>
                  <div className="text-sm font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
                    <Store className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate">{dist.retailNetworkReach}</span>
                  </div>
                </div>
              </div>

              {/* About overview */}
              <div className="pt-6 space-y-3">
                <h2 className="text-base font-bold text-[#071A2B]">Operational Capabilities & Focus</h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {dist.about}
                </p>
              </div>
            </div>

            {/* Categories & Service Regions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Sectors & Categories Handled
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dist.categories.map((c) => (
                    <span key={c} className="text-xs font-semibold px-3 py-1.5 bg-[#F5F7FA] border border-slate-200 rounded-lg text-[#071A2B]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Active Regional Delivery Corridors
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dist.serviceRegions.map((region) => (
                    <span key={region} className="text-xs font-medium px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-md flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-700" />
                      <span>{region}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-4">
              <h3 className="text-base font-bold text-[#071A2B]">Partner With This Stockist</h3>
              <p className="text-xs text-slate-600">
                Send your brand catalogue and territory proposal directly to their commercial intake desk.
              </p>

              <button
                onClick={() => onOpenEnquiry(dist)}
                className="w-full py-3 bg-[#071A2B] hover:bg-[#D7A83D] hover:text-[#071A2B] text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Send Protected Enquiry</span>
              </button>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => setShowProtectedNotice(!showProtectedNotice)}
                  className="w-full py-2.5 px-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Request Verified Direct Contact</span>
                </button>

                {showProtectedNotice && (
                  <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2 animate-in fade-in duration-150">
                    <div className="font-bold flex items-center gap-1.5 text-[#071A2B]">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Contact Privacy Enforcement</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-600">
                      Direct phone and corporate email addresses are shielded until mutual interest is established through the portal.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Verification Guarantee */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Facility Records</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Warehouse square footage, valid business operating licenses, and commercial delivery vehicle registrations have been confirmed by Make Distributors audit analysts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorDetailPage;
