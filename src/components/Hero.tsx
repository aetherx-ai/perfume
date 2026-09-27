import React from 'react';
import { ArrowRight, Sparkles, Shield, Compass } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export function Hero() {
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
    <section className="relative overflow-hidden bg-[#090B0C] pt-6 sm:pt-12 pb-16 lg:pb-24 border-b border-white/5">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#8FAFBA]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-[#C8A98A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-[1px] bg-[#8FAFBA]" />
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#8FAFBA]">
                Authentic Fragrances · Bangladesh
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#F4F5F3] leading-[1.08] text-balance">
              Find a scent <br />
              <span className="italic font-normal text-[#C8DADD]">that feels like you.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#929DA0] max-w-xl font-light leading-relaxed">
              Explore authentic perfumes and carefully selected decants for every mood, moment and personality. Experience luxury French and Arabian scents before committing to full bottles.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('shop')}
                className="px-8 py-3.5 rounded bg-[#F4F5F3] text-[#090B0C] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#C8DADD] transition-colors flex items-center justify-center gap-2 group"
              >
                <span>Shop Perfumes</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleScrollToFinder}
                className="px-6 py-3.5 rounded bg-transparent border border-white/15 text-xs font-medium uppercase tracking-[0.16em] text-[#F4F5F3] hover:border-[#8FAFBA] hover:text-[#C8DADD] transition-colors flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#8FAFBA]" />
                <span>Find Your Scent →</span>
              </button>
            </div>

            {/* Quiet Editorial Annotations */}
            <div className="pt-6 border-t border-white/5 flex items-center gap-8 text-xs text-[#929DA0]">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#C8A98A]" />
                <span className="tracking-wider uppercase text-[11px] font-medium text-[#F4F5F3]">100% Authentic Source</span>
              </div>
              <span className="text-white/20">·</span>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#8FAFBA]" />
                <span className="tracking-wider uppercase text-[11px] font-medium text-[#F4F5F3]">Decants from ৳180</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Image Frame with Soft Powder Blue Contrast */}
              <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-lg overflow-hidden bg-[#161B1D] border border-white/10 shadow-2xl group">
                <img
                  src="/src/assets/images/hero_perfume_editorial_1790487865706.jpg"
                  alt="Perfume Syndicate authentic fragrance collection and decants"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                  loading="eager"
                />

                {/* Subtle Editorial Overlay annotations */}
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1.5 rounded bg-[#090B0C]/75 backdrop-blur-md border border-white/10 text-[11px] tracking-widest uppercase font-medium text-[#C8DADD]">
                    Atelier Decanting
                  </div>
                </div>

                <div className="absolute bottom-4 right-4">
                  <div className="px-3.5 py-2 rounded bg-[#090B0C]/80 backdrop-blur-md border border-white/10 text-right">
                    <p className="text-[10px] tracking-wider uppercase text-[#929DA0]">Authentic Flacons</p>
                    <p className="text-xs font-semibold text-[#F4F5F3]">3ml · 5ml · 10ml · Full Bottles</p>
                  </div>
                </div>
              </div>

              {/* Decorative minimalist corner accents */}
              <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b border-l border-[#8FAFBA]/40 pointer-events-none" />
              <div className="absolute -top-3 -right-3 w-12 h-12 border-t border-r border-[#8FAFBA]/40 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
