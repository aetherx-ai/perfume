import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { MiniCart } from './components/MiniCart';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AccountPage } from './pages/AccountPage';
import { WishlistPage } from './pages/WishlistPage';
import { FaqPage } from './pages/FaqPage';
import { AboutPage } from './pages/AboutPage';
import { ArticlePage } from './pages/ArticlePage';

function ToastContainer() {
  const { activeToast } = useShop();
  if (!activeToast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className={`px-4 py-3 rounded-lg shadow-2xl border text-xs font-medium flex items-center gap-2.5 backdrop-blur-md ${
        activeToast.type === 'error'
          ? 'bg-red-950/90 border-red-500/50 text-red-200'
          : activeToast.type === 'info'
          ? 'bg-[#161B1D]/95 border-white/20 text-[#C8DADD]'
          : 'bg-[#101416]/95 border-[#8FAFBA]/40 text-[#F4F5F3]'
      }`}>
        <span className="w-2 h-2 rounded-full bg-[#C8A98A]" />
        <span>{activeToast.message}</span>
      </div>
    </div>
  );
}

function MainContent() {
  const { currentPage } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'account':
        return <AccountPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'faq':
        return <FaqPage />;
      case 'about':
        return <AboutPage />;
      case 'article':
        return <ArticlePage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090B0C] text-[#F4F5F3]">
      {/* Sticky Header */}
      <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Global Modals & Drawers */}
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <SearchModal />
      <QuickViewModal />
      <MiniCart />
      <ToastContainer />

      {/* Dark Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
