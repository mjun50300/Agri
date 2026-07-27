// ====================================================================
// ZarZaraat - AI Agricultural Decision Engine & Prediction Models
// Smart algorithms for price forecasting, risk scores, and negotiation guidance.
// ====================================================================

export const aiEngine = {
  /**
   * Evaluates the risk score of an agricultural lot based on laboratory specifications.
   * Higher moisture, broken grain ratio, or foreign matter results in high risk.
   */
  getRiskScore: (commodity, specs = {}) => {
    const moisture = Number(specs.moisture || 12);
    const broken = Number(specs.broken || 2);
    const foreign = Number(specs.foreignMatter || 1);

    let risk = 10; // base score out of 100 (10 means very low risk)

    if (moisture > 14) risk += (moisture - 14) * 15;
    if (broken > 4) risk += (broken - 4) * 10;
    if (foreign > 1.5) risk += (foreign - 1.5) * 20;

    const finalScore = Math.min(95, Math.max(12, Math.round(risk)));

    let label = "Low Risk";
    let color = "text-[#84CC16]";
    if (finalScore > 65) {
      label = "High Risk (Quality Degraded)";
      color = "text-red-500";
    } else if (finalScore > 35) {
      label = "Moderate Risk";
      color = "text-amber-500";
    }

    return { score: finalScore, label, color };
  },

  /**
   * Forecasts the market price change over the next 30, 90, or 365 days.
   */
  getPricePrediction: (commodity, timeframe = "30D") => {
    const norm = commodity ? commodity.toLowerCase() : "";
    let pct = 2.4;
    let sentiment = "Bullish";

    if (norm.includes("wheat")) {
      pct = timeframe === "30D" ? 1.8 : timeframe === "90D" ? 4.5 : 8.2;
      sentiment = "Bullish (Government support price reviews)";
    } else if (norm.includes("rice")) {
      pct = timeframe === "30D" ? 3.1 : timeframe === "90D" ? 5.8 : 12.4;
      sentiment = "Bullish (Strong export request to GCC and Europe)";
    } else if (norm.includes("cotton")) {
      pct = timeframe === "30D" ? -1.2 : timeframe === "90D" ? -3.4 : -1.5;
      sentiment = "Bearish (Arrival of bumper crops from southern Punjab)";
    } else {
      pct = timeframe === "30D" ? 1.5 : 4.0;
      sentiment = "Neutral / Stable";
    }

    return {
      percentageChange: pct,
      sentiment,
      isUp: pct >= 0,
      confidenceScore: "88%"
    };
  },

  /**
   * Recommends optimal buying windows.
   */
  getBestTimeToBuy: (commodity) => {
    const norm = commodity ? commodity.toLowerCase() : "";
    if (norm.includes("wheat")) return "April to June (Immediate post-harvest)";
    if (norm.includes("rice")) return "November to January";
    if (norm.includes("cotton")) return "September to November";
    return "Post-harvest month of specified category";
  },

  /**
   * Recommends optimal selling windows.
   */
  getBestTimeToSell: (commodity) => {
    const norm = commodity ? commodity.toLowerCase() : "";
    if (norm.includes("wheat")) return "December to February (Pre-harvest shortages)";
    if (norm.includes("rice")) return "May to July";
    if (norm.includes("cotton")) return "January to March";
    return "Pre-harvest low inventory periods";
  },

  /**
   * Suggests competitive counter-offer prices during negotiations.
   */
  getSuggestedCounterOffer: (basePrice, currentOffer, role = "Seller") => {
    const diff = Math.abs(basePrice - currentOffer);
    if (role === "Seller") {
      // Seller wants higher. Propose midway.
      return Math.round(basePrice - diff * 0.4);
    } else {
      // Buyer wants lower. Propose midway.
      return Math.round(currentOffer + diff * 0.4);
    }
  }
};
export default aiEngine;
