import React, { useState } from 'react';
import { db } from '../../services/db';
import { CATEGORIES_DATA } from '../../data/categories';
import {
  CheckCircle2,
  ShieldCheck,
  Building2,
  Warehouse,
  Send,
  Loader2,
  Lock,
} from 'lucide-react';

export const QuickRequirementSection: React.FC = () => {
  const [reqType, setReqType] = useState<'looking_for_distributor' | 'want_to_become_distributor'>(
    'looking_for_distributor'
  );

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'United States',
    state: '',
    city: '',
    category: CATEGORIES_DATA[0].name,
    investmentRange: '$25,000 - $50,000',
    description: '',
    preferredContact: 'email' as 'email' | 'phone' | 'whatsapp',
    consent: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.state.trim()) {
      setErrorMessage('Please fill in all required contact and location fields.');
      return;
    }

    if (!formData.consent) {
      setErrorMessage('Please accept the privacy terms to submit your requirement.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Duplicate submission prevention & database persistence
      db.createRequirement({
        type: reqType,
        fullName: formData.fullName,
        companyName: formData.companyName || formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        state: formData.state,
        city: formData.city || 'Metro Area',
        category: formData.category,
        investmentRange: formData.investmentRange,
        description: formData.description || `Seeking distribution partnerships in ${formData.category}.`,
        preferredContact: formData.preferredContact,
      });

      // Simulate admin intake dispatch
      await new Promise((resolve) => setTimeout(resolve, 450));
      setSubmitted(true);
    } catch (err) {
      setErrorMessage('A network disruption occurred. Please retry.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      country: 'United States',
      state: '',
      city: '',
      category: CATEGORIES_DATA[0].name,
      investmentRange: '$25,000 - $50,000',
      description: '',
      preferredContact: 'email',
      consent: true,
    });
  };

  return (
    <section className="relative bg-white border-b border-slate-200 py-16 lg:py-20 text-[#102131]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C78519] mb-2">
            <ShieldCheck className="w-4 h-4 text-[#D7A83D]" />
            <span>Fast B2B Distribution Intake</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#071A2B]">
            Post Your Distribution Requirement
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Submit your expansion goals. Our trade matching desk matches your criteria with verified regional channel partners within 24 business hours.
          </p>
        </div>

        {/* Tab Selection: Looking for Distributors vs Want to Become a Distributor */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="grid grid-cols-2 p-1.5 bg-[#F5F7FA] rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setReqType('looking_for_distributor')}
              className={`py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                reqType === 'looking_for_distributor'
                  ? 'bg-[#071A2B] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#D7A83D]" />
              <span>Looking for Distributors</span>
            </button>

            <button
              type="button"
              onClick={() => setReqType('want_to_become_distributor')}
              className={`py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                reqType === 'want_to_become_distributor'
                  ? 'bg-[#071A2B] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Warehouse className="w-4 h-4 text-[#D7A83D]" />
              <span>Want to Become a Distributor</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-10 relative">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#071A2B]">Requirement Submitted Successfully</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your requirement has been securely logged with reference number{' '}
                <span className="font-mono font-semibold text-slate-900">REQ-{Date.now().toString().slice(-6)}</span>.
                Our channel moderation desk will review and connect you with matching partners.
              </p>
              <div className="pt-4">
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-[#071A2B] text-white text-xs font-semibold rounded-lg hover:bg-[#0D263A] transition-colors cursor-pointer"
                >
                  Submit Another Requirement
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Contact Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Robert Kowalski"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none transition-colors"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company / Entity Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Apex Industrial Supply LLC"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none transition-colors"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none transition-colors"
                  />
                </div>

                {/* State / Region */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target State / Region *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="e.g. California, Texas, Illinois"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none transition-colors"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Target City / Metropolitan Area
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Los Angeles, Dallas, Chicago"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none transition-colors"
                  />
                </div>

                {/* Business Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Business Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none transition-colors cursor-pointer"
                  >
                    {CATEGORIES_DATA.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Investment Range */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    {reqType === 'looking_for_distributor'
                      ? 'Distributor Investment Required'
                      : 'My Capital Investment Capacity'}
                  </label>
                  <select
                    value={formData.investmentRange}
                    onChange={(e) => setFormData({ ...formData, investmentRange: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Under $25,000">Under $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                    <option value="$250,000+">$250,000+</option>
                  </select>
                </div>
              </div>

              {/* Requirement Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Detailed Requirement Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Outline your target distribution channels, required warehouse specifications, current retail accounts, or brand expectations..."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none transition-colors"
                />
              </div>

              {/* Preferred Contact Method & Privacy Notice */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-4 text-xs text-slate-700">
                  <span className="font-semibold uppercase tracking-wider">Preferred Contact:</span>
                  {(['email', 'phone', 'whatsapp'] as const).map((method) => (
                    <label key={method} className="inline-flex items-center gap-1.5 cursor-pointer capitalize">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={() => setFormData({ ...formData, preferredContact: method })}
                        className="text-[#D7A83D] focus:ring-[#D7A83D]"
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Your phone number is protected & verified</span>
                </div>
              </div>

              {/* Consent checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-0.5 rounded border-slate-300 text-[#D7A83D] focus:ring-[#D7A83D]"
                />
                <label htmlFor="consentCheckbox" className="text-xs text-slate-600 cursor-pointer">
                  I agree to Make Distributors Terms of Use and Privacy Policy. I authorize Make Distributors to match my profile with qualified channel partners.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-[#D7A83D] hover:bg-[#C29632] text-[#071A2B] font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing Requirement...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Post Requirement Now</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuickRequirementSection;
