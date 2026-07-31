// ====================================================================
// ZarZaraat - REST API Client & Mock Database
// Persisted in localStorage to simulate real database actions.
// ====================================================================

const STORAGE_KEY = "zarzaraat_db_v1_p3";

// 1. Core Metadata Definitions
export const USER_TYPES = [
  "Farmer", "Trader", "Buyer", "Industrial Buyer", "Exporter",
  "Broker", "Commission Agent", "Warehouse Owner",
  "Transport Company", "Quality Inspector", "Admin", "Super Admin"
];

// Cascading Commodities & Varieties Map precisely matched to specifications
export const COMMODITY_MAP = {
  "Rice": [
    "Basmati", "Super Basmati", "PK-386", "IRRI-6", "KS-282",
    "Jasmine", "Brown Rice", "Broken Rice", "Other (Custom)"
  ],
  "Wheat": [
    "Hard Wheat", "Soft Wheat", "Durum Wheat", "Spring Wheat",
    "Winter Wheat", "Milling Wheat", "Feed Wheat", "Other (Custom)"
  ],
  "Maize": [
    "Yellow Maize", "White Maize", "Sweet Corn", "Baby Corn",
    "Flint Corn", "Dent Corn", "Popcorn", "Seed Maize", "Feed Maize", "Other (Custom)"
  ],
  "Cotton": ["Multan MNH-93", "Sindh Star Cotton", "KPK Long-Staple", "Other (Custom)"],
  "Sugarcane": ["Thatta-10", "CPF-247 Premium", "HSF-240", "Other (Custom)"],
  "Mustard": ["Canola-Mustard Gold", "Traditional Sarson", "Other (Custom)"],
  "Seeds": ["Hybrid Wheat F1 Seeds", "Cotton Bt Seeds", "Other (Custom)"],
  "Fertilizer": ["Urea Gold", "DAP Premium Phosphates", "SOP Sulphate", "Other (Custom)"],
  "Custom Commodity": ["Enter Custom Variety..."]
};

export const DEFAULT_COMMODITIES = Object.keys(COMMODITY_MAP);

export const PROVINCES = [
  "Punjab", "Sindh", "KPK", "Balochistan", "Gilgit-Baltistan", "AJK"
];

export const HARVEST_YEARS = ["2023", "2024", "2025"];

export const ORGANIC_STATUSES = ["Organic Certified", "Conventional"];

export const GRADES = [
  { id: "g1", name: "Grade A++ (Premium Export)", specs: { moisture: "10-12%", purity: "99%", broken: "<1%" } },
  { id: "g2", name: "Grade A (Standard)", specs: { moisture: "12-14%", purity: "97%", broken: "<3%" } },
  { id: "g3", name: "Grade B (Commercial)", specs: { moisture: "14-16%", purity: "94%", broken: "<5%" } },
  { id: "g4", name: "Average Quality", specs: { moisture: "16-18%", purity: "90%", broken: "<8%" } }
];

export const MANDI_CITIES = [
  "Lahore", "Faisalabad", "Sahiwal", "Okara", "Multan", "Bahawalpur",
  "Rahim Yar Khan", "DG Khan", "Hyderabad", "Sukkur", "Karachi", "Peshawar", "Quetta"
];

// Initial State / Mock Database Seed
const INITIAL_DATABASE = {
  users: [
    {
      id: "u1",
      email: "farmer.khan@zarzaraat.pk",
      phone: "+92 300 1234567",
      name: "Chaudhary Tariq Khan",
      company: "Khan Farms Sahiwal",
      type: "Farmer",
      cnic: "35202-1234567-1",
      ntn: "1234567-1",
      verificationStatus: "Verified",
      trustScore: 94,
      isPremium: true,
      isVerifiedBuyer: false,
      isTopTrader: true,
      balance: 1450000,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
    },
    {
      id: "u2",
      email: "trader.ahmed@zarzaraat.pk",
      phone: "+92 312 9876543",
      name: "Mian Haroon Ahmed",
      company: "Ahmed Agri Trade Corp",
      type: "Trader",
      cnic: "35202-7654321-1",
      ntn: "7654321-2",
      verificationStatus: "Verified",
      trustScore: 88,
      isPremium: true,
      isVerifiedBuyer: true,
      isTopTrader: true,
      balance: 5600000,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
    },
    {
      id: "u3",
      email: "buyer.mill@zarzaraat.pk",
      phone: "+92 321 4455667",
      name: "Sarmad Malik",
      company: "Chenab Flour & General Mills",
      type: "Industrial Buyer",
      cnic: "35201-9988776-5",
      ntn: "9988776-5",
      verificationStatus: "Verified",
      trustScore: 96,
      isPremium: false,
      isVerifiedBuyer: true,
      isTopTrader: false,
      balance: 12500000,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120"
    },
    {
      id: "u4",
      email: "broker.ali@zarzaraat.pk",
      phone: "+92 333 5551212",
      name: "Ali Raza Ghouri",
      company: "Ghouri Agri Brokerage",
      type: "Broker",
      cnic: "35202-1112223-3",
      ntn: "1112223-3",
      verificationStatus: "Verified",
      trustScore: 91,
      isPremium: true,
      isVerifiedBuyer: false,
      isTopTrader: false,
      balance: 320000,
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120"
    },
    {
      id: "u5",
      email: "admin@zarzaraat.pk",
      phone: "+92 300 0000000",
      name: "Exchange Administrator",
      company: "ZarZaraat HQ",
      type: "Admin",
      cnic: "35202-0000000-1",
      ntn: "0000000-1",
      verificationStatus: "Verified",
      trustScore: 100,
      isPremium: true,
      isVerifiedBuyer: true,
      isTopTrader: true,
      balance: 150000000,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
    }
  ],
  listings: [
    {
      id: "lst1",
      sellerId: "u1",
      sellerName: "Chaudhary Tariq Khan",
      sellerType: "Farmer",
      sellerVerified: true,
      category: "Rice",
      variety: "Super Basmati",
      grade: "Grade A++ (Premium Export)",
      quantity: 50,
      unit: "Metric Ton",
      price: 245000, // PKR per Metric Ton
      isNegotiable: true,
      isAuction: false,
      harvestDate: "2024-10-15",
      expiryDate: "2025-05-15",
      location: "Sahiwal",
      province: "Punjab",
      harvestYear: "2024",
      organicStatus: "Organic Certified",
      gps: { lat: 30.6682, lng: 73.1114 },
      moisture: 11.2,
      foreignMatter: 0.5,
      broken: 0.8,
      purity: 99.2,
      packaging: "50kg Jute Bags",
      certification: "SGS Premium Certified",
      isExportReady: true,
      status: "Active",
      images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600"],
      documents: ["SGS_Report_Oct24.pdf"],
      bids: [],
      offers: [],
      createdAt: "2024-11-01T10:00:00Z"
    },
    {
      id: "lst2",
      sellerId: "u2",
      sellerName: "Mian Haroon Ahmed",
      sellerType: "Trader",
      sellerVerified: true,
      category: "Wheat",
      variety: "Hard Wheat",
      grade: "Grade A (Standard)",
      quantity: 120,
      unit: "Metric Ton",
      price: 98000,
      isNegotiable: false,
      isAuction: true,
      reservePrice: 95000,
      minimumBid: 90000,
      currentBid: 96500,
      auctionEndTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      harvestDate: "2024-05-20",
      expiryDate: "2025-04-20",
      location: "Faisalabad",
      province: "Punjab",
      harvestYear: "2024",
      organicStatus: "Conventional",
      gps: { lat: 31.4504, lng: 73.1350 },
      moisture: 12.5,
      foreignMatter: 1.2,
      broken: 2.1,
      purity: 97.5,
      packaging: "Bulk Loose",
      certification: "Punjab Food Authority Lab Tested",
      isExportReady: false,
      status: "Active",
      images: ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600"],
      documents: ["PFA_Quality_Report.pdf"],
      bids: [
        { bidderName: "Chenab Mills", amount: 92000, timestamp: "2024-11-10T12:00:00Z" },
        { bidderName: "Sarmad Malik", amount: 96500, timestamp: "2024-11-11T14:30:00Z" }
      ],
      offers: [],
      createdAt: "2024-11-08T08:00:00Z"
    },
    {
      id: "lst3",
      sellerId: "u1",
      sellerName: "Chaudhary Tariq Khan",
      sellerType: "Farmer",
      sellerVerified: true,
      category: "Cotton",
      variety: "Multan MNH-93",
      grade: "Grade A++ (Premium Export)",
      quantity: 200,
      unit: "Maund",
      price: 9200, // PKR per Maund (40kg)
      isNegotiable: true,
      isAuction: false,
      harvestDate: "2024-09-10",
      expiryDate: "2025-08-10",
      location: "Multan",
      province: "Punjab",
      harvestYear: "2024",
      organicStatus: "Conventional",
      gps: { lat: 30.1575, lng: 71.5249 },
      moisture: 7.5,
      foreignMatter: 1.0,
      broken: 0.0,
      purity: 98.8,
      packaging: "Standard Cotton Bales",
      certification: "Pakistan Central Cotton Committee Approved",
      isExportReady: true,
      status: "Active",
      images: ["https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?auto=format&fit=crop&q=80&w=600"],
      documents: ["PCCC_Report.pdf"],
      bids: [],
      offers: [
        { id: "o1", buyerId: "u3", buyerName: "Sarmad Malik", price: 8800, qty: 200, status: "Pending", createdAt: "2024-11-12T09:00:00Z" }
      ],
      createdAt: "2024-11-05T14:00:00Z"
    },
    {
      id: "lst4",
      sellerId: "u2",
      sellerName: "Mian Haroon Ahmed",
      sellerType: "Trader",
      sellerVerified: true,
      category: "Maize",
      variety: "Yellow Maize",
      grade: "Grade B (Commercial)",
      quantity: 80,
      unit: "Metric Ton",
      price: 72000,
      isNegotiable: true,
      isAuction: false,
      harvestDate: "2024-08-01",
      expiryDate: "2025-02-01",
      location: "Okara",
      province: "Punjab",
      harvestYear: "2024",
      organicStatus: "Organic Certified",
      moisture: 14.8,
      foreignMatter: 2.5,
      broken: 4.2,
      purity: 94.0,
      packaging: "50kg PP Bags",
      certification: "Local Lab Verification",
      isExportReady: false,
      status: "Active",
      images: ["https://images.unsplash.com/photo-1551754625-705904ab34ad?auto=format&fit=crop&q=80&w=600"],
      documents: [],
      bids: [],
      offers: [],
      createdAt: "2024-11-10T11:00:00Z"
    }
  ],
  orders: [
    {
      id: "ord-1002",
      listingId: "lst1",
      sellerId: "u1",
      sellerName: "Chaudhary Tariq Khan",
      buyerId: "u3",
      buyerName: "Sarmad Malik",
      category: "Rice",
      variety: "Super Basmati",
      quantity: 10,
      unit: "Metric Ton",
      price: 245000,
      totalAmount: 2450000,
      escrowFee: 24500,
      status: "Funds_Escrowed", // Funds_Escrowed, In_Transit, Completed, Disputed
      paymentMethod: "Bank Transfer",
      createdAt: "2024-11-10T16:20:00Z"
    }
  ],
  mandiPrices: [
    { city: "Sahiwal", category: "Wheat", grade: "Grade A", price: 3950, change: 1.2 },
    { city: "Sahiwal", category: "Rice", grade: "Grade A++", price: 9800, change: -0.5 },
    { city: "Faisalabad", category: "Wheat", grade: "Grade A", price: 4010, change: 0.8 },
    { city: "Faisalabad", category: "Maize", grade: "Grade B", price: 2850, change: 2.1 },
    { city: "Lahore", category: "Rice", grade: "Grade A++", price: 10200, change: 1.5 },
    { city: "Multan", category: "Cotton", grade: "Grade A++", price: 9150, change: -1.0 },
    { city: "Karachi", category: "Wheat", grade: "Grade B", price: 4120, change: 0.4 },
    { city: "Okara", category: "Maize", grade: "Grade A", price: 3050, change: 1.1 },
    { city: "Peshawar", category: "Lentils", grade: "Grade A", price: 8400, change: 0.0 }
  ],
  blogs: [
    {
      id: "b1",
      title: "Pakistan Basmati Rice Export Trends 2024-25",
      slug: "pakistan-basmati-rice-export-trends-2024-25",
      author: "ZarZaraat Market Intel",
      summary: "Analyzing global demand shifts and how Pakistani exporters can secure record-high margins this season.",
      content: "This detailed report examines the premium basmati export channels, logistics optimization, and standardizing moisture to under 11.5% for European markets.",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400",
      date: "2024-11-12"
    },
    {
      id: "b2",
      title: "Maximizing Cotton Profits: Moisture & Quality Controls",
      slug: "maximizing-cotton-profits",
      author: "Mian Haroon Ahmed",
      summary: "Practical tips for Pakistani ginners and cotton farmers to secure higher grades and better pricing.",
      content: "Controlling foreign matter and moisture parameters in Multan mandis is vital. Here are standard storage and packaging insights.",
      image: "https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?auto=format&fit=crop&q=80&w=400",
      date: "2024-11-10"
    }
  ],
  chatMessages: [
    {
      id: "msg1",
      senderId: "u3",
      receiverId: "u1",
      message: "Aasalam-o-Alaikum Tariq Sahab, is the SGS certificate verified for the Basmati Rice?",
      attachment: null,
      createdAt: "2024-11-12T08:15:00Z"
    },
    {
      id: "msg2",
      senderId: "u1",
      receiverId: "u3",
      message: "Walaikum Assalam, yes Sarmad Sahab. I have attached the original SGS lab test copy here.",
      attachment: { name: "SGS_Certificate.pdf", type: "PDF" },
      createdAt: "2024-11-12T08:18:00Z"
    }
  ],
  systemSettings: {
    escrowCommissionPct: "1.0",
    brokerCommissionPct: "0.5",
    allowCustomCommodities: "true",
    exchangeStatus: "Normal"
  },
  // Custom Commodity and Varieties submitted by Users/Admins
  customCommodities: [
    { id: "cc1", category: "Grapes", variety: "Sundarkhani Premium", approved: true, date: "2024-11-10" },
    { id: "cc2", category: "Canola", variety: "Peshawar Black-Bt", approved: false, date: "2024-11-13" }
  ]
};

// Database persistence wrapper
export const getDB = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATABASE));
    return INITIAL_DATABASE;
  }
  return JSON.parse(data);
};

export const saveDB = (db) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

// 2. REST-API Simulation Client
export const apiClient = {
  // Current session user simulation
  getCurrentUser: () => {
    const session = localStorage.getItem("zarzaraat_current_user_id");
    if (session === "logged_out") return null;
    const currentId = session || "u1"; // default to Tariq Khan
    const db = getDB();
    return db.users.find(u => u.id === currentId) || null;
  },

  setCurrentUser: (userId) => {
    if (userId) {
      localStorage.setItem("zarzaraat_current_user_id", userId);
    } else {
      localStorage.removeItem("zarzaraat_current_user_id");
    }
  },

  getUsers: () => {
    return getDB().users;
  },

  registerUser: (userData) => {
    const db = getDB();
    const newUserId = "u_" + Math.random().toString(36).substring(2, 9);
    const newUser = {
      id: newUserId,
      email: userData.email || `${userData.name.toLowerCase().replace(/\s+/g, '')}@zarzaraat.pk`,
      phone: userData.phone || "+92 300 1112233",
      name: userData.name,
      company: userData.company || `${userData.name} Agro`,
      type: userData.type, // e.g. Farmer, Buyer, etc.
      cnic: userData.cnic || "35201-1111111-1",
      ntn: userData.ntn || "1111111-1",
      verificationStatus: "Verified",
      trustScore: 90,
      isPremium: false,
      isVerifiedBuyer: userData.type.toLowerCase().includes("buyer"),
      isTopTrader: false,
      balance: Number(userData.balance || 10000),
      avatar: userData.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120"
    };
    db.users.push(newUser);
    saveDB(db);
    localStorage.setItem("zarzaraat_current_user_id", newUserId);
    return newUser;
  },

  logoutUser: () => {
    localStorage.removeItem("zarzaraat_current_user_id");
  },

  updateUser: (userId, updatedFields) => {
    const db = getDB();
    const idx = db.users.findIndex(u => u.id === userId);
    if (idx > -1) {
      db.users[idx] = { ...db.users[idx], ...updatedFields };
      saveDB(db);
    }
    return db.users[idx];
  },

  // Commodity Listings
  getListings: (filters = {}) => {
    const db = getDB();
    let listings = [...db.listings];

    // Status filter
    if (filters.status) {
      listings = listings.filter(l => l.status === filters.status);
    }
    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      listings = listings.filter(l =>
        l.category.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.sellerName.toLowerCase().includes(q)
      );
    }
    // Commodity Category
    if (filters.category && filters.category !== "All") {
      listings = listings.filter(l => l.category === filters.category);
    }
    // Variety
    if (filters.variety && filters.variety !== "All") {
      listings = listings.filter(l => l.variety === filters.variety);
    }
    // Location / City
    if (filters.location && filters.location !== "All") {
      listings = listings.filter(l => l.location === filters.location);
    }
    // Province
    if (filters.province && filters.province !== "All") {
      listings = listings.filter(l => l.province === filters.province);
    }
    // Harvest Year
    if (filters.harvestYear && filters.harvestYear !== "All") {
      listings = listings.filter(l => l.harvestYear === filters.harvestYear);
    }
    // Organic Status
    if (filters.organicStatus && filters.organicStatus !== "All") {
      listings = listings.filter(l => l.organicStatus === filters.organicStatus);
    }
    // Auction / Direct Buy
    if (filters.isAuction !== undefined) {
      listings = listings.filter(l => l.isAuction === filters.isAuction);
    }
    // Export Ready
    if (filters.isExportReady) {
      listings = listings.filter(l => l.isExportReady);
    }
    // Sorting
    if (filters.sortBy) {
      if (filters.sortBy === "price_asc") {
        listings.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === "price_desc") {
        listings.sort((a, b) => b.price - a.price);
      } else if (filters.sortBy === "newest") {
        listings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    }

    return listings;
  },

  getListingById: (id) => {
    return getDB().listings.find(l => l.id === id);
  },

  createListing: (listingData) => {
    const db = getDB();
    const currentUser = apiClient.getCurrentUser();
    const newListing = {
      id: "lst_" + Math.random().toString(36).substring(2, 9),
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      sellerType: currentUser.type,
      sellerVerified: currentUser.verificationStatus === "Verified",
      status: "Active",
      createdAt: new Date().toISOString(),
      bids: [],
      offers: [],
      ...listingData
    };
    db.listings.push(newListing);
    saveDB(db);
    return newListing;
  },

  updateListing: (id, updatedFields) => {
    const db = getDB();
    const idx = db.listings.findIndex(l => l.id === id);
    if (idx > -1) {
      db.listings[idx] = { ...db.listings[idx], ...updatedFields };
      saveDB(db);
      return db.listings[idx];
    }
    return null;
  },

  // Custom commodities submitted by sellers
  getCustomCommodities: () => {
    return getDB().customCommodities;
  },

  addCustomCommodity: (category, variety) => {
    const db = getDB();
    const newCC = {
      id: "cc_" + Math.random().toString(36).substring(2, 9),
      category,
      variety,
      approved: false,
      date: new Date().toISOString().split("T")[0]
    };
    db.customCommodities.push(newCC);
    saveDB(db);
    return newCC;
  },

  approveCustomCommodity: (ccId) => {
    const db = getDB();
    const cc = db.customCommodities.find(c => c.id === ccId);
    if (cc) {
      cc.approved = true;
      // Add custom variety back into our global cascade map if not already present
      if (!COMMODITY_MAP[cc.category]) {
        COMMODITY_MAP[cc.category] = [cc.variety];
      } else if (!COMMODITY_MAP[cc.category].includes(cc.variety)) {
        COMMODITY_MAP[cc.category].push(cc.variety);
      }
      saveDB(db);
    }
    return cc;
  },

  rejectCustomCommodity: (ccId) => {
    const db = getDB();
    db.customCommodities = db.customCommodities.filter(c => c.id !== ccId);
    saveDB(db);
  },

  // Bids Management
  placeBid: (listingId, amount, isAutoBid = false, autoLimit = 0) => {
    const db = getDB();
    const currentUser = apiClient.getCurrentUser();
    const listing = db.listings.find(l => l.id === listingId);

    if (!listing) return { success: false, message: "Listing not found" };
    if (!listing.isAuction) return { success: false, message: "This listing is not an auction" };

    const minRequired = listing.currentBid ? listing.currentBid + 500 : listing.minimumBid || listing.price;
    if (amount < minRequired) {
      return { success: false, message: `Bid must be at least PKR ${minRequired.toLocaleString()}` };
    }

    const newBid = {
      bidderName: currentUser.name,
      amount,
      isAutoBid,
      maxAutoBidLimit: autoLimit,
      timestamp: new Date().toISOString()
    };

    listing.bids.push(newBid);
    listing.currentBid = amount;

    // Create systems notification
    db.notifications.push({
      id: "not_" + Math.random().toString(36).substring(2, 9),
      userId: listing.sellerId,
      title: `New Bid Placed on your ${listing.category}`,
      body: `${currentUser.name} has placed a bid of PKR ${amount.toLocaleString()} for your listing.`,
      type: "BidPlaced",
      isRead: false,
      createdAt: new Date().toISOString()
    });

    saveDB(db);
    return { success: true, listing };
  },

  // Offers & Counter Offers
  submitOffer: (listingId, offeredPrice, quantity) => {
    const db = getDB();
    const currentUser = apiClient.getCurrentUser();
    const listing = db.listings.find(l => l.id === listingId);

    if (!listing) return { success: false, message: "Listing not found" };

    const newOffer = {
      id: "off_" + Math.random().toString(36).substring(2, 9),
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      price: offeredPrice,
      qty: quantity,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    listing.offers.push(newOffer);

    // Create Notification for Seller
    db.notifications.push({
      id: "not_" + Math.random().toString(36).substring(2, 9),
      userId: listing.sellerId,
      title: `New Offer Received for ${listing.category}`,
      body: `${currentUser.name} offered PKR ${offeredPrice.toLocaleString()} per unit for ${quantity} ${listing.unit}.`,
      type: "OfferReceived",
      isRead: false,
      createdAt: new Date().toISOString()
    });

    saveDB(db);
    return { success: true, offer: newOffer };
  },

  respondToOffer: (listingId, offerId, status, counterPrice = null) => {
    const db = getDB();
    const listing = db.listings.find(l => l.id === listingId);
    if (!listing) return { success: false, message: "Listing not found" };

    const offer = listing.offers.find(o => o.id === offerId);
    if (!offer) return { success: false, message: "Offer not found" };

    offer.status = status;
    if (status === "Countered" && counterPrice) {
      offer.counterPrice = counterPrice;

      // Create notification back to buyer
      db.notifications.push({
        id: "not_" + Math.random().toString(36).substring(2, 9),
        userId: offer.buyerId,
        title: `Counter Offer Received`,
        body: `Seller proposed PKR ${counterPrice.toLocaleString()} per unit for your offer on ${listing.category}.`,
        type: "OfferReceived",
        isRead: false,
        createdAt: new Date().toISOString()
      });
    } else if (status === "Accepted") {
      // Create a simulated order
      const newOrder = {
        id: "ord-" + Math.floor(1000 + Math.random() * 9000),
        listingId: listing.id,
        sellerId: listing.sellerId,
        sellerName: listing.sellerName,
        buyerId: offer.buyerId,
        buyerName: offer.buyerName,
        category: listing.category,
        variety: listing.variety,
        quantity: offer.qty,
        unit: listing.unit,
        price: offer.counterPrice || offer.price,
        totalAmount: (offer.counterPrice || offer.price) * offer.qty,
        escrowFee: ((offer.counterPrice || offer.price) * offer.qty) * 0.01,
        status: "Awaiting_Escrow_Deposit",
        paymentMethod: "Bank Transfer",
        createdAt: new Date().toISOString()
      };
      db.orders.push(newOrder);
      listing.status = "Sold";
    }

    saveDB(db);
    return { success: true, listing };
  },

  // Orders & Escrow Release
  getOrders: () => {
    const db = getDB();
    const currentUser = apiClient.getCurrentUser();
    if (!currentUser) return [];
    // Filter orders where user is seller or buyer or broker/admin
    if (currentUser.type === "Admin" || currentUser.type === "Super Admin") {
      return db.orders;
    }
    return db.orders.filter(o => o.sellerId === currentUser.id || o.buyerId === currentUser.id);
  },

  depositEscrowFunds: (orderId) => {
    const db = getDB();
    const order = db.orders.find(o => o.id === orderId);
    if (order) {
      order.status = "Funds_Escrowed";

      // Notify seller
      db.notifications.push({
        id: "not_" + Math.random().toString(36).substring(2, 9),
        userId: order.sellerId,
        title: "Escrow Funds Deposited",
        body: `Buyer has deposited PKR ${order.totalAmount.toLocaleString()} into Escrow. You can safely ship the commodities.`,
        type: "PaymentReceived",
        isRead: false,
        createdAt: new Date().toISOString()
      });

      saveDB(db);
      return { success: true, order };
    }
    return { success: false, message: "Order not found" };
  },

  releaseEscrowFunds: (orderId) => {
    const db = getDB();
    const order = db.orders.find(o => o.id === orderId);
    if (order) {
      order.status = "Completed";

      // Give seller the balance
      const seller = db.users.find(u => u.id === order.sellerId);
      if (seller) {
        seller.balance = (seller.balance || 0) + (order.totalAmount - order.escrowFee);
      }

      // Notify seller
      db.notifications.push({
        id: "not_" + Math.random().toString(36).substring(2, 9),
        userId: order.sellerId,
        title: "Escrow Funds Released",
        body: `Buyer approved shipment. PKR ${(order.totalAmount - order.escrowFee).toLocaleString()} is added to your wallet.`,
        type: "PaymentReceived",
        isRead: false,
        createdAt: new Date().toISOString()
      });

      saveDB(db);
      return { success: true, order };
    }
    return { success: false, message: "Order not found" };
  },

  // Chat/Messages Support
  getChatHistory: (otherUserId) => {
    const db = getDB();
    const currentUser = apiClient.getCurrentUser();
    return db.chatMessages.filter(m =>
      (m.senderId === currentUser.id && m.receiverId === otherUserId) ||
      (m.senderId === otherUserId && m.receiverId === currentUser.id)
    ).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  },

  sendChatMessage: (receiverId, messageText, attachment = null) => {
    const db = getDB();
    const currentUser = apiClient.getCurrentUser();
    const newMsg = {
      id: "msg_" + Math.random().toString(36).substring(2, 9),
      senderId: currentUser.id,
      receiverId,
      message: messageText,
      attachment,
      createdAt: new Date().toISOString()
    };
    db.chatMessages.push(newMsg);
    saveDB(db);
    return newMsg;
  },

  // Market Intelligence & Mandi Prices
  getMandiPrices: () => {
    return getDB().mandiPrices;
  },

  addMandiPrice: (priceData) => {
    const db = getDB();
    db.mandiPrices.unshift(priceData);
    saveDB(db);
    return priceData;
  },

  getNotifications: () => {
    const db = getDB();
    const currentUser = apiClient.getCurrentUser();
    if (!currentUser) return [];
    return db.notifications.filter(n => n.userId === currentUser.id);
  },

  markNotificationsAsRead: () => {
    const db = getDB();
    const currentUser = apiClient.getCurrentUser();
    if (!currentUser) return;
    db.notifications.forEach(n => {
      if (n.userId === currentUser.id) n.isRead = true;
    });
    saveDB(db);
  },

  // Blogs & Knowledge Center
  getBlogs: () => {
    return getDB().blogs;
  },

  addBlogPost: (post) => {
    const db = getDB();
    const newPost = {
      id: "blog_" + Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString().split("T")[0],
      ...post
    };
    db.blogs.unshift(newPost);
    saveDB(db);
    return newPost;
  },

  getSystemSettings: () => {
    return getDB().systemSettings;
  },

  updateSystemSettings: (updated) => {
    const db = getDB();
    db.systemSettings = { ...db.systemSettings, ...updated };
    saveDB(db);
    return db.systemSettings;
  }
};
