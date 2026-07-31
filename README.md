# ZarZaraat (زار زراعت) - Premium Agricultural Commodity Exchange of Pakistan

ZarZaraat is a premium, enterprise-grade digital commodity exchange and trading platform tailored for Pakistan's agricultural sector. It functions like a sophisticated financial workstation, blending marketplace functions (like Alibaba and Pakistan Mandi) with secure escrow banking, automated logistics, and real-time market intelligence (similar to Vesper and Bloomberg Terminal).

The platform is designed exclusively in **Light Mode** using a premium corporate color palette (White, Light Gray, Border Gray, Lime Green, and Gold Accent) with soft shadows and professional typography (`Inter` & `Noto Nastaliq Urdu`). Emojis have been fully eliminated and replaced with premium vector SVGs and responsive indicators.

---

## Key Features

1. **Spot Market & Live Auctions**: Participate in spot trading or participating in live countdown auctions with automated auto-bidding simulation.
2. **Cascading Variety Selection**: Seller posting form dynamically cascades based on the category chosen (e.g., choosing **Rice** offers Basmati, Super Basmati, PK-386, IRRI-6, Jasmine, and Brown Rice).
3. **Custom Commodity Support**: Sellers can dynamically post unregistered crop categories ("+ Add Custom Commodity") which Admins can later approve, reject, or map permanently into the global index.
4. **Expanded Search Filters**: Instantly sort and filter listings by Category, Variety, Mandi City, Origin Province, Harvest Year, Organic Certification, Moisture %, and Purity % limits.
5. **Interactive Bloomberg Charts**: Gorgeous SVG-based charts allowing traders to toggle between Candlestick, Area, Line, and Volume bars overlaid with gold-accented Moving Averages.
6. **Integrated Escrow & Payments**: Secure mock Escrow wallet system with easy bank transfer, EasyPaisa, JazzCash, and Stripe-ready payment models.
7. **AI Negotiation Assistant**: Simulated AI engine offering price forecasts, quality risk scoring, buy/sell period analysis, and suggested counter-offer recommendations.
8. **Pakistan Mandi Prices**: Real-time benchmark index showing daily prices across major cities: Lahore, Faisalabad, Sahiwal, Okara, Multan, Bahawalpur, Rahim Yar Khan, Sukkur, Karachi, Peshawar, Quetta, and more.
9. **Logistics & Warehousing**: Real-time Pakistan city-to-city freight charge estimator, estimated transit times (ETA), and available storage capacity lookup.
10. **Bilingual RTL Support**: Fully localized in English and Urdu, supporting instantaneous language toggling with fluid layout alignments and custom typography.

---

## Tech Stack

- **Frontend Framework**: [React 18](https://react.dev/) (Vite Setup)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) / Responsive Vector SVGs
- **Test Runner**: [Vitest](https://vitest.dev/)

---

## Directory Structure

```bash
├── database/
│   └── schema.sql          # Scalable relational database schema with proper FKs
├── src/
│   ├── api/
│   │   ├── apiClient.js       # Persisted localStorage database engine and CRUD actions
│   │   ├── aiEngine.js        # AI Negotiator, price predictor, and risk scoring models
│   │   ├── logisticsEngine.js # Freight calculator, ETAs, and warehousing slots
│   │   ├── aiEngine.test.js   # Vitest unit specs for AI models
│   │   └── logisticsEngine.test.js
│   ├── components/
│   │   ├── common/            # Reusable UI elements (Button, Badge, Card, Drawer, Toast, etc.)
│   │   │   └── CommodityIcons.jsx # HD vector SVG crop icons
│   │   ├── charts/
│   │   │   └── InteractiveChart.jsx # Bloomberg-style SVG interactive charts
│   │   ├── Header.jsx         # Navigation header & dynamic multilingual controls
│   │   ├── Footer.jsx         # Regulatory disclaimer & legal site map
│   │   ├── LandingHeroAndTicker.jsx # Hero & animated marquee ticker
│   │   └── LandingInfoSections.jsx  # Benefits, FAQs, and trust testimonials
│   ├── context/
│   │   └── AppContext.jsx     # Global state provider coordinating user session, role & language switches
│   ├── pages/
│   │   ├── marketplace/
│   │   │   ├── Marketplace.jsx # Advanced marketplace spot trading and filters
│   │   │   └── CommodityDetailDrawer.jsx # Detail drawer with spec sheet & AI Chatbot
│   │   ├── dashboards/
│   │   │   └── Dashboards.jsx  # Dynamic Workstations (Farmer, Buyer, Broker, Admin)
│   │   └── LandingPage.jsx     # Exchange landing portal
│   ├── App.jsx                 # Core router
│   ├── main.jsx                # Entrypoint
│   └── index.css               # Global Tailwind directives & marquee keyframes
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## How to Run Locally

Follow these quick commands to spin up the exchange workstation locally:

### 1. Prerequisite Checks
Ensure you have **Node.js** (v18+) and **npm** installed:
```bash
node -v
npm -v
```

### 2. Install Dependencies
Clone this repository, navigate to the folder, and run:
```bash
npm install
```

### 3. Start Development Server
Boot up the fast local development server:
```bash
npm run dev
```
The console will display the local address. Typically:
- `http://localhost:3000/` or `http://localhost:5173/`

Open this URL in your web browser. You can seamlessly switch between **English/Urdu** in the navbar and toggle your active persona (**Farmer, Industrial Buyer, Broker, Admin**) in the My Workstation Workstation dropdown to inspect every dashboard immediately!

### 4. Run Production Build
Compile and bundle optimized static assets for release:
```bash
npm run build
```
The static files will be generated in the `dist/` directory.

### 5. Execute Unit & Integration Tests
ZarZaraat includes a suite of unit specs testing the AI risk models, pricing predictions, and Pakistan distance freight calculators. Run the tests using:
```bash
npm run test
```

---

## Verification & Trust Accents

- **Escrow Fee Structure**: Flat 1.0% escrow secure held fees.
- **Brokerage Commissions**: Integrated client commission portfolios with 0.5% broker-commission reports.
- **SGS and PFA Testing**: Lab verification modules certifying moisture under 12% and zero foreign matter before seller payout triggers.
- **Security Protocols**: Protected wallets with Stripe, Bank Transfer, EasyPaisa, and JazzCash.
