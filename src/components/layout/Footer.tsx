import React, { useState } from 'react';
import { MakeDistributorsLogo } from '../brand/MakeDistributorsLogo';
import { BrandAssetsModal } from '../brand/BrandAssetsModal';
import { ShieldCheck, Mail, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-b from-[#E0F2FE] via-[#F0F9FF] to-[#DDF0FD] text-slate-700 border-t-2 border-[#BAE6FD] text-sm">
      {/* Upper Footer: Newsletter & Brand summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <MakeDistributorsLogo size="md" variant="light" showWordmark={true} tagline={true} />
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm pt-2 font-medium">
              Make Distributors is the premier B2B marketplace bridging certified manufacturing brands with vetted regional distributors, stockists, and wholesale partners across dynamic trade corridors.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 text-[#92400E] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#D7A83D]" />
                <span>Enterprise-Grade Privacy</span>
              </div>
              <span className="text-slate-400">·</span>
              <span className="font-medium">Protected Contact Verification</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[#071A2B] text-xs font-bold uppercase tracking-wider">Marketplace</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button onClick={() => onNavigate('/opportunities')} className="hover:text-[#0284C7] transition-colors">
                  Browse Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/distributors')} className="hover:text-[#0284C7] transition-colors">
                  Find Distributors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/categories')} className="hover:text-[#0284C7] transition-colors">
                  Category Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/how-it-works')} className="hover:text-[#0284C7] transition-colors">
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Business Roles */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[#071A2B] text-xs font-bold uppercase tracking-wider">Business Roles</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button onClick={() => onNavigate('/opportunities?role=brand')} className="hover:text-[#0284C7] transition-colors">
                  For Brands
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/opportunities?role=manufacturer')} className="hover:text-[#0284C7] transition-colors">
                  For Manufacturers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/distributors?role=wholesaler')} className="hover:text-[#0284C7] transition-colors">
                  For Wholesalers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/distributors?role=distributor')} className="hover:text-[#0284C7] transition-colors">
                  For Distributors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/resources')} className="hover:text-[#0284C7] transition-colors">
                  Knowledge Centre
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Intake */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-[#071A2B] text-xs font-bold uppercase tracking-wider">Distribution Insights</h4>
            <p className="text-xs text-slate-600 font-medium">
              Receive curated monthly intelligence on emerging regional FMCG, industrial, and consumer goods distribution opportunities.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Thank you. You have been registered for our monthly trade digest.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex rounded-lg overflow-hidden border border-[#BAE6FD] focus-within:border-[#D7A83D] bg-white shadow-xs">
                  <div className="pl-3 flex items-center text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter corporate email..."
                    required
                    className="w-full px-3 py-2 text-xs text-[#071A2B] placeholder-slate-400 bg-transparent focus:outline-none"
                    aria-label="Corporate Email for Distribution Digest"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#D7A83D] hover:bg-[#C29632] text-[#071A2B] font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer border-l border-[#FDE68A]"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="text-[11px] text-slate-500">
                  Strict privacy. We never share subscriber records or contact data with external third parties.
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Lower Footer: Legal & Copyright */}
        <div className="mt-12 pt-8 border-t border-[#BAE6FD] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600 font-medium">
          <div>
            &copy; {new Date().getFullYear()} Make Distributors Inc. All rights reserved. &ldquo;Where Brands Meet Growth Partners.&rdquo;
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => setShowBrandModal(true)}
              className="text-[#0284C7] hover:text-[#0369A1] transition-colors flex items-center gap-1 font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D7A83D]" />
              <span>Brand & Logo System</span>
            </button>
            <button onClick={() => onNavigate('/privacy')} className="hover:text-[#0284C7] transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('/terms')} className="hover:text-[#0284C7] transition-colors">
              Terms of Use
            </button>
            <button onClick={() => onNavigate('/faq')} className="hover:text-[#0284C7] transition-colors">
              FAQ
            </button>
            <button onClick={() => onNavigate('/contact')} className="hover:text-[#0284C7] transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <BrandAssetsModal isOpen={showBrandModal} onClose={() => setShowBrandModal(false)} />
    </footer>
  );
};

export default Footer;
