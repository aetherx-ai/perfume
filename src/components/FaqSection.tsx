import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/faqs';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const toggle = (id: string) => {
    setOpenId((curr) => (curr === id ? null : id));
  };

  return (
    <section className="py-20 sm:py-28 bg-[#101416] border-b border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#8FAFBA] block mb-2">
            Clarity & Confidence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4F5F3]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#929DA0] mt-3 font-light">
            Everything you need to know about our sourcing, sterile decant process, and nationwide fulfillment.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-lg bg-[#161B1D] border border-white/5 overflow-hidden transition-colors hover:border-[#8FAFBA]/30"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl font-medium text-[#F4F5F3]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full bg-[#1C2325] flex items-center justify-center text-[#C8DADD] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#C8DADD] text-black' : ''
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-[#929DA0] leading-relaxed font-light border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
