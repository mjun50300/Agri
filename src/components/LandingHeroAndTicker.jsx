import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getIconForCommodity } from './common/CommodityIcons';
import { MANDI_CITIES } from '../api/apiClient';

export const LandingHeroAndTicker = () => {
  const { lang, mandiPrices, setActiveTab, showToast } = useApp();
  const [selectedCity, setSelectedCity] = useState("Sahiwal");

  const translations = {
    en: {
      heroTitle: "Pakistan's Premier Agricultural Commodity Exchange",
      heroSubtitle: "A premium financial trading platform connecting farmers, industrial buyers, brokers, and logistics networks securely with verified market intelligence.",
      getStarted: "Start Trading",
      marketIntelligence: "Market Intelligence",
      liveTicker: "LIVE EXCHANGE TICKER",
      mandiOverview: "Pakistan Mandi Price Index",
      filterCity: "Filter Mandi Prices by City",
      commodity: "Commodity",
      grade: "Grade",
      priceMaund: "Price (Per 40kg / Maund)",
      change24h: "24h Trend",
      verifiedFarmers: "Verified Members",
      dailyVolume: "Daily Volume",
      activeContracts: "Active Auctions",
    },
    ur: {
      heroTitle: "پاکستان کا سب سے بڑا زرعی کموڈٹی ایکسچینج",
      heroSubtitle: "ایک پریمیم مالیاتی تجارتی پلیٹ فارم جو کسانوں، صنعتی خریداروں، اور لاجسٹکس نیٹ ورکس کو تصدیق شدہ مارکیٹ انٹیلیجنس کے ساتھ محفوظ طریقے سے جوڑتا ہے۔",
      getStarted: "تجارت شروع کریں",
      marketIntelligence: "مارکیٹ انٹیلیجنس",
      liveTicker: "لائیو ایکسچینج ٹکر",
      mandiOverview: "پاکستان منڈی پرائس انڈیکس",
      filterCity: "منڈی کی قیمتیں منتخب کریں",
      commodity: "کموڈٹی",
      grade: "گریڈ",
      priceMaund: "قیمت (فی 40 کلوگرام / من)",
      change24h: "24 گھنٹے کا رجحان",
      verifiedFarmers: "تصدیق شدہ ممبران",
      dailyVolume: "روزانہ کا حجم",
      activeContracts: "فعال نیلامی",
    }
  };

  const t = translations[lang];

  // List of ticking elements
  const tickerItems = [
    { name: "Basmati Rice Super", price: "PKR 9,800", change: "+1.5%", up: true },
    { name: "Sargodha Wheat A", price: "PKR 3,950", change: "+1.2%", up: true },
    { name: "Multan Cotton Bales", price: "PKR 9,150", change: "-1.0%", up: false },
    { name: "Okara Maize Premium", price: "PKR 3,050", change: "+1.1%", up: true },
    { name: "Faisalabad Sugarcane", price: "PKR 480", change: "+0.5%", up: true },
    { name: "Khanewal Canola", price: "PKR 8,400", change: "0.0%", up: null },
    { name: "IRRI-6 Rice", price: "PKR 6,100", change: "-0.8%", up: false }
  ];

  const filteredPrices = mandiPrices.filter(p => p.city === selectedCity);

  return (
    <div className="w-full bg-[#F8F9FA]">
      {/* 1. Animated Commodity Ticker */}
      <div className="w-full bg-white border-b border-[#E5E7EB] py-2.5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-[#84CC16]/10 text-[#4D7C0F] text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" />
            {t.liveTicker}
          </div>
          <div className="flex items-center gap-8 ml-6 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap text-xs font-semibold text-[#374151]">
            <div className="animate-marquee flex gap-8 items-center">
              {tickerItems.concat(tickerItems).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 border-r border-[#E5E7EB] pr-8">
                  <span className="text-[#374151] font-bold uppercase">{item.name}</span>
                  <span className="font-mono">{item.price}</span>
                  <span className={`font-mono text-[10px] px-1 py-0.2 rounded ${
                    item.up === true
                      ? 'bg-emerald-50 text-[#84CC16]'
                      : item.up === false
                        ? 'bg-red-50 text-red-500'
                        : 'bg-gray-100 text-gray-500'
                  }`}>
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#ECFCCB] text-[#4D7C0F] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="text-[#D4AF37]">✦</span> Premium Exchange Platform
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#374151] leading-[1.1] tracking-tight">
              {t.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setActiveTab("marketplace")}
                className="bg-[#84CC16] hover:bg-[#ECFCCB] hover:text-[#4D7C0F] text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md shadow-[#84CC16]/20 text-sm tracking-wide"
              >
                {t.getStarted}
              </button>
              <button
                onClick={() => {
                  setActiveTab("marketplace");
                  showToast("Opening Market intelligence and graphs...", "info");
                }}
                className="bg-white hover:bg-[#F8F9FA] text-[#374151] border border-[#E5E7EB] font-bold px-8 py-3.5 rounded-xl transition-all duration-300 text-sm shadow-sm"
              >
                {t.marketIntelligence}
              </button>
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E5E7EB]">
              <div>
                <span className="text-2xl font-black text-[#374151]">24,500+</span>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">{t.verifiedFarmers}</p>
              </div>
              <div>
                <span className="text-2xl font-black text-[#84CC16]">PKR 14.8B+</span>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">{t.dailyVolume}</p>
              </div>
              <div>
                <span className="text-2xl font-black text-[#D4AF37]">1,200+</span>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">{t.activeContracts}</p>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Column - Premium Stock Exchange Board */}
          <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-[24px] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.03)] space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
                <span className="text-xs font-bold text-[#374151] tracking-wide">LIVE PAKISTAN MANDI PRICES</span>
              </div>
              <div className="bg-[#F8F9FA] px-2.5 py-1 rounded text-[10px] font-bold text-gray-400">
                DAILY BENCHMARK
              </div>
            </div>

            {/* City Selector */}
            <div className="flex flex-wrap gap-1.5">
              {MANDI_CITIES.slice(0, 5).map(city => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCity === city
                      ? 'bg-[#ECFCCB] text-[#4D7C0F] border border-[#84CC16]/30'
                      : 'bg-[#F8F9FA] text-gray-500 border border-[#E5E7EB] hover:bg-white'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* Price Table */}
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
              {filteredPrices.length > 0 ? (
                filteredPrices.map((price, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-[#F8F9FA] hover:bg-[#ECFCCB]/20 rounded-xl border border-[#E5E7EB]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getIconForCommodity(price.category, "w-8 h-8")}
                      <div>
                        <span className="text-xs font-bold text-[#374151] block">{price.category}</span>
                        <span className="text-[10px] text-gray-400 font-semibold uppercase">{price.grade}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#374151] font-mono block">PKR {price.price}</span>
                      <span className={`text-[10px] font-bold ${price.change >= 0 ? 'text-[#84CC16]' : 'text-red-500'}`}>
                        {price.change >= 0 ? '▲' : '▼'} {Math.abs(price.change)}%
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-gray-400 font-medium">
                  No direct listings for {selectedCity} today. Check other mandi nodes.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingHeroAndTicker;
