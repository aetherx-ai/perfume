import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export function MiniCart() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    formatPrice,
    navigateTo
  } = useShop();

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 3000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const handleCheckout = () => {
    closeCart();
    navigateTo('checkout');
  };

  const handleViewCart = () => {
    closeCart();
    navigateTo('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#101416] border-l border-white/10 shadow-2xl flex flex-col justify-between z-10">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C8DADD]" />
            <span className="font-serif text-lg tracking-wider text-[#F4F5F3]">
              Your Fragrance Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-[#929DA0] hover:text-[#F4F5F3] transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-3 bg-[#161B1D] border-b border-white/5">
          <div className="flex items-center justify-between text-xs text-[#929DA0] mb-1.5 font-medium">
            {remainingForFreeShipping > 0 ? (
              <span>
                Add <strong className="text-[#C8DADD]">{formatPrice(remainingForFreeShipping)}</strong> for Free Nationwide Delivery
              </span>
            ) : (
              <span className="text-[#C8DADD] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8FAFBA]" />
                You unlocked Complimentary Nationwide Delivery!
              </span>
            )}
            <span className="text-[11px] tabular-nums">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#090B0C] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8FAFBA] to-[#C8DADD] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-[#929DA0]/40 mx-auto" />
              <p className="text-base font-medium text-[#F4F5F3]">Your bag is empty</p>
              <p className="text-xs text-[#929DA0] max-w-xs mx-auto">
                Explore our selection of 100% authentic perfume decants and discovery sets.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  navigateTo('shop');
                }}
                className="mt-4 px-5 py-2.5 rounded bg-[#1C2325] border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#C8DADD] hover:bg-[#8FAFBA]/20 transition-colors"
              >
                Discover Perfumes
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-start gap-4 p-3 rounded bg-[#161B1D] border border-white/5"
              >
                {/* Product thumbnail */}
                <div
                  onClick={() => {
                    closeCart();
                    navigateTo('product', { slug: item.product.slug });
                  }}
                  className="w-16 h-20 rounded bg-[#1C2325] overflow-hidden shrink-0 cursor-pointer p-1"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded"
                    loading="lazy"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-[#8FAFBA] truncate font-medium">
                    {item.product.brand}
                  </p>
                  <h4
                    onClick={() => {
                      closeCart();
                      navigateTo('product', { slug: item.product.slug });
                    }}
                    className="text-sm font-medium text-[#F4F5F3] hover:text-[#C8DADD] truncate cursor-pointer transition-colors"
                  >
                    {item.product.name}
                  </h4>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[#929DA0]">
                    <span className="text-[#C8A98A] font-medium">{item.variant.format}</span>
                    <span>·</span>
                    <span>{item.variant.size}</span>
                  </div>

                  {/* Quantity and Price */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center border border-white/10 rounded bg-[#090B0C]">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1 text-[#929DA0] hover:text-[#F4F5F3] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold tabular-nums text-[#F4F5F3]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1 text-[#929DA0] hover:text-[#F4F5F3] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold tabular-nums text-[#F4F5F3]">
                        {formatPrice(item.variant.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-[#929DA0] hover:text-red-400 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-5 bg-[#090B0C] border-t border-white/10 space-y-4">
            <div className="space-y-1.5 text-xs text-[#929DA0]">
              <div className="flex justify-between text-sm text-[#F4F5F3] font-medium">
                <span>Subtotal</span>
                <span className="font-semibold tabular-nums">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>
                  {cartSubtotal >= FREE_SHIPPING_THRESHOLD ? (
                    <span className="text-[#C8DADD] font-medium">Free</span>
                  ) : (
                    'Calculated at checkout (৳80 / ৳130)'
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                className="w-full py-3 rounded bg-[#C8DADD] text-[#090B0C] font-semibold text-xs tracking-widest uppercase hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleViewCart}
                className="w-full py-2.5 rounded bg-transparent border border-white/10 text-xs font-medium tracking-wider uppercase text-[#929DA0] hover:text-[#F4F5F3] hover:border-white/30 transition-colors"
              >
                View Full Bag & Details
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#929DA0]/80">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8FAFBA]" />
              <span>100% Authentic Guaranteed · Sterile Decanting</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
