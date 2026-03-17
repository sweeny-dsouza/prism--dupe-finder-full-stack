import { motion } from 'framer-motion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

const policySections = [
    {
        title: "1. Information We Collect",
        content: "We collect information you provide directly to us when you create an account, save products, or contact us. This may include your name, email address, skin type, and hair concerns."
    },
    {
        title: "2. How We Use Your Information",
        content: "We use the information we collect to provide, maintain, and improve our services, including personalized product matching and routine generation."
    },
    {
        title: "3. Data Sharing",
        content: "We do not sell your personal data. We may share information with service providers who perform services for us, subject to strict confidentiality obligations."
    },
    {
        title: "4. Your Choices",
        content: "You can access, update, or delete your account information at any time through your profile settings."
    }
];

export default function PrivacyPage() {
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
                            <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-foreground dark:text-white mb-4 transition-colors">Privacy Policy</h1>
                    <p className="text-muted-foreground dark:text-gray-400 mb-12 transition-colors">Last updated: February 19, 2026</p>

                    <div className="space-y-12">
                        {policySections.map((section) => (
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
