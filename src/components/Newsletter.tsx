import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export function Newsletter() {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      showToast('Thank you for joining our private fragrance list.');
      setEmail('');
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#101416] border-b border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#8FAFBA] block">
          The Syndicate Gazette
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4F5F3]">
          Stay close to the scents you love.
        </h2>

        <p className="text-xs sm:text-sm text-[#929DA0] max-w-md mx-auto font-light leading-relaxed">
          New decant arrivals, seasonal recommendations and private batch drops — delivered occasionally. No spam.
        </p>

        {isSubscribed ? (
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded bg-[#161B1D] border border-[#8FAFBA]/50 text-xs text-[#C8DADD]">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>You have been subscribed to our private release newsletter.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded bg-[#161B1D] border border-white/10 text-xs text-[#F4F5F3] placeholder-[#929DA0]/60 focus:outline-none focus:border-[#8FAFBA]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded bg-[#F4F5F3] text-[#090B0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#C8DADD] transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <span>Join the List</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

      </div>
    </section>
  );
}
