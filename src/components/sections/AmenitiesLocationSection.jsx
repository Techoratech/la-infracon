import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Trees,
  Car,
  Flower2,
  Gamepad2,
  LampCeiling,
  DoorClosed,
  ShieldAlert,
  Waves,
  Zap,
  MapPin,
  ExternalLink,
  Navigation,
  Clock,
  Sparkles,
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export default function AmenitiesLocationSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const getAmenityIcon = (iconName) => {
    const props = { className: 'w-6 h-6 text-black' };
    switch (iconName) {
      case 'Trees':
        return <Trees {...props} />;
      case 'Car':
        return <Car {...props} />;
      case 'Flower2':
        return <Flower2 {...props} />;
      case 'Gamepad2':
        return <Gamepad2 {...props} />;
      case 'LampCeiling':
        return <LampCeiling {...props} />;
      case 'DoorClosed':
        return <DoorClosed {...props} />;
      case 'ShieldAlert':
        return <ShieldAlert {...props} />;
      case 'Waves':
        return <Waves {...props} />;
      case 'Zap':
      default:
        return <Zap {...props} />;
    }
  };

  return (
    <section
      id="amenities"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-ivory text-black overflow-hidden border-t border-sand/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Amenities Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand/20 border border-sand text-taupe-dark text-xs uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Curated Community Features</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black">
            World-Class <span className="text-taupe-dark font-normal italic">Amenities</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-black/75 leading-relaxed font-light">
            Every facet of Palm Corridor is orchestrated to blend refined comfort, uninterrupted utilities, and verdant open-air tranquility.
          </p>
        </div>

        {/* 9 Amenities Grid (White cards on Ivory background with minimal black icons) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-28">
          {siteConfig.amenities.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * idx }}
              className="rounded-2xl p-6 bg-white border border-sand/45 shadow-luxury-sm hover:shadow-luxury transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-beige-light border border-sand/60 flex items-center justify-center mb-4 group-hover:scale-105 transition-all duration-300">
                  {getAmenityIcon(item.icon)}
                </div>

                <h3 className="font-serif text-xl font-bold text-black group-hover:text-taupe-dark transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-black/70 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-sand/25 flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-taupe">
                <span>Infrastructure Standard</span>
                <span className="text-black font-semibold">&bull; Certified</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Location & Strategic Connectivity */}
        <div id="location" className="pt-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand/20 border border-sand text-taupe-dark text-xs uppercase tracking-[0.2em] mb-4">
              <Navigation className="w-3.5 h-3.5 text-black" />
              <span>Unmatched Accessibility</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-black">
              Location & <span className="text-taupe-dark font-normal italic">Connectivity</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-black/70 font-light">
              Nestled at the confluence of expressways, top healthcare, premier schools, and upcoming transit links.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Connectivity Distances Card (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-white border border-sand/50 shadow-luxury flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-sand/30 mb-4">
                  <span className="font-serif text-lg font-bold text-black">
                    Nearby Landmarks
                  </span>
                  <span className="text-xs font-mono text-taupe">
                    Drive Times
                  </span>
                </div>

                <div className="space-y-3.5">
                  {siteConfig.connectivity.map((conn, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-ivory border border-sand/30 hover:border-black/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-beige border border-sand/50 flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4 text-black" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-medium text-black">
                            {conn.destination}
                          </div>
                          <div className="text-[10px] text-taupe">
                            {conn.note}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold text-black shrink-0">
                        <Clock className="w-3.5 h-3.5 text-taupe" />
                        <span>{conn.distance}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="pt-6 mt-6 border-t border-sand/30">
                <a
                  href={siteConfig.contact.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-black w-full py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
                <div className="text-center text-[10px] text-taupe mt-2 font-mono">
                  [Map Location Configurable in siteConfig.js]
                </div>
              </div>
            </div>

            {/* Embedded Google Map Iframe (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-sand/50 shadow-luxury relative min-h-[380px] flex flex-col bg-beige-light">
              <div className="relative w-full h-full flex-1 min-h-[350px]">
                <iframe
                  title="Palm Corridor Location Map"
                  src={siteConfig.contact.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full absolute inset-0 opacity-95"
                />

                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-sand shadow-luxury-sm pointer-events-none">
                  <div className="flex items-center gap-2 text-xs font-semibold text-black">
                    <MapPin className="w-4 h-4 text-black animate-bounce" />
                    <span>Palm Corridor Site Location</span>
                  </div>
                  <div className="text-[10px] text-taupe mt-0.5">
                    {siteConfig.contact.address.line1}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
