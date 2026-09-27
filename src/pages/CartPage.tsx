import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ShieldCheck, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    formatPrice,
    navigateTo,
    showToast
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const FREE_SHIPPING_THRESHOLD = 3000;
  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'SYNDICATE10') {
      const discount = Math.round(cartSubtotal * 0.1);
      setDiscountAmount(discount);
      setCouponApplied(true);
      showToast('10% Welcome Connoisseur discount applied!');
    } else {
      showToast('Invalid promo code. Try "SYNDICATE10"', 'error');
    }
  };

  const finalTotal = Math.max(0, cartSubtotal - discountAmount);

  if (cart.length === 0) {
    return (
      <div className="bg-[#090B0C] min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-full bg-[#161B1D] border border-white/10 flex items-center justify-center mx-auto text-[#929DA0]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl font-light text-[#F4F5F3]">Your Fragrance Bag is Empty</h2>
          <p className="text-xs sm:text-sm text-[#929DA0] font-light">
            You haven't selected any decants or flacons yet. Explore our niche and designer collection to begin your olfactory journey.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="mt-4 px-6 py-3 rounded bg-[#C8DADD] text-[#090B0C] text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors"
          >
            Explore Perfume Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#090B0C] min-h-screen py-10 sm:py-16 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/10 mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#F4F5F3]">
              Your Fragrance Bag
            </h1>
            <p className="text-xs sm:text-sm text-[#929DA0] mt-1 font-light">
              Review your authentic decants and flacons before proceeding to checkout.
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-[#929DA0] hover:text-red-400 mt-2 sm:mt-0 transition-colors"
          >
            Clear Bag
          </button>
        </div>

        {/* Free Shipping Alert */}
        <div className="mb-8 p-4 rounded-lg bg-[#101416] border border-white/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#929DA0]">
            <ShieldCheck className="w-4 h-4 text-[#C8DADD]" />
            {isFreeShipping ? (
              <span className="text-[#C8DADD] font-medium">
                You have qualified for complimentary nationwide courier delivery!
              </span>
            ) : (
              <span>
                Add <strong className="text-[#F4F5F3]">{formatPrice(remainingForFree)}</strong> more to your order to unlock free shipping across Bangladesh.
              </span>
            )}
          </div>
          <span className="text-[11px] text-[#8FAFBA] font-semibold">
            {Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100))}% Reached
          </span>
        </div>

        {/* 2-Column Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Items Table */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="p-4 sm:p-5 rounded-lg bg-[#101416] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Thumb + Info */}
                <div className="flex items-center gap-4">
                  <div
                    onClick={() => navigateTo('product', { slug: item.product.slug })}
                    className="w-16 h-20 rounded bg-[#1C2325] overflow-hidden shrink-0 cursor-pointer p-1"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8FAFBA] font-medium block">
                      {item.product.brand}
                    </span>
                    <h3
                      onClick={() => navigateTo('product', { slug: item.product.slug })}
                      className="text-sm sm:text-base font-medium text-[#F4F5F3] hover:text-[#C8DADD] cursor-pointer transition-colors"
                    >
                      {item.product.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-xs text-[#929DA0]">
                      <span className="text-[#C8A98A] font-semibold">{item.variant.format}</span>
                      <span>·</span>
                      <span>{item.variant.size}</span>
                      <span>·</span>
                      <span className="text-[#F4F5F3] font-medium tabular-nums">
                        {formatPrice(item.variant.price)} each
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quantity + Item Subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  <div className="flex items-center border border-white/10 rounded bg-[#161B1D]">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="p-1.5 text-[#929DA0] hover:text-[#F4F5F3]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold tabular-nums text-[#F4F5F3]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="p-1.5 text-[#929DA0] hover:text-[#F4F5F3]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-base font-bold tabular-nums text-[#F4F5F3] min-w-[70px] text-right">
                    {formatPrice(item.variant.price * item.quantity)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-[#929DA0] hover:text-red-400 p-1 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Coupon Code Section */}
            <div className="p-4 sm:p-5 rounded-lg bg-[#101416] border border-white/5">
              <form onSubmit={handleApplyCoupon} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-[#929DA0] absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter voucher code (e.g. SYNDICATE10)"
                    className="w-full pl-9 pr-3 py-2.5 rounded bg-[#161B1D] border border-white/10 text-xs text-[#F4F5F3] placeholder-[#929DA0]/50 uppercase tracking-wider focus:outline-none focus:border-[#8FAFBA]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded bg-[#1C2325] border border-white/15 text-xs uppercase tracking-wider text-[#F4F5F3] hover:bg-white hover:text-black transition-colors shrink-0"
                >
                  Apply Code
                </button>
              </form>
              {couponApplied && (
                <p className="text-xs text-emerald-400 mt-2 font-medium">
                  ✓ Voucher 'SYNDICATE10' applied (10% discount).
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-4 p-6 rounded-lg bg-[#101416] border border-white/10 space-y-6 lg:sticky lg:top-28">
            <h3 className="font-serif text-xl font-light text-[#F4F5F3] pb-3 border-b border-white/10">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs text-[#929DA0]">
              <div className="flex justify-between">
                <span>Cart Subtotal</span>
                <span className="text-[#F4F5F3] font-semibold tabular-nums">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Voucher Discount</span>
                  <span className="font-semibold tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="text-[#F4F5F3]">
                  {isFreeShipping ? (
                    <span className="text-[#C8DADD] font-medium">Free</span>
                  ) : (
                    'From ৳80 (Dhaka) / ৳130'
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between text-sm sm:text-base text-[#F4F5F3] font-bold">
                <span>Total Due</span>
                <span className="text-xl tabular-nums text-[#C8DADD]">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-3.5 rounded bg-[#C8DADD] text-[#090B0C] text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-4 border-t border-white/5 space-y-2 text-[11px] text-[#929DA0]/80">
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8FAFBA]" />
                <span>100% Authentic Guaranteed Source</span>
              </p>
              <p>Cash on Delivery available nationwide across Bangladesh.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
