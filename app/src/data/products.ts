import type { Product, Ingredient, User, HairConcern, SkinConcern } from '@/types';
import { skincareProducts } from './skincareProducts';
import { bodycareProducts } from './bodycareProducts';
import { haircareProducts } from './haircareProducts';

export const products: Product[] = [
  // ── SKINCARE (50 real Indian products) ──
  ...skincareProducts,

  // HAIRCARE (50 real Indian products)
  ...haircareProducts,

  // ── BODYCARE (50 real Indian products) ──
  ...bodycareProducts
];

export const ingredients: Ingredient[] = [
  {
    id: 'ing-001',
    name: 'Hyaluronic Acid',
    benefits: ['Deep hydration', 'Plumping', 'Fine line reduction', 'Barrier support'],
    concerns: ['Dehydration', 'Aging', 'Dryness'],
    suitableFor: ['All skin types', 'Dry skin', 'Aging skin'],
    avoidIf: ['None'],
    scientificSummary: 'A humectant that can hold up to 1000x its weight in water, drawing moisture into the skin.',
    commonIn: ['Serums', 'Moisturizers', 'Toners']
  },
  {
    id: 'ing-002',
    name: 'Niacinamide',
    benefits: ['Pore minimizing', 'Oil control', 'Brightening', 'Barrier repair', 'Anti-inflammatory'],
    concerns: ['Enlarged pores', 'Oily skin', 'Uneven tone', 'Redness', 'Aging'],
    suitableFor: ['All skin types', 'Oily skin', 'Acne-prone skin'],
    avoidIf: ['When using pure Vitamin C simultaneously'],
    scientificSummary: 'Vitamin B3 that improves skin barrier function, reduces inflammation, and regulates sebum production.',
    commonIn: ['Serums', 'Moisturizers', 'Toners']
  },
  {
    id: 'ing-003',
    name: 'Retinol',
    benefits: ['Anti-aging', 'Cell turnover', 'Collagen production', 'Acne treatment', 'Texture improvement'],
    concerns: ['Wrinkles', 'Fine lines', 'Acne', 'Uneven texture', 'Dark spots'],
    suitableFor: ['Aging skin', 'Acne-prone skin', 'Normal to oily skin'],
    avoidIf: ['Pregnancy', 'Breastfeeding', 'Sensitive skin (without building tolerance)'],
    scientificSummary: 'Vitamin A derivative that increases cell turnover and stimulates collagen production.',
    commonIn: ['Serums', 'Night creams', 'Treatments']
  },
  {
    id: 'ing-004',
    name: 'Vitamin C',
    benefits: ['Brightening', 'Antioxidant protection', 'Collagen synthesis', 'Dark spot fading'],
    concerns: ['Dullness', 'Dark spots', 'Hyperpigmentation', 'Aging', 'Sun damage'],
    suitableFor: ['All skin types', 'Dull skin', 'Aging skin'],
    avoidIf: ['Extremely sensitive skin (use derivatives instead)'],
    scientificSummary: 'Potent antioxidant that neutralizes free radicals and inhibits melanin production.',
    commonIn: ['Serums', 'Moisturizers', 'Sunscreens']
  },
  {
    id: 'ing-005',
    name: 'Salicylic Acid',
    benefits: ['Pore unclogging', 'Exfoliation', 'Acne treatment', 'Oil control', 'Anti-inflammatory'],
    concerns: ['Acne', 'Blackheads', 'Whiteheads', 'Oily skin', 'Enlarged pores'],
    suitableFor: ['Oily skin', 'Acne-prone skin', 'Combination skin'],
    avoidIf: ['Dry skin', 'Eczema', 'Rosacea (in high concentrations)'],
    scientificSummary: 'BHA (beta hydroxy acid) that penetrates oil to exfoliate inside pores.',
    commonIn: ['Cleansers', 'Toners', 'Spot treatments']
  },
  {
    id: 'ing-006',
    name: 'Ceramides',
    benefits: ['Barrier repair', 'Moisture retention', 'Protection', 'Soothing'],
    concerns: ['Dryness', 'Sensitivity', 'Compromised barrier', 'Eczema'],
    suitableFor: ['All skin types', 'Dry skin', 'Sensitive skin'],
    avoidIf: ['None'],
    scientificSummary: 'Lipids that make up 50% of skin barrier, essential for maintaining moisture and protection.',
    commonIn: ['Moisturizers', 'Creams', 'Barrier repair products']
  },
  {
    id: 'ing-007',
    name: 'Peptides',
    benefits: ['Firming', 'Anti-aging', 'Collagen boost', 'Repair', 'Smoothing'],
    concerns: ['Aging', 'Loss of firmness', 'Wrinkles', 'Fine lines'],
    suitableFor: ['Aging skin', 'All skin types'],
    avoidIf: ['None'],
    scientificSummary: 'Short chains of amino acids that signal skin to produce collagen and repair itself.',
    commonIn: ['Serums', 'Anti-aging creams', 'Eye creams']
  },
  {
    id: 'ing-008',
    name: 'Glycolic Acid',
    benefits: ['Exfoliation', 'Brightening', 'Texture smoothing', 'Pore refining', 'Anti-aging'],
    concerns: ['Dullness', 'Uneven texture', 'Hyperpigmentation', 'Aging', 'Acne'],
    suitableFor: ['Normal skin', 'Oily skin', 'Aging skin'],
    avoidIf: ['Sensitive skin', 'Rosacea', 'Eczema'],
    scientificSummary: 'AHA (alpha hydroxy acid) derived from sugar cane that exfoliates skin surface.',
    commonIn: ['Toners', 'Serums', 'Peels', 'Cleansers']
  },
  {
    id: 'ing-009',
    name: 'Squalane',
    benefits: ['Hydration', 'Non-comedogenic moisture', 'Barrier support', 'Antioxidant'],
    concerns: ['Dryness', 'Dehydration', 'Compromised barrier'],
    suitableFor: ['All skin types', 'Acne-prone skin', 'Oily skin'],
    avoidIf: ['None'],
    scientificSummary: 'Hydrogenated version of squalene, a lipid naturally found in skin. Lightweight and non-irritating.',
    commonIn: ['Oils', 'Serums', 'Moisturizers']
  },
  {
    id: 'ing-010',
    name: 'Centella Asiatica',
    benefits: ['Soothing', 'Healing', 'Anti-inflammatory', 'Barrier support', 'Antioxidant'],
    concerns: ['Sensitivity', 'Redness', 'Irritation', 'Acne', 'Eczema'],
    suitableFor: ['Sensitive skin', 'Acne-prone skin', 'All skin types'],
    avoidIf: ['None'],
    scientificSummary: 'Medicinal herb (Gotu Kola) with powerful wound healing and anti-inflammatory properties.',
    commonIn: ['Serums', 'Creams', 'K-beauty products']
  },
  {
    id: 'ing-011',
    name: 'Azelaic Acid',
    benefits: ['Brightening', 'Acne treatment', 'Rosacea treatment', 'Exfoliation', 'Anti-inflammatory'],
    concerns: ['Rosacea', 'Acne', 'Hyperpigmentation', 'Uneven tone', 'Redness'],
    suitableFor: ['Sensitive skin', 'Rosacea-prone skin', 'Acne-prone skin'],
    avoidIf: ['None (very well tolerated)'],
    scientificSummary: 'Dicarboxylic acid that reduces inflammation and inhibits tyrosinase (melanin production).',
    commonIn: ['Prescription creams', 'OTC treatments', 'Serums']
  },
  {
    id: 'ing-012',
    name: 'Shea Butter',
    benefits: ['Deep moisturization', 'Nourishment', 'Protection', 'Soothing', 'Anti-inflammatory'],
    concerns: ['Dryness', 'Rough texture', 'Eczema', 'Dermatitis'],
    suitableFor: ['Dry skin', 'Normal skin', 'Body skin'],
    avoidIf: ['Very oily/acne-prone facial skin'],
    scientificSummary: 'Fat extracted from shea tree nuts, rich in fatty acids and vitamins.',
    commonIn: ['Body butters', 'Moisturizers', 'Lip balms']
  },
  {
    id: 'ing-013',
    name: 'Keratin',
    benefits: ['Strengthening', 'Repair', 'Smoothness', 'Protection', 'Structure'],
    concerns: ['Damage', 'Breakage', 'Weakness', 'Frizz'],
    suitableFor: ['Damaged hair', 'Processed hair', 'All hair types'],
    avoidIf: ['Protein-sensitive hair (can cause stiffness)'],
    scientificSummary: 'Structural protein that makes up hair, skin, and nails. Helps rebuild damaged hair structure.',
    commonIn: ['Hair masks', 'Conditioners', 'Leave-in treatments']
  },
  {
    id: 'ing-014',
    name: 'Biotin',
    benefits: ['Hair growth', 'Strength', 'Thickness', 'Nail health'],
    concerns: ['Hair loss', 'Thinning', 'Weak hair', 'Brittle nails'],
    suitableFor: ['All hair types', 'Thinning hair'],
    avoidIf: ['None'],
    scientificSummary: 'Vitamin B7 that supports keratin infrastructure and promotes healthy hair growth.',
    commonIn: ['Hair growth serums', 'Supplements', 'Shampoos']
  },
  {
    id: 'ing-015',
    name: 'Argan Oil',
    benefits: ['Moisture', 'Shine', 'Frizz control', 'Heat protection', 'Nourishment'],
    concerns: ['Dryness', 'Frizz', 'Dullness', 'Damage'],
    suitableFor: ['Dry hair', 'Curly hair', 'Damaged hair'],
    avoidIf: ['Very fine/oily hair (use sparingly)'],
    scientificSummary: 'Oil from Moroccan argan tree, rich in fatty acids, vitamin E, and antioxidants.',
    commonIn: ['Hair oils', 'Serums', 'Conditioners']
  }
];

export const hairConcerns: HairConcern[] = [
  {
    id: 'hc-frizz',
    name: 'Frizz',
    description: 'Unmanageable, flyaway hair caused by humidity or dryness',
    recommendedIngredients: ['Silicones', 'Argan Oil', 'Shea Butter', 'Keratin'],
    avoidIngredients: ['Sulfates', 'Alcohol', 'Salt sprays']
  },
  {
    id: 'hc-hairfall',
    name: 'Hair Fall',
    description: 'Excessive shedding and hair loss',
    recommendedIngredients: ['Biotin', 'Caffeine', 'Peptides', 'Rosemary Oil', 'Niacinamide'],
    avoidIngredients: ['Harsh sulfates', 'Heavy silicones', 'Drying alcohols']
  },
  {
    id: 'hc-dryness',
    name: 'Dryness',
    description: 'Lack of moisture leading to brittle, dull hair',
    recommendedIngredients: ['Coconut Oil', 'Shea Butter', 'Hyaluronic Acid', 'Argan Oil'],
    avoidIngredients: ['Sulfates', 'Clarifying shampoos', 'Alcohol-based products']
  },
  {
    id: 'hc-dandruff',
    name: 'Dandruff',
    description: 'Flaky, itchy scalp condition',
    recommendedIngredients: ['Zinc Pyrithione', 'Tea Tree Oil', 'Salicylic Acid', 'Ketoconazole'],
    avoidIngredients: ['Heavy oils', 'Fragrance', 'Harsh sulfates']
  },
  {
    id: 'hc-damage',
    name: 'Damage Repair',
    description: 'Chemically or heat-damaged hair needing restoration',
    recommendedIngredients: ['Keratin', 'Bond builders', 'Protein', 'Ceramides', 'Amino Acids'],
    avoidIngredients: ['Heat styling', 'Harsh chemicals', 'Bleach']
  }
];

export const skinConcerns: SkinConcern[] = [
  {
    id: 'sc-acne',
    name: 'Acne',
    description: 'Breakouts, pimples, and clogged pores',
    recommendedIngredients: ['Salicylic Acid', 'Benzoyl Peroxide', 'Niacinamide', 'Tea Tree Oil'],
    avoidIngredients: ['Comedogenic oils', 'Heavy butters', 'Fragrance']
  },
  {
    id: 'sc-aging',
    name: 'Anti-Aging',
    description: 'Fine lines, wrinkles, and loss of firmness',
    recommendedIngredients: ['Retinol', 'Peptides', 'Vitamin C', 'Hyaluronic Acid'],
    avoidIngredients: ['Harsh physical scrubs', 'Drying alcohols']
  },
  {
    id: 'sc-hydration',
    name: 'Hydration',
    description: 'Dry, dehydrated skin needing moisture',
    recommendedIngredients: ['Hyaluronic Acid', 'Ceramides', 'Glycerin', 'Squalane'],
    avoidIngredients: ['Alcohol', 'Harsh sulfates', 'Over-exfoliation']
  },
  {
    id: 'sc-brightening',
    name: 'Brightening',
    description: 'Dull skin, dark spots, and uneven tone',
    recommendedIngredients: ['Vitamin C', 'Niacinamide', 'Azelaic Acid', 'Licorice Root'],
    avoidIngredients: ['Harsh physical exfoliants', 'Unprotected sun exposure']
  },
  {
    id: 'sc-sensitive',
    name: 'Sensitivity',
    description: 'Easily irritated, reactive skin',
    recommendedIngredients: ['Centella Asiatica', 'Ceramides', 'Allantoin', 'Panthenol'],
    avoidIngredients: ['Fragrance', 'Essential oils', 'Alcohol', 'Harsh acids']
  }
];

export const sampleUser: User = {
  id: 'user-001',
  name: 'Guest User',
  email: 'guest@prism.com',
  skinType: 'Combination',
  hairType: 'Wavy',
  concerns: ['Hydration', 'Frizz'],
  savedProducts: [],
  recentSearches: [],
  joinedAt: new Date().toISOString()
};
