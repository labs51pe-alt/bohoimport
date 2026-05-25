import { motion } from 'motion/react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function Logo({ size = 'md', animated = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32 md:w-36 md:h-36',
    lg: 'w-40 h-40 md:w-48 md:h-48'
  };

  return (
    <div id="boho-logo-container" className={`relative flex items-center justify-center rounded-full bg-white p-1 shadow-md ${sizeClasses[size]} border border-zinc-100`}>
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full fill-none select-none"
        initial={animated ? { rotate: -10, scale: 0.9, opacity: 0 } : false}
        animate={animated ? { rotate: 0, scale: 1, opacity: 1 } : false}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {/* SVG Definitions for patterns */}
        <defs>
          <pattern id="diagonal-stripes" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#18181b" strokeWidth="4" />
          </pattern>
        </defs>

        {/* Outer Circular border accent */}
        <circle cx="100" cy="100" r="96" stroke="#f4f4f5" strokeWidth="1" />
        <circle cx="100" cy="100" r="94" stroke="#e4e4e7" strokeWidth="0.5" strokeDasharray="4 2" />

        {/* Core Group containing the gift box */}
        <g transform="translate(0, -6)">
          {/* 1. Red Ribbon Loops (Bow) on top */}
          <path
            d="M 100 65 C 80 40, 65 52, 100 65 M 100 65 C 120 40, 135 52, 100 65"
            stroke="#f43f5e"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-sm"
          />
          <path
            d="M 100 65 C 86 32, 60 40, 100 65 M 100 65 C 114 32, 140 40, 100 65"
            stroke="#f43f5e"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Ribbon Center Knot */}
          <circle cx="100" cy="65" r="4.5" fill="#f43f5e" />

          {/* 2. Gift Box Lid (Black box overlay) */}
          <rect x="68" y="68" width="64" height="10" rx="1.5" fill="#18181b" />

          {/* 3. Gift Box Body (With diagonal stripes pattern) */}
          {/* Main filled square for stripes fallback & outline */}
          <rect x="73" y="80" width="54" height="34" fill="#ffffff" stroke="#18181b" strokeWidth="2.5" />
          {/* Colored background or transparent striped overlay */}
          <rect x="74.5" y="81.5" width="51" height="31" fill="url(#diagonal-stripes)" />
          
          {/* Vertical central ribbon (Solid white spacer with red or black line, let's keep it clean black) */}
          <rect x="96.5" y="80" width="7" height="34" fill="#ffffff" />
          <line x1="100" y1="78" x2="100" y2="114" stroke="#18181b" strokeWidth="3" />
        </g>

        {/* 4. Typography section */}
        {/* "BOHO" */}
        <text
          x="100"
          y="135"
          textAnchor="middle"
          fill="#18181b"
          fontSize="24"
          fontWeight="800"
          fontFamily="'Outfit', sans-serif"
          letterSpacing="4"
        >
          BOHO
        </text>

        {/* "IMPORT E.I.R.L." */}
        <text
          x="100"
          y="150"
          textAnchor="middle"
          fill="#71717a"
          fontSize="7.5"
          fontWeight="600"
          fontFamily="'Inter', sans-serif"
          letterSpacing="1.5"
        >
          IMPORT E.I.R.L.
        </text>

        {/* "¡Calidad para regalar!" - Script Styled Text */}
        <text
          x="100"
          y="172"
          textAnchor="middle"
          fill="#4b5563"
          fontSize="11.5"
          fontStyle="italic"
          fontFamily="'Playfair Display', Georgia, serif"
          fontWeight="500"
        >
          ¡Calidad para regalar!
        </text>
      </motion.svg>
    </div>
  );
}
