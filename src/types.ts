export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // S/. price
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
