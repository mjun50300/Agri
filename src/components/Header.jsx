import React from 'react';
import { useApp } from '../context/AppContext';
import { apiClient } from '../api/apiClient';

export const Header = () => {
  const {
    currentUser,
    currentRole,
    lang,
    toggleLanguage,
    activeTab,
    setActiveTab,
    changeUser
  } = useApp();

  const translations = {
    en: {
      brand: "ZarZaraat",
      exchange: "AGRI EXCHANGE",
      home: "Home Spot",
      marketplace: "Market Terminal",
      dashboard: "My Workstation",
      wallet: "Escrow Wallet",
      langLabel: "Urdu",
      switchUser: "Switch User Session"
    },
    ur: {
      brand: "زر زراعت",
      exchange: "زرعی ایکسچینج",
      home: "ہوم اسپاٹ",
      marketplace: "مارکیٹ ٹرمینل",
      dashboard: "میرا ورک اسٹیشن",
      wallet: "ایسکرو والٹ",
      langLabel: "English",
      switchUser: "صارف تبدیل کریں"
    }
  };

  const t = translations[lang];

  return (
    <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-[#84CC16]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M5 12h14" />
            </svg>
            <div>
              <span className="text-lg font-black text-[#374151] tracking-tight uppercase block">{t.brand}</span>
              <span className="text-[9px] font-bold text-[#84CC16] tracking-widest block uppercase -mt-1">{t.exchange}</span>
            </div>
          </div>

          {/* Core Spot Naviation */}
          <nav className="hidden md:flex gap-1.5 bg-[#F8F9FA] rounded-xl p-1 border border-[#E5E7EB]">
            {[
              { id: "landing", label: t.home },
              { id: "marketplace", label: t.marketplace },
              { id: "dashboard", label: t.dashboard }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[#374151] text-white shadow-sm'
                      : 'text-gray-500 hover:text-[#374151]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions & Utilities */}
          <div className="flex items-center gap-4">

            {/* Quick Demo User Switcher */}
            <div className="hidden lg:flex items-center gap-2 border-r border-[#E5E7EB] pr-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase">{t.switchUser}:</span>
              <select
                onChange={(e) => changeUser(e.target.value)}
                value={currentUser ? currentUser.id : "u1"}
                className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-2 py-1 text-[11px] font-semibold text-[#374151] cursor-pointer"
              >
                <option value="u1">Tariq Khan (Farmer)</option>
                <option value="u2">Haroon Ahmed (Trader)</option>
                <option value="u3">Sarmad Malik (Buyer)</option>
                <option value="u5">Exchange Admin</option>
              </select>
            </div>

            {/* Multilingual Switcher */}
            <button
              onClick={toggleLanguage}
              className="bg-[#F8F9FA] hover:bg-[#ECFCCB] hover:text-[#4D7C0F] text-[#374151] border border-[#E5E7EB] text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>🌐</span> {t.langLabel}
            </button>

            {/* Wallet Info Badge */}
            {currentUser && (
              <div className="hidden sm:flex items-center gap-1 bg-[#ECFCCB] text-[#4D7C0F] border border-[#84CC16]/20 px-3 py-1.5 rounded-lg text-xs font-bold font-mono">
                PKR {currentUser.balance.toLocaleString()}
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
export default Header;
