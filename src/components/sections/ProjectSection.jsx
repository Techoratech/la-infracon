import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Home, Compass, Trees, Sparkles, ChevronRight } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { useSplitReveal, SplitText, SectionDivider, isReducedMotion } from '../../utils/animations.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectSection() {
  const sectionRef = useRef(null);
  const headingRef = useSplitReveal({ stagger: 0.07 });
  const showcasePinRef = useRef(null);
  const trackRef = useRef(null);

  const [counts, setCounts] = useState(siteConfig.projectStats.map(() => 0));
  const [statsInView, setStatsInView] = useState(false);

  // Stats Count-up triggered on enter
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Mobile: Show static numbers immediately without scroll lag
    if (window.innerWidth < 768) {
      setCounts(siteConfig.projectStats.map((stat) => stat.value));
      setStatsInView(true);
      return;
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        setStatsInView(true);
        const duration = 1800;
        const startTime = performance.now();

        const animate = (time) => {
          const elapsed = time - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);

          setCounts(
            siteConfig.projectStats.map((stat) => Math.round(stat.value * ease))
          );

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCounts(siteConfig.projectStats.map((stat) => stat.value));
          }
        };

        requestAnimationFrame(animate);
      },
    });

    return () => st.kill();
  }, []);

  // Desktop Horizontal Pinned Scroll Showcase
  useEffect(() => {
    const pinContainer = showcasePinRef.current;
    const track = trackRef.current;
    if (!pinContainer || !track || isReducedMotion()) return;

    const mm = gsap.matchMedia();

    // Desktop: pin and slide horizontally
    mm.add('(min-width: 768px)', () => {
      const getScrollAmount = () => {
        return track.scrollWidth - pinContainer.offsetWidth + 80;
      };

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinContainer,
          pin: true,
          scrub: 0.8,
          start: 'top 10%',
          end: () => `+=${getScrollAmount() + 400}`,
          invalidateOnRefresh: true,
        },
      });

      // Individual image scale/parallax inside track
      const slides = track.querySelectorAll('.showcase-slide');
      slides.forEach((slide) => {
        const img = slide.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.12 },
            {
              scale: 1.0,
              ease: 'none',
              scrollTrigger: {
                trigger: slide,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        }
      });
    });

    // Mobile: vertical stack fade-up
    mm.add('(max-width: 767px)', () => {
      const slides = track.querySelectorAll('.showcase-slide');
      slides.forEach((slide, idx) => {
        gsap.fromTo(
          slide,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: idx * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: slide,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  const getStatIcon = (index) => {
    const props = { className: 'w-5 h-5 text-black' };
    switch (index) {
      case 0:
        return <MapPin {...props} />;
      case 1:
        return <Home {...props} />;
      case 2:
        return <Compass {...props} />;
      case 3:
      default:
        return <Trees {...props} />;
    }
  };

  return (
    <section
      id="project"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-white text-black overflow-hidden border-t border-sand/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-beige border border-sand text-taupe-dark text-xs uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Masterplan & Vision</span>
          </div>

          <h2
            ref={headingRef}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black"
          >
            <SplitText>{siteConfig.project.name}</SplitText>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-black/75 leading-relaxed font-light">
            {siteConfig.project.shortDescription}
          </p>
        </div>

        {/* Figures Strip with Lines Drawing Between Them */}
        <div className="relative mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {siteConfig.projectStats.map((stat, idx) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-ivory border border-sand/40 text-center shadow-luxury-sm hover:shadow-luxury transition-all duration-300 relative group"
              >
                <div className="w-10 h-10 rounded-xl bg-beige border border-sand/60 mx-auto flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  {getStatIcon(idx)}
                </div>

                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-black font-mono">
                  {counts[idx]}
                  <span className="text-2xl sm:text-3xl font-sans text-taupe ml-0.5">
                    {stat.suffix}
                  </span>
                </div>

                <div className="text-xs sm:text-sm font-semibold text-black tracking-wide mt-2">
                  {stat.label}
                </div>

                <div className="text-[11px] text-taupe mt-1 font-light">
                  {stat.sublabel}
                </div>

                {stat.isPlaceholder && (
                  <div className="text-[9px] uppercase tracking-wider text-sand-dark font-mono mt-2">
                    [Config Editable]
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Thin Drawing Line across stats strip */}
          <div
            className={`hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-sand/40 -z-0 transition-transform duration-1000 ${
              statsInView ? 'scale-x-100' : 'scale-x-0'
            }`}
            style={{ transformOrigin: 'left center' }}
          />
        </div>

      </div>

      {/* Horizontal Scroll Showcase (Pinned on Desktop, Vertical Stack on Mobile) */}
      <div ref={showcasePinRef} className="w-full relative mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-taupe font-mono">
                Project Visuals
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-black mt-1">
                Visualizing <span className="text-taupe-dark font-normal italic">The Sanctuary</span>
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-black/60 max-w-sm mt-2 sm:mt-0 font-light">
              Scroll to explore the master-planned symmetry, palm-shaded avenues, and royal entrance gates.
            </p>
          </div>
        </div>

        {/* Sliding Track: Horizontal scroll carousel on mobile, pinned scroll on desktop */}
        <div className="overflow-visible px-4 sm:px-6 lg:px-8">
          {/* Mobile Swipe Cue */}
          <div className="md:hidden flex items-center justify-end gap-1.5 text-[11px] font-mono text-taupe mb-2.5">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-sand/20 border border-sand/40">
              ← Swipe to view plots →
            </span>
          </div>

          <div
            ref={trackRef}
            className="flex flex-row overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory md:snap-none gap-5 md:gap-8 pb-4 md:pb-0 will-change-transform"
          >
            {siteConfig.showcaseCards.map((card) => (
              <div
                key={card.id}
                className="showcase-slide w-[85vw] max-w-[340px] md:max-w-none md:w-[480px] lg:w-[560px] shrink-0 snap-center rounded-3xl overflow-hidden bg-ivory border border-sand/50 shadow-luxury flex flex-col group will-change-transform"
              >
                {/* Visual Image with Parallax & Scale */}
                <div className="relative aspect-[16/10] overflow-hidden bg-beige">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-mono bg-white/95 text-black border border-sand/50 backdrop-blur-md font-semibold">
                      {card.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-black group-hover:text-taupe-dark transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-black/75 leading-relaxed font-light mt-2">
                      {card.description}
                    </p>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-sand/30 flex items-center justify-between text-xs text-taupe font-mono">
                    <span>Palm Corridor Sector</span>
                    <span className="flex items-center gap-1 text-black font-sans font-medium group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <ChevronRight className="w-4 h-4 text-black" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionDivider className="mt-24 max-w-7xl mx-auto px-4" />
    </section>
  );
}
