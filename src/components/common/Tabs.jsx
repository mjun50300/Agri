import React from 'react';

export const Tabs = ({
  tabs = [], // [{ id, label, count }]
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`border-b border-[#E5E7EB] flex gap-6 overflow-x-auto ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`pb-3 text-sm font-semibold tracking-wide relative flex items-center gap-2 whitespace-nowrap transition-colors focus:outline-none ${
              isActive
                ? 'text-[#374151]'
                : 'text-gray-400 hover:text-[#374151]'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                isActive
                  ? 'bg-[#84CC16] text-white'
                  : 'bg-[#F8F9FA] text-gray-500 border border-[#E5E7EB]'
              }`}>
                {tab.count}
              </span>
            )}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#84CC16] rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};
export default Tabs;
