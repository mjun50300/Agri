import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { apiClient } from '../../api/apiClient';
import { Drawer } from '../../components/common/Drawer';
import { getIconForCommodity } from '../../components/common/CommodityIcons';

export const CommodityDetailDrawer = () => {
  const { selectedCommodity, setSelectedCommodity, lang, showToast, reloadData, currentUser } = useApp();
  const [bidAmount, setBidAmount] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [offerQty, setOfferQty] = useState("");
  const [aiChatInput, setAiChatInput] = useState("");
  const [aiChatLog, setAiChatLog] = useState([
    { sender: "AI", message: "Aasalam-o-Alaikum! I am your ZarZaraat AI Negotiation Assistant. I can analyze the market trend and propose a fair offer or suggested strategy. Ask me anything!" }
  ]);

  if (!selectedCommodity) return null;

  const isAuction = selectedCommodity.isAuction;
  const currentBidPrice = selectedCommodity.currentBid || selectedCommodity.minimumBid || selectedCommodity.price;

  // Handle live auction bidding
  const handlePlaceBid = (e) => {
    e.preventDefault();
    const amount = Number(bidAmount);
    if (!amount) return;

    const res = apiClient.placeBid(selectedCommodity.id, amount);
    if (res.success) {
      showToast(`Successfully placed bid of PKR ${amount.toLocaleString()}!`, "success");
      setBidAmount("");
      setSelectedCommodity(res.listing);
      reloadData();
    } else {
      showToast(res.message, "error");
    }
  };

  // Handle direct buying / offer submission
  const handlePlaceOffer = (e) => {
    e.preventDefault();
    const price = Number(offerPrice);
    const qty = Number(offerQty || selectedCommodity.quantity);

    if (!price) return;

    const res = apiClient.submitOffer(selectedCommodity.id, price, qty);
    if (res.success) {
      showToast(`Successfully submitted offer of PKR ${price.toLocaleString()} per unit!`, "success");
      setOfferPrice("");
      setOfferQty("");
      setSelectedCommodity(apiClient.getListingById(selectedCommodity.id));
      reloadData();
    } else {
      showToast(res.message, "error");
    }
  };

  // Handle checkout instant-buy
  const handleInstantBuy = () => {
    const confirmBuy = window.confirm(`Confirm immediate spot purchase of ${selectedCommodity.quantity} ${selectedCommodity.unit} at PKR ${selectedCommodity.price.toLocaleString()} per unit?`);
    if (confirmBuy) {
      const res = apiClient.submitOffer(selectedCommodity.id, selectedCommodity.price, selectedCommodity.quantity);
      if (res.success) {
        // Automatically accept direct instant buy as simulated flow
        apiClient.respondToOffer(selectedCommodity.id, res.offer.id, "Accepted");
        showToast("Instant buy checkout completed! Funds are placed in escrow.", "success");
        setSelectedCommodity(null);
        reloadData();
      }
    }
  };

  // AI Negotiation Assistant responses
  const handleAiAsk = (e) => {
    e.preventDefault();
    if (!aiChatInput.trim()) return;

    const userMsg = aiChatInput;
    setAiChatLog(prev => [...prev, { sender: "user", message: userMsg }]);
    setAiChatInput("");

    setTimeout(() => {
      // Intelligent mock responses based on inputs and listing values
      let response = "";
      const price = selectedCommodity.price;
      const lowerBound = price * 0.90;
      const upperBound = price * 1.05;

      if (userMsg.toLowerCase().includes("discount") || userMsg.toLowerCase().includes("less") || userMsg.toLowerCase().includes("negotiate")) {
        response = `Based on historical mandi records in ${selectedCommodity.location}, the average spot price for ${selectedCommodity.category} is PKR ${Math.round(price * 0.96).toLocaleString()}. I suggest placing an offer at PKR ${Math.round(price * 0.94).toLocaleString()}/unit. This holds a 'Medium Risk' score of rejection.`;
      } else if (userMsg.toLowerCase().includes("best time")) {
        response = `For ${selectedCommodity.category} in Pakistan, the historical high period is between December and March due to post-harvest storage demand. Currently, it is an optimal 'BUY' window. Selling is recommended in Q1.`;
      } else if (userMsg.toLowerCase().includes("prediction") || userMsg.toLowerCase().includes("forecast")) {
        response = `Our neural model forecasts a minor +2.4% price rise for ${selectedCommodity.category} over the next 30 days due to export supply limits in Karachi and Gwadar port shipments. Buy recommendation: high confidence.`;
      } else {
        response = `My assessment indicates that the grain specifications (Moisture: ${selectedCommodity.moisture}%, Broken: ${selectedCommodity.broken}%) meet top milling requirements. A fair deal range would be PKR ${Math.round(lowerBound).toLocaleString()} - ${Math.round(upperBound).toLocaleString()} per ${selectedCommodity.unit}.`;
      }

      setAiChatLog(prev => [...prev, { sender: "AI", message: response }]);
    }, 800);
  };

  return (
    <Drawer
      isOpen={!!selectedCommodity}
      onClose={() => setSelectedCommodity(null)}
      title={`${selectedCommodity.category} Specifications`}
      subtitle={`Offered by ${selectedCommodity.sellerName}`}
    >
      <div className="space-y-6">

        {/* Commodity icon and description */}
        <div className="flex items-center gap-4 bg-[#F8F9FA] p-4 rounded-xl border border-[#E5E7EB]/70">
          {getIconForCommodity(selectedCommodity.category, "w-14 h-14")}
          <div>
            <h4 className="text-sm font-bold text-[#374151] uppercase">{selectedCommodity.category}</h4>
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase bg-amber-50 px-2 py-0.5 rounded border border-[#D4AF37]/20">
              {selectedCommodity.grade}
            </span>
          </div>
        </div>

        {/* Detailed specification table */}
        <div>
          <h5 className="text-xs font-black tracking-wider text-gray-400 uppercase mb-3">CONTRACT DETAILS</h5>
          <div className="grid grid-cols-2 gap-4 bg-white border border-[#E5E7EB] rounded-xl p-4 text-xs">
            <div>
              <span className="text-gray-400 block font-medium">Quantity</span>
              <span className="font-bold text-[#374151]">{selectedCommodity.quantity} {selectedCommodity.unit}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Location</span>
              <span className="font-bold text-[#374151]">{selectedCommodity.location}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Province</span>
              <span className="font-bold text-[#374151]">{selectedCommodity.province || "Punjab"}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Harvest Year</span>
              <span className="font-bold text-[#374151]">{selectedCommodity.harvestYear || "2024"}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Organic Status</span>
              <span className="font-bold text-lime-600">{selectedCommodity.organicStatus || "Conventional"}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Moisture Content</span>
              <span className="font-bold text-lime-600">{selectedCommodity.moisture}% (Max)</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Foreign Matter</span>
              <span className="font-bold text-[#374151]">{selectedCommodity.foreignMatter}% (Max)</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Broken Ratio</span>
              <span className="font-bold text-[#374151]">{selectedCommodity.broken}%</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Purity Score</span>
              <span className="font-bold text-lime-600">{selectedCommodity.purity}% (Min)</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Packaging Type</span>
              <span className="font-bold text-[#374151]">{selectedCommodity.packaging}</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Certification Body</span>
              <span className="font-bold text-[#374151]">{selectedCommodity.certification || "Not certified"}</span>
            </div>
          </div>
        </div>

        {/* Live bidding/trading action board */}
        {isAuction ? (
          <div className="bg-amber-50/40 border border-[#D4AF37]/30 rounded-[20px] p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase block">ACTIVE AUCTION ENDS IN</span>
                <span className="text-xs font-bold text-red-500">2 Days 14 Hours</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block font-semibold">CURRENT BID</span>
                <span className="text-sm font-black text-[#374151] font-mono">
                  PKR {currentBidPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <form onSubmit={handlePlaceBid} className="flex gap-2">
              <input
                type="number"
                placeholder={`Min PKR ${(currentBidPrice + 500).toLocaleString()}`}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                required
              />
              <button
                type="submit"
                className="bg-[#374151] hover:bg-[#D4AF37] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
              >
                Place Bid
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-lime-50/40 border border-[#84CC16]/30 rounded-[20px] p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] text-gray-400 block font-semibold">ASK PRICE</span>
                <span className="text-sm font-black text-[#374151] font-mono">
                  PKR {selectedCommodity.price.toLocaleString()} <span className="text-[10px] font-normal text-gray-400">/{selectedCommodity.unit.split(' ')[0]}</span>
                </span>
              </div>
              <button
                onClick={handleInstantBuy}
                className="bg-[#84CC16] hover:bg-[#A3E635] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
              >
                Instant Spot Buy
              </button>
            </div>

            <div className="border-t border-[#E5E7EB]/50 pt-4 space-y-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">OR SUBMIT CONTRACT OFFER</span>
              <form onSubmit={handlePlaceOffer} className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="Offer Price/unit"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  className="bg-white border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#84CC16] col-span-2"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#374151] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Propose
                </button>
              </form>
            </div>
          </div>
        )}

        {/* AI Negotiation Assistant Simulator */}
        <div className="bg-[#F8F9FA] rounded-[20px] border border-[#E5E7EB] p-5 space-y-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#84CC16]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-black text-[#374151] uppercase">AI NEGOTIATION & INSIGHT ASSISTANT</span>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-xl p-3.5 h-[150px] overflow-y-auto space-y-3 text-xs leading-relaxed text-gray-500 font-medium no-scrollbar">
            {aiChatLog.map((chat, idx) => (
              <div key={idx} className={chat.sender === "AI" ? "text-lime-700 bg-lime-50/30 p-2 rounded-lg" : "text-gray-700 bg-gray-50 p-2 rounded-lg text-right"}>
                <strong>{chat.sender === "AI" ? "ZarZaraat AI: " : "You: "}</strong>
                {chat.message}
              </div>
            ))}
          </div>

          <form onSubmit={handleAiAsk} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask: 'Give discount strategy' or 'Predict next 30 days price'..."
              value={aiChatInput}
              onChange={(e) => setAiChatInput(e.target.value)}
              className="w-full bg-white border border-[#E5E7EB] rounded-xl px-3.5 py-2 text-xs focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-[#374151] text-white hover:bg-[#84CC16] text-xs font-bold px-4 py-2 rounded-xl"
            >
              Ask AI
            </button>
          </form>
        </div>

      </div>
    </Drawer>
  );
};
export default CommodityDetailDrawer;
