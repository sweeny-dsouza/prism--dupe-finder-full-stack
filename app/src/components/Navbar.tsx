import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  User,
  Heart,
  Sparkles,
  ChevronDown,
  ShoppingBag,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser, useCart, useTheme } from '@/hooks/useLocalStorage';

const navLinks = [
  { name: 'Home', path: '/' },
  {
    name: 'Categories',
    path: '#',
    dropdown: [
      { name: 'Skincare', path: '/skincare', icon: '✨' },
      { name: 'Haircare', path: '/haircare', icon: '💇' },
      { name: 'Bodycare', path: '/bodycare', icon: '🧴' },
    ]
  },
  { name: 'Dupe Finder', path: '/dupe-finder' },
  { name: 'Compare', path: '/compare' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useUser();
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/90 dark:bg-[#121216]/90 backdrop-blur-md border-b border-primary/10 dark:border-white/10 shadow-soft'
          : 'bg-white/20 dark:bg-black/20 backdrop-blur-md'
          }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <span className="text-xl lg:text-3xl font-bold text-primary dark:text-white tracking-[0.2em] font-playfair ml-1">
                PRISM
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                link.dropdown ? (
                  <DropdownMenu key={link.name}>
                    <DropdownMenuTrigger asChild>
                      <button className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] transition-all flex items-center gap-1.5 ${isActive(link.dropdown[0].path) || isActive(link.dropdown[1].path) || isActive(link.dropdown[2].path)
                        ? 'text-primary bg-primary/10 shadow-sm'
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                        }`}>
                        {link.name}
                        <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:rotate-180 transition-transform" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="bg-white dark:bg-[#17171c] border-primary/10 dark:border-white/10 shadow-medium rounded-2xl p-2 min-w-[180px]">
                      {link.dropdown.map((item) => (
                        <DropdownMenuItem key={item.path} asChild>
                          <Link
                            to={item.path}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 dark:hover:bg-white/5 cursor-pointer text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors focus:bg-primary/5 focus:text-primary outline-none"
                          >
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] transition-all ${isActive(link.path)
                      ? 'text-primary bg-primary/10 shadow-sm'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3 lg:gap-4">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-[#ffb6c1] hover:bg-primary/5 dark:hover:bg-white/5 transition-all"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ y: 10, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -10, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-[#ffb6c1]" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              <Link
                to="/saved"
                className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-white hover:bg-primary/5 dark:hover:bg-white/5 transition-all"
                aria-label="Saved products"
              >
                <Heart className="w-5 h-5" />
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-white hover:bg-primary/5 dark:hover:bg-white/5 transition-all relative"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-[#0f0f12]">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {user?.isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm hover:shadow-lg transition-all">
                      {user.name.charAt(0).toUpperCase()}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white dark:bg-[#17171c] border-primary/10 dark:border-white/10 shadow-medium rounded-2xl p-2 w-52">
                    <div className="px-4 py-3">
                      <p className="text-sm font-semibold text-foreground dark:text-white transition-colors">{user.name}</p>
                      <p className="text-xs text-muted-foreground dark:text-gray-400 truncate transition-colors">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-primary/10 dark:bg-white/10" />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2 cursor-pointer rounded-xl px-4 py-3 text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-white hover:bg-primary/5 dark:hover:bg-white/5 focus:bg-primary/5 focus:text-primary outline-none transition-colors">
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/saved" className="flex items-center gap-2 cursor-pointer rounded-xl px-4 py-3 text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-white hover:bg-primary/5 dark:hover:bg-white/5 focus:bg-primary/5 focus:text-primary outline-none transition-colors">
                        <Heart className="w-4 h-4" />
                        Saved
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/track-order" className="flex items-center gap-2 cursor-pointer rounded-xl px-4 py-3 text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-white hover:bg-primary/5 dark:hover:bg-white/5 focus:bg-primary/5 focus:text-primary outline-none transition-colors">
                        <ShoppingBag className="w-4 h-4" />
                        Track Order
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-primary/10 dark:bg-white/10" />
                    <DropdownMenuItem onClick={logout} className="flex items-center gap-2 cursor-pointer text-rose-500 rounded-xl px-4 py-3 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors focus:bg-rose-50 outline-none">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="hidden sm:flex rounded-full px-6 bg-primary dark:bg-white text-white dark:text-[#0f0f12] hover:bg-primary/90 dark:hover:bg-white/90 shadow-soft border-none transition-all active:scale-95"
                  >
                    Login
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Search Overlay Removed */}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/40 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-[#0f0f12] border-l border-primary/10 dark:border-white/10 shadow-soft"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-8 pt-24">
                <div className="space-y-3">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      {link.dropdown ? (
                        <div className="space-y-2 mt-4">
                          <p className="text-xs font-bold text-primary/40 uppercase tracking-widest px-4 py-2">{link.name}</p>
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                            >
                              <span className="text-xl">{item.icon}</span>
                              <span className="font-medium">{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <Link
                          to={link.path}
                          className={`block px-4 py-4 rounded-2xl font-medium transition-all ${isActive(link.path)
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                            }`}
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {!user?.isLoggedIn && (
                  <div className="mt-12 pt-8 border-t border-primary/10">
                    <Link to="/login">
                      <Button className="w-full rounded-2xl bg-primary text-white py-7 hover-lift shadow-medium">
                        Login
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
