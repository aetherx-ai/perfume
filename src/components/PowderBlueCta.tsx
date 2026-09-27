import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export function PowderBlueCta() {
  const { navigateTo } = useShop();

  const handleScrollToFinder = () => {
    const el = document.getElementById('perfume-finder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateTo('shop');
    }
  };

  return (
    <section className="relative py-20 sm:py-28 bg-[#101416] overflow-hidden border-b border-white/5">
      {/* Powder blue illuminated atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#8FAFBA]/15 via-[#C8DADD]/20 to-[#8FAFBA]/15 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#090B0C] px-3 py-1 rounded bg-[#C8DADD] inline-block">
          Authentic Decant Discovery
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#F4F5F3] leading-tight">
          Your next signature scent <br />
          <span className="italic text-[#C8DADD]">is waiting.</span>
        </h2>

        <p className="text-sm sm:text-base text-[#929DA0] max-w-xl mx-auto font-light leading-relaxed">
          Order authentic 3ml, 5ml, or 10ml decants with Cash on Delivery across Bangladesh. Enjoy complimentary delivery on orders over ৳3,000.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#F4F5F3] text-[#090B0C] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#C8DADD] transition-colors flex items-center justify-center gap-2 group"
          >
            <span>Shop Perfumes</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={handleScrollToFinder}
            className="w-full sm:w-auto px-6 py-3.5 rounded bg-[#161B1D]/80 border border-white/20 text-xs font-medium uppercase tracking-[0.16em] text-[#F4F5F3] hover:border-[#8FAFBA] hover:text-[#C8DADD] backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#8FAFBA]" />
            <span>Find Your Scent →</span>
          </button>
        </div>
      </div>
    </section>
  );
}
