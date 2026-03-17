import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How does the dupe finder work?',
    answer: 'Our dupe finder uses a sophisticated algorithm that analyzes products based on ingredients (35%), texture/finish (20%), target concerns (20%), product type (15%), and user ratings (10%). We compare these factors across our database to find the closest matches at lower price points.'
  },
  {
    question: 'Are dupes exact copies of luxury products?',
    answer: 'No, dupes are not exact copies. They are products with similar key ingredients, textures, and benefits that can deliver comparable results. While the formulations may differ, our matches focus on shared active ingredients and similar performance.'
  },
  {
    question: 'How is similarity calculated?',
    answer: 'Our similarity score is calculated using a weighted algorithm: 35% ingredient overlap, 20% texture and finish match, 20% target concern alignment, 15% product category match, and 10% rating similarity. This gives you a comprehensive view of how closely products compare.'
  },
  {
    question: 'Can I trust ingredient matching?',
    answer: 'Absolutely! We verify every ingredient list against manufacturer data and third-party sources. Our database is regularly updated to ensure accuracy. We also highlight shared active ingredients so you can see exactly what makes products similar.'
  },
  {
    question: 'Is this suitable for sensitive skin?',
    answer: 'Many of our recommended dupes include fragrance-free and gentle options suitable for sensitive skin. We clearly label products with tags like "fragrance-free" and "sensitive-skin safe." Always patch test new products, especially if you have sensitive skin.'
  },
  {
    question: 'Are products cruelty-free and vegan?',
    answer: 'We clearly label products that are cruelty-free and vegan. Look for these tags on product cards. Our standards page provides more details on our verification process for these claims.'
  },
  {
    question: 'How often is the database updated?',
    answer: 'Our database is updated weekly with new products, price changes, and user reviews. We continuously verify ingredient lists and product availability to ensure you have the most current information.'
  },
  {
    question: 'Can I save products for later?',
    answer: 'Yes! Create a free account to save products, track your recent searches, and build your personal dupe library. Your saved products are accessible across all your devices.'
  }
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} id="faq" className="relative py-24 lg:py-32 bg-background dark:bg-[#0f0f12] overflow-hidden transition-colors duration-300">
      {/* Background Decorative Elements - Signature Slow Drift */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{
            x: ['-5%', '5%', '-5%'],
            y: ['-10%', '10%', '-10%'],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-primary/5 dark:bg-white/5 rounded-full blur-[100px] opacity-40" 
        />
        <motion.div 
          animate={{
            x: ['5%', '-5%', '5%'],
            y: ['10%', '-10%', '10%'],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[30vw] h-[30vh] bg-primary/5 dark:bg-white/5 rounded-full blur-[80px] opacity-40" 
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 dark:bg-white/10 text-primary dark:text-[#ffb6c1] text-sm font-medium mb-4 transition-colors">
              Got Questions?
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground dark:text-white mb-4 leading-tight tracking-tight transition-colors">
              Frequently asked <br /> questions
            </h2>
            <p className="text-lg text-muted-foreground dark:text-gray-400 max-lg mx-auto leading-relaxed transition-colors">
              Everything you need to know about finding your perfect match
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div
                  className={`bg-white dark:bg-[#17171c] rounded-2xl border border-primary/10 dark:border-white/10 overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-medium border-primary/30 dark:border-[#ffb6c1]/30' : 'shadow-soft'
                    }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-primary/5 dark:hover:bg-white/5 transition-colors group"
                  >
                    <span className={`font-semibold text-lg transition-colors duration-300 ${openIndex === index ? 'text-primary dark:text-[#ffb6c1]' : 'text-foreground/80 dark:text-white/80'}`}>{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${openIndex === index ? 'bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535]' : 'bg-primary/10 dark:bg-white/10 text-primary dark:text-[#ffb6c1]'} transition-colors`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: openIndex === index ? 'auto' : 0,
                      opacity: openIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-muted-foreground dark:text-gray-400 leading-relaxed pt-4 border-t border-primary/5 dark:border-white/5 transition-colors">
                      {faq.answer}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Still Have Questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white dark:bg-[#17171c] border border-primary/10 dark:border-white/10 shadow-soft transition-colors">
              <HelpCircle className="w-5 h-5 text-primary dark:text-[#ffb6c1]" />
              <span className="text-muted-foreground dark:text-gray-400">Still have questions?</span>
              <a href="/contact" className="text-primary dark:text-[#ffb6c1] font-medium hover:underline transition-all">
                Contact us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
