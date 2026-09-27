import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { FRAGRANCES } from '../data/fragrances';
import { Hero } from '../components/Hero';
import { QuickDiscovery } from '../components/QuickDiscovery';
import { ProductCard } from '../components/ProductCard';
import { FragranceFinder } from '../components/FragranceFinder';
import { WhySyndicate } from '../components/WhySyndicate';
import { AuthenticitySection } from '../components/AuthenticitySection';
import { ReviewCarousel } from '../components/ReviewCarousel';
import { FaqSection } from '../components/FaqSection';
import { FragranceGuides } from '../components/FragranceGuides';
import { Newsletter } from '../components/Newsletter';
import { PowderBlueCta } from '../components/PowderBlueCta';

export function HomePage() {
  const { navigateTo, openQuickView, formatPrice } = useShop();

  const bestSellers = FRAGRANCES.filter((p) => p.isBestSeller).slice(0, 8);
  const newArrivals = FRAGRANCES.filter((p) => p.isNewArrival);
  const featuredLarge = newArrivals[0] || FRAGRANCES[0];
  const featuredSmall = FRAGRANCES.filter((p) => p.id !== featuredLarge.id).slice(0, 3);

  return (
    <div className="space-y-0 bg-[#090B0C]">
      {/* 01: Hero */}
      <Hero />

      {/* 02: Quick Discovery (Men, Women, Unisex) */}
      <QuickDiscovery />

      {/* 03: Best Sellers Grid (Real Dynamic Products) */}
      <section className="py-20 sm:py-28 bg-[#090B0C] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8FAFBA] block mb-2">
                Connoisseur Favorites
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4F5F3]">
                Best Selling Decants
              </h2>
            </div>
            
            <button
              onClick={() => navigateTo('shop', { sort: 'bestseller' })}
              className="mt-4 sm:mt-0 text-xs uppercase tracking-wider font-semibold text-[#C8DADD] hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Explore All Best Sellers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4-column desktop, 2-column mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 04: Shop by Fragrance Type (Designer, Niche, Arabian) */}
      <section className="py-20 sm:py-28 bg-[#101416] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8FAFBA] block mb-2">
              Heritage & Craft
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4F5F3]">
              Shop by Fragrance Tier
            </h2>
            <p className="text-xs sm:text-sm text-[#929DA0] mt-3 font-light">
              Explore European masterperfumery, French heritage houses, and opulent Middle Eastern extraits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Designer */}
            <div
              onClick={() => navigateTo('shop', { type: 'Designer' })}
              className="p-8 rounded-lg bg-[#161B1D] border border-white/10 hover:border-[#8FAFBA]/50 transition-all cursor-pointer group flex flex-col justify-between h-[320px]"
            >
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#8FAFBA] font-medium block mb-2">
                  Mass Appeal & Sophistication
                </span>
                <h3 className="font-serif text-3xl font-light text-[#F4F5F3] group-hover:text-[#C8DADD] transition-colors">
                  Designer Icons
                </h3>
                <p className="text-xs sm:text-sm text-[#929DA0] mt-3 font-light leading-relaxed">
                  Timeless classics from Chanel, Dior, Yves Saint Laurent, and Tom Ford. Versatile daily drivers with proven compliment factors.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8DADD] group-hover:text-white">
                <span>View Designer Decants</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Niche */}
            <div
              onClick={() => navigateTo('shop', { type: 'Niche' })}
              className="p-8 rounded-lg bg-[#161B1D] border border-white/10 hover:border-[#C8A98A]/50 transition-all cursor-pointer group flex flex-col justify-between h-[320px]"
            >
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#C8A98A] font-medium block mb-2">
                  High Artistry & Rare Extracts
                </span>
                <h3 className="font-serif text-3xl font-light text-[#F4F5F3] group-hover:text-[#C8A98A] transition-colors">
                  Niche Houses
                </h3>
                <p className="text-xs sm:text-sm text-[#929DA0] mt-3 font-light leading-relaxed">
                  Artistic masterworks from Maison Francis Kurkdjian, Xerjoff, Nishane, Kilian, and Parfums de Marly. Unmatched concentration.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8A98A] group-hover:text-white">
                <span>View Niche Decants</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Arabian */}
            <div
              onClick={() => navigateTo('shop', { type: 'Arabian' })}
              className="p-8 rounded-lg bg-[#161B1D] border border-white/10 hover:border-[#8FAFBA]/50 transition-all cursor-pointer group flex flex-col justify-between h-[320px]"
            >
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#8FAFBA] font-medium block mb-2">
                  Dense Oud & Velvet Gourmands
                </span>
                <h3 className="font-serif text-3xl font-light text-[#F4F5F3] group-hover:text-[#C8DADD] transition-colors">
                  Arabian Blends
                </h3>
                <p className="text-xs sm:text-sm text-[#929DA0] mt-3 font-light leading-relaxed">
                  Rich, room-filling compositions from Lattafa, Afnan, and Armaf. Exceptional longevity formulated for longevity in warm air.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8DADD] group-hover:text-white">
                <span>View Arabian Decants</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05: Perfume Finder (Interactive Guided Consultation) */}
      <FragranceFinder />

      {/* 06: New Arrivals (Asymmetric Editorial Layout: 1 large + 3 smaller) */}
      <section className="py-20 sm:py-28 bg-[#090B0C] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8FAFBA] block mb-2">
                Fresh From the Bottling Atelier
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4F5F3]">
                Newest Decant Arrivals
              </h2>
            </div>
            <button
              onClick={() => navigateTo('shop', { sort: 'newest' })}
              className="mt-4 sm:mt-0 text-xs uppercase tracking-wider font-semibold text-[#C8DADD] hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>View All New Releases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Asymmetric 1 Large + 3 Small Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* 1 Large Featured Product */}
            <div
              onClick={() => navigateTo('product', { slug: featuredLarge.slug })}
              className="lg:col-span-6 p-6 sm:p-8 rounded-lg bg-[#101416] border border-white/10 hover:border-[#8FAFBA]/50 transition-all cursor-pointer group flex flex-col justify-between shadow-2xl"
            >
              <div className="relative aspect-[16/11] rounded-md bg-[#1C2325] overflow-hidden mb-6 p-4 flex items-center justify-center">
                <img
                  src={featuredLarge.imageUrl}
                  alt={featuredLarge.name}
                  className="w-full h-full object-cover rounded group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded bg-[#090B0C]/80 backdrop-blur-sm text-[10px] uppercase tracking-widest font-semibold text-[#C8A98A]">
                    Spotlight Release
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase text-[#8FAFBA] font-medium">
                  <span>{featuredLarge.brand}</span>
                  <span className="text-[#929DA0]">{featuredLarge.concentration}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F4F5F3] group-hover:text-[#C8DADD] transition-colors">
                  {featuredLarge.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#929DA0] font-light leading-relaxed line-clamp-2">
                  {featuredLarge.description}
                </p>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#929DA0] block">Decants starting from</span>
                    <span className="text-xl font-bold tabular-nums text-[#F4F5F3]">
                      {formatPrice(Math.min(...featuredLarge.variants.map((v) => v.price)))}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openQuickView(featuredLarge);
                    }}
                    className="px-4 py-2 rounded bg-[#C8DADD] text-[#090B0C] text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    Select Size
                  </button>
                </div>
              </div>
            </div>

            {/* 3 Smaller Products Stack */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              {featuredSmall.map((item) => {
                const minPrice = Math.min(...item.variants.map((v) => v.price));
                return (
                  <div
                    key={item.id}
                    onClick={() => navigateTo('product', { slug: item.slug })}
                    className="p-4 rounded-lg bg-[#101416] border border-white/10 hover:border-[#8FAFBA]/40 cursor-pointer transition-colors group flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-24 rounded bg-[#1C2325] overflow-hidden shrink-0 p-1 flex items-center justify-center">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover rounded group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8FAFBA] font-medium block">
                          {item.brand} · {item.concentration}
                        </span>
                        <h4 className="font-serif text-lg font-medium text-[#F4F5F3] group-hover:text-[#C8DADD] transition-colors line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#929DA0] mt-1 line-clamp-1 font-light">
                          {item.mainAccords.slice(0, 3).join(' · ')}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-[#929DA0] block">From</span>
                      <span className="text-sm font-semibold tabular-nums text-[#F4F5F3] block">
                        {formatPrice(minPrice)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openQuickView(item);
                        }}
                        className="mt-2 text-[11px] uppercase tracking-wider text-[#C8DADD] hover:underline"
                      >
                        Sample →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* 07: Seasonal Collections */}
      <section className="py-20 sm:py-28 bg-[#101416] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8FAFBA] block mb-2">
              Climate-Curated Profiles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4F5F3]">
              Seasonal Fragrance Wardrobe
            </h2>
            <p className="text-xs sm:text-sm text-[#929DA0] mt-3 font-light">
              Specially selected decants formulated to withstand heat, cut through monsoon rain, or wrap warmly in winter.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {([
              {
                season: 'Summer',
                tagline: 'High-Heat Effervescence',
                desc: 'Crisp bergamot, salty marine ambroxan, and dry cedar that stay fresh all afternoon.',
                icon: '☀️',
                filter: { weather: 'Hot' } as Record<string, string>
              },
              {
                season: 'Rainy',
                tagline: 'Monsoon Woods & Vetiver',
                desc: 'Earthy patchouli, damp petrichor greens, and bright citrus that pierce humidity.',
                icon: '🌧️',
                filter: { weather: 'Rainy' } as Record<string, string>
              },
              {
                season: 'Fall',
                tagline: 'Golden Spice & Leather',
                desc: 'Cardamom, cinnamon bark, and smoky birch notes that turn cozy as dusk falls.',
                icon: '🍂',
                filter: { season: 'Fall' } as Record<string, string>
              },
              {
                season: 'Winter',
                tagline: 'Oud, Cognac & Honey',
                desc: 'Intense extraits like Naxos and Angels’ Share that bloom magnificently in cool air.',
                icon: '❄️',
                filter: { weather: 'Cool' } as Record<string, string>
              }
            ]).map((col) => (
              <div
                key={col.season}
                onClick={() => navigateTo('shop', col.filter)}
                className="p-6 rounded-lg bg-[#161B1D] border border-white/5 hover:border-[#8FAFBA]/40 cursor-pointer transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl mb-4 block">{col.icon}</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#8FAFBA] font-medium block">
                    {col.season} Edition
                  </span>
                  <h3 className="font-serif text-xl font-light text-[#F4F5F3] mt-1 group-hover:text-[#C8DADD] transition-colors">
                    {col.tagline}
                  </h3>
                  <p className="text-xs text-[#929DA0] mt-2 font-light leading-relaxed">
                    {col.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#C8DADD] group-hover:text-white">
                  <span>Explore Decants</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08: Why Perfume Syndicate */}
      <WhySyndicate />

      {/* 09: Authenticity / Trust Deep Dive */}
      <AuthenticitySection />

      {/* 10: Customer Reviews */}
      <ReviewCarousel />

      {/* 11: FAQ Section */}
      <FaqSection />

      {/* 12: Content & Fragrance Guides */}
      <FragranceGuides />

      {/* 14: Newsletter */}
      <Newsletter />

      {/* 15: Signature Powder-Blue CTA */}
      <PowderBlueCta />
    </div>
  );
}
