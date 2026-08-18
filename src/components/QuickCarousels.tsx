import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Flame, 
  Plus, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  Percent,
  Check
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface QuickCarouselsProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, variant: string, qty: number) => void;
  favorites: Record<string, boolean>;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onOpenCatalog?: (category?: string) => void;
}

export const QuickCarousels: React.FC<QuickCarouselsProps> = ({
  onSelectProduct,
  onAddToCart,
  favorites,
  onToggleFavorite,
  onOpenCatalog
}) => {
  const bestsellersRef = useRef<HTMLDivElement>(null);
  const promosRef = useRef<HTMLDivElement>(null);

  // Top bestsellers (Popular items)
  const bestsellers = PRODUCTS.slice(0, 6);
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
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_50%,#000_50%,#000_75%,transparent_75%,transparent)] bg-[length:12px_12px]" />
        )}
        {pattern === 'dots' && (
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />
        )}
        {pattern === 'stars' && (
          <div className="absolute inset-0 opacity-10 flex flex-wrap gap-2 p-1 text-[8px] text-zinc-900">
            <span>✦</span><span>★</span><span>✦</span><span>★</span>
          </div>
        )}
        {pattern === 'holographic' && (
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-200/40 via-pink-200/40 to-amber-100/40 animate-pulse" />
        )}

        {/* Realistic Gift Box Graphic */}
        <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-white/95 dark:bg-zinc-900/95 rounded-2xl shadow-sm flex items-center justify-center border border-white/80 dark:border-zinc-700">
          <span className="text-2xl sm:text-3xl filter drop-shadow-xs">🎁</span>
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
    <div className="space-y-7 py-2">
      
      {/* ========================================================================= */}
      {/* 1. CAROUSEL: Lo Más Pedido (Identical Layout to User Reference Image 1)  */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        {/* Section Header with "Ver todo" */}
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-zinc-950 dark:text-white tracking-tight">
            Lo más pedido
          </h2>

          <div className="flex items-center space-x-2">
            {onOpenCatalog && (
              <button
                type="button"
                onClick={() => onOpenCatalog()}
                className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 text-xs sm:text-sm font-semibold transition-colors flex items-center space-x-0.5 cursor-pointer"
              >
                <span>Ver todo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Carousel navigation controls (Desktop) */}
            <div className="hidden sm:flex items-center space-x-1">
              <button
                type="button"
                onClick={() => scroll(bestsellersRef, 'left')}
                className="p-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 transition-colors shadow-2xs cursor-pointer"
                title="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll(bestsellersRef, 'right')}
                className="p-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 transition-colors shadow-2xs cursor-pointer"
                title="Siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Swipeable Card List */}
        <div 
          ref={bestsellersRef}
          className="flex space-x-3.5 sm:space-x-4 overflow-x-auto pb-3 pt-1 px-1 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestsellers.map((product) => {
            const isFav = !!favorites[product.id];
            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectProduct(product)}
                className="w-52 xs:w-56 sm:w-64 shrink-0 snap-start bg-white dark:bg-zinc-900 rounded-[26px] border border-zinc-100 dark:border-zinc-800 shadow-xs hover:shadow-md hover:border-rose-200/80 dark:hover:border-zinc-700 transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer relative group p-2 sm:p-2.5"
              >
                {/* Visual Image / Box Section */}
                <div className="h-36 sm:h-44 w-full relative rounded-2xl overflow-hidden bg-rose-50/40 dark:bg-zinc-800">
                  {renderProductIllustration(product.imageGradient, product.patternType, product.ribbonColor)}

                  {/* Top Left "🔥 MÁS PEDIDO" Pill Badge (Reference Image Style) */}
                  <div className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-2xs">
                    <Flame className="w-2.5 h-2.5 fill-white" />
                    <span>MÁS PEDIDO</span>
                  </div>

                  {/* Top Right Heart Favorite Button */}
                  <button
                    type="button"
                    onClick={(e) => onToggleFavorite(product.id, e)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/25 hover:bg-black/40 backdrop-blur-xs flex items-center justify-center text-white transition-transform hover:scale-110 cursor-pointer shadow-2xs"
                    title="Guardar en favoritos"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 stroke-rose-500 text-rose-500' : 'stroke-white'}`} />
                  </button>
                </div>

                {/* Details Section */}
                <div className="px-1.5 pt-3 pb-1 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-bold text-zinc-950 dark:text-white text-sm sm:text-base font-display line-clamp-1 leading-snug group-hover:text-rose-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs line-clamp-2 leading-relaxed mt-1 font-normal">
                      {product.description}
                    </p>
                  </div>

                  {/* Price and Plus Button Row */}
                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <span className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white font-display">
                        S/ {product.wholesalePrice.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block -mt-0.5">
                        por mayor ({product.unitMeasure})
                      </span>
                    </div>

                    {/* Circular Plus Button (Image 1 Style) */}
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      whileHover={{ scale: 1.06 }}
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
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50 flex items-center justify-center hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white transition-all shadow-2xs cursor-pointer"
                      title="Agregar al pedido"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CAROUSEL: Promociones (Identical Layout to User Reference Image 1)    */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        {/* Section Header with "Ver todo" */}
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-zinc-950 dark:text-white tracking-tight">
            Promociones
          </h2>

          <div className="flex items-center space-x-2">
            {onOpenCatalog && (
              <button
                type="button"
                onClick={() => onOpenCatalog()}
                className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 text-xs sm:text-sm font-semibold transition-colors flex items-center space-x-0.5 cursor-pointer"
              >
                <span>Ver todo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Carousel navigation controls (Desktop) */}
            <div className="hidden sm:flex items-center space-x-1">
              <button
                type="button"
                onClick={() => scroll(promosRef, 'left')}
                className="p-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 transition-colors shadow-2xs cursor-pointer"
                title="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll(promosRef, 'right')}
                className="p-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 transition-colors shadow-2xs cursor-pointer"
                title="Siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Swipeable Card List */}
        <div 
          ref={promosRef}
          className="flex space-x-3.5 sm:space-x-4 overflow-x-auto pb-3 pt-1 px-1 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {promotions.map((product) => {
            const isFav = !!favorites[product.id];
            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectProduct(product)}
                className="w-52 xs:w-56 sm:w-64 shrink-0 snap-start bg-white dark:bg-zinc-900 rounded-[26px] border border-zinc-100 dark:border-zinc-800 shadow-xs hover:shadow-md hover:border-rose-200/80 dark:hover:border-zinc-700 transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer relative group p-2 sm:p-2.5"
              >
                {/* Visual Image / Box Section */}
                <div className="h-36 sm:h-44 w-full relative rounded-2xl overflow-hidden bg-rose-50/40 dark:bg-zinc-800">
                  {renderProductIllustration(product.imageGradient, product.patternType, product.ribbonColor)}

                  {/* Top Left "PROMO" Pill Badge (Reference Image Style) */}
                  <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-2xs">
                    <Percent className="w-2.5 h-2.5 text-white" />
                    <span>PROMO</span>
                  </div>

                  {/* Top Right Heart Favorite Button */}
                  <button
                    type="button"
                    onClick={(e) => onToggleFavorite(product.id, e)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/25 hover:bg-black/40 backdrop-blur-xs flex items-center justify-center text-white transition-transform hover:scale-110 cursor-pointer shadow-2xs"
                    title="Guardar en favoritos"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 stroke-rose-500 text-rose-500' : 'stroke-white'}`} />
                  </button>
                </div>

                {/* Details Section */}
                <div className="px-1.5 pt-3 pb-1 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-bold text-zinc-950 dark:text-white text-sm sm:text-base font-display line-clamp-1 leading-snug group-hover:text-rose-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs line-clamp-2 leading-relaxed mt-1 font-normal">
                      {product.description}
                    </p>
                  </div>

                  {/* Price and Plus Button Row */}
                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white font-display">
                          S/ {product.wholesalePrice.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[11px] text-zinc-400 line-through">
                            S/ {product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-rose-600 dark:text-rose-400 font-medium block -mt-0.5">
                        Ahorra {Math.round((((product.originalPrice || product.price) - product.wholesalePrice) / (product.originalPrice || product.price)) * 100)}%
                      </span>
                    </div>

                    {/* Circular Plus Button (Image 1 Style) */}
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      whileHover={{ scale: 1.06 }}
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
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50 flex items-center justify-center hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:text-white transition-all shadow-2xs cursor-pointer"
                      title="Agregar al pedido"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
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
