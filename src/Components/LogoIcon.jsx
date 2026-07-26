import React from 'react';

const LogoIcon = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="paint0_linear" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ea580c" /> {/* Orange accent */}
          <stop offset="1" stopColor="#f97316" stopOpacity="0"/>
        </linearGradient>
      </defs>
      
      <path 
        d="M10 75C10 75 25 90 50 90C75 90 90 75 90 75L75 20C75 20 65 5 50 5C35 5 25 20 25 20L10 75Z" 
        fill="#0f172a"
      />
      
      <path 
        d="M5 80C5 80 20 95 50 95C80 95 95 80 95 80L90 15C90 15 80 -2 50 -2C20 -2 10 15 10 15L5 80Z" 
        fill="url(#paint0_linear)" 
        style={{ mixBlendMode: 'screen' }} 
      />
    </svg>
  );
};

export default LogoIcon;