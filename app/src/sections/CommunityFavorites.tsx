import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, TrendingDown, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { calculateDupeMatches, formatPrice } from '@/lib/utils';
import { useSavedProducts } from '@/hooks/useLocalStorage';
import SafeImage from '@/components/ui/SafeImage';

export default function CommunityFavorites() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toggleSaved, isSaved } = useSavedProducts();

  // Get trending dupes (products with highest savings and good ratings)
  const trendingProducts = products
    .filter(p => p.originalPrice && p.originalPrice > p.price)
    .sort((a, b) => {
      const savingsA = (a.originalPrice! - a.price) / a.originalPrice!;
      const savingsB = (b.originalPrice! - b.price) / b.originalPrice!;
      return savingsB - savingsA;
    })
    .slice(0, 6);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-background dark:bg-[#0f0f12] overflow-hidden transition-colors duration-300">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-primary/5 dark:bg-white/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12"
        >
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary dark:text-[#ffb6c1] text-sm font-medium mb-4 transition-colors">
              Trending Now
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground dark:text-white mb-2 transition-colors">
              Community favorites
            </h2>
            <p className="text-lg text-muted-foreground dark:text-gray-400 transition-colors">
              Most-saved dupes this week
            </p>
          </div>
          <Link to="/dupe-finder" className="mt-4 lg:mt-0">
            <Button variant="ghost" className="text-primary dark:text-[#ffb6c1] hover:text-primary/80 dark:hover:text-[#ffc0cb] hover:bg-secondary dark:hover:bg-white/5 transition-all">
              Explore all dupes
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingProducts.map((product, index) => {
            const savings = product.originalPrice! - product.price;
            const savingsPercentage = Math.round((savings / product.originalPrice!) * 100);
            const matches = calculateDupeMatches(product, products, 1);
            const matchScore = matches[0]?.similarityScore || 85;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/product/${product.id}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="group bg-white dark:bg-[#17171c] rounded-2xl overflow-hidden border border-primary/10 dark:border-white/10 shadow-soft hover:shadow-medium transition-all"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-secondary/50 to-secondary dark:from-[#1a1a21]/50 dark:to-[#1a1a21] flex items-center justify-center p-6 overflow-hidden transition-colors">
                      <SafeImage
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        fallbackCategory={product.category as any}
                      />

                      {/* Savings Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center gap-1">
                        <TrendingDown className="w-3 h-3" />
                        Save {savingsPercentage}%
                      </div>

                      {/* Save Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleSaved(product.id);
                        }}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white dark:bg-[#1a1a21] border border-primary/10 dark:border-white/10 flex items-center justify-center hover:bg-primary/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${isSaved(product.id) ? 'fill-rose-500 text-rose-500' : 'text-muted-foreground'}`}
                        />
                      </button>

                      {/* Match Score */}
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] text-xs font-bold transition-colors">
                        {matchScore}% match
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-xs text-muted-foreground dark:text-gray-500 uppercase tracking-wide transition-colors">{product.brand}</p>
                          <h3 className="font-bold text-foreground dark:text-white line-clamp-1 group-hover:text-primary dark:group-hover:text-[#ffb6c1] transition-colors">
                            {product.name}
                          </h3>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium text-foreground dark:text-white transition-colors">{product.rating}</span>
                        <span className="text-sm text-muted-foreground dark:text-gray-500 transition-colors">({product.reviewCount})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 transition-colors">{formatPrice(product.price)}</span>
                        <span className="text-sm text-muted-foreground dark:text-gray-500 line-through transition-colors">{formatPrice(product.originalPrice!)}</span>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium transition-colors">Save {formatPrice(savings)}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
