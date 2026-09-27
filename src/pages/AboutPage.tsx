import React from 'react';
import { ShieldCheck, Pipette, Award, Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export function AboutPage() {
  const { navigateTo } = useShop();

  return (
    <div className="bg-[#090B0C] min-h-screen py-10 sm:py-20 border-b border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#8FAFBA] block">
            Our Atelier & Philosophy
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#F4F5F3]">
            Democratizing Haute Parfumerie in Bangladesh
          </h1>
          <p className="text-sm sm:text-base text-[#929DA0] max-w-2xl mx-auto font-light leading-relaxed">
            Perfume Syndicate was founded with a singular conviction: discovering the world's most evocative artistic fragrances should be an accessible, trustworthy, and exhilarating experience.
          </p>
        </div>

        {/* Narrative Section with Image */}
        <div className="space-y-8">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-[#161B1D] border border-white/10 shadow-2xl">
            <img
              src="/src/assets/images/hero_perfume_editorial_1790487865706.jpg"
              alt="Perfume Syndicate Atelier"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#929DA0] space-y-4 font-light leading-relaxed">
            <p>
              In traditional fragrance retail, customers are forced to make high-stakes, expensive commitments. Buying a 100ml flacon of an Extrait de Parfum for ৳30,000 to ৳45,000 based on a 10-second paper blotter spray inside a noisy boutique often leads to regret. Fragrance is alive; it reacts to body temperature, ambient humidity, and individual skin biochemistry across hours.
            </p>
            <p>
              Perfume Syndicate bridges this divide. We procure authentic factory-sealed flacons from authorized European and Middle Eastern distributors, verify batch codes, and decant them into sterile, airtight 3ml, 5ml, 10ml, and 15ml glass atomizers.
            </p>
            <p>
              Our decanting laboratory adheres to clean-room standards with single-use sterile syringes and Teflon seals, guaranteeing zero dilution, zero contamination, and zero oxidation.
            </p>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
          <div className="p-6 rounded-lg bg-[#101416] border border-white/5 space-y-2">
            <ShieldCheck className="w-5 h-5 text-[#C8DADD]" />
            <h3 className="font-serif text-lg font-medium text-[#F4F5F3]">100% Proven Provenance</h3>
            <p className="text-xs text-[#929DA0] font-light">
              Every bottle in our atelier possesses verifiable batch stamps and authentic distribution paperwork.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#101416] border border-white/5 space-y-2">
            <Pipette className="w-5 h-5 text-[#8FAFBA]" />
            <h3 className="font-serif text-lg font-medium text-[#F4F5F3]">Laboratory Standards</h3>
            <p className="text-xs text-[#929DA0] font-light">
              Sterile medical syringes ensure the juice never touches open air or filler alcohol.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[#101416] border border-white/5 space-y-2">
            <Sparkles className="w-5 h-5 text-[#C8A98A]" />
            <h3 className="font-serif text-lg font-medium text-[#F4F5F3]">Curatorial Insight</h3>
            <p className="text-xs text-[#929DA0] font-light">
              Tailored scent advice grounded in Bangladesh's tropical humidity and weather shifts.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-lg bg-[#101416] border border-white/10 text-center space-y-4">
          <h2 className="font-serif text-2xl text-[#F4F5F3]">Ready to explore our authentic flacons?</h2>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-3 rounded bg-[#C8DADD] text-[#090B0C] text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors inline-flex items-center gap-2"
          >
            <span>Browse Full Fragrance Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
