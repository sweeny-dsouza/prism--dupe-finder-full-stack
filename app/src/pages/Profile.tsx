import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Heart, Search, LogOut, Edit2, Check, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser, useSavedProducts, useRecentSearches } from '@/hooks/useLocalStorage';
import { products } from '@/data/products';
import { toast } from 'sonner';

export default function Profile() {
  const { user, logout, updateUser } = useUser();
  const { savedProducts, clearSaved } = useSavedProducts();
  const { recentSearches, clearSearches } = useRecentSearches();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');

  if (!user?.isLoggedIn) {
    return (
      <main className="min-h-screen pt-24 pb-16 bg-background dark:bg-[#0f0f12] flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-secondary dark:bg-white/5 flex items-center justify-center mb-6">
            <User className="w-10 h-10 text-accent dark:text-[#ffb6c1]" />
          </div>
          <h1 className="text-2xl font-bold text-foreground dark:text-white mb-2">Please Sign In</h1>
          <p className="text-muted-foreground dark:text-gray-400 mb-6 transition-colors">Sign in to view your profile and saved products</p>
          <Link to="/login">
            <Button className="px-8 py-5 rounded-xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] hover:opacity-90 shadow-soft font-bold">
              Sign In
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const savedProductsData = products.filter(p => savedProducts.includes(p.id));

  const handleSaveProfile = () => {
    updateUser({ name: editName });
    setIsEditing(false);
    toast.success('Profile updated!');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16 bg-background dark:bg-[#0f0f12] text-foreground dark:text-white transition-colors duration-300"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#17171c] rounded-3xl p-8 border border-primary/10 dark:border-white/10 shadow-soft mb-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] flex items-center justify-center text-3xl font-bold shadow-soft">
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-grow text-center md:text-left">
                {isEditing ? (
                  <div className="flex items-center gap-3">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="max-w-xs bg-white dark:bg-[#1a1a21] border-primary/10 dark:border-white/10 dark:text-white"
                    />
                    <Button onClick={handleSaveProfile} className="bg-emerald-500 hover:bg-emerald-600">
                      <Check className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <h1 className="text-2xl font-bold text-foreground dark:text-white transition-colors tracking-tight font-serif uppercase">{user.name}</h1>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 rounded-full hover:bg-secondary dark:hover:bg-white/5 transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
                    </button>
                  </div>
                )}
                <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mt-1">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="rounded-xl border-secondary dark:border-white/10 text-muted-foreground dark:text-gray-400 hover:bg-secondary dark:hover:bg-white/5"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { icon: Heart, label: 'Saved Products', value: savedProducts.length, color: 'text-rose-400' },
              { icon: Search, label: 'Recent Searches', value: recentSearches.length, color: 'text-[#ffb6c1]' },
              { icon: Sparkles, label: 'Dupes Found', value: '12', color: 'text-amber-400' },
              { icon: User, label: 'Days Active', value: '30+', color: 'text-emerald-400' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-[#17171c] rounded-2xl p-5 border border-primary/10 dark:border-white/10 text-center shadow-soft">
                <div className="w-10 h-10 mx-auto rounded-xl bg-secondary dark:bg-white/5 flex items-center justify-center mb-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                 <p className="text-2xl font-bold text-foreground dark:text-white transition-colors">{stat.value}</p>
                <p className="text-[10px] font-bold text-muted-foreground dark:text-gray-400 uppercase tracking-[0.22em] mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Saved Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white dark:bg-[#17171c] rounded-3xl p-6 border border-primary/10 dark:border-white/10 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground dark:text-white flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-400" />
                    Saved Products
                  </h2>
                  {savedProducts.length > 0 && (
                    <button
                      onClick={clearSaved}
                      className="text-sm text-muted-foreground hover:text-rose-500"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {savedProductsData.length > 0 ? (
                  <div className="space-y-3">
                    {savedProductsData.slice(0, 5).map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 dark:bg-white/5 hover:bg-secondary dark:hover:bg-white/10 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-primary/5 dark:bg-white/10 flex items-center justify-center group-hover:bg-primary dark:group-hover:bg-[#ffb6c1] transition-colors">
                          <span className="text-xl">
                            {product.category === 'skincare' ? '🧴' :
                              product.category === 'haircare' ? '💇' : '🫧'}
                          </span>
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="font-medium text-foreground dark:text-white truncate group-hover:text-accent dark:group-hover:text-[#ffb6c1] transition-colors">
                            {product.name}
                          </p>
                          <p className="text-sm text-muted-foreground dark:text-gray-400">{product.brand}</p>
                        </div>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">${product.price}</span>
                      </Link>
                    ))}
                    {savedProductsData.length > 5 && (
                      <Link to="/saved">
                        <Button variant="ghost" className="w-full text-accent dark:text-[#ffb6c1] hover:bg-secondary dark:hover:bg-white/5">
                          View all {savedProductsData.length} products
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-secondary mx-auto mb-3" />
                    <p className="text-muted-foreground">No saved products yet</p>
                    <Link to="/dupe-finder">
                      <Button className="mt-4 rounded-xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] hover:opacity-90 shadow-soft font-bold">
                        Find Dupes
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Recent Searches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white dark:bg-[#17171c] rounded-3xl p-6 border border-primary/10 dark:border-white/10 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground dark:text-white flex items-center gap-2">
                    <Search className="w-5 h-5 text-accent dark:text-[#ffb6c1]" />
                    Recent Searches
                  </h2>
                  {recentSearches.length > 0 && (
                    <button
                      onClick={clearSearches}
                      className="text-sm text-muted-foreground hover:text-rose-500"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {recentSearches.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search) => (
                      <Link
                        key={search}
                        to={`/dupe-finder?q=${encodeURIComponent(search)}`}
                        className="px-4 py-2 rounded-full bg-secondary dark:bg-white/5 text-sm text-muted-foreground dark:text-gray-400 hover:bg-accent dark:hover:bg-[#ffb6c1] hover:text-white dark:hover:text-[#8B1535] transition-all"
                      >
                        {search}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 text-secondary mx-auto mb-3" />
                    <p className="text-muted-foreground">No recent searches</p>
                    <Link to="/dupe-finder">
                      <Button className="mt-4 rounded-xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] hover:opacity-90 shadow-soft font-bold">
                        Start Searching
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <div className="bg-primary/5 dark:bg-white/5 rounded-3xl p-8 border border-primary/10 dark:border-white/10 transition-colors">
              <h2 className="text-xl font-bold text-foreground dark:text-white mb-6">Quick Links</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Skincare', path: '/skincare', icon: '✨' },
                  { name: 'Haircare', path: '/haircare', icon: '💇' },
                  { name: 'Bodycare', path: '/bodycare', icon: '🧴' },
                  { name: 'Dupe Finder', path: '/dupe-finder', icon: '🔍' },
                ].map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-[#1a1a21] border border-primary/10 dark:border-white/10 shadow-soft hover:shadow-medium hover-lift transition-all"
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <span className="font-medium text-foreground dark:text-white">{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
