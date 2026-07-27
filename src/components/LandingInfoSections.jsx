import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const LandingInfoSections = () => {
  const { lang, showToast, getBlogs } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast(`Successfully subscribed ${newsletterEmail} to ZarZaraat Daily Agr-Market Intel!`, "success");
    setNewsletterEmail("");
  };

  const translations = {
    en: {
      howItWorks: "How ZarZaraat Works",
      howItWorksSubtitle: "Secure trading made effortless for farmers, traders, and enterprise buyers across Pakistan.",
      step1Title: "1. List / Discover",
      step1Desc: "Sellers list commodities with detailed reports (moisture, broken %, purity). Buyers search with advanced filters.",
      step2Title: "2. Trade & Bid",
      step2Desc: "Submit direct purchase offers, negotiate with our AI Assistant, or participate in live countdown auctions.",
      step3Title: "3. Escrow Deposit",
      step3Desc: "Buyer deposits funds into the secure ZarZaraat Escrow wallet. Funds are held safely until quality is approved.",
      step4Title: "4. Inspection & Delivery",
      step4Desc: "Quality inspectors verify parameters. On approval, our integrated logistics deliver cargo. Funds released to seller.",

      benefits: "Exchange Benefits",
      benefitsSubtitle: "Why Pakistan's leading flour mills, seed processors, and exporters trade on ZarZaraat.",
      b1Title: "Zero Counterparty Risk",
      b1Desc: "With secure Escrow, sellers are guaranteed payment and buyers are guaranteed specified grades or full refund.",
      b2Title: "AI Pricing Assistant",
      b2Desc: "Our smart algorithms suggest the best buying/selling window, calculate fair counter-offers, and predict price volatility.",
      b3Title: "Verified Quality Scoring",
      b3Desc: "Integrated lab reports for moisture content, purity, and grain size. No more unexpected quality disputes.",
      b4Title: "National Logistics Dispatch",
      b4Desc: "Instantly book flatbed trucks or dry warehouses. Calculate freight charges and track transit route on dashboard.",

      testimonials: "What Industry Leaders Say",
      t1Text: "\"ZarZaraat has revolutionized our rice sourcing. We procured 500 tons of SGS certified basmati from Sahiwal directly. The escrow system took away all our payment fears.\"",
      t1Author: "Mian Salman",
      t1Role: "Director Procurement, Chenab Flour Mills",
      t2Text: "\"As a cotton grower in Multan, I was always at the mercy of middlemen. Now, I run short auctions on ZarZaraat, and spinners from Faisalabad bid directly on my bales!\"",
      t2Author: "Sajid Baloch",
      t2Role: "Cotton Farmer & Cooperative Owner",

      faq: "Frequently Asked Questions",
      faq1Q: "What is the Escrow fee on ZarZaraat?",
      faq1A: "We charge a standard 1.0% escrow facilitation commission on completed transactions, which covers payment processing, bank transfers, and standard arbitration.",
      faq2Q: "How are quality grades verified?",
      faq2A: "Sellers upload lab inspection reports or request on-site quality booking. Inspectors measure moisture, purity, broken grain ratio, and assign a verifiable Quality Score.",
      faq3Q: "Can I cancel my bid or offer?",
      faq3A: "Offers can be canceled anytime before seller acceptance. Bids on active auctions are legally binding contracts and cannot be retracted unless the reserve price isn't met.",

      newsletterTitle: "Join 45,000+ Agri-Market Subscribers",
      newsletterSubtitle: "Get daily mandi price alerts, seasonal harvest forecasts, and exclusive crop intelligence reports delivered directly to your inbox.",
      subscribe: "Subscribe",
    },
    ur: {
      howItWorks: "زر زراعت کیسے کام کرتا ہے",
      howItWorksSubtitle: "پاکستان بھر کے کسانوں، تاجروں اور کاروباری خریداروں کے لیے محفوظ تجارت آسان بنا دی گئی۔",
      step1Title: "1. لسٹ / تلاش کریں",
      step1Desc: "بیچنے والے تفصیلی پیرامیٹرز (نمی، ٹوٹ پھوٹ فیصد، خالص پن) کے ساتھ اجناس کی فہرست بناتے ہیں۔ خریدار ایڈوانس فلٹرز کے ساتھ تلاش کرتے ہیں۔",
      step2Title: "2. تجارت اور بولی",
      step2Desc: "براہ راست خریداری کی پیشکش جمع کروائیں، ہمارے AI اسسٹنٹ کے ساتھ گفت و شنید کریں، یا لائیو نیلامی میں حصہ لیں۔",
      step3Title: "3. ایسکرو ڈپازٹ",
      step3Desc: "خریدار فنڈز زر زراعت کے محفوظ والٹ میں جمع کرتا ہے۔ کوالٹی منظور ہونے تک رقم محفوظ رہتی ہے۔",
      step4Title: "4. معائنہ اور ترسیل",
      step4Desc: "کوالٹی انسپکٹر اجناس کی تصدیق کرتے ہیں۔ منظوری پر، مربوط لاجسٹکس مال پہنچاتی ہے۔ فنڈز کسان کو جاری کردیئے جاتے ہیں۔",

      benefits: "ایکسچینج کے فوائد",
      benefitsSubtitle: "پاکستان کے بڑے فلور ملز، بیج پروسیسرز، اور برآمد کنندگان زر زراعت پر تجارت کیوں کرتے ہیں۔",
      b1Title: "صفراسکرو خطرہ",
      b1Desc: "ایسکرو کے ساتھ، بیچنے والوں کو ادائیگی اور خریداروں کو مخصوص کوالٹی یا مکمل رقم واپسی کی ضمانت ملتی ہے۔",
      b2Title: "مصنوعی ذہانت اسسٹنٹ",
      b2Desc: "ہمارے اسمارٹ الگورتھم بہترین خرید و فروخت کے وقت، منصفانہ سودوں اور قیمتوں کے اتار چڑھاو کی پیشین گوئی کرتے ہیں۔",
      b3Title: "تصدیق شدہ کوالٹی سکورینگ",
      b3Desc: "نمی، خالص پن اور اناج کے سائز کی تصدیق شدہ لیبارٹری رپورٹس۔ مزید کوالٹی کے تنازعات کا خاتمہ۔",
      b4Title: "قومی لاجسٹکس ڈسپیچ",
      b4Desc: "فلیٹ بیڈ ٹرک یا گودام فوری بک کریں۔ کرایے کا حساب لگائیں اور ڈیش بورڈ پر ٹریک کریں۔",

      testimonials: "صنعت کے رہنماؤں کے تاثرات",
      t1Text: "\"زر زراعت نے ہماری چاول کی خریداری میں انقلاب برپا کر دیا ہے۔ ہم نے ساہیوال سے براہ راست 500 ٹن تصدیق شدہ باسمتی حاصل کی۔ ایسکرو نے ادائیگی کا ڈر دور کر دیا۔\"",
      t1Author: "میاں سلمان",
      t1Role: "ڈائریکٹر پروکیورمنٹ، چناب فلور ملز",
      t2Text: "\"ملتان میں کپاس کے کسان کی حیثیت سے، میں ہمیشہ مڈل مین کے رحم و کرم پر تھا۔ اب میں زر زراعت پر نیلامی چلاتا ہوں، اور خریدار براہ راست بولیاں لگاتے ہیں!\"",
      t2Author: "ساجد بلوچ",
      t2Role: "کپاس کسان اور کوآپریٹو مالک",

      faq: "عام طور پر پوچھے گئے سوالات",
      faq1Q: "زر زراعت پر ایسکرو فیس کیا ہے؟",
      faq1A: "ہم مکمل ہونے والے سودوں پر 1.0 فیصد ایسکرو کمیشن لیتے ہیں، جو ادائیگی کی پروسیسنگ اور منصفانہ حل کا احاطہ کرتا ہے۔",
      faq2Q: "اناج کے گریڈ کی تصدیق کیسے کی جاتی ہے؟",
      faq2A: "بیچنے والے لیب رپورٹ اپ لوڈ کرتے ہیں یا معائنے کی بکنگ کرتے ہیں۔ انسپکٹر نمی اور خالص پن کی جانچ کر کے کوالٹی سکور تفویض کرتے ہیں۔",
      faq3Q: "کیا میں اپنی بولی منسوخ کر سکتا ہوں؟",
      faq3A: "پیشکش بیچنے والے کی منظوری سے پہلے منسوخ کی جا سکتی ہے۔ فعال نیلامی پر بولیاں قانونی طور پر پابند ہیں اور واپس نہیں لی جا سکتیں۔",

      newsletterTitle: "روزانہ زرعی مارکیٹ رپورٹ حاصل کریں",
      newsletterSubtitle: "روزانہ منڈی کی قیمتیں، فصلوں کی پیش گوئی، اور مارکیٹ رپورٹ براہ راست اپنے ای میل پر حاصل کریں۔",
      subscribe: "سبسکرائب کریں",
    }
  };

  const t = translations[lang];

  return (
    <div className="w-full bg-white space-y-24 pb-20">

      {/* 1. How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center space-y-4">
          <span className="text-[#84CC16] text-xs font-bold uppercase tracking-widest block">OPERATIONAL BLUEPRINT</span>
          <h2 className="text-3xl font-black text-[#374151] tracking-tight">{t.howItWorks}</h2>
          <p className="text-sm text-gray-400 font-medium max-w-xl mx-auto">{t.howItWorksSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
          {[
            { title: t.step1Title, desc: t.step1Desc, color: "border-[#E5E7EB]" },
            { title: t.step2Title, desc: t.step2Desc, color: "border-[#84CC16]" },
            { title: t.step3Title, desc: t.step3Desc, color: "border-amber-400" },
            { title: t.step4Title, desc: t.step4Desc, color: "border-[#E5E7EB]" }
          ].map((step, idx) => (
            <div key={idx} className={`bg-[#F8F9FA] rounded-[20px] p-6 border-t-4 ${step.color} shadow-[0_4px_20px_rgba(0,0,0,0.01)] space-y-3`}>
              <h4 className="text-base font-bold text-[#374151]">{step.title}</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Benefits Section */}
      <div className="bg-[#F8F9FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <span className="text-[#84CC16] text-xs font-bold uppercase tracking-widest block">VALUE PROPOSITION</span>
            <h2 className="text-3xl font-black text-[#374151] tracking-tight">{t.benefits}</h2>
            <p className="text-sm text-gray-400 font-medium max-w-xl mx-auto">{t.benefitsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t.b1Title, desc: t.b1Desc, icon: "🛡️" },
              { title: t.b2Title, desc: t.b2Desc, icon: "🤖" },
              { title: t.b3Title, desc: t.b3Desc, icon: "📋" },
              { title: t.b4Title, desc: t.b4Desc, icon: "🚚" }
            ].map((b, idx) => (
              <div key={idx} className="bg-white rounded-[18px] p-6 border border-[#E5E7EB] hover:shadow-premium transition-all space-y-3">
                <span className="text-2xl">{b.icon}</span>
                <h4 className="text-sm font-bold text-[#374151] tracking-tight">{b.title}</h4>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-8 md:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.02)] grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest block">TRUSTED BY 10,000+ AGRI-GROWERS</span>
            <h3 className="text-2xl font-black text-[#374151] tracking-tight">{t.testimonials}</h3>
            <div className="space-y-1">
              <span className="text-3xl font-serif text-[#84CC16]">“</span>
              <p className="text-sm text-gray-500 font-medium leading-relaxed italic">{t.t1Text}</p>
              <div className="pt-3">
                <p className="text-xs font-bold text-[#374151]">{t.t1Author}</p>
                <p className="text-[10px] text-gray-400 font-semibold">{t.t1Role}</p>
              </div>
            </div>
          </div>

          <div className="border-l border-[#E5E7EB] pl-0 md:pl-10 space-y-6">
            <div className="space-y-1">
              <span className="text-3xl font-serif text-[#84CC16]">“</span>
              <p className="text-sm text-gray-500 font-medium leading-relaxed italic">{t.t2Text}</p>
              <div className="pt-3">
                <p className="text-xs font-bold text-[#374151]">{t.t2Author}</p>
                <p className="text-[10px] text-gray-400 font-semibold">{t.t2Role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FAQ Section */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center space-y-4 mb-10">
          <h2 className="text-2xl font-black text-[#374151]">{t.faq}</h2>
        </div>

        <div className="space-y-4">
          {[
            { q: t.faq1Q, a: t.faq1A },
            { q: t.faq2Q, a: t.faq2A },
            { q: t.faq3Q, a: t.faq3A }
          ].map((faq, idx) => (
            <div key={idx} className="border border-[#E5E7EB] rounded-[16px] p-5 bg-white space-y-2">
              <h4 className="text-xs font-extrabold text-[#374151] tracking-wide uppercase">{faq.q}</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Newsletter Signup */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-[#ECFCCB]/40 border border-[#84CC16]/20 rounded-[24px] p-8 md:p-12 text-center max-w-4xl mx-auto space-y-6">
          <h3 className="text-xl sm:text-2xl font-black text-[#374151]">{t.newsletterTitle}</h3>
          <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-lg mx-auto">{t.newsletterSubtitle}</p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#374151] hover:bg-black text-white font-bold text-xs px-6 py-3 rounded-xl transition-all"
            >
              {t.subscribe}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LandingInfoSections;
