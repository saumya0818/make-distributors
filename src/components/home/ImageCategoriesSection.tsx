import React from 'react';
import { Category } from '../../types';
import { ArrowRight, Grid } from 'lucide-react';
import { CategoryImageCard } from '../categories/CategoryImageCard';

interface ImageCategoriesSectionProps {
  categories: Category[];
  onSelectCategory: (slug: string) => void;
  onViewAllCategories: () => void;
}

export const ImageCategoriesSection: React.FC<ImageCategoriesSectionProps> = ({
  categories,
  onSelectCategory,
  onViewAllCategories,
}) => {
  return (
    <section className="bg-[#071A2B] text-white py-16 lg:py-24 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#D7A83D] mb-1.5 flex items-center gap-1.5">
              <Grid className="w-4 h-4 text-[#D7A83D]" />
              <span>Multi-Sector Industry Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Explore Image-Led Distribution Sectors
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Browse thousands of certified products and manufacturer franchise territories categorized across 12 high-velocity commercial sectors.
            </p>
          </div>

          <button
            onClick={onViewAllCategories}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F2D27B] hover:text-white transition-colors group cursor-pointer"
          >
            <span>View All 12 Sectors</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 12 Categories Visual Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryImageCard
              key={cat.id}
              category={cat}
              onClick={() => onSelectCategory(cat.slug)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCategoriesSection;
