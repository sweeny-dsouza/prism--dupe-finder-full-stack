import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Heart
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

const footerLinks = {
  categories: [
    { name: 'Skincare', path: '/skincare' },
    { name: 'Haircare', path: '/haircare' },
    { name: 'Bodycare', path: '/bodycare' },
    { name: 'Dupe Finder', path: '/dupe-finder' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Our Standards', path: '/standards' },
    { name: 'Careers', path: '/careers' },
  ],
  support: [
    { name: 'Help Center', path: '/help' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Feedback', path: '/feedback' },
  ],
  legal: [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Mail, href: 'mailto:hello@prism.com', label: 'Email' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Successfully subscribed to newsletter!');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-[#7a1c3a] dark:bg-[#0f0f12] relative overflow-hidden text-white/90 border-t border-white/5 transition-colors duration-300">
      {/* Background Decorative Elements - Removed or toned down */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] -ml-32 -mb-32" />
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16 lg:py-24 border-b border-primary/10 dark:border-white/10 transition-colors">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/5 dark:bg-white/[0.02] rounded-[2rem] p-8 lg:p-12 border border-white/10 dark:border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-left">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    Never miss <br /> a perfect match.
                  </h3>
                  <p className="text-white/60 font-light max-w-sm">
                    Join our newsletter for weekly curated dupes, ingredient spotlights, and exclusive beauty tips.
                  </p>
                </div>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40 dark:text-[#ffb6c1]/40 transition-colors" />
                     <Input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-6 rounded-xl bg-white/10 dark:bg-white/5 border-white/10 dark:border-white/10 text-white placeholder:text-white/30 focus:ring-1 focus:ring-white/30 transition-all outline-none border-none ring-1 ring-white/10"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-6 rounded-xl bg-white dark:bg-[#ffb6c1] text-[#7a1c3a] dark:text-[#8B1535] font-semibold hover:bg-white/90 dark:hover:bg-[#ffc0cb] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Footer Content */}
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-8 group">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#ffb6c1] flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                  <Sparkles className="w-5 h-5 text-[#7a1c3a] dark:text-[#8B1535]" />
                </div>
                 <span className="text-2xl font-bold text-white tracking-[0.2em] font-playfair ml-1">PRISM</span>
              </Link>
              <p className="text-sm text-white/60 mb-8 leading-relaxed font-light">
                Discover performance-driven beauty alternatives. We analyze ingredients so you can save smart and glow brighter.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-6">
                Shop
              </h4>
              <ul className="space-y-4">
                {footerLinks.categories.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-white/60 hover:text-white transition-colors font-light"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-6">
                Discovery
              </h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-white/60 hover:text-white transition-colors font-light"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-6">
                Assistance
              </h4>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-white/60 hover:text-white transition-colors font-light"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="col-span-2 md:col-span-1 lg:col-span-1">
              <h4 className="text-sm font-semibold text-white/80 dark:text-foreground/80 uppercase tracking-widest mb-6 transition-colors">
                Legal
              </h4>
              <ul className="space-y-4">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-white/60 hover:text-white transition-colors font-light"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-sm text-white/40 font-light">
              © {new Date().getFullYear()} Prism Dupe Finder. Made for beautiful savings.
            </p>
            <div className="flex items-center gap-6">
              <p className="text-sm text-white/40 flex items-center gap-1 font-light">
                Curated with <Heart className="w-3 h-3 text-white/60 fill-white/20" /> by Sweeny Dsouza
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
