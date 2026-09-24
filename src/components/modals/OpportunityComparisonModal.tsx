import React from 'react';
import { BrandOpportunity } from '../../types';
import { BrandLogo } from '../brand/BrandLogo';
import { X, ShieldCheck, Check, Send, ExternalLink } from 'lucide-react';

interface OpportunityComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunities: BrandOpportunity[];
  onRemove: (oppId: string) => void;
  onSendEnquiry: (opp: BrandOpportunity) => void;
  onViewDetails: (slug: string) => void;
}

export const OpportunityComparisonModal: React.FC<OpportunityComparisonModalProps> = ({
  isOpen,
  onClose,
  opportunities,
  onRemove,
  onSendEnquiry,
  onViewDetails,
}) => {
  if (!isOpen || opportunities.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-[#102131] my-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Compare Brand Opportunities"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#071A2B]">
              Compare Distributorship Opportunities ({opportunities.length}/3)
            </h2>
            <p className="text-xs text-slate-500">
              Side-by-side assessment of investment capital, warehouse square footage, and margin terms.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto p-6">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-3 font-bold text-slate-400 uppercase tracking-wider w-40">Attribute</th>
                {opportunities.map((opp) => (
                  <th key={opp.id} className="p-3 min-w-[220px] align-top">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <BrandLogo name={opp.brandName} logoUrl={opp.logoUrl} category={opp.category} size="sm" />
                        <div>
                          <div className="font-bold text-[#071A2B] text-sm">{opp.brandName}</div>
                          <div className="text-[10px] text-slate-500">{opp.category}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemove(opp.id)}
                        className="text-slate-400 hover:text-red-500 p-1"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {/* Business Type */}
              <tr>
                <td className="p-3 font-semibold text-slate-600 bg-slate-50">Business Model</td>
                {opportunities.map((opp) => (
                  <td key={opp.id} className="p-3 font-medium text-[#071A2B]">
                    {opp.businessType}
                  </td>
                ))}
              </tr>

              {/* Capital Investment */}
              <tr>
                <td className="p-3 font-semibold text-slate-600 bg-slate-50">Investment Range</td>
                {opportunities.map((opp) => (
                  <td key={opp.id} className="p-3 font-bold text-[#071A2B] tabular-nums">
                    ${(opp.investmentMin / 1000).toFixed(0)}k - ${(opp.investmentMax / 1000).toFixed(0)}k {opp.currency}
                  </td>
                ))}
              </tr>

              {/* Space Required */}
              <tr>
                <td className="p-3 font-semibold text-slate-600 bg-slate-50">Warehouse Space</td>
                {opportunities.map((opp) => (
                  <td key={opp.id} className="p-3 tabular-nums text-slate-700">
                    {opp.spaceRequiredSqFt.toLocaleString()} sq.ft
                  </td>
                ))}
              </tr>

              {/* Estimated Margin */}
              <tr>
                <td className="p-3 font-semibold text-slate-600 bg-slate-50">Gross Margin</td>
                {opportunities.map((opp) => (
                  <td key={opp.id} className="p-3 font-bold text-emerald-700">
                    {opp.marginPercentage}
                  </td>
                ))}
              </tr>

              {/* ROI Timeline */}
              <tr>
                <td className="p-3 font-semibold text-slate-600 bg-slate-50">Expected ROI</td>
                {opportunities.map((opp) => (
                  <td key={opp.id} className="p-3 text-slate-700">
                    {opp.roiMonths}
                  </td>
                ))}
              </tr>

              {/* Territories */}
              <tr>
                <td className="p-3 font-semibold text-slate-600 bg-slate-50">Open Territories</td>
                {opportunities.map((opp) => (
                  <td key={opp.id} className="p-3 text-slate-600">
                    {opp.territoriesAvailable.join(', ')}
                  </td>
                ))}
              </tr>

              {/* Verification */}
              <tr>
                <td className="p-3 font-semibold text-slate-600 bg-slate-50">Verification</td>
                {opportunities.map((opp) => (
                  <td key={opp.id} className="p-3">
                    {opp.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="text-slate-400">Under Review</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Core Benefits */}
              <tr>
                <td className="p-3 font-semibold text-slate-600 bg-slate-50">Key Benefits</td>
                {opportunities.map((opp) => (
                  <td key={opp.id} className="p-3 text-slate-600 align-top">
                    <ul className="space-y-1">
                      {opp.benefits.slice(0, 3).map((b, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Actions row */}
              <tr>
                <td className="p-3 font-semibold text-slate-600 bg-slate-50">Actions</td>
                {opportunities.map((opp) => (
                  <td key={opp.id} className="p-3">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          onSendEnquiry(opp);
                          onClose();
                        }}
                        className="w-full py-1.5 px-3 bg-[#071A2B] hover:bg-[#D7A83D] hover:text-[#071A2B] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer text-xs"
                      >
                        <Send className="w-3 h-3" />
                        <span>Send Enquiry</span>
                      </button>
                      <button
                        onClick={() => {
                          onViewDetails(opp.slug);
                          onClose();
                        }}
                        className="w-full py-1 px-2 text-slate-600 hover:text-[#071A2B] font-semibold text-xs flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>View Page</span>
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OpportunityComparisonModal;
