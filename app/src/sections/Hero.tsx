
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { addRecentSearch } from '@/lib/utils';
import SearchAutocomplete from '@/components/SearchAutocomplete';



export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      addRecentSearch(query.trim());
      navigate(`/dupe-finder?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 lg:pt-32">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0, x: '-1%', y: '-1%' }}
          animate={{
            scale: [1.1, 1.05, 1.12, 1.08, 1.1],
            x: ['-2%', '1%', '-1%', '2%', '-2%'],
            y: ['-1%', '2%', '0%', '-2%', '-1%'],
            opacity: 0.7
          }}
          transition={{
            opacity: { duration: 1.5, ease: "easeOut" },
            scale: { duration: 25, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 30, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 35, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{
            backgroundImage: 'url("/hero-bg.png")',
            backgroundColor: 'transparent'
          }}
        />
        {/* Dark mode tint - reduced opacity to keep background visible */}
        <div className="absolute inset-0 bg-[#0f0f12] opacity-0 dark:opacity-60 transition-opacity duration-700 z-[1]" />

        {/* Soft Blush/White/Dark Gradient Overlay for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-background/90 dark:from-black/30 dark:via-transparent dark:to-[#0f0f12]/90 z-[2]" />

        {/* Subtle Shimmer Effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none animate-shimmer bg-[length:200%_100%] bg-gradient-to-r from-transparent via-white/20 to-transparent z-[3]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center space-y-8"
        >
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#8B1535]/20 bg-white/40 dark:bg-white/5 backdrop-blur-sm text-[#8B1535] dark:text-[#ffb6c1] text-sm font-medium shadow-sm transition-colors duration-300"
          >
            <Sparkles className="w-4 h-4" />
            <span>Smart Beauty Savings</span>
          </motion.div>

          {/* Headline */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-[80px] font-bold leading-[1.1] text-[#1A1A1A] dark:text-white tracking-tight font-playfair transition-colors duration-300">
              Find your <br />
              <span className="italic text-[#8B1535] dark:text-[#ffb6c1]">perfect match.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#666666] dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-inter font-light transition-colors duration-300">
              Analyze ingredients, compare prices, and discover high-performance
              alternatives to luxury beauty favorites.
            </p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full max-w-2xl mt-4"
          >
            <div className="relative bg-white/80 dark:bg-[#1a1a21]/80 backdrop-blur-md shadow-[0_30px_60px_rgba(139,21,53,0.08)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.3)] rounded-[2rem] p-2 flex items-center border border-[#8B1535]/10 dark:border-white/10 transition-all duration-300">
              <div className="flex-1">
                <SearchAutocomplete
                  onSearch={handleSearch}
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search a product (e.g., Vitamin C serum, La Mer...)"
                  showButton={false}
                  inputClassName="border-none bg-transparent shadow-none focus:ring-0 text-lg py-4 h-auto"
                  className="w-full"
                />
              </div>
              <button
                onClick={() => handleSearch(searchQuery)}
                className="bg-[#8B1535] dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] px-12 py-5 rounded-[1.25rem] flex items-center gap-2 font-bold uppercase tracking-wider hover:bg-[#7A1530] dark:hover:bg-[#ffc0cb] transition-all shadow-[0_15px_30px_rgba(139,21,53,0.3)] dark:shadow-[0_15px_30px_rgba(255,182,193,0.3)] hover:shadow-[0_20px_40px_rgba(139,21,53,0.4)] hover:-translate-y-1"
              >
                <span>Search</span>
              </button>
            </div>
          </motion.div>


        </motion.div>
      </div>

      {/* Edge corner decorations */}
      <div className="absolute top-32 left-8 w-12 h-12 border-t border-l border-[#8B1535]/20 opacity-40 hidden lg:block" />
      <div className="absolute top-32 right-8 w-12 h-12 border-t border-r border-[#8B1535]/20 opacity-40 hidden lg:block" />
    </section>
  );
}
