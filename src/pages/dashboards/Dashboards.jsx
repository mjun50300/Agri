import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  apiClient,
  COMMODITY_MAP,
  DEFAULT_COMMODITIES,
  GRADES,
  MANDI_CITIES,
  PROVINCES,
  HARVEST_YEARS,
  ORGANIC_STATUSES
} from '../../api/apiClient';

export const Dashboards = () => {
  const {
    currentUser,
    currentRole,
    changeRole,
    lang,
    listings,
    orders,
    showToast,
    reloadData
  } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 text-center bg-white p-8 border border-[#E5E7EB] rounded-[24px] shadow-sm space-y-4">
        <div className="text-3xl">🔑</div>
        <h2 className="text-sm font-black text-[#374151] uppercase tracking-wider">Access Denied</h2>
        <p className="text-xs text-gray-400">Please sign in or register to access your workspace terminal.</p>
      </div>
    );
  }

  // ----------------------------------
  // SELLER STATES
  // ----------------------------------
  const [newListing, setNewListing] = useState({
    category: "Wheat",
    variety: "Hard Wheat",
    customCategory: "",
    customVariety: "",
    grade: "Grade A (Standard)",
    quantity: "",
    unit: "Metric Ton",
    price: "",
    isNegotiable: true,
    isAuction: false,
    location: "Sahiwal",
    province: "Punjab",
    harvestYear: "2024",
    organicStatus: "Conventional",
    moisture: "12.0",
    purity: "98.0",
    broken: "2.0",
    foreignMatter: "1.0",
    packaging: "50kg Jute Bags",
    isExportReady: false
  });

  const [availableVarieties, setAvailableVarieties] = useState([]);

  // Sync varieties when category changes
  useEffect(() => {
    const list = COMMODITY_MAP[newListing.category] || [];
    setAvailableVarieties(list);
    if (list.length > 0) {
      setNewListing(prev => ({ ...prev, variety: list[0] }));
    }
  }, [newListing.category]);

  // ----------------------------------
  // BUYER STATES
  // ----------------------------------
  const [rfq, setRfq] = useState({
    category: "Wheat",
    quantity: "",
    unit: "Metric Ton",
    targetPrice: "",
    deliveryDate: "",
    destinationCity: "Lahore"
  });

  const [rfqsList, setRfqsList] = useState([
    { id: "rfq-1", category: "Rice", qty: 25, unit: "Metric Ton", targetPrice: 240000, date: "2024-11-20", city: "Karachi", status: "Active" }
  ]);

  // ----------------------------------
  // ADMIN STATES
  // ----------------------------------
  const [customCommodities, setCustomCommodities] = useState([]);
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [newVarietyInput, setNewVarietyInput] = useState("");

  useEffect(() => {
    setCustomCommodities(apiClient.getCustomCommodities());
  }, []);

  // ----------------------------------
  // HANDLERS
  // ----------------------------------
  const handlePostListing = (e) => {
    e.preventDefault();
    if (!newListing.quantity || !newListing.price) {
      showToast("Please fill in quantity and price", "error");
      return;
    }

    let cat = newListing.category;
    let varOpt = newListing.variety;

    // Handle Custom Commodity Submissions
    if (newListing.category === "Custom Commodity") {
      if (!newListing.customCategory || !newListing.customVariety) {
        showToast("Please fill in custom category and variety details", "error");
        return;
      }
      cat = newListing.customCategory;
      varOpt = newListing.customVariety;

      // Submit custom commodity request to Admin pipeline
      apiClient.addCustomCommodity(cat, varOpt);
      setCustomCommodities(apiClient.getCustomCommodities());
      showToast("Custom commodity sent for Admin approval!", "info");
    }

    const listingData = {
      category: cat,
      variety: varOpt,
      grade: newListing.grade,
      quantity: Number(newListing.quantity),
      unit: newListing.unit,
      price: Number(newListing.price),
      isNegotiable: newListing.isNegotiable,
      isAuction: newListing.isAuction,
      location: newListing.location,
      province: newListing.province,
      harvestYear: newListing.harvestYear,
      organicStatus: newListing.organicStatus,
      moisture: Number(newListing.moisture),
      purity: Number(newListing.purity),
      broken: Number(newListing.broken),
      foreignMatter: Number(newListing.foreignMatter),
      packaging: newListing.packaging,
      isExportReady: newListing.isExportReady,
      images: ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600"],
    };

    apiClient.createListing(listingData);
    showToast("Successfully posted new agricultural contract listing!", "success");

    // Reset posting state
    setNewListing({
      category: "Wheat",
      variety: "Hard Wheat",
      customCategory: "",
      customVariety: "",
      grade: "Grade A (Standard)",
      quantity: "",
      unit: "Metric Ton",
      price: "",
      isNegotiable: true,
      isAuction: false,
      location: "Sahiwal",
      province: "Punjab",
      harvestYear: "2024",
      organicStatus: "Conventional",
      moisture: "12.0",
      purity: "98.0",
      broken: "2.0",
      foreignMatter: "1.0",
      packaging: "50kg Jute Bags",
      isExportReady: false
    });
    reloadData();
  };

  const handleDepositEscrow = (orderId) => {
    const res = apiClient.depositEscrowFunds(orderId);
    if (res.success) {
      showToast("Escrow deposit completed successfully!", "success");
      reloadData();
    }
  };

  const handleReleaseEscrow = (orderId) => {
    const res = apiClient.releaseEscrowFunds(orderId);
    if (res.success) {
      showToast("Escrow funds released to Seller. Deal Completed!", "success");
      reloadData();
    }
  };

  const handleAddRfq = (e) => {
    e.preventDefault();
    if (!rfq.quantity || !rfq.targetPrice) {
      showToast("Please enter RFQ target price and quantity.", "error");
      return;
    }
    const newRfqItem = {
      id: "rfq_" + Math.random().toString(36).substring(2, 9),
      category: rfq.category,
      qty: Number(rfq.quantity),
      unit: rfq.unit,
      targetPrice: Number(rfq.targetPrice),
      date: rfq.deliveryDate || new Date().toISOString().split("T")[0],
      city: rfq.destinationCity,
      status: "Active"
    };
    setRfqsList(prev => [newRfqItem, ...prev]);
    showToast("RFQ successfully broadcast to all registered brokers & dealers!", "success");
    setRfq({
      category: "Wheat",
      quantity: "",
      unit: "Metric Ton",
      targetPrice: "",
      deliveryDate: "",
      destinationCity: "Lahore"
    });
  };

  const handleOfferDecision = (listingId, offerId, decision) => {
    const res = apiClient.respondToOffer(listingId, offerId, decision);
    if (res.success) {
      showToast(`Offer ${decision} successfully!`, "success");
      reloadData();
    }
  };

  const handleApproveCC = (id) => {
    const approved = apiClient.approveCustomCommodity(id);
    if (approved) {
      setCustomCommodities(apiClient.getCustomCommodities());
      showToast(`Approved custom category ${approved.category} (${approved.variety})`, "success");
      reloadData();
    }
  };

  const handleRejectCC = (id) => {
    apiClient.rejectCustomCommodity(id);
    setCustomCommodities(apiClient.getCustomCommodities());
    showToast("Custom commodity request rejected", "info");
    reloadData();
  };

  const handleAddAdminCategory = (e) => {
    e.preventDefault();
    if (!newCategoryInput || !newVarietyInput) {
      showToast("Please fill in both category name and variety", "error");
      return;
    }
    // Dynamically insert into static map for demo purposes
    if (!COMMODITY_MAP[newCategoryInput]) {
      COMMODITY_MAP[newCategoryInput] = [newVarietyInput];
    } else {
      COMMODITY_MAP[newCategoryInput].push(newVarietyInput);
    }
    showToast(`Added ${newCategoryInput} - ${newVarietyInput} to exchange core settings`, "success");
    setNewCategoryInput("");
    setNewVarietyInput("");
    reloadData();
  };

  // ----------------------------------
  // WORKSPACES
  // ----------------------------------

  // 1. Seller Dashboard View
  const renderSellerDashboard = () => {
    const myActiveListings = listings.filter(l => l.sellerId === currentUser.id);
    const totalSales = orders.filter(o => o.sellerId === currentUser.id && o.status === "Completed")
                             .reduce((acc, curr) => acc + curr.totalAmount, 0);

    return (
      <div className="space-y-8 animate-fade-in">
        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 block uppercase">TOTAL SALES GENERATED</span>
            <span className="text-xl font-black text-[#374151] font-mono mt-1 block">PKR {totalSales.toLocaleString()}</span>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 block uppercase">ACTIVE LISTINGS ON SPOT</span>
            <span className="text-xl font-black text-lime-600 font-mono mt-1 block">{myActiveListings.length} Contracts</span>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 block uppercase">WALLED BALANCE</span>
            <span className="text-xl font-black text-lime-600 font-mono mt-1 block">PKR {currentUser.balance.toLocaleString()}</span>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 block uppercase">TRUST / RATINGS</span>
            <span className="text-xl font-black text-amber-500 font-mono mt-1 block">★ {currentUser.trustScore}/100</span>
          </div>
        </div>

        {/* Post Listing Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-[24px] p-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-4 mb-5 text-[#374151]">
              <span className="text-sm font-bold uppercase tracking-wide">POST AGRICULTURAL SPOT CONTRACT</span>
            </div>

            <form onSubmit={handlePostListing} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="text-[#374151]">Commodity Category</label>
                <select
                  value={newListing.category}
                  onChange={(e) => setNewListing({...newListing, category: e.target.value})}
                  className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                >
                  {DEFAULT_COMMODITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {newListing.category === "Custom Commodity" ? (
                <div className="space-y-1">
                  <label className="text-[#374151]">Custom Category Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Citrus / Kinnow"
                    value={newListing.customCategory}
                    onChange={(e) => setNewListing({...newListing, customCategory: e.target.value})}
                    className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                  />
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-[#374151]">Crop Variety (Cascading)</label>
                  <select
                    value={newListing.variety}
                    onChange={(e) => setNewListing({...newListing, variety: e.target.value})}
                    className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                  >
                    {availableVarieties.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              )}

              {newListing.category === "Custom Commodity" && (
                <div className="space-y-1">
                  <label className="text-[#374151]">Custom Variety Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sargodha Orange"
                    value={newListing.customVariety}
                    onChange={(e) => setNewListing({...newListing, customVariety: e.target.value})}
                    className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[#374151]">Grade</label>
                <select
                  value={newListing.grade}
                  onChange={(e) => setNewListing({...newListing, grade: e.target.value})}
                  className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                >
                  {GRADES.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#374151]">Province (Origin)</label>
                <select
                  value={newListing.province}
                  onChange={(e) => setNewListing({...newListing, province: e.target.value})}
                  className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                >
                  {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#374151]">Harvest Year</label>
                <select
                  value={newListing.harvestYear}
                  onChange={(e) => setNewListing({...newListing, harvestYear: e.target.value})}
                  className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                >
                  {HARVEST_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#374151]">Organic Status</label>
                <select
                  value={newListing.organicStatus}
                  onChange={(e) => setNewListing({...newListing, organicStatus: e.target.value})}
                  className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                >
                  {ORGANIC_STATUSES.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#374151]">Quantity</label>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  value={newListing.quantity}
                  onChange={(e) => setNewListing({...newListing, quantity: e.target.value})}
                  className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#374151]">Quantity Unit</label>
                <select
                  value={newListing.unit}
                  onChange={(e) => setNewListing({...newListing, unit: e.target.value})}
                  className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                >
                  <option value="Metric Ton">Metric Ton</option>
                  <option value="Maund">Maund (40kg)</option>
                  <option value="Kg">Kilogram (Kg)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#374151]">Ask Price per Unit (PKR)</label>
                <input
                  type="number"
                  placeholder="e.g. 245000"
                  value={newListing.price}
                  onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                  className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#374151]">Mandi Location</label>
                <select
                  value={newListing.location}
                  onChange={(e) => setNewListing({...newListing, location: e.target.value})}
                  className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                >
                  {MANDI_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#374151]">Moisture %</label>
                <input
                  type="number"
                  step="0.1"
                  value={newListing.moisture}
                  onChange={(e) => setNewListing({...newListing, moisture: e.target.value})}
                  className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#374151]">Purity %</label>
                <input
                  type="number"
                  step="0.1"
                  value={newListing.purity}
                  onChange={(e) => setNewListing({...newListing, purity: e.target.value})}
                  className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                />
              </div>

              <div className="sm:col-span-2 flex flex-wrap gap-4 border-t border-[#E5E7EB] pt-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newListing.isAuction}
                    onChange={(e) => setNewListing({...newListing, isAuction: e.target.checked})}
                    className="accent-[#84CC16]"
                  />
                  List as Live Auction Contract
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newListing.isExportReady}
                    onChange={(e) => setNewListing({...newListing, isExportReady: e.target.checked})}
                    className="accent-[#84CC16]"
                  />
                  Export Ready Certificate Included
                </label>
              </div>

              <button
                type="submit"
                className="sm:col-span-2 bg-[#374151] hover:bg-[#84CC16] text-white py-3.5 rounded-xl transition-colors font-bold tracking-wider uppercase mt-4"
              >
                Launch Trade Contract
              </button>
            </form>
          </div>

          {/* Right Panel: Offers received */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 shadow-sm">
              <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider mb-4">DIRECT OFFERS RECEIVED</span>

              <div className="space-y-3.5 max-h-[350px] overflow-y-auto">
                {myActiveListings.flatMap(l => l.offers.map(off => ({...off, listingCategory: l.category, listingId: l.id}))).length > 0 ? (
                  myActiveListings.flatMap(l => l.offers.map(off => ({...off, listingCategory: l.category, listingId: l.id}))).map(off => (
                    <div key={off.id} className="bg-[#F8F9FA] rounded-xl p-4 border border-[#E5E7EB] space-y-3 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-[#374151]">{off.listingCategory}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${off.status === 'Pending' ? 'bg-amber-50 text-[#D4AF37]' : 'bg-green-50 text-[#84CC16]'}`}>
                          {off.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1 text-[11px] text-gray-400 font-medium">
                        <div>Buyer: <span className="font-bold text-[#374151]">{off.buyerName}</span></div>
                        <div>Offer: <span className="font-bold text-[#374151]">PKR {off.price.toLocaleString()}</span></div>
                      </div>

                      {off.status === "Pending" && (
                        <div className="flex gap-2 pt-1.5">
                          <button
                            onClick={() => handleOfferDecision(off.listingId, off.id, "Accepted")}
                            className="bg-[#84CC16] hover:bg-[#A3E635] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold"
                          >
                            Accept Offer
                          </button>
                          <button
                            onClick={() => handleOfferDecision(off.listingId, off.id, "Rejected")}
                            className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-red-200"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-xs text-gray-400 font-semibold">
                    No open direct offers received yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 2. Buyer Dashboard View
  const renderBuyerDashboard = () => {
    const myOrders = orders.filter(o => o.buyerId === currentUser.id);

    return (
      <div className="space-y-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 block uppercase">ACTIVE BUY CONTRACTS</span>
            <span className="text-xl font-black text-[#374151] font-mono mt-1 block">{myOrders.length} Deals</span>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 block uppercase">TOTAL SPEND FACILITATED</span>
            <span className="text-xl font-black text-[#84CC16] font-mono mt-1 block">
              PKR {myOrders.reduce((acc, curr) => acc + curr.totalAmount, 0).toLocaleString()}
            </span>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 block uppercase">ESCROW WALLET STATUS</span>
            <span className="text-xl font-black text-amber-500 font-mono mt-1 block">Stripe Ready</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-[24px] p-6 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider mb-4">ACTIVE CONTRACT ESCROWS & DELIVERY TIMELINE</span>

            <div className="space-y-4 max-h-[450px] overflow-y-auto">
              {myOrders.length > 0 ? (
                myOrders.map(ord => (
                  <div key={ord.id} className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB] space-y-4 text-xs">
                    <div className="flex justify-between items-center border-b border-[#E5E7EB]/50 pb-2.5">
                      <div>
                        <span className="font-extrabold text-[#374151] text-sm">{ord.category}</span>
                        <span className="text-[10px] text-gray-400 block font-semibold">Order Ref: {ord.id}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        ord.status === "Awaiting_Escrow_Deposit"
                          ? 'bg-amber-50 text-[#D4AF37] border border-amber-200'
                          : ord.status === "Funds_Escrowed"
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-green-50 text-[#84CC16] border border-green-200'
                      }`}>
                        {ord.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[11px] text-gray-400 font-semibold">
                      <div>Seller: <span className="text-[#374151]">{ord.sellerName}</span></div>
                      <div>Total Value: <span className="text-[#374151]">PKR {ord.totalAmount.toLocaleString()}</span></div>
                      <div>Quantity: <span className="text-[#374151]">{ord.quantity} {ord.unit}</span></div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      {ord.status === "Awaiting_Escrow_Deposit" && (
                        <button
                          onClick={() => handleDepositEscrow(ord.id)}
                          className="bg-[#D4AF37] hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-lg text-[10px]"
                        >
                          Deposit Funds to Escrow
                        </button>
                      )}
                      {ord.status === "Funds_Escrowed" && (
                        <button
                          onClick={() => handleReleaseEscrow(ord.id)}
                          className="bg-[#84CC16] hover:bg-[#A3E635] text-white font-bold px-4 py-2 rounded-lg text-[10px]"
                        >
                          Approve Delivery & Release Funds
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-xs text-gray-400 font-semibold bg-white border border-dashed rounded-xl">
                  No active buy orders or escrow contracts found on current terminal.
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-[24px] p-6 shadow-sm">
            <div className="border-b border-[#E5E7EB] pb-3 mb-4 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">BROADCAST RFQ / TENDER REQUEST</span>
            </div>

            <form onSubmit={handleAddRfq} className="space-y-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="text-[#374151]">Commodity Needed</label>
                <select
                  value={rfq.category}
                  onChange={(e) => setRfq({...rfq, category: e.target.value})}
                  className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                >
                  {DEFAULT_COMMODITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[#374151]">Quantity</label>
                  <input
                    type="number"
                    placeholder="e.g. 100"
                    value={rfq.quantity}
                    onChange={(e) => setRfq({...rfq, quantity: e.target.value})}
                    className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[#374151]">Target Price/unit</label>
                  <input
                    type="number"
                    placeholder="e.g. 95000"
                    value={rfq.targetPrice}
                    onChange={(e) => setRfq({...rfq, targetPrice: e.target.value})}
                    className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#374151] hover:bg-[#84CC16] text-white py-3 rounded-xl transition-colors font-bold tracking-wider uppercase mt-2"
              >
                Broadcast Tender
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // 3. Broker Dashboard View
  const renderBrokerDashboard = () => {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 block uppercase">MANAGE ACTIVE CLIENTS</span>
            <span className="text-xl font-black text-[#374151] font-mono mt-1 block">8 Active Growers</span>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 block uppercase">COMMISSION EARNED</span>
            <span className="text-xl font-black text-[#84CC16] font-mono mt-1 block">PKR 145,200</span>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 block uppercase">SUCCESSFUL TRADES CLOSURE</span>
            <span className="text-xl font-black text-[#374151] font-mono mt-1 block">12 Deals</span>
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 shadow-sm">
          <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider mb-4">BROKERAGE DEAL SHEET TRACKER</span>

          <table className="w-full text-left text-xs font-semibold border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-gray-400 text-[10px] tracking-wider uppercase">
                <th className="pb-3 font-extrabold">Client Name</th>
                <th className="pb-3 font-extrabold">Commodity</th>
                <th className="pb-3 font-extrabold">Volume</th>
                <th className="pb-3 font-extrabold">Trade Value</th>
                <th className="pb-3 font-extrabold">Your Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]/50">
              {[
                { client: "Malik Cooperatives", commodity: "Rice", qty: "40 MT", val: 9800000, comm: 49000 },
                { client: "Multan Ginners", commodity: "Cotton", qty: "100 Maunds", val: 920000, comm: 4600 },
                { client: "Rahim Yar Khan Mills", commodity: "Sugarcane", qty: "300 MT", val: 144000, comm: 1440 }
              ].map((d, i) => (
                <tr key={i} className="text-[#374151] font-medium hover:bg-[#F8F9FA] transition-colors">
                  <td className="py-3.5 font-bold">{d.client}</td>
                  <td>{d.commodity}</td>
                  <td>{d.qty}</td>
                  <td className="font-mono">PKR {d.val.toLocaleString()}</td>
                  <td className="text-lime-600 font-bold font-mono">PKR {d.comm.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // 4. Admin Dashboard View with expanded "Commodity Management Table"
  const renderAdminDashboard = () => {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 block uppercase">TOTAL REVENUE (COMMISSION)</span>
            <span className="text-xl font-black text-lime-600 font-mono mt-1 block">PKR 1,480,200</span>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 block uppercase">CNIC / NTN VERIFICATIONS</span>
            <span className="text-xl font-black text-amber-500 font-mono mt-1 block">3 Pending review</span>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 block uppercase">CUSTOM COMMODITIES SUBMITTED</span>
            <span className="text-xl font-black text-amber-500 font-mono mt-1 block">{customCommodities.length} Requests</span>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 block uppercase">SYSTEM PERFORMANCE</span>
            <span className="text-xl font-black text-[#374151] font-mono mt-1 block">Optimal</span>
          </div>
        </div>

        {/* Dynamic Commodity & Variety Management Form for Admins */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-white border border-[#E5E7EB] rounded-[24px] p-6 shadow-sm space-y-4">
            <div className="border-b border-[#E5E7EB] pb-3 mb-4">
              <span className="text-xs font-extrabold text-[#374151] uppercase tracking-wider block">ADMIN COMMODITY DIRECTORY CONTROL</span>
              <p className="text-[10px] text-gray-400">Instantly insert unlimited customized crops, seed categories, or grades on the exchange.</p>
            </div>

            <form onSubmit={handleAddAdminCategory} className="space-y-3.5 text-xs font-semibold">
              <div className="space-y-1">
                <label className="text-[#374151]">Category Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lentils / Pulses"
                  value={newCategoryInput}
                  onChange={(e) => setNewCategoryInput(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#374151]">Default Variety</label>
                <input
                  type="text"
                  placeholder="e.g. Moong Special"
                  value={newVarietyInput}
                  onChange={(e) => setNewVarietyInput(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-3 focus:ring-2 focus:ring-[#84CC16]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#374151] hover:bg-[#84CC16] text-white py-2.5 rounded-xl font-bold uppercase tracking-wider"
              >
                Register Crop Category & Variety
              </button>
            </form>
          </div>

          {/* User Verification CNIC/NTN Pipeline */}
          <div className="lg:col-span-6 bg-white border border-[#E5E7EB] rounded-[24px] p-6 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider mb-4">CNIC & NTN VERIFICATION PIPELINE</span>

            <div className="space-y-4">
              {[
                { name: "Muhammad Asif", business: "Asif Seed Traders", cnic: "35201-4432123-5", type: "Trader" },
                { name: "Sher Wali Khan", business: "Peshawar Grains", cnic: "17301-9988776-3", type: "Farmer" }
              ].map((user, idx) => (
                <div key={idx} className="bg-[#F8F9FA] rounded-xl p-4 border border-[#E5E7EB] flex items-center justify-between text-xs font-semibold">
                  <div>
                    <span className="font-extrabold text-[#374151] block">{user.name}</span>
                    <span className="text-gray-400 block text-[10px] mt-0.5">{user.business} | {user.type}</span>
                    <span className="text-[10px] text-gray-400 font-mono">CNIC: {user.cnic}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => showToast(`Approved verification for ${user.name}`, "success")}
                      className="bg-[#84CC16] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-[#A3E635]"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => showToast(`Rejected verification for ${user.name}`, "error")}
                      className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-[10px] font-bold border border-red-150 hover:bg-red-100"
                    >
                      Deny
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Commodities submitted by Users Approval Pipeline Table */}
        <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 shadow-sm">
          <div className="border-b border-[#E5E7EB] pb-3 mb-4">
            <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">CUSTOM USER COMMODITY APPROVAL PIPELINE</span>
          </div>

          <table className="w-full text-left text-xs font-semibold border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-gray-400 text-[10px] tracking-wider uppercase">
                <th className="pb-3 font-extrabold">Proposed Category</th>
                <th className="pb-3 font-extrabold">Proposed Variety</th>
                <th className="pb-3 font-extrabold">Submission Date</th>
                <th className="pb-3 font-extrabold">Approval Status</th>
                <th className="pb-3 font-extrabold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]/50">
              {customCommodities.length > 0 ? (
                customCommodities.map((cc) => (
                  <tr key={cc.id} className="text-[#374151] font-medium hover:bg-[#F8F9FA] transition-colors">
                    <td className="py-3.5 font-bold">{cc.category}</td>
                    <td>{cc.variety}</td>
                    <td className="font-mono">{cc.date}</td>
                    <td>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        cc.approved
                          ? 'bg-green-50 text-[#84CC16] border border-green-200'
                          : 'bg-amber-50 text-[#D4AF37] border border-amber-200'
                      }`}>
                        {cc.approved ? "Approved" : "Pending Review"}
                      </span>
                    </td>
                    <td className="py-3">
                      {!cc.approved ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproveCC(cc.id)}
                            className="bg-[#84CC16] hover:bg-[#A3E635] text-white px-2 py-1 rounded text-[10px] font-bold"
                          >
                            Approve & Map
                          </button>
                          <button
                            onClick={() => handleRejectCC(cc.id)}
                            className="bg-red-50 text-red-600 border border-red-200 px-2 py-1 rounded text-[10px] font-bold"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-[10px]">Fully mapped</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400 font-semibold">
                    No custom user commodities pending review.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dynamic Header Workspace */}
      <div className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col md:flex-row md:items-center justify-between gap-6">

        <div className="flex items-center gap-4">
          <img
            src={currentUser ? currentUser.avatar : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"}
            alt="avatar"
            className="w-14 h-14 rounded-full border-2 border-[#84CC16]/20 object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-[#374151]">{currentUser ? currentUser.name : "Grower Guest"}</h2>
              <span className="text-[10px] font-extrabold text-[#D4AF37] uppercase bg-amber-50 border border-[#D4AF37]/20 px-2 py-0.5 rounded">
                {currentRole} Session
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-semibold">{currentUser ? currentUser.company : "Independent Agri Growers"}</p>
          </div>
        </div>

        {/* Switcher is locked down and ONLY visible to Admins/Super-Admins */}
        {(currentRole === "Admin" || currentRole === "Super Admin") && (
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl animate-fade-in">
            <span className="text-xs font-bold text-amber-500 uppercase whitespace-nowrap">Testing Workstation:</span>
            <select
              value={currentRole}
              onChange={(e) => changeRole(e.target.value)}
              className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs font-bold text-[#374151] focus:outline-none cursor-pointer"
            >
              <option value="Admin">Admin Panel</option>
              <option value="Farmer">Farmer (Seller)</option>
              <option value="Buyer">Industrial Buyer</option>
              <option value="Broker">Broker Portfolio</option>
            </select>
          </div>
        )}

      </div>

      {/* Render selected workspace strictly locked down */}
      {currentRole === "Farmer" && renderSellerDashboard()}
      {currentRole === "Trader" && renderSellerDashboard()}
      {currentRole === "Buyer" && renderBuyerDashboard()}
      {currentRole === "Industrial Buyer" && renderBuyerDashboard()}
      {currentRole === "Broker" && renderBrokerDashboard()}
      {currentRole === "Admin" && renderAdminDashboard()}
      {currentRole === "Super Admin" && renderAdminDashboard()}

    </div>
  );
};
export default Dashboards;
