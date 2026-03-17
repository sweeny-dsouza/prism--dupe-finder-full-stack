import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Zap, Heart } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

const values = [
    {
        icon: Sparkles,
        title: "Transparency First",
        description: "We believe you should know exactly what's in your products. No marketing fluff, just science-backed analysis."
    },
    {
        icon: ShieldCheck,
        title: "Unbiased Matching",
        description: "Our algorithm doesn't play favorites. We match based on ingredient purity, concentration, and real-world performance."
    },
    {
        icon: Zap,
        title: "Smart Savings",
        description: "High-end results shouldn't require a high-end budget. We help you find the best value for your hard-earned money."
    },
    {
        icon: Heart,
        title: "Skin Health",
        description: "Beyond just matching formulas, we prioritize ingredients that support your skin barrier and long-term health."
    }
];

export default function AboutPage() {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 pb-16 bg-background dark:bg-[#0f0f12] text-foreground dark:text-white transition-colors duration-300"
        >
            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 mb-12">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>About Us</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl lg:text-6xl font-bold text-foreground dark:text-white mb-6 transition-colors"
                    >
                        Empowering beauty <br />
                        <span className="text-primary dark:text-[#ffb6c1] tracking-tight">through transparency.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground dark:text-gray-400 leading-relaxed transition-colors"
                    >
                        Prism Dupe Finder was born out of a simple question: why do we pay 10x more for the same ingredients?
                        We're on a mission to democratize luxury beauty by providing the data you need to make informed, affordable choices.
                    </motion.p>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-[2rem] bg-white dark:bg-[#17171c] border border-primary/10 dark:border-white/10 shadow-soft hover-lift transition-all"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-white/5 flex items-center justify-center mb-6">
                                <value.icon className="w-6 h-6 text-primary dark:text-[#ffb6c1]" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground dark:text-white mb-3 transition-colors">{value.title}</h3>
                            <p className="text-muted-foreground dark:text-gray-400 text-sm leading-relaxed transition-colors">{value.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto mb-32">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground dark:text-white mb-6 transition-colors">Our Science</h2>
                        <p className="text-muted-foreground dark:text-gray-400 mb-6 leading-relaxed transition-colors">
                            Our proprietary matching engine analyzes thousands of ingredient lists, looking at both the actives and the base formulation.
                            We don't just look for keywords; we evaluate ingredient order, concentrations, and complex synergy.
                        </p>
                        <p className="text-muted-foreground dark:text-gray-400 leading-relaxed transition-colors">
                            Whether you're looking for a budget-friendly alternative to a luxury serum or a vegan match for your favorite hair mask,
                            we provide clear, side-by-side data to help you decide.
                        </p>
                    </div>
                    <div className="relative aspect-square rounded-[3rem] bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 overflow-hidden flex items-center justify-center p-12 transition-colors">
                        <div className="text-center">
                            <div className="text-6xl font-bold text-primary dark:text-[#ffb6c1] mb-2 transition-colors">94%</div>
                            <div className="text-sm uppercase tracking-widest text-muted-foreground dark:text-gray-400 font-semibold transition-colors">Matching Accuracy</div>
                        </div>
                        {/* Decorative blobs */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>
        </motion.main>
    );
}
