import React, { useEffect } from 'react';

export const Toast = ({
  message,
  type = 'success', // 'success', 'info', 'error'
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgTypes = {
    success: "bg-white border-l-4 border-[#84CC16] text-[#374151]",
    info: "bg-white border-l-4 border-[#D4AF37] text-[#374151]",
    error: "bg-white border-l-4 border-red-500 text-[#374151]"
  };

  const icons = {
    success: (
      <svg className="w-5 h-5 text-[#84CC16]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-[#E5E7EB] min-w-[300px] animate-slide-in transition-all">
      <div className={`flex items-center gap-3 ${bgTypes[type]} w-full h-full`}>
        {icons[type]}
        <div className="flex-1 text-sm font-medium">{message}</div>
        <button onClick={onClose} className="p-0.5 hover:bg-[#F8F9FA] rounded text-gray-400 hover:text-black">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default Toast;
