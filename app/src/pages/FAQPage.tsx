import { motion } from 'framer-motion';
import FAQ from '@/sections/FAQ';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

export default function FAQPage() {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-24 pb-16 bg-background dark:bg-[#0f0f12] transition-colors duration-300"
        >
            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 mb-8">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>FAQs</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <FAQ />

            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 mt-16 text-center">
                <div className="max-w-2xl mx-auto p-8 rounded-[2rem] bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 transition-colors">
                    <h2 className="text-2xl font-bold text-foreground dark:text-white mb-4 transition-colors">Still have questions?</h2>
                    <p className="text-muted-foreground dark:text-gray-400 mb-6 transition-colors">
                        We're here to help you find your perfect match. Reach out to our team of beauty experts.
                    </p>
                    <Link to="/contact">
                        <button className="px-8 py-3 rounded-xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] font-bold hover:opacity-90 transition-all">
                            Contact Support
                        </button>
                    </Link>
                </div>
            </div>
        </motion.main>
    );
}
