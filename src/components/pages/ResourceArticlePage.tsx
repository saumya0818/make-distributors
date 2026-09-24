import React, { useEffect } from 'react';
import { RESOURCE_ARTICLES } from '../../data/sampleResources';
import { SEOHelmet } from '../layout/SEOHelmet';
import { ArrowLeft, Clock, User, ChevronRight, Share2, BookOpen, AlertCircle } from 'lucide-react';

interface ResourceArticlePageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onSelectArticle: (slug: string) => void;
}

export const ResourceArticlePage: React.FC<ResourceArticlePageProps> = ({
  slug,
  onNavigate,
  onSelectArticle,
}) => {
  const article = RESOURCE_ARTICLES.find((a) => a.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-[#102131]">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-[#071A2B]">Article Not Found</h2>
        <button
          onClick={() => onNavigate('/resources')}
          className="mt-4 px-5 py-2 rounded-lg bg-[#071A2B] text-white text-xs font-bold"
        >
          Back to Resource Centre
        </button>
      </div>
    );
  }

  const otherArticles = RESOURCE_ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <div className="bg-[#F5F7FA] min-h-screen pb-20 text-[#102131]">
      <SEOHelmet
        title={`${article.title} | Make Distributors Resources`}
        description={article.summary}
        schemaType="Article"
      />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => onNavigate('/')} className="hover:text-[#071A2B]">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button onClick={() => onNavigate('/resources')} className="hover:text-[#071A2B]">
            Resources
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-[#071A2B] truncate">{article.title}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <button
          onClick={() => onNavigate('/resources')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#071A2B] mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Guides</span>
        </button>

        <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          {/* Header */}
          <div className="space-y-3 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-bold text-[#071A2B] bg-slate-100 px-2.5 py-1 rounded-md">
                {article.category}
              </span>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.readTime}</span>
              </div>
              <span>·</span>
              <span>{article.publishedAt}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#071A2B] tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-base text-slate-600 leading-relaxed font-medium">
              {article.summary}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#071A2B] text-white font-bold flex items-center justify-center text-xs">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-bold text-[#071A2B]">{article.author.name}</div>
                <div className="text-[11px] text-slate-500">{article.author.role}</div>
              </div>
            </div>
          </div>

          {/* Article Text Content */}
          <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-4">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Summary Box */}
          <div className="mt-8 p-5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1.5">
            <div className="font-bold text-sm text-[#071A2B] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#D7A83D]" />
              <span>Make Distributors Editorial Takeaway</span>
            </div>
            <p className="leading-relaxed">
              Every distribution appointment should be supported by explicit territory boundary maps, verified storage audits, and transparent inventory rotation SLAs to protect both brand capital and distributor viability.
            </p>
          </div>
        </article>

        {/* Next Guides */}
        <div className="mt-12 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Recommended Next Reading
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherArticles.map((other) => (
              <button
                key={other.id}
                onClick={() => onSelectArticle(other.slug)}
                className="text-left p-4 rounded-xl bg-white border border-slate-200 hover:border-[#D7A83D] transition-colors group cursor-pointer shadow-xs"
              >
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">{other.category}</div>
                <div className="text-sm font-bold text-[#071A2B] group-hover:text-[#D7A83D] transition-colors leading-snug">
                  {other.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceArticlePage;
