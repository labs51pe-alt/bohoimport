import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  Gift, 
  Truck, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  X,
  Send
} from 'lucide-react';
import { ServiceItem } from '../types';
import { SERVICES } from '../data';

interface ServicesSectionProps {
  onOpenServiceQuote: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenServiceQuote }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Package':
        return <Package className="w-6 h-6 text-rose-600 dark:text-rose-400" />;
      case 'Gift':
        return <Gift className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-sky-600 dark:text-sky-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-rose-600 dark:text-rose-400" />;
    }
  };

  return (
    <section id="services-section" className="space-y-4 py-3">
      
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="space-y-0.5">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 font-gift uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Servicios & Soluciones Especiales</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black font-display text-zinc-900 dark:text-white tracking-tight">
            Para Tiendas, Emprendedores & Eventos 🚀
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            Personalización, kits mayoristas y logística prioritaria para campañas
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {SERVICES.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ y: -4 }}
            className={`rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-gradient-to-br ${service.gradient} bg-white dark:bg-zinc-900 p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden gift-shimmer`}
          >
            {/* Top Tag & Icon */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-white dark:bg-zinc-800 shadow-2xs border border-zinc-100 dark:border-zinc-700">
                  {getServiceIcon(service.iconName)}
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-gift tracking-wide">
                  {service.tag}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="space-y-1">
                <h3 className="font-extrabold text-zinc-900 dark:text-white text-base font-display">
                  {service.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bullet Features */}
              <div className="space-y-1.5 pt-1">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-1.5 text-[11px] text-zinc-600 dark:text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Action Button */}
            <div className="mt-5 pt-3.5 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between gap-2">
              <div>
                <div className="flex items-center space-x-1 text-[10px] text-zinc-500 dark:text-zinc-400 font-gift">
                  <Clock className="w-3 h-3 text-zinc-400" />
                  <span>{service.estimatedTime}</span>
                </div>
                <div className="text-xs sm:text-sm font-black text-zinc-900 dark:text-white font-display">
                  {service.startingPrice > 0 ? `Desde S/. ${service.startingPrice.toFixed(2)}` : 'Servicio Gratuito'}
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="px-2.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold font-gift cursor-pointer transition-colors"
                >
                  Detalles
                </button>
                <button
                  type="button"
                  onClick={() => onOpenServiceQuote(service)}
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-extrabold font-gift flex items-center space-x-1 shadow-xs cursor-pointer transition-all"
                >
                  <MessageCircle className="w-3 h-3 fill-white" />
                  <span>Cotizar</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-6 max-w-md w-full border border-zinc-200 dark:border-zinc-800 shadow-2xl relative z-10 space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50">
                    {getServiceIcon(selectedService.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 font-gift uppercase">
                      {selectedService.category}
                    </span>
                    <h3 className="text-base font-black font-display text-zinc-900 dark:text-white">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {selectedService.description}
              </p>

              <div className="bg-rose-50/60 dark:bg-zinc-800/60 p-3 rounded-2xl border border-rose-100 dark:border-zinc-700 space-y-1.5">
                <span className="text-[10px] font-black uppercase text-zinc-700 dark:text-zinc-300 font-gift block">
                  ¿Qué incluye este servicio?
                </span>
                <div className="space-y-1">
                  {selectedService.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-800 dark:text-emerald-300 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{selectedService.benefits}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[10px] text-zinc-400 font-gift block leading-none">Inversión:</span>
                  <span className="text-base font-black text-zinc-900 dark:text-white font-display">
                    {selectedService.startingPrice > 0 ? `S/. ${selectedService.startingPrice.toFixed(2)}` : 'Gratuito con tu compra'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const svc = selectedService;
                    setSelectedService(null);
                    onOpenServiceQuote(svc);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 px-5 rounded-xl text-xs flex items-center space-x-1.5 font-gift cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Cotizar por WhatsApp</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
