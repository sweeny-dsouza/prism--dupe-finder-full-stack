import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Droplets, Sun, Heart, ArrowRight, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Leaf,
    title: 'Vegan & Cruelty-Free',
    description: 'No animal-derived ingredients or testing. Ever.',
    color: 'from-emerald-400 to-emerald-500'
  },
  {
    icon: Droplets,
    title: 'Fragrance-Free Options',
    description: 'Gentle formulas for sensitive skin types.',
    color: 'from-blue-400 to-blue-500'
  },
  {
    icon: Sun,
    title: 'Reef-Safe Filters',
    description: 'Sunscreen ingredients that protect oceans.',
    color: 'from-amber-400 to-amber-500'
  },
  {
    icon: Shield,
    title: 'Clean Standards',
    description: 'No parabens, sulfates, or phthalates.',
    color: 'from-purple-400 to-purple-500'
  }
];

const stats = [
  { value: '100%', label: 'Ingredient Transparency' },
  { value: '50+', label: 'Products Verified' },
  { value: '0', label: 'Hidden Ingredients' },
];

export default function IngredientTransparency() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-background dark:bg-[#0f0f12] overflow-hidden transition-colors duration-300">
      {/* Background Decorative Elements - Slow Drifting */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{
            x: ['-5%', '5%', '-5%'],
            y: ['-10%', '10%', '-10%'],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-primary/5 dark:bg-white/5 rounded-full blur-[120px] opacity-40" 
        />
        <motion.div 
          animate={{
            x: ['5%', '-5%', '5%'],
            y: ['10%', '-10%', '10%'],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-primary/5 dark:bg-white/5 rounded-full blur-[100px] opacity-40" 
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 dark:bg-white/10 text-primary dark:text-[#ffb6c1] text-sm font-medium mb-4 transition-colors">
                Our Promise
              </span>
              <h2 className="text-4xl lg:text-6xl font-bold text-foreground dark:text-white mb-6 tracking-tight transition-colors">
                Clean, clear, honest.
              </h2>
              <p className="text-lg text-muted-foreground dark:text-gray-300 mb-8 leading-relaxed transition-colors">
                We label vegan, cruelty-free, fragrance-free, and reef-safe—so you can
                choose what fits your values. Every ingredient is listed, every claim
                is verified.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-12 mb-10">
                {stats.map((stat) => (
                  <div key={stat.label} className="relative group">
                    <p className="text-4xl font-bold text-primary dark:text-[#ffb6c1] group-hover:scale-105 transition-all">{stat.value}</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 font-medium uppercase tracking-wider transition-colors">{stat.label}</p>
                  </div>
                ))}
              </div>

              <Link to="/standards">
                <Button className="px-8 py-6 rounded-full bg-primary dark:bg-white text-white dark:text-[#0f0f12] hover:bg-primary/90 dark:hover:bg-white/90 shadow-medium transition-all">
                  Read Our Standards
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            {/* Right Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white dark:bg-[#17171c] rounded-2xl p-6 flex items-start gap-4 hover:shadow-medium transition-all group border border-primary/10 dark:border-white/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary dark:group-hover:bg-[#ffb6c1] group-hover:text-white dark:group-hover:text-[#8B1535] transition-colors">
                    <feature.icon className="w-6 h-6 text-primary dark:text-[#ffb6c1] group-hover:text-white dark:group-hover:text-[#8B1535] transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground dark:text-white mb-1 transition-colors">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed transition-colors">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 pt-12 border-t border-primary/10 dark:border-white/10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Check, text: 'Dermatologist Reviewed' },
                { icon: Heart, text: 'Cruelty-Free Certified' },
                { icon: Leaf, text: 'Sustainable Sourcing' },
                { icon: Shield, text: 'Third-Party Tested' },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-3 justify-center group">
                  <div className="w-10 h-10 rounded-full bg-primary/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <badge.icon className="w-5 h-5 text-primary dark:text-[#ffb6c1]" />
                  </div>
                  <span className="text-sm font-medium text-foreground dark:text-white transition-colors">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
