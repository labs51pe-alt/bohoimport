import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShoppingBag, 
  X, 
  Heart, 
  Percent, 
  Info, 
  Share2, 
  Sparkles, 
  Check, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Send, 
  ChevronRight, 
  ArrowLeft,
  MapPin,
  CreditCard,
  Truck,
  Copy,
  Phone,
  Store,
  Building
} from 'lucide-react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../data';

export default function WidgetCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Store & Payment Quick Info Accordion
  const [showStorePaymentInfo, setShowStorePaymentInfo] = useState<boolean>(true);
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  // Delivery & Payment Checkout Preferences
  const [deliveryMethod, setDeliveryMethod] = useState<'provincia' | 'lima_express' | 'tienda'>('provincia');
  const [paymentMethod, setPaymentMethod] = useState<'yape_plin' | 'bcp_transfer' | 'efectivo_tienda'>('yape_plin');
  const [clientName, setClientName] = useState<string>('');
  const [clientCity, setClientCity] = useState<string>('');

  // Shopping Cart state loaded from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('boho_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  
  // Interaction states for Modal
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(12); // Default to wholesale to make it attractive!
  const [isCustomDistribution, setIsCustomDistribution] = useState<boolean>(false);
  const [customQuantities, setCustomQuantities] = useState<Record<string, number>>({});
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  // Filter & Search
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = selectedCategory === 'todos' || p.category === selectedCategory;
      const matchesOccasion = selectedOccasion === 'todas' || (p.occasions && p.occasions.some(occ => occ.toLowerCase().includes(selectedOccasion.toLowerCase())));
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (p.material && p.material.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            p.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesOccasion && matchesSearch;
    });
  }, [selectedCategory, selectedOccasion, searchQuery]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0] || 'M');
    setSelectedVariant(product.variants && product.variants.length > 0 ? product.variants[0] : '');
    // Set default quantity to minWholesaleQty to highlight the bulk savings!
    setQuantity(product.minWholesaleQty);
    setIsCustomDistribution(false);

    // Initialize custom quantities for variants
    if (product.variants && product.variants.length > 0) {
      const individualVars = product.variants.filter(v => !v.toLowerCase().includes('surtid'));
      const initialCounts: Record<string, number> = {};
      if (individualVars.length > 0) {
        // Distribute the minWholesaleQty evenly
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
  };

  const handleShareProduct = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `¡Mira este producto en Boho Import! 🎁 *${product.name}* - Precios increíbles desde S/. ${product.wholesalePrice.toFixed(2)} por mayor.`;
    navigator.clipboard.writeText(text);
    setShareSuccess(product.id);
    setTimeout(() => setShareSuccess(null), 2000);
  };

  // Derive total quantity based on custom distribution if enabled
  const sumOfCustom = useMemo(() => {
    return (Object.values(customQuantities) as number[]).reduce((a, b) => a + b, 0);
  }, [customQuantities]);

  const activeQuantity = isCustomDistribution ? sumOfCustom : quantity;

  // Generate dynamic, human-friendly variant description string
  const activeVariantString = useMemo(() => {
    if (!isCustomDistribution) return selectedVariant;
    
    // Filter variants that have a count > 0
    const nonZeroCustoms = (Object.entries(customQuantities) as [string, number][])
      .filter(([_, count]) => count > 0)
      .map(([variantName, count]) => `${count} ${variantName}`);
    
    if (nonZeroCustoms.length === 0) return 'Personalizado (Sin especificar)';
    return `Surtido: ${nonZeroCustoms.join(', ')}`;
  }, [isCustomDistribution, selectedVariant, customQuantities]);

  // Calculator helper inside modal
  const finalPriceDetails = useMemo(() => {
    if (!selectedProduct) return { unitPrice: 0, total: 0, isWholesale: false, levelLabel: '' };
    
    const qty = activeQuantity;
    
    // Support multi-tiered prices (priceLevels) if configured
    if (selectedProduct.priceLevels && selectedProduct.priceLevels.length > 0) {
      let matchedLevel = selectedProduct.priceLevels[0];
      for (const level of selectedProduct.priceLevels) {
        if (qty >= level.qty) {
          matchedLevel = level;
        }
      }
      const isWholesale = qty >= selectedProduct.minWholesaleQty;
      return {
        unitPrice: matchedLevel.price,
        total: matchedLevel.price * qty,
        isWholesale,
        levelLabel: matchedLevel.label
      };
    }

    const isWholesale = qty >= selectedProduct.minWholesaleQty;
    const unitPrice = isWholesale ? selectedProduct.wholesalePrice : selectedProduct.price;
    const total = unitPrice * qty;

    return { unitPrice, total, isWholesale, levelLabel: isWholesale ? 'Por Mayor (Mayorista)' : 'Precio Unitario' };
  }, [selectedProduct, activeQuantity]);

  const presetDistribute = (totalTarget: number) => {
    if (!selectedProduct || !selectedProduct.variants) return;
    const individualVars = selectedProduct.variants.filter(v => !v.toLowerCase().includes('surtid'));
    if (individualVars.length === 0) return;
    
    const baseQty = Math.floor(totalTarget / individualVars.length);
    const remainder = totalTarget % individualVars.length;
    
    const nextCounts: Record<string, number> = {};
    individualVars.forEach((v, index) => {
      nextCounts[v] = baseQty + (index < remainder ? 1 : 0);
    });
    setCustomQuantities(nextCounts);
  };

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('boho_cart', JSON.stringify(newCart));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  };

  const addToCart = (product: Product, size: string, variant: string, qty: number) => {
    const id = `${product.id}-${size || 'default'}-${variant || 'default'}`;
    
    // Choose correct price tier / levels
    let unitPrice = product.price;
    let label = 'Unitario';
    
    if (product.priceLevels && product.priceLevels.length > 0) {
      let matchedLevel = product.priceLevels[0];
      for (const level of product.priceLevels) {
        if (qty >= level.qty) {
          matchedLevel = level;
        }
      }
      unitPrice = matchedLevel.price;
      label = matchedLevel.label;
    } else {
      const isWholesale = qty >= product.minWholesaleQty;
      unitPrice = isWholesale ? product.wholesalePrice : product.price;
      label = isWholesale ? 'Por Mayor' : 'Por Menor';
    }

    const itemTotal = unitPrice * qty;

    const existingIndex = cart.findIndex(item => item.id === id);
    if (existingIndex > -1) {
      const updated = [...cart];
      const newQty = updated[existingIndex].quantity + qty;
      
      // Recalculate price levels
      let newUnitPrice = product.price;
      let newLabel = 'Unitario';
      if (product.priceLevels && product.priceLevels.length > 0) {
        let matchedLevel = product.priceLevels[0];
        for (const level of product.priceLevels) {
          if (newQty >= level.qty) {
            matchedLevel = level;
          }
        }
        newUnitPrice = matchedLevel.price;
        newLabel = matchedLevel.label;
      } else {
        const isWholesale = newQty >= product.minWholesaleQty;
        newUnitPrice = isWholesale ? product.wholesalePrice : product.price;
        newLabel = isWholesale ? 'Por Mayor' : 'Por Menor';
      }

      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: newQty,
        unitPrice: newUnitPrice,
        total: newUnitPrice * newQty,
        priceLabel: newLabel
      };
      updateCart(updated);
    } else {
      const newItem: CartItem = {
        id,
        product,
        size,
        variant,
        quantity: qty,
        unitPrice,
        total: itemTotal,
        priceLabel: label
      };
      updateCart([...cart, newItem]);
    }

    setSelectedProduct(null); // Close detail modal
    setIsCartOpen(true); // Automatically open cart sidebar to show the delight!
  };

  const updateCartItemQty = (id: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    
    const updated = cart.map(item => {
      if (item.id === id) {
        const product = item.product;
        let unitPrice = product.price;
        let label = 'Unitario';
        
        if (product.priceLevels && product.priceLevels.length > 0) {
          let matchedLevel = product.priceLevels[0];
          for (const level of product.priceLevels) {
            if (newQty >= level.qty) {
              matchedLevel = level;
            }
          }
          unitPrice = matchedLevel.price;
          label = matchedLevel.label;
        } else {
          const isWholesale = newQty >= product.minWholesaleQty;
          unitPrice = isWholesale ? product.wholesalePrice : product.price;
          label = isWholesale ? 'Por Mayor' : 'Por Menor';
        }

        return {
          ...item,
          quantity: newQty,
          unitPrice,
          total: unitPrice * newQty,
          priceLabel: label
        };
      }
      return item;
    });
    
    updateCart(updated);
  };

  const removeFromCart = (id: string) => {
    updateCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    updateCart([]);
  };

  const handleCopyNumber = (num: string, label: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNotice(label);
    setTimeout(() => setCopiedNotice(null), 2200);
  };

  const getDeliveryLabel = () => {
    if (deliveryMethod === 'provincia') return '📦 Envío a Provincia (Agencia Shalom / Olva / Marvisur)';
    if (deliveryMethod === 'lima_express') return '🛵 Delivery Express en Lima (Motorizado)';
    return '🏪 Recojo en Tienda Física (Jr. Andahuaylas 1124, Lima)';
  };

  const getPaymentLabel = () => {
    if (paymentMethod === 'yape_plin') return '📱 Yape / Plin (967 651 924)';
    if (paymentMethod === 'bcp_transfer') return '🏦 Transferencia BCP / Interbank';
    return '💵 Efectivo / Pago Contra Entrega en Tienda';
  };

  const sendCartToWhatsApp = () => {
    if (cart.length === 0) return;
    
    const totalSum = cart.reduce((sum, item) => sum + item.total, 0);
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    let msg = `¡Hola Boho Import! 🛍️✨ Acabo de armar mi pedido desde la tienda virtual. Aquí tienes el detalle de mi canasta:\n\n` +
              `*RESUMEN DEL PEDIDO:* (${totalQty} unid. en total)\n` +
              `---------------------------------------\n\n`;
               
    cart.forEach((item, index) => {
      msg += `*${index + 1}. ${item.product.name}*\n` +
             `   • Medida: ${item.size}\n` +
             (item.variant ? `   • Modelo/Surtido: ${item.variant}\n` : '') +
             `   • Cantidad: ${item.quantity} unidades\n` +
             `   • Precio: S/. ${item.unitPrice.toFixed(2)} (${item.priceLabel})\n` +
             `   • Subtotal: S/. ${item.total.toFixed(2)}\n\n`;
    });
    
    msg += `---------------------------------------\n` +
           `*👉 TOTAL ESTIMADO:* S/. ${totalSum.toFixed(2)}\n\n` +
           `*DATOS DE ENTREGA & PAGO:*\n` +
           `• *Método de Entrega:* ${getDeliveryLabel()}\n` +
           `• *Método de Pago Preferido:* ${getPaymentLabel()}\n` +
           (clientName.trim() ? `• *Cliente:* ${clientName.trim()}\n` : '') +
           (clientCity.trim() ? `• *Destino / Ciudad:* ${clientCity.trim()}\n` : '') +
           `\n¿Tienen stock disponible de estos productos para coordinar la entrega y el pago? ¡Muchas gracias! ❤️`;
            
    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/51967651924?text=${encodedMsg}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSendWhatsAppOrder = () => {
    if (!selectedProduct) return;
    
    const msg = `¡Hola Boho Import! 🛍️ Me gustaría realizar el pedido directo de este producto:\n\n` +
                `*Producto:* ${selectedProduct.name}\n` +
                `*Medida escogida:* ${selectedSize}\n` +
                (activeVariantString ? `*Diseño/Variante:* ${activeVariantString}\n` : '') +
                `*Cantidad:* ${activeQuantity} unidades\n` +
                `*Nivel de Precio:* ${finalPriceDetails.levelLabel || (finalPriceDetails.isWholesale ? 'Por Mayor 👑' : 'Por Menor')}\n` +
                `*Precio Unitario:* S/. ${finalPriceDetails.unitPrice.toFixed(2)}\n` +
                `*Estimado Total:* S/. ${finalPriceDetails.total.toFixed(2)}\n\n` +
                `*DATOS DE PREFERENCIA:*\n` +
                `• *Método de Entrega:* ${getDeliveryLabel()}\n` +
                `• *Método de Pago:* ${getPaymentLabel()}\n` +
                (clientName.trim() ? `• *Cliente:* ${clientName.trim()}\n` : '') +
                (clientCity.trim() ? `• *Destino:* ${clientCity.trim()}\n` : '') +
                `\n¿Tienen stock disponible para confirmar y coordinar el pago? ¡Muchas gracias! ✨`;

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
    <div id="catalog-section" className="space-y-5">
      
      {/* Interactive Quick Store Location & Payment Methods Bar */}
      <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 rounded-2xl p-4 border border-amber-200/70 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-black text-zinc-900 uppercase font-display tracking-tight">
              📍 Ubicación & Métodos de Pago 💳
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowStorePaymentInfo(!showStorePaymentInfo)}
            className="text-[11px] font-extrabold text-rose-600 hover:text-rose-700 bg-white px-2.5 py-1 rounded-lg border border-rose-100 shadow-2xs transition-all cursor-pointer"
          >
            {showStorePaymentInfo ? 'Ocultar ▲' : 'Ver Datos 💳'}
          </button>
        </div>

        {showStorePaymentInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-2 border-t border-amber-200/50 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-700"
          >
            {/* Address Box */}
            <div className="bg-white/90 p-3 rounded-xl border border-zinc-200/80 space-y-1.5 shadow-2xs">
              <div className="flex items-center space-x-1.5 font-bold text-zinc-900">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Tienda Física en Lima:</span>
              </div>
              <p className="text-[11px] text-zinc-600 font-medium leading-tight">
                Jr. Andahuaylas 1124 (Frente a Mesa Redonda), Cercado de Lima.
              </p>
              <div className="pt-1 flex flex-wrap gap-1.5">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Jr.+Andahuaylas+1124,+Cercado+de+Lima,+Peru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-extrabold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-md border border-rose-200/60 flex items-center space-x-1 transition-colors"
                >
                  <span>Abrir Google Maps 🗺️</span>
                </a>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                  📦 Envíos Shalom / Olva
                </span>
              </div>
            </div>

            {/* Payment Box */}
            <div className="bg-white/90 p-3 rounded-xl border border-zinc-200/80 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between font-bold text-zinc-900">
                <div className="flex items-center space-x-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Métodos de Pago Oficiales:</span>
                </div>
                {copiedNotice && (
                  <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded animate-pulse">
                    ¡Copiado!
                  </span>
                )}
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between bg-emerald-50/80 p-1.5 rounded-lg border border-emerald-100/80">
                  <span className="font-bold text-emerald-950">📱 Yape / Plin:</span>
                  <button
                    type="button"
                    onClick={() => handleCopyNumber('967651924', 'yape')}
                    className="font-mono text-[11px] font-bold text-emerald-800 hover:text-emerald-950 bg-white px-2 py-0.5 rounded border border-emerald-200/80 cursor-pointer flex items-center space-x-1 active:scale-95 transition-all"
                  >
                    <span>967 651 924</span>
                    <Copy className="w-3 h-3 text-emerald-600" />
                  </button>
                </div>
                <div className="flex items-center justify-between bg-sky-50/80 p-1.5 rounded-lg border border-sky-100/80">
                  <span className="font-bold text-sky-950">🏦 BCP Soles:</span>
                  <button
                    type="button"
                    onClick={() => handleCopyNumber('191-30948102-0-45', 'bcp')}
                    className="font-mono text-[11px] font-bold text-sky-800 hover:text-sky-950 bg-white px-2 py-0.5 rounded border border-sky-200/80 cursor-pointer flex items-center space-x-1 active:scale-95 transition-all"
                  >
                    <span>191-30948102-0-45</span>
                    <Copy className="w-3 h-3 text-sky-600" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Search & Category Pills */}
      <div className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-sm space-y-4">
        {/* Search Input */}
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

        {/* Category Tab Filters */}
        <div className="space-y-2">
          <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {[
              { id: 'todos', label: 'Todos 🛍️' },
              { id: 'bolsas', label: 'Bolsas Llanas 🛍️' },
              { id: 'cajas', label: 'Cajas de Regalo 📦' },
              { id: 'accesorios', label: 'Toppers & Papel 🎀' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-display tracking-tight whitespace-nowrap transition-all duration-300 border shrink-0 cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-zinc-900 border-zinc-900 text-white shadow-sm'
                    : 'bg-zinc-50 border-zinc-100 text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Occasions Quick Filter Chips */}
          <div className="flex space-x-1.5 overflow-x-auto pb-0.5 scrollbar-thin items-center">
            <span className="text-[10px] font-bold text-zinc-400 uppercase font-gift shrink-0">Ocasión:</span>
            {[
              { id: 'todas', label: '✨ Todas' },
              { id: 'Padre', label: '👔 Día del Padre' },
              { id: 'Madre', label: '👑 Día de la Madre' },
              { id: 'Amor', label: '❤️ Amor' },
              { id: 'Cumpleaños', label: '🎂 Cumpleaños' },
              { id: 'Graduación', label: '🎓 Graduación' },
              { id: 'Niño', label: '🧸 Niños' },
              { id: 'Corporativo', label: '💼 Corporativo' }
            ].map((occ) => (
              <button
                key={occ.id}
                type="button"
                onClick={() => setSelectedOccasion(occ.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium tracking-tight whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  selectedOccasion === occ.id
                    ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 font-bold border border-rose-300 dark:border-rose-800 shadow-2xs'
                    : 'bg-zinc-100/70 text-zinc-600 hover:bg-zinc-200/70 border border-transparent'
                }`}
              >
                {occ.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const isFav = !!favorites[product.id];
            const hasShared = shareSuccess === product.id;
            const itemsInCart = cart.filter(i => i.product.id === product.id).reduce((sum, i) => sum + i.quantity, 0);
            
            return (
              <motion.div
                key={product.id}
                layoutId={`card-${product.id}`}
                className="bg-white rounded-2xl border border-zinc-200/70 shadow-xs overflow-hidden hover:shadow-lg hover:border-rose-300 transition-all duration-300 flex flex-col cursor-pointer group relative gift-shimmer"
                onClick={() => openProductDetails(product)}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              >
                {/* Image Section */}
                <div className="h-32 sm:h-36 md:h-40 lg:h-44 w-full overflow-hidden bg-zinc-50 relative shrink-0">
                  {renderProductIllustration(product.imageGradient, product.patternType, product.ribbonColor)}

                  {/* Absolute overlays */}
                  <div className="absolute top-2.5 right-2.5 flex flex-col space-y-1.5 z-10">
                    {/* Favorite Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(product.id, e)}
                      className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-zinc-400 hover:text-rose-600 shadow-xs hover:scale-110 transition-all cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 stroke-rose-500' : ''}`} />
                    </button>
                    {/* Share Button representing client copying */}
                    <button
                      type="button"
                      onClick={(e) => handleShareProduct(product, e)}
                      className={`w-7 h-7 rounded-full backdrop-blur-xs flex items-center justify-center shadow-xs hover:scale-110 transition-all cursor-pointer ${
                        hasShared
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/90 text-zinc-400 hover:text-zinc-700'
                      }`}
                      title="Copiar información rápida"
                    >
                      {hasShared ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Cart count badge overlay if present */}
                  {itemsInCart > 0 && (
                    <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full font-gift shadow-xs border border-white animate-pulse">
                      En canasta: {itemsInCart}
                    </div>
                  )}

                  {/* Wholesale Pricing Tag Bubble */}
                  <div className="absolute bottom-2 left-2 bg-zinc-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-sm font-gift">
                    <Percent className="w-2.5 h-2.5 text-amber-400 animate-sparkle" />
                    <span>S/. {product.wholesalePrice.toFixed(2)} Mayor</span>
                  </div>
                </div>

                {/* Info space */}
                <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    {/* Material & Unit micro badge */}
                    {product.material && (
                      <span className="text-[9px] font-mono font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded uppercase block truncate mb-1">
                        🧵 {product.material}
                      </span>
                    )}

                    <h4 className="font-bold text-zinc-800 text-xs sm:text-sm font-display tracking-tight line-clamp-1 leading-snug group-hover:text-rose-600 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-zinc-500 text-[10px] sm:text-[11px] line-clamp-2 mt-0.5 leading-tight font-medium">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing row with quick 1-click add */}
                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-1">
                    <div className="min-w-0">
                      <span className="text-[9px] text-zinc-400 block leading-none font-gift">x Docena:</span>
                      <span className="text-xs sm:text-sm font-black text-rose-600 font-display">
                        S/. {product.wholesalePrice.toFixed(2)}
                      </span>
                    </div>

                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.88 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(
                          product, 
                          product.sizes[0] || 'M', 
                          product.variants && product.variants.length > 0 ? product.variants[0] : 'Surtido', 
                          product.minWholesaleQty
                        );
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-2 sm:px-2.5 py-1.5 rounded-xl text-[9px] sm:text-[10px] flex items-center space-x-1 uppercase tracking-tight shadow-2xs hover:shadow-xs font-gift shrink-0 cursor-pointer"
                      title="Agregar pack docena a la canasta"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Docena 🛒</span>
                    </motion.button>
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
              className="bg-white w-full sm:max-w-md md:max-w-2xl lg:max-w-3xl rounded-t-3xl sm:rounded-3xl shadow-xl overflow-hidden z-10 flex flex-col border border-zinc-100 max-h-[92vh] sm:max-h-[85vh] relative"
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

                {/* Option 1b: Variants/Designs Selector */}
                {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
                        Selecciona Diseño / Variante:
                      </label>
                      <span className="text-[10px] font-extrabold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                        ¡Arma Surtidos! ✨
                      </span>
                    </div>

                    {/* Segmented Selection Tabs */}
                    <div className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200/45">
                      <button
                        type="button"
                        onClick={() => setIsCustomDistribution(false)}
                        className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          !isCustomDistribution
                            ? 'bg-white text-zinc-950 shadow-xs'
                            : 'text-zinc-500 hover:text-zinc-800'
                        }`}
                      >
                        📦 Surtido Único / Menor
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomDistribution(true);
                          presetDistribute(quantity);
                        }}
                        className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isCustomDistribution
                            ? 'bg-white text-zinc-950 shadow-xs'
                            : 'text-zinc-500 hover:text-zinc-800'
                        }`}
                      >
                        🎨 Cantidades x Diseño
                      </button>
                    </div>

                    {/* Selector Mode Content */}
                    {!isCustomDistribution ? (
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.variants.map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => setSelectedVariant(v)}
                              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                selectedVariant === v
                                  ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                                  : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 bg-zinc-50/50 border border-zinc-200/60 p-3.5 rounded-2xl">
                        {/* Preset Helper Bars */}
                        <div className="flex flex-col space-y-2 pb-2.5 border-b border-zinc-150">
                          <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest font-mono">
                            Auto-Distribuir por Docenas/Grupos:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            <button
                              type="button"
                              onClick={() => presetDistribute(12)}
                              className="text-[10px] font-bold bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 px-2 py-0.5 rounded-lg transition-transform hover:scale-102 active:scale-97 cursor-pointer"
                            >
                              1 Docena (12)
                            </button>
                            <button
                              type="button"
                              onClick={() => presetDistribute(24)}
                              className="text-[10px] font-bold bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 px-2 py-0.5 rounded-lg transition-transform hover:scale-102 active:scale-97 cursor-pointer"
                            >
                              2 Docenas (24)
                            </button>
                            <button
                              type="button"
                              onClick={() => presetDistribute(36)}
                              className="text-[10px] font-bold bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 px-2 py-0.5 rounded-lg transition-transform hover:scale-102 active:scale-97 cursor-pointer"
                            >
                              3 Docenas (36)
                            </button>
                            <button
                              type="button"
                              onClick={() => presetDistribute(48)}
                              className="text-[10px] font-bold bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 px-2 py-0.5 rounded-lg transition-transform hover:scale-102 active:scale-97 cursor-pointer"
                            >
                              4 Docenas (48)
                            </button>
                            <button
                              type="button"
                              onClick={() => presetDistribute(72)}
                              className="text-[10px] font-bold bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 px-2 py-0.5 rounded-lg transition-transform hover:scale-102 active:scale-97 cursor-pointer"
                            >
                              6 Docenas (72)
                            </button>
                            <button
                              type="button"
                              onClick={() => presetDistribute(selectedProduct.minWholesaleQty >= 100 ? 100 : 50)}
                              className="text-[10px] font-bold bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 px-2 py-0.5 rounded-lg transition-transform hover:scale-102 active:scale-97 cursor-pointer"
                            >
                              {selectedProduct.minWholesaleQty >= 100 ? '1 Ciento (100) 🎁' : 'Mínimo (50)'}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const nextCounts: Record<string, number> = {};
                                selectedProduct.variants
                                  .filter(v => !v.toLowerCase().includes('surtid'))
                                  .forEach(v => {
                                    nextCounts[v] = 0;
                                  });
                                setCustomQuantities(nextCounts);
                              }}
                              className="text-[10px] font-bold bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-100 px-2 py-0.5 rounded-lg transition-transform hover:scale-102 active:scale-97 cursor-pointer"
                            >
                              Vaciar 🧹
                            </button>
                          </div>
                        </div>

                        {/* List of individual custom variant steppers */}
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {selectedProduct.variants
                            .filter(v => !v.toLowerCase().includes('surtid'))
                            .map((v) => {
                              const count = customQuantities[v] || 0;
                              return (
                                <div
                                  key={v}
                                  className="flex items-center justify-between p-2 bg-white rounded-xl border border-zinc-150 shadow-3xs"
                                >
                                  <span className="text-xs font-semibold text-zinc-700">{v}</span>
                                  <div className="flex items-center space-x-1.5">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setCustomQuantities(prev => ({
                                          ...prev,
                                          [v]: Math.max(0, count - 1)
                                        }));
                                      }}
                                      className="w-7 h-7 rounded-md bg-zinc-50 hover:bg-zinc-100 flex items-center justify-center text-zinc-600 text-xs font-bold transition-all cursor-pointer active:scale-90"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <input
                                      type="number"
                                      min="0"
                                      value={count}
                                      onChange={(e) => {
                                        const val = Math.max(0, parseInt(e.target.value) || 0);
                                        setCustomQuantities(prev => ({
                                          ...prev,
                                          [v]: val
                                        }));
                                      }}
                                      className="w-8 text-center font-bold text-xs text-zinc-850 bg-transparent border-0 focus:outline-none"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setCustomQuantities(prev => ({
                                          ...prev,
                                          [v]: count + 1
                                        }));
                                      }}
                                      className="w-7 h-7 rounded-md bg-zinc-50 hover:bg-zinc-100 flex items-center justify-center text-zinc-600 text-xs font-bold transition-all cursor-pointer active:scale-90"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Option 2: Quantity config with Wholesale info */}
                <div className="space-y-3">
                  {isCustomDistribution ? (
                    /* Display read-only custom sum total feedback */
                    <div className="bg-amber-50/60 border border-amber-200/60 p-4 rounded-2xl flex items-center justify-between shadow-3xs">
                      <div>
                        <span className="text-[10px] text-amber-700 font-bold uppercase tracking-widest block leading-tight font-mono">
                          Cantidad Total Surtida
                        </span>
                        <span className="text-xl font-black text-amber-950 font-display mt-0.5 block">
                          {sumOfCustom} unidades
                        </span>
                      </div>
                      <div className="text-right">
                        {sumOfCustom >= selectedProduct.minWholesaleQty ? (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-200 tracking-wider inline-flex items-center space-x-1 shadow-3xs">
                            <Percent className="w-3 h-3" />
                            <span>PRECIO POR MAYOR 👑</span>
                          </span>
                        ) : (
                          <div className="text-[9px] font-bold text-zinc-500 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-full">
                            Faltan {selectedProduct.minWholesaleQty - sumOfCustom} pcs para Mayorista 🛍️
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Standard quantity stepper selector */
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Cantidad para tu pedido:</label>
                        <span className="text-xs font-semibold text-zinc-400 font-mono">
                          Mínimo Mayorista: {selectedProduct.minWholesaleQty} pcs
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-zinc-50/50 p-3 rounded-2xl border border-zinc-200/50">
                        <div className="flex items-center space-x-2">
                          {/* Stepper controls */}
                          <div className="flex items-center border border-zinc-200 rounded-xl bg-white p-1 shadow-3xs">
                            <button
                              type="button"
                              onClick={() => setQuantity(q => Math.max(1, q - 1))}
                              className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-zinc-50 text-zinc-650 active:scale-95 transition-transform cursor-pointer font-bold"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              className="w-14 text-center font-bold text-zinc-850 text-sm focus:outline-none"
                              value={quantity || 0}
                              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            />
                            <button
                              type="button"
                              onClick={() => setQuantity(q => q + 1)}
                              className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-zinc-50 text-zinc-650 active:scale-95 transition-transform cursor-pointer font-bold"
                            >
                              +
                            </button>
                          </div>

                          {/* Quick dozen steppers */}
                          <div className="flex space-x-1">
                            <button
                              type="button"
                              onClick={() => setQuantity(q => Math.max(1, q - 12))}
                              className="px-2.5 h-12 rounded-xl bg-zinc-150 hover:bg-zinc-200 text-zinc-700 text-[10px] font-black transition-all cursor-pointer active:scale-95 flex flex-col items-center justify-center line-tight"
                              title="Restar 1 docena (12 unidades)"
                            >
                              <span>-12</span>
                              <span className="text-[7px] text-zinc-500 font-bold uppercase">Doc</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setQuantity(q => q + 12)}
                              className="px-2.5 h-12 rounded-xl bg-zinc-150 hover:bg-zinc-200 text-zinc-700 text-[10px] font-black transition-all cursor-pointer active:scale-95 flex flex-col items-center justify-center line-tight"
                              title="Sumar 1 docena (12 unidades)"
                            >
                              <span>+12</span>
                              <span className="text-[7px] text-zinc-500 font-bold uppercase">Doc</span>
                            </button>
                          </div>
                        </div>

                        {/* Pricing Display inside setup */}
                        <div className="flex-1 text-right sm:text-right">
                          {finalPriceDetails.isWholesale ? (
                            <div className="space-y-0.5">
                              <div className="text-xs font-black text-emerald-600 flex items-center justify-end space-x-1">
                                <Percent className="w-3.5 h-3.5" />
                                <span>{finalPriceDetails.levelLabel || '¡Precio Mayorista!'} 👑</span>
                              </div>
                              {selectedProduct.price && selectedProduct.price > selectedProduct.wholesalePrice && (
                                <p className="text-xs text-zinc-400 font-medium line-through">
                                  Normal: S/. {(selectedProduct.price * quantity).toFixed(2)}
                                </p>
                              )}
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

                      {/* Immediate Quantity Preset Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-wider font-mono">Dozena/Múltiplos:</span>
                        <button
                          type="button"
                          onClick={() => setQuantity(12)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            quantity === 12
                              ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-3xs font-extrabold'
                              : 'bg-white border-zinc-250 text-zinc-650 hover:bg-zinc-50'
                          }`}
                        >
                          1 Docena (12)
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuantity(24)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            quantity === 24
                              ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-3xs font-extrabold'
                              : 'bg-white border-zinc-250 text-zinc-650 hover:bg-zinc-50'
                          }`}
                        >
                          2 Docenas (24)
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuantity(36)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            quantity === 36
                              ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-3xs font-extrabold'
                              : 'bg-white border-zinc-250 text-zinc-650 hover:bg-zinc-50'
                          }`}
                        >
                          3 Docenas (36)
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuantity(48)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            quantity === 48
                              ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-3xs font-extrabold'
                              : 'bg-white border-zinc-250 text-zinc-650 hover:bg-zinc-50'
                          }`}
                        >
                          4 Docenas (48)
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuantity(72)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            quantity === 72
                              ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-3xs font-extrabold'
                              : 'bg-white border-zinc-250 text-zinc-650 hover:bg-zinc-50'
                          }`}
                        >
                          6 Docenas (72)
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuantity(selectedProduct.minWholesaleQty >= 100 ? 100 : 50)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            quantity === (selectedProduct.minWholesaleQty >= 100 ? 100 : 50)
                              ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-3xs font-extrabold'
                              : 'bg-white border-zinc-250 text-zinc-650 hover:bg-zinc-50'
                          }`}
                        >
                          {selectedProduct.minWholesaleQty >= 100 ? '1 Ciento (100) 🎁' : 'Mínimo (50)'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Interactive Pricing Summary Table */}
                <div className="border-t border-zinc-100 pt-4 space-y-2">
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>Precio unitario aplicado:</span>
                    <span className="font-semibold text-zinc-700">
                      S/. {finalPriceDetails.unitPrice.toFixed(2)} ({finalPriceDetails.levelLabel || (finalPriceDetails.isWholesale ? 'Por Mayor' : 'Unitario')})
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

              {/* Sticky bottom Action with Cart Add vs Direct purchase */}
              <div className="p-5 border-t border-zinc-100 bg-zinc-50 flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    if (isCustomDistribution && activeQuantity === 0) {
                      alert('Por favor, agrega al menos 1 unidad en total a tu surtido personalizado.');
                      return;
                    }
                    addToCart(selectedProduct, selectedSize, activeVariantString, activeQuantity);
                  }}
                  disabled={isCustomDistribution && activeQuantity === 0}
                  className={`flex-1 font-extrabold py-3.5 rounded-xl flex items-center justify-center space-x-2 text-xs uppercase tracking-wider cursor-pointer shadow-xs transition-all duration-300 ${
                    isCustomDistribution && activeQuantity === 0
                      ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-white hover:shadow-md active:scale-98'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 text-emerald-400" />
                  <span>Añadir a la Canasta 🛒</span>
                </button>
                <button
                  type="button"
                  onClick={handleSendWhatsAppOrder}
                  disabled={isCustomDistribution && activeQuantity === 0}
                  className={`flex-1 font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 text-xs uppercase tracking-wider cursor-pointer shadow-xs transition-all duration-300 ${
                    isCustomDistribution && activeQuantity === 0
                      ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md active:scale-98'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Comprar Directo 📲</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Shopping Cart Trigger Button */}
      <AnimatePresence>
        {cart.length > 0 && !isCartOpen && (
          <motion.button
            key="floating-cart-btn"
            initial={{ scale: 0, y: 50, opacity: 0 }}
            animate={{ scale: 1.05, y: 0, opacity: 1 }}
            exit={{ scale: 0, y: 50, opacity: 0 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.93 }}
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-zinc-950 text-white font-extrabold pr-5 pl-4 py-3.5 rounded-full shadow-2xl flex items-center space-x-3 border border-zinc-700 hover:bg-zinc-900 transition-all cursor-pointer animate-gift-glow"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-amber-300 animate-gift-bounce" />
              <span className="absolute -top-2.5 -right-2.5 bg-rose-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center font-gift border-2 border-zinc-950 animate-pulse">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <div className="text-left">
              <span className="text-xs uppercase font-gift tracking-wider font-extrabold block text-amber-300 leading-tight">Canasta 🛒</span>
              <span className="text-[11px] font-black font-display text-white block leading-none">
                S/. {cart.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Shopping Cart Sliding Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 210 }}
              className="bg-white w-full max-w-md h-full shadow-2xl relative z-10 flex flex-col border-l border-zinc-150"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 text-amber-300 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 font-display">Mi Canasta de Pedidos</h3>
                    <p className="text-xs text-zinc-500 font-semibold">
                      {cart.length === 1 ? '1 ítem seleccionado' : `${cart.length} ítems seleccionados`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {cart.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('¿Estás seguro de vaciar toda tu canasta?')) {
                          clearCart();
                        }
                      }}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors px-3 py-1.5 rounded-lg mr-1 cursor-pointer"
                    >
                      Vaciar
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="w-10 h-10 rounded-full hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Content (Scrollable list) */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-300">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-800 text-sm">Tu canasta está vacía</h4>
                      <p className="text-zinc-500 text-xs mt-1 max-w-xs mx-auto">
                        Explora nuestro catálogo y agrega productos para cotizarlos juntos en un solo mensaje de WhatsApp.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(false)}
                      className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs py-2.5 px-5 rounded-full shadow-sm transition-all"
                    >
                      Continuar comprando
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-zinc-155 p-3.5 flex space-x-3.5 shadow-sm hover:border-zinc-300 transition-all relative group"
                    >
                      {/* Left: Product Miniature Preview */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-zinc-100">
                        {renderProductIllustration(item.product.imageGradient, item.product.patternType, item.product.ribbonColor)}
                      </div>

                      {/* Right: Info and quantity handlers */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="font-bold text-xs text-zinc-900 truncate pr-5 font-display" title={item.product.name}>
                              {item.product.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-zinc-300 hover:text-rose-600 transition-colors absolute top-3.5 right-3.5 cursor-pointer"
                              title="Eliminar producto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-1">
                            <span className="bg-zinc-50 border border-zinc-100 text-[10px] text-zinc-500 px-1.5 py-0.5 rounded font-mono">
                              Medida: {item.size}
                            </span>
                            {item.variant && (
                              <span className="bg-amber-50 border border-amber-100 text-[10px] text-amber-800 px-1.5 py-0.5 rounded font-medium">
                                {item.variant}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Bottom Row inside cart item: item subtotal and count selectors */}
                        <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-zinc-50">
                          {/* Stepper controls */}
                          <div className="flex items-center border border-zinc-200 rounded-lg p-0.5 bg-zinc-50/50">
                            <button
                              type="button"
                              onClick={() => updateCartItemQty(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white text-zinc-500 hover:text-zinc-800 active:scale-90 transition-all"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center font-bold text-xs text-zinc-800">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateCartItemQty(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white text-zinc-500 hover:text-zinc-800 active:scale-90 transition-all"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Dynamic single item pricing display */}
                          <div className="text-right">
                            <div className="text-[10px] font-bold text-emerald-600 font-mono">
                              S/. {item.unitPrice.toFixed(2)} c/u
                            </div>
                            <div className="text-xs font-black text-zinc-950 font-display">
                              S/. {item.total.toFixed(2)}
                            </div>
                            <span className="text-[9px] text-zinc-400 font-semibold block leading-none">
                              {item.priceLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer with Wholesale advice, delivery/payment preferences & primary checkout button */}
              {cart.length > 0 && (
                <div className="border-t border-zinc-100 p-4 sm:p-5 bg-zinc-50 space-y-3.5 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] shrink-0 overflow-y-auto max-h-[50vh]">
                  {/* Delivery & Payment Preference Selectors */}
                  <div className="bg-white p-3.5 rounded-2xl border border-zinc-200/80 space-y-3 shadow-2xs">
                    {/* Delivery Method */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-extrabold text-zinc-800 uppercase tracking-wide flex items-center space-x-1">
                        <Truck className="w-3.5 h-3.5 text-rose-600" />
                        <span>Método de Entrega / Envío:</span>
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('provincia')}
                          className={`p-2 rounded-xl text-[10px] font-bold border text-center transition-all cursor-pointer ${
                            deliveryMethod === 'provincia'
                              ? 'bg-rose-50 border-rose-300 text-rose-900 shadow-2xs font-extrabold'
                              : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                          }`}
                        >
                          📦 Provincia
                          <span className="block text-[8px] font-normal text-zinc-500">Shalom/Olva</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('lima_express')}
                          className={`p-2 rounded-xl text-[10px] font-bold border text-center transition-all cursor-pointer ${
                            deliveryMethod === 'lima_express'
                              ? 'bg-rose-50 border-rose-300 text-rose-900 shadow-2xs font-extrabold'
                              : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                          }`}
                        >
                          🛵 Lima Express
                          <span className="block text-[8px] font-normal text-zinc-500">Motorizado</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('tienda')}
                          className={`p-2 rounded-xl text-[10px] font-bold border text-center transition-all cursor-pointer ${
                            deliveryMethod === 'tienda'
                              ? 'bg-rose-50 border-rose-300 text-rose-900 shadow-2xs font-extrabold'
                              : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                          }`}
                        >
                          🏪 Recojo Tienda
                          <span className="block text-[8px] font-normal text-zinc-500">Mesa Redonda</span>
                        </button>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-1.5 pt-1.5 border-t border-zinc-100">
                      <label className="text-[11px] font-extrabold text-zinc-800 uppercase tracking-wide flex items-center space-x-1">
                        <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Método de Pago Preferido:</span>
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('yape_plin')}
                          className={`p-2 rounded-xl text-[10px] font-bold border text-center transition-all cursor-pointer ${
                            paymentMethod === 'yape_plin'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs font-extrabold'
                              : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                          }`}
                        >
                          📱 Yape / Plin
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('bcp_transfer')}
                          className={`p-2 rounded-xl text-[10px] font-bold border text-center transition-all cursor-pointer ${
                            paymentMethod === 'bcp_transfer'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs font-extrabold'
                              : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                          }`}
                        >
                          🏦 BCP / Cta.
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('efectivo_tienda')}
                          className={`p-2 rounded-xl text-[10px] font-bold border text-center transition-all cursor-pointer ${
                            paymentMethod === 'efectivo_tienda'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs font-extrabold'
                              : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                          }`}
                        >
                          💵 Efectivo
                        </button>
                      </div>
                    </div>

                    {/* Optional Client Name / City fields */}
                    <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-zinc-100">
                      <div>
                        <input
                          type="text"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Tu Nombre (Opcional)"
                          className="w-full text-[11px] p-2 bg-zinc-50 border border-zinc-200 rounded-lg placeholder-zinc-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-rose-300"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={clientCity}
                          onChange={(e) => setClientCity(e.target.value)}
                          placeholder="Ciudad / Destino"
                          className="w-full text-[11px] p-2 bg-zinc-50 border border-zinc-200 rounded-lg placeholder-zinc-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-rose-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary math */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-xs text-zinc-600">
                      <span>Total Unidades:</span>
                      <span className="font-bold text-zinc-800">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)} unidades
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline pt-1">
                      <span className="text-sm font-bold text-zinc-800 font-display">Total de tu Pedido:</span>
                      <span className="text-2xl font-black text-zinc-950 font-display">
                        S/. {cart.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Redirection button */}
                  <button
                    type="button"
                    onClick={sendCartToWhatsApp}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg transition-all duration-300 text-white font-extrabold py-3.5 rounded-xl flex items-center justify-center space-x-2 text-sm shadow-md active:scale-98 cursor-pointer"
                  >
                    <Send className="w-4.5 h-4.5 animate-pulse" />
                    <span>Realizar Pedido en WhatsApp ⚡</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
