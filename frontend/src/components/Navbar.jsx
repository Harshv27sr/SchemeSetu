import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Globe, User, LogOut, LayoutDashboard, Search, FileText, Sun, Moon } from 'lucide-react';
import logoDark from '../assets/logo-dark.jpg';
import logoLight from '../assets/logo-light.jpg';

const Navbar = () => {
  const { user, logout, language, setLanguage, t, theme, toggleTheme } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    
    // Trigger Google Translate
    setTimeout(() => {
      try {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
          select.value = newLang;
          select.dispatchEvent(new Event('change'));
        }
      } catch (e) {
        console.error("Google Translate error:", e);
      }
    }, 100);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const activeClassName = ({ isActive }) =>
    `inline-flex items-center justify-center px-4 py-2 rounded-xl text-lg font-bold leading-none transition-all duration-300 ${
      isActive
        ? 'bg-govblue-50 dark:bg-govblue-900/30 text-govblue-600 dark:text-govblue-400 shadow-sm shadow-govblue-100/50 dark:shadow-none'
        : 'text-slate-600 dark:text-slate-300 hover:text-govblue-600 dark:hover:text-govblue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
    }`;

  const mobileActiveClassName = ({ isActive }) =>
    `flex items-center space-x-2 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
      isActive
        ? 'bg-govblue-50 dark:bg-govblue-900/30 text-govblue-600 dark:text-govblue-400'
        : 'text-slate-600 dark:text-slate-300 hover:text-govblue-600 dark:hover:text-govblue-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
    }`;

  return (
    <nav className="sticky top-0 z-50 glass-panel shadow-sm border-b border-slate-100/60 dark:border-white/5 backdrop-blur-md">
      {/* Tricolor digital ribbon at very top */}
      <div className="h-[3px] w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src={theme === 'dark' ? logoDark : logoLight} 
              alt="SchemeSetu Logo" 
              className="w-12 h-12 object-contain group-hover:scale-105 transition-all duration-300 mix-blend-multiply dark:mix-blend-screen"
            />
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-extrabold text-govblue-900 dark:text-white tracking-tight leading-none">SchemeSetu</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/" className={activeClassName}>
              {t('home')}
            </NavLink>
            <NavLink to="/schemes" className={activeClassName}>
              {t('schemes')}
            </NavLink>
            <NavLink to="/about" className={activeClassName}>
              {t('about')}
            </NavLink>

            {user && (
              <>
                <NavLink to="/dashboard" className={activeClassName}>
                  {t('dashboard')}
                </NavLink>
                <NavLink to="/profile" className={activeClassName}>
                  {t('profile')}
                </NavLink>
                {user.role === 'Admin' && (
                  <NavLink to="/admin" className={activeClassName}>
                    {t('adminDashboard')}
                  </NavLink>
                )}
              </>
            )}
          </div>

          {/* Utility buttons (Lang Toggle, Theme Toggle, Profile, Login/Logout) */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Language Toggler */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-slate-100/60 dark:bg-slate-800/80 hover:bg-govblue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-govblue-600 dark:hover:text-govblue-400 rounded-xl text-lg font-bold leading-none border border-slate-200/50 dark:border-slate-700/50 hover:border-govblue-200/50 dark:hover:border-govblue-500/50 transition-all duration-300 cursor-pointer"
              title="Change Language / भाषा बदलें"
            >
              <Globe className="w-4 h-4 animate-spin-slow text-slate-500 dark:text-slate-400" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Theme Toggler */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center p-2 bg-slate-100/60 dark:bg-slate-800/80 hover:bg-govblue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-govblue-600 dark:hover:text-govblue-400 rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:border-govblue-200/50 dark:hover:border-govblue-500/50 transition-all duration-300 cursor-pointer"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-4.5 h-4.5 text-slate-500" />
              ) : (
                <Sun className="w-4.5 h-4.5 text-amber-400 animate-pulse" />
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-3 bg-slate-50 border border-slate-100 rounded-2xl p-1.5 pl-3">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-slate-800 leading-tight">{user.name}</span>
                  <span className="text-xs font-bold text-govgreen-600 bg-govgreen-50 px-1.5 py-0.5 rounded-full mt-0.5 uppercase leading-none">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 bg-white text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-100 rounded-xl transition-all duration-300 cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-4.5 py-2 text-lg font-bold leading-none text-slate-700 hover:text-govblue-600 transition-all"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-5 py-2 text-lg font-bold leading-none text-white bg-govblue-600 hover:bg-govblue-700 rounded-xl shadow-md shadow-govblue-100 hover:shadow-lg transition-all duration-300"
                >
                  {t('signup')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-bold transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Mobile Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg transition-all cursor-pointer flex items-center justify-center"
            >
              {theme === 'light' ? (
                <Moon className="w-3.5 h-3.5" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-govblue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Expandable menu) */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1">
            <NavLink to="/" onClick={() => setIsOpen(false)} className={mobileActiveClassName}>
              <Search className="w-4 h-4" />
              <span>{t('home')}</span>
            </NavLink>
            <NavLink to="/schemes" onClick={() => setIsOpen(false)} className={mobileActiveClassName}>
              <Search className="w-4 h-4" />
              <span>{t('schemes')}</span>
            </NavLink>
            <NavLink to="/about" onClick={() => setIsOpen(false)} className={mobileActiveClassName}>
              <Search className="w-4 h-4" />
              <span>{t('about')}</span>
            </NavLink>

            {user ? (
              <>
                <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className={mobileActiveClassName}>
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{t('dashboard')}</span>
                </NavLink>
                <NavLink to="/profile" onClick={() => setIsOpen(false)} className={mobileActiveClassName}>
                  <User className="w-4 h-4" />
                  <span>{t('profile')}</span>
                </NavLink>
                {user.role === 'Admin' && (
                  <NavLink to="/admin" onClick={() => setIsOpen(false)} className={mobileActiveClassName}>
                    <FileText className="w-4 h-4" />
                    <span>{t('adminDashboard')}</span>
                  </NavLink>
                )}
                
                <div className="border-t border-slate-100 my-2 pt-2"></div>
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-govblue-600 text-white flex items-center justify-center font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800 leading-tight">{user.name}</span>
                      <span className="text-xs text-govgreen-600 font-bold uppercase">{user.role}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-sm font-bold transition-all cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 p-2 pt-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-all"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-govblue-600 text-white font-semibold shadow-md shadow-govblue-100 transition-all"
                >
                  {t('signup')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
