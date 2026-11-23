import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
import {
  useSplitReveal,
  SplitText,
  useClipReveal,
  useStagger,
  SectionDivider,
  isReducedMotion,
} from '../../utils/animations.jsx';

gsap.registerPlugin(ScrollTrigger);

function ConnectivityItem({ item, index }) {
  const [distanceDisplay, setDistanceDisplay] = useState(0);
  const itemRef = useRef(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    if (isReducedMotion()) {
      setDistanceDisplay(item.distanceNum);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              const obj = { val: 0 };
              gsap.to(obj, {
                val: item.distanceNum,
                duration: 1.4,
                ease: 'power2.out',
                onUpdate: () => setDistanceDisplay(Math.round(obj.val)),
              });
            },
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [index, item.distanceNum]);

  return (
    <div
      ref={itemRef}
      className="flex items-center justify-between p-3.5 rounded-xl bg-ivory border border-sand/30 hover:border-black/30 transition-colors will-change-transform"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-beige border border-sand/50 flex items-center justify-center shrink-0">
          <MapPin className="w-4 h-4 text-black" />
        </div>
        <div>
          <div className="text-xs sm:text-sm font-medium text-black">
            {item.destination}
          </div>
          <div className="text-[10px] text-taupe">
            {item.note}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold text-black shrink-0">
        <Clock className="w-3.5 h-3.5 text-taupe" />
        <span>{distanceDisplay} {item.distanceUnit}</span>
      </div>
    </div>
  );
}

export default function AmenitiesLocationSection() {
  const amenitiesHeadingRef = useSplitReveal({ stagger: 0.06 });
  const locationHeadingRef = useSplitReveal({ stagger: 0.06 });
  const mapClipRef = useClipReveal({ duration: 1.2 });
  const amenitiesGridRef = useRef(null);

  // Staggered wave pattern for 9 amenity cards (diagonal delay: (row + col) * 0.08)
  useEffect(() => {
    const grid = amenitiesGridRef.current;
    if (!grid || isReducedMotion()) return;

    const cards = grid.querySelectorAll('.amenity-card');
    const cols = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const diagonalDelay = (row + col) * 0.09;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            once: true,
          },
        });

        tl.fromTo(
          card,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: diagonalDelay,
            ease: 'power3.out',
          }
        );

        // Icon bounce pop
        const icon = card.querySelector('.amenity-icon');
        if (icon) {
          tl.fromTo(
            icon,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.5,
              ease: 'back.out(2.2)',
            },
            `-=${0.5}`
          );
        }
      });
    }, grid);

    return () => ctx.revert();
  }, []);

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
      className="relative py-24 sm:py-32 bg-ivory text-black overflow-hidden border-t border-sand/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Amenities Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand/20 border border-sand text-taupe-dark text-xs uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Curated Community Features</span>
          </div>

          <h2
            ref={amenitiesHeadingRef}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black"
          >
            <SplitText>World-Class</SplitText>{' '}
            <span className="text-taupe-dark font-normal italic inline-block">
              <SplitText>Amenities</SplitText>
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-black/75 leading-relaxed font-light">
            Every facet of Palm Corridor is orchestrated to blend refined comfort, uninterrupted utilities, and verdant open-air tranquility.
          </p>
        </div>

        {/* 9 Amenities Grid with Diagonal Wave Delay */}
        <div ref={amenitiesGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-28">
          {siteConfig.amenities.map((item) => (
            <div
              key={item.id}
              className="amenity-card rounded-2xl p-6 bg-white border border-sand/45 shadow-luxury-sm hover:shadow-luxury transition-all duration-300 group flex flex-col justify-between will-change-transform"
            >
              <div>
                <div className="amenity-icon w-12 h-12 rounded-xl bg-beige-light border border-sand/60 flex items-center justify-center mb-4 will-change-transform">
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
                <span className="text-black font-semibold">&bull; Planned</span>
              </div>
            </div>
          ))}
        </div>

        {/* Location & Strategic Connectivity */}
        <div id="location" className="pt-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand/20 border border-sand text-taupe-dark text-xs uppercase tracking-[0.2em] mb-4">
              <Navigation className="w-3.5 h-3.5 text-black" />
              <span>Unmatched Accessibility</span>
            </div>

            <h2
              ref={locationHeadingRef}
              className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-black"
            >
              <SplitText>Location &</SplitText>{' '}
              <span className="text-taupe-dark font-normal italic inline-block">
                <SplitText>Connectivity</SplitText>
              </span>
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

                <div className="space-y-3">
                  {siteConfig.connectivity.map((conn, idx) => (
                    <ConnectivityItem
                      key={idx}
                      item={conn}
                      index={idx}
                    />
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

            {/* Embedded Google Map Iframe with Clip Wipe Reveal (7 cols) */}
            <div
              ref={mapClipRef}
              className="lg:col-span-7 rounded-3xl overflow-hidden border border-sand/50 shadow-luxury relative min-h-[380px] flex flex-col bg-beige-light will-change-transform"
            >
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

      <SectionDivider className="mt-24 max-w-7xl mx-auto px-4" />
    </section>
  );
}
