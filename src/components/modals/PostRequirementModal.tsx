import React, { useState } from 'react';
import { db } from '../../services/db';
import { CATEGORIES_DATA } from '../../data/categories';
import {
  X,
  Send,
  Loader2,
  CheckCircle2,
  Building2,
  Warehouse,
  Lock,
} from 'lucide-react';

interface PostRequirementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostRequirementModal: React.FC<PostRequirementModalProps> = ({ isOpen, onClose }) => {
  const [reqType, setReqType] = useState<'looking_for_distributor' | 'want_to_become_distributor'>('looking_for_distributor');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('California');
  const [city, setCity] = useState('Los Angeles');
  const [category, setCategory] = useState(CATEGORIES_DATA[0].name);
  const [investmentRange, setInvestmentRange] = useState('$25,000 - $50,000');
  const [description, setDescription] = useState('');
  const [preferredContact, setPreferredContact] = useState<'email' | 'phone' | 'whatsapp'>('email');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !phone.trim() || !state.trim()) {
      setErrorMessage('Please fill in your name, company, email, phone, and state.');
      return;
    }

    setIsSubmitting(true);
    try {
      db.createRequirement({
        type: reqType,
        fullName: fullName.trim(),
        companyName: companyName.trim() || fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        country: 'United States',
        state: state.trim(),
        city: city.trim(),
        category,
        investmentRange,
        description: description.trim() || 'Direct requirement intake.',
        preferredContact,
      });

      await new Promise((res) => setTimeout(res, 400));
      setSubmitted(true);
    } catch (err) {
      setErrorMessage('Failed to submit requirement. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-[#102131] my-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Post Distribution Requirement"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-[#071A2B]">Post Distribution Requirement</h3>
            <p className="text-xs text-slate-500">24h matching by our verified commercial trade desk.</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-[#071A2B]">Requirement Successfully Logged</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Reference #{Date.now().toString().slice(-6)}. Matching channel partners in {category} will be contacted.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-[#071A2B] text-white text-xs font-bold rounded-lg"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {errorMessage && (
              <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg">
                {errorMessage}
              </div>
            )}

            {/* Type selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => setReqType('looking_for_distributor')}
                className={`py-2 px-3 rounded-md font-bold text-center transition-colors flex items-center justify-center gap-1.5 ${
                  reqType === 'looking_for_distributor'
                    ? 'bg-[#071A2B] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-[#D7A83D]" />
                <span>Need Distributors</span>
              </button>
              <button
                type="button"
                onClick={() => setReqType('want_to_become_distributor')}
                className={`py-2 px-3 rounded-md font-bold text-center transition-colors flex items-center justify-center gap-1.5 ${
                  reqType === 'want_to_become_distributor'
                    ? 'bg-[#071A2B] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Warehouse className="w-3.5 h-3.5 text-[#D7A83D]" />
                <span>Want to Distribute</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. John Miller"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#D7A83D]"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Miller Goods LLC"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#D7A83D]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#D7A83D]"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Phone * (Shielded)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#D7A83D]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">State *</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#D7A83D]"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#D7A83D]"
                >
                  {CATEGORIES_DATA.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase mb-1">Requirement Brief</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Specify target products, expected order volume, or warehouse requirements..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#D7A83D]"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Protected Contact Details</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#D7A83D] hover:bg-[#C29632] text-[#071A2B] font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Post Requirement</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PostRequirementModal;
