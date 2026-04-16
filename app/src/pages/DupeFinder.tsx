import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, TrendingDown, Star, Heart, Sparkles, ShoppingBag, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import SearchAutocomplete from '@/components/SearchAutocomplete';
import { calculateDupeMatches, formatPrice } from '@/lib/utils';
import { useSavedProducts, useCart } from '@/hooks/useLocalStorage';
import { useProducts, API_BASE_URL } from '@/hooks/useApi';
import SafeImage from '@/components/ui/SafeImage';
import type { Product, DupeMatch } from '@/types';

const categories = ['All', 'Skincare', 'Haircare', 'Bodycare'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹1,500', min: 500, max: 1500 },
  { label: '₹1,500 - ₹3,000', min: 1500, max: 3000 },
  { label: 'Over ₹3,000', min: 3000, max: Infinity },
];

export default function DupeFinder() {
  const { products, loading: productsLoading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dupeMatches, setDupeMatches] = useState<DupeMatch[]>([]);
  const { toggleSaved, isSaved } = useSavedProducts();
  const { addToCart } = useCart();

  // Handle initial search from URL
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchQuery(q);
      handleSearch(q);
    }
  }, []);

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      try {
        // Fix: Use the correct endpoint and parameter name
        const response = await fetch(`${API_BASE_URL}/products?search=${query}`);
        const results = await response.json();
        
        if (results && results.length > 0) {
          const product = results[0];
          setSelectedProduct(product);
          // If we found a specific product, we should ideally show its category
          // to make the results consistent with the UI filters
          if (product.category) {
            const displayCategory = product.category.charAt(0).toUpperCase() + product.category.slice(1);
            if (categories.includes(displayCategory)) {
              setSelectedCategory(displayCategory);
            } else {
              setSelectedCategory('All');
            }
          }
          
          // Calculate matches against the full backend list
          const matches = calculateDupeMatches(product, products, 10);
          setDupeMatches(matches);
        } else {
          setSelectedProduct(null);
          setDupeMatches([]);
          toast.error("Product not found", {
            description: "Try searching for another premium brand or product."
          });
        }
      } catch (err) {
        console.error("Search error:", err);
        toast.error("Search failed", {
          description: "There was a problem connecting to our matching engine."
        });
      }
    }
  };



  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let filtered = products;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory.toLowerCase());
    }

    filtered = filtered.filter(p =>
      p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max
    );

    return filtered;
  }, [products, selectedCategory, selectedPriceRange]);


  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen pt-24 pb-16 bg-background dark:bg-[#0f0f12] text-foreground dark:text-white transition-colors duration-300 ${productsLoading ? 'opacity-50' : ''}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Luxury Hero Section */}
        <section className="py-12 lg:py-24 flex flex-col items-center relative overflow-hidden">
          {/* Background Decorative Blobs */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-24 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px] -ml-48 -mb-24 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl relative z-10 text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-7xl font-bold text-foreground dark:text-white mb-6 leading-tight tracking-tight transition-colors"
            >
              Every Product <br /> has an <span className="text-primary italic">Alternative.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg lg:text-xl text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors"
            >
              Unlock the secrets of formulation beauty. Find high-performance
              luxury alternatives without the luxury price tag.
            </motion.p>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-[#17171c] p-3 rounded-[2.5rem] shadow-soft border border-primary/10 dark:border-white/10">
                <SearchAutocomplete
                  initialValue={searchQuery}
                  onSearch={handleSearch}
                  placeholder="Paste a luxury product link or name..."
                  className="w-full"
                  showButton={true}
                  inputClassName="bg-transparent border-none !pr-32 !py-7 !text-lg"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Filters & Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-16 sticky top-20 lg:top-24 z-30 py-4 -mx-4 px-4 bg-background/80 dark:bg-[#0f0f12]/80 backdrop-blur-xl border-b border-primary/5 dark:border-white/5"
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="flex gap-1.5 p-1 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-primary/5 dark:border-white/5 shadow-sm">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${selectedCategory === cat
                      ? 'bg-primary text-white shadow-md'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="flex gap-1 p-1 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-primary/5 dark:border-white/5 shadow-sm overflow-x-auto no-scrollbar max-w-[90vw] md:max-w-none">
                {priceRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => setSelectedPriceRange(range)}
                    className={`px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider font-bold whitespace-nowrap transition-all duration-300 ${selectedPriceRange.label === range.label
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground/60 hover:text-primary hover:bg-primary/5'
                      }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {selectedProduct ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Selected Product Header */}
            <div className="bg-white dark:bg-[#17171c] rounded-[2rem] p-8 border border-primary/10 dark:border-white/10 shadow-soft">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-white dark:bg-[#1a1a21] p-3 shadow-sm flex items-center justify-center border border-primary/5 dark:border-white/5">
                    <SafeImage
                      src={selectedProduct.imageUrl}
                      alt={selectedProduct.name}
                      className="w-full h-full object-contain"
                      fallbackCategory={selectedProduct.category as any}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary/40 uppercase tracking-widest mb-1">Target Product</p>
                    <h2 className="text-3xl font-bold text-foreground dark:text-white">{selectedProduct.name}</h2>
                    <p className="text-muted-foreground dark:text-gray-400 leading-relaxed">{selectedProduct.brand}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    setDupeMatches([]);
                    setSearchQuery('');
                    setSearchParams({});
                  }}
                  className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center hover:bg-primary group-hover:bg-primary transition-all"
                >
                  <X className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>

            {/* Similar Products heading */}
            {dupeMatches.length > 0 && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground dark:text-white mb-2">Similar Products</h2>
                <p className="text-muted-foreground dark:text-gray-400 text-sm">
                  Explore affordable alternatives to {selectedProduct.name}
                </p>
              </div>
            )}

            {/* Dupe Matches Grid */}
            {dupeMatches.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {dupeMatches.map((match, index) => (
                    <motion.div
                      key={match.dupeProduct.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="h-full flex flex-col"
                    >
                      <div className="bg-white dark:bg-[#17171c] rounded-[2rem] overflow-hidden border border-primary/10 dark:border-white/10 shadow-soft hover:shadow-medium hover:-translate-y-1.5 transition-all duration-500 group h-full flex flex-col">

                        {/* Image + compatibility badge row */}
                        <div className="flex gap-5 p-6 pb-4">
                          {/* Thumbnail */}
                          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/10 dark:from-white/5 dark:to-white/10 p-2 shadow-sm shrink-0 border border-primary/5 dark:border-white/5 flex items-center justify-center">
                            <SafeImage
                              src={match.dupeProduct.imageUrl}
                              alt={match.dupeProduct.name}
                              className="w-full h-full object-contain"
                              fallbackCategory={match.dupeProduct.category as any}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Compatibility badge */}
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold mb-2 border border-primary/10">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                              {match.similarityScore}% Compatibility
                            </div>
                            <h4 className="font-bold text-foreground dark:text-white leading-tight line-clamp-2 text-base mb-1">{match.dupeProduct.name}</h4>
                            <p className="text-xs text-primary/50 dark:text-[#ffb6c1]/50 font-bold uppercase tracking-widest">{match.dupeProduct.brand}</p>
                          </div>

                          {/* Wishlist */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleSaved(match.dupeProduct.id);
                            }}
                            className="w-9 h-9 rounded-full bg-primary/5 dark:bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-all self-start shrink-0"
                          >
                            <Heart
                              className={`w-4 h-4 ${isSaved(match.dupeProduct.id) ? 'fill-primary text-primary' : 'text-primary/40'}`}
                            />
                          </button>
                        </div>

                        <div className="px-6 pb-6 flex flex-col flex-1">
                          {/* Price row */}
                          <div className="flex items-center gap-2.5 mb-4">
                            <span className="text-2xl font-bold text-foreground dark:text-white">
                              {formatPrice(match.dupeProduct.price)}
                            </span>
                            <span className="text-xs text-muted-foreground/40 line-through">
                              {formatPrice(match.originalProduct.price)}
                            </span>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider ml-auto">
                              <TrendingDown className="w-3 h-3" />
                              Save {formatPrice(match.savings)}
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-[13px] text-muted-foreground dark:text-gray-400 font-light mb-4 line-clamp-2 italic leading-relaxed">
                            "{match.whyItMatches}"
                          </p>

                          {/* Shared Actives */}
                          <div className="mb-5">
                            <p className="text-[9px] font-bold text-primary/40 uppercase tracking-widest mb-2">Shared Actives</p>
                            <div className="flex flex-wrap gap-1.5">
                              {match.sharedIngredients.slice(0, 3).map((ing) => (
                                <span
                                  key={ing}
                                  className="px-2.5 py-1 rounded-full bg-primary/5 dark:bg-white/5 text-[10px] text-primary/70 dark:text-white/70 font-medium"
                                >
                                  {ing}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Compatibility progress bar */}
                          <div className="space-y-2 mb-6">
                            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-bold text-primary/40">
                              <span>Match Score</span>
                              <span>{match.similarityScore}%</span>
                            </div>
                            <div className="h-2.5 w-full bg-primary/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${match.similarityScore}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full shadow-[0_0_10px_rgba(122,28,58,0.3)]"
                              />
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="mt-auto flex gap-2">
                            <Button
                              onClick={() => window.location.href = `/product/${match.dupeProduct.id}`}
                              className="flex-1 rounded-xl bg-primary/5 dark:bg-white/5 text-primary dark:text-white border border-primary/10 dark:border-white/10 py-5 hover:bg-primary/10 transition-all font-bold text-xs"
                            >
                              Details
                            </Button>
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                addToCart(match.dupeProduct);
                                toast.success("Item added to cart", {
                                  description: `${match.dupeProduct.name} by ${match.dupeProduct.brand}`,
                                  action: {
                                    label: "View Cart",
                                    onClick: () => window.location.href = '/cart'
                                  }
                                });
                              }}
                              className="flex-1 rounded-xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] py-5 hover:opacity-90 shadow-soft group-hover:shadow-medium font-bold flex gap-2 text-xs"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              To Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-24 bg-white dark:bg-[#17171c] rounded-[3rem] border border-primary/10 dark:border-white/10">
                <Sparkles className="w-12 h-12 text-primary/20 mx-auto mb-6" />
                <p className="text-xl font-bold text-foreground dark:text-white pb-1">Our matching engine is busy.</p>
                <p className="text-muted-foreground dark:text-gray-400 leading-relaxed">Try another premium product link or name.</p>
              </div>
            )}
          </motion.div>
        ) : (
          /* Browse/Discovery State */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-8 border-b border-primary/5 dark:border-white/5 pb-6 transition-colors">
              <h2 className="text-2xl font-bold text-foreground dark:text-white transition-colors">
                Discovery Results <span className="text-lg text-primary/40 dark:text-[#ffb6c1]/40 ml-2 uppercase tracking-[0.2em] font-bold transition-colors">{filteredProducts.length} Selections</span>
              </h2>
            </div>

            {/* Premium Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.slice(0, 12).map((product: Product, index: number) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="bg-white dark:bg-[#17171c] rounded-[1.5rem] overflow-hidden border border-primary/10 dark:border-white/10 shadow-soft hover:shadow-[0_20px_60px_rgba(122,28,58,0.14)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">

                      {/* Image Container — square aspect */}
                      <div className="relative aspect-square bg-gradient-to-br from-[#fdf8f5] to-[#f5eff4] dark:from-[#1a1a21] dark:to-[#17171c] overflow-hidden">
                        {/* Hover glow overlay */}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                        <SafeImage
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-contain p-5 group-hover:scale-108 transition-transform duration-700 ease-out z-0"
                          fallbackCategory={product.category as any}
                        />

                        {/* Discount badge */}
                        {(product as any).originalPrice && (
                          <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                            Save {Math.round(((product as any).originalPrice - product.price) / (product as any).originalPrice * 100)}%
                          </div>
                        )}

                        {/* Wishlist button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaved(product.id);
                          }}
                          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/90 dark:bg-[#17171c]/90 backdrop-blur-sm border border-primary/10 dark:border-white/10 flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-sm"
                        >
                          <Heart className={`w-4 h-4 transition-colors ${isSaved(product.id) ? 'fill-primary text-primary' : 'text-primary/40'}`} />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="p-5 flex flex-col flex-1">
                        {/* Brand */}
                        <p className="text-[10px] font-bold text-primary/50 dark:text-[#ffb6c1]/50 uppercase tracking-[0.2em] mb-1.5">{product.brand}</p>

                        {/* Product name */}
                        <h4
                          className="font-bold text-[15px] text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-[#ffb6c1] transition-colors leading-snug mb-3 line-clamp-2 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            const matches = calculateDupeMatches(product, products, 10);
                            setDupeMatches(matches);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          {product.name}
                        </h4>

                        {/* Hair type tags */}
                        {(product as any).hairType && (product as any).hairType.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {(product as any).hairType.slice(0, 3).map((ht: string) => (
                              <span
                                key={ht}
                                className="text-[9px] font-bold px-2.5 py-1 rounded-full border border-primary/15 dark:border-white/10 text-primary/60 dark:text-[#ffb6c1]/60 uppercase tracking-widest bg-primary/5 dark:bg-white/5"
                              >
                                {ht}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Rating */}
                        <div className="flex items-center gap-1.5 mb-4">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-primary text-primary dark:fill-[#ffb6c1] dark:text-[#ffb6c1]' : 'text-primary/10 dark:text-white/10'} transition-colors`} />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-primary/50 dark:text-[#ffb6c1]/50 leading-none">{product.rating}</span>
                        </div>

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* Price + CTA */}
                        <div className="border-t border-primary/5 dark:border-white/5 pt-4 space-y-3">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-foreground dark:text-white">{formatPrice(product.price)}</span>
                            {(product as any).originalPrice && (
                              <span className="text-xs text-muted-foreground/40 line-through">{formatPrice((product as any).originalPrice)}</span>
                            )}
                          </div>

                          {/* Add to Cart button */}
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                              toast.success("Item added to cart", {
                                description: `${product.name} by ${product.brand}`,
                                action: {
                                  label: "View Cart",
                                  onClick: () => window.location.href = '/cart'
                                }
                              });
                            }}
                            className="w-full rounded-2xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] py-5 hover:opacity-90 hover:shadow-lg transition-all font-bold text-sm flex items-center justify-center gap-2 group/btn"
                          >
                            <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                            Add to Cart
                          </Button>

                          {/* Find dupes link */}
                          <button
                            onClick={() => {
                              setSelectedProduct(product);
                              const matches = calculateDupeMatches(product, products, 10);
                              setDupeMatches(matches);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="w-full flex items-center justify-center gap-1 text-[11px] font-bold text-primary/50 dark:text-[#ffb6c1]/50 hover:text-primary dark:hover:text-[#ffb6c1] transition-colors uppercase tracking-wider py-1"
                          >
                            Find Dupes
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white dark:bg-[#17171c] rounded-[3rem] border border-primary/10 dark:border-white/10">
                <Sparkles className="w-12 h-12 text-primary/20 mx-auto mb-6" />
                <p className="text-xl font-bold text-foreground dark:text-white pb-1">No products found for this selection.</p>
                <p className="text-muted-foreground dark:text-gray-400 leading-relaxed">Try adjusting your category or price filters.</p>
              </div>
            )}

            {filteredProducts.length > 12 && (
              <div className="mt-16 text-center">
                <Button variant="ghost" className="rounded-full px-12 py-6 bg-white border border-primary/10 text-primary font-bold hover:bg-primary/5">
                  Reveal More Products
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}
