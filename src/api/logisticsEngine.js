// ====================================================================
// ZarZaraat - Logistics Dispatch & Quality Inspection Engine
// Real-time freight calculators, ETA projections, and warehouse bookings.
// ====================================================================

export const logisticsEngine = {
  /**
   * Calculates simulated cargo freight charges in PKR based on tons and distance.
   */
  calculateFreight: (fromCity, toCity, quantityTons) => {
    const qty = Number(quantityTons || 1);

    // Simple mock distances from Lahore/Sahiwal nodes
    let ratePerTon = 1800; // default standard flatbed rate per ton

    const from = fromCity ? fromCity.toLowerCase() : "";
    const to = toCity ? toCity.toLowerCase() : "";

    if (from === to) {
      ratePerTon = 400; // local city carriage
    } else if (to.includes("karachi") || from.includes("karachi")) {
      ratePerTon = 4500; // long haul to port
    } else if (to.includes("sahiwal") && from.includes("lahore")) {
      ratePerTon = 1200;
    } else if (to.includes("faisalabad") && from.includes("multan")) {
      ratePerTon = 1500;
    } else if (to.includes("peshawar") || to.includes("quetta")) {
      ratePerTon = 3800;
    }

    const totalFreight = qty * ratePerTon;

    return {
      ratePerTon,
      totalFreight,
      currency: "PKR",
      formattedFreight: `PKR ${totalFreight.toLocaleString()}`
    };
  },

  /**
   * Projects estimated transit delivery times.
   */
  getETA: (fromCity, toCity) => {
    const from = fromCity ? fromCity.toLowerCase() : "";
    const to = toCity ? toCity.toLowerCase() : "";

    if (from === to) {
      return "Same Day Delivery (under 8 hours)";
    }

    if (to.includes("karachi") || from.includes("karachi") || to.includes("quetta")) {
      return "36 to 48 Hours Transit Time";
    }

    return "24 Hours (Next Day Dispatch)";
  },

  /**
   * Retrieves simulated storage facility slots.
   */
  getStorageAvailability: (city) => {
    const defaultWarehouses = [
      { name: "ZarZaraat Sahiwal Hub A", capacity: "5,000 Tons", available: "1,200 Tons", coldStorage: true, price: "PKR 250/Ton Monthly" },
      { name: "Multan Cotton Storage Terminal", capacity: "10,000 Tons", available: "4,500 Tons", coldStorage: false, price: "PKR 180/Ton Monthly" },
      { name: "Faisalabad Flour Mill Silos", capacity: "8,000 Tons", available: "0 Tons", coldStorage: false, price: "PKR 200/Ton Monthly" },
      { name: "Karachi Port Port Trust Dry-Yard", capacity: "20,000 Tons", available: "8,200 Tons", coldStorage: true, price: "PKR 350/Ton Monthly" }
    ];

    if (!city || city === "All") return defaultWarehouses;

    return defaultWarehouses.filter(w => w.name.toLowerCase().includes(city.toLowerCase()));
  }
};
export default logisticsEngine;
