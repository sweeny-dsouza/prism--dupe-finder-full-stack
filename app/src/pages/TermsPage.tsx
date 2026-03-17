import { motion } from 'framer-motion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

const terms = [
    {
        title: "1. Acceptance of Terms",
        content: "By accessing or using Prism Dupe Finder, you agree to be bound by these Terms of Service."
    },
    {
        title: "2. Description of Service",
        content: "Prism provides information about beauty products and their ingredients. We do not sell products directly."
    },
    {
        title: "3. User Conduct",
        content: "You agree to use the service only for lawful purposes and in a way that does not infringe the rights of others."
    },
    {
        title: "4. Intellectual Property",
        content: "The content on Prism, including the logo, algorithm, and database, is the property of Prism Dupe Finder."
    }
];

export default function TermsPage() {
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
                            <BreadcrumbPage>Terms of Service</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-foreground dark:text-white mb-4 transition-colors">Terms of Service</h1>
                    <p className="text-muted-foreground dark:text-gray-400 mb-12 transition-colors">Last updated: February 19, 2026</p>

                    <div className="space-y-12">
                        {terms.map((section) => (
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
