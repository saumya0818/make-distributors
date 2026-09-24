import React, { useState } from 'react';
import {
  Building2,
  Warehouse,
  UserCheck,
  FilePlus2,
  MailCheck,
  Award,
  Search,
  Send,
  Handshake,
  CheckCircle2,
} from 'lucide-react';

// 4 Unique Process Illustrations for How It Works
const ProcessIllustration: React.FC<{ stepNumber: string }> = ({ stepNumber }) => {
  switch (stepNumber) {
    case '01':
      // Create Profile Illustration
      return (
        <svg className="w-full h-24 mb-3 rounded-xl bg-white border border-slate-200/80 p-2" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="10" width="110" height="60" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Avatar frame */}
          <circle cx="50" cy="35" r="14" fill="#E2E8F0" />
          <path d="M42 45 C42 39 46 39 50 39 C54 39 58 39 58 45" fill="#94A3B8" />
          <circle cx="50" cy="32" r="6" fill="#94A3B8" />
          {/* Form lines */}
          <rect x="72" y="24" width="50" height="5" rx="2.5" fill="#D7A83D" />
          <rect x="72" y="34" width="40" height="4" rx="2" fill="#CBD5E1" />
          <rect x="72" y="42" width="30" height="4" rx="2" fill="#CBD5E1" />
          {/* Verified Badge */}
          <circle cx="120" cy="55" r="9" fill="#10B981" />
          <path d="M116 55 L119 58 L125 52" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case '02':
      // Post / Search Opportunity Illustration
      return (
        <svg className="w-full h-24 mb-3 rounded-xl bg-white border border-slate-200/80 p-2" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="15" width="85" height="50" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <rect x="28" y="24" width="45" height="5" rx="2" fill="#0284C7" />
          <rect x="28" y="34" width="60" height="4" rx="2" fill="#E2E8F0" />
          <rect x="28" y="42" width="35" height="4" rx="2" fill="#E2E8F0" />
          <rect x="28" y="50" width="20" height="8" rx="2" fill="#D7A83D" />
          {/* Magnifying Glass with glow */}
          <circle cx="115" cy="40" r="18" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          <line x1="128" y1="53" x2="142" y2="67" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <path d="M108 40 L113 45 L123 34" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case '03':
      // Send Secure Enquiry Illustration
      return (
        <svg className="w-full h-24 mb-3 rounded-xl bg-white border border-slate-200/80 p-2" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Envelope */}
          <rect x="35" y="18" width="90" height="50" rx="6" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
          <path d="M35 22 L80 50 L125 22" stroke="#16A34A" strokeWidth="1.5" />
          {/* Lock Privacy Shield */}
          <circle cx="80" cy="45" r="14" fill="#071A2B" stroke="#D7A83D" strokeWidth="1.5" />
          <rect x="74" y="43" width="12" height="9" rx="2" fill="#D7A83D" />
          <path d="M76 43 V39 C76 37 84 37 84 39 V43" stroke="#D7A83D" strokeWidth="1.5" fill="none" />
          {/* Route Dotted Beams */}
          <line x1="15" y1="45" x2="30" y2="45" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="130" y1="45" x2="145" y2="45" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      );

    case '04':
    default:
      // Grow Business Network Illustration
      return (
        <svg className="w-full h-24 mb-3 rounded-xl bg-white border border-slate-200/80 p-2" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Growth Bar Chart */}
          <rect x="25" y="48" width="12" height="20" rx="2" fill="#E2E8F0" />
          <rect x="42" y="38" width="12" height="30" rx="2" fill="#93C5FD" />
          <rect x="59" y="24" width="12" height="44" rx="2" fill="#3B82F6" />
          <rect x="76" y="14" width="12" height="54" rx="2" fill="#071A2B" />
          {/* Arrow */}
          <path d="M30 45 L50 35 L68 20 L88 10" stroke="#D7A83D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Handshake Nodes */}
          <circle cx="120" cy="38" r="18" fill="#FEF3C7" stroke="#D7A83D" strokeWidth="2" />
          <path d="M112 38 Q120 44 128 38" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="120" cy="18" r="4" fill="#0284C7" />
          <circle cx="138" cy="48" r="4" fill="#10B981" />
        </svg>
      );
  }
};

interface HowItWorksSectionProps {
  onGetStarted: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onGetStarted }) => {
  const [activeTab, setActiveTab] = useState<'brands' | 'distributors'>('brands');

  const brandSteps = [
    {
      step: '01',
      title: 'Create Verified Business Profile',
      description: 'Submit your corporate entity details, production certifications, and tax credentials for rapid compliance verification.',
      icon: UserCheck,
      color: 'from-amber-600 to-amber-800',
    },
    {
      step: '02',
      title: 'Post Targeted Territory Opportunities',
      description: 'Define your desired regional territories, margin matrices, warehouse space requirements, and minimum investment thresholds.',
      icon: FilePlus2,
      color: 'from-blue-600 to-indigo-800',
    },
    {
      step: '03',
      title: 'Receive Pre-Screened Enquiries',
      description: 'Review inbound expressions of interest from verified distributors complete with warehouse capacities and existing retail store reach.',
      icon: MailCheck,
      color: 'from-teal-600 to-emerald-800',
    },
    {
      step: '04',
      title: 'Appoint Partners & Scale Operations',
      description: 'Execute standardized distributor agreements, dispatch initial inventory pallets, and expand your regional market footprint.',
      icon: Award,
      color: 'from-purple-600 to-slate-900',
    },
  ];

  const distributorSteps = [
    {
      step: '01',
      title: 'Register Commercial Profile',
      description: 'Document your operating territories, warehouse square footage, delivery fleet vehicles, and retail network coverage.',
      icon: Warehouse,
      color: 'from-sky-600 to-blue-800',
    },
    {
      step: '02',
      title: 'Discover High-Margin Brand Opportunities',
      description: 'Filter verified manufacturer opportunities by category, margin percentage, territory availability, and product line.',
      icon: Search,
      color: 'from-emerald-600 to-teal-800',
    },
    {
      step: '03',
      title: 'Dispatch Secure Direct Enquiries',
      description: 'Send protected inquiries with your distribution credentials while keeping private phone and email data safeguarded.',
      icon: Send,
      color: 'from-amber-600 to-orange-800',
    },
    {
      step: '04',
      title: 'Formalize Long-Term Partnerships',
      description: 'Lock in territorial exclusivity, receive product display support, and grow recurring regional wholesale sales.',
      icon: Handshake,
      color: 'from-slate-700 to-zinc-900',
    },
  ];

  const currentSteps = activeTab === 'brands' ? brandSteps : distributorSteps;

  return (
    <section className="bg-white py-16 lg:py-24 border-b border-slate-200 text-[#102131]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C78519] mb-1.5 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D7A83D]" />
            <span>Structured Partnership Framework</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#071A2B]">
            How Make Distributors Accelerates Expansion
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            A standardized, privacy-preserving workflow designed to eliminate friction between manufacturers and regional distribution partners.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-[#F5F7FA] rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('brands')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'brands'
                  ? 'bg-[#071A2B] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#D7A83D]" />
              <span>For Brands & Manufacturers</span>
            </button>

            <button
              onClick={() => setActiveTab('distributors')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'distributors'
                  ? 'bg-[#071A2B] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Warehouse className="w-4 h-4 text-[#D7A83D]" />
              <span>For Distributors & Wholesalers</span>
            </button>
          </div>
        </div>

        {/* 4 Steps Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="rounded-2xl border border-slate-200 bg-[#F5F7FA] p-6 flex flex-col justify-between hover:border-[#D7A83D] hover:shadow-md transition-all group"
              >
                <div>
                  {/* Step number and visual gradient block */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-[#071A2B]/30 group-hover:text-[#D7A83D] transition-colors">
                      {step.step}
                    </span>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Dedicated Unique Step Process Illustration */}
                  <ProcessIllustration stepNumber={step.step} />

                  <h3 className="text-base font-bold text-[#071A2B] mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 text-[11px] font-semibold text-[#C78519] uppercase tracking-wider flex items-center gap-1">
                  <span>Verified Phase</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Footer */}
        <div className="mt-12 text-center">
          <button
            onClick={onGetStarted}
            className="px-8 py-3 rounded-xl bg-[#071A2B] hover:bg-[#0D263A] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            Start Your Partnership Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
