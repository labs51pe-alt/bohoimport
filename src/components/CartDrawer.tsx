import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Send, 
  Truck, 
  Store, 
  CreditCard, 
  Check, 
  Copy, 
  Sparkles, 
  Building, 
  Phone,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenCatalog: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCatalog
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState<'provincia' | 'lima_express' | 'tienda'>('provincia');
  const [paymentMethod, setPaymentMethod] = useState<'yape_plin' | 'bcp_transfer' | 'efectivo_tienda'>('yape_plin');
  const [clientName, setClientName] = useState<string>('');
  const [clientCity, setClientCity] = useState<string>('');
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  
  // Delivery cost calculation
  const deliveryCost = deliveryMethod === 'lima_express' ? 12.00 : 0.00;
  const grandTotal = subtotal + deliveryCost;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotice(label);
    setTimeout(() => setCopiedNotice(null), 2500);
  };

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    let deliveryText = '🚚 Envío a Provincia (Agencia Shalom / Olva - Pago en destino)';
    if (deliveryMethod === 'lima_express') deliveryText = '🛵 Delivery Motorizado Express Lima (+ S/. 12.00)';
    if (deliveryMethod === 'tienda') deliveryText = '🏪 Recojo en Tienda Física (Jr. Andahuaylas 1124, Lima)';

    let paymentText = '🟣 Yape / Plin (967 651 924)';
    if (paymentMethod === 'bcp_transfer') paymentText = '🔵 Transferencia BCP (191-30948102-0-45)';
    if (paymentMethod === 'efectivo_tienda') paymentText = '💵 Efectivo al Recoger en Tienda';

    const itemsSummary = cart.map((item, index) => {
      return `${index + 1}. *${item.product.name}*\n   • Medida: ${item.size}\n   • Variante/Diseño: ${item.variant}\n   • Cantidad: ${item.quantity} unds. (S/. ${item.unitPrice.toFixed(2)} c/u)\n   • Subtotal: *S/. ${item.total.toFixed(2)}*`;
    }).join('\n\n');

    const messageLines = [
      `¡Hola *Boho Import*! 🛍️✨ Quisiera confirmar mi pedido desde la App Móvil:`,
      ``,
      `👤 *Cliente:* ${clientName.trim() || 'Cliente Boho'}`,
      `📍 *Ciudad / Destino:* ${clientCity.trim() || 'Lima / Provincia'}`,
      `📦 *Método de Entrega:* ${deliveryText}`,
      `💳 *Forma de Pago:* ${paymentText}`,
      ``,
      `📋 *RESUMEN DE PRODUCTOS:*`,
      itemsSummary,
      ``,
      `💰 *Subtotal Productos:* S/. ${subtotal.toFixed(2)}`,
      deliveryCost > 0 ? `🛵 *Costo de Delivery:* S/. ${deliveryCost.toFixed(2)}` : `🚚 *Costo de Flete:* Pago en destino / Gratis en tienda`,
      `⭐️ *TOTAL A PAGAR:* *S/. ${grandTotal.toFixed(2)}*`,
      ``,
      `¿Podrían confirmarme el stock para realizar el abono y coordinar el despacho? ¡Muchas gracias! 🙏`
    ].join('\n');

    const encoded = encodeURIComponent(messageLines);
    window.open(`https://wa.me/51967651924?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
      />

      {/* Slide-out Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md bg-white dark:bg-zinc-900 h-full shadow-2xl flex flex-col justify-between border-l border-zinc-200 dark:border-zinc-800"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black font-display text-zinc-900 dark:text-white leading-none">
                Mi Canasta Mayorista 🛒
              </h3>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-gift">
                {totalItemsCount} {totalItemsCount === 1 ? 'unidad' : 'unidades'} seleccionadas
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {cart.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="p-2 text-zinc-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 dark:hover:bg-zinc-800 text-xs font-bold font-gift cursor-pointer transition-colors"
                title="Vaciar canasta"
              >
                Vaciar
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          
          {/* Cart items list */}
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 bg-rose-50 dark:bg-rose-950/40 rounded-full flex items-center justify-center mx-auto text-2xl">
                🛍️
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-zinc-900 dark:text-white text-base font-display">
                  Tu canasta está vacía
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
                  Agrega bolsas, cajas o complementos por docena para aprovechar los mejores precios mayoristas de Mesa Redonda.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCatalog();
                }}
                className="mt-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-extrabold px-5 py-2.5 rounded-2xl text-xs uppercase font-gift tracking-wide cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-100"
              >
                Explorar Catálogo 🛍️
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/70 dark:border-zinc-700/60 flex items-start justify-between gap-2.5"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.product.imageGradient} flex items-center justify-center shrink-0 shadow-2xs text-lg`}>
                    🎁
                  </div>

                  <div className="flex-1 min-w-0 space-y-1 text-left">
                    <h4 className="font-bold text-xs text-zinc-900 dark:text-white font-display leading-snug">
                      {item.product.name}
                    </h4>
                    
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400 flex flex-wrap gap-x-2">
                      <span>📏 {item.size}</span>
                      <span>🎨 {item.variant}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-black text-rose-600 dark:text-rose-400 font-display">
                        S/. {item.total.toFixed(2)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-1.5 bg-white dark:bg-zinc-900 rounded-lg p-0.5 border border-zinc-200 dark:border-zinc-700 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-[11px] font-bold px-1.5 font-mono text-zinc-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-zinc-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                    title="Eliminar producto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Delivery & Payment Form if items exist */}
          {cart.length > 0 && (
            <div className="space-y-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-left">
              
              {/* Delivery Method Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-gift flex items-center space-x-1.5">
                  <Truck className="w-4 h-4 text-rose-500" />
                  <span>Método de Entrega / Despacho</span>
                </label>

                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('provincia')}
                    className={`p-2.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      deliveryMethod === 'provincia'
                        ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30'
                        : 'border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/40'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      <div>
                        <span className="text-xs font-bold text-zinc-900 dark:text-white block leading-tight">
                          Agencia a Provincias 🇵🇪
                        </span>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                          Shalom, Olva, Marvisur (Flete en destino)
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                      Gratis a Agencia
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('lima_express')}
                    className={`p-2.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      deliveryMethod === 'lima_express'
                        ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30'
                        : 'border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/40'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">🛵</span>
                      <div>
                        <span className="text-xs font-bold text-zinc-900 dark:text-white block leading-tight">
                          Delivery Express en Lima
                        </span>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                          Motorizado el mismo día
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-zinc-900 dark:text-white font-mono">
                      + S/. 12.00
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('tienda')}
                    className={`p-2.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      deliveryMethod === 'tienda'
                        ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30'
                        : 'border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/40'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Store className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <div>
                        <span className="text-xs font-bold text-zinc-900 dark:text-white block leading-tight">
                          Recojo en Tienda Mesa Redonda
                        </span>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                          Jr. Andahuaylas 1124, Cercado de Lima
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                      S/. 0.00
                    </span>
                  </button>
                </div>
              </div>

              {/* Payment Method Selector & Quick Copy Accounts */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-gift flex items-center space-x-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-500" />
                  <span>Método de Pago</span>
                </label>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('yape_plin')}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'yape_plin'
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold'
                        : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                    } text-xs`}
                  >
                    🟣 Yape / Plin
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bcp_transfer')}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'bcp_transfer'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold'
                        : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                    } text-xs`}
                  >
                    🔵 BCP
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('efectivo_tienda')}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'efectivo_tienda'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold'
                        : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                    } text-xs`}
                  >
                    💵 En Tienda
                  </button>
                </div>

                {/* Account details copy block */}
                {paymentMethod === 'yape_plin' && (
                  <div className="bg-purple-50/70 dark:bg-purple-950/30 p-2.5 rounded-2xl border border-purple-200 dark:border-purple-900/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-purple-800 dark:text-purple-300 font-bold block">
                        Yape / Plin: 967 651 924
                      </span>
                      <span className="text-[9px] text-zinc-500">Titular: Boho Import E.I.R.L</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('967651924', 'Yape')}
                      className="px-2.5 py-1 bg-purple-600 text-white rounded-lg text-[10px] font-bold flex items-center space-x-1 cursor-pointer"
                    >
                      {copiedNotice === 'Yape' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedNotice === 'Yape' ? '¡Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                )}

                {paymentMethod === 'bcp_transfer' && (
                  <div className="bg-blue-50/70 dark:bg-blue-950/30 p-2.5 rounded-2xl border border-blue-200 dark:border-blue-900/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-blue-800 dark:text-blue-300 font-bold block font-mono">
                        BCP: 191-30948102-0-45
                      </span>
                      <span className="text-[9px] text-zinc-500">CCI: 002-191-0030948102045-56</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('19130948102045', 'BCP')}
                      className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-bold flex items-center space-x-1 cursor-pointer"
                    >
                      {copiedNotice === 'BCP' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedNotice === 'BCP' ? '¡Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Client Info Inputs */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 font-gift">
                    Nombre del Cliente:
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Rosa Quispe"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 font-gift">
                    Ciudad / Distrito:
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Trujillo / SJL"
                    value={clientCity}
                    onChange={(e) => setClientCity(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none"
                  />
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Drawer Footer with Financial Summary & WhatsApp CTA */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-950/90 backdrop-blur-md space-y-3">
            
            {/* Financial summary */}
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                <span>Subtotal ({totalItemsCount} unds):</span>
                <span className="font-mono font-bold">S/. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                <span>Envío / Despacho:</span>
                <span className="font-mono font-bold">
                  {deliveryCost > 0 ? `+ S/. ${deliveryCost.toFixed(2)}` : 'S/. 0.00'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm sm:text-base font-black text-zinc-900 dark:text-white pt-1 border-t border-zinc-200 dark:border-zinc-800">
                <span className="font-display">Total a Pagar:</span>
                <span className="text-rose-600 dark:text-rose-400 font-mono">
                  S/. {grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Confirm via WhatsApp button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              type="button"
              onClick={handleCheckoutWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 px-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20 font-gift cursor-pointer"
            >
              <Send className="w-4 h-4 fill-white" />
              <span>Confirmar Pedido por WhatsApp 📲</span>
            </motion.button>

          </div>
        )}

      </motion.div>
    </div>
  );
};
