import React, { useState } from 'react';
import { authService } from '../../services/auth';
import { UserRole } from '../../types';
import { X, Loader2, Building2, Warehouse, CheckCircle2 } from 'lucide-react';
import { MakeDistributorsLogo } from '../brand/MakeDistributorsLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'forgot';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [role, setRole] = useState<UserRole>('distributor');

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('California');
  const [city, setCity] = useState('Los Angeles');

  // Status
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || (!password.trim() && mode !== 'forgot')) {
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'login') {
        const res = await authService.login(email, password);
        if (res.error) {
          setErrorMessage(res.error);
        } else {
          onSuccess?.();
          onClose();
        }
      } else if (mode === 'signup') {
        if (!fullName.trim() || !companyName.trim()) {
          setErrorMessage('Please provide your name and company name.');
          setIsLoading(false);
          return;
        }
        const res = await authService.signup({
          email,
          password,
          fullName,
          companyName,
          role,
          phone,
          country: 'United States',
          state,
          city,
        });
        if (res.error) {
          setErrorMessage(res.error);
        } else {
          onSuccess?.();
          onClose();
        }
      } else if (mode === 'forgot') {
        const res = await authService.resetPassword(email);
        if (!res.success) {
          setErrorMessage(res.message);
        } else {
          setResetSent(true);
        }
      }
    } catch (err) {
      setErrorMessage('A network communication error occurred. Please retry.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-[#102131] my-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Account Access"
      >
        {/* Header */}
        <div className="p-6 bg-[#071A2B] text-white flex items-center justify-between">
          <MakeDistributorsLogo size="sm" variant="dark" showWordmark={true} />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#0D263A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <div className="mb-5 text-center">
            <h3 className="text-lg font-bold text-[#071A2B]">
              {mode === 'login' && 'Sign in to Make Distributors'}
              {mode === 'signup' && 'Create Your Business Account'}
              {mode === 'forgot' && 'Reset Your Password'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {mode === 'login' && 'Access direct enquiries, saved listings, and territory leads.'}
              {mode === 'signup' && 'Connect with verified manufacturers and wholesale distributors.'}
              {mode === 'forgot' && 'Enter your registered email to receive a recovery link.'}
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {errorMessage}
            </div>
          )}

          {resetSent ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-[#071A2B]">Password Reset Dispatched</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Check your inbox at <span className="font-semibold text-slate-900">{email}</span> for instructions to reset your password.
              </p>
              <button
                onClick={() => {
                  setResetSent(false);
                  setMode('login');
                }}
                className="mt-3 text-xs font-semibold text-[#071A2B] hover:text-[#D7A83D] underline"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection on Signup */}
              {mode === 'signup' && (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Select Your Business Profile Type *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('distributor')}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-center gap-2 cursor-pointer ${
                        role === 'distributor'
                          ? 'border-[#071A2B] bg-[#071A2B] text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Warehouse className="w-4 h-4 text-[#D7A83D] shrink-0" />
                      <div>
                        <div className="font-bold">Distributor</div>
                        <div className="text-[10px] opacity-80">Stockist / Wholesaler</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('brand')}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-center gap-2 cursor-pointer ${
                        role === 'brand'
                          ? 'border-[#071A2B] bg-[#071A2B] text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-[#D7A83D] shrink-0" />
                      <div>
                        <div className="font-bold">Brand</div>
                        <div className="text-[10px] opacity-80">Manufacturer / OEM</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Full Name and Company Name on Signup */}
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Company / Legal Entity *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Pinnacle Trade Networks LLC"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none"
                />
              </div>

              {/* Password */}
              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Password *
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[11px] text-[#C78519] hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none"
                  />
                </div>
              )}

              {/* Additional phone & location on signup */}
              {mode === 'signup' && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      State / Region *
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Texas"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Dallas"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#D7A83D] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-[#D7A83D] hover:bg-[#C29632] text-[#071A2B] font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      {mode === 'login' && 'Sign In'}
                      {mode === 'signup' && 'Complete Registration'}
                      {mode === 'forgot' && 'Send Recovery Email'}
                    </>
                  )}
                </button>
              </div>

              {/* Mode switch */}
              <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-600">
                {mode === 'login' && (
                  <p>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="font-bold text-[#071A2B] hover:text-[#D7A83D] underline"
                    >
                      Register here
                    </button>
                  </p>
                )}

                {mode === 'signup' && (
                  <p>
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="font-bold text-[#071A2B] hover:text-[#D7A83D] underline"
                    >
                      Sign in to account
                    </button>
                  </p>
                )}

                {mode === 'forgot' && (
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="font-bold text-[#071A2B] hover:text-[#D7A83D] underline"
                  >
                    Back to Sign In
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
