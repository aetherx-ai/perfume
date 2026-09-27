import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle, Quote } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/reviews';

export function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((curr) => (curr === 0 ? CUSTOMER_REVIEWS.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentIndex((curr) => (curr === CUSTOMER_REVIEWS.length - 1 ? 0 : curr + 1));
  };

  const current = CUSTOMER_REVIEWS[currentIndex];

  return (
    <section className="py-20 sm:py-28 bg-[#090B0C] border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8FAFBA] block mb-2">
              Customer Perspectives
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#F4F5F3]">
              Words from Discerning Collectors
            </h2>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="p-2.5 rounded-full border border-white/10 bg-[#101416] text-[#929DA0] hover:text-[#F4F5F3] hover:border-[#8FAFBA]/50 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="p-2.5 rounded-full border border-white/10 bg-[#101416] text-[#929DA0] hover:text-[#F4F5F3] hover:border-[#8FAFBA]/50 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Editorial Review Card */}
        <div className="relative p-8 sm:p-12 rounded-lg bg-[#101416] border border-white/10 shadow-2xl">
          <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5 pointer-events-none" />

          {/* Rating Stars */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#C8A98A] text-[#C8A98A]" />
            ))}
          </div>

          {/* Large Quote */}
          <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#F4F5F3] font-light leading-relaxed mb-8">
            "{current.comment}"
          </p>

          {/* Reviewer Details */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#F4F5F3]">{current.author}</span>
                {current.verifiedPurchase && (
                  <span className="flex items-center gap-1 text-[11px] text-[#8FAFBA]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C8DADD]" />
                    <span>Verified Buyer</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-[#929DA0] mt-0.5">{current.location}</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[11px] uppercase tracking-wider text-[#C8A98A] block font-medium">
                Fragrance Decant
              </span>
              <span className="text-xs text-[#F4F5F3]">{current.productName}</span>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {CUSTOMER_REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-8 bg-[#C8DADD]' : 'w-2 bg-white/20'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
