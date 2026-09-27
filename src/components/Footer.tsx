import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export function Footer() {
  const { navigateTo } = useShop();

  return (
    <footer className="bg-[#090B0C] border-t border-white/10 pt-16 pb-12 text-[#929DA0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info & Contacts */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-xl tracking-[0.18em] font-semibold uppercase text-[#F4F5F3] block">
              PERFUME SYNDICATE
            </span>
            <p className="text-xs text-[#929DA0] max-w-sm leading-relaxed font-light">
              Premium authentic perfume decants and original full bottles in Bangladesh. Bringing world-class French, Italian, and Middle Eastern perfumery to your doorstep with zero compromise on authenticity.
            </p>

            <div className="space-y-2 text-xs pt-2">
              <div className="flex items-center gap-2.5 text-[#F4F5F3]">
                <Phone className="w-3.5 h-3.5 text-[#8FAFBA]" />
                <a href="https://wa.me/8801795594222" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8DADD] transition-colors">
                  +880 1795-594222 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-[#929DA0]">
                <Mail className="w-3.5 h-3.5 text-[#8FAFBA]" />
                <span>concierge@perfumesyndicatebd.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#929DA0]">
                <MapPin className="w-3.5 h-3.5 text-[#8FAFBA]" />
                <span>Dhaka, Bangladesh · Nationwide Courier Fulfillment</span>
              </div>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.16em] font-semibold text-[#F4F5F3]">
              Shop
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('shop', { gender: 'Men' })} className="hover:text-[#F4F5F3] transition-colors">
                  Men's Fragrances
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { gender: 'Women' })} className="hover:text-[#F4F5F3] transition-colors">
                  Women's Fragrances
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { gender: 'Unisex' })} className="hover:text-[#F4F5F3] transition-colors">
                  Unisex Blends
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { format: 'Decant' })} className="hover:text-[#C8A98A] text-[#C8DADD] font-medium transition-colors">
                  Decants (3ml - 30ml)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { format: 'Full Bottle' })} className="hover:text-[#F4F5F3] transition-colors">
                  Full Sealed Bottles
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Categories & Brands */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.16em] font-semibold text-[#F4F5F3]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('shop', { type: 'Niche' })} className="hover:text-[#F4F5F3] transition-colors">
                  Niche Houses
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { type: 'Designer' })} className="hover:text-[#F4F5F3] transition-colors">
                  Designer Icons
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { type: 'Arabian' })} className="hover:text-[#F4F5F3] transition-colors">
                  Arabian & Oud
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { sort: 'bestseller' })} className="hover:text-[#F4F5F3] transition-colors">
                  Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { sort: 'newest' })} className="hover:text-[#F4F5F3] transition-colors">
                  New Arrivals
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Support & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.16em] font-semibold text-[#F4F5F3]">
              Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-[#F4F5F3] transition-colors">
                  Authenticity & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#F4F5F3] transition-colors">
                  About Syndicate Atelier
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-[#F4F5F3] transition-colors">
                  Delivery Guidelines (Dhaka & Nationwide)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-[#F4F5F3] transition-colors">
                  Unboxing & Replacement Policy
                </button>
              </li>
              <li>
                <a
                  href="https://facebook.com/SyndicatePerfume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4F5F3] transition-colors block"
                >
                  Facebook @SyndicatePerfume
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/SyndicatePerfume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4F5F3] transition-colors block"
                >
                  Instagram @SyndicatePerfume
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#929DA0]/80">
          <p>© {new Date().getFullYear()} Perfume Syndicate BD. All rights reserved. 100% Authentic Fragrance Guarantee.</p>

          <div className="flex items-center gap-4 text-[#929DA0]">
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>bKash</span>
            <span>·</span>
            <span>Nagad</span>
            <span>·</span>
            <span>Visa / Mastercard</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
