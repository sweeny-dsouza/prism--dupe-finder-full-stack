import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Package, Command, Truck, Home, Check, Box, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOrders } from '@/hooks/useLocalStorage';
import type { OrderStatus } from '@/types';

const statusSteps: OrderStatus[] = [
  'Order Placed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

export default function OrderTracking() {
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get('id');
  const [searchId, setSearchId] = useState(queryId || '');
  const { getOrder } = useOrders();
  const navigate = useNavigate();

  const order = queryId ? getOrder(queryId) : undefined;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      navigate(`/track-order?id=${searchId.trim()}`);
    }
  };

  // Mock progress simulation based on order date
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  useEffect(() => {
    if (order) {
      // Logic to simulate progress - older orders are further along
      const orderDate = new Date(order.date).getTime();
      const now = new Date().getTime();
      const diffHours = (now - orderDate) / (1000 * 60 * 60);
      
      if (diffHours > 72) setCurrentStepIndex(4); // 3 days - Delivered
      else if (diffHours > 48) setCurrentStepIndex(3); // 2 days - Out for Delivery
      else if (diffHours > 24) setCurrentStepIndex(2); // 1 day - Shipped
      else if (diffHours > 2) setCurrentStepIndex(1); // 2 hours - Processing
      else setCurrentStepIndex(0); // Recent - Order Placed
    }
  }, [order]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16 bg-background dark:bg-[#0f0f12] text-foreground dark:text-white transition-colors duration-300"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold text-foreground dark:text-white mb-8 text-center transition-colors tracking-tight">Track Your <span className="italic font-playfair text-primary dark:text-[#ffb6c1]">Order</span></h1>
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <div className="bg-white dark:bg-[#17171c] rounded-[2rem] shadow-soft p-2 flex items-center gap-2 border border-primary/10 dark:border-white/10">
              <SearchIcon className="w-5 h-5 text-primary/40 dark:text-[#ffb6c1]/40 ml-4" />
              <Input
                type="text"
                placeholder="Enter Order ID (e.g. PRISM-XXXX)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="flex-1 border-0 bg-transparent text-foreground dark:text-white placeholder:text-muted-foreground/40 focus-visible:ring-0 text-lg py-7"
              />
              <Button
                type="submit"
                className="rounded-full bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] px-8 py-7 hover:shadow-lg transition-all"
              >
                Track
              </Button>
            </div>
          </form>
        </div>

        {order ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Tracking Status Card */}
            <div className="bg-white dark:bg-[#17171c] rounded-[3rem] p-8 lg:p-12 border border-primary/10 dark:border-white/10 shadow-medium overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 dark:bg-[#ffb6c1]/5 rounded-full blur-3xl -mr-32 -mt-32" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
                 <div>
                  <p className="text-[10px] font-bold text-primary/40 dark:text-[#ffb6c1]/40 uppercase tracking-[0.22em] mb-1.5">Status Update</p>
                  <h2 className="text-3xl font-bold text-foreground dark:text-white transition-colors leading-tight">{statusSteps[currentStepIndex]}</h2>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-primary/40 dark:text-[#ffb6c1]/40 uppercase tracking-[0.22em] mb-1.5">Estimated Delivery</p>
                  <p className="text-xl font-bold text-foreground dark:text-white transition-colors">
                    {new Date(new Date(order.date).getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="relative mb-12 px-4">
                <div className="absolute top-5 left-8 right-8 h-1 bg-primary/10 dark:bg-white/10 -z-0" />
                <div 
                  className="absolute top-5 left-8 h-1 bg-primary dark:bg-[#ffb6c1] transition-all duration-1000 ease-out -z-0" 
                  style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                />
                
                <div className="flex justify-between relative z-10">
                  {statusSteps.map((status, index) => {
                    const isCompleted = index <= currentStepIndex;
                    const isActive = index === currentStepIndex;
                    
                    const icons = [Package, Command, Truck, Box, Home];
                    const Icon = icons[index];

                    return (
                      <div key={status} className="flex flex-col items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isCompleted ? 'bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] scale-110 shadow-lg' : 'bg-white dark:bg-[#1a1a21] border-2 border-primary/10 dark:border-white/10 text-primary/20 dark:text-white/20'
                        } ${isActive ? 'ring-4 ring-primary/20 dark:ring-[#ffb6c1]/20' : ''}`}>
                          {isCompleted && !isActive && index !== statusSteps.length - 1 ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Icon className="w-5 h-5" />
                          )}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest hidden sm:block ${isCompleted ? 'text-primary dark:text-[#ffb6c1]' : 'text-primary/20 dark:text-white/20'}`}>
                          {status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-primary/5 dark:border-white/5">
                 <div>
                  <h3 className="text-[10px] font-bold text-foreground/40 dark:text-white/40 uppercase tracking-[0.22em] mb-4">Latest Scan</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-1 h-16 bg-primary/10 dark:bg-white/10 rounded-full relative">
                        <div className="absolute top-0 left-[-3px] w-2.5 h-2.5 rounded-full bg-primary dark:bg-[#ffb6c1]" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground dark:text-white text-sm">Arrived at sorting facility</p>
                        <p className="text-xs text-muted-foreground dark:text-gray-400">Mumbai Hub, India</p>
                        <p className="text-[10px] text-primary/40 dark:text-[#ffb6c1]/40 mt-1 font-bold">10:45 AM • TODAY</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-[10px] font-bold text-foreground/40 dark:text-white/40 uppercase tracking-[0.22em] mb-4">Package Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground dark:text-gray-400">Shipment Weight</span>
                      <span className="font-bold dark:text-white">1.2 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground dark:text-gray-400">Standard Delivery</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground dark:text-gray-400">Courier</span>
                      <span className="font-bold dark:text-white">PRISM Express</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : queryId ? (
          <div className="text-center py-12">
            <p className="text-rose-500 font-bold mb-4">We couldn't find an order with that ID.</p>
            <Button variant="outline" onClick={() => navigate('/track-order')}>Try Another ID</Button>
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-[#17171c] rounded-3xl border border-primary/10 dark:border-white/10 shadow-soft transition-colors">
            <Search className="w-12 h-12 text-primary/20 dark:text-white/20 mx-auto mb-4" />
            <p className="text-muted-foreground dark:text-gray-400">Enter your Order ID above to see real-time tracking updates.</p>
          </div>
        )}
      </div>
    </motion.main>
  );
}
