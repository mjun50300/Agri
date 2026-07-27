import React from 'react';

export const Drawer = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg md:max-w-xl bg-white shadow-2xl flex flex-col h-full rounded-l-[24px]">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E5E7EB] flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#374151] tracking-tight">{title}</h2>
              {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#F8F9FA] text-[#374151] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-6 py-4 border-t border-[#E5E7EB] bg-[#F8F9FA] flex items-center justify-end gap-3 rounded-bl-[24px]">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Drawer;
