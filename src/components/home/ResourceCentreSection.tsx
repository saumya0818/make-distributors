import React from 'react';
import { ResourceArticle } from '../../types';
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react';

interface ResourceCentreSectionProps {
  articles: ResourceArticle[];
  onSelectArticle: (slug: string) => void;
  onViewAll: () => void;
}

export const ResourceCentreSection: React.FC<ResourceCentreSectionProps> = ({
  articles,
  onSelectArticle,
  onViewAll,
}) => {
  return (
    <section className="bg-white py-16 lg:py-24 border-b border-slate-200 text-[#102131]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#C78519] mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#D7A83D]" />
              <span>Distribution Knowledge Centre</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#071A2B]">
              Insights for Channel Expansion
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Practical due-diligence checklists, margin evaluation models, and partner onboarding playbooks written by commercial trade specialists.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#071A2B] hover:text-[#D7A83D] transition-colors group cursor-pointer"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((art) => (
            <article
              key={art.id}
              onClick={() => onSelectArticle(art.slug)}
              className="rounded-2xl border border-slate-200 bg-[#F5F7FA] hover:border-[#D7A83D] hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-[#071A2B] bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#071A2B] group-hover:text-[#D7A83D] transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="px-6 py-4 bg-white border-t border-slate-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium text-[11px] truncate max-w-[140px]">{art.author.name}</span>
                </div>

                <span className="font-bold text-[#071A2B] group-hover:text-[#D7A83D] flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourceCentreSection;
