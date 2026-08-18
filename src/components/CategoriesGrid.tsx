import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  count: string;
  gradient: string;
  badge?: string;
  icon: string;
  imageUrl?: string;
}

interface CategoriesGridProps {
  onSelectCategory: (categoryId: string) => void;
  onViewAll?: () => void;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'cajas',
    name: 'Cajas de Regalo',
    count: '12 modelos',
    gradient: 'from-rose-600/90 via-pink-700/80 to-zinc-950/90',
    icon: '🎁',
    badge: 'Popular'
  },
  {
    id: 'bolsas',
    name: 'Bolsas Llanas & Diseños',
    count: '8 opciones',
    gradient: 'from-zinc-800/90 via-zinc-900/80 to-zinc-950/90',
    icon: '🛍️'
  },
  {
    id: 'accesorios',
    name: 'Toppers & Paletas',
    count: '15 diseños',
    gradient: 'from-rose-700/90 via-red-800/80 to-zinc-950/90',
    icon: '🎀',
    badge: 'Mayorista'
  },
  {
    id: 'papel',
    name: 'Papel de Seda & Regalo',
    count: '10 variedades',
    gradient: 'from-zinc-700/90 via-zinc-800/80 to-zinc-950/90',
    icon: '📜'
  },
  {
    id: 'cintas',
    name: 'Cintas & Lazos',
    count: '9 modelos',
    gradient: 'from-pink-600/90 via-rose-700/80 to-zinc-950/90',
    icon: '✨'
  },
  {
    id: 'combos',
    name: 'Moños & Accesorios',
    count: '6 tamaños',
    gradient: 'from-zinc-900/90 via-rose-950/80 to-black/90',
    icon: '👑'
  }
];

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({
  onSelectCategory,
  onViewAll
}) => {
  return (
    <section className="space-y-3.5 pt-2">
      {/* Clean Minimal Section Header (Image 2 style) */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl sm:text-2xl font-bold font-display text-zinc-950 dark:text-white tracking-tight">
          Categorías
        </h2>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 text-xs sm:text-sm font-semibold transition-colors flex items-center space-x-0.5 cursor-pointer"
          >
            <span>Ver todo</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 2-Column Responsive Grid with Large Rounded Photo Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => (
          <motion.div
            key={cat.id}
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectCategory(cat.id)}
            className="group relative h-40 sm:h-48 rounded-[24px] overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 border border-zinc-100 dark:border-zinc-800 bg-zinc-900"
          >
            {/* Background Gradient / Decorative Visual */}
            <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} transition-transform duration-500 group-hover:scale-105`} />

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />

            {/* Micro Icon / Badge on Top Right */}
            <div className="absolute top-3 right-3 flex items-center space-x-1">
              {cat.badge && (
                <span className="bg-rose-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  {cat.badge}
                </span>
              )}
              <span className="text-xl filter drop-shadow-md select-none transform group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
            </div>

            {/* Bottom Scrim & Text Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-3.5 pt-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end">
              <h3 className="text-white font-bold text-sm sm:text-base leading-tight font-display drop-shadow-xs group-hover:text-rose-200 transition-colors">
                {cat.name}
              </h3>
              <p className="text-white/70 text-[11px] font-medium mt-0.5">
                {cat.count}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
