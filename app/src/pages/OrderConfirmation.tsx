import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, MapPin, Truck, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/hooks/useLocalStorage';
import { formatPrice } from '@/lib/utils';

export default function OrderConfirmation() {
  const { id } = useParams();
  const { getOrder } = useOrders();
  const navigate = useNavigate();
  const order = id ? getOrder(id) : undefined;

  if (!order) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16 bg-background dark:bg-[#0f0f12] text-foreground dark:text-white transition-colors duration-300"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
            className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </motion.div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-4">You're all set!</h1>
          <p className="text-muted-foreground dark:text-gray-400 text-lg mb-2">Thank you for your order, {order.customerDetails.fullName.split(' ')[0]}.</p>
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 text-primary dark:text-[#ffb6c1] font-bold text-sm">
            Order ID: {order.id}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-[#17171c] rounded-[2.5rem] p-8 border border-primary/10 dark:border-white/10 shadow-soft"
          >
            <h2 className="text-xl font-bold text-foreground dark:text-white mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary dark:text-[#ffb6c1]" />
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              {order.items.map((item) => (
                <div key={item.productId} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground dark:text-gray-400">
                    <span className="font-bold text-foreground dark:text-white">{item.quantity}x</span> {item.name}
                  </span>
                  <span className="font-bold dark:text-white">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-primary/5 dark:border-white/5 flex justify-between items-center">
              <span className="font-bold text-foreground dark:text-white">Total Paid</span>
              <span className="text-xl font-bold text-primary dark:text-[#ffb6c1]">{formatPrice(order.total)}</span>
            </div>
          </motion.div>

          {/* Shipping Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-[#17171c] rounded-[2.5rem] p-8 border border-primary/10 dark:border-white/10 shadow-soft"
          >
            <h2 className="text-xl font-bold text-foreground dark:text-white mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary dark:text-[#ffb6c1]" />
              Shipping Address
            </h2>
            <div className="space-y-1 text-sm text-muted-foreground dark:text-gray-400">
              <p className="font-bold text-foreground dark:text-white">{order.customerDetails.fullName}</p>
              <p>{order.customerDetails.address}</p>
              <p>{order.customerDetails.city}, {order.customerDetails.postalCode}</p>
              <p className="pt-2">{order.customerDetails.phone}</p>
            </div>

            <div className="mt-8 pt-8 border-t border-primary/5 dark:border-white/5">
              <h3 className="text-sm font-bold text-foreground dark:text-white mb-3 flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Delivery Estimation
              </h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed">
                Estimated to arrive by <span className="font-bold text-foreground dark:text-white">Friday, March 13th</span>.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={`/track-order?id=${order.id}`} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto px-10 py-7 rounded-2xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] hover-lift shadow-medium text-lg font-bold">
              Track Order
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto px-10 py-7 rounded-2xl border-primary/10 dark:border-white/10 text-primary dark:text-[#ffb6c1] hover:bg-primary/5 dark:hover:bg-white/5">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </motion.main>
  );
}
