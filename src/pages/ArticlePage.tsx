import React from 'react';
import { ArrowLeft, BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { EDITORIAL_GUIDES } from '../data/articles';

export function ArticlePage() {
  const { pageParams, navigateTo } = useShop();

  const article = EDITORIAL_GUIDES.find((a) => a.slug === pageParams.slug) || EDITORIAL_GUIDES[0];

  return (
    <div className="bg-[#090B0C] min-h-screen py-10 sm:py-20 border-b border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Link */}
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#929DA0] hover:text-[#C8DADD] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Fragrance Atelier</span>
        </button>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#8FAFBA] font-medium">
            <span>{article.category}</span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{article.readTime}</span>
            </span>
            <span className="text-white/20">·</span>
            <span>{article.date}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#F4F5F3] leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-[#929DA0] font-light leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-[#161B1D] border border-white/10 shadow-2xl">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Body Content */}
        <div className="space-y-6 text-sm sm:text-base text-[#929DA0] font-light leading-relaxed border-b border-white/10 pb-12">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-lg bg-[#101416] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl text-[#F4F5F3]">Ready to begin your scent exploration?</h3>
            <p className="text-xs text-[#929DA0] mt-1">Discover authentic 3ml, 5ml, and 10ml decants.</p>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-3 rounded bg-[#C8DADD] text-[#090B0C] text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors shrink-0"
          >
            Shop Curated Decants
          </button>
        </div>

      </div>
    </div>
  );
}
