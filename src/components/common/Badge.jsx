import React from 'react';

export const Badge = ({
  children,
  variant = 'default', // 'default', 'lime', 'gold', 'blue', 'gray', 'red', 'orange'
  className = '',
}) => {
  const baseStyle = "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider";

  const variants = {
    default: "bg-[#F8F9FA] text-[#374151] border border-[#E5E7EB]",
    lime: "bg-[#ECFCCB] text-[#4D7C0F] border border-[#BEF264]/40",
    gold: "bg-amber-50 text-[#D4AF37] border border-[#D4AF37]/30 shadow-sm font-bold", // Premium Gold
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
    gray: "bg-[#F3F4F6] text-[#4B5563]",
    red: "bg-red-50 text-red-700 border border-red-200",
    orange: "bg-orange-50 text-orange-700 border border-orange-200"
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
export default Badge;
