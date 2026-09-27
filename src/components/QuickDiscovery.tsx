import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export function QuickDiscovery() {
  const { navigateTo } = useShop();

  const panels = [
    {
      id: 'men',
      title: 'Men',
      gender: 'Men',
      subtitle: 'Aromatic, Woody & Smoky Powerhouses',
      description: 'From bold office signatures like Sauvage Elixir and Bleu de Chanel to alluring evening staples.',
      image: '/src/assets/images/category_men_fragrance_1790487883385.jpg',
      count: 'Designer & Niche'
    },
    {
      id: 'women',
      title: 'Women',
      gender: 'Women',
      subtitle: 'Ethereal Florals & Velvet Gourmands',
      description: 'Luminous Turkish rose, decadent vanilla, and delicate musk decants engineered for lasting sillage.',
      image: '/src/assets/images/category_women_fragrance_1790487900498.jpg',
      count: 'Haute Parfumerie'
    },
    {
      id: 'unisex',
      title: 'Unisex',
      gender: 'Unisex',
      subtitle: 'Niche Compositions & Arabian Oud',
      description: 'Transcendent boundary-pushing fragrances like Baccarat Rouge 540, Naxos, and Angels’ Share.',
      image: '/src/assets/images/category_arabian_niche_1790487915987.jpg',
      count: 'Pure Artistry'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#090B0C] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8FAFBA] block mb-2">
              Curated Discovery
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4F5F3]">
              Explore by Identity
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#929DA0] max-w-md mt-4 md:mt-0 font-light">
            Every fragrance is available in 3ml, 5ml, and 10ml sterile decants so you can discover your signature with complete confidence.
          </p>
        </div>

        {/* 3 Major Editorial Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {panels.map((panel) => (
            <div
              key={panel.id}
              onClick={() => navigateTo('shop', { gender: panel.gender })}
              className="group relative h-[480px] sm:h-[540px] rounded-lg overflow-hidden cursor-pointer bg-[#101416] border border-white/10 hover:border-[#8FAFBA]/50 transition-all duration-500 shadow-xl flex flex-col justify-end p-6 sm:p-8"
            >
              {/* Background Image with Zoom & Dark Gradient */}
              <div className="absolute inset-0 z-0">
                <img
                  src={panel.image}
                  alt={panel.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                {/* Multi-stage dark gradient overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090B0C] via-[#090B0C]/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-85" />
              </div>

              {/* Top Accent Tag */}
              <div className="absolute top-6 left-6 z-10">
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#C8DADD] px-3 py-1 rounded bg-[#090B0C]/80 backdrop-blur-md border border-white/10">
                  {panel.count}
                </span>
              </div>

              {/* Panel Content */}
              <div className="relative z-10 space-y-3 transform transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#F4F5F3] group-hover:text-[#C8DADD] transition-colors">
                    {panel.title}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#C8DADD] text-[#F4F5F3] group-hover:text-[#090B0C] flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <p className="text-xs uppercase tracking-wider text-[#8FAFBA] font-medium">
                  {panel.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#929DA0] leading-relaxed line-clamp-2 font-light">
                  {panel.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
