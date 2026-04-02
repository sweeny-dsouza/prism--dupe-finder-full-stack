import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, Phone, Mail, User, ShieldCheck, ArrowRight, ChevronLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart, useOrders } from '@/hooks/useLocalStorage';
import { createOrder } from '@/hooks/useApi';
import { formatPrice } from '@/lib/utils';
import type { Order } from '@/types';
import { toast } from 'sonner';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create new order
    const orderId = `PRISM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const newOrder: Order = {
      id: orderId,
      items: cart,
      total: totalPrice,
      date: new Date().toISOString(),
      status: 'Order Placed',
      customerDetails: formData
    };

    try {
        // Sync with backend
        await createOrder(newOrder);
        
        // Also save to local storage for profile view
        addOrder(newOrder);
        clearCart();
        toast.success("Order placed successfully!");
        navigate(`/order-confirmed/${orderId}`);
    } catch (err) {
        toast.error("Failed to place order. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16 bg-background dark:bg-[#0f0f12] text-foreground dark:text-white transition-colors duration-300"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Bag
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h1 className="text-3xl font-bold text-foreground dark:text-white mb-8 transition-colors">Delivery Details</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                  <Input
                    required
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="pl-12 bg-white dark:bg-[#1a1a21] border-primary/10 dark:border-white/10 rounded-2xl py-7 shadow-soft focus:ring-primary/20 dark:text-white"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                  <Input
                    required
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-12 bg-white dark:bg-[#1a1a21] border-primary/10 dark:border-white/10 rounded-2xl py-7 shadow-soft focus:ring-primary/20 dark:text-white"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-primary/40" />
                  <Input
                    required
                    name="address"
                    placeholder="Complete Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="pl-12 bg-white dark:bg-[#1a1a21] border-primary/10 dark:border-white/10 rounded-2xl py-7 shadow-soft focus:ring-primary/20 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    required
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="bg-white dark:bg-[#1a1a21] border-primary/10 dark:border-white/10 rounded-2xl py-7 shadow-soft focus:ring-primary/20 dark:text-white"
                  />
                  <Input
                    required
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="bg-white dark:bg-[#1a1a21] border-primary/10 dark:border-white/10 rounded-2xl py-7 shadow-soft focus:ring-primary/20 dark:text-white"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                  <Input
                    required
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-12 bg-white dark:bg-[#1a1a21] border-primary/10 dark:border-white/10 rounded-2xl py-7 shadow-soft focus:ring-primary/20 dark:text-white"
                  />
                </div>
              </div>

              <div className="bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20 p-6 rounded-[2rem] flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-emerald-900 dark:text-emerald-400 mb-1">Secure Checkout</h3>
                  <p className="text-sm text-emerald-800/70 dark:text-emerald-400/70 leading-relaxed">
                    This is a simulation. No real payment will be processed. Your data is stored only in your browser's local storage.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] py-8 hover-lift shadow-medium text-lg font-bold group"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Place Order'}
                {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
              </Button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:pl-16 lg:border-l border-primary/5 dark:border-white/5 transition-colors">
            <h2 className="text-2xl font-bold text-foreground dark:text-white mb-8 transition-colors">Summary</h2>
            <div className="space-y-6 mb-8">
              {cart.map((item) => (
                <div key={item.productId} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-primary/5 dark:bg-white/5 rounded-xl flex items-center justify-center p-2 shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-sm text-foreground dark:text-white leading-tight">{item.name}</h4>
                    <p className="text-xs text-muted-foreground dark:text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-sm dark:text-white">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-primary/5 dark:border-white/5">
              <div className="flex justify-between text-muted-foreground">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span className="font-medium">Shipping</span>
                <span className="text-emerald-600 font-bold text-sm">FREE</span>
              </div>
              <div className="pt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-foreground dark:text-white">Order Total</span>
                <span className="text-2xl font-bold text-primary dark:text-[#ffb6c1]">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="mt-12 bg-primary/5 dark:bg-white/5 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1a1a21] flex items-center justify-center text-primary dark:text-[#ffb6c1] shadow-sm">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="font-bold text-primary dark:text-[#ffb6c1]">Cash on Delivery</span>
              </div>
              <p className="text-xs text-primary/60 dark:text-[#ffb6c1]/60 leading-relaxed">
                Paying upon delivery is the easiest way to experience PRISM products. 
                Our simulation auto-confirms this payment method.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
