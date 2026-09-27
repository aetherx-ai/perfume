import React from 'react';
import { CheckCircle, Truck, Package, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export function OrderConfirmationPage() {
  const { pageParams, orders, formatPrice, navigateTo } = useShop();

  const orderId = pageParams.orderId;
  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="bg-[#090B0C] min-h-[60vh] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-2xl text-[#F4F5F3]">Order Not Found</h2>
          <button
            onClick={() => navigateTo('home')}
            className="px-6 py-2.5 rounded bg-[#C8DADD] text-[#090B0C] text-xs font-semibold uppercase tracking-wider"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Perfume Syndicate, I have placed order #${order.id} for ${formatPrice(order.total)}. Please confirm dispatch to ${order.customer.fullName} in ${order.customer.district}.`
  );

  return (
    <div className="bg-[#090B0C] min-h-screen py-12 sm:py-20 border-b border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Header */}
        <div className="text-center space-y-4 pb-8 border-b border-white/10">
          <div className="w-16 h-16 rounded-full bg-[#161B1D] border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#8FAFBA] block">
            Order Successfully Placed
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#F4F5F3]">
            Thank You, {order.customer.fullName}
          </h1>
          <p className="text-xs sm:text-sm text-[#929DA0] max-w-md mx-auto font-light">
            Your authentic fragrance order <strong className="text-[#F4F5F3]">#{order.id}</strong> has been logged in our atelier system and is being prepared for sterile packing.
          </p>
        </div>

        {/* Courier & Tracking Card */}
        <div className="my-8 p-6 rounded-lg bg-[#101416] border border-white/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#929DA0]">Assigned Courier</span>
              <p className="text-sm font-semibold text-[#F4F5F3] flex items-center gap-2 mt-0.5">
                <Truck className="w-4 h-4 text-[#8FAFBA]" />
                <span>Steadfast / Pathao Express Express</span>
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#929DA0]">Tracking Number</span>
              <p className="text-sm font-mono font-medium text-[#C8DADD] mt-0.5">
                {order.trackingNumber}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#929DA0]">Payment Status</span>
              <p className="text-sm font-semibold text-[#C8A98A] mt-0.5">
                {order.paymentMethod === 'cod' ? 'Cash on Delivery (Pending)' : 'Verified'}
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="text-xs text-[#929DA0] space-y-1">
            <strong className="text-[#F4F5F3] block">Shipping Destination:</strong>
            <p>{order.customer.address}, {order.customer.city}, {order.customer.district}</p>
            <p>Phone: {order.customer.phone}</p>
          </div>
        </div>

        {/* Itemized Order Summary */}
        <div className="p-6 rounded-lg bg-[#101416] border border-white/5 space-y-4">
          <h3 className="font-serif text-lg font-medium text-[#F4F5F3] pb-2 border-b border-white/10">
            Ordered Items ({order.items.length})
          </h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.cartItemId} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-12 rounded bg-[#1C2325] overflow-hidden shrink-0 p-0.5">
                    <img src={item.product.imageUrl} alt="" className="w-full h-full object-cover rounded" />
                  </div>
                  <div>
                    <span className="font-medium text-[#F4F5F3] block">{item.product.name}</span>
                    <span className="text-[11px] text-[#929DA0]">
                      {item.variant.format} ({item.variant.size}) × {item.quantity}
                    </span>
                  </div>
                </div>
                <span className="font-semibold tabular-nums text-[#F4F5F3]">
                  {formatPrice(item.variant.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-1.5 text-xs text-[#929DA0]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-[#F4F5F3] font-semibold tabular-nums">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="text-[#F4F5F3] font-semibold tabular-nums">
                {order.shippingFee === 0 ? 'Free' : formatPrice(order.shippingFee)}
              </span>
            </div>
            <div className="pt-2 border-t border-white/10 flex justify-between text-base font-bold text-[#F4F5F3]">
              <span>Total Payable</span>
              <span className="text-xl tabular-nums text-[#C8DADD]">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <a
            href={`https://wa.me/8801795594222?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-3.5 px-4 rounded bg-[#161B1D] border border-white/15 text-xs uppercase tracking-wider font-semibold text-[#C8DADD] hover:bg-emerald-950/40 hover:border-emerald-500/50 transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Confirm on WhatsApp</span>
          </a>

          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:flex-1 py-3.5 px-4 rounded bg-[#C8DADD] text-[#090B0C] text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            <span>Continue Fragrance Discovery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-8 text-center text-[11px] text-[#929DA0] flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8FAFBA]" />
          <span>Remember to record a continuous unboxing video for instant transit replacement.</span>
        </div>

      </div>
    </div>
  );
}
