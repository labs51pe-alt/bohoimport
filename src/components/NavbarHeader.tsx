import React from 'react';
import { motion } from 'motion/react';
import { 
  Sun, 
  Moon, 
  MessageCircle, 
  Heart, 
  ShoppingBag,
  Sparkles,
  MapPin,
  Search,
  QrCode,
  Share2,
  Check
} from 'lucide-react';
import Logo from './Logo';

interface NavbarHeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onSelectTab: (tab: 'inicio' | 'servicios' | 'catalogo' | 'favoritos' | 'enlaces' | 'nosotros') => void;
  onOpenQrModal?: () => void;
  onShareApp?: () => void;
  copiedLink?: boolean;
}

export const NavbarHeader: React.FC<NavbarHeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  favoritesCount,
  onOpenFavorites,
  onSelectTab,
  onOpenQrModal,
  onShareApp,
  copiedLink
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-rose-100/60 dark:border-zinc-800/60 transition-colors duration-300">
      
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-white text-[10px] md:text-[11px] py-1.5 px-3 font-medium flex items-center justify-between overflow-hidden">
        <div className="flex items-center space-x-2 truncate">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-rose-200 font-gift">🟢 Abierto Hoy • Despachos Activos a todo el Perú</span>
        </div>
        <div className="hidden sm:flex items-center space-x-3 text-zinc-300 text-[10px]">
          <span className="flex items-center space-x-1">
            <MapPin className="w-3 h-3 text-rose-400" />
            <span>Jr. Andahuaylas 1124, Lima</span>
          </span>
          <span>•</span>
          <span className="font-mono text-amber-300 font-bold">Ventas x Mayor y Menor</span>
        </div>
      </div>

      {/* Main compact navbar container */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        
        {/* Brand identity */}
        <button 
          type="button" 
          onClick={() => onSelectTab('inicio')}
          className="flex items-center space-x-2.5 text-left group cursor-pointer"
        >
          <div className="relative">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-rose-500 via-rose-600 to-amber-500 p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-[14px] flex items-center justify-center">
                <span className="text-base sm:text-lg">🎁</span>
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-950" />
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-base sm:text-lg font-black font-display tracking-tight text-zinc-900 dark:text-white leading-none">
                bohoimport
              </span>
              <span className="text-[9px] font-mono font-bold bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 px-1.5 py-0.5 rounded-md">
                E.I.R.L
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium block leading-tight font-gift">
              Bolsas & Empaques de Regalo ✨
            </span>
          </div>
        </button>

        {/* Right side interactive actions */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          
          {/* Quick catalog search link */}
          <button
            type="button"
            onClick={() => onSelectTab('catalogo')}
            className="hidden xs:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-rose-50 dark:hover:bg-zinc-700 text-xs font-semibold transition-all cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Buscar productos...</span>
            <span className="sm:hidden">Buscar</span>
          </button>

          {/* Dark / Light mode toggle switch */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 sm:p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-amber-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer border border-zinc-200/60 dark:border-zinc-700/60"
            title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label="Cambiar tema"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            )}
          </motion.button>

          {/* QR Code button */}
          {onOpenQrModal && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              type="button"
              onClick={onOpenQrModal}
              className="hidden sm:flex p-2 sm:p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer border border-zinc-200/60 dark:border-zinc-700/60"
              title="Ver código QR para mostrador"
            >
              <QrCode className="w-4 h-4" />
            </motion.button>
          )}

          {/* Share App button */}
          {onShareApp && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              type="button"
              onClick={onShareApp}
              className="hidden sm:flex p-2 sm:p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer border border-zinc-200/60 dark:border-zinc-700/60"
              title="Compartir catálogo"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </motion.button>
          )}

          {/* Favorites quick button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            type="button"
            onClick={onOpenFavorites}
            className="relative p-2 sm:p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors cursor-pointer border border-rose-200/60 dark:border-rose-900/40"
            title="Ver favoritos"
          >
            <Heart className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono animate-pulse">
                {favoritesCount}
              </span>
            )}
          </motion.button>

          {/* WhatsApp Direct Action Button */}
          <a
            href="https://wa.me/51967651924?text=%C2%A1Hola%20Boho%20Import!%20%F0%9F%8E%81%20Quisiera%20recibir%20el%20cat%C3%A1logo%20actualizado%20y%20precios%20por%20mayor."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 sm:px-4 py-2 rounded-2xl text-xs flex items-center space-x-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer font-gift"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

        </div>

      </div>
    </header>
  );
};
