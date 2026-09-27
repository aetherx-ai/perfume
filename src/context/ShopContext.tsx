import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem, Order, CustomerAddress, PaymentMethod } from '../types';
import { FRAGRANCES } from '../data/fragrances';

interface ShopContextType {
  cart: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;

  orders: Order[];
  createOrder: (customer: CustomerAddress, paymentMethod: PaymentMethod, shippingFee: number) => Order;

  user: { email: string; name: string; phone: string } | null;
  login: (email: string, name?: string, phone?: string) => void;
  logout: () => void;

  activeToast: { id: string; message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;

  formatPrice: (amount: number) => string;

  // SPA Page Navigation
  currentPage: string;
  pageParams: Record<string, string>;
  navigateTo: (page: string, params?: Record<string, string>) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ps_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist persisted
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ps_wishlist');
      return saved ? JSON.parse(saved) : ['ps-001', 'ps-004'];
    } catch {
      return ['ps-001', 'ps-004'];
    }
  });

  // Orders persisted
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ps_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User state
  const [user, setUser] = useState<{ email: string; name: string; phone: string } | null>(() => {
    try {
      const saved = localStorage.getItem('ps_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Navigation state (SPA router with popstate support)
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  // UI Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Baccarat Rouge 540',
    'Naxos',
    'Sauvage Elixir',
    'Arabian Oud',
    'Delina'
  ]);

  const [activeToast, setActiveToast] = useState<{ id: string; message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync cart to storage
  useEffect(() => {
    try {
      localStorage.setItem('ps_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync wishlist to storage
  useEffect(() => {
    try {
      localStorage.setItem('ps_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Sync orders
  useEffect(() => {
    try {
      localStorage.setItem('ps_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Sync user
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('ps_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('ps_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // Handle URL hash/path routing
  const navigateTo = (page: string, params: Record<string, string> = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // update URL query/hash quietly
    const query = new URLSearchParams(params).toString();
    const hash = query ? `#${page}?${query}` : `#${page}`;
    window.history.pushState({ page, params }, '', hash);
  };

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.page) {
        setCurrentPage(e.state.page);
        setPageParams(e.state.params || {});
      } else {
        // Parse from hash if exists
        const rawHash = window.location.hash.replace('#', '');
        if (rawHash) {
          const [page, search] = rawHash.split('?');
          const params: Record<string, string> = {};
          if (search) {
            new URLSearchParams(search).forEach((v, k) => {
              params[k] = v;
            });
          }
          setCurrentPage(page || 'home');
          setPageParams(params);
        } else {
          setCurrentPage('home');
          setPageParams({});
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    // Initial check
    handlePopState(new PopStateEvent('popstate'));
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setActiveToast({ id, message, type });
    setTimeout(() => {
      setActiveToast((curr) => (curr?.id === id ? null : curr));
    }, 3200);
  };

  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    const cartItemId = `${product.id}-${variant.id}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { cartItemId, productId: product.id, product, variantId: variant.id, variant, quantity }];
    });
    showToast(`Added ${quantity}x ${product.name} (${variant.size}) to your bag`);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.variant.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    const prod = FRAGRANCES.find((p) => p.id === productId);
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast(`Removed from wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Added ${prod?.name || 'Fragrance'} to wishlist`);
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;
    setRecentSearches((prev) => [query, ...prev.filter((q) => q.toLowerCase() !== query.toLowerCase())].slice(0, 8));
  };

  const createOrder = (
    customer: CustomerAddress,
    paymentMethod: PaymentMethod,
    shippingFee: number
  ): Order => {
    const orderId = `PS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...cart],
      subtotal: cartSubtotal,
      shippingFee,
      discount: 0,
      total: cartSubtotal + shippingFee,
      customer,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
      orderStatus: 'Confirmed',
      trackingNumber: `BD-STEADFAST-${Math.floor(1000000 + Math.random() * 9000000)}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const login = (email: string, name?: string, phone?: string) => {
    setUser({
      email,
      name: name || email.split('@')[0],
      phone: phone || '+8801700000000'
    });
    showToast(`Welcome back, ${name || email.split('@')[0]}`);
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out successfully', 'info');
  };

  const formatPrice = (amount: number): string => {
    return `৳${amount.toLocaleString('en-US')}`;
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartCount,
        isCartOpen,
        openCart,
        closeCart,
        wishlist,
        toggleWishlist,
        isWishlisted,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isSearchOpen,
        openSearch,
        closeSearch,
        searchQuery,
        setSearchQuery,
        recentSearches,
        addRecentSearch,
        orders,
        createOrder,
        user,
        login,
        logout,
        activeToast,
        showToast,
        formatPrice,
        currentPage,
        pageParams,
        navigateTo
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
