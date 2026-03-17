import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Droplets, ArrowRight, Star, Heart, Sparkles, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { SafeImage } from '@/components/ui/SafeImage';
import { products } from '@/data/products';
import { bodyConcerns } from '@/data/bodyConcerns';
import { useSavedProducts, useCart } from '@/hooks/useLocalStorage';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';

const bodycareProducts = products.filter(p => p.category === 'bodycare');

const routineSteps = [
  {
    id: 'exfoliate',
    name: 'Exfoliate',
    description: 'Remove dead skin cells and prep your skin',
    icon: '✨',
    color: 'from-amber-400 to-orange-400',
    type: 'static'
  },
  {
    id: 'treat',
    name: 'Treat',
    description: 'Target specific concerns with actives',
    icon: '💫',
    color: 'from-primary to-accent',
    type: 'dynamic'
  },
  {
    id: 'seal',
    name: 'Seal',
    description: 'Lock in moisture and protect',
    icon: '🔒',
    color: 'from-emerald-400 to-teal-400',
    type: 'static'
  }
];

export default function Bodycare() {
  const { toggleSaved, isSaved } = useSavedProducts();
  const { addToCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedConcernId, setSelectedConcernId] = useState(bodyConcerns[0].id);

  const selectedConcern = bodyConcerns.find(c => c.id === selectedConcernId);

  const getStepProducts = (stepId: string) => {
    if (stepId === 'exfoliate') {
      return bodycareProducts.filter(p => p.bodyRoutineStep === 'exfoliate' || p.subcategory === 'body scrub' || p.subcategory === 'body wash');
    }
    if (stepId === 'treat') {
      if (!selectedConcern) return [];
      return bodycareProducts.filter(p => selectedConcern.recommendedProductIds.includes(p.id));
    }
    if (stepId === 'seal') {
      return bodycareProducts.filter(p => p.bodyRoutineStep === 'seal' || p.subcategory === 'body moisturizer' || p.subcategory === 'body oil');
    }
    return [];
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16 bg-background dark:bg-[#0f0f12] text-foreground dark:text-white transition-colors duration-300"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Luxury Hero Section */}
        <div className="text-center mb-16 lg:mb-24 relative overflow-hidden py-12">
          {/* Background Decorative Blobs */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-24 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-6"
          >
            <Droplets className="w-4 h-4" />
            Body Sanctuary
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight"
          >
            Nourish from <br /> Head to Toe.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Indulge in high-performance body care that delivers visible results.
            Elevate your daily ritual with expert-curated beauty alternatives.
          </motion.p>
        </div>

        {/* Routine Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-24"
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl font-bold text-foreground dark:text-white mb-3 text-center transition-colors">The Perfect Body Routine</h2>
              <div className="w-24 h-1 bg-primary/10 dark:bg-white/10 transition-colors" />
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between mb-16 relative px-8">
              <div className="absolute top-[28px] left-0 right-0 h-[2px] bg-primary/5 -z-10 mx-16 hidden sm:block" />
              {routineSteps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className="flex flex-col items-center gap-4 relative group"
                >
                  <div className={`w-14 h-14 rounded-2xl transition-all duration-500 flex items-center justify-center text-2xl shadow-lg border-2 ${activeStep === index
                    ? `bg-primary text-white border-primary scale-110 shadow-medium`
                    : 'bg-white dark:bg-[#17171c] border-white/60 dark:border-white/10 text-muted-foreground/40 hover:border-primary/20 hover:scale-105'
                    }`}>
                    {step.icon}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${activeStep === index ? 'text-primary dark:text-[#ffb6c1]' : 'text-muted-foreground/40 dark:text-gray-500 font-medium'}`}>
                    {step.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Step Card */}
            <div className="relative min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="bg-white dark:bg-[#17171c] rounded-[2.5rem] p-8 lg:p-12 border border-primary/10 dark:border-white/10 shadow-medium relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                    <div>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="w-12 h-[1px] bg-primary/20" />
                        <span className="text-[10px] font-bold text-primary/40 dark:text-[#ffb6c1]/40 uppercase tracking-[0.3em] transition-colors">
                          Phase 0{activeStep + 1}
                        </span>
                      </div>
                      <h3 className="text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-6 leading-tight transition-colors">
                        {routineSteps[activeStep].name}
                      </h3>
                      <p className="text-lg text-muted-foreground dark:text-gray-400 leading-relaxed mb-10 transition-colors">
                        {routineSteps[activeStep].description}
                      </p>

                      {/* Concern Selector for Treat Step */}
                      {routineSteps[activeStep].id === 'treat' && (
                        <div className="space-y-8">
                          <div>
                            <h4 className="text-[10px] font-bold text-foreground/40 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 transition-colors">Targeted Concerns</h4>
                            <div className="flex flex-wrap gap-2">
                              {bodyConcerns.map((concern) => (
                                <button
                                  key={concern.id}
                                  onClick={() => setSelectedConcernId(concern.id)}
                                  className={`px-6 py-2 rounded-full text-[11px] font-bold tracking-wider transition-all uppercase ${selectedConcernId === concern.id
                                    ? 'bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] shadow-medium'
                                    : 'bg-white dark:bg-[#1a1a21] border border-primary/10 dark:border-white/10 text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-[#ffb6c1] hover:border-primary/30 transition-all'
                                    }`}
                                >
                                  {concern.name}
                                </button>
                              ))}
                            </div>
                          </div>

                          {selectedConcern && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-8 rounded-[2rem] bg-primary/5 dark:bg-white/5 border border-primary/5 dark:border-white/10 relative overflow-hidden transition-colors"
                            >
                              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -translate-y-12 translate-x-12 blur-2xl" />
                              <h4 className="text-[10px] font-bold text-primary dark:text-[#ffb6c1] uppercase tracking-[0.2em] mb-4 flex items-center gap-2 transition-colors">
                                <Sparkles className="w-3 h-3" />
                                Formulation Insight
                              </h4>
                              <p className="text-base text-foreground dark:text-white mb-4 italic transition-colors">
                                "{selectedConcern.explanation}"
                              </p>
                            </motion.div>
                          )}
                        </div>
                      )}

                      {/* Static Step Context */}
                      {routineSteps[activeStep].type === 'static' && (
                        <div className="p-8 rounded-[2.5rem] bg-primary/5 dark:bg-white/5 border border-primary/5 dark:border-white/10 transition-colors">
                          <p className="text-base text-foreground dark:text-white leading-relaxed italic transition-colors">
                            {routineSteps[activeStep].id === 'exfoliate'
                              ? "Refine your skin's surface to maximize absorption. By removing cellular buildup, you create the perfect canvas for subsequent actives to penetrate deeply."
                              : "The final seal is non-negotiable. Locking in hydration preserves the integrity of your moisture barrier and ensures a lasting, luminous finish."}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-8">
                      <div className="flex items-center justify-between border-b border-primary/5 dark:border-white/10 pb-4 transition-colors">
                        <h4 className="text-[10px] font-bold text-foreground/40 dark:text-gray-500 uppercase tracking-[0.2em] transition-colors">Curated Selections</h4>
                        <Link to="/dupe-finder" className="text-[10px] font-bold text-primary dark:text-[#ffb6c1] uppercase tracking-widest hover:underline transition-colors">See All</Link>
                      </div>

                      <div className="space-y-6">
                        {getStepProducts(routineSteps[activeStep].id).slice(0, 3).map((product, pIndex) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + pIndex * 0.1 }}
                          >
                            <Link
                              to={`/product/${product.id}`}
                              className="flex items-center gap-5 p-4 rounded-3xl bg-white dark:bg-[#1a1a21] border border-primary/10 dark:border-white/10 hover:shadow-soft transition-all group"
                            >
                              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#17171c] overflow-hidden flex items-center justify-center p-2 shadow-sm border border-primary/5 dark:border-white/5">
                                <SafeImage src={product.imageUrl} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out" fallbackCategory="bodycare" />
                              </div>
                              <div className="flex-grow min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="text-[9px] font-bold text-primary/40 dark:text-[#ffb6c1]/40 uppercase tracking-[0.2em] transition-colors">{product.brand}</p>
                                  {product.isLuxury && <span className="text-[8px] bg-primary/10 dark:bg-white/10 text-primary dark:text-[#ffb6c1] px-2 py-0.5 rounded font-bold uppercase tracking-widest transition-colors">Luxury</span>}
                                </div>
                                <p className="font-bold text-foreground dark:text-white text-base truncate group-hover:text-primary dark:group-hover:text-[#ffb6c1] transition-colors mb-1">
                                  {product.name}
                                </p>
                                <div className="flex items-center gap-3">
                                  <span className="font-bold text-foreground/80 dark:text-gray-300 text-base transition-colors">{formatPrice(product.price)}</span>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-primary dark:fill-[#ffb6c1] text-primary dark:text-[#ffb6c1] transition-colors" />
                                    <span className="text-[11px] font-bold text-primary/40 dark:text-[#ffb6c1]/40 uppercase tracking-wider transition-colors">{product.rating}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                                <ArrowRight className="w-4 h-4" />
                              </div>
                              <Button
                                onClick={(e) => {
                                  e.preventDefault();
                                  addToCart(product);
                                  toast.success("Item added to cart", {
                                    description: `${product.name} by ${product.brand}`,
                                    action: {
                                      label: "View Cart",
                                      onClick: () => window.location.href = '/cart'
                                    }
                                  });
                                }}
                                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:shadow-lg transition-all shrink-0"
                              >
                                <ShoppingBag className="w-4 h-4" />
                              </Button>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* All Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-24"
        >
          <div className="flex items-center justify-between mb-10 border-b border-primary/5 dark:border-white/10 pb-6 transition-colors">
            <h2 className="text-2xl font-bold text-foreground dark:text-white transition-colors">Body Archive</h2>
            <Link to="/dupe-finder" className="text-xs font-bold text-primary dark:text-[#ffb6c1] uppercase tracking-widest hover:underline transition-colors">Explore Full Collection</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bodycareProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="group"
              >
                <div className="bg-white dark:bg-[#17171c] rounded-[1.5rem] overflow-hidden border border-primary/10 dark:border-white/10 shadow-soft hover:shadow-[0_20px_60px_rgba(122,28,58,0.14)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
                  {/* Square Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-[#fdf8f5] to-[#f5eff4] dark:from-[#1a1a21] dark:to-[#17171c] overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <Link to={`/product/${product.id}`}>
                      <SafeImage
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-700 ease-out"
                        fallbackCategory="bodycare"
                      />
                    </Link>
                    {product.originalPrice && (
                      <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        Save {Math.round((product.originalPrice - product.price) / product.originalPrice * 100)}%
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSaved(product.id);
                      }}
                      className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/90 dark:bg-[#17171c]/90 backdrop-blur-sm border border-primary/10 dark:border-white/10 flex items-center justify-center hover:scale-110 transition-all duration-200 shadow-sm"
                    >
                      <Heart className={`w-4 h-4 transition-colors ${isSaved(product.id) ? 'fill-primary text-primary' : 'text-primary/40'}`} />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className="text-[10px] font-bold text-primary/55 dark:text-[#ffb6c1]/55 uppercase tracking-[0.22em]">{product.brand}</p>
                      {product.bodyRoutineStep && (
                        <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 text-primary/60 dark:text-[#ffb6c1]/60 uppercase tracking-widest">
                          {product.bodyRoutineStep}
                        </span>
                      )}
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-bold text-[15px] text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-[#ffb6c1] transition-colors leading-snug mb-3 line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Concern tags */}
                    {product.concerns && product.concerns.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {product.concerns.slice(0, 3).map((c) => (
                          <span key={c} className="text-[9px] font-bold px-2.5 py-1 rounded-full border border-primary/15 dark:border-white/10 text-primary/60 dark:text-[#ffb6c1]/60 uppercase tracking-widest bg-primary/5 dark:bg-white/5">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-primary text-primary dark:fill-[#ffb6c1] dark:text-[#ffb6c1]' : 'text-primary/10 dark:text-white/10'}`} />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-primary/50 dark:text-[#ffb6c1]/50 leading-none">{product.rating}</span>
                    </div>

                    <div className="flex-1" />

                    {/* Price + CTA */}
                    <div className="border-t border-primary/5 dark:border-white/5 pt-4 space-y-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-foreground dark:text-white">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground/40 line-through">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
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
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Luxury Spa Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#17171c] rounded-[2.5rem] p-12 lg:p-20 relative overflow-hidden shadow-medium border border-primary/10 dark:border-white/10"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -ml-32 -mb-32" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-6xl font-bold text-foreground dark:text-white mb-8 leading-tight transition-colors">
                The Spa, <br /> <span className="text-primary/60 dark:text-[#ffb6c1]/60">Everywhere.</span>
              </h2>
              <p className="text-xl text-muted-foreground dark:text-gray-400 leading-relaxed mb-10 transition-colors">
                Experience the transformative power of professional body therapy in the sanctuary of your own home. High-concentration actives and sensory-rich textures, without the branding markup.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Exfoliate Weekly', 'Daily Hydration', 'Mineral Protection'].map((tip) => (
                  <div key={tip} className="px-6 py-3 rounded-2xl bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 text-primary dark:text-[#ffb6c1] text-xs font-bold uppercase tracking-widest transition-colors">
                    {tip}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '3', label: 'Core Steps' },
                { value: '55%', label: 'Avg Savings' },
                { value: '24/7', label: 'Skin Glow' },
                { value: '4.8★', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="p-8 rounded-[2rem] bg-white dark:bg-[#1a1a21] border border-primary/10 dark:border-white/10 text-center hover:shadow-soft transition-all group">
                  <p className="text-3xl font-bold text-primary dark:text-[#ffb6c1] mb-2 group-hover:scale-110 transition-transform duration-500 transition-colors uppercase">{stat.value}</p>
                  <p className="text-[10px] font-bold text-primary/40 dark:text-[#ffb6c1]/40 uppercase tracking-[0.2em] transition-colors">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
