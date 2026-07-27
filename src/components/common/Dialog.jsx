import React from 'react';

export const Dialog = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Panel */}
      <div className="relative bg-white rounded-[20px] max-w-md w-full p-6 shadow-2xl border border-[#E5E7EB] z-10 transition-all transform scale-100">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-4">
          <h3 className="text-base font-bold text-[#374151] tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#F8F9FA] text-[#374151]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div>
          {children}
        </div>
      </div>
    </div>
  );
};
export default Dialog;
