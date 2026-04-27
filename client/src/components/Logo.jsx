// Futuristic PrepMate Logo SVG — white version (for colored/dark backgrounds)
export function LogoIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2 L34 10 L34 30 L20 38 L6 30 L6 10 Z" fill="white" opacity="0.15"/>
      <path d="M20 2 L34 10 L34 30 L20 38 L6 30 L6 10 Z" stroke="white" strokeWidth="1.5" fill="none" opacity="0.9"/>
      <line x1="20" y1="8" x2="20" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="26" x2="20" y2="32" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10" y1="15" x2="15" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="30" y1="15" x2="25" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="10" y1="25" x2="15" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="30" y1="25" x2="25" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <circle cx="20" cy="20" r="5.5" fill="white" opacity="0.2"/>
      <circle cx="20" cy="20" r="3.5" fill="white" opacity="0.9"/>
      <circle cx="20" cy="20" r="1.5" fill="white"/>
      <circle cx="20" cy="11" r="1.5" fill="white" opacity="0.9"/>
      <circle cx="20" cy="29" r="1.5" fill="white" opacity="0.9"/>
      <circle cx="12" cy="15.5" r="1.2" fill="white" opacity="0.7"/>
      <circle cx="28" cy="15.5" r="1.2" fill="white" opacity="0.7"/>
      <circle cx="12" cy="24.5" r="1.2" fill="white" opacity="0.7"/>
      <circle cx="28" cy="24.5" r="1.2" fill="white" opacity="0.7"/>
    </svg>
  );
}

// Green version (for white/light backgrounds)
export function LogoIconGreen({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2 L34 10 L34 30 L20 38 L6 30 L6 10 Z" fill="url(#lg)" opacity="0.12"/>
      <path d="M20 2 L34 10 L34 30 L20 38 L6 30 L6 10 Z" stroke="url(#lg)" strokeWidth="1.5" fill="none"/>
      <line x1="20" y1="8" x2="20" y2="14" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="26" x2="20" y2="32" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10" y1="15" x2="15" y2="18" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="30" y1="15" x2="25" y2="18" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="10" y1="25" x2="15" y2="22" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="30" y1="25" x2="25" y2="22" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <circle cx="20" cy="20" r="5.5" fill="url(#lg)" opacity="0.15"/>
      <circle cx="20" cy="20" r="3.5" fill="url(#lg)"/>
      <circle cx="20" cy="20" r="1.5" fill="white"/>
      <circle cx="20" cy="11" r="1.5" fill="#16a34a"/>
      <circle cx="20" cy="29" r="1.5" fill="#16a34a"/>
      <circle cx="12" cy="15.5" r="1.2" fill="#4ade80"/>
      <circle cx="28" cy="15.5" r="1.2" fill="#4ade80"/>
      <circle cx="12" cy="24.5" r="1.2" fill="#4ade80"/>
      <circle cx="28" cy="24.5" r="1.2" fill="#4ade80"/>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#16a34a"/>
          <stop offset="100%" stopColor="#4ade80"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
