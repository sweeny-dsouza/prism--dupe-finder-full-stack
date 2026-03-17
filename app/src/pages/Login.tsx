import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useLocalStorage';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (isSignUp) {
      if (!name.trim()) {
        toast.error('Please enter your name');
        setIsLoading(false);
        return;
      }
      toast.success('Account created successfully!');
    } else {
      toast.success('Welcome back!');
    }

    login(name || 'User', email);
    navigate('/profile');
    setIsLoading(false);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16 bg-background dark:bg-[#0f0f12] flex items-center justify-center transition-colors duration-300"
    >
      <div className="w-full max-w-md px-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-primary dark:bg-[#ffb6c1] flex items-center justify-center shadow-soft">
              <Sparkles className="w-6 h-6 text-white dark:text-[#8B1535]" />
            </div>
            <span className="text-2xl font-bold text-foreground dark:text-white transition-colors">PRISM</span>
          </Link>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-[#17171c] rounded-3xl p-8 border border-primary/10 dark:border-white/10 shadow-soft"
        >
          <h1 className="text-2xl font-bold text-foreground dark:text-white mb-2 text-center transition-colors">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-muted-foreground dark:text-gray-400 text-center mb-8">
            {isSignUp
              ? 'Join thousands finding their perfect dupes'
              : 'Sign in to access your saved products'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-white mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-4 pr-4 py-6 rounded-xl bg-secondary/50 dark:bg-white/5 border-transparent focus:border-accent dark:focus:border-[#ffb6c1] focus:ring-2 focus:ring-accent/20 dark:focus:ring-[#ffb6c1]/20 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground dark:text-white mb-2 transition-colors">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-white/20" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-6 rounded-xl bg-secondary/50 dark:bg-white/5 border-transparent focus:border-accent dark:focus:border-[#ffb6c1] focus:ring-2 focus:ring-accent/20 dark:focus:ring-[#ffb6c1]/20 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground dark:text-white mb-2 transition-colors">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-white/20" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-6 rounded-xl bg-secondary/50 dark:bg-white/5 border-transparent focus:border-accent dark:focus:border-[#ffb6c1] focus:ring-2 focus:ring-accent/20 dark:focus:ring-[#ffb6c1]/20 dark:text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-white/40 hover:text-foreground dark:hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground dark:text-gray-400">
                  <input type="checkbox" className="rounded border-accent dark:border-[#ffb6c1] text-accent dark:text-[#ffb6c1] bg-transparent" />
                  Remember me
                </label>
                <Link to="/forgot-password" title="Coming soon!" className="text-accent dark:text-[#ffb6c1] hover:text-accent/80">
                  Forgot password?
                </Link>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 rounded-xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] font-bold hover:opacity-90 shadow-soft disabled:opacity-50"
            >
              {isLoading ? (
                'Please wait...'
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-secondary dark:bg-white/10" />
            <span className="text-sm text-muted-foreground dark:text-gray-500">or</span>
            <div className="flex-1 h-px bg-secondary dark:bg-white/10" />
          </div>

          {/* Toggle */}
          <p className="text-center text-muted-foreground dark:text-gray-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-accent dark:text-[#ffb6c1] font-medium hover:text-accent/80"
            >
              {isSignUp ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </motion.div>

        {/* Back Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-8"
        >
          <Link to="/" className="text-sm text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors">
            ← Back to home
          </Link>
        </motion.p>
      </div>
    </motion.main>
  );
}
