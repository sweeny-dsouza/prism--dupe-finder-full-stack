import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, GitCompare, Bookmark } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Search',
    description: 'Type a product, brand, or ingredient. Our smart search understands what you\'re looking for.',
    icon: Search,
    color: 'from-primary to-primary/80',
    features: ['Fuzzy matching', 'Ingredient search', 'Brand lookup']
  },
  {
    number: '02',
    title: 'Compare',
    description: 'See the match score, shared actives, and differences side by side.',
    icon: GitCompare,
    color: 'from-accent to-accent/80',
    features: ['Ingredient overlap', 'Price comparison', 'Texture match']
  },
  {
    number: '03',
    title: 'Save',
    description: 'Build your routine and track what works. Access your saved dupes anytime.',
    icon: Bookmark,
    color: 'from-secondary to-secondary/80',
    features: ['Personal library', 'Recent searches', 'Share with friends']
  }
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="how-it-works" className="relative py-24 lg:py-32 bg-background dark:bg-[#0f0f12] overflow-hidden transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-primary/5 dark:bg-white/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-primary/5 dark:bg-white/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground dark:text-white mb-4 tracking-tight transition-colors">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto leading-relaxed transition-colors">
            We match by ingredients, texture, and real reviews—so you save without guessing.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[70%] w-[60%] h-[1px] bg-gradient-to-r from-primary/20 to-transparent" />
              )}

              <div className="bg-white dark:bg-[#17171c] rounded-[2rem] p-8 lg:p-10 border border-primary/10 dark:border-white/10 shadow-soft h-full hover:shadow-medium transition-all group">
                {/* Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-primary/10 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary dark:group-hover:bg-[#ffb6c1] group-hover:text-white dark:group-hover:text-[#8B1535] transition-colors`}>
                    <step.icon className={`w-6 h-6 text-primary dark:text-[#ffb6c1] group-hover:text-white dark:group-hover:text-[#8B1535] transition-colors`} />
                  </div>
                  <span className="text-5xl font-bold text-primary/5 dark:text-white/5 group-hover:text-primary/10 dark:group-hover:text-white/10 transition-colors">{step.number}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-bold text-foreground dark:text-white mb-3 transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground dark:text-gray-400 mb-6 leading-relaxed transition-colors">
                  {step.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {step.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40 dark:bg-[#ffb6c1]/40" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Algorithm Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 lg:mt-20 max-w-3xl mx-auto"
        >
          <div className="bg-white dark:bg-[#17171c] rounded-[2.5rem] p-8 lg:p-10 border border-primary/10 dark:border-white/10 shadow-soft transition-colors">
            <h3 className="text-xl font-bold text-foreground dark:text-white mb-8 text-center italic">
              Our Matching Algorithm
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: 'Ingredients', value: '35%', desc: 'Shared actives' },
                { label: 'Texture', value: '20%', desc: 'Feel & finish' },
                { label: 'Concerns', value: '20%', desc: 'Target issues' },
                { label: 'Type', value: '15%', desc: 'Product category' },
                { label: 'Rating', value: '10%', desc: 'User reviews' },
              ].map((item) => (
                <div key={item.label} className="text-center p-4 rounded-2xl bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 transition-all">
                  <p className="text-2xl font-bold text-primary dark:text-[#ffb6c1]">{item.value}</p>
                  <p className="text-sm font-medium text-foreground dark:text-white">{item.label}</p>
                  <p className="text-xs text-muted-foreground/60 dark:text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
