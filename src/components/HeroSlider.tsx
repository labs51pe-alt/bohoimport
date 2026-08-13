import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Package, 
  Truck, 
  Store, 
  Gift, 
  MessageCircle, 
  ShoppingBag,
  Percent,
  Star
} from 'lucide-react';

interface Slide {
  id: number;
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  gradient: string;
  borderColor: string;
  accentIcon: React.ReactNode;
  floatingEmojis: string[];
  ctaText: string;
  ctaIcon: React.ReactNode;
  secondaryText?: string;
  secondaryUrl?: string;
  actionType: 'catalog' | 'whatsapp' | 'location';
}

interface HeroSliderProps {
  onSelectCatalog?: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onSelectCatalog }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const slides: Slide[] = [
    {
      id: 0,
      tag: 'Novedades de Temporada ✨',
      tagColor: 'bg-rose-600 text-white',
      title: 'Bolsas & Cajas para Regalo 🛍️',
      subtitle: 'Bolsas holográficas, cajas armables, cintas y lazos al por mayor con diseños exclusivos.',
      gradient: 'from-rose-500/15 via-amber-500/10 to-rose-500/5',
      borderColor: 'border-rose-200/80',
      accentIcon: <Gift className="w-5 h-5 text-rose-600 animate-gift-bounce" />,
      floatingEmojis: ['🎁', '🛍️', '✨', '🎀'],
      ctaText: 'Ver Catálogo 🛒',
      ctaIcon: <ShoppingBag className="w-4 h-4" />,
      actionType: 'catalog'
    },
    {
      id: 1,
      tag: 'Empaques Exclusivos 👔🎉',
      tagColor: 'bg-amber-500 text-zinc-950 font-black',
      title: 'Colecciones Especiales & Festivas',
      subtitle: 'Diseños especiales para el Día del Padre, Cumpleaños, Baby Shower, Bodas y Aniversarios.',
      gradient: 'from-amber-500/15 via-rose-500/10 to-amber-500/5',
      borderColor: 'border-amber-200/80',
      accentIcon: <Sparkles className="w-5 h-5 text-amber-600 animate-sparkle" />,
      floatingEmojis: ['👔', '🎉', '👑', '🎂'],
      ctaText: 'Ver Colección 🛍️',
      ctaIcon: <Sparkles className="w-4 h-4" />,
      actionType: 'catalog'
    },
    {
      id: 2,
      tag: 'Mesa Redonda • Lima 🏪',
      tagColor: 'bg-emerald-600 text-white',
      title: 'Súper Precios por Mayor 👑',
      subtitle: 'Descuentos por Docena y Ciento directamente desde nuestra tienda física en Jr. Andahuaylas 1124.',
      gradient: 'from-emerald-500/15 via-amber-500/10 to-emerald-500/5',
      borderColor: 'border-emerald-200/80',
      accentIcon: <Store className="w-5 h-5 text-emerald-600" />,
      floatingEmojis: ['👑', '🏷️', '📦', '💯'],
      ctaText: 'Cotizar por WhatsApp 💬',
      ctaIcon: <MessageCircle className="w-4 h-4" />,
      actionType: 'whatsapp'
    },
    {
      id: 3,
      tag: 'Envíos Nacionales 🇵🇪',
      tagColor: 'bg-sky-600 text-white',
      title: 'Despacho Seguro a Provincias 🚚',
      subtitle: 'Enviamos tu pedido rápido a todo el Perú mediante Agencia Shalom, Olva Courier o Marvisur.',
      gradient: 'from-sky-500/15 via-rose-500/10 to-sky-500/5',
      borderColor: 'border-sky-200/80',
      accentIcon: <Truck className="w-5 h-5 text-sky-600" />,
      floatingEmojis: ['🚚', '📦', '✈️', '⚡'],
      ctaText: 'Pedir por WhatsApp ⚡',
      ctaIcon: <MessageCircle className="w-4 h-4" />,
      actionType: 'whatsapp'
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const activeSlide = slides[currentSlide];

  const handleAction = () => {
    if (activeSlide.actionType === 'catalog') {
      if (onSelectCatalog) {
        onSelectCatalog();
      } else {
        const catElement = document.getElementById('catalog-section');
        catElement?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (activeSlide.actionType === 'whatsapp') {
      const msg = encodeURIComponent(`¡Hola Boho Import! 🛍️✨ Vi su banner de "${activeSlide.title}" y quisiera recibir más información y precios por mayor. ¡Gracias!`);
      window.open(`https://wa.me/51967651924?text=${msg}`, '_blank');
    }
  };

  return (
    <div 
      className="mt-6 w-full max-w-lg lg:max-w-4xl mx-auto px-1 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className={`relative overflow-hidden rounded-3xl border ${activeSlide.borderColor} bg-gradient-to-br ${activeSlide.gradient} bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-500 gift-shimmer min-h-[200px] flex flex-col justify-between`}>
        
        {/* Animated background particles/emojis */}
        <div className="absolute top-2 right-4 flex space-x-2 text-xl opacity-20 pointer-events-none select-none">
          {activeSlide.floatingEmojis.map((emoji, idx) => (
            <motion.span
              key={idx}
              animate={{ y: [0, -6, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3 + idx, repeat: Infinity, ease: 'easeInOut' }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        {/* Slide Content with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-3 relative z-10"
          >
            {/* Tag / Badge */}
            <div className="flex items-center space-x-2">
              <span className={`text-[10px] md:text-[11px] font-extrabold px-3 py-1 rounded-full ${activeSlide.tagColor} font-gift uppercase tracking-wide shadow-2xs flex items-center space-x-1.5`}>
                <span>{activeSlide.tag}</span>
              </span>
              <div className="p-1 bg-white rounded-full shadow-2xs border border-zinc-100">
                {activeSlide.accentIcon}
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h3 className="text-lg md:text-2xl font-black text-zinc-900 font-display tracking-tight leading-tight">
                {activeSlide.title}
              </h3>
              <p className="text-xs md:text-sm text-zinc-600 font-medium leading-relaxed max-w-xl">
                {activeSlide.subtitle}
              </p>
            </div>

            {/* Action Row */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleAction}
                className="bg-zinc-950 hover:bg-zinc-800 text-white font-extrabold py-2.5 px-5 rounded-2xl text-xs md:text-sm uppercase tracking-wide transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg cursor-pointer hover:scale-102 active:scale-95 font-gift"
              >
                {activeSlide.ctaIcon}
                <span>{activeSlide.ctaText}</span>
              </button>

              {/* Slide Counter Indicator */}
              <div className="text-[10px] font-bold text-zinc-400 font-mono bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-zinc-200/60 shadow-2xs">
                <span>Diapositiva {currentSlide + 1} / {slides.length}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Controls */}
        <div className="mt-4 pt-3 border-t border-zinc-200/50 flex items-center justify-between relative z-10">
          {/* Pagination Dots */}
          <div className="flex items-center space-x-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  index === currentSlide 
                    ? 'w-7 bg-rose-600 shadow-2xs' 
                    : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                }`}
                title={`Ir a diapositiva ${index + 1}`}
              />
            ))}
          </div>

          {/* Left / Right Arrows */}
          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1.5 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900 transition-all shadow-2xs cursor-pointer active:scale-90"
              title="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-1.5 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900 transition-all shadow-2xs cursor-pointer active:scale-90"
              title="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
