import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Instagram, Copy, Check, ExternalLink, Facebook, Sparkles } from 'lucide-react';

interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: React.ReactNode;
  bgGradient: string;
  borderColor: string;
  badge?: string;
  textColor: string;
  lightBg: string;
  accentColor: string;
}

export default function WidgetLinks() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const links: LinkItem[] = [
    {
      id: 'whatsapp',
      title: 'Catálogo de WhatsApp',
      subtitle: 'Comunícate directo & explora precios mayoristas al instante',
      url: 'https://www.whatsapp.com/catalog/51967651924/?app_absent=0',
      icon: <MessageCircle className="w-5.5 h-5.5 fill-white" />,
      bgGradient: 'from-[#25D366] to-[#128C7E]',
      borderColor: 'group-hover:border-emerald-300',
      lightBg: 'bg-emerald-50 text-emerald-600',
      textColor: 'text-emerald-950',
      badge: 'Atención Mayorista 👑',
      accentColor: '#25D366'
    },
    {
      id: 'instagram',
      title: 'Instagram Oficial',
      subtitle: '@bohoimport • Ideas de empaque, novedades y unboxing diario',
      url: 'https://www.instagram.com/bohoimport/',
      icon: <Instagram className="w-5.5 h-5.5 text-white" />,
      bgGradient: 'from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]',
      borderColor: 'group-hover:border-pink-300',
      lightBg: 'bg-pink-50 text-pink-600',
      textColor: 'text-pink-950',
      badge: 'Inspiración ✨',
      accentColor: '#E1306C'
    },
    {
      id: 'tiktok',
      title: 'TikTok Oficial',
      subtitle: 'Tips de envoltura, vídeos de decoración y sorpresas',
      url: 'https://www.tiktok.com/@bohoimport',
      icon: (
        <span className="font-black font-display text-base tracking-tighter text-white flex items-center justify-center">
          Tik<span className="text-[#00f2fe]">Tok</span>
        </span>
      ),
      bgGradient: 'from-[#010101] via-[#121212] to-[#010101]',
      borderColor: 'group-hover:border-cyan-300',
      lightBg: 'bg-zinc-100 text-zinc-900',
      textColor: 'text-zinc-900',
      badge: 'Tendencias 🔥',
      accentColor: '#000000'
    },
    {
      id: 'facebook',
      title: 'Facebook Fanpage',
      subtitle: 'Contacto nacional, álbumes de stock y promociones exclusivas',
      url: 'https://www.facebook.com/bohoimport',
      icon: <Facebook className="w-5.5 h-5.5 fill-white" />,
      bgGradient: 'from-[#1877F2] to-[#0d56b3]',
      borderColor: 'group-hover:border-blue-300',
      lightBg: 'bg-blue-50 text-blue-600',
      textColor: 'text-blue-950',
      accentColor: '#1877F2'
    }
  ];

  const handleCopy = (e: React.MouseEvent, id: string, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="social-links-container" className="space-y-4">
      {/* Visual Ticker with nice indicator */}
      <div className="flex items-center justify-between px-2 mb-3">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest font-mono">
            Enlaces de contacto directo
          </h3>
        </div>
        <span className="text-[10px] text-zinc-400 font-mono">Boho Import E.I.R.L.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {links.map((link, idx) => {
          return (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06, type: 'spring', stiffness: 120 }}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="relative group bg-white rounded-2xl p-4 border border-zinc-100/80 shadow-xs hover:shadow-md hover:border-zinc-200/60 transition-all duration-300 flex items-center justify-between cursor-pointer select-none"
              onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
            >
              {/* Colored left bar accent */}
              <div className={`absolute left-0 top-3 bottom-3 w-1.5 rounded-r-md bg-gradient-to-b ${link.bgGradient}`} />

              <div className="flex items-center space-x-4 pl-3.5 flex-1 min-w-0">
                {/* Modern Brand Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs transition-all duration-300 bg-gradient-to-tr ${link.bgGradient} group-hover:scale-105 group-hover:rotate-1`}>
                  {link.icon}
                </div>

                {/* Text Content */}
                <div className="text-left flex-1 min-w-0 pr-2">
                  <div className="flex items-center space-x-2 gap-y-1 flex-wrap">
                    <h4 className="font-extrabold text-zinc-800 font-display text-base tracking-tight leading-tight group-hover:text-rose-600 transition-colors">
                      {link.title}
                    </h4>
                    {link.badge && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100/60 flex items-center space-x-0.5">
                        <Sparkles className="w-2 h-2 text-rose-500 animate-pulse" />
                        <span>{link.badge}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-500 text-xs mt-1 leading-normal font-sans line-clamp-1">
                    {link.subtitle}
                  </p>
                </div>
              </div>

              {/* Action Buttons with high-contrast accessibility targets */}
              <div className="flex items-center space-x-2 shrink-0">
                {/* Copy Button */}
                <button
                  type="button"
                  onClick={(e) => handleCopy(e, link.id, link.url)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
                    copiedId === link.id
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-650 border-transparent'
                  }`}
                  title="Copiar enlace"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copiedId === link.id ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Check className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Copy className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                {/* Direct visit target identifier */}
                <div className="w-10 h-10 rounded-xl bg-zinc-50 group-hover:bg-rose-50 text-zinc-400 group-hover:text-rose-600 flex items-center justify-center transition-colors border border-transparent">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
