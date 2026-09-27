import React from 'react';
import { X, Search, Heart, User, ShoppingBag, Phone, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { navigateTo, openSearch, cartCount, wishlist, user } = useShop();

  if (!isOpen) return null;

  const handleNav = (page: string, params: Record<string, string> = {}) => {
    navigateTo(page, params);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer Body */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#101416] border-r border-white/10 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
        <div>
          {/* Top Row */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <span className="font-serif text-lg tracking-[0.16em] uppercase font-semibold text-[#F4F5F3]">
              PERFUME SYNDICATE
            </span>
            <button
              onClick={onClose}
              className="p-1 text-[#929DA0] hover:text-[#F4F5F3] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search Button */}
          <button
            onClick={() => {
              onClose();
              openSearch();
            }}
            className="w-full mt-6 flex items-center gap-3 px-3 py-2.5 rounded bg-[#161B1D] border border-white/10 text-left text-xs tracking-wider text-[#929DA0] uppercase hover:border-[#8FAFBA]/40"
          >
            <Search className="w-4 h-4 text-[#8FAFBA]" />
            <span>Search scents, brands, notes...</span>
          </button>

          {/* Navigation Links */}
          <nav className="mt-8 flex flex-col space-y-4">
            <button
              onClick={() => handleNav('home')}
              className="text-left text-sm font-medium tracking-widest uppercase text-[#F4F5F3] hover:text-[#C8DADD] transition-colors flex items-center justify-between py-1"
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-[#929DA0]/40" />
            </button>

            <button
              onClick={() => handleNav('shop', { format: 'Decant' })}
              className="text-left text-sm font-medium tracking-widest uppercase text-[#C8A98A] hover:text-[#F4F5F3] transition-colors flex items-center justify-between py-1"
            >
              <span>Explore Decants</span>
              <span className="text-[10px] tracking-normal font-sans px-1.5 py-0.5 rounded bg-[#C8A98A]/10 text-[#C8A98A]">Popular</span>
            </button>

            <button
              onClick={() => handleNav('shop', { gender: 'Men' })}
              className="text-left text-sm font-medium tracking-widest uppercase text-[#929DA0] hover:text-[#F4F5F3] transition-colors flex items-center justify-between py-1"
            >
              <span>Men's Fragrances</span>
              <ChevronRight className="w-4 h-4 text-[#929DA0]/40" />
            </button>

            <button
              onClick={() => handleNav('shop', { gender: 'Women' })}
              className="text-left text-sm font-medium tracking-widest uppercase text-[#929DA0] hover:text-[#F4F5F3] transition-colors flex items-center justify-between py-1"
            >
              <span>Women's Fragrances</span>
              <ChevronRight className="w-4 h-4 text-[#929DA0]/40" />
            </button>

            <button
              onClick={() => handleNav('shop', { gender: 'Unisex' })}
              className="text-left text-sm font-medium tracking-widest uppercase text-[#929DA0] hover:text-[#F4F5F3] transition-colors flex items-center justify-between py-1"
            >
              <span>Unisex Collections</span>
              <ChevronRight className="w-4 h-4 text-[#929DA0]/40" />
            </button>

            <button
              onClick={() => handleNav('shop', { type: 'Niche' })}
              className="text-left text-sm font-medium tracking-widest uppercase text-[#929DA0] hover:text-[#F4F5F3] transition-colors flex items-center justify-between py-1"
            >
              <span>Niche Houses</span>
              <ChevronRight className="w-4 h-4 text-[#929DA0]/40" />
            </button>

            <button
              onClick={() => handleNav('shop', { type: 'Arabian' })}
              className="text-left text-sm font-medium tracking-widest uppercase text-[#929DA0] hover:text-[#F4F5F3] transition-colors flex items-center justify-between py-1"
            >
              <span>Arabian & Middle Eastern</span>
              <ChevronRight className="w-4 h-4 text-[#929DA0]/40" />
            </button>

            <button
              onClick={() => handleNav('shop')}
              className="text-left text-sm font-medium tracking-widest uppercase text-[#F4F5F3] hover:text-[#C8DADD] transition-colors flex items-center justify-between py-1"
            >
              <span>Complete Catalog</span>
              <ChevronRight className="w-4 h-4 text-[#929DA0]/40" />
            </button>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={() => handleNav('faq')}
                className="text-left text-xs font-medium tracking-wider uppercase text-[#929DA0] hover:text-[#F4F5F3] transition-colors block py-1"
              >
                Authenticity & FAQs
              </button>
              <button
                onClick={() => handleNav('about')}
                className="text-left text-xs font-medium tracking-wider uppercase text-[#929DA0] hover:text-[#F4F5F3] transition-colors block py-1"
              >
                About Our Atelier
              </button>
            </div>
          </nav>
        </div>

        {/* Footer info in drawer */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleNav('account')}
              className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-[#929DA0] hover:text-[#F4F5F3]"
            >
              <User className="w-4 h-4" />
              <span>{user ? user.name : 'Account'}</span>
            </button>

            <button
              onClick={() => handleNav('wishlist')}
              className="flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase text-[#929DA0] hover:text-[#F4F5F3]"
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist ({wishlist.length})</span>
            </button>
          </div>

          <a
            href="https://wa.me/8801795594222"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded bg-[#161B1D] border border-white/10 text-xs font-medium text-[#C8DADD] hover:border-[#8FAFBA]"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp Consultation</span>
          </a>
        </div>
      </div>
    </div>
  );
}
