import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ShoppingBag, RotateCcw, Percent, HelpCircle } from 'lucide-react';
import { BAG_TYPE_DATACARD, COMPLEMENTS, COLOR_THEMES } from '../data';
import { BagType, BagSize } from '../types';

export default function WidgetCalculator() {
  const [bagType, setBagType] = useState<BagType>('kraft');
  const [bagSize, setBagSize] = useState<BagSize>('M');
  const [selectedRibbonColor, setSelectedRibbonColor] = useState<string>('#dc2626'); // Red by default
  const [activeComplements, setActiveComplements] = useState<string[]>(['lazo_raso', 'papel_seda']); // default active
  const [quantity, setQuantity] = useState<number>(15); // Default to >=12 to show bulk savings!
  const [particleTrigger, setParticleTrigger] = useState<boolean>(false);

  // Toggle complement helper
  const handleToggleComplement = (complementId: string) => {
    setActiveComplements(prev => {
      const isSelected = prev.includes(complementId);
      if (isSelected) {
        return prev.filter(id => id !== complementId);
      } else {
        // Trigger sweet confetti particles effect for action feedback
        setParticleTrigger(true);
        setTimeout(() => setParticleTrigger(false), 800);
        return [...prev, complementId];
      }
    });
  };

  const activeTheme = useMemo(() => {
    return COLOR_THEMES.find(t => t.id === selectedRibbonColor) || COLOR_THEMES[0];
  }, [selectedRibbonColor]);

  // Pricing formula
  const calculation = useMemo(() => {
    const bagBase = BAG_TYPE_DATACARD[bagType].basePrice;
    
    // Size multiplier
    let sizeMultiplier = 1.0;
    if (bagSize === 'S') sizeMultiplier = 0.8;
    if (bagSize === 'L') sizeMultiplier = 1.35;

    const bagSizePrice = bagBase * sizeMultiplier;

    // Complements sum
    const complementsPrice = activeComplements.reduce((sum, id) => {
      const cmp = COMPLEMENTS.find(c => c.id === id);
      return sum + (cmp ? cmp.price : 0);
    }, 0);

    const pricePerUnitBeforeDiscount = bagSizePrice + complementsPrice;

    // Wholesale trigger (>= 12 units)
    // Wholesale discount gives a solid 30% off per unit!
    const isWholesale = quantity >= 12;
    const discountFactor = isWholesale ? 0.70 : 1.0;
    const finalUnitPrice = pricePerUnitBeforeDiscount * discountFactor;
    const total = finalUnitPrice * quantity;
    const totalBeforeDiscount = pricePerUnitBeforeDiscount * quantity;
    const savings = totalBeforeDiscount - total;

    return {
      bagSizePrice,
      complementsPrice,
      unitPriceNormal: pricePerUnitBeforeDiscount,
      unitPriceApplied: finalUnitPrice,
      total,
      isWholesale,
      savings
    };
  }, [bagType, bagSize, activeComplements, quantity]);

  const handleReset = () => {
    setBagType('kraft');
    setBagSize('M');
    setSelectedRibbonColor('#dc2626');
    setActiveComplements(['lazo_raso', 'papel_seda']);
    setQuantity(15);
  };

  const handleSendCustomComboOrder = () => {
    const typeName = BAG_TYPE_DATACARD[bagType].name;
    const complementsNames = activeComplements.length > 0 
      ? activeComplements.map(id => COMPLEMENTS.find(c => c.id === id)?.name).join(', ')
      : 'Ninguno - bolsa básica';

    const msg = `¡Hola Boho Import! 🥳 He armado un COMBO PERSONALIZADO con su Cotizador Interactivo y me gustaría solicitarlo:\n\n` +
                `*Detalles del Armado:*\n` +
                `• Bolsa: ${typeName}\n` +
                `• Tamaño: Talla ${bagSize} ${bagSize === 'S' ? '(Pequeña)' : bagSize === 'M' ? '(Mediana)' : '(Grande)'}\n` +
                `• Cinta Satinada: ${activeTheme.name} (${selectedRibbonColor})\n` +
                `• Complementos incluidos: ${complementsNames}\n\n` +
                `*Cantidad Solicitada:* ${quantity} unidades\n` +
                `*Tipo de Venta:* ${calculation.isWholesale ? 'POR MAYOR (Descuento -30% aplicado) 👑' : 'Al Menor (Por unidad)'}\n` +
                `*Precio Unitario Final:* S/. ${calculation.unitPriceApplied.toFixed(2)}\n` +
                `*Monto Estimado:* S/. ${calculation.total.toFixed(2)}\n` +
                `${calculation.isWholesale ? `*¡Ahorro total mayorista:* S/. ${calculation.savings.toFixed(2)} 🎉` : ''}\n\n` +
                `¿Podrían confirmarme el tiempo de preparación para recoger o enviar? ¡Quedo atento/a para pagar!`;

    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/51967651924?text=${encodedMsg}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="interactive-combo-calculator" className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 space-y-6">
      
      {/* Top Description and Title */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-rose-500 font-mono">100% Interactivo</span>
          <h3 className="text-xl font-bold font-display text-zinc-900 tracking-tight mt-0.5">Diseña tu Combo de Regalo</h3>
          <p className="text-xs text-zinc-500 mt-1">Elige tus materiales, tamaño y complementos. Atendemos pedidos mayoristas instantáneos con 30% de descuento automático por docena.</p>
        </div>
        <button 
          onClick={handleReset}
          className="p-2 text-zinc-400 hover:text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-xl transition-all"
          title="Reiniciar combo"
        >
          <RotateCcw className="w-4.5 h-4.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Side (Dynamic Visual Canvas Preview) */}
        <div className="md:col-span-5 flex flex-col justify-between bg-zinc-50 rounded-2xl border border-zinc-100 p-4 relative overflow-hidden min-h-[300px]">
          {/* Gritty background */}
          <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

          {/* Sparkles particle animation feedback when toggling complements */}
          <AnimatePresence>
            {particleTrigger && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-rose-500 relative">
                  <Sparkles className="w-20 h-20 text-yellow-500 animate-spin" />
                  <div className="absolute top-2 left-6 w-3 h-3 bg-red-400 rounded-full animate-ping" />
                  <div className="absolute bottom-4 right-2 w-2 h-2 bg-pink-400 rounded-full animate-bounce" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Size labels floating indicators */}
          <div className="absolute top-3 left-3 bg-white/85 backdrop-blur-xs border border-zinc-100 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-zinc-600 font-display">
            Talla: <span className="text-rose-600 font-bold">{bagSize}</span>
          </div>

          <div className="absolute top-3 right-3 flex space-x-1">
            {activeComplements.map(comp => {
              const info = COMPLEMENTS.find(c => c.id === comp);
              return (
                <span key={comp} className="text-[10px] bg-zinc-900 text-white font-semibold px-2 py-0.5 rounded-md shadow-xs animate-pulse font-mono">
                  +{info?.name.split(' ')[0]}
                </span>
              );
            })}
          </div>

          {/* Dynamic 2D schematic bag renderer */}
          <div className="flex-1 flex items-center justify-center py-6 min-h-[220px]">
            <motion.div
              className={`relative shadow-lg border border-zinc-200/50 bg-gradient-to-tr ${BAG_TYPE_DATACARD[bagType].gradient}`}
              animate={{
                width: bagSize === 'S' ? 120 : bagSize === 'M' ? 160 : 200,
                height: bagSize === 'S' ? 110 : bagSize === 'M' ? 140 : 185,
                borderRadius: bagType === 'caja_bow' ? '12px' : '4px'
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {/* Pattern overlays on SVG draft */}
              {BAG_TYPE_DATACARD[bagType].pattern === 'stripes' && (
                <div className="absolute inset-0 opacity-12 pointer-events-none rounded-inherit" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #000 0px, #000 12px, transparent 12px, transparent 24px)'
                }} />
              )}
              {BAG_TYPE_DATACARD[bagType].pattern === 'dots' && (
                <div className="absolute inset-0 opacity-12 pointer-events-none rounded-inherit" style={{
                  backgroundImage: 'radial-gradient(#000 15%, transparent 16%)',
                  backgroundSize: '14px 14px'
                }} />
              )}
              {BAG_TYPE_DATACARD[bagType].pattern === 'holographic' && (
                <div className="absolute inset-0 bg-gradient-to-bl from-pink-300/20 via-purple-300/10 to-teal-200/20 rounded-inherit pointer-events-none animate-pulse" />
              )}

              {/* Box Lid / Top flap */}
              {bagType === 'caja_bow' ? (
                <div className="absolute -top-1.5 inset-x-0 h-4 bg-zinc-900 border-b border-zinc-700 rounded-t-md shadow-xs" />
              ) : (
                /* Bag handle representation */
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-8 border-2 border-zinc-800/40 rounded-full border-b-0" />
              )}

              {/* Central Custom ribbon stripes (rendered horizontally and vertically) */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-zinc-900/10 flex justify-center">
                <div className="h-full w-2" style={{ backgroundColor: selectedRibbonColor }} />
              </div>
              
              {/* Optional horizontal ribbon strip */}
              {activeComplements.includes('lazo_raso') && (
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-4 bg-zinc-900/10 flex items-center">
                  <div className="w-full h-2" style={{ backgroundColor: selectedRibbonColor }} />
                </div>
              )}

              {/* Large SVG Ribbon bows if 'lazo_raso' complement is active */}
              {activeComplements.includes('lazo_raso') && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 drop-shadow-md">
                  <svg viewBox="0 0 100 50" className="w-20 h-10">
                    <path
                      d="M 50 30 C 20 0, 5 15, 50 30 M 50 30 C 80 0, 95 15, 50 30"
                      stroke={selectedRibbonColor}
                      strokeWidth="5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Hanging ribbons tails */}
                    <path d="M 50 30 Q 35 50, 25 55 M 50 30 Q 65 50, 75 55" stroke={selectedRibbonColor} strokeWidth="3" fill="none" />
                    <circle cx="50" cy="30" r="5" fill={selectedRibbonColor} />
                  </svg>
                </div>
              )}

              {/* Inside paper stuffing visualization */}
              {activeComplements.includes('papel_seda') && (
                <div className="absolute -top-3.5 left-2 right-2 h-4 flex space-x-1 items-end overflow-hidden z-0">
                  <div className="w-4 h-6 transform rotate-12 rounded-t-md opacity-80" style={{ backgroundColor: selectedRibbonColor }} />
                  <div className="w-5 h-5 transform -rotate-12 rounded-t-md opacity-60" style={{ backgroundColor: selectedRibbonColor }} />
                  <div className="w-3 h-7 transform rotate-45 rounded-t-lg opacity-85" style={{ backgroundColor: selectedRibbonColor }} />
                  <div className="w-4 h-6 transform -rotate-45 rounded-t-lg opacity-70" style={{ backgroundColor: selectedRibbonColor }} />
                </div>
              )}

              {/* Holographic stars sparkles */}
              {bagType === 'metalizada' && (
                <div className="absolute top-2 right-2 animate-bounce">
                  <Sparkles className="w-5 h-5 text-indigo-600 opacity-70" />
                </div>
              )}

              {/* "Boho" Brand overlay */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center opacity-40 select-none">
                <span className="text-[12px] font-extrabold font-display tracking-[6px] text-zinc-900 block leading-none">BOHO</span>
                <span className="text-[6px] font-semibold text-zinc-700 tracking-wider">IMPORT E.I.R.L.</span>
              </div>
            </motion.div>
          </div>

          <div className="text-center pt-2">
            <span className="text-xs font-mono text-zinc-400">Vista previa simulada 2D del empaque</span>
          </div>
        </div>

        {/* Right Side Options & Control details */}
        <div className="md:col-span-7 space-y-4.5">
          
          {/* Step 1: Bag Type Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">1. Modelo base</label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(BAG_TYPE_DATACARD) as BagType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setBagType(type)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left border transition-all ${
                    bagType === type
                      ? 'bg-zinc-950 border-zinc-950 text-white shadow-xs'
                      : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  <div className="font-display font-bold leading-normal">{BAG_TYPE_DATACARD[type].name}</div>
                  <div className={`text-[10px] ${bagType === type ? 'text-zinc-300' : 'text-zinc-400'} mt-0.5`}>Base: S/. {BAG_TYPE_DATACARD[type].basePrice.toFixed(2)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Size & ribbon color */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Bag Size options */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">2. Tamaño</label>
              <div className="flex space-x-1 bg-zinc-100 p-1 rounded-xl">
                {(['S', 'M', 'L'] as BagSize[]).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setBagSize(size)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      bagSize === size
                        ? 'bg-white text-zinc-900 shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Ribbon Color Palettes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">3. Color temática</label>
              <div className="flex items-center space-x-1.5 flex-wrap h-10 py-1">
                {COLOR_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedRibbonColor(theme.id)}
                    className={`w-6 h-6 rounded-full ${theme.bgClass} transition-all duration-200 relative ${
                      selectedRibbonColor === theme.id
                        ? 'ring-2 ring-offset-2 ring-rose-500 scale-110 z-10'
                        : 'hover:scale-105'
                    }`}
                    title={theme.name}
                  >
                    {selectedRibbonColor === theme.id && (
                      <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Step 3: Complements multiselect badges */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">4. Complementos Premium</label>
              <span className="text-[10px] text-zinc-400">Suma unitaria</span>
            </div>

            <div className="space-y-2">
              {COMPLEMENTS.map((comp) => {
                const isSelected = activeComplements.includes(comp.id);
                return (
                  <div
                    key={comp.id}
                    onClick={() => handleToggleComplement(comp.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                      isSelected
                        ? 'bg-rose-50/50 border-rose-300 text-rose-950'
                        : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-rose-500 text-white' : 'bg-zinc-100 text-zinc-400'
                      }`}>
                        {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                      </div>
                      <span className="font-semibold">{comp.name}</span>
                    </div>
                    <span className="font-mono text-zinc-500 font-bold bg-zinc-100 text-[10px] px-2 py-0.5 rounded-md text-emerald-700">
                      + S/. {comp.price.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 4: Bulk quantity multiplier & bulk discount banner */}
          <div className="space-y-3 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-zinc-600 uppercase tracking-wide">5. Cantidad de combos:</label>
              <span className="text-xs text-zinc-400 font-mono">Docena (12+) = -30% Descuento</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-zinc-200 rounded-xl bg-white p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-zinc-50 text-zinc-600"
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
                  className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-zinc-50 text-zinc-600"
                >
                  +
                </button>
              </div>

              {/* Wholesale Active alert inside setup */}
              <div className="flex-1">
                {calculation.isWholesale ? (
                  <div className="text-emerald-700 text-xs font-extrabold flex items-center space-x-1 bg-emerald-50 border border-emerald-100 py-1.5 px-2.5 rounded-lg animate-pulse">
                    <Percent className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>¡Descuento Mayorista Activado 🎉 (-30%)!</span>
                  </div>
                ) : (
                  <span className="text-zinc-500 text-[11px] leading-snug block">
                    🎁 ¡Agrega <strong>{12 - quantity}</strong> más para calificar a precios mayoristas con 30% de descuento!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Pricing breakdown */}
          <div className="bg-zinc-950 text-white rounded-xl p-4.5 space-y-3 shadow-md">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Precio unitario normal:</span>
              <span>S/. {calculation.unitPriceNormal.toFixed(2)} c/u</span>
            </div>
            
            {calculation.isWholesale && (
              <div className="flex justify-between items-center text-xs text-emerald-400 border-b border-zinc-800 pb-2">
                <span>Descuento por Mayorista (-30%):</span>
                <span>- S/. {(calculation.unitPriceNormal - calculation.unitPriceApplied).toFixed(2)} c/u</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-1">
              <div>
                <span className="text-zinc-400 text-xs block">Unitario Final:</span>
                <span className="text-sm font-bold text-zinc-200">S/. {calculation.unitPriceApplied.toFixed(2)} {calculation.isWholesale ? '💼' : ''}</span>
              </div>
              <div className="text-right">
                <span className="text-zinc-400 text-xs block">Monto Combinado Estimado:</span>
                <span className="text-2xl font-black text-rose-400 font-display">S/. {calculation.total.toFixed(2)}</span>
              </div>
            </div>

            {calculation.isWholesale && (
              <div className="text-right text-[11px] font-semibold text-emerald-400/90 font-mono">
                ¡Ahorraste S/. {calculation.savings.toFixed(2)} en este pedido! 🎉
              </div>
            )}
          </div>

          {/* Order Call Action Button */}
          <button
            type="button"
            onClick={handleSendCustomComboOrder}
            className="w-full bg-zinc-900 hover:bg-zinc-850 hover:shadow-lg text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 text-sm tracking-wide cursor-pointer transition-all active:scale-99"
          >
            <ShoppingBag className="w-4.5 h-4.5 text-rose-500" />
            <span>Pedir Combo Personalizado en WhatsApp</span>
          </button>

        </div>
      </div>
    </div>
  );
}
