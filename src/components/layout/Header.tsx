import React, { useState, useEffect } from 'react';
import { MakeDistributorsLogo } from '../brand/MakeDistributorsLogo';
import { authService } from '../../services/auth';
import { UserProfile, UserRole } from '../../types';
import {
  Search,
  Menu,
  X,
  User,
  LogOut,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onOpenRequirement: () => void;
  onOpenCommandSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenAuth,
  onOpenRequirement,
  onOpenCommandSearch,
}) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(authService.getCurrentUser());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(authService.getCurrentUser());
    };
    window.addEventListener('nake_auth_update', handleAuthChange);
    return () => window.removeEventListener('nake_auth_update', handleAuthChange);
  }, []);

  const navLinks = [
    { label: 'Browse Opportunities', path: '/opportunities' },
    { label: 'Find Distributors', path: '/distributors' },
    { label: 'Categories', path: '/categories' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Resources', path: '/resources' },
    { label: 'About', path: '/about' },
  ];

  const handleRoleQuickSwitch = (role: UserRole) => {
    authService.switchRole(role);
    setIsProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-r from-[#E0F2FE]/95 via-[#F0F9FF]/95 to-[#E0F2FE]/95 backdrop-blur-md border-b border-[#BAE6FD] text-[#071A2B] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('/')}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7A83D] rounded-lg p-1 text-left transition-opacity hover:opacity-95"
            aria-label="Make Distributors Home"
          >
            <MakeDistributorsLogo size="md" variant="light" showWordmark={true} />
          </button>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-700" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`transition-colors whitespace-nowrap hover:text-[#0284C7] py-1 relative ${
                  isActive ? 'text-[#92400E] font-bold' : 'text-slate-700'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D7A83D] rounded-full shadow-xs" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Auth */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Quick Command Search Trigger */}
          <button
            onClick={onOpenCommandSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/80 text-slate-700 hover:text-[#071A2B] hover:bg-white text-xs font-medium border border-[#BAE6FD] hover:border-[#D7A83D] shadow-xs transition-colors"
            title="Global Search (Ctrl+K / ⌘K)"
            aria-label="Open Global Search"
          >
            <Search className="w-3.5 h-3.5 text-[#D7A83D]" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-slate-100 rounded border border-slate-200 text-slate-500 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Primary CTA: Post Requirement */}
          <button
            onClick={onOpenRequirement}
            className="px-3.5 py-2 text-xs sm:text-sm font-bold rounded-lg bg-[#D7A83D] hover:bg-[#C29632] text-[#071A2B] shadow-sm transition-all hover:shadow-[#D7A83D]/30 active:scale-98 whitespace-nowrap cursor-pointer border border-[#FDE68A]"
          >
            Post Requirement
          </button>

          {/* Authenticated / Visitor Profile State */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg bg-white border border-[#BAE6FD] hover:border-[#D7A83D] transition-colors text-xs text-left shadow-xs"
                aria-expanded={isProfileDropdownOpen}
                aria-haspopup="true"
              >
                <div className="w-7 h-7 rounded-md bg-[#D7A83D] text-[#071A2B] font-bold flex items-center justify-center text-xs">
                  {currentUser.fullName.charAt(0)}
                </div>
                <div className="hidden sm:block leading-tight">
                  <div className="font-semibold text-[#071A2B] truncate max-w-[90px]">
                    {currentUser.fullName.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-[#92400E] font-bold capitalize">
                    {currentUser.role}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white text-[#102131] shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <div className="font-bold text-sm text-[#071A2B] truncate">{currentUser.fullName}</div>
                    <div className="text-xs text-slate-500 truncate">{currentUser.email}</div>
                    <div className="mt-1.5 inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Role: {currentUser.role}
                    </div>
                  </div>

                  {/* Dashboard links based on role */}
                  <div className="py-1">
                    {currentUser.role === 'brand' && (
                      <button
                        onClick={() => {
                          onNavigate('/dashboard/brand');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                      >
                        <Layers className="w-3.5 h-3.5 text-[#D7A83D]" />
                        Brand Opportunities Dashboard
                      </button>
                    )}

                    {currentUser.role === 'distributor' && (
                      <button
                        onClick={() => {
                          onNavigate('/dashboard/distributor');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#D7A83D]" />
                        Distributor Partner Portal
                      </button>
                    )}

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          onNavigate('/dashboard/admin');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#D7A83D]" />
                        Admin Moderation Desk
                      </button>
                    )}
                  </div>

                  {/* Quick Role Tester for evaluation */}
                  <div className="px-4 py-2 border-t border-slate-100 bg-slate-50">
                    <div className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-1.5">
                      Switch Role Mode:
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {(['brand', 'distributor', 'admin'] as UserRole[]).map((r) => (
                        <button
                          key={r}
                          onClick={() => handleRoleQuickSwitch(r)}
                          className={`text-[10px] py-1 px-1 rounded text-center capitalize font-semibold transition-colors ${
                            currentUser.role === r
                              ? 'bg-[#071A2B] text-white'
                              : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        authService.logout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="px-3 py-2 text-xs sm:text-sm font-bold text-[#071A2B] hover:text-[#0284C7] transition-colors"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-[#071A2B] hover:bg-white/80 border border-[#BAE6FD]"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-[#071A2B]" /> : <Menu className="w-5 h-5 text-[#071A2B]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#E0F2FE] border-t border-[#BAE6FD] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                onNavigate(link.path);
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2.5 px-3 rounded-lg text-sm font-bold transition-colors ${
                currentPath === link.path
                  ? 'bg-white text-[#92400E] border border-[#D7A83D]/60 shadow-xs'
                  : 'text-slate-700 hover:bg-white/60 hover:text-[#071A2B]'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {!currentUser ? (
              <button
                onClick={() => {
                  onOpenAuth('login');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 text-center rounded-lg bg-[#0D263A] text-white font-medium text-sm"
              >
                Sign In / Register
              </button>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0D263A] text-xs">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#D7A83D]" />
                  <span>{currentUser.fullName}</span>
                </div>
                <button
                  onClick={() => {
                    authService.logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-red-400 hover:underline"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
