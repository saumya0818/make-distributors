import React, { useState } from 'react';
import { Category } from '../../types';
import { ArrowRight, Layers } from 'lucide-react';

interface CategoryImageCardProps {
  category: Category;
  onClick: () => void;
  className?: string;
}

// 12 Distinct, Handcrafted Vector Sceneries for each Category (No Repetition!)
const CategoryIllustration: React.FC<{ slug: string; name: string }> = ({ slug, name }) => {
  switch (slug) {
    case 'food-beverage':
      return (
        <svg className="w-full h-full" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="200" fill="#1C1306" />
          <circle cx="240" cy="80" r="90" fill="#D97706" fillOpacity="0.2" filter="blur(30px)" />
          {/* Glass Beverage Bottle */}
          <rect x="70" y="70" width="36" height="85" rx="6" fill="#F59E0B" fillOpacity="0.8" stroke="#FDE68A" strokeWidth="1.5" />
          <rect x="80" y="50" width="16" height="22" rx="2" fill="#FBBF24" stroke="#FDE68A" strokeWidth="1.5" />
          <rect x="78" y="44" width="20" height="7" rx="2" fill="#D97706" />
          {/* Label */}
          <rect x="73" y="90" width="30" height="35" rx="3" fill="#FFFBEB" fillOpacity="0.9" />
          <line x1="77" y1="102" x2="99" y2="102" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          <line x1="77" y1="110" x2="94" y2="110" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
          {/* Snack Pouch */}
          <path d="M125 65 L175 60 L185 155 L115 155 Z" fill="#B45309" stroke="#FBBF24" strokeWidth="1.5" />
          <path d="M123 65 L177 60" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
          <circle cx="150" cy="105" r="18" fill="#F59E0B" />
          <path d="M143 105 L150 97 L157 105" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          {/* Spices Bowl & Grains */}
          <ellipse cx="225" cy="140" rx="45" ry="18" fill="#78350F" stroke="#F59E0B" strokeWidth="1.5" />
          <ellipse cx="225" cy="136" rx="40" ry="14" fill="#D97706" />
          <circle cx="215" cy="132" r="3" fill="#FEF3C7" />
          <circle cx="230" cy="130" r="2.5" fill="#FEF3C7" />
          <circle cx="222" cy="135" r="2" fill="#FEF3C7" />
          <circle cx="238" cy="134" r="3" fill="#FEF3C7" />
        </svg>
      );

    case 'health-personal-care':
      return (
        <svg className="w-full h-full" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="200" fill="#041B18" />
          <circle cx="220" cy="90" r="90" fill="#0D9488" fillOpacity="0.25" filter="blur(30px)" />
          {/* Cosmetic Dropper Bottle */}
          <rect x="75" y="80" width="38" height="75" rx="8" fill="#0F766E" stroke="#5EEAD4" strokeWidth="1.5" />
          <rect x="85" y="62" width="18" height="20" rx="3" fill="#134E4A" stroke="#5EEAD4" strokeWidth="1.5" />
          <rect x="89" y="48" width="10" height="14" rx="4" fill="#5EEAD4" />
          <rect x="79" y="100" width="30" height="30" rx="4" fill="#CCFBF1" fillOpacity="0.9" />
          <line x1="84" y1="112" x2="104" y2="112" stroke="#0F766E" strokeWidth="2" strokeLinecap="round" />
          {/* Lotion Pump Jar */}
          <rect x="135" y="95" width="55" height="60" rx="10" fill="#115E59" stroke="#2DD4BF" strokeWidth="1.5" />
          <rect x="140" y="85" width="45" height="12" rx="4" fill="#2DD4BF" />
          <path d="M162 85 V68 H180" stroke="#CCFBF1" strokeWidth="3" strokeLinecap="round" />
          {/* Clean Serum Bubbles */}
          <circle cx="225" cy="80" r="14" fill="#2DD4BF" fillOpacity="0.3" stroke="#5EEAD4" strokeWidth="1.5" />
          <circle cx="245" cy="115" r="22" fill="#14B8A6" fillOpacity="0.25" stroke="#99F6E4" strokeWidth="1.5" />
          <circle cx="210" cy="135" r="9" fill="#2DD4BF" fillOpacity="0.4" stroke="#5EEAD4" strokeWidth="1" />
        </svg>
      );

    case 'ayurvedic-herbal':
      return (
        <svg className="w-full h-full" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="200" fill="#06180D" />
          <circle cx="160" cy="100" r="85" fill="#16A34A" fillOpacity="0.2" filter="blur(30px)" />
          {/* Traditional Ayurvedic Mortar & Pestle */}
          <path d="M75 110 C75 145 135 145 135 110 Z" fill="#14532D" stroke="#86EFAC" strokeWidth="2" />
          <line x1="85" y1="90" x2="115" y2="135" stroke="#4ADE80" strokeWidth="6" strokeLinecap="round" />
          {/* Botanical Neem/Tulsi Leaves */}
          <path d="M170 145 C150 115 175 75 205 70 C205 100 195 130 170 145 Z" fill="#16A34A" stroke="#BBF7D0" strokeWidth="1.5" />
          <path d="M175 135 C195 115 225 110 245 85 C230 115 210 135 175 135 Z" fill="#22C55E" stroke="#BBF7D0" strokeWidth="1.5" />
          <line x1="170" y1="145" x2="200" y2="80" stroke="#BBF7D0" strokeWidth="1" />
          {/* Herbal Extract Droplet */}
          <path d="M225 125 C225 140 240 140 240 125 C240 115 232 105 232 105 C232 105 225 115 225 125 Z" fill="#86EFAC" />
        </svg>
      );

    case 'home-care-cleaning':
      return (
        <svg className="w-full h-full" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="200" fill="#041624" />
          <circle cx="210" cy="90" r="90" fill="#0284C7" fillOpacity="0.25" filter="blur(30px)" />
          {/* Spray Cleaner Trigger Bottle */}
          <path d="M85 95 L85 160 L125 160 L125 115 L105 95 Z" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="95" y="75" width="15" height="22" fill="#0369A1" stroke="#38BDF8" strokeWidth="1.5" />
          <path d="M90 75 L125 70 L115 60 L85 68 Z" fill="#38BDF8" />
          <path d="M90 75 L75 85" stroke="#BAE6FD" strokeWidth="3" strokeLinecap="round" />
          {/* Laundry Detergent Jug with Handle */}
          <path d="M150 90 C150 80 160 80 170 80 L195 80 C205 80 205 90 205 100 L205 160 L150 160 Z" fill="#075985" stroke="#7DD3FC" strokeWidth="1.5" />
          <path d="M155 100 L155 130 C155 135 165 135 165 130 L165 100 Z" fill="#041624" stroke="#7DD3FC" strokeWidth="1.5" />
          <circle cx="185" cy="120" r="14" fill="#0284C7" />
          {/* Sparkles & Bubbles */}
          <circle cx="245" cy="70" r="10" fill="#38BDF8" fillOpacity="0.3" stroke="#BAE6FD" strokeWidth="1.5" />
          <circle cx="265" cy="115" r="16" fill="#0EA5E9" fillOpacity="0.2" stroke="#BAE6FD" strokeWidth="1.5" />
          <path d="M235 135 L240 145 L250 150 L240 155 L235 165 L230 155 L220 150 L230 145 Z" fill="#FDE047" />
        </svg>
      );

    case 'agriculture-farming':
      return (
        <svg className="w-full h-full" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="200" fill="#131B05" />
          <circle cx="220" cy="80" r="90" fill="#65A30D" fillOpacity="0.25" filter="blur(30px)" />
          {/* Golden Wheat Stalks */}
          <path d="M85 165 Q105 110 115 60" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="118" cy="65" rx="6" ry="12" fill="#FACC15" transform="rotate(25 118 65)" />
          <ellipse cx="106" cy="85" rx="6" ry="12" fill="#FACC15" transform="rotate(-25 106 85)" />
          <ellipse cx="118" cy="100" rx="6" ry="12" fill="#FACC15" transform="rotate(25 118 100)" />
          {/* Fertilizer Seed Sack */}
          <path d="M145 85 L205 80 L215 165 L135 165 Z" fill="#3F6212" stroke="#A3E635" strokeWidth="1.5" />
          <circle cx="175" cy="120" r="18" fill="#4D7C0F" stroke="#BEF264" strokeWidth="1.5" />
          <path d="M170 120 Q175 110 180 120" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
          {/* Green Sprout Shoot */}
          <path d="M245 160 V125 Q230 110 215 120" stroke="#84CC16" strokeWidth="3" strokeLinecap="round" />
          <path d="M245 135 Q260 115 275 130" stroke="#65A30D" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'apparel-fashion':
      return (
        <svg className="w-full h-full" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="200" fill="#1C0913" />
          <circle cx="160" cy="90" r="85" fill="#E11D48" fillOpacity="0.2" filter="blur(30px)" />
          {/* Sleek Retail Hanger */}
          <path d="M130 75 Q160 55 190 75 L215 95 H105 Z" fill="none" stroke="#FDA4AF" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M160 55 C160 40 175 40 175 48 C175 55 160 55 160 55" fill="none" stroke="#FDA4AF" strokeWidth="2.5" strokeLinecap="round" />
          {/* Folded Knitwear Fabrics */}
          <rect x="110" y="110" width="100" height="18" rx="5" fill="#E11D48" stroke="#FECDD3" strokeWidth="1" />
          <rect x="105" y="125" width="110" height="18" rx="5" fill="#BE123C" stroke="#FECDD3" strokeWidth="1" />
          <rect x="100" y="140" width="120" height="20" rx="5" fill="#9F1239" stroke="#FECDD3" strokeWidth="1" />
          {/* Measurement Tape Ribbon */}
          <path d="M65 155 Q160 185 255 150" stroke="#FDE047" strokeWidth="3" strokeDasharray="6 3" />
        </svg>
      );

    case 'automobile-transportation':
      return (
        <svg className="w-full h-full" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="200" fill="#0C131D" />
          <circle cx="210" cy="95" r="90" fill="#3B82F6" fillOpacity="0.2" filter="blur(30px)" />
          {/* Engine Oil Canister */}
          <path d="M80 85 L125 80 L135 160 L70 160 Z" fill="#1E293B" stroke="#60A5FA" strokeWidth="1.5" />
          <rect x="85" y="65" width="16" height="18" rx="3" fill="#3B82F6" stroke="#93C5FD" strokeWidth="1.5" />
          <path d="M85 85 Q70 105 70 135" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
          <rect x="85" y="105" width="38" height="35" rx="4" fill="#0F172A" />
          <circle cx="104" cy="122" r="9" fill="#F59E0B" />
          {/* Industrial Gear Wheel */}
          <circle cx="220" cy="115" r="42" stroke="#94A3B8" strokeWidth="4" strokeDasharray="16 10" />
          <circle cx="220" cy="115" r="28" fill="#1E293B" stroke="#CBD5E1" strokeWidth="2" />
          <circle cx="220" cy="115" r="10" fill="#0F172A" stroke="#94A3B8" strokeWidth="2" />
        </svg>
      );

    case 'building-construction':
      return (
        <svg className="w-full h-full" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="200" fill="#17120E" />
          <circle cx="180" cy="90" r="90" fill="#D97706" fillOpacity="0.2" filter="blur(30px)" />
          {/* Isometric Ceramic Tiles Stack */}
          <path d="M120 70 L180 50 L240 70 L180 90 Z" fill="#78716C" stroke="#D6D3D1" strokeWidth="1.5" />
          <path d="M120 70 L120 80 L180 100 L180 90 Z" fill="#57534E" stroke="#D6D3D1" strokeWidth="1" />
          <path d="M180 100 L240 80 L240 70 L180 90 Z" fill="#44403C" stroke="#D6D3D1" strokeWidth="1" />

          <path d="M120 95 L180 75 L240 95 L180 115 Z" fill="#A8A29E" stroke="#E7E5E4" strokeWidth="1.5" />
          <path d="M120 95 L120 105 L180 125 L180 115 Z" fill="#78716C" stroke="#E7E5E4" strokeWidth="1" />
          <path d="M180 125 L240 105 L240 95 L180 115 Z" fill="#57534E" stroke="#E7E5E4" strokeWidth="1" />

          {/* Construction Masonry Trowel */}
          <path d="M70 145 L110 120 L135 155 Z" fill="#D97706" stroke="#FDE68A" strokeWidth="1.5" />
          <path d="M100 135 L90 155 L75 165" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'consumer-electronics':
      return (
        <svg className="w-full h-full" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="200" fill="#081426" />
          <circle cx="210" cy="90" r="90" fill="#2563EB" fillOpacity="0.25" filter="blur(30px)" />
          {/* Smart Tablet / Display */}
          <rect x="70" y="55" width="110" height="85" rx="8" fill="#1E293B" stroke="#60A5FA" strokeWidth="1.5" />
          <rect x="76" y="61" width="98" height="73" rx="4" fill="#0F172A" />
          {/* Graph on screen */}
          <path d="M85 115 L105 95 L125 105 L155 75" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Smart Earbuds Charging Case */}
          <rect x="195" y="85" width="55" height="42" rx="14" fill="#0284C7" stroke="#93C5FD" strokeWidth="1.5" />
          <circle cx="222" cy="106" r="3" fill="#4ADE80" className="animate-ping" style={{ animationDuration: '3s' }} />
          {/* Audio Wave Soundbars */}
          <line x1="205" y1="145" x2="205" y2="160" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
          <line x1="215" y1="140" x2="215" y2="165" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <line x1="225" y1="135" x2="225" y2="170" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
          <line x1="235" y1="142" x2="235" y2="163" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'electronics-electrical':
      return (
        <svg className="w-full h-full" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="200" fill="#1A1504" />
          <circle cx="160" cy="100" r="90" fill="#CA8A04" fillOpacity="0.2" filter="blur(30px)" />
          {/* Industrial Modular Switch Box */}
          <rect x="75" y="65" width="75" height="85" rx="8" fill="#292524" stroke="#FDE047" strokeWidth="1.5" />
          <rect x="90" y="80" width="22" height="35" rx="4" fill="#CA8A04" stroke="#FEF08A" strokeWidth="1" />
          <rect x="118" y="80" width="22" height="35" rx="4" fill="#1C1917" stroke="#FEF08A" strokeWidth="1" />
          <circle cx="101" cy="90" r="3" fill="#22C55E" />
          {/* Coiled Copper Cables */}
          <path d="M175 140 C175 90 255 90 255 140" stroke="#F97316" strokeWidth="6" strokeLinecap="round" />
          <path d="M185 145 C185 105 245 105 245 145" stroke="#EAB308" strokeWidth="5" strokeLinecap="round" />
          <path d="M195 150 C195 120 235 120 235 150" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          {/* Electric Lightning Bolt */}
          <path d="M165 45 L150 75 H165 L155 105 L180 70 H165 Z" fill="#FACC15" />
        </svg>
      );

    case 'packaging':
      return (
        <svg className="w-full h-full" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="200" fill="#1A0F08" />
          <circle cx="210" cy="95" r="90" fill="#C2410C" fillOpacity="0.2" filter="blur(30px)" />
          {/* 3D Corrugated Shipping Carton Box */}
          <path d="M80 95 L140 70 L200 95 L140 120 Z" fill="#C2410C" stroke="#FDBA74" strokeWidth="1.5" />
          <path d="M80 95 L80 155 L140 180 L140 120 Z" fill="#9A3412" stroke="#FDBA74" strokeWidth="1.5" />
          <path d="M200 95 L200 155 L140 180 L140 120 Z" fill="#7C2D12" stroke="#FDBA74" strokeWidth="1.5" />
          {/* Packaging Tape */}
          <path d="M125 125 L125 175 L155 175 L155 125 Z" fill="#FBBF24" fillOpacity="0.8" />
          {/* Barcode & Fragile Glass Icon on Box */}
          <rect x="90" y="115" width="30" height="18" fill="#FFFBEB" />
          <line x1="94" y1="120" x2="94" y2="128" stroke="#000000" strokeWidth="1.5" />
          <line x1="98" y1="120" x2="98" y2="128" stroke="#000000" strokeWidth="2" />
          <line x1="102" y1="120" x2="102" y2="128" stroke="#000000" strokeWidth="1" />
          <line x1="106" y1="120" x2="106" y2="128" stroke="#000000" strokeWidth="2.5" />
          {/* Bubble Wrap Roll */}
          <ellipse cx="235" cy="140" rx="25" ry="35" fill="#431407" stroke="#FED7AA" strokeWidth="1.5" />
          <ellipse cx="235" cy="140" rx="12" ry="18" fill="#1A0F08" stroke="#FED7AA" strokeWidth="1" />
        </svg>
      );

    case 'business-services':
      return (
        <svg className="w-full h-full" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="200" fill="#0A0B1A" />
          <circle cx="160" cy="100" r="90" fill="#4338CA" fillOpacity="0.25" filter="blur(30px)" />
          {/* Growth Analytics Bar Charts */}
          <rect x="70" y="125" width="18" height="40" rx="3" fill="#6366F1" />
          <rect x="95" y="105" width="18" height="60" rx="3" fill="#818CF8" />
          <rect x="120" y="85" width="18" height="80" rx="3" fill="#A5B4FC" />
          <path d="M75 115 L104 95 L129 70 L165 50" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="165" cy="50" r="5" fill="#38BDF8" />
          {/* Mutual Verified Agreement Document */}
          <rect x="175" y="70" width="70" height="95" rx="6" fill="#1E1B4B" stroke="#C7D2FE" strokeWidth="1.5" />
          <line x1="188" y1="88" x2="228" y2="88" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
          <line x1="188" y1="100" x2="232" y2="100" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
          <line x1="188" y1="112" x2="218" y2="112" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
          {/* Security Shield Check */}
          <circle cx="210" cy="138" r="14" fill="#10B981" />
          <path d="M205 138 L209 142 L216 134" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    default:
      return (
        <div className="w-full h-full bg-gradient-to-br from-[#071A2B] to-[#0D263A] flex items-center justify-center">
          <Layers className="w-10 h-10 text-sky-400" />
        </div>
      );
  }
};

export const CategoryImageCard: React.FC<CategoryImageCardProps> = ({
  category,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden bg-[#0A192B] border border-slate-800 hover:border-[#D7A83D]/60 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${className}`}
    >
      {/* Visual Scenery Banner */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <CategoryIllustration slug={category.slug} name={category.name} />
        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192B] via-transparent to-transparent pointer-events-none" />

        {/* Live Opportunity Badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#071A2B]/85 backdrop-blur-xs border border-white/10 text-[11px] font-bold text-white shadow-sm flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: category.accentColor || '#38BDF8' }}
          />
          <span>{category.opportunityCount} Active Leads</span>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-[#F2D27B] transition-colors line-clamp-1">
            {category.name}
          </h3>
          <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Subcategories tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {category.subcategories.slice(0, 2).map((sub, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60 truncate max-w-[130px]"
            >
              {sub}
            </span>
          ))}
          {category.subcategories.length > 2 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/40 text-slate-400">
              +{category.subcategories.length - 2} more
            </span>
          )}
        </div>

        {/* Action Link */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#D7A83D] group-hover:text-white transition-colors">
          <span>Explore Sector Hub</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};

export default CategoryImageCard;
