import React from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  Sparkles, 
  ShoppingBag, 
  MessageCircle, 
  ShoppingCart
} from 'lucide-react';

interface FloatingBottomNavProps {
  activeTab: 'inicio' | 'servicios' | 'catalogo' | 'cotizar' | 'favoritos' | 'enlaces' | 'nosotros';
  onSelectTab: (tab: 'inicio' | 'servicios' | 'catalogo') => void;
  onOpenQuoteModal: () => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
}

export const FloatingBottomNav: React.FC<FloatingBottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenQuoteModal,
  cartCount,
  cartTotal,
  onOpenCart
}) => {
  return (
    <div className="fixed bottom-3.5 left-0 right-0 z-40 px-3 flex justify-center pointer-events-none">
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="pointer-events-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-rose-200/80 dark:border-zinc-800 shadow-2xl rounded-[28px] p-1.5 flex items-center space-x-1 max-w-md w-full justify-between"
      >
        {/* 1. Inicio */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => onSelectTab('inicio')}
          className={`relative flex-1 py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
            activeTab === 'inicio' 
              ? 'bg-rose-600 text-white shadow-xs' 
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-rose-50/60 dark:hover:bg-zinc-800/60'
          }`}
        >
          <Home className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${activeTab === 'inicio' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className={`text-[10px] sm:text-[11px] font-gift font-bold mt-0.5 tracking-tight ${activeTab === 'inicio' ? 'text-white' : ''}`}>
            Inicio
          </span>
        </motion.button>

        {/* 2. Tienda */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => onSelectTab('catalogo')}
          className={`relative flex-1 py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
            activeTab === 'catalogo' 
              ? 'bg-rose-600 text-white shadow-xs' 
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-rose-50/60 dark:hover:bg-zinc-800/60'
          }`}
        >
          <ShoppingBag className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${activeTab === 'catalogo' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className={`text-[10px] sm:text-[11px] font-gift font-bold mt-0.5 tracking-tight ${activeTab === 'catalogo' ? 'text-white' : ''}`}>
            Tienda
          </span>
        </motion.button>

        {/* 3. Servicios */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => onSelectTab('servicios')}
          className={`relative flex-1 py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
            activeTab === 'servicios' 
              ? 'bg-rose-600 text-white shadow-xs' 
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-rose-50/60 dark:hover:bg-zinc-800/60'
          }`}
        >
          <Sparkles className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${activeTab === 'servicios' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className={`text-[10px] sm:text-[11px] font-gift font-bold mt-0.5 tracking-tight ${activeTab === 'servicios' ? 'text-white' : ''}`}>
            Servicios
          </span>
        </motion.button>

        {/* 4. Cotizar con Asesor (Replaces Favoritos) */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.03 }}
          type="button"
          onClick={onOpenQuoteModal}
          className="relative flex-1 py-2 px-1 rounded-2xl flex flex-col items-center justify-center bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 transition-all duration-200 cursor-pointer"
        >
          <div className="relative">
            <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-emerald-600/20 stroke-[2] text-emerald-600 dark:text-emerald-400" />
            <span className="absolute -top-0.5 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-gift font-black mt-0.5 tracking-tight text-emerald-700 dark:text-emerald-300">
            Asesor 📲
          </span>
        </motion.button>

        {/* 5. Dynamic Cart Pill Button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.03 }}
          type="button"
          onClick={onOpenCart}
          className="relative py-2 px-2.5 sm:px-3.5 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-extrabold shadow-md flex items-center space-x-1.5 transition-all cursor-pointer font-gift animate-gift-glow shrink-0"
        >
          <div className="relative">
            <ShoppingCart className="w-4 h-4 text-amber-300 dark:text-amber-600" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2.5 bg-rose-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono border border-zinc-950 dark:border-white animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <div className="text-left leading-none pl-0.5">
            <span className="text-[9px] uppercase tracking-wider block text-amber-300 dark:text-amber-600 font-extrabold">
              Canasta
            </span>
            <span className="text-[10px] sm:text-[11px] font-black font-display text-white dark:text-zinc-950 block">
              S/. {cartTotal.toFixed(2)}
            </span>
          </div>
        </motion.button>

      </motion.nav>
    </div>
  );
};

