export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // S/. price (unitario o base)
  originalPrice?: number;
  wholesalePrice: number; // S/. wholesale price
  minWholesaleQty: number; // minimum quantity for wholesale price
  category: 'bolsas' | 'cajas' | 'accesorios';
  imageGradient: string; // Gradient class to render a beautiful preview box
  patternType: 'stripes' | 'dots' | 'stars' | 'solid' | 'holographic';
  ribbonColor?: string; // color of the ribbon SVG (if any)
  sizes: string[];
  features: string[];
  inStock: boolean;
  variants?: string[]; // Custom product variations like team, style, occasion, design
  priceLevels?: { qty: number; price: number; label: string }[]; // Multi-tiered pricing (Unidad / Docena / Ciento)
  material?: string; // e.g. 'CORROSPUM', 'FOLCOTE', 'CARTON', 'CARTON PRENSADO', 'LLANA', '80GR'
  occasions?: string[]; // e.g. ['Amor', 'Día del Padre', 'Día de la Madre', 'Cumpleaños', 'Baby Shower', 'Corporativo']
  unitMeasure?: string; // 'Docena', 'Ciento', 'Medio Ciento', 'Unidad'
  sizePricing?: { size: string; dozenPrice: number; unitPrice?: number; dimensions?: string }[];
}

export type BagType = 'kraft' | 'estampada' | 'metalizada' | 'caja_bow';
export type BagSize = 'S' | 'M' | 'L';

export interface ComboComplement {
  id: string;
  name: string;
  price: number;
  icon: string;
}

export interface CustomCombo {
  bagType: BagType;
  bagSize: BagSize;
  colorTheme: string;
  complements: string[]; // List of complement IDs
  quantity: number;
}

export interface CartItem {
  id: string; // unique id composed of productId-size-variant
  product: Product;
  size: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  total: number;
  priceLabel: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  description: string;
  estimatedTime: string;
  startingPrice: number;
  popular: boolean;
  iconName: string;
  features: string[];
  benefits: string;
  gradient: string;
}

