import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Home, Compass, Trees, Sparkles, ChevronRight, MoveRight } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export default function ProjectSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [counts, setCounts] = useState(siteConfig.projectStats.map(() => 0));

  useEffect(() => {
    if (!isInView) return;

    const duration = 1800;
    const startTime = performance.now();

    const animateStats = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts(
        siteConfig.projectStats.map((stat) => Math.round(stat.value * ease))
      );

      if (progress < 1) {
        requestAnimationFrame(animateStats);
      } else {
        setCounts(siteConfig.projectStats.map((stat) => stat.value));
      }
    };

    requestAnimationFrame(animateStats);
  }, [isInView]);

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
      className="relative py-20 sm:py-32 bg-white text-black overflow-hidden border-t border-sand/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-beige border border-sand text-taupe-dark text-xs uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Masterplan & Vision</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black">
            {siteConfig.project.name}
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-black/75 leading-relaxed font-light">
            {siteConfig.project.shortDescription}
          </p>
        </div>

        {/* Animated Figures Strip (Beige/Ivory cards with soft luxury shadow) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 mb-16 sm:mb-20">
          {siteConfig.projectStats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="p-4 sm:p-6 rounded-2xl bg-ivory border border-sand/40 text-center shadow-luxury-sm hover:shadow-luxury transition-all duration-300 relative group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-beige border border-sand/60 mx-auto flex items-center justify-center mb-2.5 sm:mb-3 group-hover:scale-105 transition-transform">
                {getStatIcon(idx)}
              </div>

              <div className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-black">
                {counts[idx]}
                <span className="text-lg sm:text-2xl font-sans text-taupe ml-0.5">
                  {stat.suffix}
                </span>
              </div>

              <div className="text-xs sm:text-sm font-semibold text-black tracking-wide mt-1.5 sm:mt-2">
                {stat.label}
              </div>

              <div className="text-[10px] sm:text-[11px] text-taupe mt-0.5 sm:mt-1 font-light leading-snug">
                {stat.sublabel}
              </div>

              {stat.isPlaceholder && (
                <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-sand-dark font-mono mt-1.5 sm:mt-2">
                  [Config Editable]
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Architectural Showcase Gallery Strip */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-taupe font-mono">
                Project Visuals
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-black mt-1">
                Visualizing <span className="text-taupe-dark font-normal italic">The Sanctuary</span>
              </h3>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-3 mt-2 sm:mt-0">
              <p className="text-xs sm:text-sm text-black/60 max-w-sm font-light hidden sm:block">
                Explore the master-planned symmetry, palm-shaded avenues, and royal entrance gates.
              </p>
              {/* Mobile Swipe Cue */}
              <div className="flex items-center gap-1.5 text-[11px] text-taupe font-mono uppercase tracking-wider sm:hidden bg-beige/60 px-2.5 py-1 rounded-full border border-sand/40">
                <span>Swipe cards</span>
                <MoveRight className="w-3.5 h-3.5 text-black animate-pulse" />
              </div>
            </div>
          </div>

          {/* Horizontal scroll container on mobile, 3-column grid on md+ */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-5 pt-1 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
          >
            {siteConfig.showcaseCards.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * idx }}
                className="w-[82vw] max-w-[320px] sm:w-[360px] md:w-auto md:max-w-none shrink-0 snap-center md:shrink group rounded-2xl overflow-hidden bg-ivory border border-sand/50 shadow-luxury-sm hover:shadow-luxury transition-all duration-300 flex flex-col"
              >
                {/* Visual Image with Zoom */}
                <div className="relative aspect-[4/3] overflow-hidden bg-beige">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4">
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] uppercase tracking-wider font-mono bg-white/90 text-black border border-sand/50 backdrop-blur-md font-semibold">
                      {card.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-black group-hover:text-taupe-dark transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-xs text-black/70 leading-relaxed font-light mt-1.5 sm:mt-2">
                      {card.description}
                    </p>
                  </div>
                  
                  <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-sand/30 flex items-center justify-between text-xs text-taupe">
                    <span className="font-mono text-[11px]">Palm Corridor Sector</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-black" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Dot Indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-2 md:hidden">
            {siteConfig.showcaseCards.map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-sand/60"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
