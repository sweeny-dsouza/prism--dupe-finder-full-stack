import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Product, DupeMatch, Comparison, Ingredient } from '@/types';
import { ingredients } from '@/data/products';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Dupe Matching Algorithm
export function calculateDupeMatches(
  originalProduct: Product,
  allProducts: Product[],
  limit: number = 5
): DupeMatch[] {
  const matches: DupeMatch[] = [];

  for (const potentialDupe of allProducts) {
    // Skip if same product or same brand
    if (potentialDupe.id === originalProduct.id) continue;
    if (potentialDupe.brand === originalProduct.brand) continue;

    // Only match within same category
    if (potentialDupe.category !== originalProduct.category) continue;

    // Calculate individual match scores
    const ingredientMatch = calculateIngredientMatch(originalProduct, potentialDupe);
    const textureMatch = calculateTextureMatch(originalProduct, potentialDupe);
    const concernMatch = calculateConcernMatch(originalProduct, potentialDupe);
    const typeMatch = calculateTypeMatch(originalProduct, potentialDupe);
    const ratingMatch = calculateRatingMatch(originalProduct, potentialDupe);

    // Weighted similarity score
    const similarityScore = Math.round(
      ingredientMatch * 0.40 + // Increased weight for ingredients
      textureMatch * 0.15 +
      concernMatch * 0.20 +
      typeMatch * 0.15 +
      ratingMatch * 0.10
    );

    if (similarityScore >= 55) { // Lowered from 60 to accommodate shorter Ayurvedic lists
      const sharedIngredients = getSharedIngredients(originalProduct, potentialDupe);
      const savings = originalProduct.price - potentialDupe.price;
      const savingsPercentage = Math.round((savings / originalProduct.price) * 100);

      matches.push({
        originalProduct,
        dupeProduct: potentialDupe,
        similarityScore,
        ingredientMatch,
        textureMatch,
        concernMatch,
        typeMatch,
        ratingMatch,
        savings: savings > 0 ? savings : 0,
        savingsPercentage: savings > 0 ? savingsPercentage : 0,
        whyItMatches: generateWhyItMatches(originalProduct, potentialDupe, sharedIngredients, similarityScore),
        sharedIngredients
      });
    }
  }

  // Sort by similarity score (highest first)
  return matches
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, limit);
}

const ingredientSynonyms: Record<string, string[]> = {
  'bhringraj': ['eclipta alba', 'false daisy'],
  'amla': ['gooseberry', 'indian gooseberry', 'phyllanthus emblica'],
  'brahmi': ['bacopa monnieri'],
  'shikakai': ['acacia concinna'],
  'neem': ['azadirachta indica']
};

function normalizeIngredient(name: string): string {
  const lower = name.toLowerCase().trim();
  for (const [canonical, synonyms] of Object.entries(ingredientSynonyms)) {
    if (lower === canonical || synonyms.includes(lower)) {
      return canonical;
    }
  }
  return lower;
}

function calculateIngredientMatch(productA: Product, productB: Product): number {
  const setA = new Set(productA.ingredients.map(i => normalizeIngredient(i)));
  const setB = new Set(productB.ingredients.map(i => normalizeIngredient(i)));

  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);

  return union.size > 0 ? Math.round((intersection.size / union.size) * 100) : 0;
}

function calculateTextureMatch(productA: Product, productB: Product): number {
  if (!productA.texture || !productB.texture) return 50;

  const textureMap: Record<string, string[]> = {
    'Lightweight gel': ['Gel-cream', 'Watery serum', 'Lightweight serum'],
    'Rich cream': ['Light cream', 'Cream serum', 'Balm'],
    'Gel-cream': ['Lightweight gel', 'Watery essence'],
    'Watery essence': ['Watery serum', 'Liquid toner'],
    'Light oil': ['Dry oil'],
    'Balm': ['Rich cream', 'Heavy cream']
  };

  if (productA.texture === productB.texture) return 100;

  const similarTextures = textureMap[productA.texture] || [];
  return similarTextures.includes(productB.texture) ? 75 : 40;
}

function calculateConcernMatch(productA: Product, productB: Product): number {
  const setA = new Set(productA.concerns.map(c => c.toLowerCase()));
  const setB = new Set(productB.concerns.map(c => c.toLowerCase()));

  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);

  return union.size > 0 ? Math.round((intersection.size / union.size) * 100) : 0;
}

function calculateTypeMatch(productA: Product, productB: Product): number {
  let score = 0;

  // Same subcategory
  if (productA.subcategory === productB.subcategory) score += 50;

  // Same hair type compatibility (for haircare)
  if (productA.hairType && productB.hairType) {
    const sharedHairTypes = productA.hairType.filter(h => productB.hairType?.includes(h));
    score += (sharedHairTypes.length / Math.max(productA.hairType.length, productB.hairType.length)) * 30;
  }

  // Same body routine step (for bodycare)
  if (productA.bodyRoutineStep && productB.bodyRoutineStep) {
    score += productA.bodyRoutineStep === productB.bodyRoutineStep ? 20 : 0;
  }

  return Math.min(100, Math.round(score));
}

function calculateRatingMatch(productA: Product, productB: Product): number {
  const diff = Math.abs(productA.rating - productB.rating);
  return Math.max(0, 100 - (diff * 20));
}

function getSharedIngredients(productA: Product, productB: Product): string[] {
  const setA = new Set(productA.ingredients.map(i => i.toLowerCase()));
  return productB.ingredients.filter(i => setA.has(i.toLowerCase()));
}

function generateWhyItMatches(
  _original: Product,
  dupe: Product,
  sharedIngredients: string[],
  score: number
): string {
  if (score >= 90) {
    return `Nearly identical formula with ${sharedIngredients.length} shared key ingredients. Delivers comparable results at a fraction of the price.`;
  } else if (score >= 80) {
    return `Strong ingredient overlap including ${sharedIngredients.slice(0, 2).join(' and ')}. Similar texture and benefits for noticeable savings.`;
  } else if (score >= 70) {
    return `Good match with ${sharedIngredients.length} shared actives. Comparable performance for ${dupe.budgetLevel}-budget alternative.`;
  } else {
    return `Decent alternative with some ingredient overlap. Great option for trying similar benefits on a budget.`;
  }
}

// Search and Filter Functions
export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) return products;

  const normalizedQuery = query.toLowerCase().trim();
  const terms = normalizedQuery.split(' ');

  return products.filter(product => {
    const searchText = `
      ${product.name} ${product.brand} ${product.category} 
      ${product.subcategory} ${product.ingredients.join(' ')} 
      ${product.concerns.join(' ')} ${product.benefits.join(' ')}
    `.toLowerCase();

    // Fuzzy matching - at least 70% of terms should match
    const matchingTerms = terms.filter(term => searchText.includes(term));
    return matchingTerms.length >= Math.ceil(terms.length * 0.7) ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.brand.toLowerCase().includes(normalizedQuery);
  });
}

export function filterProducts(
  products: Product[],
  filters: {
    category?: string[];
    priceRange?: [number, number];
    rating?: number;
    concerns?: string[];
    tags?: string[];
    hairType?: string[];
    isLuxury?: boolean;
  }
): Product[] {
  return products.filter(product => {
    if (filters.category?.length && !filters.category.includes(product.category)) return false;
    if (filters.priceRange && (product.price < filters.priceRange[0] || product.price > filters.priceRange[1])) return false;
    if (filters.rating && product.rating < filters.rating) return false;
    if (filters.concerns?.length && !filters.concerns.some(c => product.concerns.includes(c))) return false;
    if (filters.tags?.length && !filters.tags.some(t => product.tags.includes(t))) return false;
    if (filters.hairType?.length && !filters.hairType.some(h => product.hairType?.includes(h))) return false;
    if (filters.isLuxury !== undefined && product.isLuxury !== filters.isLuxury) return false;
    return true;
  });
}

// Comparison Functions
export function compareProducts(productA: Product, productB: Product): Comparison {
  const setA = new Set(productA.ingredients.map(i => i.toLowerCase()));
  const setB = new Set(productB.ingredients.map(i => i.toLowerCase()));

  const sharedIngredients = productA.ingredients.filter(i => setB.has(i.toLowerCase()));
  const uniqueToA = productA.ingredients.filter(i => !setB.has(i.toLowerCase()));
  const uniqueToB = productB.ingredients.filter(i => !setA.has(i.toLowerCase()));

  const priceDifference = productA.price - productB.price;
  let betterValue: 'A' | 'B' | 'equal' | null = null;

  if (Math.abs(priceDifference) < 5) {
    betterValue = 'equal';
  } else if (priceDifference > 10) {
    betterValue = 'B';
  } else if (priceDifference < -10) {
    betterValue = 'A';
  }

  return {
    productA,
    productB,
    sharedIngredients,
    uniqueToA,
    uniqueToB,
    priceDifference,
    betterValue
  };
}

// Ingredient Functions
export function getIngredientByName(name: string): Ingredient | undefined {
  return ingredients.find(i =>
    i.name.toLowerCase() === name.toLowerCase() ||
    name.toLowerCase().includes(i.name.toLowerCase())
  );
}

export function searchIngredients(query: string): Ingredient[] {
  if (!query.trim()) return ingredients;

  const normalizedQuery = query.toLowerCase().trim();
  return ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(normalizedQuery) ||
    ingredient.benefits.some(b => b.toLowerCase().includes(normalizedQuery)) ||
    ingredient.commonIn.some(c => c.toLowerCase().includes(normalizedQuery))
  );
}

// Routine Generator
export function generateRoutine(
  goal: string,
  _skinType?: string,
  _hairType?: string,
  allProducts: Product[] = []
): { steps: any[]; estimatedCost: number; estimatedSavings: number } {
  const steps: any[] = [];
  let estimatedCost = 0;
  let estimatedSavings = 0;

  const goalLower = goal.toLowerCase();

  if (goalLower.includes('hydration') || goalLower.includes('dry')) {
    // Skincare hydration routine
    const cleanser = allProducts.find(p => p.subcategory === 'cleanser' && p.concerns.includes('Dryness'));
    const serum = allProducts.find(p => p.subcategory === 'serum' && p.ingredients.includes('Hyaluronic Acid'));
    const moisturizer = allProducts.find(p => p.subcategory === 'moisturizer' && p.ingredients.includes('Ceramides'));

    if (cleanser) {
      steps.push({ order: 1, name: 'Gentle Cleanse', description: 'Cleanse without stripping moisture', product: cleanser, timeOfDay: 'both' });
      estimatedCost += cleanser.price;
    }
    if (serum) {
      steps.push({ order: 2, name: 'Hydrating Serum', description: 'Deep hydration with hyaluronic acid', product: serum, timeOfDay: 'both' });
      estimatedCost += serum.price;
    }
    if (moisturizer) {
      steps.push({ order: 3, name: 'Barrier Repair Moisturizer', description: 'Lock in moisture and repair barrier', product: moisturizer, timeOfDay: 'both' });
      estimatedCost += moisturizer.price;
    }
  } else if (goalLower.includes('acne')) {
    // Acne routine
    const cleanser = allProducts.find(p => p.ingredients.includes('Salicylic Acid'));
    const treatment = allProducts.find(p => p.subcategory === 'treatment' && p.ingredients.includes('Niacinamide'));
    const moisturizer = allProducts.find(p => p.tags.includes('oil-free'));

    if (cleanser) {
      steps.push({ order: 1, name: 'BHA Cleanse', description: 'Deep pore cleansing', product: cleanser, timeOfDay: 'both' });
      estimatedCost += cleanser.price;
    }
    if (treatment) {
      steps.push({ order: 2, name: 'Acne Treatment', description: 'Target breakouts and inflammation', product: treatment, timeOfDay: 'evening' });
      estimatedCost += treatment.price;
    }
    if (moisturizer) {
      steps.push({ order: 3, name: 'Oil-Free Moisturizer', description: 'Lightweight hydration', product: moisturizer, timeOfDay: 'both' });
      estimatedCost += moisturizer.price;
    }
  } else if (goalLower.includes('anti-aging') || goalLower.includes('aging')) {
    // Anti-aging routine
    const cleanser = allProducts.find(p => p.subcategory === 'cleanser');
    const serum = allProducts.find(p => p.ingredients.includes('Retinol'));
    const moisturizer = allProducts.find(p => p.ingredients.includes('Peptides'));

    if (cleanser) {
      steps.push({ order: 1, name: 'Gentle Cleanse', description: 'Prepare skin for treatment', product: cleanser, timeOfDay: 'both' });
      estimatedCost += cleanser.price;
    }
    if (serum) {
      steps.push({ order: 2, name: 'Retinol Treatment', description: 'Boost cell turnover and collagen', product: serum, timeOfDay: 'evening' });
      estimatedCost += serum.price;
    }
    if (moisturizer) {
      steps.push({ order: 3, name: 'Peptide Moisturizer', description: 'Firm and hydrate', product: moisturizer, timeOfDay: 'both' });
      estimatedCost += moisturizer.price;
    }
  } else if (goalLower.includes('hair') && goalLower.includes('frizz')) {
    // Anti-frizz hair routine
    const shampoo = allProducts.find(p => p.subcategory === 'shampoo' && p.concerns.includes('Frizz'));
    const conditioner = allProducts.find(p => p.subcategory === 'conditioner');
    const serum = allProducts.find(p => p.subcategory === 'styling' && p.concerns.includes('Frizz'));

    if (shampoo) {
      steps.push({ order: 1, name: 'Smoothing Shampoo', description: 'Cleanse and prep for smoothness', product: shampoo, timeOfDay: 'both' });
      estimatedCost += shampoo.price;
    }
    if (conditioner) {
      steps.push({ order: 2, name: 'Hydrating Conditioner', description: 'Detangle and moisturize', product: conditioner, timeOfDay: 'both' });
      estimatedCost += conditioner.price;
    }
    if (serum) {
      steps.push({ order: 3, name: 'Frizz Control Serum', description: 'Seal and protect from humidity', product: serum, timeOfDay: 'both' });
      estimatedCost += serum.price;
    }
  }

  // Calculate potential savings (assuming luxury alternatives would cost 3x)
  estimatedSavings = estimatedCost * 2;

  return { steps, estimatedCost, estimatedSavings };
}

// Local Storage Helpers
export function getSavedProducts(): string[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('prism_saved_products');
  return saved ? JSON.parse(saved) : [];
}

export function saveProduct(productId: string): void {
  if (typeof window === 'undefined') return;
  const saved = getSavedProducts();
  if (!saved.includes(productId)) {
    saved.push(productId);
    localStorage.setItem('prism_saved_products', JSON.stringify(saved));
    window.dispatchEvent(new CustomEvent('local-storage-update', { 
      detail: { key: 'prism_saved_products', newValue: saved } 
    }));
  }
}

export function removeSavedProduct(productId: string): void {
  if (typeof window === 'undefined') return;
  const saved = getSavedProducts();
  const filtered = saved.filter(id => id !== productId);
  localStorage.setItem('prism_saved_products', JSON.stringify(filtered));
  window.dispatchEvent(new CustomEvent('local-storage-update', { 
    detail: { key: 'prism_saved_products', newValue: filtered } 
  }));
}

export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  const searches = localStorage.getItem('prism_recent_searches');
  return searches ? JSON.parse(searches) : [];
}

export function addRecentSearch(query: string): void {
  if (typeof window === 'undefined') return;
  const searches = getRecentSearches();
  const filtered = searches.filter(s => s.toLowerCase() !== query.toLowerCase());
  filtered.unshift(query);
  const limited = filtered.slice(0, 10);
  localStorage.setItem('prism_recent_searches', JSON.stringify(limited));
  window.dispatchEvent(new CustomEvent('local-storage-update', { 
    detail: { key: 'prism_recent_searches', newValue: limited } 
  }));
}

export function clearRecentSearches(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('prism_recent_searches');
  window.dispatchEvent(new CustomEvent('local-storage-update', { 
    detail: { key: 'prism_recent_searches', newValue: [] } 
  }));
}

// Formatting Helpers
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function formatSavings(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function getBudgetLabel(level: 'low' | 'medium' | 'premium'): string {
  const labels = {
    low: 'Budget-Friendly',
    medium: 'Mid-Range',
    premium: 'Premium'
  };
  return labels[level];
}

export function getBudgetColor(level: 'low' | 'medium' | 'premium'): string {
  const colors = {
    low: 'bg-emerald-100 text-emerald-800',
    medium: 'bg-amber-100 text-amber-800',
    premium: 'bg-rose-100 text-rose-800'
  };
  return colors[level];
}

// Animation Helpers
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleOnHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 }
};
