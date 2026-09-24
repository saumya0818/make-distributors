import React, { useState } from 'react';
import { RESOURCE_ARTICLES } from '../../data/sampleResources';
import { SEOHelmet } from '../layout/SEOHelmet';
import { BookOpen, Clock, User, ArrowRight, Search } from 'lucide-react';

interface ResourcesDirectoryPageProps {
  onSelectArticle: (slug: string) => void;
  onNavigate: (path: string) => void;
}

export const ResourcesDirectoryPage: React.FC<ResourcesDirectoryPageProps> = ({
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = Array.from(new Set(RESOURCE_ARTICLES.map((a) => a.category)));

  const filtered = RESOURCE_ARTICLES.filter((a) => {
    if (query.trim()) {
      const q = query.toLowerCase();
      if (!a.title.toLowerCase().includes(q) && !a.summary.toLowerCase().includes(q)) return false;
    }
    if (selectedCategory && a.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-10 text-[#102131]">
      <SEOHelmet
        title="B2B Distribution Knowledge Centre & Strategy Guides | Make Distributors"
        description="Master operational frameworks on appointing distributors, evaluating margins, and building high-conversion follow-up pipelines."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-wider text-[#C78519] mb-1 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#D7A83D]" />
            <span>Operational Trade Advisory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#071A2B]">
            Distribution Knowledge Centre
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Original strategy playbooks, legal territory checklists, and warehouse evaluation models curated for commercial channel executives.
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guides..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#D7A83D]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${
                !selectedCategory ? 'bg-[#071A2B] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Topics
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${
                  selectedCategory === c ? 'bg-[#071A2B] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((art) => (
            <article
              key={art.id}
              onClick={() => onSelectArticle(art.slug)}
              className="rounded-2xl border border-slate-200 bg-white hover:border-[#D7A83D] hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer group shadow-xs"
            >
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-[#071A2B] bg-slate-100 px-2.5 py-1 rounded-md">
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

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium text-[11px] truncate max-w-[140px]">{art.author.name}</span>
                </div>

                <span className="font-bold text-[#071A2B] group-hover:text-[#D7A83D] flex items-center gap-1">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesDirectoryPage;
