import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useLocalStorage';
import { formatPrice } from '@/lib/utils';
import SafeImage from '@/components/ui/SafeImage';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16 bg-background dark:bg-[#0f0f12] text-foreground dark:text-white transition-colors duration-300"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:text-[#ffb6c1] text-sm font-bold uppercase tracking-widest mb-4">
            <ShoppingBag className="w-4 h-4" />
            Your Shopping Bag
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-4 leading-tight tracking-tight">
            Review your signature routine.
          </h1>
          <p className="text-muted-foreground text-lg">
            {totalItems} item{totalItems !== 1 ? 's' : ''} ready for delivery
          </p>
        </motion.div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-[#17171c] rounded-3xl p-6 border border-primary/10 dark:border-white/10 shadow-soft flex flex-col sm:flex-row items-center gap-6 group hover:shadow-medium transition-all"
                >
                  <div className="w-32 h-32 bg-primary/5 dark:bg-white/5 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden shrink-0">
                    <SafeImage
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-contain z-10 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex-grow text-center sm:text-left">
                     <p className="text-[10px] font-bold text-primary/40 dark:text-[#ffb6c1]/40 uppercase tracking-[0.22em] mb-1.5">{item.brand}</p>
                    <Link to={`/product/${item.productId}`}>
                      <h3 className="text-xl font-bold text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-[#ffb6c1] transition-colors leading-tight mb-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-lg font-bold text-foreground dark:text-gray-300">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex flex-col items-center sm:items-end gap-4">
                    <div className="flex items-center bg-primary/5 dark:bg-white/5 rounded-full p-1 border border-primary/10 dark:border-white/10">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-white/10 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-primary dark:text-[#ffb6c1]" />
                      </button>
                      <span className="w-10 text-center font-bold text-foreground dark:text-white transition-colors">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-white/10 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-primary dark:text-[#ffb6c1]" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-rose-400 hover:text-rose-500 transition-colors flex items-center gap-1 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#17171c] rounded-[2.5rem] p-8 border border-primary/10 dark:border-white/10 shadow-medium sticky top-24 transition-colors"
              >
                <h2 className="text-2xl font-bold text-foreground dark:text-white mb-8 transition-colors">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-muted-foreground">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-bold">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span className="font-medium">Shipping</span>
                    <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">Free</span>
                  </div>
                  <div className="pt-4 border-t border-primary/5 dark:border-white/5 flex justify-between items-center">
                    <span className="text-xl font-bold text-foreground dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-primary dark:text-[#ffb6c1]">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                 <Button
                  onClick={() => navigate('/checkout')}
                  className="w-full rounded-2xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] py-8 hover:shadow-[0_15px_30px_rgba(139,21,53,0.3)] transition-all text-lg font-bold group border-none"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="mt-6 text-center text-xs text-muted-foreground leading-relaxed">
                  Taxes and shipping calculated at checkout.<br />
                  Secure payment gateway not yet integrated for this demo.
                </p>
              </motion.div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white dark:bg-[#17171c] rounded-[3rem] border border-primary/10 dark:border-white/10 shadow-soft"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-primary/5 flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-primary/40" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Your bag is empty
            </h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
              Looks like you haven't added any products to your bag yet. Start exploring our curated collections.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/dupe-finder">
                <Button className="px-10 py-7 rounded-2xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] hover-lift shadow-medium">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Find Dupes
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}
