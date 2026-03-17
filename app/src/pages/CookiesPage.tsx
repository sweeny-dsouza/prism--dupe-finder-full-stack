import { motion } from 'framer-motion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

const cookies = [
    {
        title: "1. What are cookies?",
        content: "Cookies are small text files stored on your device that help websites remember your preferences."
    },
    {
        title: "2. How we use cookies",
        content: "We use cookies to keep you signed in, remember your recently viewed products, and understand how you interact with our platform."
    },
    {
        title: "3. Personalization",
        content: "Cookies allow us to provide personalized product recommendations based on your usage patterns."
    },
    {
        title: "4. Managing cookies",
        content: "You can control and/or delete cookies as you wish through your browser settings."
    }
];

export default function CookiesPage() {
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
                            <BreadcrumbPage>Cookie Policy</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-foreground dark:text-white mb-4 transition-colors">Cookie Policy</h1>
                    <p className="text-muted-foreground dark:text-gray-400 mb-12 transition-colors">Last updated: February 19, 2026</p>

                    <div className="space-y-12">
                        {cookies.map((section) => (
                            <section key={section.title}>
                                <h2 className="text-2xl font-bold text-foreground dark:text-white mb-4 transition-colors">{section.title}</h2>
                                <p className="text-muted-foreground dark:text-gray-400 leading-relaxed italic transition-colors">{section.content}</p>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </motion.main>
    );
}
