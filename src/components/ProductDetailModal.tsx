import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Heart, 
  Share2, 
  Check, 
  Plus, 
  Minus, 
  Percent, 
  ShoppingBag, 
  Info,
  Sparkles,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, variant: string, qty: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants && product.variants.length > 0 ? product.variants[0] : ''
  );
  const [quantity, setQuantity] = useState<number>(product.minWholesaleQty);
  const [isCustomDistribution, setIsCustomDistribution] = useState<boolean>(false);
  const [customQuantities, setCustomQuantities] = useState<Record<string, number>>({});
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedVariant(product.variants && product.variants.length > 0 ? product.variants[0] : '');
      setQuantity(product.minWholesaleQty);
      setIsCustomDistribution(false);

      if (product.variants && product.variants.length > 0) {
        const individualVars = product.variants.filter(v => !v.toLowerCase().includes('surtid'));
        const initialCounts: Record<string, number> = {};
        if (individualVars.length > 0) {
          const baseQty = Math.floor(product.minWholesaleQty / individualVars.length);
          const remainder = product.minWholesaleQty % individualVars.length;
          individualVars.forEach((v, index) => {
            initialCounts[v] = baseQty + (index < remainder ? 1 : 0);
          });
        }
        setCustomQuantities(initialCounts);
      } else {
        setCustomQuantities({});
      }
    }
  }, [product]);

  const sumOfCustom = useMemo(() => {
    return Object.values(customQuantities).reduce((a: number, b: number) => a + b, 0);
  }, [customQuantities]);

  const activeQuantity = isCustomDistribution ? sumOfCustom : quantity;

  const activeVariantString = useMemo(() => {
    if (!isCustomDistribution) return selectedVariant || 'Estándar';
    const nonZero = (Object.entries(customQuantities) as [string, number][])
      .filter(([_, count]) => count > 0)
      .map(([name, count]) => `${count} ${name}`);
    if (nonZero.length === 0) return 'Personalizado (Sin especificar)';
    return `Surtido: ${nonZero.join(', ')}`;
  }, [isCustomDistribution, selectedVariant, customQuantities]);

  // Price calculator
  const pricing = useMemo(() => {
    const qty = activeQuantity;

    // Check if there is specific size pricing (e.g. Bolsas Llanas or Cajas Cubo)
    if (product.sizePricing && product.sizePricing.length > 0) {
      const matchedSize = product.sizePricing.find(
        (sp) => selectedSize.includes(sp.size) || sp.size.includes(selectedSize)
      );
      if (matchedSize) {
        const dozenRate = matchedSize.dozenPrice;
        const perUnitDozRate = matchedSize.unitPrice || (dozenRate / 12);
        
        let total = 0;
        let unitPrice = perUnitDozRate;
        let label = 'Docena';
        
        if (qty >= 12) {
          const fullDozens = Math.floor(qty / 12);
          const remainderUnits = qty % 12;
          total = (fullDozens * dozenRate) + (remainderUnits * perUnitDozRate);
          unitPrice = perUnitDozRate;
          label = `Docena Mayorista (S/. ${dozenRate.toFixed(2)} / doc)`;
        } else {
          unitPrice = perUnitDozRate * 1.25;
          total = qty * unitPrice;
          label = 'Unitario Minorista';
        }

        return {
          unitPrice,
          total,
          isWholesale: qty >= product.minWholesaleQty,
          label
        };
      }
    }

    if (product.priceLevels && product.priceLevels.length > 0) {
      let matched = product.priceLevels[0];
      for (const lvl of product.priceLevels) {
        if (qty >= lvl.qty) matched = lvl;
      }
      return {
        unitPrice: matched.price,
        total: matched.price * qty,
        isWholesale: qty >= product.minWholesaleQty,
        label: matched.label
      };
    }
    const isWholesale = qty >= product.minWholesaleQty;
    const unitPrice = isWholesale ? product.wholesalePrice : product.price;
    return {
      unitPrice,
      total: unitPrice * qty,
      isWholesale,
      label: isWholesale ? 'Precio Mayorista' : 'Precio Minorista'
    };
  }, [product, activeQuantity, selectedSize]);

  const handleShare = () => {
    const text = `¡Mira este producto en Boho Import! 🎁 *${product.name}* - S/. ${product.wholesalePrice.toFixed(2)} por mayor.`;
    navigator.clipboard.writeText(text);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  const handleAdd = () => {
    if (activeQuantity <= 0) return;
    onAddToCart(product, selectedSize, activeVariantString, activeQuantity);
  };

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

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white dark:bg-zinc-900 rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 max-w-lg w-full border border-rose-100 dark:border-zinc-800 shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto space-y-4 text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-600 text-white uppercase font-gift">
              {product.category}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">ID: {product.id}</span>
          </div>

          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              title="Compartir"
            >
              {shareSuccess ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={(e) => onToggleFavorite(product.id, e)}
              className="p-2 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-zinc-800 cursor-pointer"
              title="Favorito"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Visual Box Banner */}
        <div className={`h-36 sm:h-44 w-full rounded-2xl bg-gradient-to-br ${product.imageGradient} flex items-center justify-center relative overflow-hidden shadow-inner`}>
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/90 dark:bg-zinc-800/90 rounded-2xl shadow-lg flex items-center justify-center border border-white/60 dark:border-zinc-700 text-3xl sm:text-4xl animate-gift-bounce">
            🎁
          </div>

          <div className="absolute bottom-2.5 left-2.5 bg-zinc-900/90 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider font-gift flex items-center space-x-1 shadow-md">
            <Percent className="w-3 h-3 text-amber-400" />
            <span>S/. {product.wholesalePrice.toFixed(2)} Mayorista (min {product.minWholesaleQty} unds)</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-black font-display text-zinc-900 dark:text-white leading-tight">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Material & Occasions Tags */}
        {(product.material || (product.occasions && product.occasions.length > 0)) && (
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {product.material && (
              <span className="text-[10px] font-mono font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded-lg border border-zinc-200/80 dark:border-zinc-700">
                🧵 Material: {product.material}
              </span>
            )}
            {product.unitMeasure && (
              <span className="text-[10px] font-mono font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-lg border border-amber-200/80 dark:border-amber-900/50">
                📦 Venta por: {product.unitMeasure}
              </span>
            )}
            {product.occasions && product.occasions.map((occ) => (
              <span key={occ} className="text-[9px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-md">
                {occ}
              </span>
            ))}
          </div>
        )}

        {/* Features list */}
        <div className="bg-rose-50/60 dark:bg-zinc-800/60 p-3 rounded-2xl border border-rose-100 dark:border-zinc-700 space-y-1.5">
          <span className="text-[10px] font-black uppercase text-zinc-700 dark:text-zinc-300 font-gift block">
            Características destacadas:
          </span>
          <div className="space-y-1">
            {product.features.map((feat, i) => (
              <div key={i} className="flex items-center space-x-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                <span className="text-rose-500">•</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes Selector */}
        {product.sizes.length > 0 && (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 font-gift">
              Medida / Tamaño disponible:
            </label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-gift transition-all cursor-pointer ${
                    selectedSize === sz
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Variants Selector */}
        {product.variants && product.variants.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 font-gift">
                Diseño / Variante:
              </label>
              <button
                type="button"
                onClick={() => setIsCustomDistribution(!isCustomDistribution)}
                className="text-[10px] font-bold text-rose-600 dark:text-rose-400 underline font-gift cursor-pointer"
              >
                {isCustomDistribution ? 'Elegir 1 diseño general' : '⚙️ Personalizar cantidades x diseño'}
              </button>
            </div>

            {!isCustomDistribution ? (
              <div className="flex flex-wrap gap-1.5">
                {product.variants.map((variant) => (
                  <button
                    key={variant}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      selectedVariant === variant
                        ? 'bg-rose-600 text-white font-bold shadow-xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-2 p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-2xl border border-zinc-200 dark:border-zinc-700">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">
                  Ajusta cuántas unidades deseas de cada modelo:
                </span>
                {product.variants.filter(v => !v.toLowerCase().includes('surtid')).map((vName) => {
                  const count = customQuantities[vName] || 0;
                  return (
                    <div key={vName} className="flex items-center justify-between text-xs">
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium">{vName}</span>
                      <div className="flex items-center space-x-1 bg-white dark:bg-zinc-900 rounded-lg p-0.5 border border-zinc-200 dark:border-zinc-700">
                        <button
                          type="button"
                          onClick={() => setCustomQuantities(prev => ({ ...prev, [vName]: Math.max(0, count - 1) }))}
                          className="w-5 h-5 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
                        >
                          -
                        </button>
                        <span className="font-mono font-bold px-2">{count}</span>
                        <button
                          type="button"
                          onClick={() => setCustomQuantities(prev => ({ ...prev, [vName]: count + 1 }))}
                          className="w-5 h-5 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Quantity Controls (if not custom distribution) */}
        {!isCustomDistribution && (
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 font-gift">
              Cantidad:
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-1 border border-zinc-200 dark:border-zinc-700">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 flex items-center justify-center shadow-xs cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center font-mono font-black text-sm bg-transparent text-zinc-900 dark:text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 flex items-center justify-center shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick Preset Buttons */}
              <button
                type="button"
                onClick={() => setQuantity(12)}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold font-gift cursor-pointer transition-colors ${
                  quantity === 12 
                    ? 'bg-rose-600 text-white' 
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                1 Docena (12)
              </button>

              <button
                type="button"
                onClick={() => setQuantity(100)}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold font-gift cursor-pointer transition-colors ${
                  quantity === 100 
                    ? 'bg-rose-600 text-white' 
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                1 Ciento (100)
              </button>
            </div>
          </div>
        )}

        {/* Pricing Summary & Action Row */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-zinc-400 font-gift block leading-tight">
              {pricing.label} ({activeQuantity} unds):
            </span>
            <div className="text-lg font-black text-rose-600 dark:text-rose-400 font-display">
              S/. {pricing.total.toFixed(2)}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            type="button"
            onClick={handleAdd}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-6 rounded-2xl text-xs sm:text-sm uppercase tracking-wide transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-emerald-600/20 font-gift cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Añadir a la Canasta 🛒</span>
          </motion.button>
        </div>

      </motion.div>
    </div>
  );
};
