import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Trash2, Sparkles, Star, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useSavedProducts, useCart } from '@/hooks/useLocalStorage';
import { useProducts } from '@/hooks/useApi';
import { formatPrice } from '@/lib/utils';
import SafeImage from '@/components/ui/SafeImage';

export default function Saved() {
  const { products: allProducts, loading } = useProducts();
  const { savedProducts, toggleSaved, clearSaved } = useSavedProducts();
  const { addToCart } = useCart();
  
  const savedProductsData = allProducts.filter(p => savedProducts.includes(p.id));

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen pt-24 pb-16 bg-background dark:bg-[#0f0f12] text-foreground dark:text-white transition-colors duration-300 ${loading ? 'opacity-50' : ''}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground dark:text-white mb-2 flex items-center gap-3 transition-colors">
              <Heart className="w-8 h-8 text-rose-400 fill-rose-400" />
              Saved Products
            </h1>
            <p className="text-muted-foreground">
              {savedProductsData.length} product{savedProductsData.length !== 1 ? 's' : ''} in your collection
            </p>
          </div>

          {savedProductsData.length > 0 && (
            <Button
              variant="outline"
              onClick={clearSaved}
              className="rounded-xl border-rose-200 dark:border-rose-500/20 text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </motion.div>

        {/* Products Grid */}
        {savedProductsData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProductsData.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/product/${product.id}`}>
                  <div className="bg-white dark:bg-[#17171c] rounded-2xl overflow-hidden border border-primary/10 dark:border-white/10 shadow-soft hover:shadow-medium transition-all group">
                    <div className="aspect-[5/4] bg-primary/5 dark:bg-[#1a1a21] flex items-center justify-center relative p-8">
                      <SafeImage
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        fallbackCategory={product.category as any}
                      />
                      {product.originalPrice && (
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold">
                          Save {Math.round((product.originalPrice - product.price) / product.originalPrice * 100)}%
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSaved(product.id);
                        }}
                        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
                      >
                        <Heart className="w-5 h-5 fill-white" />
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground dark:text-gray-400 uppercase tracking-wider">{product.brand}</p>
                      <h3 className="font-bold text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-[#ffb6c1] transition-colors line-clamp-1">{product.name}</h3>
                      <div className="flex items-center gap-1 mt-1.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold dark:text-white">{product.rating}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="font-bold text-foreground dark:text-white">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <>
                            <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                              Save {formatPrice(product.originalPrice - product.price)}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                            toast.success("Item added to cart");
                          }}
                          className="flex-grow mr-2 rounded-xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] text-[10px] font-bold py-2 h-9"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                          To Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-secondary flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              No saved products yet
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start exploring and save products you love. Your saved items will appear here.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/dupe-finder">
                <Button className="px-8 py-5 rounded-xl bg-primary text-white hover:opacity-90">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Find Dupes
                </Button>
              </Link>
              <Link to="/skincare">
                <Button variant="outline" className="px-8 py-5 rounded-xl border-secondary">
                  Browse Skincare
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}
