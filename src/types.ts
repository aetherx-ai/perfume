export type FragranceGender = 'Men' | 'Women' | 'Unisex';

export type FragranceType = 'Designer' | 'Niche' | 'Arabian';

export type FragranceFamily = 
  | 'Woody' 
  | 'Oriental & Amber' 
  | 'Fresh & Citrus' 
  | 'Floral' 
  | 'Gourmand & Sweet' 
  | 'Aromatic & Fougere' 
  | 'Leather & Smoky';

export type FragranceFormat = 'Decant' | 'Full Bottle';

export interface ProductVariant {
  id: string;
  format: FragranceFormat;
  size: string; // e.g., '3ml', '5ml', '10ml', '15ml', '30ml', '100ml'
  price: number; // in BDT (৳)
  originalPrice?: number;
  inStock: boolean;
}

export interface OlfactoryNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  gender: FragranceGender;
  type: FragranceType;
  family: FragranceFamily;
  concentration: string; // 'Eau de Parfum', 'Extrait de Parfum', 'Parfum', 'Eau de Toilette'
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  secondaryImageUrl?: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  featured?: boolean;
  season: ('Summer' | 'Winter' | 'Spring' | 'Fall')[];
  occasion: ('Date Night' | 'Everyday' | 'Office' | 'Party')[];
  weather: ('Hot' | 'Warm' | 'Cool' | 'Rainy')[];
  mainAccords: string[];
  notes: OlfactoryNotes;
  variants: ProductVariant[];
  defaultVariantId: string;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  product: Product;
  variantId: string;
  variant: ProductVariant;
  quantity: number;
}

export interface CustomerAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  district: string;
  city: string;
  notes?: string;
}

export type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'card';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  customer: CustomerAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending' | 'Paid' | 'Processing';
  orderStatus: 'Confirmed' | 'Dispatched' | 'In Transit' | 'Delivered';
  trackingNumber: string;
}

export interface Review {
  id: string;
  productId?: string;
  productName?: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface FaqItem {
  id: string;
  category: 'Authenticity' | 'Decants' | 'Delivery' | 'Orders & Payment' | 'Returns';
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string[];
  featuredImage: string;
}
