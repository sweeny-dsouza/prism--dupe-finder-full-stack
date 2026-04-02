import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Check, Sparkles, TrendingDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { compareProducts, formatPrice } from '@/lib/utils';
import type { Product } from '@/types';
import SafeImage from '@/components/ui/SafeImage';

export default function Compare() {
  const [productA, setProductA] = useState<Product | null>(null);
  const [productB, setProductB] = useState<Product | null>(null);
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const [showSearchA, setShowSearchA] = useState(false);
  const [showSearchB, setShowSearchB] = useState(false);

  const [searchResultsA, setSearchResultsA] = useState<Product[]>([]);
  const [searchResultsB, setSearchResultsB] = useState<Product[]>([]);

  const handleSearchA = async (query: string) => {
    setSearchA(query);
    if (query.length > 2) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/search?q=${query}`);
        const data = await response.json();
        setSearchResultsA(data.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    } else {
      setSearchResultsA([]);
    }
  };

  const handleSearchB = async (query: string) => {
    setSearchB(query);
    if (query.length > 2) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/search?q=${query}`);
        const data = await response.json();
        setSearchResultsB(data.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    } else {
      setSearchResultsB([]);
    }
  };

  const comparison = productA && productB ? compareProducts(productA, productB) : null;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16 bg-background dark:bg-[#0f0f12] text-foreground dark:text-white transition-colors duration-300"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Luxury Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 lg:mb-24 relative overflow-hidden py-12"
        >
          {/* Background Decorative Blobs */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-24 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 dark:bg-white/5 text-primary dark:text-[#ffb6c1] text-sm font-bold uppercase tracking-widest mb-6"
          >
            Intelligence
          </motion.div>
          <h1 className="text-4xl lg:text-7xl font-bold text-foreground dark:text-white mb-6 leading-tight tracking-tight transition-colors">
            Comparison <br /> <span className="italic font-playfair text-primary dark:text-[#ffb6c1]">Enlightened.</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors">
            Analyze the molecular symmetry between your luxury favorites and performance-driven
            alternatives. Make every selection with clarity.
          </p>
        </motion.div>

        {/* Compare Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white dark:bg-[#17171c] rounded-[3rem] p-8 lg:p-12 border border-primary/10 dark:border-white/10 shadow-medium relative overflow-hidden transition-all">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mt-32" />

            {/* Product Selectors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 relative z-10">
              {/* Product A */}
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-[10px] font-bold text-primary/40 dark:text-white/40 uppercase tracking-[0.2em]">Selection One</label>
                  {productA && <button onClick={() => setProductA(null)} className="text-[10px] font-bold text-primary dark:text-[#ffb6c1] uppercase tracking-widest hover:underline">Clear</button>}
                </div>
                {productA ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-[2rem] glass bg-white/40 dark:bg-white/5 border-white/60 dark:border-white/10 flex items-center gap-6 shadow-soft"
                  >
                    <div className="w-24 h-24 rounded-2xl bg-white dark:bg-[#1a1a21] border border-primary/5 dark:border-white/10 overflow-hidden flex items-center justify-center p-3">
                      <SafeImage src={productA.imageUrl} alt={productA.name} className="w-full h-full object-contain" fallbackCategory={productA.category as any} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-[10px] font-bold text-primary/40 dark:text-white/40 uppercase tracking-[0.22em] mb-1.5">{productA.brand}</p>
                      <p className="font-bold text-xl text-foreground dark:text-white truncate leading-tight group-hover:text-primary dark:group-hover:text-[#ffb6c1] transition-colors">{productA.name}</p>
                      <p className="text-2xl font-bold text-foreground dark:text-white mt-2 transition-colors">{formatPrice(productA.price)}</p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/30 dark:text-white/20 group-focus-within:text-primary dark:group-focus-within:text-[#ffb6c1] transition-colors" />
                    <Input
                      placeholder="Search premium product..."
                      value={searchA}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleSearchA(e.target.value);
                        setShowSearchA(true);
                        setShowSearchB(false);
                      }}
                      onFocus={() => {
                        setShowSearchA(true);
                        setShowSearchB(false);
                      }}
                      className="w-full pl-14 pr-6 py-8 rounded-2xl bg-white dark:bg-[#1a1a21] border border-primary/10 dark:border-white/10 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary/10 dark:focus:ring-white/10 transition-all outline-none"
                    />
                    {showSearchA && searchResultsA.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-4 bg-white dark:bg-[#17171c] rounded-[2rem] shadow-medium border border-primary/10 dark:border-white/10 overflow-hidden z-30">
                        {searchResultsA.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => {
                              setProductA(product);
                              setSearchA('');
                              setShowSearchA(false);
                            }}
                            className="w-full px-6 py-4 text-left hover:bg-primary/5 dark:hover:bg-white/5 flex items-center gap-4 transition-colors border-b border-primary/5 dark:border-white/5 last:border-0"
                          >
                            <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#1a1a21] flex items-center justify-center text-xl">
                              {product.category === 'skincare' ? '🧴' :
                                product.category === 'haircare' ? '💇' : '🫧'}
                            </div>
                            <div className="flex-grow min-w-0">
                              <p className="font-bold text-foreground dark:text-white text-sm truncate">{product.name}</p>
                              <p className="text-[10px] text-muted-foreground/60 dark:text-gray-500 uppercase tracking-widest">{product.brand} • {formatPrice(product.price)}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Interaction Decorator */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex w-12 h-12 rounded-full bg-white dark:bg-[#1a1a21] border border-primary/10 dark:border-white/10 items-center justify-center z-10 text-primary dark:text-[#ffb6c1] shadow-soft">
                <Sparkles className="w-5 h-5" />
              </div>

              {/* Product B */}
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-[10px] font-bold text-primary/40 dark:text-white/40 uppercase tracking-[0.2em]">Selection Two</label>
                  {productB && <button onClick={() => setProductB(null)} className="text-[10px] font-bold text-primary dark:text-[#ffb6c1] uppercase tracking-widest hover:underline">Clear</button>}
                </div>
                {productB ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-[2rem] glass bg-white/40 dark:bg-white/5 border-white/60 dark:border-white/10 flex items-center gap-6 shadow-soft"
                  >
                    <div className="w-24 h-24 rounded-2xl bg-white dark:bg-[#1a1a21] border border-primary/5 dark:border-white/10 overflow-hidden flex items-center justify-center p-3">
                      <SafeImage src={productB.imageUrl} alt={productB.name} className="w-full h-full object-contain" fallbackCategory={productB.category as any} />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-[10px] font-bold text-primary/40 dark:text-white/40 uppercase tracking-[0.22em] mb-1.5">{productB.brand}</p>
                      <p className="font-bold text-xl text-foreground dark:text-white truncate leading-tight group-hover:text-primary dark:group-hover:text-[#ffb6c1] transition-colors">{productB.name}</p>
                      <p className="text-2xl font-bold text-foreground dark:text-white mt-2 transition-colors">{formatPrice(productB.price)}</p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/30 dark:text-white/20 group-focus-within:text-primary dark:group-focus-within:text-[#ffb6c1] transition-colors" />
                    <Input
                      placeholder="Search premium product..."
                      value={searchB}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleSearchB(e.target.value);
                        setShowSearchB(true);
                        setShowSearchA(false);
                      }}
                      onFocus={() => {
                        setShowSearchB(true);
                        setShowSearchA(false);
                      }}
                      className="w-full pl-14 pr-6 py-8 rounded-2xl bg-white dark:bg-[#1a1a21] border border-primary/10 dark:border-white/10 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary/10 dark:focus:ring-white/10 transition-all outline-none"
                    />
                    {showSearchB && searchResultsB.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-4 bg-white dark:bg-[#17171c] rounded-[2rem] shadow-medium border border-primary/10 dark:border-white/10 overflow-hidden z-30">
                        {searchResultsB.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => {
                              setProductB(product);
                              setSearchB('');
                              setShowSearchB(false);
                            }}
                            className="w-full px-6 py-4 text-left hover:bg-primary/5 dark:hover:bg-white/5 flex items-center gap-4 transition-colors border-b border-primary/5 dark:border-white/5 last:border-0"
                          >
                            <div className="w-10 h-10 rounded-lg bg-white dark:bg-[#1a1a21] flex items-center justify-center text-xl">
                              {product.category === 'skincare' ? '🧴' :
                                product.category === 'haircare' ? '💇' : '🫧'}
                            </div>
                            <div className="flex-grow min-w-0">
                              <p className="font-bold text-foreground dark:text-white text-sm truncate">{product.name}</p>
                              <p className="text-[10px] text-muted-foreground/60 dark:text-gray-500 uppercase tracking-widest">{product.brand} • {formatPrice(product.price)}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Comparison Results */}
            {comparison && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-primary/5 pt-12 relative z-10"
              >
                {/* Summary Grid */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
                  <div className="px-8 py-4 rounded-[1.5rem] bg-primary/5 dark:bg-white/5 border border-primary/5 dark:border-white/10 transition-colors">
                    <p className="text-[10px] font-bold text-primary/40 dark:text-white/40 uppercase tracking-[0.2em] mb-1">Ingredient Symmetry</p>
                    <p className="text-3xl font-bold text-foreground dark:text-white">{comparison.sharedIngredients.length}</p>
                  </div>
                  <div className="px-8 py-4 rounded-[1.5rem] bg-primary/5 dark:bg-white/5 border border-primary/5 dark:border-white/10 transition-colors">
                    <p className="text-[10px] font-bold text-primary/40 dark:text-white/40 uppercase tracking-[0.2em] mb-1">Financial Variance</p>
                    <p className={`text-3xl font-bold ${comparison.priceDifference > 0 ? 'text-emerald-500' : 'text-rose-400'}`}>
                      {comparison.priceDifference > 0 ? '+' : '-'}{formatPrice(Math.abs(comparison.priceDifference))}
                    </p>
                  </div>
                  {comparison.betterValue && comparison.betterValue !== 'equal' && (
                    <div className="px-8 py-4 rounded-[1.5rem] bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-500/10 dark:border-emerald-500/20 relative overflow-hidden group transition-colors">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl -mr-8 -mt-8" />
                      <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-1 flex items-center gap-1.5">
                        <Check className="w-3 h-3" /> Optimum Selection
                      </p>
                      <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">Product {comparison.betterValue}</p>
                    </div>
                  )}
                </div>

                {/* Detailed Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Shared */}
                  <div className="lg:col-span-2">
                    <div className="flex flex-col mb-8 text-left">
                      <h3 className="text-2xl font-bold text-foreground dark:text-white mb-2 transition-colors">Convergent Elements</h3>
                      <p className="text-[10px] font-bold text-primary/40 dark:text-white/40 uppercase tracking-[0.2em]">Harmonized across both formulations</p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {comparison.sharedIngredients.map((ing) => (
                        <div key={ing} className="px-5 py-2 rounded-xl bg-primary/5 dark:bg-white/5 border border-emerald-500/10 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-wide flex items-center gap-2 transition-all">
                          <Check className="w-3 h-3 text-emerald-500" />
                          {ing}
                        </div>
                      ))}
                      {comparison.sharedIngredients.length === 0 && (
                        <div className="p-8 rounded-[2rem] bg-primary/5 dark:bg-white/5 border border-primary/5 dark:border-white/10 text-center w-full transition-colors">
                          <p className="text-muted-foreground dark:text-gray-400 leading-relaxed italic transition-colors">No identical molecular matches identified.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recommendations / Insights */}
                  <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-[#1a1a21] rounded-[2rem] p-8 border border-primary/10 dark:border-white/10 relative overflow-hidden h-full transition-all">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 transition-colors" />
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold text-foreground dark:text-white mb-6 flex items-center gap-3 transition-colors">
                          <Sparkles className="w-5 h-5 text-primary/40 dark:text-white/40" />
                          Expert Insight
                        </h3>
                        <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed mb-8 transition-colors">
                          {comparison.sharedIngredients.length > 5
                            ? `With ${comparison.sharedIngredients.length} active parallels, these formulations exhibit significant therapeutic overlap.The performance profile is remarkably consistent.`
                            : `Minimal molecular intersection detected.These products likely target distinct dermal concerns through divergent biological pathways.`}
                        </p>
                        {comparison.priceDifference > 20 && (
                          <div className="p-5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 dark:border-emerald-500/20 transition-all">
                            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2 transition-colors">Value Discovery</p>
                            <p className="text-[13px] text-emerald-700/80 dark:text-emerald-400/80 font-medium italic transition-colors">
                              "Product B achieves comparable efficacy while optimization your beauty investment. A superior value proposition."
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Unique to A */}
                  <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4 pt-12 border-t border-primary/5 dark:border-white/5 transition-colors">
                    <div>
                      <h3 className="text-xl font-bold text-foreground dark:text-white mb-4 transition-colors">Exclusive: {comparison.productA?.name.slice(0, 25)}...</h3>
                      <div className="flex flex-wrap gap-2">
                        {comparison.uniqueToA.slice(0, 10).map((ing) => (
                          <div key={ing} className="px-4 py-1.5 rounded-lg bg-primary/5 dark:bg-white/5 border border-primary/5 dark:border-white/10 text-muted-foreground dark:text-gray-400 text-[11px] font-bold tracking-wider uppercase transition-colors">
                            {ing}
                          </div>
                        ))}
                        {comparison.uniqueToA.length > 10 && (
                          <div className="px-4 py-1.5 rounded-lg bg-primary/5 dark:bg-white/5 border border-primary/5 dark:border-white/10 text-primary/40 dark:text-white/40 text-[10px] font-bold uppercase tracking-widest transition-colors">+{comparison.uniqueToA.length - 10} Additional</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground dark:text-white mb-4 transition-colors">Exclusive: {comparison.productB?.name.slice(0, 25)}...</h3>
                      <div className="flex flex-wrap gap-2">
                        {comparison.uniqueToB.slice(0, 10).map((ing) => (
                          <div key={ing} className="px-4 py-1.5 rounded-lg bg-primary/5 dark:bg-white/5 border border-primary/5 dark:border-white/10 text-muted-foreground dark:text-gray-400 text-[11px] font-bold tracking-wider uppercase transition-colors">
                            {ing}
                          </div>
                        ))}
                        {comparison.uniqueToB.length > 10 && (
                          <div className="px-4 py-1.5 rounded-lg bg-primary/5 dark:bg-white/5 border border-primary/5 dark:border-white/10 text-primary/40 dark:text-white/40 text-[10px] font-bold uppercase tracking-widest transition-colors">+{comparison.uniqueToB.length - 10} Additional</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {!comparison && (
              <div className="text-center py-24 relative z-10 transition-all">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-primary/5 dark:bg-white/5 flex items-center justify-center mb-8 transition-colors">
                  <TrendingDown className="w-7 h-7 text-primary/20 dark:text-white/10" />
                </div>
                <h3 className="text-2xl font-bold text-foreground dark:text-white mb-2 transition-colors">Initiate Comparison</h3>
                <p className="text-muted-foreground dark:text-gray-400 leading-relaxed transition-colors">Select two selections to reveal their molecular harmony and value potential.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
