import React, { useState } from 'react';
import { X, Check, Copy, Sparkles, Download, Layers } from 'lucide-react';
import {
  MakeDistributorsLogo,
  MakeDistributorsFullLogo,
  MakeDistributorsIcon,
  MakeDistributorsDarkLogo,
  MakeDistributorsLightLogo,
  MakeDistributorsBlueMonoLogo,
  MakeDistributorsWhiteMonoLogo,
  MakeDistributorsSocialSquareLogo,
} from './MakeDistributorsLogo';

interface BrandAssetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandAssetsModal: React.FC<BrandAssetsModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const brandColors = [
    { name: 'Deep Commercial Navy', hex: '#071A2B', usage: 'Primary brand background, dark UI headers, solid contrast' },
    { name: 'Electric Azure Blue', hex: '#0284C7', usage: 'Primary distribution node color, primary brand actions' },
    { name: 'Sky Cyan Glow', hex: '#38BDF8', usage: 'Monogram accent, network line pulses, active hover accents' },
    { name: 'Surface Gray', hex: '#F5F7FA', usage: 'Neutral content background, card borders, card fills' },
    { name: 'Commercial Gold', hex: '#D7A83D', usage: 'Opportunity badges, verified trust indicators' },
  ];

  const logoVariants = [
    {
      id: 'full-dark',
      title: '1. Full Logo (Dark Background)',
      description: 'Primary master mark for dark headers, presentation decks, and splash screens.',
      bgClass: 'bg-[#071A2B]',
      component: <MakeDistributorsLogo variant="dark" size="lg" showWordmark={true} />,
    },
    {
      id: 'full-light',
      title: '2. Full Logo (Light Background)',
      description: 'Master mark for white documents, invoices, light web headers, and stationery.',
      bgClass: 'bg-white border border-slate-200',
      component: <MakeDistributorsLogo variant="light" size="lg" showWordmark={true} />,
    },
    {
      id: 'icon-only',
      title: '3. Icon-Only Logo (Favicon & App Icon)',
      description: 'Compact 48x48 icon for browser tabs, mobile homescreen PWA, and avatars.',
      bgClass: 'bg-[#081726]',
      component: (
        <div className="flex items-center gap-4">
          <MakeDistributorsIcon size="md" />
          <MakeDistributorsIcon size="lg" />
          <MakeDistributorsIcon size="xl" />
        </div>
      ),
    },
    {
      id: 'blue-mono',
      title: '4. Blue Monochrome Version',
      description: 'Single-color corporate cyan/azure rendition for single-pass printing.',
      bgClass: 'bg-sky-50/50 border border-sky-200',
      component: <MakeDistributorsBlueMonoLogo size="lg" />,
    },
    {
      id: 'white-mono',
      title: '5. White Monochrome Version',
      description: 'Clean stark white silhouette for photography overlays and high-contrast dark media.',
      bgClass: 'bg-[#030914]',
      component: <MakeDistributorsWhiteMonoLogo size="lg" />,
    },
    {
      id: 'social-square',
      title: '6. Social Profile Square Version',
      description: 'Standardized square profile asset (1:1 aspect) for LinkedIn, Twitter/X, and directory avatars.',
      bgClass: 'bg-slate-900',
      component: (
        <div className="max-w-[260px] w-full mx-auto">
          <MakeDistributorsSocialSquareLogo />
        </div>
      ),
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#0B1522] border border-slate-800 text-white rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Make Distributors Brand System & Assets"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-[#07111D]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Make Distributors Brand System</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Official Identity
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                “Where Brands Meet Growth Partners.” · B2B Distribution Ecosystem
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-8 max-h-[78vh] overflow-y-auto">
          {/* Logo Variants Grid */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Standardized Logo Variants</span>
              </h4>
              <span className="text-xs text-slate-400">7 Production Formats</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {logoVariants.map((variant) => (
                <div
                  key={variant.id}
                  className="rounded-xl bg-[#0E1B2C] border border-slate-800 p-5 flex flex-col justify-between gap-4"
                >
                  <div>
                    <h5 className="text-sm font-bold text-white">{variant.title}</h5>
                    <p className="text-xs text-slate-400 mt-1">{variant.description}</p>
                  </div>

                  {/* Visual Preview Box */}
                  <div
                    className={`rounded-xl p-6 flex items-center justify-center min-h-[120px] overflow-hidden ${variant.bgClass}`}
                  >
                    {variant.component}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Color Palette Section */}
          <section className="space-y-4 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Corporate Palette & Color Codes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {brandColors.map((color) => (
                <div
                  key={color.hex}
                  className="p-3.5 rounded-xl bg-[#0E1B2C] border border-slate-800 flex items-center gap-3.5"
                >
                  <div
                    className="w-10 h-10 rounded-lg shadow-sm border border-white/10 shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white truncate">{color.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{color.usage}</div>
                    <button
                      onClick={() => handleCopy(color.hex, color.hex)}
                      className="mt-1 text-[10px] font-mono text-sky-300 hover:text-sky-200 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{color.hex}</span>
                      {copiedKey === color.hex ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Typography & Voice */}
          <section className="p-4 rounded-xl bg-[#08121E] border border-slate-800/80 text-xs text-slate-400 space-y-2">
            <div className="font-bold text-white">Brand Typography & Tone</div>
            <p>
              The Make Distributors wordmark uses geometric, bold sans-serif lettering with high-contrast character tracking. Primary corporate typography is Inter / system sans with strict visual hierarchy. Tone is authoritative, verified, privacy-preserving, and enterprise-grade.
            </p>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#07111D] flex items-center justify-between text-xs text-slate-400">
          <div>Make Distributors Identity Guide · v2.0</div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold transition-colors cursor-pointer"
          >
            Close Brand Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandAssetsModal;
