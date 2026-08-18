import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Sparkles, 
  ShoppingBag, 
  MessageCircle, 
  Star, 
  Flame, 
  Truck, 
  Crown, 
  ChevronRight, 
  Gift, 
  CheckCircle2, 
  Heart,
  ArrowDown
} from 'lucide-react';
import floatingGiftBoxRealImage from '../assets/images/boho_floating_giftbox_3d_1787068175950.jpg';

interface Hero3DParallaxProps {
  onOpenCatalog?: () => void;
  onOpenQuoteModal?: () => void;
}

export const Hero3DParallax: React.FC<Hero3DParallaxProps> = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Parallax spring physics for 3D box levitation & tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 18 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 18 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['18deg', '-18deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-18deg', '18deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || e.touches.length === 0) return;
    const rect = cardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <section 
      id="hero-3d-section"
      className="relative overflow-hidden rounded-[26px] sm:rounded-[44px] bg-gradient-to-b from-rose-50/70 via-pink-50/30 to-white dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 border border-rose-200/80 dark:border-zinc-800 p-4 sm:p-8 lg:p-10 shadow-sm transition-all duration-300 gift-shimmer text-center"
    >
      {/* Decorative ambient background glows & floating circular dots */}
      <div className="absolute -top-16 -left-16 w-60 sm:w-72 h-60 sm:h-72 bg-rose-300/30 dark:bg-rose-950/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 sm:w-80 h-64 sm:h-80 bg-pink-300/25 dark:bg-pink-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-rose-200/20 dark:bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

      {/* Floating reference background dots */}
      <div className="absolute top-6 left-5 w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-rose-400/50 blur-[0.5px] animate-pulse pointer-events-none" />
      <div className="absolute top-16 right-5 w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-pink-400/60 blur-[0.5px] animate-ping pointer-events-none" />
      <div className="absolute bottom-12 left-6 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-rose-500/40 pointer-events-none" />
      <div className="absolute bottom-20 right-6 w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 rounded-full bg-rose-300/50 blur-[0.5px] pointer-events-none" />

      {/* Main vertical poster container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-4 sm:space-y-6">
        
        {/* 1. Top Brand Pill Badge */}
        <motion.div 
          initial={{ scale: 0.85, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-100/90 via-pink-50/90 to-rose-100/90 dark:from-rose-950 dark:via-rose-900/60 dark:to-rose-950 border border-rose-200 dark:border-rose-800/80 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-xs"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
          </span>
          <span className="text-[11px] sm:text-sm font-black text-rose-950 dark:text-rose-200 font-gift tracking-widest uppercase">
            BOHO IMPORT • MAYORISTA 🎁
          </span>
        </motion.div>

        {/* 2. Bold Expressive Headline */}
        <div className="space-y-1.5 sm:space-y-2 text-center max-w-2xl px-1">
          <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black font-display text-zinc-900 dark:text-white tracking-tight leading-[1.12]">
            Detalles que{' '}
            <span className="relative inline-block text-rose-600 dark:text-rose-400 font-gift font-black">
              Despiertan
              <svg 
                className="absolute -bottom-1 left-0 w-full h-2.5 sm:h-3.5 text-rose-500/80 dark:text-rose-400/80 -z-10" 
                viewBox="0 0 100 20" 
                preserveAspectRatio="none"
              >
                <path d="M0,14 Q50,2 100,14" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
              </svg>
            </span>
            <br />
            Tus Sentidos ✨
          </h1>
          <p className="text-[11px] sm:text-sm md:text-base text-zinc-600 dark:text-zinc-300 font-medium max-w-lg mx-auto leading-relaxed pt-0.5">
            Bolsas llanas, cajas de regalo armables, toppers en corrospum y papel de seda. ¡Atención directa en Mesa Redonda y envíos a todo el Perú! 🚚
          </p>
        </div>

        {/* 3. Central Hyper-Realistic 3D Exploded / Floating Gift Box */}
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseLeave}
          className="relative w-full max-w-sm sm:max-w-md flex items-center justify-center min-h-[290px] xs:min-h-[330px] sm:min-h-[420px] my-0.5 sm:my-1"
          style={{ perspective: 1200 }}
        >
          {/* Dynamic Ground Shadow */}
          <motion.div 
            animate={{ 
              scale: [0.85, 1.15, 0.85],
              opacity: [0.25, 0.5, 0.25]
            }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute bottom-1 sm:bottom-2 w-44 xs:w-52 sm:w-72 h-8 sm:h-10 bg-zinc-950/30 dark:bg-black/70 rounded-full blur-xl pointer-events-none" 
          />

          {/* Interactive Parallax Spring Container */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative w-64 h-72 xs:w-72 xs:h-80 sm:w-88 sm:h-96 flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-pan-y"
          >
            
            {/* Continuous Floating Bobbing Engine */}
            <motion.div
              animate={{ 
                y: [0, -12, 0],
                rotateZ: [0, 1, -1, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4.5, 
                ease: 'easeInOut' 
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              
              {/* Isolated Floating Realistic 3D Gift Box Image */}
              <div className="relative w-56 h-64 xs:w-64 xs:h-72 sm:w-80 sm:h-88 rounded-[28px] sm:rounded-[36px] overflow-hidden p-1.5 sm:p-2 bg-gradient-to-tr from-rose-400 via-pink-300 to-rose-300 shadow-xl sm:shadow-2xl group border border-white/80 dark:border-zinc-700">
                <div className="w-full h-full rounded-[24px] sm:rounded-[30px] overflow-hidden relative bg-rose-950/5">
                  <img
                    src={floatingGiftBoxRealImage}
                    alt="Caja de Regalo 3D Flotante Boho Import"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glass lighting highlight */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/20 pointer-events-none" />

                  {/* Micro badge on image bottom */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 bg-zinc-950/85 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border border-white/20 flex items-center justify-between text-white shadow-md">
                    <div className="flex items-center space-x-1 sm:space-x-1.5 truncate">
                      <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 shrink-0 animate-pulse" />
                      <span className="text-[10px] sm:text-[11px] font-black font-display tracking-tight truncate">Caja de Lujo 3D</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-rose-200 font-mono bg-rose-950/80 px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg border border-rose-400/40 shrink-0">
                      S/. 12.00 und
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Orbiting Exploded Floating Badges (Adjusted for Mobile) */}
              
              {/* Badge 1: Top Left */}
              <motion.div
                animate={{ 
                  y: [0, -6, 0],
                  x: [0, -3, 0]
                }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="absolute -top-2 left-0 sm:-left-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl border border-rose-200 dark:border-zinc-700 shadow-md sm:shadow-xl flex items-center space-x-1.5 text-[9px] sm:text-[11px] font-extrabold text-zinc-900 dark:text-zinc-100 font-gift"
              >
                <div className="p-0.5 sm:p-1 rounded-md sm:rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-rose-500 text-rose-500" />
                </div>
                <span>⭐ Calidad 100%</span>
              </motion.div>

              {/* Badge 2: Top Right */}
              <motion.div
                animate={{ 
                  y: [0, 6, 0],
                  x: [0, 3, 0]
                }}
                transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                className="absolute -top-1.5 right-0 sm:-right-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl border border-rose-200 dark:border-zinc-700 shadow-md sm:shadow-xl flex items-center space-x-1.5 text-[9px] sm:text-[11px] font-extrabold text-zinc-900 dark:text-zinc-100 font-gift"
              >
                <div className="p-0.5 sm:p-1 rounded-md sm:rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600">
                  <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-rose-500 text-rose-500" />
                </div>
                <span>🔥 Toppers S/. 18 doc</span>
              </motion.div>

              {/* Badge 3: Bottom Left */}
              <motion.div
                animate={{ 
                  y: [0, 6, 0],
                  x: [0, -2, 0]
                }}
                transition={{ repeat: Infinity, duration: 4.1, ease: 'easeInOut' }}
                className="absolute -bottom-2.5 left-0 sm:-left-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl border border-sky-200 dark:border-zinc-700 shadow-md sm:shadow-xl flex items-center space-x-1.5 text-[9px] sm:text-[11px] font-extrabold text-zinc-900 dark:text-zinc-100 font-gift"
              >
                <div className="p-0.5 sm:p-1 rounded-md sm:rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600">
                  <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-600" />
                </div>
                <span>🚚 Envíos Shalom</span>
              </motion.div>

              {/* Badge 4: Bottom Right */}
              <motion.div
                animate={{ 
                  y: [0, -6, 0],
                  x: [0, 3, 0]
                }}
                transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
                className="absolute -bottom-2 right-0 sm:-right-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl border border-emerald-200 dark:border-zinc-700 shadow-md sm:shadow-xl flex items-center space-x-1.5 text-[9px] sm:text-[11px] font-extrabold text-zinc-900 dark:text-zinc-100 font-gift"
              >
                <div className="p-0.5 sm:p-1 rounded-md sm:rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                  <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500 fill-rose-400" />
                </div>
                <span>👑 Docena & Ciento</span>
              </motion.div>

              {/* Interactive touch/hover hint */}
              <div className="absolute -top-6 text-center w-full pointer-events-none">
                <span className="text-[8.5px] sm:text-[9px] font-mono font-bold text-rose-700 dark:text-rose-300 bg-white/90 dark:bg-zinc-900/90 px-2 py-0.5 rounded-full border border-rose-200/80 shadow-2xs">
                  ✨ Toca y mueve la caja 3D ✨
                </span>
              </div>

            </motion.div>
          </motion.div>
        </div>

        {/* Trust Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1 text-[10px] sm:text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
          <span className="flex items-center space-x-1 bg-white/80 dark:bg-zinc-800/80 px-2.5 py-1 rounded-xl border border-zinc-200/60 dark:border-zinc-700">
            <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500" />
            <span>Venta x Mayor desde 1 Docena</span>
          </span>
          <span className="flex items-center space-x-1 bg-white/80 dark:bg-zinc-800/80 px-2.5 py-1 rounded-xl border border-zinc-200/60 dark:border-zinc-700">
            <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500" />
            <span>Despachos Shalom / Olva</span>
          </span>
        </div>

      </div>
    </section>
  );
};


