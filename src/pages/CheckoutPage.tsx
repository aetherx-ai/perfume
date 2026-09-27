import React, { useState } from 'react';
import { ShieldCheck, Truck, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CustomerAddress, PaymentMethod } from '../types';

const BANGLADESH_DISTRICTS = [
  'Dhaka',
  'Chattogram',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Rangpur',
  'Mymensingh',
  'Cumilla',
  'Gazipur',
  'Narayanganj',
  'Bogura',
  'Cox’s Bazar',
  'Feni',
  'Jessore',
  'Noakhali',
  'Pabna',
  'Tangail',
  'Brahmanbaria',
  'Dinajpur',
  'Jamalpur',
  'Kushtia',
  'Narsingdi',
  'Sirajganj'
];

export function CheckoutPage() {
  const { cart, cartSubtotal, createOrder, formatPrice, navigateTo, showToast } = useShop();

  const [formData, setFormData] = useState<CustomerAddress>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    district: 'Dhaka',
    city: '',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [bkashNumber, setBkashNumber] = useState('');
  const [bkashTrxId, setBkashTrxId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delivery calculation logic
  const FREE_SHIPPING_THRESHOLD = 3000;
  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const baseShippingFee = formData.district === 'Dhaka' ? 80 : 130;
  const shippingFee = isFreeShipping ? 0 : baseShippingFee;

  const totalAmount = cartSubtotal + shippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      showToast('Please fill in your name, phone number, and delivery address.', 'error');
      return;
    }

    if (paymentMethod === 'bkash' && (!bkashNumber.trim() || !bkashTrxId.trim())) {
      showToast('Please enter your bKash sender number and Transaction ID.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder(formData, paymentMethod, shippingFee);
      setIsSubmitting(false);
      navigateTo('order-confirmation', { orderId: order.id });
    }, 600);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#090B0C] min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="font-serif text-3xl font-light text-[#F4F5F3]">Your Bag is Empty</h2>
          <p className="text-xs text-[#929DA0]">
            Please add fragrances to your bag before proceeding to checkout.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-3 rounded bg-[#C8DADD] text-[#090B0C] text-xs font-semibold uppercase tracking-wider hover:bg-white"
          >
            Go to Perfume Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#090B0C] min-h-screen py-10 sm:py-16 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-10 pb-6 border-b border-white/10">
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8FAFBA] block mb-1">
            Express Fragrance Dispatch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#F4F5F3]">
            Checkout & Delivery
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Customer & Delivery Details */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Contact Information */}
            <div className="p-6 rounded-lg bg-[#101416] border border-white/5 space-y-4">
              <h2 className="font-serif text-xl font-medium text-[#F4F5F3] flex items-center gap-2">
                <span>1. Contact Details</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#929DA0] font-medium mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Tanvir Hossain"
                    className="w-full px-3.5 py-2.5 rounded bg-[#161B1D] border border-white/10 text-xs text-[#F4F5F3] placeholder-[#929DA0]/40 focus:outline-none focus:border-[#8FAFBA]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#929DA0] font-medium mb-1.5">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="017XXXXXXXX or +880..."
                    className="w-full px-3.5 py-2.5 rounded bg-[#161B1D] border border-white/10 text-xs text-[#F4F5F3] placeholder-[#929DA0]/40 focus:outline-none focus:border-[#8FAFBA]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-[#929DA0] font-medium mb-1.5">
                    Email Address (For Order Receipts)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tanvir@example.com"
                    className="w-full px-3.5 py-2.5 rounded bg-[#161B1D] border border-white/10 text-xs text-[#F4F5F3] placeholder-[#929DA0]/40 focus:outline-none focus:border-[#8FAFBA]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="p-6 rounded-lg bg-[#101416] border border-white/5 space-y-4">
              <h2 className="font-serif text-xl font-medium text-[#F4F5F3] flex items-center justify-between">
                <span>2. Delivery Destination</span>
                <span className="text-xs font-sans tracking-wider uppercase text-[#8FAFBA] font-normal">
                  All 64 Districts
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#929DA0] font-medium mb-1.5">
                    District / Region *
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded bg-[#161B1D] border border-white/10 text-xs text-[#F4F5F3] focus:outline-none focus:border-[#8FAFBA]"
                  >
                    {BANGLADESH_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d} ({d === 'Dhaka' ? 'Inside Dhaka ৳80' : 'Outside Dhaka ৳130'})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#929DA0] font-medium mb-1.5">
                    Thana / City / Area *
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Gulshan, Dhanmondi, Uttara"
                    className="w-full px-3.5 py-2.5 rounded bg-[#161B1D] border border-white/10 text-xs text-[#F4F5F3] placeholder-[#929DA0]/40 focus:outline-none focus:border-[#8FAFBA]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-[#929DA0] font-medium mb-1.5">
                    Complete Street Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House number, Road number, Sector, Apartment/Flat number"
                    className="w-full px-3.5 py-2.5 rounded bg-[#161B1D] border border-white/10 text-xs text-[#F4F5F3] placeholder-[#929DA0]/40 focus:outline-none focus:border-[#8FAFBA]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-[#929DA0] font-medium mb-1.5">
                    Courier Delivery Notes (Optional)
                  </label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="e.g. Please deliver after 3 PM or call before arrival"
                    className="w-full px-3.5 py-2.5 rounded bg-[#161B1D] border border-white/10 text-xs text-[#F4F5F3] placeholder-[#929DA0]/40 focus:outline-none focus:border-[#8FAFBA]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="p-6 rounded-lg bg-[#101416] border border-white/5 space-y-4">
              <h2 className="font-serif text-xl font-medium text-[#F4F5F3]">
                3. Payment Method
              </h2>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <label className={`p-4 rounded-lg border flex items-start gap-3.5 cursor-pointer transition-colors ${
                  paymentMethod === 'cod'
                    ? 'bg-[#1C2325] border-[#C8DADD]'
                    : 'bg-[#161B1D] border-white/5 hover:border-white/15'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#F4F5F3]">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[11px] text-[#C8A98A] font-semibold">Recommended</span>
                    </div>
                    <p className="text-xs text-[#929DA0] mt-1 font-light leading-relaxed">
                      Pay the courier rider in cash upon receiving your parcel. Available throughout all 64 districts in Bangladesh.
                    </p>
                  </div>
                </label>

                {/* bKash Mobile Payment */}
                <label className={`p-4 rounded-lg border flex items-start gap-3.5 cursor-pointer transition-colors ${
                  paymentMethod === 'bkash'
                    ? 'bg-[#1C2325] border-[#C8DADD]'
                    : 'bg-[#161B1D] border-white/5 hover:border-white/15'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bkash"
                    checked={paymentMethod === 'bkash'}
                    onChange={() => setPaymentMethod('bkash')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#F4F5F3]">
                        bKash Merchant / Direct Transfer
                      </span>
                      <span className="text-[11px] text-[#8FAFBA] font-medium">Instant</span>
                    </div>
                    <p className="text-xs text-[#929DA0] mt-1 font-light leading-relaxed">
                      Send payment to Perfume Syndicate Official Merchant number <strong className="text-[#F4F5F3]">01795-594222</strong> (Make Payment / Send Money).
                    </p>

                    {paymentMethod === 'bkash' && (
                      <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-[#929DA0] mb-1">
                            Your bKash Number
                          </label>
                          <input
                            type="text"
                            value={bkashNumber}
                            onChange={(e) => setBkashNumber(e.target.value)}
                            placeholder="01XXXXXXXXX"
                            className="w-full px-3 py-2 rounded bg-[#090B0C] border border-white/10 text-xs text-[#F4F5F3] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-[#929DA0] mb-1">
                            Transaction ID (TrxID)
                          </label>
                          <input
                            type="text"
                            value={bkashTrxId}
                            onChange={(e) => setBkashTrxId(e.target.value)}
                            placeholder="e.g. 9J47AB..."
                            className="w-full px-3 py-2 rounded bg-[#090B0C] border border-white/10 text-xs text-[#F4F5F3] focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* Nagad / Cards */}
                <label className={`p-4 rounded-lg border flex items-start gap-3.5 cursor-pointer transition-colors ${
                  paymentMethod === 'nagad'
                    ? 'bg-[#1C2325] border-[#C8DADD]'
                    : 'bg-[#161B1D] border-white/5 hover:border-white/15'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="nagad"
                    checked={paymentMethod === 'nagad'}
                    onChange={() => setPaymentMethod('nagad')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-[#F4F5F3]">
                      Nagad Wallet Transfer
                    </span>
                    <p className="text-xs text-[#929DA0] mt-0.5 font-light">
                      Send to Nagad Merchant 01795-594222 with Order ID in reference.
                    </p>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Place Order CTA */}
          <div className="lg:col-span-5 p-6 rounded-lg bg-[#101416] border border-white/10 space-y-6 lg:sticky lg:top-28 shadow-2xl">
            <h2 className="font-serif text-xl font-medium text-[#F4F5F3] pb-3 border-b border-white/10">
              Order Breakdown
            </h2>

            {/* Itemized List */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 rounded bg-[#1C2325] overflow-hidden shrink-0 p-0.5">
                      <img src={item.product.imageUrl} alt="" className="w-full h-full object-cover rounded" />
                    </div>
                    <div>
                      <p className="font-medium text-[#F4F5F3] line-clamp-1">{item.product.name}</p>
                      <p className="text-[11px] text-[#929DA0]">
                        {item.variant.format} ({item.variant.size}) × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold tabular-nums text-[#F4F5F3]">
                    {formatPrice(item.variant.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-[#929DA0]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#F4F5F3] font-semibold tabular-nums">{formatPrice(cartSubtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>
                  Delivery Charge ({formData.district === 'Dhaka' ? 'Inside Dhaka' : 'Nationwide'})
                </span>
                <span className="text-[#F4F5F3] font-semibold tabular-nums">
                  {isFreeShipping ? (
                    <span className="text-[#C8DADD]">Free (Order &gt; ৳3,000)</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between text-base text-[#F4F5F3] font-bold">
                <span>Total Amount Due</span>
                <span className="text-2xl tabular-nums text-[#C8DADD]">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded bg-[#C8DADD] text-[#090B0C] text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Generating Order...</span>
              ) : (
                <>
                  <span>Confirm Order · {formatPrice(totalAmount)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Trust and safety details */}
            <div className="pt-4 border-t border-white/5 space-y-2 text-[11px] text-[#929DA0]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A98A]" />
                <span>Parcel insured with video unboxing replacement warranty.</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#8FAFBA]" />
                <span>Courier dispatch updates sent directly to your phone via SMS.</span>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
