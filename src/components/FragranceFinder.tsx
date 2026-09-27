import React, { useState } from 'react';
import { Compass, RotateCcw, ArrowRight, Check, Sparkles } from 'lucide-react';
import { FRAGRANCES } from '../data/fragrances';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

export function FragranceFinder() {
  const { navigateTo, openQuickView, formatPrice } = useShop();

  const [occasion, setOccasion] = useState<string>('Date Night');
  const [weather, setWeather] = useState<string>('Cool');
  const [favoriteNote, setFavoriteNote] = useState<string>('Vanilla');
  const [isCalculated, setIsCalculated] = useState(false);

  const occasions = ['Date Night', 'Everyday', 'Office', 'Party'];
  const weathers = ['Hot', 'Warm', 'Cool', 'Rainy'];
  const notes = ['Oud', 'Vanilla', 'Rose', 'Citrus', 'Musk', 'Woody'];

  // Smart matching algorithm against the real product catalog
  const getRecommendations = (): Product[] => {
    return FRAGRANCES.filter((product) => {
      // Occasion match
      const occasionMatch = product.occasion.includes(occasion as any);
      // Weather match
      const weatherMatch = product.weather.includes(weather as any);
      // Note match (check accords or notes)
      const noteLower = favoriteNote.toLowerCase();
      const noteMatch =
        product.mainAccords.some((a) => a.toLowerCase().includes(noteLower)) ||
        product.notes.top.some((n) => n.toLowerCase().includes(noteLower)) ||
        product.notes.heart.some((n) => n.toLowerCase().includes(noteLower)) ||
        product.notes.base.some((n) => n.toLowerCase().includes(noteLower)) ||
        product.family.toLowerCase().includes(noteLower);

      return (occasionMatch && weatherMatch) || (occasionMatch && noteMatch) || (weatherMatch && noteMatch);
    }).slice(0, 3);
  };

  const matches = getRecommendations().length > 0 ? getRecommendations() : FRAGRANCES.slice(0, 3);

  const handleReset = () => {
    setOccasion('Date Night');
    setWeather('Cool');
    setFavoriteNote('Vanilla');
    setIsCalculated(false);
  };

  return (
    <section id="perfume-finder" className="py-20 sm:py-28 bg-[#101416] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1C2325] border border-white/10 text-xs font-medium uppercase tracking-[0.2em] text-[#C8A98A] mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Guided Scent Consultation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F4F5F3] leading-tight">
            Not sure which scent is right for you?
          </h2>
          <p className="text-xs sm:text-sm text-[#929DA0] mt-3 font-light">
            Select your preferences below to receive personal decant recommendations tailored to the Dhaka climate and your personal lifestyle.
          </p>
        </div>

        {/* Interactive Consultation Card */}
        <div className="max-w-4xl mx-auto bg-[#161B1D] border border-white/10 rounded-lg p-6 sm:p-10 shadow-2xl">
          <div className="space-y-8">
            
            {/* Step 1: Mood & Occasion */}
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] font-semibold text-[#8FAFBA] mb-3">
                1. Mood & Occasion
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {occasions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setOccasion(item);
                      setIsCalculated(true);
                    }}
                    className={`py-3 px-4 rounded text-xs font-medium tracking-wider uppercase transition-all flex items-center justify-between ${
                      occasion === item
                        ? 'bg-[#1C2325] border border-[#C8DADD] text-[#F4F5F3] shadow-md'
                        : 'bg-[#090B0C] border border-white/5 text-[#929DA0] hover:text-[#F4F5F3] hover:border-white/20'
                    }`}
                  >
                    <span>{item}</span>
                    {occasion === item && <Check className="w-3.5 h-3.5 text-[#C8DADD]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Weather */}
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] font-semibold text-[#8FAFBA] mb-3">
                2. Weather & Climate
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {weathers.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setWeather(item);
                      setIsCalculated(true);
                    }}
                    className={`py-3 px-4 rounded text-xs font-medium tracking-wider uppercase transition-all flex items-center justify-between ${
                      weather === item
                        ? 'bg-[#1C2325] border border-[#C8DADD] text-[#F4F5F3] shadow-md'
                        : 'bg-[#090B0C] border border-white/5 text-[#929DA0] hover:text-[#F4F5F3] hover:border-white/20'
                    }`}
                  >
                    <span>{item}</span>
                    {weather === item && <Check className="w-3.5 h-3.5 text-[#C8DADD]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Favourite Notes */}
            <div>
              <label className="block text-xs uppercase tracking-[0.16em] font-semibold text-[#8FAFBA] mb-3">
                3. Favourite Scent Notes
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {notes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setFavoriteNote(item);
                      setIsCalculated(true);
                    }}
                    className={`py-3 px-3 rounded text-xs font-medium tracking-wider uppercase transition-all flex items-center justify-between ${
                      favoriteNote === item
                        ? 'bg-[#1C2325] border border-[#C8DADD] text-[#F4F5F3] shadow-md'
                        : 'bg-[#090B0C] border border-white/5 text-[#929DA0] hover:text-[#F4F5F3] hover:border-white/20'
                    }`}
                  >
                    <span>{item}</span>
                    {favoriteNote === item && <Check className="w-3.5 h-3.5 text-[#C8DADD]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA action row */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#929DA0]">
                Showing profile: <span className="text-[#F4F5F3] font-medium">{occasion}</span> ·{' '}
                <span className="text-[#F4F5F3] font-medium">{weather} Weather</span> ·{' '}
                <span className="text-[#F4F5F3] font-medium">{favoriteNote} Notes</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2.5 rounded border border-white/10 text-xs text-[#929DA0] hover:text-[#F4F5F3] transition-colors"
                  title="Reset consultation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsCalculated(true)}
                  className="flex-1 sm:flex-none px-6 py-3 rounded bg-[#C8DADD] text-[#090B0C] text-xs font-semibold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Find My Scent →</span>
                </button>
              </div>
            </div>

          </div>

          {/* Results Area */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-medium text-[#F4F5F3] flex items-center gap-2">
                <span>Recommended Curations for You</span>
                <span className="text-xs font-sans tracking-widest uppercase text-[#8FAFBA] font-semibold">
                  (100% Authentic Decants)
                </span>
              </h3>
              <button
                onClick={() => navigateTo('shop')}
                className="text-xs text-[#C8DADD] hover:underline flex items-center gap-1"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {matches.map((item) => {
                const minPrice = Math.min(...item.variants.map((v) => v.price));
                return (
                  <div
                    key={item.id}
                    onClick={() => navigateTo('product', { slug: item.slug })}
                    className="p-4 rounded bg-[#101416] border border-white/5 hover:border-[#8FAFBA]/40 cursor-pointer transition-colors group flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[4/5] rounded bg-[#1C2325] overflow-hidden mb-3 p-2 flex items-center justify-center">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover rounded group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-[10px] uppercase tracking-wider text-[#8FAFBA] font-medium">
                        {item.brand}
                      </p>
                      <h4 className="text-sm font-medium text-[#F4F5F3] group-hover:text-[#C8DADD] transition-colors line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#929DA0] mt-1 line-clamp-1">
                        {item.mainAccords.slice(0, 3).join(' · ')}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#929DA0] block">Decants from</span>
                        <span className="text-sm font-semibold tabular-nums text-[#F4F5F3]">
                          {formatPrice(minPrice)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openQuickView(item);
                        }}
                        className="px-2.5 py-1 rounded bg-[#1C2325] border border-white/10 text-[11px] uppercase tracking-wider text-[#C8DADD] hover:bg-white hover:text-black transition-colors"
                      >
                        Sample
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
