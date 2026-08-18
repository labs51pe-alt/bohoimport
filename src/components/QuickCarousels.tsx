import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Flame, 
  Sparkles, 
  Plus, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  Percent,
  ShoppingBag,
  Star,
  Check
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface QuickCarouselsProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, variant: string, qty: number) => void;
  favorites: Record<string, boolean>;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const QuickCarousels: React.FC<QuickCarouselsProps> = ({
  onSelectProduct,
  onAddToCart,
  favorites,
  onToggleFavorite
}) => {
  const bestsellersRef = useRef<HTMLDivElement>(null);
  const promosRef = useRef<HTMLDivElement>(null);

  // Top bestsellers (Popular items)
  const bestsellers = PRODUCTS.slice(0, 5);
  // Special promo items (with originalPrice)
  const promotions = PRODUCTS.filter(p => p.originalPrice && p.originalPrice > p.price);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const renderProductIllustration = (gradient: string, pattern: string, ribbonColor?: string) => {
    return (
      <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center relative p-3 overflow-hidden select-none`}>
        {/* Subtle patterned overlay */}
        {pattern === 'stripes' && (
          <div className="absolute inset-0 opacity-15 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_50%,#000_50%,#000_75%,transparent_75%,transparent)] bg-[length:12px_12px]" />
        )}
        {pattern === 'dots' && (
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />
        )}
        {pattern === 'stars' && (
          <div className="absolute inset-0 opacity-15 flex flex-wrap gap-2 p-1 text-[8px] text-zinc-900">
            <span>✦</span><span>★</span><span>✦</span><span>★</span>
          </div>
        )}
        {pattern === 'holographic' && (
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/40 via-purple-300/40 to-cyan-300/40 animate-pulse" />
        )}

        {/* Gift Box Graphic */}
        <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-white/90 dark:bg-zinc-800/90 rounded-2xl shadow-md flex items-center justify-center border border-white/60 dark:border-zinc-700">
          <span className="text-2xl sm:text-3xl">🎁</span>
          {ribbonColor && (
            <div 
              className="absolute -top-1 w-5 h-2 rounded-full shadow-2xs" 
              style={{ backgroundColor: ribbonColor }} 
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 py-2">
      
      {/* 1. Carousel: Top Ventas / Lo Más Pedido */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Flame className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-display text-zinc-900 dark:text-white tracking-tight leading-none">
                Lo Más Pedido 🔥
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium font-gift">
                Top ventas para campañas y emprendedores
              </p>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={() => scroll(bestsellersRef, 'left')}
              className="p-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-2xs cursor-pointer"
              title="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll(bestsellersRef, 'right')}
              className="p-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-2xs cursor-pointer"
              title="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Swipeable List */}
        <div 
          ref={bestsellersRef}
          className="flex space-x-3.5 overflow-x-auto pb-3 pt-1 px-1 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestsellers.map((product) => {
            const isFav = !!favorites[product.id];
            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectProduct(product)}
                className="w-56 sm:w-64 shrink-0 snap-start bg-white dark:bg-zinc-900 rounded-3xl border border-rose-100/80 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-rose-300 dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer relative group gift-shimmer"
              >
                {/* Visual Box Section */}
                <div className="h-32 sm:h-36 w-full relative">
                  {renderProductIllustration(product.imageGradient, product.patternType, product.ribbonColor)}

                  {/* Top Popular Tag */}
                  <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full font-gift shadow-xs flex items-center space-x-1">
                    <Flame className="w-2.5 h-2.5 fill-white" />
                    <span>Top Ventas</span>
                  </div>

                  {/* Favorite button */}
                  <button
                    type="button"
                    onClick={(e) => onToggleFavorite(product.id, e)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-xs flex items-center justify-center text-zinc-400 hover:text-rose-600 shadow-xs transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 stroke-rose-500' : ''}`} />
                  </button>

                  {/* Wholesale Pricing Tag */}
                  <div className="absolute bottom-2 left-2 bg-zinc-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-sm font-gift">
                    <Percent className="w-2.5 h-2.5 text-amber-400" />
                    <span>S/. {product.wholesalePrice.toFixed(2)} Mayor</span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white text-xs sm:text-sm font-display line-clamp-1 group-hover:text-rose-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-[10px] sm:text-[11px] line-clamp-1 mt-0.5">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-1">
                    <div>
                      <span className="text-[9px] text-zinc-400 dark:text-zinc-500 block leading-none font-gift">x Docena:</span>
                      <span className="text-xs sm:text-sm font-black text-rose-600 dark:text-rose-400 font-display">
                        S/. {product.wholesalePrice.toFixed(2)}
                      </span>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      whileHover={{ scale: 1.05 }}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(
                          product,
                          product.sizes[0] || 'M',
                          product.variants && product.variants.length > 0 ? product.variants[0] : 'Estándar',
                          product.minWholesaleQty
                        );
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-2.5 py-1.5 rounded-xl text-[10px] flex items-center space-x-1 uppercase tracking-tight shadow-xs font-gift cursor-pointer"
                      title="Agregar 1 docena a la canasta"
                    >
                      <Plus className="w-3 h-3" />
                      <span>+ Docena</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. Carousel: Promociones & Ofertas Especiales */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Percent className="w-5 h-5 animate-sparkle" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-display text-zinc-900 dark:text-white tracking-tight leading-none">
                Promociones & Descuentos 🎁
              </h2>
              <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium font-gift">
                Ofertas de temporada con precios rebajados
              </p>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={() => scroll(promosRef, 'left')}
              className="p-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-2xs cursor-pointer"
              title="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll(promosRef, 'right')}
              className="p-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-2xs cursor-pointer"
              title="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Swipeable List */}
        <div 
          ref={promosRef}
          className="flex space-x-3.5 overflow-x-auto pb-3 pt-1 px-1 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {promotions.map((product) => {
            const isFav = !!favorites[product.id];
            const discountPct = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectProduct(product)}
                className="w-56 sm:w-64 shrink-0 snap-start bg-white dark:bg-zinc-900 rounded-3xl border border-amber-100/80 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-amber-300 dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer relative group gift-shimmer"
              >
                {/* Visual Box Section */}
                <div className="h-32 sm:h-36 w-full relative">
                  {renderProductIllustration(product.imageGradient, product.patternType, product.ribbonColor)}

                  {/* Discount Badge */}
                  {discountPct > 0 && (
                    <div className="absolute top-2.5 left-2.5 bg-amber-500 text-zinc-950 text-[9px] font-black px-2 py-0.5 rounded-full font-gift shadow-xs flex items-center space-x-1">
                      <span>-{discountPct}% OFF</span>
                    </div>
                  )}

                  {/* Favorite button */}
                  <button
                    type="button"
                    onClick={(e) => onToggleFavorite(product.id, e)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-xs flex items-center justify-center text-zinc-400 hover:text-rose-600 shadow-xs transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 stroke-rose-500' : ''}`} />
                  </button>

                  {/* Wholesale Pricing Tag */}
                  <div className="absolute bottom-2 left-2 bg-zinc-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-sm font-gift">
                    <Percent className="w-2.5 h-2.5 text-amber-400" />
                    <span>S/. {product.wholesalePrice.toFixed(2)} Mayor</span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white text-xs sm:text-sm font-display line-clamp-1 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-[10px] sm:text-[11px] line-clamp-1 mt-0.5">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-1">
                    <div>
                      {product.originalPrice && (
                        <span className="text-[9px] text-zinc-400 line-through block leading-none">
                          Antes S/. {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-xs sm:text-sm font-black text-amber-600 dark:text-amber-400 font-display">
                        S/. {product.price.toFixed(2)}
                      </span>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      whileHover={{ scale: 1.05 }}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(
                          product,
                          product.sizes[0] || 'M',
                          product.variants && product.variants.length > 0 ? product.variants[0] : 'Estándar',
                          product.minWholesaleQty
                        );
                      }}
                      className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-extrabold px-2.5 py-1.5 rounded-xl text-[10px] flex items-center space-x-1 uppercase tracking-tight shadow-xs font-gift cursor-pointer"
                      title="Agregar pack a la canasta"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Pedir</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
