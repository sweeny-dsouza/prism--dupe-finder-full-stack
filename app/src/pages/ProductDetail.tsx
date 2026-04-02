import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Star, TrendingDown, Check, Sparkles, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { calculateDupeMatches, getBudgetLabel, getBudgetColor, formatPrice } from '@/lib/utils';
import { useSavedProducts, useCart } from '@/hooks/useLocalStorage';
import { useProduct, useProducts } from '@/hooks/useApi';
import SafeImage from '@/components/ui/SafeImage';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { toggleSaved, isSaved } = useSavedProducts();
  const { addToCart } = useCart();

  const { product, loading: productLoading } = useProduct(id);
  const { products: allProducts } = useProducts(product?.category as any);

  if (productLoading || !product) {
    return (
      <main className={`min-h-screen pt-24 pb-16 bg-background flex items-center justify-center ${productLoading ? 'opacity-50' : ''}`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">{productLoading ? 'Syncing...' : 'Product Not Found'}</h1>
          <p className="text-muted-foreground mb-6">{productLoading ? 'Fetching from our molecular database...' : "The product you're looking for doesn't exist."}</p>
          {!productLoading && (
            <Link to="/dupe-finder">
                <Button className="rounded-xl bg-primary text-white hover:opacity-90">
                Browse Products
                </Button>
            </Link>
          )}
        </div>
      </main>
    );
  }

  const dupeMatches = allProducts && allProducts.length > 0 ? calculateDupeMatches(product, allProducts, 5) : [];
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16 bg-background dark:bg-[#0f0f12] text-foreground dark:text-white transition-colors duration-300"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Back Link */}
        <Link to="/dupe-finder" className="inline-flex items-center gap-2 text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-[#ffb6c1] mb-6 transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square rounded-3xl bg-white dark:bg-[#17171c] border border-primary/10 dark:border-white/10 shadow-soft flex items-center justify-center relative"
          >
            <SafeImage
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain p-8 select-none"
              fallbackCategory={product.category as any}
            />
            {savings > 0 && (
              <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-emerald-500 text-white font-bold">
                <TrendingDown className="w-4 h-4 inline mr-1" />
                Save {formatPrice(savings)}
              </div>
            )}
            <button
              onClick={() => toggleSaved(product.id)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/80 dark:bg-white/10 flex items-center justify-center hover:bg-white dark:hover:bg-white/20 transition-colors"
            >
              <Heart className={`w-6 h-6 ${isSaved(product.id) ? 'fill-rose-500 text-rose-500' : 'text-muted-foreground'}`} />
            </button>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Badge className={getBudgetColor(product.budgetLevel)}>
                {getBudgetLabel(product.budgetLevel)}
              </Badge>
              <Badge className="bg-primary/10 dark:bg-white/5 text-primary dark:text-[#ffb6c1] border-primary/20 dark:border-white/10">
                {product.category}
              </Badge>
            </div>

            <p className="text-[10px] font-bold text-primary/55 dark:text-[#ffb6c1]/55 uppercase tracking-[0.22em] mb-1.5">{product.brand}</p>
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground dark:text-white mb-4 tracking-tight leading-tight">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-primary dark:fill-[#ffb6c1] text-primary dark:text-[#ffb6c1]' : 'text-primary/10 dark:text-white/10'}`} />
                  ))}
                </div>
                <span className="font-bold text-foreground dark:text-white">{product.rating}</span>
                <span className="text-xs text-muted-foreground dark:text-gray-400 uppercase tracking-widest font-bold ml-1">({product.reviewCount} Reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-bold text-foreground dark:text-white transition-colors">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <div className="flex items-center gap-3">
                  <span className="text-xl text-muted-foreground line-through opacity-50">{formatPrice(product.originalPrice)}</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    Save {Math.round(savings / product.originalPrice * 100)}%
                  </span>
                </div>
              )}
            </div>

            <p className="text-muted-foreground dark:text-gray-400 mb-8 leading-relaxed transition-colors font-light text-lg">{product.description}</p>

            {/* Ingredients */}
            <div className="mb-8">
              <h3 className="text-[10px] font-bold text-foreground/40 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 transition-colors">Key Active Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <Badge key={ing} variant="secondary" className="px-4 py-2 rounded-xl bg-primary/5 dark:bg-white/5 text-primary dark:text-[#ffb6c1] border-primary/10 dark:border-white/10 text-xs font-bold uppercase tracking-wider">
                    {ing}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-8 transition-colors">
              <h3 className="text-[10px] font-bold text-foreground/40 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 transition-colors">Proven Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 p-3 rounded-xl bg-primary/5 dark:bg-white/5 border border-primary/5 dark:border-white/5 text-sm text-muted-foreground dark:text-gray-300 font-light">
                    <Check className="w-4 h-4 text-emerald-500" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {product.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full border border-primary/10 dark:border-white/10 text-[10px] uppercase font-bold tracking-widest text-muted-foreground dark:text-gray-500">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={() => {
                  addToCart(product);
                  toast.success("Item added to cart", {
                    description: `${product.name} by ${product.brand}`,
                    action: {
                      label: "View Cart",
                      onClick: () => window.location.href = '/cart'
                    }
                  });
                }}
                className="flex-1 py-7 rounded-2xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] font-bold hover:opacity-90 shadow-soft flex items-center justify-center gap-3 text-lg"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </Button>
              <Button
                onClick={() => toggleSaved(product.id)}
                variant="outline"
                className="px-8 py-7 rounded-2xl border-primary/20 dark:border-white/20 text-primary dark:text-[#ffb6c1] font-bold hover:bg-primary/5 dark:hover:bg-white/5 shadow-soft flex items-center justify-center gap-3"
              >
                {isSaved(product.id) ? 'Saved' : 'Save Routine'}
                <Heart className={`w-5 h-5 ${isSaved(product.id) ? 'fill-primary dark:fill-[#ffb6c1]' : ''}`} />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Dupe Matches */}
        {dupeMatches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-24 max-w-5xl mx-auto"
          >
            <div className="flex items-center justify-between mb-10 border-b border-primary/5 dark:border-white/10 pb-6">
              <h2 className="text-2xl font-bold text-foreground dark:text-white flex items-center gap-3 transition-colors">
                <Sparkles className="w-6 h-6 text-primary dark:text-[#ffb6c1]" />
                Similar Products You'll Love
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {dupeMatches.map((match) => (
                  <div key={match.dupeProduct.id} className="group flex flex-col h-full bg-white dark:bg-[#17171c] rounded-[1.5rem] overflow-hidden border border-primary/10 dark:border-white/10 shadow-soft hover:shadow-medium hover:-translate-y-1.5 transition-all duration-500">
                    <Link to={`/product/${match.dupeProduct.id}`} className="relative aspect-square bg-gradient-to-br from-[#fdf8f5] to-[#f5eff4] dark:from-[#1a1a21] dark:to-[#17171c] overflow-hidden">
                      <SafeImage
                        src={match.dupeProduct.imageUrl}
                        alt={match.dupeProduct.name}
                        className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-700 ease-out"
                        fallbackCategory={match.dupeProduct.category as any}
                      />
                      <div className="absolute top-3 left-3 z-20">
                         <Badge className="bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] border-none shadow-sm px-2.5 py-1 text-[10px] font-bold tracking-wider">{match.similarityScore}% Match</Badge>
                      </div>
                    </Link>
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-[10px] font-bold text-primary/40 dark:text-[#ffb6c1]/40 uppercase tracking-[0.22em] mb-1.5">{match.dupeProduct.brand}</p>
                      <Link to={`/product/${match.dupeProduct.id}`}>
                        <h3 className="font-bold text-base text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-[#ffb6c1] transition-colors leading-snug mb-3 line-clamp-1">
                          {match.dupeProduct.name}
                        </h3>
                      </Link>
                      
                      <div className="flex-1" />
                      
                      <div className="flex items-center justify-between border-t border-primary/5 dark:border-white/5 pt-4">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-foreground dark:text-white">{formatPrice(match.dupeProduct.price)}</span>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">Save {formatPrice(match.savings)}</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-primary/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary dark:group-hover:bg-[#ffb6c1] group-hover:text-white dark:group-hover:text-[#8B1535] transition-all">
                          <ArrowLeft className="w-4 h-4 rotate-180" />
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}
