import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { EDITORIAL_GUIDES } from '../data/articles';
import { useShop } from '../context/ShopContext';

export function FragranceGuides() {
  const { navigateTo } = useShop();

  return (
    <section className="py-20 sm:py-28 bg-[#090B0C] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8FAFBA] block mb-2">
              Fragrance Atelier Gazette
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4F5F3]">
              Curated Fragrance Guides
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#929DA0] max-w-sm mt-3 sm:mt-0 font-light">
            Insights on olfactory notes, climate longevity, and building a versatile scent wardrobe.
          </p>
        </div>

        {/* 3 Column Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EDITORIAL_GUIDES.map((post) => (
            <article
              key={post.id}
              onClick={() => navigateTo('article', { slug: post.slug })}
              className="group cursor-pointer flex flex-col justify-between space-y-4"
            >
              {/* Image Frame */}
              <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[#161B1D] border border-white/10 group-hover:border-[#8FAFBA]/40 transition-colors">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Metadata */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#8FAFBA] font-medium">
                  <span>{post.category}</span>
                  <span className="text-white/20">·</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-light text-[#F4F5F3] group-hover:text-[#C8DADD] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#929DA0] line-clamp-2 font-light leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Read Link */}
              <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C8DADD] group-hover:text-white transition-colors">
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
