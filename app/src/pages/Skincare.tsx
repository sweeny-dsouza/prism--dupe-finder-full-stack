import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Beaker, FlaskConical, TrendingDown, Star, Heart, Check, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProducts, useIngredients, useConcerns } from '@/hooks/useApi';
import { formatPrice, searchIngredients, generateRoutine } from '@/lib/utils';
import { useSavedProducts, useCart } from '@/hooks/useLocalStorage';
import SafeImage from '@/components/ui/SafeImage';
import type { Ingredient } from '@/types';

export default function Skincare() {
  const { products: skincareProducts, loading: productsLoading } = useProducts('skincare');
  const { ingredients } = useIngredients();
  const { concerns: skinConcerns } = useConcerns('skin');

  const [ingredientQuery, setIngredientQuery] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [routineGoal, setRoutineGoal] = useState('');
  const { toggleSaved, isSaved } = useSavedProducts();
  const { addToCart } = useCart();

  const handleIngredientSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = searchIngredients(ingredientQuery);
    if (results.length > 0) {
      setSelectedIngredient(results[0]);
    }
  };

  const generatedRoutine = routineGoal ? generateRoutine(routineGoal, 'combination', undefined, skincareProducts) : null;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen pt-24 pb-16 bg-background dark:bg-[#0f0f12] text-foreground dark:text-white transition-colors duration-300 ${productsLoading ? 'opacity-50' : ''}`}
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
            <Sparkles className="w-4 h-4" />
            Curated Skincare
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight"
          >
            Perfect results. <br /> Authentic value.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Experience premium results with expert-verified alternatives.
            Because your skin deserves the best, without the branding markup.
          </motion.p>
        </div>

        {/* Tools Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 bg-white dark:bg-[#17171c] p-1.5 rounded-2xl mb-12 border border-primary/10 dark:border-white/10 h-auto sm:h-14">
              <TabsTrigger value="products" className="flex-1 min-w-[120px] rounded-xl py-3 px-4 lg:px-6 data-[state=active]:bg-primary data-[state=active]:text-white shadow-soft transition-all font-medium dark:text-gray-400 dark:data-[state=active]:text-white">
                Gallery
              </TabsTrigger>
              <TabsTrigger value="ingredients" className="flex-1 min-w-[120px] rounded-xl py-3 px-4 lg:px-6 data-[state=active]:bg-primary data-[state=active]:text-white shadow-soft transition-all font-medium dark:text-gray-400 dark:data-[state=active]:text-white">
                Ingredient Checker
              </TabsTrigger>
              <TabsTrigger value="routine" className="flex-1 min-w-[120px] rounded-xl py-3 px-4 lg:px-6 data-[state=active]:bg-primary data-[state=active]:text-white shadow-soft transition-all font-medium dark:text-gray-400 dark:data-[state=active]:text-white">
                Routine Lab
              </TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {skincareProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
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
                            fallbackCategory="skincare"
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

                      {/* Product Info */}
                      <div className="p-5 flex flex-col flex-1">
                        <p className="text-[10px] font-bold text-primary/55 dark:text-[#ffb6c1]/55 uppercase tracking-[0.22em] mb-1.5">{product.brand}</p>
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
            </TabsContent>

            {/* Ingredient Checker Tab */}
            <TabsContent value="ingredients">
              <div className="max-w-4xl mx-auto">
                <form onSubmit={handleIngredientSearch} className="mb-12">
                  <div className="bg-white dark:bg-[#17171c] p-3 rounded-[2.5rem] shadow-soft border border-primary/10 dark:border-white/10 flex items-center gap-2 transition-colors">
                    <Beaker className="w-5 h-5 text-primary/40 dark:text-[#ffb6c1]/40 ml-4" />
                    <Input
                      type="text"
                      placeholder="Search for an ingredient (e.g., Retinol, Peptide)..."
                      value={ingredientQuery}
                      onChange={(e) => setIngredientQuery(e.target.value)}
                      className="flex-1 border-0 bg-transparent text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-500 focus-visible:ring-0 text-lg py-7"
                    />
                    <Button type="submit" className="rounded-full bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] px-8 py-7 shadow-soft hover:opacity-90 font-bold transition-all">
                      Analyze
                    </Button>
                  </div>
                </form>

                {selectedIngredient ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-[#17171c] rounded-[2.5rem] p-8 lg:p-12 border border-primary/10 dark:border-white/10 shadow-medium relative overflow-hidden transition-colors"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 dark:bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />

                    <div className="flex flex-col lg:flex-row gap-12 relative z-10">
                      <div className="w-full lg:w-1/3">
                        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-3xl bg-gradient-to-br from-primary to-accent dark:from-[#8B1535] dark:to-[#ffb6c1] flex items-center justify-center shadow-lg mb-8">
                          <FlaskConical className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-foreground dark:text-white mb-4 leading-tight">
                          {selectedIngredient.name}
                        </h3>
                        <p className="text-sm text-primary/60 dark:text-[#ffb6c1]/60 font-bold uppercase tracking-widest mb-8">
                          Formulation Spotlight
                        </p>
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-xs font-bold text-foreground/40 dark:text-gray-500 uppercase tracking-[0.2em] mb-3 transition-colors">Best For</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedIngredient.suitableFor.map((s) => (
                                <span key={s} className="px-4 py-1.5 rounded-full bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 text-primary dark:text-[#ffb6c1] text-[11px] font-bold transition-colors">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-foreground/40 dark:text-gray-500 uppercase tracking-[0.2em] mb-3 transition-colors">Avoid If</h4>
                            <div className="space-y-2">
                              {selectedIngredient.avoidIf.map((a) => (
                                <p key={a} className="text-xs flex items-center gap-2 text-rose-500 dark:text-rose-400 font-medium transition-colors">
                                  <span className="w-1 h-1 rounded-full bg-rose-500 dark:bg-rose-400" />
                                  {a}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full lg:w-2/3 border-t lg:border-t-0 lg:border-l border-primary/5 dark:border-white/5 pt-12 lg:pt-0 lg:pl-12 transition-colors">
                        <div className="mb-12">
                          <h4 className="text-xl font-bold text-foreground dark:text-white mb-4 transition-colors">Scientific Profile</h4>
                          <p className="text-lg text-muted-foreground dark:text-gray-400 leading-relaxed transition-colors">
                            {selectedIngredient.scientificSummary}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xl font-bold text-foreground dark:text-white mb-6 transition-colors">Proven Benefits</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {selectedIngredient.benefits.map((b) => (
                              <div key={b} className="flex items-start gap-3 p-4 rounded-2xl bg-primary/5 dark:bg-white/5 border border-primary/5 dark:border-white/5 transition-colors">
                                <Check className="w-5 h-5 text-primary dark:text-[#ffb6c1] mt-0.5 transition-colors" />
                                <span className="text-sm text-foreground/80 dark:text-gray-300 font-light leading-relaxed transition-colors">{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {ingredients.slice(0, 8).map((ing) => (
                      <button
                        key={ing.id}
                        onClick={() => setSelectedIngredient(ing)}
                        className="bg-white dark:bg-[#17171c] rounded-2xl p-6 text-left border border-primary/10 dark:border-white/10 shadow-soft hover:shadow-medium transition-all group"
                      >
                        <p className="font-bold text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-[#ffb6c1] transition-colors text-lg mb-2">{ing.name}</p>
                        <p className="text-[10px] text-muted-foreground dark:text-gray-500 leading-relaxed line-clamp-2 uppercase tracking-wider font-bold transition-colors">{ing.benefits[0]}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Routine Lab Tab */}
            <TabsContent value="routine">
              <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                  <h3 className="text-2xl font-bold text-foreground dark:text-white mb-6 transition-colors">What is your skin goal?</h3>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {['Hydration', 'Acne Control', 'Anti-Aging', 'Brightening', 'Sensitivity'].map((goal) => (
                      <button
                        key={goal}
                        onClick={() => setRoutineGoal(goal)}
                        className={`px-8 py-3 rounded-full text-sm font-bold tracking-wider transition-all uppercase ${routineGoal === goal
                          ? 'bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] shadow-medium'
                          : 'bg-white dark:bg-[#17171c] border border-primary/10 dark:border-white/10 text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-[#ffb6c1] hover:border-primary/30'
                          }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                {generatedRoutine && generatedRoutine.steps.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-[#17171c] rounded-[3rem] p-8 lg:p-12 border border-primary/10 dark:border-white/10 shadow-medium relative overflow-hidden transition-colors"
                  >
                    <div className="flex items-start justify-between mb-12 flex-col sm:flex-row gap-8">
                      <div>
                        <p className="text-[10px] font-bold text-primary/40 dark:text-[#ffb6c1]/40 uppercase tracking-[0.2em] mb-2 transition-colors">Exclusive Discovery</p>
                        <h3 className="text-3xl lg:text-4xl font-bold text-foreground dark:text-white transition-colors">Your {routineGoal} Routine</h3>
                      </div>
                      <div className="p-6 rounded-3xl bg-primary/5 dark:bg-white/5 border border-primary/5 dark:border-white/10 text-center sm:text-right min-w-[200px] transition-colors">
                        <p className="text-[10px] font-bold text-primary/40 dark:text-[#ffb6c1]/40 uppercase tracking-widest mb-1 transition-colors">Total Regimen Cost</p>
                        <p className="text-3xl font-bold text-foreground dark:text-white transition-colors">{formatPrice(generatedRoutine.estimatedCost)}</p>
                        <div className="flex items-center justify-center sm:justify-end gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-2 transition-colors">
                          <TrendingDown className="w-3 h-3" />
                          Save ~{formatPrice(generatedRoutine.estimatedSavings)} vs luxury
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {generatedRoutine.steps.map((step, index) => (
                        <div key={index} className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-white dark:bg-[#1a1a21] border border-primary/10 dark:border-white/10 shadow-soft hover:shadow-medium transition-all group">
                          <div className="w-12 h-12 rounded-2xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] flex items-center justify-center font-bold text-xl shadow-lg shrink-0 transition-all">
                            {step.order}
                          </div>
                          <div className="flex-grow text-center sm:text-left">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                              <h4 className="font-bold text-lg text-foreground dark:text-white transition-colors">{step.name}</h4>
                              <div className={`w-fit mx-auto sm:mx-0 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${step.timeOfDay === 'morning' ? 'bg-amber-100/50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400' : step.timeOfDay === 'evening' ? 'bg-indigo-100/50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400' : 'bg-primary/10 dark:bg-white/10 text-primary dark:text-[#ffb6c1]'}`}>
                                {step.timeOfDay === 'both' ? 'AM & PM' : step.timeOfDay === 'morning' ? 'Morning Only' : 'Evening Only'}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed mb-4 transition-colors">{step.description}</p>

                            {step.product && (
                              <div className="flex items-center gap-4 p-3 rounded-2xl bg-primary/5 dark:bg-white/5 border border-primary/5 dark:border-white/10 w-fit mx-auto sm:mx-0 transition-colors">
                                <p className="text-[10px] font-bold text-primary dark:text-[#ffb6c1] px-2 py-0.5 rounded-md bg-primary/5 dark:bg-white/5 transition-colors">{step.product.brand}</p>
                                <span className="text-xs font-medium text-foreground dark:text-white transition-colors">{step.product.name}</span>
                                <span className="text-xs font-bold text-foreground dark:text-white transition-colors">{formatPrice(step.product.price)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 text-center">
                      <Button className="rounded-full px-12 py-7 bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] shadow-soft hover:opacity-90 font-bold transition-all">
                        Add Full Routine to List
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Skin Concerns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8 border-b border-primary/5 dark:border-white/5 pb-6 transition-colors">
            <h2 className="text-2xl font-bold text-foreground dark:text-white transition-colors">Shop by Concern</h2>
            <Link to="/concerns" className="text-primary dark:text-[#ffb6c1] text-sm font-bold uppercase tracking-widest hover:underline transition-colors">Explore All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {skinConcerns.map((concern) => (
              <Link
                key={concern.id}
                to={`/dupe-finder?q=${encodeURIComponent(concern.name)}`}
                className="bg-white dark:bg-[#17171c] rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all text-center border border-primary/10 dark:border-white/10 group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/5 dark:bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary dark:group-hover:bg-[#ffb6c1] group-hover:text-white dark:group-hover:text-[#8B1535] transition-all">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-[#ffb6c1] transition-colors mb-2 leading-tight">{concern.name}</h3>
                <p className="text-[10px] text-primary/40 dark:text-[#ffb6c1]/40 uppercase tracking-[0.1em] font-bold transition-colors">{concern.recommendedIngredients.length} Active Agents</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
