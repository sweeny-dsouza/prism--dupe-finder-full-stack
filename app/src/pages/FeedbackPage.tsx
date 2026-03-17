import { motion } from 'framer-motion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function FeedbackPage() {
    const [rating, setRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            toast.success("Thank you for your feedback!");
            setIsSubmitting(false);
            setRating(0);
        }, 1500);
    };

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
                            <BreadcrumbPage>Feedback</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                <div className="max-w-2xl mx-auto bg-white dark:bg-[#17171c] p-8 lg:p-12 rounded-[2rem] border border-primary/10 dark:border-white/10 shadow-medium transition-all">
                    <h1 className="text-3xl font-bold text-foreground dark:text-white mb-4 transition-colors">We value your feedback</h1>
                    <p className="text-muted-foreground dark:text-gray-400 mb-8 transition-colors">
                        How was your experience using Prism Dupe Finder? We're constantly improving and your input helps us build a better platform.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="text-sm font-medium text-foreground dark:text-white mb-4 block transition-colors">Product Experience Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className="p-1 transition-transform hover:scale-110"
                                    >
                                        <Star className={`w-8 h-8 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground dark:text-white transition-colors">What do you like most?</label>
                            <Textarea placeholder="The ingredient matching is great!" className="rounded-xl min-h-[100px] bg-white dark:bg-[#1a1a21] border-primary/10 dark:border-white/10 dark:text-white" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground dark:text-white transition-colors">What could we improve?</label>
                            <Textarea placeholder="More budget alternatives..." className="rounded-xl min-h-[100px] bg-white dark:bg-[#1a1a21] border-primary/10 dark:border-white/10 dark:text-white" />
                        </div>

                        <Button disabled={isSubmitting || rating === 0} className="w-full py-6 rounded-xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] font-bold hover:opacity-90 transition-all">
                            {isSubmitting ? 'Sending...' : 'Submit Feedback'}
                        </Button>
                    </form>
                </div>
            </div>
        </motion.main>
    );
}
