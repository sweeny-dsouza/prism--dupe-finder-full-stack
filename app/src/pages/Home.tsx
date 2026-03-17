
import { motion } from 'framer-motion';
import Hero from '@/sections/Hero';
import CategoryGateways from '@/sections/CategoryGateways';
import FeaturedDupe from '@/sections/FeaturedDupe';
import IngredientTransparency from '@/sections/IngredientTransparency';
import FAQ from '@/sections/FAQ';


export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative bg-background dark:bg-[#0f0f12] transition-colors duration-300"
    >
      <Hero />
      <div>
        <CategoryGateways />
        <FeaturedDupe />
        <IngredientTransparency />
        <FAQ />
      </div>
    </motion.main>
  );
}
