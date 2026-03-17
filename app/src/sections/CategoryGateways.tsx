import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Wind, Droplets, ArrowRight } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';

const categories = [
  {
    id: 'skincare',
    name: 'Skincare',
    description: 'Discover serums, moisturizers, and treatments that match your skin\'s needs without the luxury price tag.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=800&fit=crop',
    color: 'from-primary to-primary/80',
    bgColor: 'bg-secondary/30',
    stats: '20+ Products'
  },
  {
    id: 'haircare',
    name: 'Haircare',
    description: 'Find shampoos, conditioners, and styling products tailored to your hair type and concerns.',
    icon: Wind,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&h=800&fit=crop',
    color: 'from-accent to-accent/80',
    bgColor: 'bg-accent/20',
    stats: '15+ Products'
  },
  {
    id: 'bodycare',
    name: 'Bodycare',
    description: 'Explore body lotions, scrubs, and treatments for your complete self-care routine.',
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=800&fit=crop',
    color: 'from-secondary to-secondary/80',
    bgColor: 'bg-secondary/20',
    stats: '15+ Products'
  }
];

export default function CategoryGateways() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-background dark:bg-[#0f0f12] overflow-hidden transition-colors duration-300">
      {/* Background Blob - Animated Drift */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: ['-10%', '10%', '-5%', '8%', '-10%'],
            y: ['-5%', '5%', '10%', '-8%', '-5%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-gradient-radial from-primary/10 dark:from-white/10 via-secondary/20 dark:via-white/5 to-transparent rounded-full blur-3xl opacity-40"
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground dark:text-white mb-6 tracking-tight transition-colors">
            Explore by category
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors font-inter font-light">
            Dupes for every routine—backed by ingredients, not hype.
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
            >
              <Link to={`/${category.id}`}>
                <motion.div
                  whileHover={{ y: -12, scale: 1.01 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`group relative h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden ${category.bgColor} dark:bg-white/5 backdrop-blur-md border border-primary/5 dark:border-white/10 shadow-soft hover:shadow-medium transition-all duration-500`}
                >
                  {/* Image with Parallax-like scale */}
                  <div className="absolute inset-0">
                    <SafeImage
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      fallbackCategory="all"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                  </div>

                  {/* Content Highlights */}
                  <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end">
                    {/* Icon Badge - Animated on hover */}
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 shadow-xl border border-white/20`}
                    >
                      <category.icon className="w-7 h-7 text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3 tracking-snug transition-transform duration-500 group-hover:-translate-y-1">
                      {category.name}
                    </h3>

                    {/* Description */}
                    <p className="text-white/80 text-base lg:text-lg mb-6 line-clamp-2 font-inter font-light transition-transform duration-500 group-hover:-translate-y-1">
                      {category.description}
                    </p>

                    {/* Stats & CTA */}
                    <div className="flex items-center justify-between mt-2 pt-6 border-t border-white/10">
                      <span className="text-white/60 text-sm font-medium tracking-wide">{category.stats.toUpperCase()}</span>
                      <div className="flex items-center gap-3 text-white font-semibold">
                        <span className="text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">Explore</span>
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white text-white group-hover:text-primary transition-all duration-500 shadow-lg">
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link
            to="/dupe-finder"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-foreground dark:bg-white text-primary-foreground dark:text-[#0f0f12] font-semibold hover:bg-foreground/90 dark:hover:bg-white/90 transition-all shadow-xl hover:-translate-y-1"
          >
            <Sparkles className="w-5 h-5" />
            Find Your Dupe
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
