import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { apiClient, DEFAULT_COMMODITIES, MANDI_CITIES } from '../../api/apiClient';
import { getIconForCommodity } from '../../components/common/CommodityIcons';

export const Marketplace = () => {
  const { lang, listings, setSelectedCommodity, showToast, reloadData } = useApp();

  // States for search and filter parameters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [tradeType, setTradeType] = useState("All"); // "All", "Direct", "Auction"
  const [exportReady, setExportReady] = useState(false);
  const [maxMoisture, setMaxMoisture] = useState(18);
  const [minPurity, setMinPurity] = useState(90);

  // Sorting
  const [sortBy, setSortBy] = useState("newest");

  // Dynamic search filtering
  const filteredListings = listings.filter(item => {
    // 1. Search term (matches Category, Location, or Seller name)
    const matchesSearch =
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sellerName.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Category
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

    // 3. Location/City
    const matchesCity = selectedCity === "All" || item.location === selectedCity;

    // 4. Trade type
    const matchesTradeType =
      tradeType === "All" ||
      (tradeType === "Direct" && !item.isAuction) ||
      (tradeType === "Auction" && item.isAuction);

    // 5. Export Ready
    const matchesExport = !exportReady || item.isExportReady;

    // 6. Moisture & Purity sliders
    const matchesMoisture = item.moisture <= maxMoisture;
    const matchesPurity = item.purity >= minPurity;

    // Filter status
    const matchesStatus = item.status === "Active";

    return matchesSearch && matchesCategory && matchesCity && matchesTradeType && matchesExport && matchesMoisture && matchesPurity && matchesStatus;
  });

  // Apply sorting
  if (sortBy === "price_asc") {
    filteredListings.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price_desc") {
    filteredListings.sort((a, b) => b.price - a.price);
  } else if (sortBy === "newest") {
    filteredListings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const handleCardClick = (item) => {
    setSelectedCommodity(item);
  };

  const translations = {
    en: {
      title: "Commodity Spot & Auction Exchange",
      subtitle: "Secure direct-buy deals and live bidding with automated escrow integration.",
      searchPlaceholder: "Search by commodity, city, or grower ID...",
      all: "All",
      directBuy: "Direct Spot Buy",
      liveAuctions: "Live Auctions",
      filters: "EXCHANGE FILTERS",
      moistureMax: "Max Moisture",
      purityMin: "Min Purity",
      exportOnly: "Export Ready Only",
      sortNew: "Newest Listings",
      sortLow: "Lowest Price First",
      sortHigh: "Highest Price First",
      bidCount: "Bids placed",
      currentBid: "Current Bid",
      askPrice: "Ask Price",
      placeBid: "Bid / Negotiate",
      negotiate: "View Details & Trade",
      verifiedSeller: "Exchange Approved",
      emptyState: "No matching commodity contracts found on current nodes.",
      totalContracts: "Active Contracts"
    },
    ur: {
      title: "زرعی کموڈٹی اور نیلامی ایکسچینج",
      subtitle: "محفوظ براہ راست سودے اور لائیو بولیاں، مربوط ایسکرو سسٹم کے ساتھ۔",
      searchPlaceholder: "فصل، شہر، یا کسان کے نام سے تلاش کریں...",
      all: "تمام",
      directBuy: "فوری خریداری",
      liveAuctions: "لائیو نیلامی",
      filters: "تلاش فلٹرز",
      moistureMax: "زیادہ سے زیادہ نمی",
      purityMin: "کم از کم خالص پن",
      exportOnly: "صرف پریمیم برآمدی سامان",
      sortNew: "نئی لسٹنگز",
      sortLow: "کم قیمت پہلے",
      sortHigh: "زیادہ قیمت پہلے",
      bidCount: "بولیاں لگی ہیں",
      currentBid: "موجودہ بولی",
      askPrice: "طلب کردہ قیمت",
      placeBid: "بولی / سودا کریں",
      negotiate: "تفصیل اور سودا",
      verifiedSeller: "منظور شدہ ممبر",
      emptyState: "موجودہ فلٹرز کے ساتھ کوئی سودا دستیاب نہیں ہے۔",
      totalContracts: "فعال سودے"
    }
  };

  const t = translations[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title block */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-6">
        <div>
          <h1 className="text-2xl font-black text-[#374151] tracking-tight">{t.title}</h1>
          <p className="text-xs text-gray-400 font-semibold">{t.subtitle}</p>
        </div>
        <div className="bg-[#ECFCCB] text-[#4D7C0F] text-xs font-bold px-3.5 py-1.5 rounded-lg border border-[#84CC16]/30 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#84CC16] animate-ping" />
          {filteredListings.length} {t.totalContracts}
        </div>
      </div>

      {/* Advanced Filtering layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sidebar Filters */}
        <div className="col-span-1 bg-white border border-[#E5E7EB] rounded-[24px] p-6 h-fit space-y-6 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
          <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">{t.filters}</span>

          {/* Commodity Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#374151]">Commodity Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
            >
              <option value="All">{t.all} Categories</option>
              {DEFAULT_COMMODITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Location City */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#374151]">Mandi Location</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
            >
              <option value="All">{t.all} Cities</option>
              {MANDI_CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Trade Type Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#374151]">Deal Structure</label>
            <div className="flex flex-col gap-2">
              {[
                { id: "All", label: t.all + " Deals" },
                { id: "Direct", label: t.directBuy },
                { id: "Auction", label: t.liveAuctions }
              ].map(opt => (
                <label key={opt.id} className="flex items-center gap-2.5 text-xs font-semibold text-[#374151] cursor-pointer">
                  <input
                    type="radio"
                    name="trade_type"
                    checked={tradeType === opt.id}
                    onChange={() => setTradeType(opt.id)}
                    className="accent-[#84CC16]"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* Sliders for Moisture & Purity */}
          <div className="space-y-4 border-t border-[#E5E7EB] pt-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#374151]">
                <span>{t.moistureMax}</span>
                <span className="font-mono text-[#84CC16]">{maxMoisture}%</span>
              </div>
              <input
                type="range"
                min="8"
                max="22"
                value={maxMoisture}
                onChange={(e) => setMaxMoisture(Number(e.target.value))}
                className="w-full accent-[#84CC16]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#374151]">
                <span>{t.purityMin}</span>
                <span className="font-mono text-[#84CC16]">{minPurity}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="100"
                value={minPurity}
                onChange={(e) => setMinPurity(Number(e.target.value))}
                className="w-full accent-[#84CC16]"
              />
            </div>
          </div>

          {/* Checkbox filters */}
          <div className="border-t border-[#E5E7EB] pt-4">
            <label className="flex items-center gap-2.5 text-xs font-bold text-[#374151] cursor-pointer">
              <input
                type="checkbox"
                checked={exportReady}
                onChange={(e) => setExportReady(e.target.checked)}
                className="rounded text-[#84CC16] accent-[#84CC16] h-4 w-4"
              />
              {t.exportOnly}
            </label>
          </div>
        </div>

        {/* Listings Display Grid Column */}
        <div className="col-span-1 lg:col-span-3 space-y-6">

          {/* Search bar & Sorting Row */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white border border-[#E5E7EB] p-4 rounded-[20px] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.01)]">
            <div className="relative w-full sm:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs font-bold text-[#374151]"
            >
              <option value="newest">{t.sortNew}</option>
              <option value="price_asc">{t.sortLow}</option>
              <option value="price_desc">{t.sortHigh}</option>
            </select>
          </div>

          {/* Cards Grid */}
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((item) => {
                const isAuction = item.isAuction;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleCardClick(item)}
                    className="bg-white border border-[#E5E7EB] hover:border-[#84CC16]/40 rounded-[20px] p-5 hover:shadow-premium transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Badge / Header info */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <span className="text-[9px] font-black tracking-wide text-gray-400 uppercase">
                          No: {item.id.toUpperCase()}
                        </span>

                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          isAuction
                            ? 'bg-amber-50 text-[#D4AF37] border border-[#D4AF37]/30'
                            : 'bg-emerald-50 text-[#84CC16] border border-[#84CC16]/20'
                        }`}>
                          {isAuction ? t.liveAuctions : t.directBuy}
                        </span>
                      </div>

                      {/* Image representation with icon overlay */}
                      <div className="relative h-32 w-full overflow-hidden rounded-[14px] bg-[#F8F9FA] mb-4 border border-[#E5E7EB]/55 flex items-center justify-center">
                        <img
                          src={item.images[0]}
                          alt={item.category}
                          className="absolute inset-0 w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2 py-1 rounded-lg border border-[#E5E7EB]/40">
                          {getIconForCommodity(item.category, "w-6 h-6")}
                        </div>
                      </div>

                      {/* Info lines */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-black text-[#374151] uppercase">{item.category}</h4>
                          <span className="text-[10px] font-extrabold text-[#84CC16] tracking-tight bg-[#ECFCCB]/40 px-2.5 py-0.5 rounded">
                            {item.location}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 font-bold">{item.grade}</p>

                        <div className="grid grid-cols-2 gap-2 border-t border-b border-[#E5E7EB]/50 py-2.5 my-3.5 text-[10px] font-bold text-[#374151]">
                          <div>
                            <span className="text-gray-400 block text-[9px]">Quantity</span>
                            {item.quantity} {item.unit}
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[9px]">Moisture</span>
                            {item.moisture}% (Max)
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[9px]">Purity</span>
                            {item.purity}% (Min)
                          </div>
                          <div>
                            <span className="text-gray-400 block text-[9px]">Broken Ratio</span>
                            {item.broken}%
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom trading price row */}
                    <div className="border-t border-[#E5E7EB]/40 pt-3 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-gray-400 block font-semibold uppercase">
                          {isAuction ? t.currentBid : t.askPrice}
                        </span>
                        <span className="text-sm font-black text-[#374151] font-mono">
                          PKR {isAuction ? (item.currentBid || item.price).toLocaleString() : item.price.toLocaleString()}
                          <span className="text-[10px] text-gray-400 font-normal">/{item.unit.split(' ')[0]}</span>
                        </span>
                      </div>

                      <button className="bg-[#374151] text-white hover:bg-[#84CC16] text-[10px] font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-xl transition-all">
                        {isAuction ? t.placeBid : t.negotiate}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-12 text-center shadow-sm">
              <span className="text-3xl">🌾</span>
              <p className="text-sm text-gray-400 font-medium mt-3">{t.emptyState}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
export default Marketplace;
