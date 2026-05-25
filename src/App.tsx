import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  MapPin, 
  Sparkles, 
  Share2, 
  Check, 
  Clock, 
  ExternalLink, 
  Instagram, 
  Facebook, 
  QrCode, 
  Copy,
  ShoppingBag,
  Info
} from 'lucide-react';
import Logo from './components/Logo';
import WidgetLinks from './components/WidgetLinks';
import WidgetCatalog from './components/WidgetCatalog';
import WidgetCalculator from './components/WidgetCalculator';
import WidgetAbout from './components/WidgetAbout';

type TabType = 'enlaces' | 'nosotros';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('enlaces');
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Business specs matching the user attachment
  const stats = [
    { label: 'Publicaciones', count: '16' },
    { label: 'Seguidores', count: '216' },
    { label: 'Seguidos', count: '53' }
  ];

  const handleShareApp = () => {
    const appUrl = window.location.href;
    navigator.clipboard.writeText(appUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div id="boho-app-root" className="min-h-screen bg-linear-to-b from-[#FDF8F5] via-[#FFFBF9] to-[#FAF5F2] font-sans antialiased text-zinc-800 pb-20 selection:bg-rose-100 selection:text-rose-900 relative">
      
      {/* 1. Header Ticker Banner */}
      <div id="top-announcement-ticker" className="bg-zinc-900 text-white py-2 px-4 shadow-sm text-center relative overflow-hidden select-none z-10">
        <motion.p 
          className="text-[11px] md:text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center space-x-2 text-rose-300"
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          <span>📦 Realizamos Envíos Rápidos a Todo el Perú</span>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <span className="hidden sm:inline">📍 Jr. Andahuaylas 1124 (Frente a Mesa Redonda)</span>
        </motion.p>
      </div>

      {/* 2. Soft Gradient Organic Header Background */}
      <div id="branding-cover-header" className="relative h-44 md:h-52 w-full bg-gradient-to-r from-rose-100 via-amber-50 to-rose-200 overflow-hidden shadow-xs">
        {/* Abstract decorative graphic circles */}
        <div className="absolute top-8 left-10 w-28 h-28 rounded-full bg-pink-100/50 blur-xl pointer-events-none" />
        <div className="absolute bottom-4 right-1/4 w-36 h-36 rounded-full bg-amber-100/40 blur-2xl pointer-events-none" />
        <div className="absolute top-2 right-12 w-16 h-16 rounded-full bg-white/20 border border-white/30 backdrop-blur-xs" />
        
        {/* Small sparkle icons */}
        <div className="absolute top-1/3 left-1/4 text-rose-300/60 font-serif text-3xl animate-pulse">★</div>
        <div className="absolute bottom-1/3 right-12 text-rose-300/40 font-serif text-4xl animate-bounce">★</div>
      </div>

      {/* 3. Primary Card Overlay & Profile */}
      <div className="max-w-2xl mx-auto px-4 -mt-20 relative z-10">
        
        {/* Profile Header Block */}
        <div className="text-center flex flex-col items-center">
          
          {/* Circular Boho Gift Box Logo */}
          <div className="relative">
            <Logo size="md" animated={true} />
            <span className="absolute bottom-1 right-2 bg-emerald-500 text-white p-1.5 rounded-full border-3 border-white shadow-xs" title="WhatsApp Atencion">
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
            </span>
          </div>

          {/* Slogan details and info */}
          <div className="mt-4 space-y-1">
            <div className="flex items-center justify-center space-x-1.5">
              <h1 className="text-2xl font-black tracking-tight font-display text-zinc-900">
                bohoimport
              </h1>
              <span className="text-xs bg-zinc-100 text-zinc-600 font-bold px-2 py-0.5 rounded-md border border-zinc-200">
                E.I.R.L
              </span>
            </div>
            
            <p className="text-xs font-bold text-rose-600 tracking-wide font-display">
              Boho | Bolsas de regalo 🎁
            </p>
          </div>

          {/* Meta Statistics, directly matching the screenshot! */}
          <div id="stats-indicators" className="flex items-center justify-center space-x-8 my-4.5 py-3 px-6 bg-white rounded-2xl border border-zinc-100/80 shadow-2xs divide-x divide-zinc-100 min-w-[280px]">
            {stats.map((stat, i) => (
              <div key={i} className={`flex-1 text-center ${i > 0 ? 'pl-8' : ''}`}>
                <span className="block font-black font-display text-zinc-900 text-base leading-none">
                  {stat.count}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider block mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Bio text (Matching screenshot) */}
          <div className="max-w-md bg-white/40 backdrop-blur-md rounded-2xl p-4 border border-zinc-100/60 shadow-3xs space-y-2 text-center text-xs text-zinc-600">
            <p className="font-semibold text-zinc-800">
              📌 Complementos de regalos y más 🤩🎁🛍️🎈
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-zinc-500 font-medium">
              <span className="flex items-center space-x-1">
                <span>📍 Jr. Andahuaylas 1124, Lima</span>
              </span>
              <span className="hidden xs:inline">•</span>
              <span className="flex items-center space-x-1 text-amber-700 font-semibold">
                <span>📦 Realizamos envíos a todo el Perú</span>
              </span>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center space-x-2.5 mt-5 w-full max-w-sm">
            <a
              href="https://wa.me/51967651924"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chatear por WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleShareApp}
              className={`px-4.5 py-3 rounded-xl border text-xs font-bold uppercase transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                copiedLink 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-600' 
                  : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-600'
              }`}
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Copiado!' : 'Compartir'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="p-3 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-500 hover:text-zinc-800 rounded-xl transition-all shadow-3xs cursor-pointer"
              title="Mostrar Código QR"
            >
              <QrCode className="w-4.5 h-4.5" />
            </button>
          </div>

        </div>

        {/* 4. Beautiful Horizontal Navigation Tabs */}
        <div id="tabs-navigation-panel" className="mt-8 mb-6 sticky top-2 z-30 bg-white/80 backdrop-blur-md p-1 rounded-2xl border border-zinc-200/60 shadow-sm flex space-x-1">
          {[
            { id: 'enlaces', label: 'Redes 🔗', colorClass: 'hover:text-rose-600' },
            { id: 'nosotros', label: 'Ubicación 📍', colorClass: 'hover:text-rose-600' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex-1 py-3 px-2 rounded-xl text-xs md:text-sm font-bold font-display tracking-tight text-center transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-zinc-900 text-white shadow-xs scale-102 font-extrabold'
                  : `text-zinc-500 hover:bg-zinc-100 ${tab.colorClass}`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 5. Dynamic Tab View Content */}
        <div id="active-tab-content-render" className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
            >
              {activeTab === 'enlaces' && <WidgetLinks />}
              {activeTab === 'nosotros' && <WidgetAbout />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* 6. Dynamic Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/51967651924"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center animate-bounce cursor-pointer group"
        title="ConsultasDirectas"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 font-bold text-xs uppercase tracking-wider transition-all duration-300">
          Atención Mayorista
        </span>
      </a>

      {/* 7. Beautiful Brand Slogan Footer */}
      <footer className="text-center mt-16 py-8 border-t border-zinc-100/80 px-4 max-w-lg mx-auto">
        <div className="flex items-center justify-center space-x-2 text-zinc-400 font-display">
          <span className="font-semibold text-xs tracking-widest text-zinc-500">BOHO</span>
          <span className="text-zinc-300">•</span>
          <span className="text-[10px] font-mono">¡CALIDAD PARA REGALAR!</span>
        </div>
        <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
          Ubicación Principal: Jr. Andahuaylas 1124, Cercado de Lima, Perú.
          <br />
          © 2026 Boho Import E.I.R.L. Todos los derechos reservados.
        </p>
      </footer>

      {/* Interactive QR code overlay modal */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQrModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full border border-zinc-100 shadow-2xl relative z-10 text-center space-y-4"
            >
              <h4 className="text-base font-bold font-display text-zinc-900">Escanear Directorio Móvil</h4>
              <p className="text-zinc-500 text-xs text-center">
                Muestra este código QR a tus clientes para que accedan al catálogo y simulen sus cotizaciones de inmediato.
              </p>

              {/* High-fidelity CSS Mock QR block */}
              <div className="bg-zinc-50 p-4.5 rounded-2xl border border-zinc-100 flex flex-col items-center justify-center">
                <div className="w-44 h-44 bg-white p-2.5 rounded-xl shadow-xs border border-zinc-100 relative flex items-center justify-center">
                  {/* Decorative QR code matrix paths */}
                  <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-900 fill-current">
                    {/* Corner anchors */}
                    <path d="M 0 0 h 30 v 30 h -30 z M 5 5 v 20 h 20 v -20 z M 10 10 h 10 v 10 h -10 z" />
                    <path d="M 70 0 h 30 v 30 h -30 z M 75 5 v 20 h 20 v -20 z M 80 10 h 10 v 10 h -10 z" />
                    <path d="M 0 70 h 30 v 30 h -30 z M 5 75 v 20 h 20 v -20 z M 10 80 h 10 v 10 h -10 z" />
                    {/* Custom simulated matrix */}
                    <path d="M 15 35 h 5 v 5 h -5 z M 5 40 h 5 v 5 h -5 z M 25 40 h 5 v 5 h -5 z M 35 15 h 5 v 5 h -5 z M 40 5 h 5 v 10 h -5 z M 55 10 h 5 v 5 h -5 z M 50 25 h 5 v 5 h -5 z M 35 35 h 15 v 5 h -15 z M 45 45 h 10 v 10 h -10 z" />
                    <path d="M 15 50 h 10 v 5 h -10 z M 5 60 h 20 v 5 h -20 z M 40 60 h 10 v 10 h -10 z M 60 40 h 10 v 20 h -10 z M 75 45 h 15 v 5 h -15 z M 85 35 h 10 v 5 h -10 z M 80 60 h 15 v 15 h -15 z M 55 70 h 15 v 5 h -15 z M 65 75 h 30 v 5 h -30 z M 35 85 h 50 v 5 h -50 z M 45 90 h 25 v 5 h -25 z" />
                    {/* Center cute gift box avatar spacer overlay to match custom QR */}
                    <circle cx="50" cy="50" r="14" fill="#ffffff" />
                    <path d="M 45 45 h 10 v 10 h -10 z" fill="#f43f5e" />
                  </svg>
                  <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs border border-zinc-100">
                    <span className="text-[8px] font-black text-rose-500 font-display">BOHO</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-zinc-400 mt-2.5">https://bohoimport.pe/links</div>
              </div>

              <div className="flex space-x-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleShareApp}
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedLink ? '¡Enlace Copiado!' : 'Copiar Enlace'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowQrModal(false)}
                  className="px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-650 rounded-xl text-xs font-bold transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
