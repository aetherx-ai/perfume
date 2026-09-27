import React from 'react';
import { ShieldCheck, Pipette, Truck, Sparkles, CheckCircle, Package } from 'lucide-react';

export function WhySyndicate() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '100% Authentic Flacons',
      description: 'Sourced exclusively from verified European distributors, official brand boutiques, and certified regional brand houses.'
    },
    {
      icon: Pipette,
      title: 'Sterile Precision Decanting',
      description: 'Drawn directly using sterile single-use syringes and pipettes in a controlled clean environment with zero dilution.'
    },
    {
      icon: Sparkles,
      title: 'Try Before Committing',
      description: 'Sample expensive luxury fragrances in 3ml, 5ml, and 10ml vials without spending tens of thousands on blind buys.'
    },
    {
      icon: Package,
      title: 'Airtight & Leak-Proof',
      description: 'Thread-sealed glass atomizers with high-grade Teflon insulation wrapped in triple-layer shockproof bubble armor.'
    },
    {
      icon: Truck,
      title: 'Nationwide Delivery',
      description: '24–48 hours inside Dhaka (৳80), 48–72 hours across all 64 districts of Bangladesh (৳130). Free over ৳3,000.'
    },
    {
      icon: CheckCircle,
      title: 'Cash on Delivery (COD)',
      description: 'Inspect your sealed shipment at your doorstep with verified parcel tracking via Steadfast and Pathao.'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#090B0C] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#8FAFBA] block mb-2">
            The Syndicate Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4F5F3]">
            Why Fragrance Enthusiasts Choose Us
          </h2>
          <p className="text-xs sm:text-sm text-[#929DA0] mt-3 font-light">
            Bringing authentic niche perfumery within reach across Bangladesh since day one.
          </p>
        </div>

        {/* 6-Column Grid of Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded bg-[#101416] border border-white/5 hover:border-[#8FAFBA]/30 transition-all duration-300 space-y-4"
              >
                <div className="w-10 h-10 rounded bg-[#161B1D] border border-white/10 flex items-center justify-center text-[#C8DADD]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#F4F5F3]">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#929DA0] font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
