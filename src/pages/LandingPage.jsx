import React from 'react';
import { useApp } from '../context/AppContext';
import { LandingHeroAndTicker } from '../components/LandingHeroAndTicker';
import { InteractiveChart } from '../components/charts/InteractiveChart';
import { LandingInfoSections } from '../components/LandingInfoSections';
import { getIconForCommodity } from '../components/common/CommodityIcons';
import { apiClient } from '../api/apiClient';

export const LandingPage = () => {
  const { lang, listings, setActiveTab, setSelectedCommodity, showToast } = useApp();
  const blogs = apiClient.getBlogs();

  const handleCardClick = (commodity) => {
    setSelectedCommodity(commodity);
  };

  const translations = {
    en: {
      recentTitle: "Featured Active Trade Orders",
      recentSubtitle: "Instant direct-buy listings and transparent countdown auctions.",
      readMore: "Read Insights",
      categoryList: "Default Commodity Exchanges",
      exploreAll: "View All Listings",
      latestNews: "Market Intelligence Articles",
      latestNewsSub: "Sourcing advice, policy updates, and weather forecast analysis from Sahiwal, Multan, and Karachi."
    },
    ur: {
      recentTitle: "نمایاں فعال تجارتی آرڈرز",
      recentSubtitle: "فوری خریداری کے سودے اور شفاف لائیو نیلامی کی قیمتیں۔",
      readMore: "مزید معلومات",
      categoryList: "زرعی کموڈٹی ایکسچینجز",
      exploreAll: "تمام لسٹنگ دیکھیں",
      latestNews: "زرعی مارکیٹ رپورٹ اور خبریں",
      latestNewsSub: "ساہیوال، ملتان، اور کراچی سے درآمدی پالیسی، موسم کی پیشن گوئی اور مشورے۔"
    }
  };

  const t = translations[lang];

  // List of active categories
  const categories = ["Wheat", "Basmati Rice", "Cotton", "Sugarcane", "Maize", "Seeds"];

  return (
    <div className="w-full bg-[#F8F9FA] space-y-12">
      {/* Hero with live ticker and real-time mandi prices */}
      <LandingHeroAndTicker />

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xs font-bold tracking-widest text-[#374151] uppercase mb-4">{t.categoryList}</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveTab("marketplace");
                showToast(`Filtering marketplace by ${cat}`, "info");
              }}
              className="bg-white hover:bg-[#ECFCCB]/20 border border-[#E5E7EB] hover:border-[#84CC16]/40 p-4 rounded-[18px] text-center cursor-pointer transition-all hover:shadow-sm flex flex-col items-center justify-center gap-2.5"
            >
              {getIconForCommodity(cat, "w-10 h-10")}
              <span className="text-xs font-bold text-[#374151] tracking-wide">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Listings - Combining Auctions, Direct Buy, and Verified badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-[#374151] tracking-tight">{t.recentTitle}</h2>
            <p className="text-xs text-gray-400 font-semibold">{t.recentSubtitle}</p>
          </div>
          <button
            onClick={() => setActiveTab("marketplace")}
            className="text-xs font-bold text-[#84CC16] hover:text-[#4D7C0F] uppercase tracking-wider flex items-center gap-1.5"
          >
            {t.exploreAll} &rarr;
          </button>
        </div>

        {/* Listings Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="bg-white border border-[#E5E7EB] hover:border-[#84CC16]/40 rounded-[20px] p-5 hover:shadow-premium transition-all duration-300 cursor-pointer space-y-4 relative flex flex-col justify-between"
            >
              {/* Image & Type badge */}
              <div className="relative h-40 w-full overflow-hidden rounded-[14px]">
                <img
                  src={item.images[0]}
                  alt={item.category}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  item.isAuction
                    ? 'bg-amber-50 text-[#D4AF37] border border-[#D4AF37]/30'
                    : 'bg-[#ECFCCB] text-[#4D7C0F] border border-[#BEF264]/40'
                }`}>
                  {item.isAuction ? 'AUCTION CONTRACT' : 'DIRECT BUY'}
                </span>

                {item.isExportReady && (
                  <span className="absolute top-3 right-3 text-[9px] font-black bg-[#374151] text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Export Ready
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-[#374151]">{item.category}</h4>
                  <span className="text-[10px] font-bold text-[#84CC16] uppercase bg-[#ECFCCB]/30 px-2 py-0.5 rounded">
                    {item.location}
                  </span>
                </div>

                <p className="text-[11px] text-gray-400 font-semibold">{item.grade}</p>

                <div className="grid grid-cols-3 gap-2 border-t border-b border-[#E5E7EB]/50 py-2.5 my-2 text-[10px] text-[#374151] font-semibold">
                  <div>
                    <span className="text-gray-400 block text-[9px]">Moisture</span>
                    {item.moisture}%
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[9px]">Purity</span>
                    {item.purity}%
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[9px]">Quantity</span>
                    {item.quantity} {item.unit}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[9px] text-gray-400 block font-semibold">ASK PRICE</span>
                  <span className="text-sm font-bold text-[#374151] font-mono">
                    PKR {item.price.toLocaleString()} <span className="text-[10px] font-normal text-gray-400">/{item.unit.split(' ')[0]}</span>
                  </span>
                </div>

                <button className="bg-[#374151] hover:bg-[#84CC16] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all">
                  Negotiate &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded TradingView-style interactive chart on home page for high fidelity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveChart commodityName="Basmati Rice" height={320} />
      </div>

      {/* Info, benefits, FAQs, testimonials */}
      <LandingInfoSections />

      {/* News & Blogs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-6">
        <div>
          <h2 className="text-lg font-black text-[#374151] tracking-tight">{t.latestNews}</h2>
          <p className="text-xs text-gray-400 font-semibold">{t.latestNewsSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-[#E5E7EB] rounded-[20px] p-4 flex flex-col sm:flex-row gap-4 hover:shadow-premium transition-all duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full sm:w-32 h-32 object-cover rounded-xl"
              />
              <div className="flex flex-col justify-between space-y-2">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold tracking-wider text-[#84CC16] uppercase">{post.author}</span>
                  <h4 className="text-sm font-bold text-[#374151] leading-snug">{post.title}</h4>
                  <p className="text-xs text-gray-400 font-medium line-clamp-2">{post.summary}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] font-semibold text-gray-400">{post.date}</span>
                  <button
                    onClick={() => showToast(`Reading blog: ${post.title}`, "info")}
                    className="text-[10px] font-bold text-[#374151] hover:text-[#84CC16] uppercase tracking-wide"
                  >
                    {t.readMore} &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
