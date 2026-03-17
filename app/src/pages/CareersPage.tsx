import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const jobs = [
    {
        title: "Data Scientist (Beauty & Ingredients)",
        location: "Remote / Bengaluru",
        type: "Full-time",
        description: "Help us refine our matching algorithm and expand our ingredient database."
    },
    {
        title: "Full Stack Engineer",
        location: "Bengaluru",
        type: "Full-time",
        description: "Build the next generation of our dupe-finding platform using React and Node.js."
    },
    {
        title: "Content Strategist",
        location: "Remote",
        type: "Contract",
        description: "Create engaging content about skincare science and budget beauty matching."
    }
];

export default function CareersPage() {
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
                            <BreadcrumbPage>Careers</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-6 transition-colors">Join the PRISM team</h1>
                    <p className="text-xl text-muted-foreground dark:text-gray-400 mb-16 leading-relaxed transition-colors">
                        We're building a more transparent future for the beauty industry.
                        If you're passionate about data, science, and helping people save, we'd love to meet you.
                    </p>

                    <div className="space-y-6 mb-24">
                        {jobs.map((job) => (
                            <motion.div
                                key={job.title}
                                whileHover={{ y: -4 }}
                                className="p-8 rounded-2xl bg-white dark:bg-[#17171c] border border-primary/10 dark:border-white/10 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
                            >
                                <div>
                                    <h3 className="text-xl font-bold text-foreground dark:text-white mb-2 transition-colors">{job.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground dark:text-gray-400 mb-4 transition-colors">
                                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#ffb6c1]" /> {job.location}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-[#ffb6c1]" /> {job.type}</span>
                                        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4 text-[#ffb6c1]" /> Professional</span>
                                    </div>
                                    <p className="text-muted-foreground dark:text-gray-400 text-sm max-w-xl transition-colors">{job.description}</p>
                                </div>
                                <Button className="rounded-xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] font-bold hover:opacity-90">Apply Now</Button>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center p-12 rounded-[2rem] bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 transition-colors">
                        <h2 className="text-2xl font-bold text-foreground dark:text-white mb-4 transition-colors">Don't see a role for you?</h2>
                        <p className="text-muted-foreground dark:text-gray-400 mb-8 transition-colors">
                            We're always looking for talented individuals. Send your resume to careers@prismdupe.com
                        </p>
                        <Link to="/contact">
                            <Button variant="outline" className="rounded-xl border-primary dark:border-[#ffb6c1] text-primary dark:text-[#ffb6c1] hover:bg-primary/5 dark:hover:bg-white/5">Get in Touch</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.main>
    );
}
