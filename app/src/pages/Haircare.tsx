import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wind, Star, Heart, Droplets, Zap, Shield, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { products, hairConcerns } from '@/data/products';
import { useSavedProducts, useCart } from '@/hooks/useLocalStorage';
import { formatPrice } from '@/lib/utils';
import SafeImage from '@/components/ui/SafeImage';

const haircareProducts = products.filter(p => p.category === 'haircare');

const hairTypes = [
  { id: 'straight', name: 'Straight', icon: '━', description: 'Smooth, sleek hair that falls flat' },
  { id: 'wavy', name: 'Wavy', icon: '∿', description: 'Loose S-shaped waves' },
  { id: 'curly', name: 'Curly', icon: '⦿', description: 'Defined curls with bounce' },
  { id: 'coily', name: 'Coily', icon: '◎', description: 'Tight coils and kinks' },
];

export default function Haircare() {
  const [selectedHairType, setSelectedHairType] = useState<string | null>(null);
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);
  const { toggleSaved, isSaved } = useSavedProducts();
  const { addToCart } = useCart();

  const filteredProducts = haircareProducts.filter(product => {
    if (selectedHairType && !product.hairType?.includes(selectedHairType)) return false;
    if (selectedConcern) {
      const concernName = hairConcerns.find(c => c.id === selectedConcern)?.name;
      if (concernName && !product.concerns.some(c => c.toLowerCase() === concernName.toLowerCase())) return false;
    }
    return true;
  });

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
            <Wind className="w-4 h-4" />
            Crown Care
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight"
          >
            Radiant hair. <br /> Luminous savings.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            From sleek strands to defined curls, discover high-performance
            alternatives that prioritize both your hair and your lifestyle.
          </motion.p>
        </div>

        {/* Hair Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">Define Your Canvas</h2>
            <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Select Your Hair Type</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {hairTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedHairType(selectedHairType === type.id ? null : type.id)}
                className={`p-8 rounded-[2rem] transition-all text-center border border-primary/10 dark:border-white/10 group relative overflow-hidden ${selectedHairType === type.id
                  ? 'bg-primary dark:bg-primary text-white shadow-medium border-primary'
                  : 'bg-white dark:bg-[#17171c] hover:shadow-soft hover:border-primary/20'
                  }`}
              >
                <div className={`text-4xl mb-4 transition-transform group-hover:scale-110 duration-500 ${selectedHairType === type.id ? 'text-white' : 'text-primary/40'}`}>
                  {type.icon}
                </div>
                <h3 className={`font-bold text-lg mb-2 ${selectedHairType === type.id ? 'text-white' : 'text-foreground'}`}>
                  {type.name}
                </h3>
                <p className={`text-xs leading-relaxed ${selectedHairType === type.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {type.description}
                </p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Concerns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16 lg:mb-24"
        >
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">Address Your Vision</h2>
            <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Or Shop by Concern</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {hairConcerns.map((concern) => (
              <button
                key={concern.id}
                onClick={() => setSelectedConcern(selectedConcern === concern.id ? null : concern.id)}
                className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${selectedConcern === concern.id
                  ? 'bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] shadow-medium'
                  : 'bg-white dark:bg-[#17171c] border border-primary/10 dark:border-white/10 text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-[#ffb6c1] transition-all'
                  }`}
              >
                {concern.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-10 border-b border-primary/5 dark:border-white/5 pb-6 transition-colors">
            <div>
              <h2 className="text-3xl font-bold text-foreground dark:text-white transition-colors">
                Featured Haircare
              </h2>
              <p className="text-sm text-primary/40 dark:text-[#ffb6c1]/40 uppercase tracking-[0.18em] font-bold mt-1">
                {filteredProducts.length} curated selections
                {selectedHairType && <span className="text-primary dark:text-[#ffb6c1] ml-2">/ {hairTypes.find(t => t.id === selectedHairType)?.name}</span>}
              </p>
            </div>
            {(selectedHairType || selectedConcern) && (
              <button
                onClick={() => {
                  setSelectedHairType(null);
                  setSelectedConcern(null);
                }}
                className="text-xs font-bold text-primary dark:text-[#ffb6c1] uppercase tracking-widest hover:underline transition-colors"
              >
                Reset Gallery
              </button>
            )}
          </div>

          {/* Premium 3-column card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="bg-white dark:bg-[#17171c] rounded-[1.5rem] overflow-hidden border border-primary/10 dark:border-white/10 shadow-soft hover:shadow-[0_20px_60px_rgba(122,28,58,0.14)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">

                  {/* Image Container — square */}
                  <div className="relative aspect-square bg-gradient-to-br from-[#fdf8f5] to-[#f5eff4] dark:from-[#1a1a21] dark:to-[#17171c] overflow-hidden">
                    {/* Hover colour wash */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    <Link to={`/product/${product.id}`}>
                      <SafeImage
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-700 ease-out"
                        fallbackCategory="haircare"
                      />
                    </Link>

                    {/* Discount badge */}
                    {product.originalPrice && (
                      <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        Save {Math.round((product.originalPrice - product.price) / product.originalPrice * 100)}%
                      </div>
                    )}

                    {/* Wishlist button */}
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
                    {/* Brand */}
                    <p className="text-[10px] font-bold text-primary/55 dark:text-[#ffb6c1]/55 uppercase tracking-[0.22em] mb-1.5">{product.brand}</p>

                    {/* Product name */}
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-bold text-[15px] text-foreground dark:text-white group-hover:text-primary dark:group-hover:text-[#ffb6c1] transition-colors leading-snug mb-3 line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Hair Type Tags */}
                    {product.hairType && product.hairType.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {product.hairType.slice(0, 3).map((ht) => (
                          <span
                            key={ht}
                            className="text-[9px] font-bold px-2.5 py-1 rounded-full border border-primary/15 dark:border-white/10 text-primary/65 dark:text-[#ffb6c1]/65 uppercase tracking-widest bg-primary/5 dark:bg-white/5"
                          >
                            {ht}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Star Rating */}
                    <div className="flex items-center gap-1.5 mb-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-primary text-primary dark:fill-[#ffb6c1] dark:text-[#ffb6c1]' : 'text-primary/10 dark:text-white/10'}`} />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-primary/50 dark:text-[#ffb6c1]/50 leading-none">{product.rating}</span>
                    </div>

                    {/* Spacer pushes price + CTA to bottom */}
                    <div className="flex-1" />

                    {/* Price + Add to Cart */}
                    <div className="border-t border-primary/5 dark:border-white/5 pt-4 space-y-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-foreground dark:text-white">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground/40 line-through">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>

                      {/* Full-width burgundy Add to Cart */}
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

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-24 lg:mt-32"
        >
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-white mb-3 text-center transition-colors">Ritual Enlightenment</h2>
            <div className="w-24 h-1 bg-primary/10 dark:bg-white/10 transition-colors" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Droplets, title: 'Deep Hydration', desc: 'Preserve your hair\'s integrity with weekly intensely nourishing treatments.' },
              { icon: Zap, title: 'Thermal Guard', desc: 'Shield your strands from structural damage with premium heat protection.' },
              { icon: Shield, title: 'Nightly Sanctuary', desc: 'Sleep on silk to minimize mechanical stress and maintain nightly sheen.' },
            ].map((tip) => (
              <div key={tip.title} className="p-8 rounded-[2.5rem] bg-white dark:bg-[#17171c] border border-primary/10 dark:border-white/10 text-center shadow-soft hover:shadow-medium transition-all">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-primary/5 dark:bg-white/5 flex items-center justify-center mb-6 transition-colors">
                  <tip.icon className="w-7 h-7 text-primary dark:text-[#ffb6c1] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground dark:text-white mb-3 transition-colors">{tip.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed transition-colors">{tip.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
