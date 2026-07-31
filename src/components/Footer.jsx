import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer = () => {
  const { lang, setActiveTab } = useApp();

  const translations = {
    en: {
      tagline: "Pakistan's Premier Commodity Exchange for modern agriculture.",
      disclaimer: "ZarZaraat is licensed and monitored under PMEX, SECP and local food cooperative guidelines. All digital escrow receipts are legally protected.",
      rights: "All rights reserved. Built with pride for Pakistan's agri sector.",
      sitemap: "Market Sitemap",
      cities: "Regional Mandis"
    },
    ur: {
      tagline: "جدید زراعت کے لیے پاکستان کا سب سے بڑا زرعی کموڈٹی ایکسچینج۔",
      disclaimer: "زر زراعت کو پی ایم ای ایکس، ایس ای سی پی اور مقامی فوڈ کوآپریٹو ہدایات کے تحت لائسنس دیا گیا ہے۔ تمام ڈیجیٹل ایسکرو فنڈز قانونی طور پر محفوظ ہیں۔",
      rights: "جملہ حقوق محفوظ ہیں۔ پاکستان کے زرعی شعبے کے لیے فخر کے ساتھ تیار کیا گیا۔",
      sitemap: "سائٹ میپ",
      cities: "علاقائی منڈیاں"
    }
  };

  const t = translations[lang];

  return (
    <footer className="bg-white border-t border-[#E5E7EB] pt-12 pb-6 mt-16 text-xs text-gray-400 font-medium leading-relaxed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

        {/* Brand Col */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#374151] font-black text-sm uppercase">
            <svg className="w-5 h-5 text-[#84CC16]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M5 12h14" />
            </svg>
            ZarZaraat Exchange
          </div>
          <p className="text-gray-400">{t.tagline}</p>
          <div className="flex gap-3 text-xs font-bold text-gray-400">
            <span>PK-EXCHANGE</span> <span>SECURED</span>
          </div>
        </div>

        {/* Sitemap */}
        <div className="space-y-3">
          <h5 className="font-extrabold text-[#374151] tracking-wider uppercase text-[10px]">{t.sitemap}</h5>
          <ul className="space-y-2 font-semibold">
            <li><button onClick={() => setActiveTab("landing")} className="hover:text-[#84CC16]">Home Spot</button></li>
            <li><button onClick={() => setActiveTab("marketplace")} className="hover:text-[#84CC16]">Market Terminal</button></li>
            <li><button onClick={() => setActiveTab("dashboard")} className="hover:text-[#84CC16]">My Workstation</button></li>
          </ul>
        </div>

        {/* Regional Mandis */}
        <div className="space-y-3">
          <h5 className="font-extrabold text-[#374151] tracking-wider uppercase text-[10px]">{t.cities}</h5>
          <ul className="space-y-1 text-[11px] grid grid-cols-2 gap-1">
            <li>Lahore</li>
            <li>Faisalabad</li>
            <li>Sahiwal</li>
            <li>Okara</li>
            <li>Multan</li>
            <li>Karachi</li>
            <li>Peshawar</li>
            <li>Quetta</li>
          </ul>
        </div>

        {/* Legal Disclaimer */}
        <div className="space-y-3">
          <h5 className="font-extrabold text-[#374151] tracking-wider uppercase text-[10px]">REGULATORY & LEGAL</h5>
          <p className="text-[11px] text-gray-400 leading-normal">
            {t.disclaimer}
          </p>
        </div>

      </div>

      {/* Credits Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#E5E7EB] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} ZarZaraat Exchange PK. {t.rights}</p>
        <div className="flex gap-4 font-semibold">
          <span className="hover:text-black cursor-pointer">Sitemap</span>
          <span className="hover:text-black cursor-pointer">Robots.txt</span>
          <span className="hover:text-black cursor-pointer">Security Audited</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
