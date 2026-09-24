import React, { useState } from 'react';
import { db } from '../../services/db';
import { SEOHelmet } from '../layout/SEOHelmet';
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Inbox,
  Warehouse,
  Building2,
  Clock,
  Layers,
} from 'lucide-react';

export const AdminModerationDeskPage: React.FC = () => {
  const requirements = db.getRequirements();
  const opportunities = db.getOpportunities();
  const distributors = db.getDistributors();
  const enquiries = db.getEnquiries();

  const [activeTab, setActiveTab] = useState<'requirements' | 'opportunities' | 'distributors'>('requirements');

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-10 text-[#102131]">
      <SEOHelmet title="Admin Moderation Desk | Make Distributors" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="bg-[#071A2B] text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D7A83D] text-[#071A2B] flex items-center justify-center font-black">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#F2D27B] uppercase tracking-wider">
                Make Governance & Operations
              </span>
              <h1 className="text-xl sm:text-2xl font-black mt-0.5">Admin Moderation Desk</h1>
            </div>
          </div>

          <div className="text-right text-xs text-slate-400">
            <div>Compliance Mode: Active</div>
            <div className="text-emerald-400 font-semibold mt-0.5">RLS & Privacy Enforced</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('requirements')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'requirements'
                ? 'bg-[#071A2B] text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Intake Requirements ({requirements.length})
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'opportunities'
                ? 'bg-[#071A2B] text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Brand Listings ({opportunities.length})
          </button>
          <button
            onClick={() => setActiveTab('distributors')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'distributors'
                ? 'bg-[#071A2B] text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Distributor Directory ({distributors.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'requirements' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <h2 className="text-base font-bold text-[#071A2B] mb-4">Fast-Intake Requirements Pipeline</h2>
            {requirements.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500">
                No requirement submissions yet. Fill out the form on the homepage to see entries logged here in real time.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                      <th className="p-2.5">Date</th>
                      <th className="p-2.5">Entity & Contact</th>
                      <th className="p-2.5">Type</th>
                      <th className="p-2.5">Category</th>
                      <th className="p-2.5">Location</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {requirements.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50">
                        <td className="p-2.5 text-slate-500">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-2.5">
                          <div className="font-bold text-[#071A2B]">{req.companyName}</div>
                          <div className="text-[11px] text-slate-500">{req.fullName} ({req.email})</div>
                        </td>
                        <td className="p-2.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {req.type === 'looking_for_distributor' ? 'Brand / Mfr' : 'Distributor'}
                          </span>
                        </td>
                        <td className="p-2.5 font-medium text-slate-700">{req.category}</td>
                        <td className="p-2.5 text-slate-600">{req.city}, {req.state}</td>
                        <td className="p-2.5">
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {req.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'opportunities' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <h2 className="text-base font-bold text-[#071A2B] mb-4">Brand Opportunities Moderation</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                    <th className="p-2.5">Brand</th>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5">Investment Range</th>
                    <th className="p-2.5">Space Req.</th>
                    <th className="p-2.5">Verification</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {opportunities.map((opp) => (
                    <tr key={opp.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-[#071A2B]">{opp.brandName}</td>
                      <td className="p-2.5 text-slate-600">{opp.category}</td>
                      <td className="p-2.5 font-medium tabular-nums">${opp.investmentMin / 1000}k - ${opp.investmentMax / 1000}k</td>
                      <td className="p-2.5 text-slate-600">{opp.spaceRequiredSqFt} sq.ft</td>
                      <td className="p-2.5">
                        {opp.isVerified ? (
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="text-slate-400">Standard</span>
                        )}
                      </td>
                      <td className="p-2.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {opp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'distributors' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <h2 className="text-base font-bold text-[#071A2B] mb-4">Distributor Directory Governance</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                    <th className="p-2.5">Company</th>
                    <th className="p-2.5">Type</th>
                    <th className="p-2.5">Warehouse Space</th>
                    <th className="p-2.5">Fleet</th>
                    <th className="p-2.5">Verification Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {distributors.map((dist) => (
                    <tr key={dist.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-[#071A2B]">{dist.companyName}</td>
                      <td className="p-2.5 text-slate-600">{dist.businessType}</td>
                      <td className="p-2.5 font-medium tabular-nums">{dist.warehouseCapacitySqFt.toLocaleString()} sq.ft</td>
                      <td className="p-2.5 text-slate-600">{dist.deliveryVehiclesCount} vehicles</td>
                      <td className="p-2.5">
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {dist.verificationLevel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminModerationDeskPage;
