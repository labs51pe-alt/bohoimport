import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, X, Heart, Percent, Info, Share2, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

export default function WidgetCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Interaction states for Modal
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(12); // Default to wholesale to make it attractive!
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  // Filter & Search
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = selectedCategory === 'todos' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0] || 'M');
    // Set default quantity to minWholesaleQty to highlight the bulk savings!
    setQuantity(product.minWholesaleQty);
  };

  const handleShareProduct = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `¡Mira este producto en Boho Import! 🎁 *${product.name}* - Precios increíbles desde S/. ${product.wholesalePrice.toFixed(2)} por mayor.`;
    navigator.clipboard.writeText(text);
    setShareSuccess(product.id);
    setTimeout(() => setShareSuccess(null), 2000);
  };

  // Calculator helper inside modal
  const finalPriceDetails = useMemo(() => {
    if (!selectedProduct) return { unitPrice: 0, total: 0, isWholesale: false };
    
    const isWholesale = quantity >= selectedProduct.minWholesaleQty;
    const unitPrice = isWholesale ? selectedProduct.wholesalePrice : selectedProduct.price;
    const total = unitPrice * quantity;

    return { unitPrice, total, isWholesale };
  }, [selectedProduct, quantity]);

  const handleSendWhatsAppOrder = () => {
    if (!selectedProduct) return;
    
    const msg = `¡Hola Boho Import! 🛍️ Me gustaría realizar una cotización de este producto:\n\n` +
                `*Producto:* ${selectedProduct.name}\n` +
                `*Tamaño escogido:* ${selectedSize}\n` +
                `*Cantidad:* ${quantity} unidades\n` +
                `*Tipo de Precio:* ${finalPriceDetails.isWholesale ? 'Por Mayor (Mayorista) 👑' : 'Por Menor (Minorista)'}\n` +
                `*Precio Unitario:* S/. ${finalPriceDetails.unitPrice.toFixed(2)}\n` +
                `*Estimado Total:* S/. ${finalPriceDetails.total.toFixed(2)}\n\n` +
                `¿Tienen stock disponible para coordinar el pago y envío? Gracias! ✨`;

    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/51967651924?text=${encodedMsg}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Visual gift icon based on pattern
  const renderProductIllustration = (gradient: string, pattern: string, ribbonColor?: string) => {
    return (
      <div className={`w-full h-full bg-gradient-to-tr ${gradient} relative flex items-center justify-center overflow-hidden`}>
        {/* Gritty overlay noise */}
        <div className="absolute inset-0 bg-noise opacity-30" />
        
        {/* Custom Patterns built with CSS/SVG style */}
        {pattern === 'stripes' && (
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #000 0px, #000 10px, transparent 10px, transparent 20px)'
          }} />
        )}
        {pattern === 'dots' && (
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: 'radial-gradient(#000 15%, transparent 16%)',
            backgroundSize: '16px 16px'
          }} />
        )}
        {pattern === 'stars' && (
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: 'radial-gradient(circle, #000 10%, transparent 11%)',
            backgroundSize: '24px 24px',
            backgroundPosition: '12px 12px'
          }} />
        )}
        {pattern === 'holographic' && (
          <div className="absolute inset-0 bg-gradient-to-bl from-pink-300/30 via-purple-400/20 to-teal-200/30 active:scale-95 transition-transform" />
        )}

        {/* 3D Gift box schematic representation on each card */}
        <div className="w-16 h-18 relative flex flex-col items-center justify-end drop-shadow-md">
          {/* Ribbon Bow on top */}
          {ribbonColor && (
            <svg viewBox="0 0 60 40" className="w-12 h-8 -mb-1 z-10">
              <path d="M 30 25 C 15 5, 5 12, 30 25 M 30 25 C 45 5, 55 12, 30 25" stroke={ribbonColor} strokeWidth="3" fill="none" />
              <circle cx="30" cy="25" r="3" fill={ribbonColor} />
            </svg>
          )}

          {/* Lid of the gift box */}
          <div className="w-18 h-3 rounded-sm bg-zinc-900 border-b border-zinc-700 shadow-sm" />
          
          {/* Main box */}
          <div className="w-16 h-11 bg-white border-x border-b border-zinc-200 rounded-b-md flex items-center justify-center relative overflow-hidden">
            {/* Horizontal or vertical stripe ribbon */}
            {ribbonColor && (
              <div className="absolute inset-y-0 w-2" style={{ backgroundColor: ribbonColor }} />
            )}
            <span className="text-[9px] font-bold font-display tracking-widest text-zinc-400 z-10">BOHO</span>
          </div>
        </div>

        {pattern === 'holographic' && (
          <div className="absolute top-2 right-2">
            <Sparkles className="w-4.5 h-4.5 text-indigo-500 animate-pulse" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="catalog-section" className="space-y-6">
      {/* Search & Tabs */}
      <div className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-sm space-y-4">
        {/* Search */}
        <div className="relative flex items-center">
          <Search className="w-4.5 h-4.5 text-zinc-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-100 rounded-xl text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:bg-white transition-all text-zinc-800"
            placeholder="Buscar bolsas, cajas, lazos, papel de seda..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              type="button" 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tab Filters */}
        <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {[
            { id: 'todos', label: 'Todos 🛍️' },
            { id: 'bolsas', label: 'Bolsas 🛍️' },
            { id: 'cajas', label: 'Cajas 📦' },
            { id: 'accesorios', label: 'Accesorios 🎀' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-display tracking-tight whitespace-nowrap transition-all duration-300 border shrink-0 ${
                selectedCategory === tab.id
                  ? 'bg-zinc-900 border-zinc-900 text-white shadow-sm'
                  : 'bg-zinc-50 border-zinc-100 text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const isFav = !!favorites[product.id];
            const hasShared = shareSuccess === product.id;
            
            return (
              <motion.div
                key={product.id}
                layoutId={`card-${product.id}`}
                className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer group relative"
                onClick={() => openProductDetails(product)}
                whileHover={{ y: -3 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {/* Image Section */}
                <div className="h-32 sm:h-36 w-full overflow-hidden bg-zinc-50 relative shrink-0">
                  {renderProductIllustration(product.imageGradient, product.patternType, product.ribbonColor)}

                  {/* Absolute overlays */}
                  <div className="absolute top-2.5 right-2.5 flex flex-col space-y-1.5">
                    {/* Favorite Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(product.id, e)}
                      className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-zinc-400 hover:text-rose-600 shadow-xs hover:scale-105 transition-all"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 stroke-rose-500' : ''}`} />
                    </button>
                    {/* Share Button representing client copying */}
                    <button
                      type="button"
                      onClick={(e) => handleShareProduct(product, e)}
                      className={`w-7 h-7 rounded-full backdrop-blur-xs flex items-center justify-center shadow-xs hover:scale-105 transition-all ${
                        hasShared
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/90 text-zinc-400 hover:text-zinc-700'
                      }`}
                      title="Copiar información rápida"
                    >
                      {hasShared ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Wholesale Pricing Tag Bubble */}
                  <div className="absolute bottom-2 left-2 bg-zinc-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-sm font-mono">
                    <Percent className="w-2.5 h-2.5 text-yellow-400" />
                    <span>S/. {product.wholesalePrice.toFixed(2)} Mayor</span>
                  </div>
                </div>

                {/* Info space */}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-zinc-800 text-sm font-display tracking-tight line-clamp-1 leading-snug group-hover:text-rose-600 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-zinc-500 text-[11px] line-clamp-2 mt-1 leading-normal">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing row */}
                  <div className="mt-2.5 pt-2 border-t border-zinc-50 flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-zinc-400">Unit: </span>
                      <span className="text-sm font-bold text-zinc-800 font-display">S/. {product.price.toFixed(2)}</span>
                    </div>
                    {product.originalPrice && (
                      <span className="text-[10px] text-zinc-400 line-through">
                        S/. {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-10 bg-white border border-zinc-100 rounded-2xl p-6">
            <p className="text-zinc-400 text-sm">No encontramos productos que coincidan con tu búsqueda.</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('todos'); }}
              className="mt-3 text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full"
            >
              Mostrar todos
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              layoutId={`card-${selectedProduct.id}`}
              className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-xl overflow-hidden z-10 flex flex-col border border-zinc-100 max-h-[92vh] sm:max-h-[85vh] relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              {/* Close button on top */}
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-zinc-950/40 hover:bg-zinc-950/60 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Big Illustration Banner */}
              <div className="h-52 w-full bg-slate-50 relative shrink-0">
                {renderProductIllustration(selectedProduct.imageGradient, selectedProduct.patternType, selectedProduct.ribbonColor)}
                
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-10">
                  <span className="text-[10px] font-bold tracking-widest text-[#FDA4AF] bg-rose-950/60 uppercase px-2 py-0.5 rounded-full border border-rose-500/20">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-1 leading-tight">
                    {selectedProduct.name}
                  </h3>
                </div>
              </div>

              {/* Scrolling Content */}
              <div className="p-5 overflow-y-auto space-y-5 flex-1">
                {/* Description */}
                <div>
                  <h5 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest font-mono">Detalles del Producto</h5>
                  <p className="text-zinc-600 text-sm mt-1 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Bullet attributes */}
                <div className="grid grid-cols-1 gap-2 bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                  {selectedProduct.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-zinc-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Option 1: Sizes Selector */}
                {selectedProduct.sizes.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Selecciona Tamaño:</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                            selectedSize === size
                              ? 'bg-rose-50 border-rose-400 text-rose-600'
                              : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Option 2: Quantity config with Wholesale info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Cantidad para tu pedido:</label>
                    <span className="text-xs font-semibold text-zinc-400 font-mono">
                      Mínimo Mayorista: {selectedProduct.minWholesaleQty} pcs
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Stepper controls */}
                    <div className="flex items-center border border-zinc-200 rounded-xl bg-white p-1">
                      <button
                        type="button"
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-zinc-50 text-zinc-600 active:scale-95 transition-transform"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        className="w-14 text-center font-bold text-zinc-800 text-sm focus:outline-none"
                        value={quantity || 0}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity(q => q + 1)}
                        className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-zinc-50 text-zinc-600 active:scale-95 transition-transform"
                      >
                        +
                      </button>
                    </div>

                    {/* Pricing Display inside setup */}
                    <div className="flex-1 text-right">
                      {finalPriceDetails.isWholesale ? (
                        <div>
                          <div className="text-xs font-bold text-emerald-600 flex items-center justify-end space-x-1">
                            <Percent className="w-3 h-3" />
                            <span>¡Precio Mayorista!</span>
                          </div>
                          <p className="text-xs text-zinc-400 line-through">
                            Normal: S/. {(selectedProduct.price * quantity).toFixed(2)}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs text-amber-600 font-semibold">
                            ¡Agrega {selectedProduct.minWholesaleQty - quantity} más para Mayorista!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Interactive Pricing Summary Table */}
                <div className="border-t border-zinc-100 pt-4 space-y-2">
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>Precio unitario aplicado:</span>
                    <span className="font-semibold text-zinc-700">
                      S/. {finalPriceDetails.unitPrice.toFixed(2)} {finalPriceDetails.isWholesale ? '(X Mayor)' : '(X Menor)'}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-sm font-bold text-zinc-800">Total Estimado:</span>
                    <span className="text-2xl font-extrabold text-zinc-950 font-display">
                      S/. {finalPriceDetails.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sticky bottom Action */}
              <div className="p-5 border-t border-zinc-100 bg-zinc-50 flex space-x-3.5 shrink-0">
                <button
                  type="button"
                  onClick={handleSendWhatsAppOrder}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg transition-all duration-300 text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 text-sm cursor-pointer shadow-sm active:scale-98"
                >
                  <ShoppingBag className="w-4.5 h-4.5" />
                  <span>Enviar Pedido a WhatsApp</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
