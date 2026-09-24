import React, { useState } from 'react';
import { CATEGORIES_DATA } from '../../data/categories';
import { SEOHelmet } from '../layout/SEOHelmet';
import {
  ShieldCheck,
  Building2,
  Warehouse,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  HelpCircle,
  FileText,
  Lock,
  ArrowRight,
  Send,
} from 'lucide-react';

interface StaticPageProps {
  onNavigate: (path: string) => void;
  onPostRequirement?: () => void;
}

// 1. ABOUT PAGE
export const AboutPage: React.FC<StaticPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F5F7FA] min-h-screen py-12 text-[#102131]">
      <SEOHelmet
        title="About Make Distributors | Where Brands Meet Growth Partners."
        description="Make Distributors is a B2B distribution marketplace connecting manufacturers with vetted regional stockists and wholesale partners."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C78519]">
            Enterprise Trade Infrastructure
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#071A2B] tracking-tight">
            Connecting Manufacturing Scale with Regional Distribution Capacity
          </h1>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Make Distributors was founded to resolve the structural friction in the B2B supply chain. Historically, brands spent months attending high-cost trade expos or paying opaque brokers to secure distribution in unfamiliar regional markets. Meanwhile, regional stockists struggled to discover high-margin, authentic brand franchises.
          </p>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            By digitizing opportunity disclosures, verifying warehouse square footage, and enforcing contact privacy, Make Distributors delivers a transparent channel marketplace where verified manufacturers and vetted stockists forge durable, profitable relationships.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-2xl font-black text-[#071A2B]">12+</div>
              <div className="text-xs text-slate-500 mt-1">Core Industry Sectors</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-2xl font-black text-[#071A2B]">100%</div>
              <div className="text-xs text-slate-500 mt-1">Privacy-Guaranteed Leads</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-2xl font-black text-[#071A2B]">48h</div>
              <div className="text-xs text-slate-500 mt-1">Average Review SLA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. CONTACT PAGE
export const ContactPage: React.FC<StaticPageProps> = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-12 text-[#102131]">
      <SEOHelmet title="Contact Our Trade Desk | Make Distributors" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#16805C] mb-1">
              Direct Communication
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#071A2B]">
              Contact the Make Distributors Desk
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Our trade analysts assist brands and distributors with verification audits, enterprise listings, and partnership moderation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#071A2B] flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[#D7A83D]" />
                <span>Trade Inquiries</span>
              </div>
              <div className="text-xs text-slate-600">desk@makedistributors.example</div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-[#071A2B] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#16805C]" />
                <span>Verification & Compliance</span>
              </div>
              <div className="text-xs text-slate-600">audit@makedistributors.example</div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-[#071A2B] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>Corporate Headquarters</span>
              </div>
              <div className="text-xs text-slate-600">New York & Los Angeles, USA</div>
            </div>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="font-bold text-sm text-[#071A2B]">Message Received</div>
              <p className="text-xs text-slate-600">Our desk will review your inquiry and respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-slate-100 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Inquiry Details</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#071A2B] hover:bg-[#D7A83D] hover:text-[#071A2B] text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// 3. PRIVACY POLICY PAGE
export const PrivacyPolicyPage: React.FC<StaticPageProps> = () => {
  return (
    <div className="bg-[#F5F7FA] min-h-screen py-12 text-[#102131]">
      <SEOHelmet title="Enterprise Privacy Policy | Make Distributors" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Legal Compliance</div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#071A2B]">Privacy & Data Governance Policy</h1>
          <div className="prose prose-slate text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
            <p>
              At Make Distributors, we uphold strict zero-leakage standards for B2B contact data. We recognize that telephone numbers, private executive email addresses, and confidential supplier lists represent core commercial assets.
            </p>
            <h3 className="font-bold text-[#071A2B] text-sm pt-2">1. Phone & Email Shielding</h3>
            <p>
              Contact telephone numbers and executive emails submitted during requirement posting or directory registration are never sold, published publicly, or scraped by search indexing crawlers. Contact details are only exchanged when both commercial parties establish mutual consent via verified enquiry dispatch.
            </p>
            <h3 className="font-bold text-[#071A2B] text-sm pt-2">2. Supabase Row Level Security (RLS)</h3>
            <p>
              All database records are stored with PostgreSQL Row Level Security enabled. Only verified owners and authorized Make compliance officers possess permission to inspect private profile attributes.
            </p>
            <h3 className="font-bold text-[#071A2B] text-sm pt-2">3. Storage of Verification Documents</h3>
            <p>
              Tax documents, warehouse lease agreements, and food handling certificates uploaded for verification are retained in secure private storage buckets and accessed exclusively via expiring signed URLs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. TERMS PAGE
export const TermsPage: React.FC<StaticPageProps> = () => {
  return (
    <div className="bg-[#F5F7FA] min-h-screen py-12 text-[#102131]">
      <SEOHelmet title="Terms of Use | Make Distributors" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Terms of Service</div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#071A2B]">Platform Commercial Terms</h1>
          <div className="text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
            <p>
              By accessing Make Distributors, you warrant that all commercial representations, warehouse square footage claims, and investment ranges provided are authentic and accurate to the best of your company knowledge.
            </p>
            <p>
              Make Distributors acts as a technology intermediary and match facilitator. Users are required to execute independent due diligence, territory contracts, and credit checks prior to transferring initial inventory or capital funds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. FAQ PAGE
export const FaqPage: React.FC<StaticPageProps> = () => {
  const faqs = [
    {
      q: 'How does Make Distributors verify manufacturing brands and stockists?',
      a: 'Our compliance desk audits entity registrations, GS1 barcodes, FDA/certifications, and physical warehouse footprints before granting verified status.',
    },
    {
      q: 'Is posting a distribution requirement free?',
      a: 'Yes. Initial requirement submissions are processed at no cost. Our matching desk routes your criteria to qualified regional partners.',
    },
    {
      q: 'Can distributors compare multiple brand opportunities side-by-side?',
      a: 'Yes. Our portal features a built-in comparison tool allowing you to compare margin structures, warehouse space, and ROI timelines for up to 3 opportunities.',
    },
    {
      q: 'Are my phone and email address visible to the public?',
      a: 'Never. Contact info is shielded behind our protected enquiry system to eliminate cold spam and preserve confidentiality.',
    },
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-12 text-[#102131]">
      <SEOHelmet title="Frequently Asked Questions | Make Distributors" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C78519] mb-1">
            Common Inquiries
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#071A2B]">Frequently Asked Questions</h1>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-sm font-bold text-[#071A2B] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#D7A83D] shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-600 mt-2 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
