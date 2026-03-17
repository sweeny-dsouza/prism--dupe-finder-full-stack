import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, TrendingDown, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { calculateDupeMatches, formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useLocalStorage';
import SafeImage from '@/components/ui/SafeImage';

export default function FeaturedDupe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { addToCart } = useCart();

  // Get featured products
  const luxuryProduct = products.find(p => p.id === 'sk001') || products[0];
  const dupeMatches = calculateDupeMatches(luxuryProduct, products, 1);
  const dupeProduct = dupeMatches[0]?.dupeProduct || products.find(p => p.id === 'sk002') || products[1];
  const matchScore = dupeMatches[0]?.similarityScore || 94;
  const savings = Math.max(0, (luxuryProduct?.price || 0) - (dupeProduct?.price || 0));

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-secondary/50 dark:bg-[#1a1a21]/40 overflow-hidden transition-colors duration-500">
      {/* Background Blobs - Slow drifting */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{
            x: ['-5%', '5%', '-5%'],
            y: ['-10%', '10%', '-10%'],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[60vw] h-[50vh] bg-primary/5 dark:bg-white/5 rounded-full blur-[120px] opacity-40" 
        />
        <motion.div 
          animate={{
            x: ['5%', '-5%', '5%'],
            y: ['10%', '-10%', '10%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[60vw] h-[50vh] bg-accent/5 dark:bg-white/5 rounded-full blur-[120px] opacity-40" 
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:text-[#ffb6c1] text-xs font-bold tracking-widest uppercase mb-4"
          >
            Featured Match
          </motion.span>
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground dark:text-white mb-6 tracking-tight transition-colors">
            Side-by-side spotlight
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground dark:text-gray-400 transition-colors font-inter font-light">
            See how our matches stack up against luxury favorites
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="max-w-6xl mx-auto relative px-4 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            {/* Luxury Product */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="h-full bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 lg:p-10 border border-primary/5 dark:border-white/10 shadow-soft transition-all duration-500 hover:shadow-medium">
                {/* Header Info */}
                <div className="flex items-center justify-between mb-8">
                  <span className="px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-300 text-xs font-bold uppercase tracking-wider">
                    Luxury
                  </span>
                  <span className="text-2xl font-bold text-foreground dark:text-white">{formatPrice(luxuryProduct.price)}</span>
                </div>

                {/* Product Image */}
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-secondary/50 to-secondary dark:from-white/5 dark:to-white/10 flex items-center justify-center p-8 mb-8 group overflow-hidden">
                  <SafeImage
                    src={luxuryProduct.imageUrl}
                    alt={luxuryProduct.name}
                    className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
                    fallbackCategory={luxuryProduct.category as any}
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-primary/55 dark:text-[#ffb6c1]/55 uppercase tracking-[0.22em] mb-1">{luxuryProduct.brand}</p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground dark:text-white tracking-tight leading-tight">{luxuryProduct.name}</h3>
                  <p className="text-sm lg:text-base text-muted-foreground dark:text-gray-400 font-inter font-light leading-relaxed">{luxuryProduct.description}</p>
                  
                  {/* Ingredients */}
                  <div className="pt-4">
                    <p className="text-[11px] font-bold text-primary dark:text-[#ffb6c1] uppercase tracking-widest mb-3">Key Ingredients</p>
                    <div className="flex flex-wrap gap-2">
                      {luxuryProduct.ingredients.slice(0, 4).map((ing) => (
                        <span key={ing} className="px-3 py-1.5 rounded-xl bg-primary/5 dark:bg-white/5 text-[10px] text-muted-foreground dark:text-gray-300 font-bold uppercase tracking-wider border border-primary/5">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* VS Badge - Desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
              className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div className="relative group">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 rounded-full bg-primary dark:bg-[#ffb6c1] flex items-center justify-center shadow-[0_0_30px_rgba(139,21,53,0.3)] dark:shadow-[0_0_30px_rgba(255,182,193,0.3)] border-4 border-white dark:border-[#0f0f12] relative z-10"
                >
                  <span className="text-2xl font-bold text-white dark:text-[#8B1535]">VS</span>
                </motion.div>
                
                {/* Match Score Bubble */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-white dark:bg-[#17171c] shadow-2xl border border-primary/10 dark:border-white/20 z-20"
                >
                  <span className="text-[10px] font-bold text-primary dark:text-[#ffb6c1] whitespace-nowrap uppercase tracking-[0.1em]">{matchScore}% Match Found</span>
                </motion.div>
                
                {/* Decorative Rings */}
                <div className="absolute inset-0 -m-8 border border-primary/20 dark:border-white/10 rounded-full animate-ping opacity-20" />
              </div>
            </motion.div>

            {/* Dupe Product */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <div className="h-full bg-white dark:bg-[#1a1a21] rounded-[2.5rem] p-8 lg:p-10 border-2 border-primary dark:border-[#ffb6c1] shadow-[0_0_50px_rgba(139,21,53,0.1)] dark:shadow-[0_0_50px_rgba(255,182,193,0.1)] relative overflow-hidden group">
                {/* Savings Badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white px-6 py-3 rounded-bl-3xl font-bold text-sm flex items-center gap-2 shadow-lg z-20">
                  <TrendingDown className="w-4 h-4" />
                  Save {formatPrice(savings)}
                </div>

                {/* Header Info */}
                <div className="flex items-center justify-between mb-8 mt-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    Recommended Match
                  </span>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-muted-foreground dark:text-gray-500 line-through opacity-60 font-medium">{formatPrice(luxuryProduct.price)}</span>
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{formatPrice(dupeProduct.price)}</span>
                  </div>
                </div>

                {/* Product Image */}
                <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-[#fdf8f5] to-[#f5eff4] dark:from-emerald-900/5 dark:to-emerald-900/10 flex items-center justify-center p-8 mb-8 overflow-hidden relative shadow-inner">
                  <SafeImage
                    src={dupeProduct.imageUrl}
                    alt={dupeProduct.name}
                    className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
                    fallbackCategory={dupeProduct.category as any}
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.22em] mb-1">{dupeProduct.brand}</p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground dark:text-white tracking-tight leading-tight">{dupeProduct.name}</h3>
                  <p className="text-sm lg:text-base text-muted-foreground dark:text-gray-400 font-inter font-light leading-relaxed">{dupeProduct.description}</p>
                  
                  {/* Ingredients */}
                  <div className="pt-4">
                    <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">Shared Active Ingredients</p>
                    <div className="flex flex-wrap gap-2">
                      {dupeProduct.ingredients.slice(0, 3).map((ing) => (
                        <span key={ing} className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors">
                          <Check className="w-3 h-3" />
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* VS - Mobile */}
                  <div className="lg:hidden flex items-center justify-between py-6 mt-4 border-y border-gray-100 dark:border-white/5">
                    <span className="text-[10px] font-bold text-primary dark:text-[#ffb6c1] uppercase tracking-widest">{matchScore}% Match Score</span>
                    <div className="w-10 h-10 rounded-full bg-primary dark:bg-[#ffb6c1] flex items-center justify-center text-white dark:text-[#8B1535] font-bold text-xs ring-4 ring-primary/10 shadow-lg">VS</div>
                  </div>

                  {/* Actions */}
                  <Button
                    onClick={() => {
                      addToCart(dupeProduct);
                      toast.success("Item added to cart", {
                        description: `${dupeProduct.name} by ${dupeProduct.brand}`,
                        action: {
                          label: "View Cart",
                          onClick: () => window.location.href = '/cart'
                        }
                      });
                    }}
                    className="w-full mt-6 rounded-[1.25rem] bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] py-7 hover:shadow-[0_15px_30px_rgba(139,21,53,0.3)] hover:scale-[1.01] transition-all flex items-center justify-center gap-3 text-lg font-bold group/btn border-none"
                  >
                    <ShoppingBag className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <Link to="/dupe-finder">
              <Button variant="ghost" className="px-8 py-6 rounded-2xl text-primary dark:text-white font-bold hover:bg-primary/5 dark:hover:bg-white/5 transition-all flex items-center gap-3 group/link">
                SEE FULL ANALYSIS
                <ArrowRight className="w-5 h-5 transition-transform group-hover/link:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
