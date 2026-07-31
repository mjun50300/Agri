import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient, USER_TYPES } from '../api/apiClient';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState("Farmer"); // Farmer, Trader, Buyer, Broker, Admin, Super Admin
  const [lang, setLang] = useState("en"); // 'en', 'ur'
  const [toasts, setToasts] = useState([]);
  const [listings, setListings] = useState([]);
  const [mandiPrices, setMandiPrices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("landing"); // 'landing', 'marketplace', 'dashboard', 'admin'
  const [selectedCommodity, setSelectedCommodity] = useState(null); // For detail view drawer

  useEffect(() => {
    // Sync initial mock state
    const user = apiClient.getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setCurrentRole(user.type);
    } else {
      setCurrentRole("Guest");
    }
    setListings(apiClient.getListings());
    setMandiPrices(apiClient.getMandiPrices());
    setOrders(apiClient.getOrders());
  }, []);

  const changeUser = (userId) => {
    if (userId === "logged_out") {
      handleLogout();
      return;
    }
    apiClient.setCurrentUser(userId);
    const user = apiClient.getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setCurrentRole(user.type);
      showToast(`Switched user session to ${user.name} (${user.type})`, "info");
    } else {
      setCurrentRole("Guest");
    }

    // Refresh orders
    setOrders(apiClient.getOrders());
  };

  const handleSignUp = (userData) => {
    const newUser = apiClient.registerUser(userData);
    setCurrentUser(newUser);
    setCurrentRole(newUser.type);
    showToast(`Welcome to ZarZaraat, ${newUser.name}!`, "success");
    setOrders(apiClient.getOrders());
    setActiveTab("dashboard");
  };

  const handleLogin = (userId) => {
    apiClient.setCurrentUser(userId);
    const user = apiClient.getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setCurrentRole(user.type);
      showToast(`Welcome back, ${user.name}!`, "success");
      setActiveTab("dashboard");
    } else {
      setCurrentRole("Guest");
    }
    setOrders(apiClient.getOrders());
  };

  const handleLogout = () => {
    apiClient.setCurrentUser("logged_out");
    setCurrentUser(null);
    setCurrentRole("Guest");
    showToast("Signed out successfully. View only access.", "info");
    setOrders([]);
    setActiveTab("landing");
  };

  const changeRole = (role) => {
    setCurrentRole(role);
    showToast(`Role switched to ${role} preview`, "info");
  };

  const toggleLanguage = () => {
    setLang(prev => prev === "en" ? "ur" : "en");
    showToast(lang === "en" ? "زبان تبدیل کردی گئی ہے" : "Language switched to English", "info");
  };

  const showToast = (message, type = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const reloadData = () => {
    setListings(apiClient.getListings());
    setMandiPrices(apiClient.getMandiPrices());
    setOrders(apiClient.getOrders());
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      currentRole,
      lang,
      toasts,
      listings,
      mandiPrices,
      orders,
      activeTab,
      selectedCommodity,
      setSelectedCommodity,
      setActiveTab,
      changeUser,
      changeRole,
      toggleLanguage,
      showToast,
      removeToast,
      reloadData,
      handleSignUp,
      handleLogin,
      handleLogout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
