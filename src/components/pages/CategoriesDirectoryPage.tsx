import React from 'react';
import { CATEGORIES_DATA } from '../../data/categories';
import { SEOHelmet } from '../layout/SEOHelmet';
import { Grid } from 'lucide-react';
import { CategoryImageCard } from '../categories/CategoryImageCard';

interface CategoriesDirectoryPageProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategoriesDirectoryPage: React.FC<CategoriesDirectoryPageProps> = ({
  onSelectCategory,
}) => {
  return (
    <div className="bg-[#071A2B] text-white min-h-screen py-12">
      <SEOHelmet
        title="Industry Categories & Sectors Directory | Make Distributors"
        description="Browse 12 high-growth industry sectors including Food & Beverage, Health, Automobile, Industrial Supplies, and Consumer Electronics."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D7A83D] mb-1.5 flex items-center gap-1.5">
            <Grid className="w-4 h-4 text-[#D7A83D]" />
            <span>Commercial Industry Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            12 Industry Distribution Sectors
          </h1>
          <p className="text-sm text-slate-300 mt-2">
            Explore dedicated distribution channels, OEM manufacturers, and certified regional stockists across major trade sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <CategoryImageCard
              key={cat.id}
              category={cat}
              onClick={() => onSelectCategory(cat.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesDirectoryPage;
