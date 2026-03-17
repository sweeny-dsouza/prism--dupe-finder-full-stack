export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'skincare' | 'haircare' | 'bodycare';
  subcategory: string;
  price: number;
  currency?: string;
  originalPrice?: number;
  ingredients: string[];
  keyIngredients?: string[];
  benefits: string[];
  concerns: string[];
  concern?: string;
  skinType?: string;
  hairType?: string[];
  bodyRoutineStep?: 'exfoliate' | 'treat' | 'seal';
  texture?: string;
  finish?: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  imageUrl: string;
  description: string;
  isLuxury: boolean;
  budgetLevel: 'low' | 'medium' | 'premium';
  dupeOf?: string | null;
}

export interface DupeMatch {
  originalProduct: Product;
  dupeProduct: Product;
  similarityScore: number;
  ingredientMatch: number;
  textureMatch: number;
  concernMatch: number;
  typeMatch: number;
  ratingMatch: number;
  savings: number;
  savingsPercentage: number;
  whyItMatches: string;
  sharedIngredients: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  benefits: string[];
  concerns: string[];
  suitableFor: string[];
  avoidIf: string[];
  scientificSummary: string;
  commonIn: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  skinType?: string;
  hairType?: string;
  concerns?: string[];
  savedProducts: string[];
  recentSearches: string[];
  joinedAt: string;
}

export interface Routine {
  id: string;
  name: string;
  goal: string;
  steps: RoutineStep[];
  estimatedCost: number;
  estimatedSavings: number;
}

export interface RoutineStep {
  order: number;
  name: string;
  description: string;
  product?: Product;
  dupeAlternative?: Product;
  timeOfDay: 'morning' | 'evening' | 'both';
}

export interface Comparison {
  productA: Product | null;
  productB: Product | null;
  sharedIngredients: string[];
  uniqueToA: string[];
  uniqueToB: string[];
  priceDifference: number;
  betterValue: 'A' | 'B' | 'equal' | null;
}

export interface HairConcern {
  id: string;
  name: string;
  description: string;
  recommendedIngredients: string[];
  avoidIngredients: string[];
}

export interface SkinConcern {
  id: string;
  name: string;
  description: string;
  recommendedIngredients: string[];
  avoidIngredients: string[];
}

export type ViewType = 'grid' | 'list';

export type SortOption = 'relevance' | 'price-low' | 'price-high' | 'rating' | 'savings';

export interface FilterState {
  category: string[];
  priceRange: [number, number];
  rating: number;
  concerns: string[];
  tags: string[];
  hairType?: string[];
}

export interface CartItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export type OrderStatus = 'Order Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: OrderStatus;
  customerDetails: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
}
