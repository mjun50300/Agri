import React from 'react';

// Generates premium, modern, 3D-style commodity vector/glowing-gradient SVGs.
// This supports maximum aesthetics with white, lime, gold, and soft gray.

export const WheatIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="wheatGrad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#78350F" />
      </linearGradient>
      <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect width="100" height="100" rx="20" fill="#F8F9FA" />
    <path d="M50 20C50 20 42 35 48 50C42 60 50 80 50 80C50 80 58 60 52 50C58 35 50 20 50 20Z" fill="url(#wheatGrad)" filter="url(#softGlow)" />
    <circle cx="50" cy="30" r="4" fill="#FFFFFF" />
    <circle cx="44" cy="40" r="5" fill="#D4AF37" />
    <circle cx="56" cy="40" r="5" fill="#D4AF37" />
    <circle cx="42" cy="52" r="5.5" fill="#F59E0B" />
    <circle cx="58" cy="52" r="5.5" fill="#F59E0B" />
    <circle cx="45" cy="64" r="5" fill="#D4AF37" />
    <circle cx="55" cy="64" r="5" fill="#D4AF37" />
    <line x1="50" y1="20" x2="50" y2="85" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const RiceIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="riceGrad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="60%" stopColor="#E5E7EB" />
        <stop offset="100%" stopColor="#9CA3AF" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="#F8F9FA" />
    <path d="M35 50C35 35 45 25 50 25C50 25 55 35 55 50C55 65 45 75 40 75C40 75 35 65 35 50Z" fill="url(#riceGrad)" stroke="#D1D5DB" strokeWidth="1" />
    <path d="M48 58C48 45 58 35 63 35C63 35 68 45 68 58C68 71 58 81 53 81C53 81 48 71 48 58Z" fill="url(#riceGrad)" stroke="#D1D5DB" strokeWidth="1" />
    <path d="M52 28C54 24 59 20 62 21" stroke="#84CC16" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CottonIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cottonGrad" x1="30" y1="30" x2="70" y2="70" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F3F4F6" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="#F8F9FA" />
    <circle cx="50" cy="40" r="14" fill="url(#cottonGrad)" stroke="#E5E7EB" strokeWidth="1" />
    <circle cx="38" cy="52" r="12" fill="url(#cottonGrad)" stroke="#E5E7EB" strokeWidth="1" />
    <circle cx="62" cy="52" r="12" fill="url(#cottonGrad)" stroke="#E5E7EB" strokeWidth="1" />
    <circle cx="50" cy="62" r="14" fill="url(#cottonGrad)" stroke="#E5E7EB" strokeWidth="1" />
    <path d="M50 58 L50 82" stroke="#4D7C0F" strokeWidth="4" strokeLinecap="round" />
    <path d="M40 70 Q50 65 60 70" stroke="#4D7C0F" strokeWidth="2" fill="none" />
  </svg>
);

export const SugarcaneIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#F8F9FA" />
    <path d="M40 85 L48 15" stroke="#65A30D" strokeWidth="6" strokeLinecap="round" />
    <path d="M50 85 L58 20" stroke="#4D7C0F" strokeWidth="6" strokeLinecap="round" />
    {/* Nodes */}
    <circle cx="46" cy="32" r="4.5" fill="#ECFCCB" />
    <circle cx="44" cy="50" r="4.5" fill="#ECFCCB" />
    <circle cx="42" cy="68" r="4.5" fill="#ECFCCB" />
    <circle cx="56" cy="36" r="4.5" fill="#D9F99D" />
    <circle cx="54" cy="54" r="4.5" fill="#D9F99D" />
    <circle cx="52" cy="72" r="4.5" fill="#D9F99D" />
    {/* Leaves */}
    <path d="M48 20 Q30 10 25 25" stroke="#84CC16" strokeWidth="2" fill="none" />
    <path d="M56 25 Q75 15 80 30" stroke="#84CC16" strokeWidth="2" fill="none" />
  </svg>
);

export const MaizeIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#F8F9FA" />
    <path d="M50 20 Q35 50 50 80 Q65 50 50 20 Z" fill="#FBBF24" />
    <circle cx="46" cy="35" r="2.5" fill="#F59E0B" />
    <circle cx="54" cy="35" r="2.5" fill="#F59E0B" />
    <circle cx="45" cy="45" r="3" fill="#D97706" />
    <circle cx="55" cy="45" r="3" fill="#D97706" />
    <circle cx="46" cy="55" r="3" fill="#F59E0B" />
    <circle cx="54" cy="55" r="3" fill="#F59E0B" />
    <circle cx="48" cy="65" r="2.5" fill="#D97706" />
    <circle cx="52" cy="65" r="2.5" fill="#D97706" />
    {/* Husk */}
    <path d="M35 55 Q42 80 50 82" stroke="#65A30D" strokeWidth="3.5" fill="none" />
    <path d="M65 55 Q58 80 50 82" stroke="#65A30D" strokeWidth="3.5" fill="none" />
  </svg>
);

export const CustomCommodityIcon = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#F8F9FA" />
    <path d="M50 25 L75 40 L75 68 L50 83 L25 68 L25 40 Z" stroke="#84CC16" strokeWidth="3" fill="#ECFCCB" />
    <line x1="50" y1="25" x2="50" y2="83" stroke="#84CC16" strokeWidth="1.5" />
    <line x1="25" y1="40" x2="50" y2="54" stroke="#84CC16" strokeWidth="1.5" />
    <line x1="75" y1="40" x2="50" y2="54" stroke="#84CC16" strokeWidth="1.5" />
  </svg>
);

export const getIconForCommodity = (name, className = "w-12 h-12") => {
  const norm = name ? name.toLowerCase() : "";
  if (norm.includes("wheat")) return <WheatIcon className={className} />;
  if (norm.includes("rice")) return <RiceIcon className={className} />;
  if (norm.includes("cotton")) return <CottonIcon className={className} />;
  if (norm.includes("sugar")) return <SugarcaneIcon className={className} />;
  if (norm.includes("maize") || norm.includes("corn")) return <MaizeIcon className={className} />;
  return <CustomCommodityIcon className={className} />;
};
