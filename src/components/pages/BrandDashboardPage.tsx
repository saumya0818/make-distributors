import React, { useState } from 'react';
import { db } from '../../services/db';
import { authService } from '../../services/auth';
import { BrandOpportunity } from '../../types';
import { CATEGORIES_DATA } from '../../data/categories';
import { SEOHelmet } from '../layout/SEOHelmet';
import {
  Building2,
  Plus,
  Layers,
  Inbox,
  CheckCircle2,
  Clock,
  Eye,
  Bookmark,
  Send,
  Loader2,
} from 'lucide-react';

interface BrandDashboardPageProps {
  onNavigate: (path: string) => void;
  onViewOpportunity: (slug: string) => void;
}

export const BrandDashboardPage: React.FC<BrandDashboardPageProps> = ({
  onNavigate,
  onViewOpportunity,
}) => {
  const currentUser = authService.getCurrentUser();
  const opportunities = db.getOpportunities();
  const brandOpps = opportunities.filter((o) => o.ownerId === currentUser?.id || o.ownerId === 'user-brand-1');
  const enquiries = db.getEnquiries();

  const [activeTab, setActiveTab] = useState<'listings' | 'post_new' | 'enquiries'>('listings');

  // Form state for creating a new opportunity
  const [newOpp, setNewOpp] = useState({
    brandName: currentUser?.companyName || 'Verdant Harvest Foods',
    companyName: currentUser?.companyName || 'Verdant Harvest Foods Inc',
    tagline: 'Farm-to-shelf organic pantry essentials and cold-pressed seed oils.',
    title: 'Regional Master Distributorship for Clean Pantry Lines',
    description: 'We are expanding direct-store delivery (DSD) operations into target metropolitan areas. We offer full marketing co-op support, barcoded master cartons, and 28% margin schedules.',
    category: 'Food & Beverage',
    subcategory: 'Packaged Foods & Pantry',
    businessType: 'Distributor' as const,
    country: 'United States',
    state: currentUser?.state || 'California',
    city: currentUser?.city || 'Sacramento',
    investmentMin: 35000,
    investmentMax: 90000,
    currency: 'USD',
    spaceRequiredSqFt: 3000,
    marginPercentage: '25% - 30%',
    roiMonths: '8 - 12 Months',
    productLine: 'Cold-Pressed Oils, Organic Flours, Artisanal Broths',
    benefits: 'Guaranteed 50-mile exclusive territory, Co-op ad allowance, Point-of-Sale display racks',
    requirements: 'Refrigerated or dry warehouse space, active commercial delivery van, 3+ years FMCG distribution experience',
    territoriesAvailable: 'Northern California, Reno Metro, Southern Oregon',
  });

  const [isPosting, setIsPosting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  const handlePostOpportunity = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPosting(true);

    try {
      const created = db.createOpportunity({
        ownerId: currentUser?.id || 'user-brand-1',
        slug: `${newOpp.brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`,
        brandName: newOpp.brandName,
        companyName: newOpp.companyName,
        tagline: newOpp.tagline,
        title: newOpp.title,
        description: newOpp.description,
        category: newOpp.category,
        subcategory: newOpp.subcategory,
        businessType: newOpp.businessType,
        country: newOpp.country,
        state: newOpp.state,
        city: newOpp.city,
        investmentMin: Number(newOpp.investmentMin),
        investmentMax: Number(newOpp.investmentMax),
        currency: 'USD',
        spaceRequiredSqFt: Number(newOpp.spaceRequiredSqFt),
        spaceUnit: 'sq.ft',
        marginPercentage: newOpp.marginPercentage,
        roiMonths: newOpp.roiMonths,
        productLine: newOpp.productLine.split(',').map((s) => s.trim()).filter(Boolean),
        benefits: newOpp.benefits.split(',').map((s) => s.trim()).filter(Boolean),
        requirements: newOpp.requirements.split(',').map((s) => s.trim()).filter(Boolean),
        territoriesAvailable: newOpp.territoriesAvailable.split(',').map((s) => s.trim()).filter(Boolean),
        isVerified: true,
        isFeatured: false,
        status: 'published',
      });

      await new Promise((res) => setTimeout(res, 400));
      setPostSuccess(true);
      setTimeout(() => {
        setPostSuccess(false);
        setActiveTab('listings');
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-10 text-[#102131]">
      <SEOHelmet title="Brand Opportunities Dashboard | Make Distributors" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#071A2B] text-white flex items-center justify-center font-bold text-lg">
              <Building2 className="w-6 h-6 text-[#D7A83D]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#071A2B]">
                Brand Commercial Dashboard
              </h1>
              <div className="text-xs text-slate-500">
                Logged in as <span className="font-semibold text-slate-900">{currentUser?.fullName || 'Brand Partner'}</span> ({currentUser?.companyName || 'Verdant Harvest Foods'})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('post_new')}
              className="px-4 py-2 rounded-lg bg-[#D7A83D] hover:bg-[#C29632] text-[#071A2B] font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Distributorship</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'listings'
                ? 'bg-[#071A2B] text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Active Listings ({brandOpps.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('post_new')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'post_new'
                ? 'bg-[#071A2B] text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Listing</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'enquiries'
                ? 'bg-[#071A2B] text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Inbound Inquiries ({enquiries.length})</span>
          </button>
        </div>

        {/* Content Views */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            {brandOpps.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
                <Layers className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="font-bold text-[#071A2B]">No active brand listings</h3>
                <p className="text-xs text-slate-500">Post your first distribution opportunity to start receiving partner inquiries.</p>
                <button
                  onClick={() => setActiveTab('post_new')}
                  className="px-4 py-2 bg-[#071A2B] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Create Distributorship Listing
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {brandOpps.map((opp) => (
                  <div
                    key={opp.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {opp.businessType} · {opp.category}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Status: {opp.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#071A2B]">{opp.brandName}</h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{opp.title}</p>

                      <div className="mt-4 grid grid-cols-3 gap-2 text-xs pt-3 border-t border-slate-100">
                        <div>
                          <div className="text-[10px] uppercase text-slate-400">Views</div>
                          <div className="font-bold text-[#071A2B] mt-0.5">{opp.viewsCount}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase text-slate-400">Bookmarks</div>
                          <div className="font-bold text-[#071A2B] mt-0.5">{opp.savesCount}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase text-slate-400">Inquiries</div>
                          <div className="font-bold text-emerald-700 mt-0.5">{opp.enquiriesCount}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => onViewOpportunity(opp.slug)}
                        className="text-xs font-bold text-[#071A2B] hover:text-[#D7A83D] flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview Live Listing</span>
                      </button>

                      <span className="text-[10px] text-slate-400 font-mono">
                        Ref: {opp.id.slice(0, 8)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Post New Form View */}
        {activeTab === 'post_new' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs max-w-3xl mx-auto">
            <h2 className="text-lg font-bold text-[#071A2B] mb-1">
              Create New Territory Opportunity
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Complete the commercial parameters for prospective stockists and regional distributors.
            </p>

            {postSuccess ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-[#071A2B]">Opportunity Published Successfully</h3>
                <p className="text-xs text-slate-500">Your opportunity is now visible in the public directory.</p>
              </div>
            ) : (
              <form onSubmit={handlePostOpportunity} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newOpp.brandName}
                      onChange={(e) => setNewOpp({ ...newOpp, brandName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#D7A83D]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Company Entity *
                    </label>
                    <input
                      type="text"
                      required
                      value={newOpp.companyName}
                      onChange={(e) => setNewOpp({ ...newOpp, companyName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#D7A83D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Opportunity Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newOpp.title}
                    onChange={(e) => setNewOpp({ ...newOpp, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#D7A83D]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Category *
                    </label>
                    <select
                      value={newOpp.category}
                      onChange={(e) => setNewOpp({ ...newOpp, category: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#D7A83D]"
                    >
                      {CATEGORIES_DATA.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Business Model *
                    </label>
                    <select
                      value={newOpp.businessType}
                      onChange={(e) => setNewOpp({ ...newOpp, businessType: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#D7A83D]"
                    >
                      <option value="Distributor">Distributor</option>
                      <option value="Super Stockist">Super Stockist</option>
                      <option value="C&F Agent">C&F Agent</option>
                      <option value="Franchise">Franchise</option>
                      <option value="Wholesaler">Wholesaler</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Min Investment ($) *
                    </label>
                    <input
                      type="number"
                      required
                      value={newOpp.investmentMin}
                      onChange={(e) => setNewOpp({ ...newOpp, investmentMin: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Max Investment ($) *
                    </label>
                    <input
                      type="number"
                      required
                      value={newOpp.investmentMax}
                      onChange={(e) => setNewOpp({ ...newOpp, investmentMax: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Space Req. (sq.ft) *
                    </label>
                    <input
                      type="number"
                      required
                      value={newOpp.spaceRequiredSqFt}
                      onChange={(e) => setNewOpp({ ...newOpp, spaceRequiredSqFt: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Description & Market Strategy *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newOpp.description}
                    onChange={(e) => setNewOpp({ ...newOpp, description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Available Target Territories (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newOpp.territoriesAvailable}
                    onChange={(e) => setNewOpp({ ...newOpp, territoriesAvailable: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    type="submit"
                    disabled={isPosting}
                    className="px-6 py-2.5 bg-[#071A2B] hover:bg-[#D7A83D] hover:text-[#071A2B] text-white font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isPosting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    <span>Publish Opportunity</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Enquiries View */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            {enquiries.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
                <Inbox className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <h3 className="font-bold text-[#071A2B]">No enquiries received yet</h3>
              </div>
            ) : (
              <div className="space-y-3">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <div className="font-bold text-[#071A2B]">{enq.senderName} ({enq.senderRole})</div>
                      <div className="text-slate-400">{new Date(enq.createdAt).toLocaleDateString()}</div>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">{enq.subject}</h4>
                    <p className="text-xs text-slate-600 mt-1">{enq.message}</p>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Preferred Contact: {enq.preferredContact}</span>
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Status: {enq.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandDashboardPage;
