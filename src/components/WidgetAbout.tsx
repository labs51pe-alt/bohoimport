import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Truck, ShieldCheck, Map, PhoneCall, Copy, Check } from 'lucide-react';

export default function WidgetAbout() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  // Check if store is open based on local Peruvian business hours (9:30 AM to 7:30 PM, Monday - Saturday)
  useEffect(() => {
    const checkOpenState = () => {
      // Get UTC time & adjust to Peru Time (UTC-5)
      const nowUtc = new Date();
      const peruTime = new Date(nowUtc.getTime() - (5 * 60 * 60 * 1000));
      
      const day = peruTime.getUTCDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
      const hour = peruTime.getUTCHours();
      const minutes = peruTime.getUTCMinutes();
      const decimalTime = hour + minutes / 60;

      if (day === 0) {
        // Sunday typically closed or half-day (e.g. closed)
        setIsOpen(false);
      } else {
        // Mon-Sat: 9.5 to 19.5
        setIsOpen(decimalTime >= 9.5 && decimalTime <= 19.5);
      }
    };

    checkOpenState();
    const interval = setInterval(checkOpenState, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('Jr. Andahuaylas 1124, Cercado de Lima, Perú');
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Jr.+Andahuaylas+1124,+Cercado+de+Lima,+Peru';

  return (
    <div id="about-info-about" className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 space-y-6">
      
      {/* Title */}
      <div>
        <span className="text-[10px] uppercase font-bold tracking-widest text-rose-500 font-mono">Ubicación & Envíos</span>
        <h3 className="text-xl font-bold font-display text-zinc-900 tracking-tight mt-0.5">Visítanos en Tienda</h3>
        <p className="text-xs text-zinc-500 mt-1">¿Estás en Lima? Ven a elegir tus bolsas personalmente o solicita cotizaciones mayoristas en nuestro local oficial.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Info Items List */}
        <div className="space-y-4">
          
          {/* Item 1: Address Card with Open Map */}
          <div className="flex space-x-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-800 text-sm font-display">Ubicación Física</h4>
              <p className="text-zinc-550 text-xs mt-0.5 leading-normal">
                Jr. Andahuaylas 1124 (Frente a Mesa Redonda)
                <span className="block text-zinc-400">Cercado de Lima, Perú 🇵🇪</span>
              </p>
              <div className="flex items-center space-x-2.5 mt-2">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-[11px] font-bold text-rose-600 hover:text-rose-700 hover:underline"
                >
                  <Map className="w-3 h-3" />
                  <span>Ver en Google Maps</span>
                </a>
                <span className="text-zinc-300">•</span>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center space-x-1 text-[11px] font-semibold text-zinc-400 hover:text-zinc-650"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-600">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Item 2: Working Hours with state indicator */}
          <div className="flex space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-600 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-zinc-800 text-sm font-display">Horario de Atención</h4>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-block ${
                  isOpen 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                    : 'bg-zinc-100 text-zinc-500 border border-zinc-200'
                }`}>
                  {isOpen ? '● Abierto ahora' : 'Cerrado ahora'}
                </span>
              </div>
              <p className="text-zinc-550 text-xs mt-1 leading-normal">
                Lunes a Sábado: 9:30 AM — 7:30 PM
                <span className="block text-zinc-400 font-mono text-[10px] mt-0.5">Feriados nacionales consultar por social chat.</span>
              </p>
            </div>
          </div>

          {/* Item 3: Nationwide Shipping Info */}
          <div className="flex space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-800 text-sm font-display">Envíos a Nivel Nacional</h4>
              <p className="text-zinc-550 text-xs mt-0.5 leading-normal">
                Realizamos despachos diarios a todo el Perú:
                <span className="block text-zinc-500 font-medium">✨ Agencias: Marvisur, Shalom, Flores, Emtrafesa y más.</span>
                <span className="block text-zinc-400">Lima Metropolitana: Entregas mediante motorizado a domicilio en 24h.</span>
              </p>
            </div>
          </div>

        </div>

        {/* Right Side: Trust signals & Contact Quick Action cards */}
        <div className="bg-zinc-50 rounded-2xl border border-zinc-100 p-4.5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-zinc-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider font-display text-zinc-700">Garantía Boho Import</span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Trabajamos con cartulinas y papeles reciclados de alto gramaje para garantizar la máxima resistencia y presentación en tus regalos. Factura y boleta electrónica disponibles para todas tus compras mayoristas.
            </p>
          </div>

          {/* Direct phone call trigger button */}
          <div className="pt-2">
            <a
              href="https://wa.me/51967651924"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white hover:bg-zinc-100 text-zinc-800 font-bold border border-zinc-200 py-3 rounded-xl flex items-center justify-center space-x-2 text-xs transition-colors shadow-2xs"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>Preguntas Rápidas: +51 967 651 924</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
