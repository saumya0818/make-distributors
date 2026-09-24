import React from 'react';
import { ShieldCheck, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 't-1',
      quote:
        'Finding qualified FMCG distributors with verified temperature-controlled warehouse space previously took 6 months of agency fees. Through Make Distributors, we appointed two regional master stockists in Northern California within 3 weeks.',
      author: 'Julian Montgomery',
      role: 'Commercial Expansion Director',
      company: 'Verdant Agro & Organics',
      tag: 'Sample Brand Partner Feedback',
    },
    {
      id: 't-2',
      quote:
        'The protected contact flow ensures our wholesale desk only receives serious enquiries from established brands with genuine product registrations and realistic margin matrices. It preserves our team’s operational bandwidth.',
      author: 'Marcus Vance',
      role: 'Managing Director',
      company: 'Pinnacle Trade Networks LLC',
      tag: 'Sample Distributor Partner Feedback',
    },
    {
      id: 't-3',
      quote:
        'Standardized product specification dossiers and territory mapping made expanding our high-durability workwear lines into the Carolinas transparent and legally structured from day one.',
      author: 'Elena Morales',
      role: 'Head of National Accounts',
      company: 'UrbanWeave Textile Works Ltd',
      tag: 'Sample Manufacturer Partner Feedback',
    },
  ];

  return (
    <section className="bg-[#F5F7FA] py-16 lg:py-24 border-b border-slate-200 text-[#102131]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#16805C] mb-1.5 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#16805C]" />
            <span>Verified Partnership Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#071A2B]">
            Trusted by Brands and Stockists Alike
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Real experiences from enterprise brands and regional distribution network operators scaling multi-state distribution corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
            >
              <div>
                <Quote className="w-6 h-6 text-[#D7A83D]/60 mb-3" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#071A2B]">{item.author}</div>
                  <div className="text-[11px] text-slate-500">{item.role} · {item.company}</div>
                </div>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                  Demo Label
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
