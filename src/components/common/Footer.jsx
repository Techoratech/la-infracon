import React from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  ArrowUp,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  ShieldCheck,
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { scrollToTarget } from '../../utils/scrollManager';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Growth History', href: '#growth' },
    { name: 'About Brand', href: '#about' },
    { name: 'Masterplan', href: '#project' },
    { name: 'Plot Sizes', href: '#plots' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Location Map', href: '#location' },
    { name: 'Visual Gallery', href: '#gallery' },
    { name: 'VIP Enquiry', href: '#contact' },
  ];

  return (
    <footer className="relative bg-charcoal text-ivory border-t border-sand/20 pt-12 pb-28 sm:pt-16 sm:pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-sand/20">
          
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget('#hero', -80);
              }}
              className="flex items-center gap-3 mb-3.5"
            >
              <div className="h-9 sm:h-10 flex items-center justify-center">
                <img
                  src={siteConfig.brand.logoWhite}
                  alt={siteConfig.brand.name}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white">
                  {siteConfig.brand.name}
                </span>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-sand">
                  {siteConfig.brand.tagline}
                </p>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-sand/80 font-light leading-relaxed max-w-sm mb-5 sm:mb-6">
              Palm Corridor is LA INFRACON's flagship plotted sanctuary — delivering 3.64x growth, crystal-clear freehold titles, and generational legacy across lush residential acreage.
            </p>

            {/* Social channels (Large touch targets for mobile) */}
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-black/50 border border-sand/30 flex items-center justify-center text-ivory hover:bg-white hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-black/50 border border-sand/30 flex items-center justify-center text-ivory hover:bg-white hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-black/50 border border-sand/30 flex items-center justify-center text-ivory hover:bg-white hover:text-black transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-black/50 border border-sand/30 flex items-center justify-center text-ivory hover:bg-white hover:text-black transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Col (3 cols on desktop, 2-column grid on mobile) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
              Quick Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-2 lg:grid-cols-1">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTarget(link.href, -80);
                    }}
                    className="text-sand/80 hover:text-white transition-colors flex items-center gap-1.5 py-1"
                  >
                    <span className="text-sand/50">&rsaquo;</span>
                    <span className="truncate">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Details & Contact Col (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                Palm Corridor Advisory
              </h4>

              <div className="space-y-3 text-xs text-sand/90">
                <a
                  href={`tel:${siteConfig.contact.phoneDial}`}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-black/30 border border-sand/20 text-white hover:text-sand-light transition-colors"
                >
                  <Phone className="w-4 h-4 text-sand shrink-0" />
                  <span className="font-mono text-sm font-semibold">{siteConfig.contact.phoneRaw}</span>
                  <span className="text-[10px] uppercase text-sand font-sans ml-auto">(Tap to Call)</span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-black/30 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span className="font-mono text-sm font-semibold">+{siteConfig.contact.whatsappNumber}</span>
                  <span className="text-[10px] uppercase text-emerald-400 font-sans ml-auto">(WhatsApp)</span>
                </a>

                <div className="flex items-start gap-2.5 pt-1 px-1 text-sand/70">
                  <MapPin className="w-4 h-4 text-sand shrink-0 mt-0.5" />
                  <span className="text-[11px] sm:text-xs leading-snug">{siteConfig.contact.address.fullAddress}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 p-3 rounded-xl bg-black/40 border border-sand/20 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-sand shrink-0" />
              <div className="text-[10px] text-sand font-mono">
                RERA Registered Plotted Colony: <br />
                <span className="text-white">{siteConfig.project.reraNumber}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-sand/70">
          <div>
            <p className="text-[11px] sm:text-xs">{siteConfig.legal.copyright}</p>
            <p className="text-[10px] sm:text-[11px] text-sand/50 mt-1 italic">
              Images are for representation purposes only.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[10px] sm:text-[11px] font-mono text-sand/80">
            <span>Palm Corridor</span>
            <span>&bull;</span>
            <button
              onClick={() => scrollToTarget('#hero', -80)}
              className="p-2 px-3 rounded-lg bg-black/60 border border-sand/20 hover:border-white hover:text-white transition-colors flex items-center gap-1.5"
              aria-label="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
