import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, Truck, RotateCcw, HelpCircle, Phone } from 'lucide-react';
import { FAQS } from '../data/faqs';
import { useShop } from '../context/ShopContext';

export function FaqPage() {
  const { navigateTo } = useShop();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0].id);

  const categories = ['All', 'Authenticity', 'Decants', 'Delivery', 'Orders & Payment', 'Returns'];

  const filteredFaqs = selectedCategory === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === selectedCategory);

  return (
    <div className="bg-[#090B0C] min-h-screen py-10 sm:py-16 border-b border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs text-[#929DA0] uppercase tracking-wider mb-2">
            <button onClick={() => navigateTo('home')} className="hover:text-[#F4F5F3]">
              Home
            </button>
            <span>/</span>
            <span className="text-[#C8DADD]">Customer Care</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#F4F5F3]">
            Authenticity & Customer FAQs
          </h1>
          <p className="text-xs sm:text-sm text-[#929DA0] max-w-lg mx-auto font-light">
            Clear, transparent answers about our decanting methods, batch origins, nationwide delivery times, and leakproof guarantees.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#C8DADD] text-[#090B0C] font-semibold'
                  : 'bg-[#161B1D] text-[#929DA0] hover:text-[#F4F5F3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-lg bg-[#101416] border border-white/5 overflow-hidden transition-colors hover:border-[#8FAFBA]/40"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8FAFBA] font-medium block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-[#F4F5F3]">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C8DADD] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-2 text-xs sm:text-sm text-[#929DA0] leading-relaxed font-light border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Banner */}
        <div className="p-6 rounded-lg bg-[#161B1D] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-[#F4F5F3]">Still have a specific query?</h4>
            <p className="text-xs text-[#929DA0] mt-0.5">
              Our Dhaka scent curator is available daily from 10 AM to 10 PM.
            </p>
          </div>
          <a
            href="https://wa.me/8801795594222"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded bg-[#C8DADD] text-[#090B0C] text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-2 shrink-0 justify-center"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}
