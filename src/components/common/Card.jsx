import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = false,
  variant = 'white', // 'white', 'gray', 'borderless'
  onClick,
}) => {
  const baseStyle = "rounded-[18px] transition-all duration-300 overflow-hidden";

  const variants = {
    white: "bg-white border border-[#E5E7EB] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)]",
    gray: "bg-[#F8F9FA] border border-[#E5E7EB]",
    borderless: "bg-white shadow-[0_4px_30px_rgba(0,0,0,0.02)]",
  };

  const hoverStyle = hover
    ? "hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 cursor-pointer"
    : "";

  return (
    <div
      className={`${baseStyle} ${variants[variant]} ${hoverStyle} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
export default Card;
