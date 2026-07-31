import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { Marketplace } from './pages/marketplace/Marketplace';
import { Dashboards } from './pages/dashboards/Dashboards';
import { CommodityDetailDrawer } from './pages/marketplace/CommodityDetailDrawer';
import { Toast } from './components/common/Toast';

export const App = () => {
  const { lang, activeTab, setActiveTab, currentRole, toasts, removeToast } = useApp();

  const isRtl = lang === "ur";

  // Prevent view state leaks based on active user role changes
  useEffect(() => {
    if (currentRole === "Broker" && activeTab === "marketplace") {
      setActiveTab("dashboard");
    }
  }, [currentRole, activeTab, setActiveTab]);

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`${isRtl ? "font-serif" : "font-sans"} min-h-screen flex flex-col justify-between bg-[#F8F9FA]`}
    >
      <div className="w-full flex-1">
        {/* Navigation header */}
        <Header />

        {/* Dynamic page render */}
        <main className="w-full">
          {activeTab === "landing" && <LandingPage />}
          {activeTab === "marketplace" && currentRole !== "Broker" && <Marketplace />}
          {activeTab === "dashboard" && <Dashboards />}
        </main>

        {/* Commodity detail sliding drawer overlay */}
        <CommodityDetailDrawer />
      </div>

      {/* Global Regulatory Footer */}
      <Footer />

      {/* Dynamic Toast Portal */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
};
export default App;
