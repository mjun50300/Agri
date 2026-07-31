import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { USER_TYPES, apiClient } from '../api/apiClient';

export const AuthModal = ({ isOpen, mode, onClose }) => {
  const { handleLogin, handleSignUp, lang } = useApp();
  const [activeMode, setActiveMode] = useState(mode); // "login" | "signup"

  // Login form states
  const [selectedQuickUser, setSelectedQuickUser] = useState("u1"); // Seed user ID
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Sign up form states
  const [signUpData, setSignUpData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    type: "Farmer",
    cnic: "",
    ntn: "",
    balance: "100000" // Starting balance
  });

  // Sync mode state when prop triggers changes
  useEffect(() => {
    setActiveMode(mode);
  }, [mode]);

  if (!isOpen) return null;

  const quickUsers = apiClient.getUsers();

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    if (selectedQuickUser) {
      handleLogin(selectedQuickUser);
      onClose();
    } else {
      // Custom email login
      if (!loginEmail) return;
      // Look up if user already exists
      const match = quickUsers.find(u => u.email.toLowerCase() === loginEmail.toLowerCase());
      if (match) {
        handleLogin(match.id);
      } else {
        // Create custom login session on-the-fly
        const newUser = apiClient.registerUser({
          name: loginEmail.split("@")[0].toUpperCase(),
          email: loginEmail,
          type: "Farmer"
        });
        handleLogin(newUser.id);
      }
      onClose();
    }
  };

  const handleSignUpFormSubmit = (e) => {
    e.preventDefault();
    if (!signUpData.name) {
      alert("Name is required");
      return;
    }
    handleSignUp({
      name: signUpData.name,
      company: signUpData.company,
      email: signUpData.email,
      phone: signUpData.phone,
      type: signUpData.type,
      cnic: signUpData.cnic,
      ntn: signUpData.ntn,
      balance: signUpData.balance
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-[24px] max-w-md w-full shadow-[0_10px_50px_rgba(0,0,0,0.08)] overflow-hidden relative z-10 animate-fade-in text-xs">

        {/* Header Tabs */}
        <div className="flex border-b border-[#E5E7EB] bg-[#F8F9FA]">
          <button
            onClick={() => setActiveMode("login")}
            className={`flex-1 py-4 text-center text-xs font-black uppercase tracking-wider transition-colors ${
              activeMode === "login"
                ? "bg-white text-[#374151] border-r border-[#E5E7EB]"
                : "text-gray-400 hover:text-[#374151]"
            }`}
          >
            Sign In to Exchange
          </button>
          <button
            onClick={() => setActiveMode("signup")}
            className={`flex-1 py-4 text-center text-xs font-black uppercase tracking-wider transition-colors ${
              activeMode === "signup"
                ? "bg-white text-[#374151] border-l border-[#E5E7EB]"
                : "text-gray-400 hover:text-[#374151]"
            }`}
          >
            Register Account
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-sm font-black text-[#374151] uppercase tracking-wide">
              {activeMode === "login" ? "ZarZaraat Bloomberg Terminal Sign In" : "Create Pakistani Trading Account"}
            </h3>
            <p className="text-[10px] text-gray-400 font-semibold">
              {activeMode === "login"
                ? "Select a seed trading desk profile to test strict role workloads instantly."
                : "Register seed holdings, CNIC and NTN parameters for PMEX compliance."
              }
            </p>
          </div>

          {activeMode === "login" ? (
            <form onSubmit={handleLoginFormSubmit} className="space-y-4">

              {/* Quick Login selector */}
              <div className="space-y-1.5">
                <label className="text-[#374151] font-bold block uppercase tracking-wider text-[10px]">
                  Select Simulated Profile (Instant Access)
                </label>
                <select
                  value={selectedQuickUser}
                  onChange={(e) => setSelectedQuickUser(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16] font-semibold text-[#374151] cursor-pointer"
                >
                  {quickUsers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.type} - {user.company})
                    </option>
                  ))}
                  <option value="">-- Or Sign In with Custom Email --</option>
                </select>
              </div>

              {!selectedQuickUser && (
                <div className="space-y-3 animate-fade-in">
                  <div className="space-y-1">
                    <label className="text-[#374151] font-bold block">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. trader@zarzaraat.pk"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[#374151] font-bold block">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#374151] hover:bg-[#84CC16] text-white py-3.5 rounded-xl transition-colors font-bold tracking-wider uppercase mt-2 shadow-sm"
              >
                Access Workstation Terminal
              </button>

            </form>
          ) : (
            <form onSubmit={handleSignUpFormSubmit} className="space-y-3 font-semibold">

              <div className="space-y-1">
                <label className="text-[#374151] font-bold">Full Legal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Malik Muhammad Rafiq"
                  value={signUpData.name}
                  onChange={(e) => setSignUpData({...signUpData, name: e.target.value})}
                  className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-2.5 focus:ring-2 focus:ring-[#84CC16]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[#374151] font-bold">Company / Farm Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rafiq Grains Co."
                    value={signUpData.company}
                    onChange={(e) => setSignUpData({...signUpData, company: e.target.value})}
                    className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-2.5 focus:ring-2 focus:ring-[#84CC16]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#374151] font-bold">Trading Role</label>
                  <select
                    value={signUpData.type}
                    onChange={(e) => setSignUpData({...signUpData, type: e.target.value})}
                    className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-2.5 focus:ring-2 focus:ring-[#84CC16]"
                  >
                    {USER_TYPES.filter(t => t !== "Admin" && t !== "Super Admin").map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[#374151] font-bold">Email Address</label>
                  <input
                    type="email"
                    placeholder="rafiq@grains.pk"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                    className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-2.5 focus:ring-2 focus:ring-[#84CC16]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#374151] font-bold">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+92 300 7654321"
                    value={signUpData.phone}
                    onChange={(e) => setSignUpData({...signUpData, phone: e.target.value})}
                    className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-2.5 focus:ring-2 focus:ring-[#84CC16]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[#374151] font-bold">CNIC Number</label>
                  <input
                    type="text"
                    placeholder="35201-9988112-3"
                    value={signUpData.cnic}
                    onChange={(e) => setSignUpData({...signUpData, cnic: e.target.value})}
                    className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-2.5 focus:ring-2 focus:ring-[#84CC16]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#374151] font-bold">NTN Number</label>
                  <input
                    type="text"
                    placeholder="9988112-3"
                    value={signUpData.ntn}
                    onChange={(e) => setSignUpData({...signUpData, ntn: e.target.value})}
                    className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-2.5 focus:ring-2 focus:ring-[#84CC16]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#374151] font-bold">Initial Escrow Capital (PKR)</label>
                <input
                  type="number"
                  value={signUpData.balance}
                  onChange={(e) => setSignUpData({...signUpData, balance: e.target.value})}
                  className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-2.5 focus:ring-2 focus:ring-[#84CC16] font-mono font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#84CC16] hover:bg-[#A3E635] text-white py-3.5 rounded-xl transition-colors font-bold tracking-wider uppercase mt-3 shadow-sm"
              >
                Register & Initialize Desk
              </button>

            </form>
          )}

          {/* Close Trigger Button */}
          <button
            onClick={onClose}
            className="w-full text-center text-[10px] text-gray-400 font-bold uppercase hover:text-[#374151] transition-colors"
          >
            Cancel and Return
          </button>
        </div>

      </div>
    </div>
  );
};
export default AuthModal;
