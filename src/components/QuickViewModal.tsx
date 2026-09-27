import React, { useState, useEffect } from 'react';
import { X, Heart, Plus, Minus, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { FragranceFormat, ProductVariant } from '../types';

export function QuickViewModal() {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    isWishlisted,
    toggleWishlist,
    formatPrice,
    navigateTo
  } = useShop();

  const [selectedFormat, setSelectedFormat] = useState<FragranceFormat>('Decant');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setQuantity(1);
      // default format to Decant if available
      const decants = quickViewProduct.variants.filter((v) => v.format === 'Decant');
      const formatToUse: FragranceFormat = decants.length > 0 ? 'Decant' : 'Full Bottle';
      setSelectedFormat(formatToUse);

      const availableInFormat = quickViewProduct.variants.filter((v) => v.format === formatToUse);
      const defaultVar =
        availableInFormat.find((v) => v.id === quickViewProduct.defaultVariantId) ||
        availableInFormat[0] ||
        quickViewProduct.variants[0];
      setSelectedVariant(defaultVar);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct || !selectedVariant) return null;

  const isFavorite = isWishlisted(quickViewProduct.id);

  const availableFormats: FragranceFormat[] = Array.from(
    new Set(quickViewProduct.variants.map((v) => v.format))
  );

  const formatVariants = quickViewProduct.variants.filter((v) => v.format === selectedFormat);

  const handleFormatChange = (fmt: FragranceFormat) => {
    setSelectedFormat(fmt);
    const variantsForFmt = quickViewProduct.variants.filter((v) => v.format === fmt);
    if (variantsForFmt.length > 0) {
      setSelectedVariant(variantsForFmt[0]);
    }
  };

  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart(quickViewProduct, selectedVariant, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const handleViewFullPage = () => {
    closeQuickView();
    navigateTo('product', { slug: quickViewProduct.slug });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeQuickView}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-[#101416] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-10 my-8">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#090B0C]/80 text-[#929DA0] hover:text-[#F4F5F3] backdrop-blur-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image Container with Soft Contrast */}
          <div className="relative aspect-[4/5] md:aspect-auto md:h-full bg-[#1C2325] p-6 flex items-center justify-center">
            <img
              src={quickViewProduct.imageUrl}
              alt={quickViewProduct.name}
              className="max-h-[380px] w-auto object-contain rounded shadow-lg"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#929DA0]">
              <span>{quickViewProduct.concentration}</span>
              <span>100% Authentic Source</span>
            </div>
          </div>

          {/* Right: Details & Variant Selection */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Brand and Family */}
              <div className="flex items-center justify-between text-xs tracking-widest uppercase text-[#8FAFBA] font-medium">
                <span>{quickViewProduct.brand}</span>
                <span className="text-[#929DA0]">{quickViewProduct.gender}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl font-medium text-[#F4F5F3] mt-1">
                {quickViewProduct.name}
              </h2>

              {/* Dynamic Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold tabular-nums text-[#F4F5F3]">
                  {formatPrice(selectedVariant.price)}
                </span>
                {selectedVariant.originalPrice && (
                  <span className="text-sm line-through tabular-nums text-[#929DA0]">
                    {formatPrice(selectedVariant.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-[#8FAFBA] ml-1">
                  ({selectedVariant.format} · {selectedVariant.size})
                </span>
              </div>

              {/* Tagline / short description */}
              <p className="text-xs text-[#929DA0] mt-3 leading-relaxed">
                {quickViewProduct.tagline}
              </p>

              {/* Format Switcher: Decant vs Full Bottle */}
              <div className="mt-6">
                <label className="block text-[11px] uppercase tracking-wider text-[#929DA0] font-medium mb-2">
                  Format
                </label>
                <div className="flex items-center gap-2">
                  {availableFormats.map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => handleFormatChange(fmt)}
                      className={`flex-1 py-2 px-3 text-xs font-medium rounded transition-colors ${
                        selectedFormat === fmt
                          ? 'bg-[#1C2325] border border-[#8FAFBA] text-[#F4F5F3]'
                          : 'bg-[#161B1D] border border-white/5 text-[#929DA0] hover:text-[#F4F5F3]'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#929DA0] font-medium">
                    Available Size
                  </label>
                  <span className="text-[11px] text-[#C8DADD]">
                    {selectedVariant.inStock ? 'Ready to Dispatch' : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formatVariants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`py-2 px-3 text-xs font-semibold rounded tabular-nums transition-all ${
                        selectedVariant.id === v.id
                          ? 'bg-[#C8DADD] text-[#090B0C] shadow'
                          : 'bg-[#161B1D] border border-white/10 text-[#F4F5F3] hover:border-[#8FAFBA]/50'
                      }`}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions: Quantity & Add to Cart */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-white/10 rounded bg-[#090B0C]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#929DA0] hover:text-[#F4F5F3] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-semibold tabular-nums text-[#F4F5F3]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#929DA0] hover:text-[#F4F5F3] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!selectedVariant.inStock}
                  className={`flex-1 py-3 px-4 rounded text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 ${
                    isAdded
                      ? 'bg-emerald-400 text-[#090B0C]'
                      : 'bg-[#C8DADD] text-[#090B0C] hover:bg-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag · {formatPrice(selectedVariant.price * quantity)}</span>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 rounded border border-white/10 bg-[#161B1D] hover:border-white/30 transition-colors ${
                    isFavorite ? 'text-[#C8A98A]' : 'text-[#929DA0]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Full details link */}
              <button
                type="button"
                onClick={handleViewFullPage}
                className="w-full text-center text-xs tracking-wider uppercase text-[#929DA0] hover:text-[#C8DADD] transition-colors py-1 flex items-center justify-center gap-1"
              >
                <span>View Full Fragrance Notes & Olfactory Pyramid</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
