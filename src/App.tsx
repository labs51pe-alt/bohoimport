import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  MapPin, 
  Sparkles, 
  Share2, 
  Check, 
  Clock, 
  ExternalLink, 
  QrCode, 
  Copy,
  ShoppingBag,
  Info,
  Heart,
  Send,
  Truck,
  Building,
  Phone,
  Flame,
  Percent,
  Gift
} from 'lucide-react';
import { Product, CartItem, ServiceItem } from './types';
import { PRODUCTS, SERVICES } from './data';
import { NavbarHeader } from './components/NavbarHeader';
import { Hero3DParallax } from './components/Hero3DParallax';
import { QuickCarousels } from './components/QuickCarousels';
import { ServicesSection } from './components/ServicesSection';
import { FastQuoteModal } from './components/FastQuoteModal';
import { FavoritesModal } from './components/FavoritesModal';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FloatingBottomNav } from './components/FloatingBottomNav';
import { HeroSlider } from './components/HeroSlider';
import WidgetCatalog from './components/WidgetCatalog';
import WidgetLinks from './components/WidgetLinks';
import WidgetAbout from './components/WidgetAbout';

type TabType = 'inicio' | 'servicios' | 'catalogo' | 'favoritos' | 'enlaces' | 'nosotros';

export default function App() {
  // Dark / Light mode state with localStorage persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('boho_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<TabType>('inicio');

  // Shopping Cart state with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('boho_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorites state with localStorage
  const [favorites, setFavorites] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('boho_favs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);
  const [isFastQuoteOpen, setIsFastQuoteOpen] = useState<boolean>(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<ServiceItem | null>(null);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Sync Dark Mode class to <html>
  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('boho_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('boho_theme', 'light');
      }
    } catch (e) {
      console.error(e);
    }
  }, [darkMode]);

  // Sync Cart to localStorage
  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('boho_cart', JSON.stringify(newCart));
    } catch (e) {
      console.error(e);
    }
  };

  // Sync Favorites to localStorage
  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('boho_favs', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  // Cart operations
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

    setSelectedProductForModal(null);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }

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

    const updated = cart.map(i => i.id === id ? {
      ...i,
      quantity: newQty,
      unitPrice,
      total: unitPrice * newQty,
      priceLabel: label
    } : i);

    updateCart(updated);
  };

  const handleRemoveItem = (id: string) => {
    updateCart(cart.filter(i => i.id !== id));
  };

  const handleClearCart = () => {
    updateCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.total, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = Object.values(favorites).filter(Boolean).length;

  const handleOpenQuoteModal = (service?: ServiceItem | null) => {
    setSelectedServiceForQuote(service || null);
    setIsFastQuoteOpen(true);
  };

  const handleShareApp = () => {
    const appUrl = window.location.href;
    navigator.clipboard.writeText(appUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div 
      id="boho-superapp-root" 
      className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans antialiased text-zinc-800 dark:text-zinc-100 pb-28 selection:bg-rose-100 selection:text-rose-900 dark:selection:bg-rose-900 dark:selection:text-rose-100 transition-colors duration-300 relative"
    >
      
      {/* 1. Header Ticker Announcement */}
      <div id="top-announcement-ticker" className="bg-zinc-900 dark:bg-black text-white py-1.5 px-4 shadow-sm text-center relative overflow-hidden select-none z-30">
        <motion.p 
          className="text-[11px] md:text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center space-x-2 text-rose-300 dark:text-rose-400"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          <span>📦 Despachos Diarios a Todo el Perú (Shalom / Olva / Marvisur)</span>
          <span className="hidden sm:inline text-zinc-600 dark:text-zinc-500">•</span>
          <span className="hidden sm:inline">📍 Jr. Andahuaylas 1124, Lima</span>
        </motion.p>
      </div>

      {/* 2. SuperApp Compact Navbar Header */}
      <NavbarHeader
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(prev => !prev)}
        favoritesCount={favoritesCount}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQrModal={() => setShowQrModal(true)}
        onShareApp={handleShareApp}
        copiedLink={copiedLink}
      />

      {/* 3. Main Container */}
      <main className="max-w-6xl mx-auto px-3 sm:px-6 pt-2.5 sm:pt-4 pb-28 space-y-5 sm:space-y-6">

        {/* Tab-driven Content Switcher */}
        {activeTab === 'inicio' && (
          <div className="space-y-6">
            
            {/* 3D Interactive Hero with Parallax */}
            <Hero3DParallax
              onOpenCatalog={() => setActiveTab('catalogo')}
              onOpenQuoteModal={() => handleOpenQuoteModal(null)}
            />

            {/* High-speed swipe Horizontal Carousels */}
            <QuickCarousels
              onSelectProduct={(product) => setSelectedProductForModal(product)}
              onAddToCart={addToCart}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onOpenCatalog={() => setActiveTab('catalogo')}
            />

            {/* Quick WhatsApp Banner CTA */}
            <div className="rounded-[28px] bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-5 sm:p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
              <div className="space-y-1 text-center sm:text-left z-10">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full font-gift">
                  Atención Rápida por Mayor
                </span>
                <h3 className="text-lg sm:text-xl font-black font-display tracking-tight">
                  ¿Necesitas cotizar cientos o fletes a provincia? 📲
                </h3>
                <p className="text-xs text-emerald-100 max-w-md">
                  Recibe atención directa de nuestros asesores en Jr. Andahuaylas 1124. Te enviamos catálogo y fotos reales.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => handleOpenQuoteModal(null)}
                className="bg-white text-emerald-900 font-extrabold px-5 py-3 rounded-2xl text-xs sm:text-sm uppercase tracking-wide font-gift flex items-center space-x-2 shadow-md cursor-pointer shrink-0 z-10"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                <span>Cotizar con Asesor 💬</span>
              </motion.button>

              {/* Decorative circle glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
            </div>

            {/* Services & Special Solutions Section */}
            <ServicesSection onOpenServiceQuote={handleOpenQuoteModal} />

            {/* Seasonal Slideshow Collection */}
            <div className="pt-2">
              <HeroSlider onSelectCatalog={() => setActiveTab('catalogo')} />
            </div>

            {/* Complete Catalog Preview Grid */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between px-1">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-gift">
                    Explorar Todo el Stock
                  </span>
                  <h3 className="text-lg sm:text-xl font-black font-display text-zinc-900 dark:text-white">
                    Catálogo Mayorista Completo 🛍️
                  </h3>
                </div>
              </div>
              <WidgetCatalog />
            </div>

          </div>
        )}

        {/* Tab: Catálogo / Tienda */}
        {activeTab === 'catalogo' && (
          <div className="space-y-6 pt-2">
            <WidgetCatalog />
          </div>
        )}

        {/* Tab: Servicios */}
        {activeTab === 'servicios' && (
          <div className="space-y-6 pt-2">
            <ServicesSection onOpenServiceQuote={handleOpenQuoteModal} />
            <WidgetAbout />
          </div>
        )}

        {/* Tab: Redes & Enlaces */}
        {activeTab === 'enlaces' && (
          <div className="space-y-6 pt-2">
            <WidgetLinks />
          </div>
        )}

        {/* Tab: Tienda Física / Envíos */}
        {activeTab === 'nosotros' && (
          <div className="space-y-6 pt-2">
            <WidgetAbout />
          </div>
        )}

      </main>

      {/* 4. Floating Bottom Navigation Bar */}
      <FloatingBottomNav
        activeTab={activeTab as any}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQuoteModal={() => handleOpenQuoteModal(null)}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 5. Cart Drawer Modal */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenCatalog={() => {
          setIsCartOpen(false);
          setActiveTab('catalogo');
        }}
      />

      {/* 6. Fast WhatsApp Quote / Booking Modal */}
      <FastQuoteModal
        isOpen={isFastQuoteOpen}
        onClose={() => setIsFastQuoteOpen(false)}
        initialService={selectedServiceForQuote}
      />

      {/* 7. Wishlist / Favorites Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onSelectProduct={(p) => setSelectedProductForModal(p)}
        onAddToCart={addToCart}
      />

      {/* 8. Universal Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={addToCart}
        isFavorite={selectedProductForModal ? !!favorites[selectedProductForModal.id] : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* 9. Interactive QR Code Modal */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQrModal(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-6 max-w-sm w-full border border-zinc-100 dark:border-zinc-800 shadow-2xl relative z-10 text-center space-y-4"
            >
              <h4 className="text-base font-bold font-display text-zinc-900 dark:text-white">
                Escanear SuperApp Móvil
              </h4>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs text-center">
                Muestra este código QR en el mostrador para que tus clientes accedan al catálogo y coticen por WhatsApp.
              </p>

              {/* High-fidelity CSS Mock QR block */}
              <div className="bg-zinc-50 dark:bg-zinc-800 p-4.5 rounded-2xl border border-zinc-100 dark:border-zinc-700 flex flex-col items-center justify-center">
                <div className="w-44 h-44 bg-white p-2.5 rounded-xl shadow-xs border border-zinc-100 relative flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-900 fill-current">
                    <path d="M 0 0 h 30 v 30 h -30 z M 5 5 v 20 h 20 v -20 z M 10 10 h 10 v 10 h -10 z" />
                    <path d="M 70 0 h 30 v 30 h -30 z M 75 5 v 20 h 20 v -20 z M 80 10 h 10 v 10 h -10 z" />
                    <path d="M 0 70 h 30 v 30 h -30 z M 5 75 v 20 h 20 v -20 z M 10 80 h 10 v 10 h -10 z" />
                    <path d="M 15 35 h 5 v 5 h -5 z M 5 40 h 5 v 5 h -5 z M 25 40 h 5 v 5 h -5 z M 35 15 h 5 v 5 h -5 z M 40 5 h 5 v 10 h -5 z M 55 10 h 5 v 5 h -5 z M 50 25 h 5 v 5 h -5 z M 35 35 h 15 v 5 h -15 z M 45 45 h 10 v 10 h -10 z" />
                    <path d="M 15 50 h 10 v 5 h -10 z M 5 60 h 20 v 5 h -20 z M 40 60 h 10 v 10 h -10 z M 60 40 h 10 v 20 h -10 z M 75 45 h 15 v 5 h -15 z M 85 35 h 10 v 5 h -10 z M 80 60 h 15 v 15 h -15 z M 55 70 h 15 v 5 h -15 z M 65 75 h 30 v 5 h -30 z M 35 85 h 50 v 5 h -50 z M 45 90 h 25 v 5 h -25 z" />
                    <circle cx="50" cy="50" r="14" fill="#ffffff" />
                    <path d="M 45 45 h 10 v 10 h -10 z" fill="#f43f5e" />
                  </svg>
                  <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs border border-zinc-100">
                    <span className="text-[8px] font-black text-rose-500 font-display">BOHO</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 mt-2.5">
                  https://bohoimport.pe
                </div>
              </div>

              <div className="flex space-x-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleShareApp}
                  className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedLink ? '¡Enlace Copiado!' : 'Copiar Enlace'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowQrModal(false)}
                  className="px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 10. Footer */}
      <footer className="text-center mt-14 py-8 border-t border-zinc-200/60 dark:border-zinc-800/80 px-4 max-w-lg mx-auto text-xs text-zinc-400 dark:text-zinc-500 space-y-1">
        <div className="flex items-center justify-center space-x-2 font-display">
          <span className="font-extrabold tracking-widest text-zinc-600 dark:text-zinc-400 font-gift">BOHO IMPORT</span>
          <span>•</span>
          <span className="font-mono text-[10px]">LIMA, PERÚ</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          Jr. Andahuaylas 1124, Cercado de Lima (Frente a Mesa Redonda).
          <br />
          © {new Date().getFullYear()} Boho Import E.I.R.L.
        </p>
      </footer>

    </div>
  );
}
