import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  X, 
  Trash2, 
  Plus, 
  ShoppingBag, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Record<string, boolean>;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, variant: string, qty: number) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onToggleFavorite,
  onSelectProduct,
  onAddToCart
}) => {
  if (!isOpen) return null;

  const favoriteProducts = PRODUCTS.filter(p => favorites[p.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-xs"
      />

      {/* Container */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white dark:bg-zinc-900 rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 max-w-lg w-full border border-rose-100 dark:border-zinc-800 shadow-2xl relative z-10 max-h-[85vh] flex flex-col justify-between"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <Heart className="w-5 h-5 fill-rose-600 dark:fill-rose-400" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider font-gift block">
                Tu Lista de Deseos
              </span>
              <h3 className="text-base sm:text-lg font-black font-display text-zinc-900 dark:text-white leading-tight">
                Productos Favoritos ({favoriteProducts.length})
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body list */}
        <div className="my-4 overflow-y-auto max-h-[50vh] pr-1 space-y-2.5">
          {favoriteProducts.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 bg-rose-50 dark:bg-rose-950/40 rounded-full flex items-center justify-center mx-auto text-2xl">
                💝
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-zinc-900 dark:text-white text-sm font-display">
                  Aún no tienes favoritos guardados
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
                  Presiona el icono de corazón en cualquier producto del catálogo para guardarlo aquí y cotizarlo cuando gustes.
                </p>
              </div>
            </div>
          ) : (
            favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/70 dark:border-zinc-700/60 flex items-center justify-between gap-3 hover:border-rose-300 dark:hover:border-zinc-600 transition-colors"
              >
                <div 
                  className="flex items-center space-x-3 cursor-pointer flex-1 min-w-0"
                  onClick={() => {
                    onClose();
                    onSelectProduct(product);
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.imageGradient} flex items-center justify-center shrink-0 shadow-2xs text-lg`}>
                    🎁
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white font-display truncate">
                      {product.name}
                    </h4>
                    <span className="text-[11px] font-black text-rose-600 dark:text-rose-400 font-display">
                      S/. {product.wholesalePrice.toFixed(2)} Mayor
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => {
                      onAddToCart(
                        product,
                        product.sizes[0] || 'M',
                        product.variants && product.variants.length > 0 ? product.variants[0] : 'Estándar',
                        product.minWholesaleQty
                      );
                    }}
                    className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold font-gift flex items-center space-x-1 cursor-pointer shadow-2xs"
                    title="Agregar docena"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">+ Docena</span>
                  </motion.button>

                  <button
                    type="button"
                    onClick={(e) => onToggleFavorite(product.id, e)}
                    className="p-2 text-zinc-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    title="Eliminar de favoritos"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-2.5 rounded-xl text-xs font-gift uppercase tracking-wide cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors text-center"
          >
            Cerrar Lista
          </button>
        </div>
      </motion.div>
    </div>
  );
};
