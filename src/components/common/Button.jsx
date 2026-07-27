import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost', 'lime', 'danger'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lime-500/50 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#374151] text-white hover:bg-black",
    secondary: "bg-[#F8F9FA] text-[#374151] border border-[#E5E7EB] hover:bg-[#ECFCCB]/30",
    outline: "bg-transparent text-[#374151] border border-[#E5E7EB] hover:bg-[#F8F9FA]",
    ghost: "bg-transparent text-[#374151] hover:bg-[#F8F9FA]",
    lime: "bg-[#84CC16] text-white hover:bg-[#A3E635] shadow-sm shadow-[#84CC16]/20",
    danger: "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
