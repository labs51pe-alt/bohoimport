import { Product, ComboComplement } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'bolsa-kraft-rayas',
    name: 'Bolsa de Regalo Kraft Rayas Boho',
    description: 'La bolsa insignia inspirada en nuestro logotipo. Papel kraft premium resistente con patrón de rayas diagonales elegantes y asa de algodón trenzado negra.',
    price: 3.50,
    originalPrice: 4.50,
    wholesalePrice: 2.20,
    minWholesaleQty: 12,
    category: 'bolsas',
    imageGradient: 'from-amber-100 to-amber-200',
    patternType: 'stripes',
    ribbonColor: '#e11d48', // rose-600
    sizes: ['S (15x12cm)', 'M (22x18cm)', 'L (32x26cm)'],
    features: ['Papel Kraft de 150g', 'Asas de algodón reforzado', '100% Eco-friendly'],
    inStock: true
  },
  {
    id: 'bolsa-holografica',
    name: 'Bolsa Premium Holográfica Prisma',
    description: 'Destaca con un brillo espectacular en 3D que cambia de color según la luz. Perfecta para regalos de joyería, perfumes o accesorios de alta gama.',
    price: 5.50,
    wholesalePrice: 3.80,
    minWholesaleQty: 12,
    category: 'bolsas',
    imageGradient: 'from-pink-200 via-indigo-200 to-cyan-200',
    patternType: 'holographic',
    ribbonColor: '#ec4899', // pink-500
    sizes: ['S (12x10cm)', 'M (20x15cm)', 'L (30x22cm)'],
    features: ['Efecto prisma iridiscente', 'Cartulina rígida de 250g', 'Protección repelente al agua'],
    inStock: true
  },
  {
    id: 'caja-boho-bow',
    name: 'Caja Regalo "Boho Bow" con Lazo',
    description: 'Caja de regalo rígida con autoarmado rápido y moño de raso satinado de acabado perfecto. Lo clásico y premium combinado para una presentación inigualable.',
    price: 6.00,
    originalPrice: 7.50,
    wholesalePrice: 4.20,
    minWholesaleQty: 12,
    category: 'cajas',
    imageGradient: 'from-rose-50 to-rose-200',
    patternType: 'dots',
    ribbonColor: '#b91c1c', // red-700
    sizes: ['M (15x15x15cm)', 'L (22x22x12cm)'],
    features: ['Moño de raso incluido', 'Cartón microcorrugado rígido', 'Armado en 2 segundos'],
    inStock: true
  },
  {
    id: 'papel-seda-estampado',
    name: 'Papel de Seda Estampado Floral',
    description: 'Añade volumen, protección y un toque artístico al interior de tus bolsas o cajas. Diseños seleccionados con tintas biodegradables de alta resolución.',
    price: 1.20,
    wholesalePrice: 0.70,
    minWholesaleQty: 50,
    category: 'accesorios',
    imageGradient: 'from-teal-50 to-emerald-100',
    patternType: 'stars',
    ribbonColor: '#0d9488',
    sizes: ['Pliego estándar (50x70cm)'],
    features: ['Grosor ultra-fino de seda', 'No destiñe con la humedad', 'Impresión ecológica de flores'],
    inStock: true
  },
  {
    id: 'cinta-raso-premium',
    name: 'Cinta de Raso Satinada (Rollo)',
    description: 'Ideal para creadores y emprendedores de regalos. Rollo completo de hermosas cintas satinadas de doble cara con brillo excelente para atar moños espectaculares.',
    price: 15.00,
    wholesalePrice: 10.50,
    minWholesaleQty: 5,
    category: 'accesorios',
    imageGradient: 'from-red-100 to-red-200',
    patternType: 'solid',
    ribbonColor: '#dc2626',
    sizes: ['Ancho 2.5cm (Largo 50m)'],
    features: ['Doble cara brillante', 'Bordes sellados anti-hilachas', 'Disponible en Rojo, Rosa, Oro, Plata'],
    inStock: true
  },
  {
    id: 'bolsa-mini-corazones',
    name: 'Bolsa de Regalo San Valentín/Aniversario',
    description: 'Exprésate con dulzura. Cartulina suave color rosa pastel con corazones de papel foil dorado estampado en relieve brillante.',
    price: 3.00,
    originalPrice: 3.80,
    wholesalePrice: 1.80,
    minWholesaleQty: 12,
    category: 'bolsas',
    imageGradient: 'from-red-50 to-pink-200',
    patternType: 'stars',
    ribbonColor: '#9333ea',
    sizes: ['S (10x10cm)', 'M (20x16cm)'],
    features: ['Estampado Foil brillante', 'Asas de cinta satinada', 'Perfecto para cosméticos'],
    inStock: true
  },
  {
    id: 'caja-cilindro-flower',
    name: 'Caja Cilíndrica Luxury Flower Box',
    description: 'La opción de los floristas profesionales. Caja rígida cilíndrica de alta densidad pensada para arreglos florales, fresas con chocolate o sorpresas.',
    price: 8.50,
    wholesalePrice: 5.90,
    minWholesaleQty: 12,
    category: 'cajas',
    imageGradient: 'from-neutral-100 to-neutral-200',
    patternType: 'solid',
    sizes: ['M (Ø 15cm x Al: 17cm)', 'L (Ø 20cm x Al: 22cm)'],
    features: ['Paredes de cartón ultra-rígido', 'Cordón colgante de seda', 'Interior con recubrimiento barrera waterproof'],
    inStock: true
  }
];

export const COMPLEMENTS: ComboComplement[] = [
  { id: 'lazo_raso', name: 'Lazo de Raso Satinado', price: 1.50, icon: 'Ribbon' },
  { id: 'tarjeta_dedicatoria', name: 'Tarjeta Dedicatoria Elegante', price: 1.00, icon: 'FileText' },
  { id: 'papel_seda', name: 'Relleno Papel Seda Decorado', price: 0.80, icon: 'Wind' },
  { id: 'globo_mini', name: 'Mini Globo Metálico Inflado', price: 2.50, icon: 'Sparkles' },
  { id: 'viruta_madera', name: 'Viruta de Madera Aromática', price: 0.60, icon: 'TreePine' }
];

export const BAG_TYPE_DATACARD = {
  kraft: { name: 'Kraft Clásico de Rayas', basePrice: 3.00, gradient: 'from-amber-100 via-amber-200 to-amber-300', pattern: 'stripes' },
  estampada: { name: 'Estampada Rosada Chic', basePrice: 4.00, gradient: 'from-rose-50 via-rose-100 to-rose-200', pattern: 'dots' },
  metalizada: { name: 'Metalizada/Holográfica', basePrice: 5.50, gradient: 'from-fuchsia-200 via-violet-200 to-cyan-200', pattern: 'holographic' },
  caja_bow: { name: 'Caja Cubo con Tapa Autocompuesta', basePrice: 6.50, gradient: 'from-slate-100 via-neutral-200 to-rose-100', pattern: 'solid' }
};

export const COLOR_THEMES = [
  { id: '#dc2626', name: 'Rojo Pasión', bgClass: 'bg-red-600' },
  { id: '#db2777', name: 'Rosa Chic', bgClass: 'bg-pink-600' },
  { id: '#eab308', name: 'Oro Elegante', bgClass: 'bg-yellow-500' },
  { id: '#2563eb', name: 'Azul Real', bgClass: 'bg-blue-600' },
  { id: '#16a34a', name: 'Verde Pino', bgClass: 'bg-green-600' },
  { id: '#18181b', name: 'Negro Luxury', bgClass: 'bg-zinc-900' }
];
