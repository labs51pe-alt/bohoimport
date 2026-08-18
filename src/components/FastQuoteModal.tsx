import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  MessageCircle, 
  Send, 
  Sparkles, 
  Check, 
  Calendar, 
  MapPin, 
  User, 
  Package, 
  FileText,
  Building,
  Truck
} from 'lucide-react';
import { ServiceItem } from '../types';

interface FastQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceItem | null;
}

export const FastQuoteModal: React.FC<FastQuoteModalProps> = ({
  isOpen,
  onClose,
  initialService
}) => {
  const [quoteType, setQuoteType] = useState<string>('mayorista');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [cityDestination, setCityDestination] = useState<string>('');
  const [estimatedQty, setEstimatedQty] = useState<string>('Desde 1 Docena');
  const [deliveryUrgency, setDeliveryUrgency] = useState<string>('Inmediato (24-48h)');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (initialService) {
      setQuoteType(initialService.id);
      setNotes(`Interesado en el servicio: ${initialService.title}`);
    } else {
      setQuoteType('mayorista');
    }
  }, [initialService, isOpen]);

  if (!isOpen) return null;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    let serviceTitle = 'Cotización Mayorista General';
    if (quoteType === 'mayorista') serviceTitle = '📦 Pedido al por Mayor (Docenas / Cientos)';
    else if (quoteType === 'pack-emprendedor-regalos') serviceTitle = '🚀 Pack Emprendedor Mayorista';
    else if (quoteType === 'armado-cajas-personalizadas') serviceTitle = '🎀 Armado de Cajas & Desayunos Sorpresa';
    else if (quoteType === 'despacho-campana-provincias') serviceTitle = '🚚 Consolidado de Campaña a Provincias';
    else if (quoteType === 'personalizado') serviceTitle = '✨ Asesoría / Productos Personalizados';

    const messageLines = [
      `¡Hola *Boho Import*! 🛍️✨`,
      `Quisiera realizar una cotización / pedido rápido desde su App Móvil:`,
      ``,
      `📌 *Tipo de Solicitud:* ${serviceTitle}`,
      `👤 *Nombre / Negocio:* ${clientName.trim() || 'Cliente Boho'}`,
      clientPhone ? `📱 *Teléfono:* ${clientPhone.trim()}` : '',
      `📍 *Destino / Ciudad:* ${cityDestination.trim() || 'Lima / Provincia'}`,
      `📦 *Cantidad Estimada:* ${estimatedQty}`,
      `⚡ *Fecha / Urgencia:* ${deliveryUrgency}`,
      notes.trim() ? `📝 *Detalles / Notas:* ${notes.trim()}` : '',
      ``,
      `¿Podrían confirmarme disponibilidad de stock y cotización con el mejor precio mayorista? ¡Muchas gracias! 🙏`
    ].filter(line => line !== '').join('\n');

    const encoded = encodeURIComponent(messageLines);
    window.open(`https://wa.me/51967651924?text=${encoded}`, '_blank');
    onClose();
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
        className="bg-white dark:bg-zinc-900 rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 max-w-lg w-full border border-rose-100 dark:border-zinc-800 shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <MessageCircle className="w-5 h-5 fill-emerald-600 dark:fill-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-gift block">
                Atención Inmediata
              </span>
              <h3 className="text-base sm:text-lg font-black font-display text-zinc-900 dark:text-white leading-tight">
                Cotización Rápida por WhatsApp 📲
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

        {/* Form Body */}
        <form onSubmit={handleSendWhatsApp} className="mt-4 space-y-3.5 text-left">
          
          {/* Service / Quote Type Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 font-gift flex items-center space-x-1">
              <span>¿Qué deseas cotizar o solicitar?</span>
            </label>
            <select
              value={quoteType}
              onChange={(e) => setQuoteType(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
            >
              <option value="mayorista">📦 Pedido por Mayor (Bolsas & Cajas x Docena/Ciento)</option>
              <option value="pack-emprendedor-regalos">🚀 Pack Emprendedor Mayorista (Kit Surtido)</option>
              <option value="armado-cajas-personalizadas">🎀 Armado de Cajas & Desayunos Sorpresa</option>
              <option value="despacho-campana-provincias">🚚 Consolidado de Campaña a Provincias</option>
              <option value="personalizado">✨ Asesoría Personalizada de Campaña</option>
            </select>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 font-gift flex items-center space-x-1">
                <User className="w-3 h-3 text-rose-500" />
                <span>Tu Nombre / Negocio</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: María Rojas / Florería Rosas"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 font-gift flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-emerald-500" />
                <span>Ciudad / Destino</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Arequipa / Trujillo / Lima Centro"
                value={cityDestination}
                onChange={(e) => setCityDestination(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Estimated Quantity & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 font-gift flex items-center space-x-1">
                <Package className="w-3 h-3 text-amber-500" />
                <span>Volumen Estimado</span>
              </label>
              <select
                value={estimatedQty}
                onChange={(e) => setEstimatedQty(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
              >
                <option value="1 a 3 Docenas">1 a 3 Docenas</option>
                <option value="4 a 10 Docenas">4 a 10 Docenas</option>
                <option value="1 a 5 Cientos (Mayor)">1 a 5 Cientos (Mayor)</option>
                <option value="+1000 Unidades (Gran Volumen)">+1000 Unidades (Gran Volumen)</option>
                <option value="Muestras / Pruebas">Muestras / Pruebas</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 font-gift flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-sky-500" />
                <span>Fecha / Urgencia</span>
              </label>
              <select
                value={deliveryUrgency}
                onChange={(e) => setDeliveryUrgency(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
              >
                <option value="Inmediato (24-48h)">⚡ Inmediato (24-48 horas)</option>
                <option value="Para esta semana">📅 Para esta semana</option>
                <option value="Para la próxima campaña">🎉 Para la próxima campaña</option>
                <option value="Solo consulta de precios">🔍 Solo consulta de precios</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 font-gift flex items-center space-x-1">
              <FileText className="w-3 h-3 text-purple-500" />
              <span>Modelos o notas de interés (Opcional)</span>
            </label>
            <textarea
              rows={2}
              placeholder="Ej: Quisiera saber precio por mayor de bolsas holográficas y cajas para el Día del Padre..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-zinc-800 dark:text-zinc-200 font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none resize-none"
            />
          </div>

          {/* Quick Notice */}
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/60 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Al presionar el botón se abrirá WhatsApp con todos tus datos listos. Nuestro equipo en Mesa Redonda te responderá de inmediato.
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-5 rounded-2xl text-xs sm:text-sm uppercase tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20 font-gift cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Enviar Cotización a WhatsApp 📲</span>
            </motion.button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};
