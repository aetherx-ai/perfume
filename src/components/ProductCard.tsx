import React, { useState } from 'react';
import { Heart, Eye, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isWishlisted, openQuickView, addToCart, formatPrice, navigateTo } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const isFavorite = isWishlisted(product.id);

  // Find lowest price variant (typically 3ml or 5ml decant)
  const defaultVariant = product.variants.find((v) => v.id === product.defaultVariantId) || product.variants[0];
  const minPrice = Math.min(...product.variants.map((v) => v.price));

  const hasDecants = product.variants.some((v) => v.format === 'Decant');
  const hasFullBottle = product.variants.some((v) => v.format === 'Full Bottle');

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, defaultVariant, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1600);
  };

  const handleCardClick = () => {
    navigateTo('product', { slug: product.slug });
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-[#161B1D] border border-white/5 rounded overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#8FAFBA]/30 hover:shadow-xl"
    >
      {/* Visual Image Container with Soft Powder-Blue/Ivory Contrast */}
      <div className="relative aspect-[4/5] w-full bg-[#1C2325] overflow-hidden flex items-center justify-center p-3">
        {/* Subtle radial lighting backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#C8DADD]/5 via-transparent to-black/30 pointer-events-none" />

        <img
          src={isHovered && product.secondaryImageUrl ? product.secondaryImageUrl : product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center rounded transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges / Indicators */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <div className="flex flex-col gap-1">
            {product.isBestSeller && (
              <span className="text-[10px] uppercase tracking-wider font-medium text-[#C8A98A] bg-[#090B0C]/80 px-2 py-0.5 rounded backdrop-blur-sm">
                Best Seller
              </span>
            )}
            {product.isNewArrival && (
              <span className="text-[10px] uppercase tracking-wider font-medium text-[#8FAFBA] bg-[#090B0C]/80 px-2 py-0.5 rounded backdrop-blur-sm">
                New Arrival
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`pointer-events-auto p-1.5 rounded-full bg-[#090B0C]/70 backdrop-blur-sm transition-colors ${
              isFavorite ? 'text-[#C8A98A]' : 'text-[#929DA0] hover:text-[#F4F5F3]'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Hover Quick Actions Bar */}
        <div
          className={`absolute bottom-2.5 inset-x-2.5 flex items-center gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex-1 py-2 px-2.5 rounded bg-[#090B0C]/90 backdrop-blur-md border border-white/10 text-[11px] uppercase tracking-wider font-medium text-[#F4F5F3] hover:bg-white hover:text-[#090B0C] transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quick View</span>
          </button>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAddedRecently}
            className={`p-2 rounded bg-[#C8DADD] text-[#090B0C] hover:bg-white transition-colors flex items-center justify-center ${
              isAddedRecently ? 'bg-emerald-400 text-black' : ''
            }`}
            title="Quick add default 5ml decant"
            aria-label="Quick add"
          >
            {isAddedRecently ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between space-y-2.5">
        <div>
          {/* Brand & Type line */}
          <div className="flex items-center justify-between text-[11px] tracking-wider uppercase text-[#929DA0]">
            <span className="font-medium text-[#8FAFBA] truncate">{product.brand}</span>
            <span className="shrink-0">{product.gender}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-medium text-[#F4F5F3] line-clamp-1 mt-1 group-hover:text-[#C8DADD] transition-colors">
            {product.name}
          </h3>

          {/* Main Accords */}
          <p className="text-[11px] text-[#929DA0] line-clamp-1 mt-0.5">
            {product.mainAccords.slice(0, 3).join(' · ')}
          </p>
        </div>

        {/* Pricing & Formats */}
        <div className="pt-2 border-t border-white/5 flex items-end justify-between">
          <div>
            <span className="text-[10px] text-[#929DA0] block leading-tight">From</span>
            <span className="text-sm sm:text-base font-semibold tabular-nums text-[#F4F5F3]">
              {formatPrice(minPrice)}
            </span>
          </div>

          <div className="text-right text-[10px] text-[#929DA0]">
            {hasDecants && <span className="block text-[#C8DADD]">Decants 3–30ml</span>}
            {hasFullBottle && <span className="block text-[#929DA0]/80">Sealed Bottle</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
