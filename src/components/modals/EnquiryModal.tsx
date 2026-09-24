import React, { useState } from 'react';
import { BrandOpportunity, DistributorProfile } from '../../types';
import { db } from '../../services/db';
import { authService } from '../../services/auth';
import {
  X,
  Send,
  Loader2,
  CheckCircle2,
  Lock,
  Building2,
  Warehouse,
} from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetOpportunity?: BrandOpportunity | null;
  targetDistributor?: DistributorProfile | null;
  onRequireAuth?: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  targetOpportunity,
  targetDistributor,
}) => {
  const currentUser = authService.getCurrentUser();

  const [senderName, setSenderName] = useState(currentUser?.fullName || '');
  const [senderEmail, setSenderEmail] = useState(currentUser?.email || '');
  const [senderPhone, setSenderPhone] = useState(currentUser?.phone || '');
  const [subject, setSubject] = useState(
    targetOpportunity
      ? `Territory Distribution Inquiry – ${targetOpportunity.brandName}`
      : targetDistributor
      ? `Brand Representation Partnership – ${targetDistributor.companyName}`
      : 'Distribution Partnership Inquiry'
  );
  const [message, setMessage] = useState('');
  const [preferredContact, setPreferredContact] = useState<'email' | 'phone' | 'whatsapp'>('email');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || (!targetOpportunity && !targetDistributor)) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
      setErrorMessage('Please complete all required fields and your contact information.');
      return;
    }

    setIsSubmitting(true);
    try {
      db.createEnquiry({
        senderId: currentUser?.id || `guest-${Date.now()}`,
        senderName: senderName.trim(),
        senderEmail: senderEmail.trim(),
        senderRole: currentUser?.role || 'distributor',
        recipientId: targetOpportunity?.ownerId || targetDistributor?.id || 'user-system',
        targetOpportunityId: targetOpportunity?.id,
        targetDistributorId: targetDistributor?.id,
        subject: subject.trim(),
        message: message.trim(),
        preferredContact,
      });

      await new Promise((resolve) => setTimeout(resolve, 400));
      setSubmitted(true);
    } catch (err) {
      setErrorMessage('Failed to dispatch enquiry. Please retry.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setMessage('');
    onClose();
  };

  const entityTitle = targetOpportunity
    ? targetOpportunity.brandName
    : targetDistributor
    ? targetDistributor.companyName
    : 'Partner';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-[#102131]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Send B2B Distribution Enquiry"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            {targetOpportunity ? (
              <Building2 className="w-5 h-5 text-[#D7A83D]" />
            ) : (
              <Warehouse className="w-5 h-5 text-[#16805C]" />
            )}
            <div>
              <h3 className="text-base font-bold text-[#071A2B]">Send Direct Enquiry</h3>
              <p className="text-xs text-slate-500 truncate max-w-xs">Recipient: {entityTitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-[#071A2B]">Enquiry Dispatched Successfully</h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              Your inquiry has been encrypted and delivered directly to the commercial desk of{' '}
              <span className="font-bold text-[#071A2B]">{entityTitle}</span>. You will receive email notifications as soon as they respond.
            </p>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#071A2B] text-white text-xs font-bold rounded-lg hover:bg-[#0D263A] transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                {errorMessage}
              </div>
            )}

            {/* Sender details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Your Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Contact Phone (Kept Private)
              </label>
              <input
                type="tel"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                placeholder="+1 (555) 012-3456"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Subject line *
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none"
              />
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Enquiry Message *
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="State your operating territory, available warehouse square footage, existing commercial client accounts, and proposed initial order volumes..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none"
              />
            </div>

            {/* Preferred contact & Privacy badge */}
            <div className="flex items-center justify-between text-xs pt-1">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-600">Preferred:</span>
                {(['email', 'phone', 'whatsapp'] as const).map((m) => (
                  <label key={m} className="inline-flex items-center gap-1 cursor-pointer capitalize">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={m}
                      checked={preferredContact === m}
                      onChange={() => setPreferredContact(m)}
                      className="text-[#D7A83D] focus:ring-[#D7A83D]"
                    />
                    <span>{m}</span>
                  </label>
                ))}
              </div>

              <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>Anti-Spam Protected</span>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#D7A83D] hover:bg-[#C29632] text-[#071A2B] font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Enquiry</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;
