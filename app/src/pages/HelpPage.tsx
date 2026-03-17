import { motion } from 'framer-motion';
import { Search, BookOpen, MessageSquare, Shield } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const categories = [
    {
        icon: Search,
        title: "Using the Finder",
        description: "Learn how to get the most out of our ingredient-based search.",
        articles: ["Searching by name", "Understanding match scores", "Filtering results"]
    },
    {
        icon: BookOpen,
        title: "Ingredient Guide",
        description: "Quickly look up benefits and suitability of key skincare ingredients.",
        articles: ["What is Niacinamide?", "Hyaluronic Acid basics", "When to use Retinol"]
    },
    {
        icon: Shield,
        title: "Account & Privacy",
        description: "Manage your saved products and personal data settings.",
        articles: ["Resetting your password", "Deleting your account", "Privacy controls"]
    }
];

export default function HelpPage() {
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
                            <BreadcrumbPage>Help Center</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-8 transition-colors">How can we help?</h1>
                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-white/20" />
                        <Input className="pl-12 py-7 rounded-2xl bg-white dark:bg-[#1a1a21] border-primary/10 dark:border-white/10 shadow-soft text-lg dark:text-white" placeholder="Search for articles, guides..." />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
                    {categories.map((cat) => (
                        <div key={cat.title} className="p-8 rounded-[2rem] bg-white dark:bg-[#17171c] border border-primary/10 dark:border-white/10 shadow-soft transition-all">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-white/5 flex items-center justify-center mb-6">
                                <cat.icon className="w-6 h-6 text-primary dark:text-[#ffb6c1]" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground dark:text-white mb-4 transition-colors">{cat.title}</h3>
                            <p className="text-muted-foreground dark:text-gray-400 text-sm mb-6 transition-colors">{cat.description}</p>
                            <ul className="space-y-3">
                                {cat.articles.map(article => (
                                    <li key={article}>
                                        <button className="text-sm text-primary dark:text-[#ffb6c1] hover:underline text-left transition-colors">{article}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto text-center">
                    <div className="p-12 rounded-[3rem] bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] shadow-medium transition-colors">
                        <MessageSquare className="w-12 h-12 mx-auto mb-6 text-white/40 dark:text-[#8B1535]/40" />
                        <h2 className="text-3xl font-bold mb-4">Still stuck?</h2>
                        <p className="text-white/80 dark:text-[#8B1535]/80 mb-10 text-lg">Our support team is just a message away. Reach out to us for dedicated assistance.</p>
                        <Link to="/contact">
                            <button className="px-10 py-4 rounded-xl bg-white dark:bg-[#1a1a21] text-primary dark:text-[#ffb6c1] font-bold hover:opacity-90 transition-all">Contact Us</button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.main>
    );
}
