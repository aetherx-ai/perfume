import React from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { FRAGRANCES } from '../data/fragrances';
import { ProductCard } from '../components/ProductCard';

export function WishlistPage() {
  const { wishlist, navigateTo } = useShop();

  const wishlistedProducts = FRAGRANCES.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#090B0C] min-h-screen py-10 sm:py-16 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/10 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#929DA0] uppercase tracking-wider mb-2">
              <button onClick={() => navigateTo('home')} className="hover:text-[#F4F5F3]">
                Home
              </button>
              <span>/</span>
              <span className="text-[#C8DADD]">Scent Wishlist</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#F4F5F3]">
              Your Saved Scent Wardrobe ({wishlistedProducts.length})
            </h1>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="text-xs uppercase tracking-wider font-semibold text-[#C8DADD] hover:text-white mt-4 sm:mt-0 flex items-center gap-1.5"
          >
            <span>Browse More Scents</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#161B1D] border border-white/10 flex items-center justify-center mx-auto text-[#929DA0]">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-light text-[#F4F5F3]">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-[#929DA0]">
              Click the heart icon on any perfume or decant to save it for your next order.
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="mt-4 px-6 py-3 rounded bg-[#C8DADD] text-[#090B0C] text-xs font-semibold uppercase tracking-wider hover:bg-white"
            >
              Explore Fragrances
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
