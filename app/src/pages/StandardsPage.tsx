import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, Globe, Search } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

const standards = [
    {
        icon: ShieldCheck,
        title: "Ingredient Purity",
        description: "We only recommend products that meet our high standards for ingredient quality and safety. We flag potential irritants and endocrine disruptors."
    },
    {
        icon: Leaf,
        title: "Ethical Sourcing",
        description: "We prioritize brands that are cruelty-free and environmentally conscious. Our ratings reflect a brand's commitment to sustainability."
    },
    {
        icon: Globe,
        title: "Scientific Rigor",
        description: "Every match is calculated using our proprietary algorithm that weighs molecular weight, concentration, and delivery systems."
    },
    {
        icon: Search,
        title: "Continuous Audit",
        description: "Formulas change. Our team constantly monitors product reformulations to ensure our database remains 100% accurate."
    }
];

export default function StandardsPage() {
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
                            <BreadcrumbPage>Our Standards</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                <div className="max-w-4xl mx-auto mb-24">
                    <h1 className="text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-8 transition-colors">Our Quality Standards</h1>
                    <p className="text-xl text-muted-foreground dark:text-gray-400 leading-relaxed transition-colors">
                        At Prism, we believe beauty data should be as reliable as a lab report but as accessible as a social feed.
                        We maintain strict criteria for every product that enters our database.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-24">
                    {standards.map((standard, index) => (
                        <motion.div
                            key={standard.title}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex gap-6 p-6 rounded-2xl hover:bg-white dark:hover:bg-white/5 transition-all"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary dark:bg-[#ffb6c1] flex items-center justify-center shrink-0 shadow-soft">
                                <standard.icon className="w-6 h-6 text-white dark:text-[#8B1535]" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-foreground dark:text-white mb-3 transition-colors">{standard.title}</h3>
                                <p className="text-muted-foreground dark:text-gray-400 leading-relaxed transition-colors">{standard.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] rounded-[3rem] p-12 lg:p-20 text-center max-w-6xl mx-auto shadow-medium transition-colors">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">Built on trust, backed by science.</h2>
                    <p className="text-white/80 dark:text-[#8B1535]/80 max-w-2xl mx-auto mb-10 text-lg transition-colors">
                        We are committed to helping you find the highest quality products at the best possible price point,
                        without ever compromising on your skin health.
                    </p>
                    <Link to="/dupe-finder">
                        <button className="px-10 py-4 rounded-xl bg-white dark:bg-[#1a1a21] text-primary dark:text-[#ffb6c1] font-bold hover:opacity-90 transition-all">
                            Start Exploring
                        </button>
                    </Link>
                </div>
            </div>
        </motion.main>
    );
}
