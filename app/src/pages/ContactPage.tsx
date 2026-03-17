import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            toast.success("Message sent! We'll get back to you soon.");
            setIsSubmitting(false);
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
                            <BreadcrumbPage>Contact Us</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-8 transition-colors">Get in touch</h1>
                            <p className="text-xl text-muted-foreground dark:text-gray-400 mb-12 leading-relaxed transition-colors">
                                Have a question about a match? Or a product you think we missed?
                                We'd love to hear from you. Our team typically responds within 24 hours.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-white/5 flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-primary dark:text-[#ffb6c1]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground dark:text-white mb-1 transition-colors">Email us</h3>
                                        <p className="text-muted-foreground dark:text-gray-400">hello@prismdupe.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-white/5 flex items-center justify-center shrink-0">
                                        <MessageSquare className="w-6 h-6 text-primary dark:text-[#ffb6c1]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground dark:text-white mb-1 transition-colors">Live Chat</h3>
                                        <p className="text-muted-foreground dark:text-gray-400 font-medium">Available Mon-Fri, 9am-6pm IST</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-white/5 flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-primary dark:text-[#ffb6c1]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground dark:text-white mb-1 transition-colors">Headquarters</h3>
                                        <p className="text-muted-foreground dark:text-gray-400">Bengaluru, Karnataka, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white dark:bg-[#17171c] p-8 lg:p-12 rounded-[2rem] border border-primary/10 dark:border-white/10 shadow-medium transition-all">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground dark:text-white transition-colors">First Name</label>
                                        <Input placeholder="Jane" required className="rounded-xl bg-white dark:bg-[#1a1a21] border-primary/10 dark:border-white/10 dark:text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground dark:text-white transition-colors">Last Name</label>
                                        <Input placeholder="Doe" required className="rounded-xl bg-white dark:bg-[#1a1a21] border-primary/10 dark:border-white/10 dark:text-white" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground dark:text-white transition-colors">Email Address</label>
                                    <Input type="email" placeholder="jane@example.com" required className="rounded-xl bg-white dark:bg-[#1a1a21] border-primary/10 dark:border-white/10 dark:text-white" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground dark:text-white transition-colors">Subject</label>
                                    <Input placeholder="How can we help?" required className="rounded-xl bg-white dark:bg-[#1a1a21] border-primary/10 dark:border-white/10 dark:text-white" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground dark:text-white transition-colors">Message</label>
                                    <Textarea placeholder="Tell us more..." className="min-h-[150px] rounded-xl bg-white dark:bg-[#1a1a21] border-primary/10 dark:border-white/10 dark:text-white" required />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-7 rounded-xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] font-bold text-lg hover:bg-primary/90 dark:hover:opacity-90 transition-all shadow-medium"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                    <Send className="w-5 h-5 ml-2" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </motion.main>
    );
}
