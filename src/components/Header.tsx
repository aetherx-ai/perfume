import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export function Header({ onOpenMobileMenu }: HeaderProps) {
  const { cartCount, wishlist, openCart, openSearch, navigateTo, currentPage } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Editorial Announcement Bar */}
      <div className="bg-[#101416] border-b border-white/5 py-1.5 px-4 text-center">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#929DA0] font-medium flex items-center justify-center gap-3">
          <span>100% Authentic</span>
          <span className="text-[#8FAFBA]/40">·</span>
          <span>Cash On Delivery</span>
          <span className="text-[#8FAFBA]/40">·</span>
          <span>Nationwide Delivery</span>
        </p>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#090B0C]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
            : 'bg-[#090B0C] border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Wordmark */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenMobileMenu()}
              className="lg:hidden p-2 text-[#929DA0] hover:text-[#F4F5F3] focus:outline-none transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigateTo('home')}
              className="text-left group focus:outline-none"
            >
              <span className="font-serif text-xl sm:text-2xl tracking-[0.18em] font-semibold uppercase text-[#F4F5F3] group-hover:text-[#C8DADD] transition-colors">
                PERFUME SYNDICATE
              </span>
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-[0.12em] uppercase font-medium text-[#929DA0]">
            <button
              onClick={() => navigateTo('home')}
              className={`relative py-1 transition-colors hover:text-[#F4F5F3] ${
                currentPage === 'home' ? 'text-[#F4F5F3]' : ''
              }`}
            >
              Home
              {currentPage === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C8DADD]" />
              )}
            </button>

            <button
              onClick={() => navigateTo('shop', { gender: 'Men' })}
              className="relative py-1 transition-colors hover:text-[#F4F5F3]"
            >
              Men
            </button>

            <button
              onClick={() => navigateTo('shop', { gender: 'Women' })}
              className="relative py-1 transition-colors hover:text-[#F4F5F3]"
            >
              Women
            </button>

            <button
              onClick={() => navigateTo('shop', { gender: 'Unisex' })}
              className="relative py-1 transition-colors hover:text-[#F4F5F3]"
            >
              Unisex
            </button>

            <button
              onClick={() => navigateTo('shop', { type: 'Niche' })}
              className="relative py-1 transition-colors hover:text-[#F4F5F3]"
            >
              Niche
            </button>

            <button
              onClick={() => navigateTo('shop', { type: 'Arabian' })}
              className="relative py-1 transition-colors hover:text-[#F4F5F3]"
            >
              Arabian
            </button>

            <button
              onClick={() => navigateTo('shop', { format: 'Decant' })}
              className="relative py-1 transition-colors hover:text-[#C8A98A]"
            >
              Decants
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className={`relative py-1 transition-colors hover:text-[#F4F5F3] ${
                currentPage === 'shop' ? 'text-[#F4F5F3]' : ''
              }`}
            >
              Shop All
              {currentPage === 'shop' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C8DADD]" />
              )}
            </button>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="p-2 text-[#929DA0] hover:text-[#F4F5F3] transition-colors focus:outline-none"
              aria-label="Search perfumes"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="relative p-2 text-[#929DA0] hover:text-[#F4F5F3] transition-colors focus:outline-none"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C8A98A]" />
              )}
            </button>

            {/* Account Link */}
            <button
              onClick={() => navigateTo('account')}
              className="hidden sm:block p-2 text-[#929DA0] hover:text-[#F4F5F3] transition-colors focus:outline-none"
              aria-label="My account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#161B1D] border border-white/10 text-[#F4F5F3] hover:border-[#8FAFBA]/50 transition-colors focus:outline-none"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#C8DADD]" />
              <span className="text-xs font-semibold tabular-nums text-[#F4F5F3]">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
