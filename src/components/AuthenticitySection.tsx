import React from 'react';
import { ShieldCheck, Droplet, PackageCheck, Headphones, Check } from 'lucide-react';

export function AuthenticitySection() {
  const steps = [
    {
      title: 'Original Batch Verification',
      desc: 'Each full bottle arrives factory-sealed with verifiable batch codes etched into glass and box matching manufacturer records.'
    },
    {
      title: 'Zero-Dilution Transfer',
      desc: 'We draw the pure perfume juice directly using sterile syringes into medical-grade glass atomizers. No alcohol additions. No fillers.'
    },
    {
      title: 'Teflon-Sealed Atomizers',
      desc: 'Threaded nozzles are secured with high-barrier Teflon seals to prevent pressure leaks and stop volatile top notes from evaporating.'
    },
    {
      title: 'Unboxing Guarantee',
      desc: 'Backed by our hassle-free video replacement warranty and 24/7 WhatsApp concierge (+880 1795-594222).'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#101416] border-b border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Macro Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#161B1D] border border-white/10 shadow-2xl">
              <img
                src="/src/assets/images/decant_craft_authenticity_1790487930121.jpg"
                alt="Perfume Syndicate sterile decanting craftsmanship"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090B0C] via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-[#090B0C]/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#C8DADD] font-medium">Cleanroom Protocol</p>
                  <p className="text-xs text-[#929DA0]">3ml · 5ml · 10ml · 15ml Glass Vials</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#C8A98A]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Purity</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Trust Architecture */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8FAFBA] block mb-2">
                Uncompromising Integrity
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4F5F3]">
                The Decanting Promise
              </h2>
              <p className="text-xs sm:text-sm text-[#929DA0] mt-3 font-light leading-relaxed">
                Counterfeits and watered-down perfumes are pervasive in unauthorized markets. Perfume Syndicate was established with one uncompromising mandate: deliver the genuine, unadulterated luxury fragrance experience to your doorstep.
              </p>
            </div>

            <div className="space-y-5">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#1C2325] border border-[#8FAFBA]/50 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#C8DADD]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#F4F5F3]">{step.title}</h4>
                    <p className="text-xs text-[#929DA0] mt-0.5 leading-relaxed font-light">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded bg-[#161B1D] border border-white/5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#929DA0]">
                <Headphones className="w-4 h-4 text-[#C8DADD]" />
                <span>Concierge query? Chat directly with our fragrance curator:</span>
              </div>
              <a
                href="https://wa.me/8801795594222"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#C8DADD] hover:underline whitespace-nowrap ml-2"
              >
                +880 1795-594222 →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
