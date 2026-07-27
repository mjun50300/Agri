import React, { useState } from 'react';

// Bloomberg / TradingView style custom interactive charting engine.
// Rendered using highly responsive SVGs with grid lines, moving averages,
// candlestick bodies, area gradients, and volume bars. This avoids compilation issues
// and is fully customizable with beautiful premium lighting.

const MOCK_HISTORICAL_DATA = {
  Wheat: {
    "7D": [
      { date: "Mon", open: 3880, close: 3950, high: 3980, low: 3860, volume: 450, ma: 3900 },
      { date: "Tue", open: 3950, close: 3920, high: 3960, low: 3900, volume: 380, ma: 3915 },
      { date: "Wed", open: 3920, close: 4010, high: 4030, low: 3910, volume: 620, ma: 3935 },
      { date: "Thu", open: 4010, close: 3990, high: 4020, low: 3970, volume: 290, ma: 3950 },
      { date: "Fri", open: 3990, close: 4050, high: 4080, low: 3980, volume: 550, ma: 3975 },
      { date: "Sat", open: 4050, close: 4080, high: 4100, low: 4030, volume: 420, ma: 4000 },
      { date: "Sun", open: 4080, close: 4120, high: 4150, low: 4060, volume: 480, ma: 4020 }
    ],
    "30D": [
      { date: "W1", open: 3800, close: 3890, high: 3920, low: 3780, volume: 2200, ma: 3820 },
      { date: "W2", open: 3890, close: 3940, high: 3980, low: 3850, volume: 1900, ma: 3860 },
      { date: "W3", open: 3940, close: 4010, high: 4050, low: 3910, volume: 2500, ma: 3910 },
      { date: "W4", open: 4010, close: 4120, high: 4160, low: 3990, volume: 3100, ma: 3975 }
    ],
    "1Y": [
      { date: "Q1", open: 3500, close: 3680, high: 3750, low: 3420, volume: 9200, ma: 3550 },
      { date: "Q2", open: 3680, close: 3820, high: 3890, low: 3610, volume: 11400, ma: 3650 },
      { date: "Q3", open: 3820, close: 3950, high: 4020, low: 3750, volume: 13200, ma: 3770 },
      { date: "Q4", open: 3950, close: 4120, high: 4200, low: 3890, volume: 15100, ma: 3910 }
    ]
  },
  "Basmati Rice": {
    "7D": [
      { date: "Mon", open: 9750, close: 9800, high: 9850, low: 9700, volume: 120, ma: 9750 },
      { date: "Tue", open: 9800, close: 9740, high: 9820, low: 9710, volume: 95, ma: 9760 },
      { date: "Wed", open: 9740, close: 9850, high: 9900, low: 9720, volume: 180, ma: 9780 },
      { date: "Thu", open: 9850, close: 9910, high: 9950, low: 9810, volume: 140, ma: 9810 },
      { date: "Fri", open: 9910, close: 9880, high: 9940, low: 9850, volume: 110, ma: 9830 },
      { date: "Sat", open: 9880, close: 9940, high: 9980, low: 9860, volume: 165, ma: 9850 },
      { date: "Sun", open: 9940, close: 10200, high: 10250, low: 9920, volume: 210, ma: 9890 }
    ],
    "30D": [
      { date: "W1", open: 9500, close: 9650, high: 9700, low: 9400, volume: 650, ma: 9520 },
      { date: "W2", open: 9650, close: 9780, high: 9850, low: 9600, volume: 810, ma: 9600 },
      { date: "W3", open: 9780, close: 9890, high: 9940, low: 9720, volume: 730, ma: 9710 },
      { date: "W4", open: 9890, close: 10200, high: 10280, low: 9840, volume: 990, ma: 9850 }
    ],
    "1Y": [
      { date: "Q1", open: 8800, close: 9100, high: 9250, low: 8650, volume: 3200, ma: 8900 },
      { date: "Q2", open: 9100, close: 9450, high: 9600, low: 9000, volume: 4100, ma: 9150 },
      { date: "Q3", open: 9450, close: 9800, high: 9950, low: 9350, volume: 4800, ma: 9420 },
      { date: "Q4", open: 9800, close: 10200, high: 10400, low: 9700, volume: 5500, ma: 9760 }
    ]
  },
  Cotton: {
    "7D": [
      { date: "Mon", open: 9300, close: 9250, high: 9350, low: 9200, volume: 840, ma: 9280 },
      { date: "Tue", open: 9250, close: 9180, high: 9280, low: 9150, volume: 710, ma: 9250 },
      { date: "Wed", open: 9180, close: 9240, high: 9290, low: 9160, volume: 920, ma: 9230 },
      { date: "Thu", open: 9240, close: 9150, high: 9250, low: 9100, volume: 680, ma: 9210 },
      { date: "Fri", open: 9150, close: 9210, high: 9260, low: 9130, volume: 790, ma: 9200 },
      { date: "Sat", open: 9210, close: 9190, high: 9240, low: 9160, volume: 550, ma: 9195 },
      { date: "Sun", open: 9190, close: 9150, high: 9220, low: 9110, volume: 610, ma: 9180 }
    ],
    "30D": [
      { date: "W1", open: 9400, close: 9310, high: 9480, low: 9250, volume: 3400, ma: 9350 },
      { date: "W2", open: 9310, close: 9250, high: 9360, low: 9180, volume: 2900, ma: 9310 },
      { date: "W3", open: 9250, close: 9210, high: 9300, low: 9140, volume: 3100, ma: 9260 },
      { date: "W4", open: 9210, close: 9150, high: 9250, low: 9110, volume: 3800, ma: 9210 }
    ],
    "1Y": [
      { date: "Q1", open: 8500, close: 8900, high: 9100, low: 8400, volume: 12500, ma: 8650 },
      { date: "Q2", open: 8900, close: 9150, high: 9300, low: 8750, volume: 14100, ma: 8850 },
      { date: "Q3", open: 9150, close: 9350, high: 9500, low: 9050, volume: 15900, ma: 9100 },
      { date: "Q4", open: 9350, close: 9150, high: 9450, low: 8990, volume: 16800, ma: 9210 }
    ]
  }
};

export const InteractiveChart = ({
  commodityName = "Wheat",
  height = 300,
  showSidebar = true,
}) => {
  const [chartType, setChartType] = useState("Candlestick"); // "Candlestick", "Area", "Line"
  const [timeframe, setTimeframe] = useState("7D"); // "7D", "30D", "1Y"
  const [hoveredData, setHoveredData] = useState(null);

  const commodityData = MOCK_HISTORICAL_DATA[commodityName] || MOCK_HISTORICAL_DATA["Wheat"];
  const currentDataset = commodityData[timeframe] || commodityData["7D"];

  // Normalize data bounds for drawing
  const closes = currentDataset.map(d => d.close);
  const highs = currentDataset.map(d => d.high);
  const lows = currentDataset.map(d => d.low);
  const maxPrice = Math.max(...highs) * 1.01;
  const minPrice = Math.min(...lows) * 0.99;
  const priceRange = maxPrice - minPrice;

  const maxVolume = Math.max(...currentDataset.map(d => d.volume));

  // Graph Width & Dimensions
  const width = 600;
  const graphHeight = height - 80;
  const paddingX = 40;
  const paddingY = 20;

  const getX = (index) => {
    return paddingX + (index / (currentDataset.length - 1)) * (width - paddingX * 2);
  };

  const getY = (price) => {
    return paddingY + ((maxPrice - price) / priceRange) * (graphHeight - paddingY * 2);
  };

  // Generate SVG Path for Area/Line Chart
  let linePath = "";
  let areaPath = "";
  currentDataset.forEach((pt, idx) => {
    const x = getX(idx);
    const y = getY(pt.close);
    if (idx === 0) {
      linePath = `M ${x} ${y}`;
      areaPath = `M ${x} ${graphHeight} L ${x} ${y}`;
    } else {
      linePath += ` L ${x} ${y}`;
      areaPath += ` L ${x} ${y}`;
    }
    if (idx === currentDataset.length - 1) {
      areaPath += ` L ${x} ${graphHeight} Z`;
    }
  });

  // Generate SVG Path for Moving Average
  let maPath = "";
  currentDataset.forEach((pt, idx) => {
    const x = getX(idx);
    const y = getY(pt.ma);
    if (idx === 0) {
      maPath = `M ${x} ${y}`;
    } else {
      maPath += ` L ${x} ${y}`;
    }
  });

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.02)]">
      {/* Chart Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4 mb-5">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16] animate-pulse" />
          <div>
            <h3 className="text-sm font-bold text-[#374151] uppercase tracking-wide">
              {commodityName} Market Intelligence
            </h3>
            <p className="text-[11px] text-gray-400 font-medium">
              Real-time TradingView / Bloomberg Terminal Core Feed
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Chart Type Switches */}
          <div className="bg-[#F8F9FA] rounded-lg p-1 border border-[#E5E7EB] flex gap-1">
            {["Candlestick", "Area", "Line"].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  chartType === type
                    ? 'bg-[#374151] text-white'
                    : 'text-gray-400 hover:text-[#374151]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Timeframe Switches */}
          <div className="bg-[#F8F9FA] rounded-lg p-1 border border-[#E5E7EB] flex gap-1">
            {["7D", "30D", "1Y"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  timeframe === tf
                    ? 'bg-[#84CC16] text-white'
                    : 'text-gray-400 hover:text-[#374151]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SVG Render */}
        <div className="col-span-1 lg:col-span-3 relative">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto overflow-visible select-none"
          >
            {/* Defs for gradients */}
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#84CC16" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#84CC16" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines (Y-Axis) */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = paddingY + ratio * (graphHeight - paddingY * 2);
              const priceLabel = Math.round(maxPrice - ratio * priceRange);
              return (
                <g key={i} className="opacity-40">
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={width - paddingX + 5}
                    y={y + 4}
                    fill="#9CA3AF"
                    className="text-[9px] font-semibold"
                  >
                    PKR {priceLabel.toLocaleString()}
                  </text>
                </g>
              );
            })}

            {/* Grid Lines (X-Axis) */}
            {currentDataset.map((pt, idx) => {
              const x = getX(idx);
              return (
                <g key={idx} className="opacity-40">
                  <line
                    x1={x}
                    y1={paddingY}
                    x2={x}
                    y2={graphHeight}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={x}
                    y={graphHeight + 15}
                    textAnchor="middle"
                    fill="#374151"
                    className="text-[10px] font-bold"
                  >
                    {pt.date}
                  </text>
                </g>
              );
            })}

            {/* Render Area Chart */}
            {chartType === "Area" && (
              <>
                <path d={areaPath} fill="url(#areaGrad)" />
                <path d={linePath} fill="none" stroke="#84CC16" strokeWidth="2.5" />
              </>
            )}

            {/* Render Line Chart */}
            {chartType === "Line" && (
              <path d={linePath} fill="none" stroke="#374151" strokeWidth="2.5" />
            )}

            {/* Render Candlestick Chart */}
            {chartType === "Candlestick" && currentDataset.map((pt, idx) => {
              const x = getX(idx);
              const yOpen = getY(pt.open);
              const yClose = getY(pt.close);
              const yHigh = getY(pt.high);
              const yLow = getY(pt.low);
              const isBullish = pt.close >= pt.open;

              return (
                <g key={idx}>
                  {/* Wick */}
                  <line
                    x1={x}
                    y1={yHigh}
                    x2={x}
                    y2={yLow}
                    stroke={isBullish ? "#84CC16" : "#EF4444"}
                    strokeWidth="1.5"
                  />
                  {/* Candle Body */}
                  <rect
                    x={x - 6}
                    y={Math.min(yOpen, yClose)}
                    width="12"
                    height={Math.max(2, Math.abs(yOpen - yClose))}
                    fill={isBullish ? "#84CC16" : "#EF4444"}
                    rx="1.5"
                  />
                </g>
              );
            })}

            {/* Moving Average Line Overlay (Dotted Gold) */}
            <path d={maPath} fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Volume Chart at the very bottom */}
            {currentDataset.map((pt, idx) => {
              const x = getX(idx);
              const barHeight = (pt.volume / maxVolume) * 25;
              const y = graphHeight - barHeight;
              const isBullish = pt.close >= pt.open;

              return (
                <rect
                  key={idx}
                  x={x - 4}
                  y={y}
                  width="8"
                  height={barHeight}
                  fill={isBullish ? "#84CC16" : "#EF4444"}
                  className="opacity-30"
                />
              );
            })}

            {/* Interactive Hover Interaction Points */}
            {currentDataset.map((pt, idx) => {
              const x = getX(idx);
              return (
                <rect
                  key={idx}
                  x={x - 15}
                  y={paddingY}
                  width="30"
                  height={graphHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredData(pt)}
                  onMouseLeave={() => setHoveredData(null)}
                />
              );
            })}
          </svg>
        </div>

        {/* Sidebar Data Widget (Bloomberg layout style) */}
        <div className="col-span-1 bg-[#F8F9FA] rounded-[16px] p-4 border border-[#E5E7EB] flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              {hoveredData ? "Selected Node Feed" : "Current Indicators"}
            </span>

            <div className="mt-2 space-y-3.5">
              <div>
                <span className="text-xs text-gray-400 block font-medium">Close Price</span>
                <span className="text-lg font-bold text-[#374151]">
                  PKR {hoveredData ? hoveredData.close.toLocaleString() : currentDataset[currentDataset.length - 1].close.toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">Open</span>
                  <span className="text-xs font-semibold text-[#374151]">
                    {hoveredData ? hoveredData.open.toLocaleString() : currentDataset[currentDataset.length - 1].open.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">Volume</span>
                  <span className="text-xs font-semibold text-[#374151]">
                    {hoveredData ? hoveredData.volume : currentDataset[currentDataset.length - 1].volume} MT
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-[#E5E7EB] pt-2.5">
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">7D High</span>
                  <span className="text-xs font-semibold text-lime-600">
                    PKR {Math.max(...highs).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">7D Low</span>
                  <span className="text-xs font-semibold text-red-500">
                    PKR {Math.min(...lows).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E7EB] text-[10px] text-gray-400 font-medium">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-gray-500 font-bold text-[9px]">Gold: Moving Average (MA)</span>
            </div>
            Updated standard daily prices for grains and seeds in Pakistan.
          </div>
        </div>
      </div>
    </div>
  );
};
export default InteractiveChart;
