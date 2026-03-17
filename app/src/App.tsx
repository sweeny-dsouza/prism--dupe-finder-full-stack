import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import DupeFinder from '@/pages/DupeFinder';
import Skincare from '@/pages/Skincare';
import Haircare from '@/pages/Haircare';
import Bodycare from '@/pages/Bodycare';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import Compare from '@/pages/Compare';
import Saved from '@/pages/Saved';
import ProductDetail from '@/pages/ProductDetail';
import AboutPage from '@/pages/AboutPage';
import FAQPage from '@/pages/FAQPage';
import StandardsPage from '@/pages/StandardsPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPage from '@/pages/PrivacyPage';
import TermsPage from '@/pages/TermsPage';
import CareersPage from '@/pages/CareersPage';
import HelpPage from '@/pages/HelpPage';
import FeedbackPage from '@/pages/FeedbackPage';
import CookiesPage from '@/pages/CookiesPage';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import OrderConfirmation from '@/pages/OrderConfirmation';
import OrderTracking from '@/pages/OrderTracking';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dupe-finder" element={<DupeFinder />} />
          <Route path="/skincare" element={<Skincare />} />
          <Route path="/haircare" element={<Haircare />} />
          <Route path="/bodycare" element={<Bodycare />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmed/:id" element={<OrderConfirmation />} />
          <Route path="/track-order" element={<OrderTracking />} />

          {/* Placeholder routes for footer links */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/standards" element={<StandardsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '16px',
              color: 'hsl(var(--foreground))',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
