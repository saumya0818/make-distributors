import React, { useState, useEffect } from 'react';
import { db } from './services/db';
import { authService } from './services/auth';
import { BrandOpportunity, DistributorProfile, Category, ResourceArticle } from './types';
import { RESOURCE_ARTICLES } from './data/sampleResources';

// Layout & Global Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SEOHelmet from './components/layout/SEOHelmet';

// Homepage Sections
import HeroSection from './components/home/HeroSection';
import QuickRequirementSection from './components/home/QuickRequirementSection';
import DistributorLeadsSection from './components/home/DistributorLeadsSection';
import FeaturedBrandsSection from './components/home/FeaturedBrandsSection';
import ImageCategoriesSection from './components/home/ImageCategoriesSection';
import Network3DSection from './components/home/Network3DSection';
import HowItWorksSection from './components/home/HowItWorksSection';
import BusinessRoleExplorer from './components/home/BusinessRoleExplorer';
import ResourceCentreSection from './components/home/ResourceCentreSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import InteractiveEarthSection from './components/home/InteractiveEarthSection';
import FinalCTASection from './components/home/FinalCTASection';

// Modals
import GlobalCommandSearch from './components/modals/GlobalCommandSearch';
import OpportunityComparisonModal from './components/modals/OpportunityComparisonModal';
import EnquiryModal from './components/modals/EnquiryModal';
import AuthModal from './components/modals/AuthModal';
import PostRequirementModal from './components/modals/PostRequirementModal';

// Dedicated Pages
import BrowseOpportunitiesPage from './components/pages/BrowseOpportunitiesPage';
import OpportunityDetailPage from './components/pages/OpportunityDetailPage';
import DistributorsDirectoryPage from './components/pages/DistributorsDirectoryPage';
import DistributorDetailPage from './components/pages/DistributorDetailPage';
import ResourcesDirectoryPage from './components/pages/ResourcesDirectoryPage';
import ResourceArticlePage from './components/pages/ResourceArticlePage';
import CategoriesDirectoryPage from './components/pages/CategoriesDirectoryPage';
import BrandDashboardPage from './components/pages/BrandDashboardPage';
import DistributorDashboardPage from './components/pages/DistributorDashboardPage';
import AdminModerationDeskPage from './components/pages/AdminModerationDeskPage';
import {
  AboutPage,
  ContactPage,
  PrivacyPolicyPage,
  TermsPage,
  FaqPage,
} from './components/pages/StaticPages';

import { Layers, X } from 'lucide-react';

export function App() {
  // Navigation Path
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // State
  const [opportunities, setOpportunities] = useState<BrandOpportunity[]>(() => db.getOpportunities());
  const [distributors, setDistributors] = useState<DistributorProfile[]>(() => db.getDistributors());
  const [categories] = useState<Category[]>(() => db.getCategories());
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>(() => db.getSavedOpportunityIds());

  // Comparison drawer state
  const [comparedOpportunities, setComparedOpportunities] = useState<BrandOpportunity[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Search filter query state passed from Hero
  const [heroSearchParams, setHeroSearchParams] = useState<{
    query?: string;
    category?: string;
    state?: string;
    investment?: string;
  }>({});

  // Active Role filter passed from footer or role explorer
  const [activeRoleFilter, setActiveRoleFilter] = useState('');

  // Modal Visibility
  const [isCommandSearchOpen, setIsCommandSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isRequirementModalOpen, setIsRequirementModalOpen] = useState(false);
  const [enquiryTargetOpp, setEnquiryTargetOpp] = useState<BrandOpportunity | null>(null);
  const [enquiryTargetDist, setEnquiryTargetDist] = useState<DistributorProfile | null>(null);

  // Sync DB changes across browser tabs & events
  useEffect(() => {
    const handleDbUpdate = () => {
      setOpportunities(db.getOpportunities());
      setDistributors(db.getDistributors());
      setSavedOpportunityIds(db.getSavedOpportunityIds());
    };
    window.addEventListener('nake_db_update', handleDbUpdate);
    return () => window.removeEventListener('nake_db_update', handleDbUpdate);
  }, []);

  // Handle browser popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Save
  const handleToggleSave = (oppId: string) => {
    db.toggleSaveOpportunity(oppId);
    setSavedOpportunityIds(db.getSavedOpportunityIds());
  };

  // Toggle Compare (Max 3)
  const handleToggleCompare = (opp: BrandOpportunity) => {
    if (comparedOpportunities.some((o) => o.id === opp.id)) {
      setComparedOpportunities(comparedOpportunities.filter((o) => o.id !== opp.id));
    } else {
      if (comparedOpportunities.length >= 3) {
        alert('You can compare a maximum of 3 opportunities simultaneously.');
        return;
      }
      setComparedOpportunities([...comparedOpportunities, opp]);
    }
  };

  const handleHeroSearch = (params: { query?: string; category?: string; state?: string; investment?: string }) => {
    setHeroSearchParams(params);
    navigateTo('/opportunities');
  };

  const handleOpenEnquiryOpp = (opp: BrandOpportunity) => {
    setEnquiryTargetDist(null);
    setEnquiryTargetOpp(opp);
  };

  const handleOpenEnquiryDist = (dist: DistributorProfile) => {
    setEnquiryTargetOpp(null);
    setEnquiryTargetDist(dist);
  };

  // Routing renderer
  const renderCurrentView = () => {
    // 1. Single Opportunity Detail Page: /opportunities/:slug
    if (currentPath.startsWith('/opportunities/') && currentPath !== '/opportunities') {
      const slug = currentPath.replace('/opportunities/', '');
      return (
        <OpportunityDetailPage
          slug={slug}
          onNavigate={navigateTo}
          onOpenEnquiry={handleOpenEnquiryOpp}
          onSelectSimilar={(simSlug) => navigateTo(`/opportunities/${simSlug}`)}
        />
      );
    }

    // 2. Single Distributor Detail Page: /distributors/:slug
    if (currentPath.startsWith('/distributors/') && currentPath !== '/distributors') {
      const slug = currentPath.replace('/distributors/', '');
      return (
        <DistributorDetailPage
          slug={slug}
          onNavigate={navigateTo}
          onOpenEnquiry={handleOpenEnquiryDist}
        />
      );
    }

    // 3. Single Resource Article: /resources/:slug
    if (currentPath.startsWith('/resources/') && currentPath !== '/resources') {
      const slug = currentPath.replace('/resources/', '');
      return (
        <ResourceArticlePage
          slug={slug}
          onNavigate={navigateTo}
          onSelectArticle={(artSlug) => navigateTo(`/resources/${artSlug}`)}
        />
      );
    }

    // 4. Main Browse Opportunities Page
    if (currentPath === '/opportunities') {
      return (
        <BrowseOpportunitiesPage
          opportunities={opportunities}
          savedIds={savedOpportunityIds}
          comparedIds={comparedOpportunities.map((o) => o.id)}
          onToggleSave={handleToggleSave}
          onToggleCompare={handleToggleCompare}
          onViewOpportunity={(slug) => navigateTo(`/opportunities/${slug}`)}
          onSendEnquiry={handleOpenEnquiryOpp}
          initialCategory={heroSearchParams.category}
          initialQuery={heroSearchParams.query}
          initialState={heroSearchParams.state}
          initialInvestment={heroSearchParams.investment}
        />
      );
    }

    // 5. Distributors Directory
    if (currentPath === '/distributors') {
      return (
        <DistributorsDirectoryPage
          distributors={distributors}
          onViewProfile={(slug) => navigateTo(`/distributors/${slug}`)}
          onSendEnquiry={handleOpenEnquiryDist}
          initialRole={activeRoleFilter}
        />
      );
    }

    // 6. Categories Directory
    if (currentPath === '/categories') {
      return (
        <CategoriesDirectoryPage
          onSelectCategory={(catName) => {
            setHeroSearchParams({ category: catName });
            navigateTo('/opportunities');
          }}
        />
      );
    }

    // 7. Resource Knowledge Centre
    if (currentPath === '/resources') {
      return (
        <ResourcesDirectoryPage
          onSelectArticle={(slug) => navigateTo(`/resources/${slug}`)}
          onNavigate={navigateTo}
        />
      );
    }

    // 8. Static Informational & Legal Pages
    if (currentPath === '/about') return <AboutPage onNavigate={navigateTo} />;
    if (currentPath === '/contact') return <ContactPage onNavigate={navigateTo} />;
    if (currentPath === '/privacy') return <PrivacyPolicyPage onNavigate={navigateTo} />;
    if (currentPath === '/terms') return <TermsPage onNavigate={navigateTo} />;
    if (currentPath === '/faq') return <FaqPage onNavigate={navigateTo} />;
    if (currentPath === '/how-it-works') {
      return (
        <div className="py-12 bg-white">
          <HowItWorksSection onGetStarted={() => setIsRequirementModalOpen(true)} />
        </div>
      );
    }

    // 9. Dashboards
    if (currentPath === '/dashboard/brand') {
      return (
        <BrandDashboardPage
          onNavigate={navigateTo}
          onViewOpportunity={(slug) => navigateTo(`/opportunities/${slug}`)}
        />
      );
    }

    if (currentPath === '/dashboard/distributor') {
      return (
        <DistributorDashboardPage
          onNavigate={navigateTo}
          onViewOpportunity={(slug) => navigateTo(`/opportunities/${slug}`)}
        />
      );
    }

    if (currentPath === '/dashboard/admin') {
      return <AdminModerationDeskPage />;
    }

    // Default: Full Homepage
    return (
      <main>
        {/* 1. SEO Head */}
        <SEOHelmet
          title="Make Distributors – Where Brands Meet Growth Partners."
          description="Connect brands, manufacturers, wholesalers, suppliers, and distributors through Make Distributors. Where Brands Meet Growth Partners."
        />

        {/* 2. Hero Section */}
        <HeroSection onSearch={handleHeroSearch} onNavigate={navigateTo} />

        {/* 3. Quick Requirement Intake (Directly below Hero) */}
        <QuickRequirementSection />

        {/* 4. Latest Verified Distributor Leads */}
        <DistributorLeadsSection
          distributors={distributors}
          onViewProfile={(slug) => navigateTo(`/distributors/${slug}`)}
          onSendEnquiry={handleOpenEnquiryDist}
          onViewAll={() => navigateTo('/distributors')}
        />

        {/* 5. Featured Brand Opportunities */}
        <FeaturedBrandsSection
          opportunities={opportunities}
          savedIds={savedOpportunityIds}
          onToggleSave={handleToggleSave}
          onViewOpportunity={(slug) => navigateTo(`/opportunities/${slug}`)}
          onSendEnquiry={handleOpenEnquiryOpp}
          onViewAll={() => navigateTo('/opportunities')}
        />

        {/* 6. Image-Led Categories Section */}
        <ImageCategoriesSection
          categories={categories}
          onSelectCategory={(slug) => {
            const cat = categories.find((c) => c.slug === slug);
            setHeroSearchParams({ category: cat?.name });
            navigateTo('/opportunities');
          }}
          onViewAllCategories={() => navigateTo('/categories')}
        />

        {/* 7. Large 3D Distribution Network Section (Placed BELOW Categories) */}
        <Network3DSection onExplore={() => navigateTo('/opportunities')} />

        {/* 8. How It Works Section */}
        <HowItWorksSection onGetStarted={() => setIsRequirementModalOpen(true)} />

        {/* 9. Business Role Explorer */}
        <BusinessRoleExplorer
          onSelectRole={(role) => {
            setActiveRoleFilter(role);
            if (role === 'brands' || role === 'manufacturers') {
              navigateTo('/opportunities');
            } else {
              navigateTo('/distributors');
            }
          }}
        />

        {/* 10. Resource Centre Section */}
        <ResourceCentreSection
          articles={RESOURCE_ARTICLES}
          onSelectArticle={(slug) => navigateTo(`/resources/${slug}`)}
          onViewAll={() => navigateTo('/resources')}
        />

        {/* 11. Testimonials Section */}
        <TestimonialsSection />

        {/* 12. Interactive Earth Representation - Global & Domestic Distribution Corridors with Location Details */}
        <InteractiveEarthSection
          onNavigate={navigateTo}
          onOpenRequirement={() => setIsRequirementModalOpen(true)}
        />

        {/* 13. Final High-Impact CTA */}
        <FinalCTASection
          onPostRequirement={() => setIsRequirementModalOpen(true)}
          onCreateProfile={() => {
            setAuthMode('signup');
            setIsAuthModalOpen(true);
          }}
        />
      </main>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F9FF] text-[#071A2B] font-sans selection:bg-[#D7A83D]/30 selection:text-[#071A2B]">
      {/* Global Sticky Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenAuth={(mode) => {
          setAuthMode(mode || 'login');
          setIsAuthModalOpen(true);
        }}
        onOpenRequirement={() => setIsRequirementModalOpen(true)}
        onOpenCommandSearch={() => setIsCommandSearchOpen(true)}
      />

      {/* Main Routed Page View */}
      <div className="flex-1 bg-white">{renderCurrentView()}</div>

      {/* Floating Comparison Drawer (When 1-3 opportunities selected) */}
      {comparedOpportunities.length > 0 && (
        <div className="fixed bottom-5 right-5 z-40 bg-white text-[#071A2B] border-2 border-[#D7A83D] p-3.5 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D7A83D] text-[#071A2B] font-black flex items-center justify-center text-xs">
              {comparedOpportunities.length}
            </div>
            <div>
              <div className="text-xs font-bold">Comparing Brands</div>
              <div className="text-[10px] text-slate-500">Up to 3 side-by-side</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-[#D7A83D] hover:bg-[#C29632] text-[#071A2B] font-bold text-xs cursor-pointer shadow-xs"
            >
              Compare Now
            </button>
            <button
              onClick={() => setComparedOpportunities([])}
              className="p-1.5 text-slate-400 hover:text-white rounded-md cursor-pointer"
              title="Clear comparison selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Global Command Search Modal (⌘K) */}
      <GlobalCommandSearch
        isOpen={isCommandSearchOpen}
        onClose={() => setIsCommandSearchOpen(false)}
        opportunities={opportunities}
        categories={categories}
        distributors={distributors}
        resources={RESOURCE_ARTICLES}
        onSelectOpportunity={(slug) => navigateTo(`/opportunities/${slug}`)}
        onSelectCategory={(slug) => {
          const cat = categories.find((c) => c.slug === slug);
          setHeroSearchParams({ category: cat?.name });
          navigateTo('/opportunities');
        }}
        onSelectDistributor={(slug) => navigateTo(`/distributors/${slug}`)}
        onSelectResource={(slug) => navigateTo(`/resources/${slug}`)}
      />

      {/* Comparison Modal */}
      <OpportunityComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        opportunities={comparedOpportunities}
        onRemove={(id) => setComparedOpportunities(comparedOpportunities.filter((o) => o.id !== id))}
        onSendEnquiry={handleOpenEnquiryOpp}
        onViewDetails={(slug) => navigateTo(`/opportunities/${slug}`)}
      />

      {/* Direct Enquiry Modal */}
      <EnquiryModal
        isOpen={!!enquiryTargetOpp || !!enquiryTargetDist}
        onClose={() => {
          setEnquiryTargetOpp(null);
          setEnquiryTargetDist(null);
        }}
        targetOpportunity={enquiryTargetOpp}
        targetDistributor={enquiryTargetDist}
      />

      {/* Auth Modal (Login / Signup / Password Reset) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />

      {/* Fast Requirement Modal */}
      <PostRequirementModal
        isOpen={isRequirementModalOpen}
        onClose={() => setIsRequirementModalOpen(false)}
      />
    </div>
  );
}

export default App;
