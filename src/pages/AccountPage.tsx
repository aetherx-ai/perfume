import React, { useState } from 'react';
import { User, Package, Heart, LogOut, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export function AccountPage() {
  const { user, login, logout, orders, wishlist, navigateTo, formatPrice } = useShop();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email, name || email.split('@')[0], phone);
    }
  };

  if (!user) {
    return (
      <div className="bg-[#090B0C] min-h-[75vh] flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md bg-[#101416] border border-white/10 rounded-lg p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#8FAFBA]">
              Perfume Syndicate Connoisseur Club
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#F4F5F3]">
              {isLoginMode ? 'Sign In to Your Account' : 'Create Collector Profile'}
            </h1>
            <p className="text-xs text-[#929DA0]">
              Track your authentic decant orders and save bespoke scent wishlists.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {!isLoginMode && (
              <>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#929DA0] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Masud Rahman"
                    className="w-full px-3.5 py-2.5 rounded bg-[#161B1D] border border-white/10 text-xs text-[#F4F5F3] focus:outline-none focus:border-[#8FAFBA]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#929DA0] mb-1">
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded bg-[#161B1D] border border-white/10 text-xs text-[#F4F5F3] focus:outline-none focus:border-[#8FAFBA]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#929DA0] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full px-3.5 py-2.5 rounded bg-[#161B1D] border border-white/10 text-xs text-[#F4F5F3] focus:outline-none focus:border-[#8FAFBA]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#929DA0] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded bg-[#161B1D] border border-white/10 text-xs text-[#F4F5F3] focus:outline-none focus:border-[#8FAFBA]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded bg-[#C8DADD] text-[#090B0C] text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors"
            >
              {isLoginMode ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="pt-4 border-t border-white/5 text-center text-xs text-[#929DA0]">
            {isLoginMode ? (
              <p>
                Don't have a profile yet?{' '}
                <button
                  type="button"
                  onClick={() => setIsLoginMode(false)}
                  className="text-[#C8DADD] font-medium hover:underline ml-1"
                >
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsLoginMode(true)}
                  className="text-[#C8DADD] font-medium hover:underline ml-1"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#090B0C] min-h-screen py-10 sm:py-16 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* User Greeting & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8FAFBA]">
              Verified Collector Account
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#F4F5F3] mt-1">
              Welcome back, {user.name}
            </h1>
            <p className="text-xs text-[#929DA0] mt-0.5">{user.email} · {user.phone}</p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded bg-[#161B1D] border border-white/10 text-xs text-[#929DA0] hover:text-red-400 hover:border-red-400/40 transition-colors w-fit"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-[#101416] border border-white/5 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-[#929DA0]">Total Orders</span>
            <p className="text-2xl font-bold tabular-nums text-[#F4F5F3]">{orders.length}</p>
            <p className="text-xs text-[#929DA0]">Logged purchases on this device</p>
          </div>

          <div
            onClick={() => navigateTo('wishlist')}
            className="p-6 rounded-lg bg-[#101416] border border-white/5 space-y-2 cursor-pointer hover:border-[#8FAFBA]/40 transition-colors"
          >
            <span className="text-[10px] uppercase tracking-wider text-[#929DA0]">Saved Scents</span>
            <p className="text-2xl font-bold tabular-nums text-[#C8DADD]">{wishlist.length}</p>
            <p className="text-xs text-[#8FAFBA] hover:underline">View Fragrance Wishlist →</p>
          </div>

          <div className="p-6 rounded-lg bg-[#101416] border border-white/5 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-[#929DA0]">Membership Tier</span>
            <p className="text-2xl font-serif text-[#C8A98A]">Gold Connoisseur</p>
            <p className="text-xs text-[#929DA0]">Priority sterile bottling on drops</p>
          </div>
        </div>

        {/* Order History */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-light text-[#F4F5F3]">
            Recent Orders & Shipments
          </h2>

          {orders.length === 0 ? (
            <div className="p-8 rounded-lg bg-[#101416] border border-white/5 text-center space-y-3">
              <Package className="w-8 h-8 text-[#929DA0]/40 mx-auto" />
              <p className="text-sm text-[#F4F5F3]">No orders placed yet.</p>
              <button
                onClick={() => navigateTo('shop')}
                className="text-xs text-[#C8DADD] hover:underline uppercase tracking-wider font-semibold"
              >
                Browse Curated Decants →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="p-6 rounded-lg bg-[#101416] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-[#F4F5F3]">Order #{o.id}</span>
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#1C2325] text-[#C8DADD]">
                        {o.orderStatus}
                      </span>
                    </div>
                    <p className="text-xs text-[#929DA0]">
                      Placed on {o.date} · {o.items.length} items · Tracking: {o.trackingNumber}
                    </p>
                    <p className="text-xs text-[#929DA0]">
                      Delivering to: {o.customer.address}, {o.customer.district}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <span className="text-lg font-bold tabular-nums text-[#F4F5F3] block">
                      {formatPrice(o.total)}
                    </span>
                    <span className="text-[11px] text-[#C8A98A]">
                      {o.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Mobile Wallet'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
