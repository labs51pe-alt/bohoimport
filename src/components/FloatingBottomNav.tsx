import React from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  ShoppingBag, 
  Heart,
  MessageCircle, 
  ShoppingCart
} from 'lucide-react';

interface FloatingBottomNavProps {
  activeTab: 'inicio' | 'servicios' | 'catalogo' | 'cotizar' | 'favoritos' | 'enlaces' | 'nosotros';
  onSelectTab: (tab: 'inicio' | 'servicios' | 'catalogo') => void;
  onOpenFavorites: () => void;
  favoritesCount: number;
  onOpenQuoteModal: () => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
}

export const FloatingBottomNav: React.FC<FloatingBottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenFavorites,
  favoritesCount,
  onOpenQuoteModal,
  cartCount,
  cartTotal,
  onOpenCart
}) => {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none">
      <motion.nav
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="pointer-events-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 shadow-xl rounded-full px-3 py-2 flex items-center justify-between max-w-sm w-full"
      >
        {/* 1. Inicio */}
        <button
          type="button"
          onClick={() => onSelectTab('inicio')}
          className="flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer group"
        >
          <Home 
            className={`w-5 h-5 transition-transform group-hover:scale-110 ${
              activeTab === 'inicio' 
                ? 'text-rose-600 dark:text-rose-400 stroke-[2.2]' 
                : 'text-zinc-400 dark:text-zinc-500 stroke-[1.6]'
            }`} 
          />
          <span 
            className={`text-[10px] font-semibold tracking-tight mt-0.5 ${
              activeTab === 'inicio' 
                ? 'text-rose-600 dark:text-rose-400 font-bold' 
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            Inicio
          </span>
          {activeTab === 'inicio' && (
            <motion.div 
              layoutId="nav-active-dot" 
              className="w-1 h-1 bg-rose-600 dark:bg-rose-400 rounded-full mt-0.5" 
            />
          )}
        </button>

        {/* 2. Tienda */}
        <button
          type="button"
          onClick={() => onSelectTab('catalogo')}
          className="flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer group"
        >
          <ShoppingBag 
            className={`w-5 h-5 transition-transform group-hover:scale-110 ${
              activeTab === 'catalogo' 
                ? 'text-rose-600 dark:text-rose-400 stroke-[2.2]' 
                : 'text-zinc-400 dark:text-zinc-500 stroke-[1.6]'
            }`} 
          />
          <span 
            className={`text-[10px] font-semibold tracking-tight mt-0.5 ${
              activeTab === 'catalogo' 
                ? 'text-rose-600 dark:text-rose-400 font-bold' 
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            Tienda
          </span>
          {activeTab === 'catalogo' && (
            <motion.div 
              layoutId="nav-active-dot" 
              className="w-1 h-1 bg-rose-600 dark:bg-rose-400 rounded-full mt-0.5" 
            />
          )}
        </button>

        {/* 3. Favoritos */}
        <button
          type="button"
          onClick={onOpenFavorites}
          className="flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer group relative"
        >
          <div className="relative">
            <Heart className="w-5 h-5 text-zinc-400 dark:text-zinc-500 stroke-[1.6] group-hover:text-rose-500 transition-colors" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-600 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 tracking-tight mt-0.5">
            Favoritos
          </span>
        </button>

        {/* 4. Asesor Directo */}
        <button
          type="button"
          onClick={onOpenQuoteModal}
          className="flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer group relative"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-zinc-400 dark:text-zinc-500 stroke-[1.6] group-hover:text-rose-600 transition-colors" />
            <span className="absolute -top-0.5 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          </div>
          <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 tracking-tight mt-0.5">
            Asesor
          </span>
        </button>

        {/* 5. Carrito */}
        <button
          type="button"
          onClick={onOpenCart}
          className="flex-1 flex flex-col items-center justify-center py-1 transition-colors cursor-pointer group relative"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-zinc-900 dark:text-white stroke-[1.8] group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-600 text-white text-[9px] font-bold px-1 min-w-4 h-4 rounded-full flex items-center justify-center font-mono animate-bounce">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">
            Carrito
          </span>
        </button>
      </motion.nav>
    </div>
  );
};
