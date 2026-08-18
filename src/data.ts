import { Product, ComboComplement } from './types';

export const PRODUCTS: Product[] = [
  // 1. PALETAS O TOPPERS CORROSPUM (Exact spreadsheet entry)
  {
    id: 'toppers-paletas-corrospum',
    name: 'Paletas o Toppers Corrospum con Lazo 🎀',
    description: 'Paletas decorativas en relieve de corrospum escarchado con lazo satinado y palito. Ideales para arreglos florales, tortas, cajas sorpresa y anchetas.',
    material: 'CORROSPUM (Relieve 3D & Brillo Escarchado)',
    price: 2.00,
    originalPrice: 2.50,
    wholesalePrice: 1.50,
    minWholesaleQty: 12,
    category: 'accesorios',
    unitMeasure: 'Docena / Ciento',
    imageGradient: 'from-rose-500 via-red-500 to-amber-400',
    patternType: 'stars',
    ribbonColor: '#f43f5e',
    sizes: ['Medida Estándar con Palito (~18-22 cm)'],
    occasions: ['Amor', 'Día del Padre', 'Día de la Madre', 'Graduación', 'Día del Niño', 'Cumpleaños'],
    features: [
      'Docena a S/. 18.00 (S/. 1.50 c/u)',
      'Ciento a S/. 135.00 (S/. 1.35 c/u)',
      'Acabado en corrospum escarchado con lazo decorativo',
      'Modelos surtidos en amor, Minnie/Mickey, felicitaciones y fechas especiales'
    ],
    variants: [
      'Surtido Comercial (Recomendado) ✨',
      'Amor & Te Amo ❤️',
      'Día del Padre 👔',
      'Día de la Madre 👑',
      'Graduación 🎓',
      'Día del Niño 🧸',
      'Feliz Cumpleaños 🎂'
    ],
    priceLevels: [
      { qty: 1, price: 2.00, label: 'Unitario minorista' },
      { qty: 12, price: 1.50, label: 'Docena (S/. 18.00 doc)' },
      { qty: 100, price: 1.35, label: 'Ciento (S/. 135.00 ciento)' }
    ],
    inStock: true
  },

  // 2. PALETAS O TOPPERS FOLCOTE (Exact spreadsheet entry)
  {
    id: 'toppers-paletas-folcote',
    name: 'Paletas o Toppers Folcote Troquelados 🌟',
    description: 'Toppers económicos troquelados en cartulina folcote brillante con impresión full color y palito. Excelente rentabilidad para venta por volumen.',
    material: 'FOLCOTE (Cartulina brillante de alto impacto)',
    price: 1.00,
    originalPrice: 1.50,
    wholesalePrice: 0.67,
    minWholesaleQty: 12,
    category: 'accesorios',
    unitMeasure: 'Docena / Ciento',
    imageGradient: 'from-amber-400 via-orange-500 to-yellow-300',
    patternType: 'stars',
    ribbonColor: '#eab308',
    sizes: ['Troquelado Estándar (~15-18 cm)'],
    occasions: ['Amor', 'Día del Padre', 'Día de la Madre', 'Graduación', 'Día del Niño', 'Cumpleaños'],
    features: [
      'Docena a S/. 8.00 (S/. 0.67 c/u)',
      'Ciento a S/. 38.00 (S/. 0.38 c/u — ¡Súper Precio Mayorista!)',
      'Impresión de alta nitidez en folcote brillante',
      'Gran variedad: Equipos de fútbol, papá, mamá, cumpleaños y graduación'
    ],
    variants: [
      'Surtido Comercial (Recomendado) ✨',
      'Día del Padre & Equipos 👔⚽',
      'Día de la Madre 🌸',
      'Amor & Parejas 💖',
      'Graduación & Éxito 🎓',
      'Día del Niño 🎈',
      'Feliz Cumpleaños 🎂'
    ],
    priceLevels: [
      { qty: 1, price: 1.00, label: 'Unitario minorista' },
      { qty: 12, price: 0.67, label: 'Docena (S/. 8.00 doc)' },
      { qty: 100, price: 0.38, label: 'Ciento (S/. 38.00 ciento)' }
    ],
    inStock: true
  },

  // 3. PAPEL DE REGALO 80GR (Exact spreadsheet entry)
  {
    id: 'papel-regalo-80gr',
    name: 'Papel de Regalo 80gr Estampado (Pliegos) 🎁',
    description: 'Pliegos de papel de regalo en gramaje de 80gr con diseños nítidos y alta resistencia al doblado. No se transparenta ni se rompe con facilidad.',
    material: '80GR (Couché / Bond satinado de alta calidad)',
    price: 0.50,
    originalPrice: 0.80,
    wholesalePrice: 0.30,
    minWholesaleQty: 50,
    category: 'accesorios',
    unitMeasure: 'Medio Ciento / Ciento',
    imageGradient: 'from-blue-400 via-rose-400 to-indigo-500',
    patternType: 'stripes',
    ribbonColor: '#3b82f6',
    sizes: ['Pliego Estándar (50x70 cm)'],
    occasions: ['Niños', 'Día del Padre', 'Día de la Madre', 'Graduación', 'Día del Niño', 'Cumpleaños'],
    features: [
      'Medio Ciento (50 pliegos) a S/. 15.00 (S/. 0.30 c/u)',
      'Ciento (100 pliegos) a S/. 30.00 (S/. 0.30 c/u)',
      'Gramaje óptimo de 80gr para envolturas impecables',
      'Diseños surtidos para todas las campañas del año'
    ],
    variants: [
      'Surtido Mayorista (Recomendado) 📦',
      'Niños & Dibujos 🧸',
      'Día del Padre & Caballero 👔',
      'Día de la Madre & Flores 🌺',
      'Graduación & Éxito 🎓',
      'Cumpleaños Festivo 🎉'
    ],
    priceLevels: [
      { qty: 1, price: 0.50, label: 'Pliego suelto' },
      { qty: 50, price: 0.30, label: 'Medio Ciento (S/. 15.00 los 50)' },
      { qty: 100, price: 0.30, label: 'Ciento (S/. 30.00 los 100)' }
    ],
    inStock: true
  },

  // 4. CAJAS CARTÓN CUBO (Exact spreadsheet entry)
  {
    id: 'cajas-carton-cubo',
    name: 'Cajas de Regalo Cartón Cubo (15x15 / 20x20) 📦',
    description: 'Cajas cuadradas autoarmables de cartón microcorrugado resistente. Disponibles en color entero satinado y diseños temáticos (Fútbol Alianza/U, Amor, Cumpleaños).',
    material: 'CARTÓN (Color Entero & Diseños Temáticos)',
    price: 4.00,
    originalPrice: 5.00,
    wholesalePrice: 3.00,
    minWholesaleQty: 12,
    category: 'cajas',
    unitMeasure: 'Docena',
    imageGradient: 'from-blue-600 via-indigo-700 to-amber-500',
    patternType: 'solid',
    ribbonColor: '#2563eb',
    sizes: [
      '15x15 cm Cubo (S/. 36 docena)',
      '20x20 cm Cubo (S/. 54 docena)'
    ],
    occasions: ['Amor', 'Día del Padre', 'Equipos de Fútbol', 'Cumpleaños', 'Juvenil'],
    sizePricing: [
      { size: '15x15 cm Cubo', dozenPrice: 36.00, unitPrice: 3.00, dimensions: '15 x 15 x 15 cm' },
      { size: '20x20 cm Cubo', dozenPrice: 54.00, unitPrice: 4.50, dimensions: '20 x 20 x 20 cm' }
    ],
    features: [
      '15x15 Cubo: Docena a S/. 36.00 (S/. 3.00 c/u)',
      '20x20 Cubo: Docena a S/. 54.00 (S/. 4.50 c/u)',
      'Diseños de equipos oficiales (Alianza Lima, Universitario) y Color Entero',
      'Resistentes para tazas, perfumes, polos y arreglos'
    ],
    variants: [
      'Surtido Comercial (Recomendado) ✨',
      'Equipos de Fútbol (Alianza / U / Cristal) ⚽',
      'Color Entero (Rojo, Negro, Rosa, Dorado) 🎨',
      'Amor & Corazones ❤️',
      'Feliz Cumpleaños 🎂'
    ],
    priceLevels: [
      { qty: 1, price: 4.00, label: 'Unitario minorista' },
      { qty: 12, price: 3.00, label: 'Docena 15x15 (S/. 36.00 doc)' },
      { qty: 24, price: 2.80, label: 'Mayor x 2 Docenas' }
    ],
    inStock: true
  },

  // 5. CAJAS CARTÓN PRENSADO / RIGIDAS (Exact spreadsheet entry)
  {
    id: 'cajas-carton-prensado-lujo',
    name: 'Cajas Rígidas Cartón Prensado (Cilíndrica & Cubo) 👑',
    description: 'Cajas de lujo en cartón prensado rígido de alta densidad con tapa. Acabados premium en sombrerera cilíndrica y cubo para florerías y regalos exclusivos.',
    material: 'CARTÓN PRENSADO (Estructura rígida de lujo)',
    price: 12.00,
    originalPrice: 15.00,
    wholesalePrice: 8.00,
    minWholesaleQty: 12,
    category: 'cajas',
    unitMeasure: 'Unidad / Docena',
    imageGradient: 'from-pink-500 via-rose-600 to-zinc-900',
    patternType: 'solid',
    ribbonColor: '#db2777',
    sizes: [
      '15x15 cm Cilíndrica (Sombrerera)',
      '15x15 cm Cubo (Cuadrada Rígida)'
    ],
    occasions: ['Amor', 'Día de la Madre', 'Día del Padre', 'Aniversario', 'Florería & Chocolates'],
    sizePricing: [
      { size: '15x15 cm Cilíndrica', dozenPrice: 96.00, unitPrice: 8.00, dimensions: 'Ø 15cm x 15cm' },
      { size: '15x15 cm Cubo', dozenPrice: 96.00, unitPrice: 8.00, dimensions: '15 x 15 x 15 cm' }
    ],
    features: [
      'Unidad: S/. 12.00 c/u (Minorista)',
      'Docena: S/. 96.00 (S/. 8.00 c/u — ¡Ahorras S/. 4.00 por unidad!)',
      'Formatos: Sombrerera Cilíndrica o Cubo con tapa rígida',
      'Diseños: Estampados de Amor, Dibujos, Color Entero Rosa/Negro Luxury'
    ],
    variants: [
      'Surtido Luxury (Recomendado) 👑',
      'Cilíndrica Sombrerera Estampada 🌸',
      'Cilíndrica Color Entero (Rosa Pastel / Negro) 🖤',
      'Cubo Tapa Dura Amor / Frases ❤️',
      'Cubo Tapa Dura Fútbol / Papá 🏆'
    ],
    priceLevels: [
      { qty: 1, price: 12.00, label: 'Unidad Minorista (S/. 12.00 c/u)' },
      { qty: 12, price: 8.00, label: 'Docena Mayorista (S/. 96.00 la docena)' }
    ],
    inStock: true
  },

  // 6. BOLSAS DE REGALO LLANA (Exact spreadsheet entry - Complete 13 Sizes Matrix)
  {
    id: 'bolsas-regalo-llana-coleccion',
    name: 'Bolsas de Regalo Llanas (Escala Completa 13 Medidas) 🛍️',
    description: 'La colección completa de bolsas de regalo llanas con asa cordón resistente. Disponibles en todas las medidas desde Mini (5x6x7 cm) hasta Jumbo y Botella de licor.',
    material: 'LLANA (Barnizada / Mate / Plastificada)',
    price: 1.50,
    originalPrice: 2.00,
    wholesalePrice: 1.00,
    minWholesaleQty: 12,
    category: 'bolsas',
    unitMeasure: 'Docena',
    imageGradient: 'from-amber-200 via-rose-300 to-indigo-400',
    patternType: 'stripes',
    ribbonColor: '#e11d48',
    sizes: [
      'MINI (5x6x7 cm) — S/. 6 doc',
      'S — S/. 7 doc',
      'ICH — S/. 8 doc',
      'M IMP — S/. 10 doc',
      'M — S/. 12 doc',
      'IG — S/. 15 doc',
      'MZ — S/. 18 doc',
      'L — S/. 20 doc',
      'XL — S/. 30 doc',
      'XXL — S/. 36 doc',
      'XXL Especial — S/. 42 doc',
      'JUMBO — S/. 48 doc',
      'BOTELLA (Vinos) — S/. 16 doc'
    ],
    occasions: [
      'Corporativo Caballero',
      'Corporativo Dama',
      'Caballero (Día del Padre)',
      'Dama (Día de la Madre)',
      'Niños & Infantil',
      'Señorita (Quinceaños)',
      'Baby Shower',
      'Matrimonio'
    ],
    sizePricing: [
      { size: 'MINI (5x6x7 cm)', dozenPrice: 6.00, unitPrice: 0.50, dimensions: '5 x 6 x 7 cm' },
      { size: 'S', dozenPrice: 7.00, unitPrice: 0.58, dimensions: 'Medida Chica' },
      { size: 'ICH', dozenPrice: 8.00, unitPrice: 0.67, dimensions: 'Medida Intermedia Chica' },
      { size: 'M IMP', dozenPrice: 10.00, unitPrice: 0.83, dimensions: 'Mediana Impresa' },
      { size: 'M', dozenPrice: 12.00, unitPrice: 1.00, dimensions: 'Mediana Estándar' },
      { size: 'IG', dozenPrice: 15.00, unitPrice: 1.25, dimensions: 'Intermedia Grande' },
      { size: 'MZ', dozenPrice: 18.00, unitPrice: 1.50, dimensions: 'Mediana Max' },
      { size: 'L', dozenPrice: 20.00, unitPrice: 1.67, dimensions: 'Grande' },
      { size: 'XL', dozenPrice: 30.00, unitPrice: 2.50, dimensions: 'Extra Grande' },
      { size: 'XXL', dozenPrice: 36.00, unitPrice: 3.00, dimensions: 'Doble Extra Grande' },
      { size: 'XXL Especial', dozenPrice: 42.00, unitPrice: 3.50, dimensions: 'XXL Reforzada' },
      { size: 'JUMBO', dozenPrice: 48.00, unitPrice: 4.00, dimensions: 'Jumbo Regalo Gigante' },
      { size: 'BOTELLA', dozenPrice: 16.00, unitPrice: 1.33, dimensions: 'Especial Vinos y Licores' }
    ],
    features: [
      'Precios por Docena desde S/. 6.00 (Mini) hasta S/. 48.00 (Jumbo)',
      'Especial Botella para Vinos y Licores a S/. 16.00 la docena',
      '8 Temáticas completas: Corporativo, Dama, Caballero, Niños, Baby Shower, Bodas y 15 Años',
      'Papel de alta resistencia con base reforzada y asa cordón'
    ],
    variants: [
      'Surtido Comercial (Recomendado) ✨',
      'Corporativo Caballero 👔',
      'Corporativo Dama 👠',
      'Caballero / Día del Padre 🎩',
      'Dama / Día de la Madre 🌸',
      'Niños & Infantil 🎈',
      'Señorita & Quinceaños 👑',
      'Baby Shower 🍼',
      'Matrimonio & Boda 💍'
    ],
    priceLevels: [
      { qty: 1, price: 1.50, label: 'Unidad Talla M' },
      { qty: 12, price: 1.00, label: 'Docena Talla M (S/. 12.00 doc)' },
      { qty: 100, price: 0.90, label: 'Ciento Talla M (S/. 90.00 ciento)' }
    ],
    inStock: true
  },

  // 7. CAJA LONCHERA-2 EQUIPOS (Featured complementary product)
  {
    id: 'lonchera-2-equipos',
    name: 'Caja Regalo Lonchera-2 "Equipos de Fútbol" ⚽',
    description: 'Caja de regalo tipo lonchera con diseños oficiales de equipos del fútbol peruano. Perfecta para empacar camisetas, tazas u obsequios especiales del Día del Padre.',
    material: 'CARTÓN MICROCORRUGADO (Con Asa)',
    price: 3.50,
    originalPrice: 4.50,
    wholesalePrice: 2.00,
    minWholesaleQty: 12,
    category: 'cajas',
    unitMeasure: 'Docena / Ciento',
    imageGradient: 'from-blue-200 via-zinc-100 to-red-100',
    patternType: 'stripes',
    ribbonColor: '#3b82f6',
    sizes: ['Económica (37x19x14.5 cm)'],
    occasions: ['Día del Padre', 'Equipos de Fútbol', 'Cumpleaños'],
    features: [
      'La docena contiene 4 diseños de equipos (Alianza Lima, Universitario, Sporting Cristal, Sport Boys)',
      'Asa de transporte incorporada muy resistente',
      'Ventas al por mayor ideal para campañas',
      'Docena a S/. 24.00 (S/. 2.00 c/u)'
    ],
    variants: [
      'Surtidos (Recomendado) 👔',
      'Alianza Lima 🔵',
      'Universitario de Deportes 🔴',
      'Sporting Cristal 🔵⚪',
      'Sport Boys 🌸'
    ],
    priceLevels: [
      { qty: 1, price: 3.50, label: 'Unitario minorista' },
      { qty: 12, price: 2.00, label: 'Docena (S/. 24.00 la docena)' },
      { qty: 100, price: 1.80, label: 'Ciento (S/. 180.00 el ciento)' }
    ],
    inStock: true
  },

  // 8. CINTA DE RASO SATINADA (Rollo para empaque)
  {
    id: 'cinta-raso-premium',
    name: 'Cinta de Raso Satinada (Rollo 50m) 🎀',
    description: 'Ideal para creadores y emprendedores de regalos. Rollo completo de hermosas cintas satinadas de doble cara con brillo excelente para atar moños espectaculares.',
    material: 'RASO SATINADO',
    price: 15.00,
    wholesalePrice: 10.50,
    minWholesaleQty: 5,
    category: 'accesorios',
    unitMeasure: 'Rollo',
    imageGradient: 'from-red-500 via-rose-500 to-pink-500',
    patternType: 'solid',
    ribbonColor: '#dc2626',
    sizes: ['Ancho 2.5cm (Largo 50m)'],
    occasions: ['Amor', 'Día de la Madre', 'Día del Padre', 'Navidad', 'Bodas'],
    features: [
      'Doble cara brillante',
      'Bordes sellados anti-hilachas',
      'Disponible en Rojo, Rosa, Oro, Azul, Negro y Plata'
    ],
    variants: ['Rojo Pasión 🔴', 'Rosa Pastel 🌸', 'Oro Elegante 🏆', 'Azul Real 🔵', 'Negro Luxury 🖤'],
    priceLevels: [
      { qty: 1, price: 15.00, label: 'Rollo Unitario' },
      { qty: 5, price: 10.50, label: 'Mayor x 5 Rollos (S/. 10.50 c/u)' }
    ],
    inStock: true
  }
];

export const COMPLEMENTS: ComboComplement[] = [
  { id: 'topper_folcote', name: 'Topper Folcote Troquelado', price: 0.67, icon: 'Sparkles' },
  { id: 'topper_corrospum', name: 'Topper Corrospum con Lazo', price: 1.50, icon: 'Ribbon' },
  { id: 'papel_regalo_pliego', name: 'Pliego Papel de Regalo 80gr', price: 0.30, icon: 'Wind' },
  { id: 'lazo_raso', name: 'Lazo de Raso Satinado', price: 1.00, icon: 'Ribbon' },
  { id: 'tarjeta_dedicatoria', name: 'Tarjeta Dedicatoria Elegante', price: 0.50, icon: 'FileText' }
];

export const BAG_TYPE_DATACARD = {
  kraft: { name: 'Bolsa Llana (Barnizada / Mate)', basePrice: 1.00, gradient: 'from-amber-100 via-amber-200 to-amber-300', pattern: 'stripes' },
  estampada: { name: 'Caja Cubo Cartón (15x15)', basePrice: 3.00, gradient: 'from-rose-50 via-rose-100 to-rose-200', pattern: 'dots' },
  metalizada: { name: 'Caja Rígida Cartón Prensado', basePrice: 8.00, gradient: 'from-fuchsia-200 via-violet-200 to-cyan-200', pattern: 'holographic' },
  caja_bow: { name: 'Pack Toppers + Papel 80gr', basePrice: 0.67, gradient: 'from-slate-100 via-neutral-200 to-rose-100', pattern: 'solid' }
};

export const COLOR_THEMES = [
  { id: '#dc2626', name: 'Rojo Pasión', bgClass: 'bg-red-600' },
  { id: '#db2777', name: 'Rosa Chic', bgClass: 'bg-pink-600' },
  { id: '#eab308', name: 'Oro Elegante', bgClass: 'bg-yellow-500' },
  { id: '#2563eb', name: 'Azul Real', bgClass: 'bg-blue-600' },
  { id: '#16a34a', name: 'Verde Pino', bgClass: 'bg-green-600' },
  { id: '#18181b', name: 'Negro Luxury', bgClass: 'bg-zinc-900' }
];

export const SERVICES = [
  {
    id: 'pack-emprendedor-regalos',
    title: 'Pack Emprendedor Mayorista 🚀',
    category: 'Mayorista & Negocios',
    tag: '🔥 Más Solicitado',
    description: 'Kit surtido con la matriz completa de bolsas llanas, toppers folcote/corrospum y papel 80gr para tiendas de regalos, florerías y bazares. Incluye lista de precios sugeridos al público.',
    estimatedTime: 'Despacho en 24h',
    startingPrice: 120.00,
    popular: true,
    iconName: 'Package',
    features: [
      '2 Docenas de Bolsas Llanas (Tallas S, M, L)',
      '1 Docena de Toppers Corrospum con lazo',
      '1 Docena de Toppers Folcote troquelados',
      '1 Medio Ciento (50 pliegos) Papel de Regalo 80gr'
    ],
    benefits: 'Margen de ganancia estimado del 100% al 150% en reventa.',
    gradient: 'from-rose-500/10 via-amber-500/10 to-rose-500/5'
  },
  {
    id: 'armado-cajas-personalizadas',
    title: 'Armado de Cajas & Desayunos Sorpresa 🎀',
    category: 'Personalización',
    tag: '✨ Acabado Premium',
    description: 'Servicio de preparación y acondicionado de cajas de cartón prensado y sombrereras con viruta, papel de seda, toppers y tarjeta caligrafiada.',
    estimatedTime: 'Entrega 2-4 horas',
    startingPrice: 15.00,
    popular: true,
    iconName: 'Gift',
    features: [
      'Caja rígida prensada (Cilíndrica o Cubo)',
      'Topper temático (Papá, Mamá, Amor o Cumpleaños)',
      'Lazo de raso satinado doble vista',
      'Tarjeta personalizada con dedicatoria'
    ],
    benefits: 'Presentación lista para entregar y emocionar.',
    gradient: 'from-amber-500/10 via-rose-500/10 to-amber-500/5'
  },
  {
    id: 'despacho-campana-provincias',
    title: 'Consolidado de Campaña a Provincias 🚚',
    category: 'Logística Nacional',
    tag: '⚡ Envío Prioritario',
    description: 'Gestión y embalaje seguro de grandes volúmenes para agencias de transporte (Shalom, Olva, Marvisur). Embalaje reforzado con film y flejes de seguridad.',
    estimatedTime: 'Mismo día a agencia',
    startingPrice: 0.00,
    popular: false,
    iconName: 'Truck',
    features: [
      'Embalaje reforzado anti-golpes y lluvia',
      'Envío de guía y foto de control por WhatsApp',
      'Flete con pago en destino (Pagas al recoger)',
      'Cobertura a todo el territorio peruano'
    ],
    benefits: 'Tus productos llegan 100% impecables y a tiempo.',
    gradient: 'from-sky-500/10 via-emerald-500/10 to-sky-500/5'
  }
];
