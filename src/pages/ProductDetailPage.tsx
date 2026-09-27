import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  Check, 
  Plus, 
  Minus, 
  Sparkles, 
  Droplet, 
  ArrowRight,
  Star,
  Package,
  Layers
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { FRAGRANCES } from '../data/fragrances';
import { ProductCard } from '../components/ProductCard';
import { FragranceFormat, ProductVariant } from '../types';

export function ProductDetailPage() {
  const { pageParams, navigateTo, addToCart, isWishlisted, toggleWishlist, formatPrice, showToast } = useShop();

  // Find product by slug
  const product = FRAGRANCES.find((p) => p.slug === pageParams.slug) || FRAGRANCES[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<FragranceFormat>('Decant');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'notes' | 'decant' | 'delivery'>('notes');
  const [isCopied, setIsCopied] = useState(false);

  // Re-initialize variant on product/slug change
  useEffect(() => {
    const decants = product.variants.filter((v) => v.format === 'Decant');
    const defaultFormat: FragranceFormat = decants.length > 0 ? 'Decant' : 'Full Bottle';
    setSelectedFormat(defaultFormat);

    const availableInFormat = product.variants.filter((v) => v.format === defaultFormat);
    const initialVariant =
      availableInFormat.find((v) => v.id === product.defaultVariantId) ||
      availableInFormat[0] ||
      product.variants[0];

    setSelectedVariant(initialVariant);
    setQuantity(1);
    setActiveImageIndex(0);
  }, [product]);

  const isFavorite = isWishlisted(product.id);

  // Available formats (Decant vs Full Bottle)
  const availableFormats: FragranceFormat[] = Array.from(
    new Set(product.variants.map((v) => v.format))
  );

  // Variants in active format
  const formatVariants = product.variants.filter((v) => v.format === selectedFormat);

  const handleFormatChange = (fmt: FragranceFormat) => {
    setSelectedFormat(fmt);
    const variantsForFmt = product.variants.filter((v) => v.format === fmt);
    if (variantsForFmt.length > 0) {
      setSelectedVariant(variantsForFmt[0]);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    navigateTo('checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} — Perfume Syndicate`,
        text: product.tagline,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      showToast('Product link copied to clipboard');
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Related products (same family or tier)
  const relatedProducts = FRAGRANCES.filter(
    (p) => p.id !== product.id && (p.family === product.family || p.type === product.type)
  ).slice(0, 4);

  const galleryImages = [
    product.imageUrl,
    product.secondaryImageUrl || '/src/assets/images/decant_craft_authenticity_1790487930121.jpg',
    '/src/assets/images/hero_perfume_editorial_1790487865706.jpg'
  ].filter(Boolean);

  return (
    <div className="bg-[#090B0C] min-h-screen py-6 sm:py-12 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#929DA0] uppercase tracking-wider mb-8">
          <button onClick={() => navigateTo('home')} className="hover:text-[#F4F5F3]">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('shop')} className="hover:text-[#F4F5F3]">
            Catalog
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('shop', { gender: product.gender })} className="hover:text-[#F4F5F3]">
            {product.gender}
          </button>
          <span>/</span>
          <span className="text-[#C8DADD] truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main PDP Grid: Gallery Left + Purchase Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Featured Image Frame */}
            <div className="relative aspect-[4/5] sm:aspect-[1/1] w-full rounded-lg bg-[#1C2325] border border-white/10 overflow-hidden flex items-center justify-center p-6 shadow-2xl">
              <img
                src={galleryImages[activeImageIndex]}
                alt={product.name}
                className="max-h-[500px] w-auto object-contain rounded"
              />

              {/* Watermark / Badge annotations */}
              <div className="absolute top-4 left-4">
                <span className="text-[11px] uppercase tracking-widest font-semibold px-3 py-1 rounded bg-[#090B0C]/80 backdrop-blur-md text-[#C8DADD] border border-white/10">
                  {product.type} · {product.concentration}
                </span>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#090B0C]/80 backdrop-blur-md text-[#929DA0] hover:text-[#F4F5F3] border border-white/10 transition-colors"
                aria-label="Share fragrance"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex items-center gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded bg-[#1C2325] border overflow-hidden p-1 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#C8DADD] scale-102'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover rounded" />
                </button>
              ))}
            </div>

            {/* Authenticity Guarantee Card Below Gallery */}
            <div className="p-5 rounded-lg bg-[#101416] border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8DADD]">
                <ShieldCheck className="w-4 h-4 text-[#8FAFBA]" />
                <span>The Perfume Syndicate Guarantee</span>
              </div>
              <p className="text-xs text-[#929DA0] font-light leading-relaxed">
                Directly decanted from authorized retail batch codes. Never watered down, blended with generic oil dupes, or exposed to excessive heat. Packed with Teflon leak barrier and delivered in shockproof packaging.
              </p>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs tracking-widest uppercase text-[#8FAFBA] font-medium mb-1">
                <span>{product.brand}</span>
                <span className="text-[#929DA0]">{product.gender} · {product.family}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#F4F5F3] leading-tight">
                {product.name}
              </h1>

              {/* Rating & Social Proof */}
              <div className="mt-2.5 flex items-center gap-3 text-xs text-[#929DA0]">
                <div className="flex items-center gap-1 text-[#C8A98A]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-semibold tabular-nums text-[#F4F5F3]">{product.rating}</span>
                </div>
                <span>·</span>
                <span>{product.reviewsCount} verified collector ratings</span>
                <span>·</span>
                <span className="text-[#8FAFBA] font-medium">In Stock</span>
              </div>
            </div>

            {/* Dynamic Price Calculation */}
            <div className="p-4 rounded-lg bg-[#101416] border border-white/5 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#929DA0] block">
                  Price for {selectedVariant.format} ({selectedVariant.size})
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl font-bold tabular-nums text-[#F4F5F3]">
                    {formatPrice(selectedVariant.price)}
                  </span>
                  {selectedVariant.originalPrice && (
                    <span className="text-sm line-through tabular-nums text-[#929DA0]">
                      {formatPrice(selectedVariant.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#C8A98A] font-medium block">Cash on Delivery</span>
                <span className="text-xs text-[#929DA0]">Nationwide</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#929DA0] font-light leading-relaxed">
              {product.description}
            </p>

            {/* Format Selection (Decant vs Full Bottle) */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-[#929DA0] font-medium">
                Select Purchase Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableFormats.map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => handleFormatChange(fmt)}
                    className={`py-3 px-4 rounded text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-between ${
                      selectedFormat === fmt
                        ? 'bg-[#1C2325] border border-[#C8DADD] text-[#F4F5F3] shadow'
                        : 'bg-[#161B1D] border border-white/5 text-[#929DA0] hover:text-[#F4F5F3]'
                    }`}
                  >
                    <span>{fmt}</span>
                    {selectedFormat === fmt && <Check className="w-3.5 h-3.5 text-[#C8DADD]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Variant Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="uppercase tracking-wider text-[#929DA0] font-medium">
                  Available Sizes ({selectedFormat})
                </label>
                <span className="text-[#8FAFBA]">
                  {selectedVariant.format === 'Decant' ? '~10 sprays per ml' : 'Original Sealed'}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {formatVariants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`py-2.5 px-2 rounded text-xs font-semibold tabular-nums text-center transition-all ${
                      selectedVariant.id === v.id
                        ? 'bg-[#C8DADD] text-[#090B0C] shadow-lg'
                        : 'bg-[#161B1D] border border-white/10 text-[#F4F5F3] hover:border-[#8FAFBA]/50'
                    }`}
                  >
                    <span className="block font-bold">{v.size}</span>
                    <span className="text-[10px] block opacity-80 mt-0.5">{formatPrice(v.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Primary CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-white/10 rounded bg-[#101416]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-[#929DA0] hover:text-[#F4F5F3] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold tabular-nums text-[#F4F5F3]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-[#929DA0] hover:text-[#F4F5F3] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-4 rounded bg-[#1C2325] border border-white/15 text-xs uppercase tracking-widest font-semibold text-[#F4F5F3] hover:bg-white hover:text-black transition-colors"
                >
                  Add to Fragrance Bag
                </button>

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded bg-[#101416] border border-white/10 transition-colors ${
                    isFavorite ? 'text-[#C8A98A]' : 'text-[#929DA0] hover:text-[#F4F5F3]'
                  }`}
                  aria-label="Save to wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Buy Now Direct Button */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded bg-[#C8DADD] text-[#090B0C] text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Instant Order with Cash on Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Delivery Rule Indicators */}
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-[#929DA0]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#8FAFBA] shrink-0" />
                <span>
                  <strong>Dhaka:</strong> 24–48 hours (৳80) · <strong>Nationwide:</strong> 48–72 hours (৳130)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C8A98A] shrink-0" />
                <span>Free delivery automatically applied on all orders of ৳3,000+</span>
              </div>
            </div>

          </div>

        </div>

        {/* Deep Dive Tabs: Olfactory Notes Pyramid / Decant Specs / Delivery */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="flex items-center gap-6 border-b border-white/10 pb-3 mb-8">
            <button
              onClick={() => setActiveTab('notes')}
              className={`text-xs uppercase tracking-widest font-semibold transition-colors pb-3 relative ${
                activeTab === 'notes' ? 'text-[#C8DADD]' : 'text-[#929DA0] hover:text-[#F4F5F3]'
              }`}
            >
              Olfactory Pyramid & Notes
              {activeTab === 'notes' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C8DADD]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('decant')}
              className={`text-xs uppercase tracking-widest font-semibold transition-colors pb-3 relative ${
                activeTab === 'decant' ? 'text-[#C8DADD]' : 'text-[#929DA0] hover:text-[#F4F5F3]'
              }`}
            >
              Decant Specifications
              {activeTab === 'decant' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C8DADD]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('delivery')}
              className={`text-xs uppercase tracking-widest font-semibold transition-colors pb-3 relative ${
                activeTab === 'delivery' ? 'text-[#C8DADD]' : 'text-[#929DA0] hover:text-[#F4F5F3]'
              }`}
            >
              Fulfillment & Packaging
              {activeTab === 'delivery' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C8DADD]" />
              )}
            </button>
          </div>

          {/* Tab 1: Olfactory Pyramid */}
          {activeTab === 'notes' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg bg-[#101416] border border-white/5 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#8FAFBA] font-semibold block">
                  Top Notes (First 15-30 Mins)
                </span>
                <p className="text-base font-serif text-[#F4F5F3]">
                  {product.notes.top.join(', ')}
                </p>
                <p className="text-xs text-[#929DA0] font-light">
                  Volatile, bright initial burst that creates the first impression.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#101416] border border-white/5 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#C8DADD] font-semibold block">
                  Heart Notes (2 - 5 Hours)
                </span>
                <p className="text-base font-serif text-[#F4F5F3]">
                  {product.notes.heart.join(', ')}
                </p>
                <p className="text-xs text-[#929DA0] font-light">
                  The true character and emotional core of the fragrance composition.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#101416] border border-white/5 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#C8A98A] font-semibold block">
                  Base Notes (6 - 12+ Hours)
                </span>
                <p className="text-base font-serif text-[#F4F5F3]">
                  {product.notes.base.join(', ')}
                </p>
                <p className="text-xs text-[#929DA0] font-light">
                  Deep fixatives that linger on your clothes and pulse points into the night.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Decant Specs */}
          {activeTab === 'decant' && (
            <div className="p-8 rounded-lg bg-[#101416] border border-white/5 space-y-6 max-w-4xl">
              <h3 className="font-serif text-2xl font-light text-[#F4F5F3]">
                Understanding Your Decant Size
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded bg-[#161B1D]">
                  <strong className="block text-[#C8DADD] text-sm mb-1">3ml Decant</strong>
                  <p className="text-[#929DA0]">~35 sprays. Perfect for 1 week of intensive skin testing.</p>
                </div>
                <div className="p-4 rounded bg-[#161B1D]">
                  <strong className="block text-[#C8DADD] text-sm mb-1">5ml Decant</strong>
                  <p className="text-[#929DA0]">~60 sprays. Ideal for 2–3 weeks of everyday evening or office wear.</p>
                </div>
                <div className="p-4 rounded bg-[#161B1D]">
                  <strong className="block text-[#C8DADD] text-sm mb-1">10ml Decant</strong>
                  <p className="text-[#929DA0]">~120 sprays. Solid 1–2 months of steady signature usage.</p>
                </div>
                <div className="p-4 rounded bg-[#161B1D]">
                  <strong className="block text-[#C8DADD] text-sm mb-1">Sealed Full Bottle</strong>
                  <p className="text-[#929DA0]">Original factory-sealed retail bottle with verifiable batch codes.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Delivery & Packaging */}
          {activeTab === 'delivery' && (
            <div className="p-8 rounded-lg bg-[#101416] border border-white/5 space-y-4 max-w-3xl text-xs text-[#929DA0] leading-relaxed">
              <h3 className="font-serif text-2xl font-light text-[#F4F5F3]">
                Courier Protocols & Inspection
              </h3>
              <p>
                All orders are dispatched in discreet, tamper-evident shockproof mailers. Decant nozzles are fitted with Teflon thread seals to prevent cabin pressure leakage during transit.
              </p>
              <p>
                We deliver nationwide via Steadfast and Pathao couriers. You will receive an SMS tracking code once your parcel is handed over. Cash on Delivery is available across Bangladesh.
              </p>
            </div>
          )}
        </div>

        {/* Related Fragrances */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-white/10">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#F4F5F3] mb-8">
              Explore Similar Fragrance Profiles
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Bottom Purchase Bar for Mobile (Target 390px requirement) */}
      <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden p-3 bg-[#090B0C]/95 backdrop-blur-md border-t border-white/10 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] text-[#929DA0] block leading-none">
            {selectedVariant.format} ({selectedVariant.size})
          </span>
          <span className="text-base font-bold tabular-nums text-[#F4F5F3]">
            {formatPrice(selectedVariant.price * quantity)}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex-1 py-2.5 px-4 rounded bg-[#C8DADD] text-[#090B0C] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
}
