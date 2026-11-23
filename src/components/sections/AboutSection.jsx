import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Compass, Scale, Clock, Award, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const getPillarIcon = (index) => {
    const props = { className: 'w-5 h-5 text-black' };
    switch (index) {
      case 0:
        return <ShieldCheck {...props} />;
      case 1:
        return <Compass {...props} />;
      case 2:
        return <Scale {...props} />;
      case 3:
      default:
        return <Clock {...props} />;
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-ivory text-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand Story */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand/20 border border-sand text-taupe-dark text-xs uppercase tracking-[0.2em] mb-4 w-fit"
            >
              <Award className="w-3.5 h-3.5 text-black" />
              <span>{siteConfig.about.tagline}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-6"
            >
              Building Dreams, <span className="text-taupe-dark font-normal italic">Creating Legacies</span>
            </motion.h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-black/80 text-sm sm:text-base leading-relaxed font-light mb-8">
              {siteConfig.about.storyParagraphs.map((para, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-sand/40">
              {siteConfig.about.pillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + idx * 0.1 }}
                  className="p-5 rounded-2xl bg-white border border-sand/50 shadow-luxury-sm hover:shadow-luxury transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-beige-light border border-sand/60">
                      {getPillarIcon(idx)}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-black tracking-wide">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-taupe leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Framed Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-md"
            >
              {/* Outer decorative borders */}
              <div className="absolute -inset-3 rounded-t-[140px] rounded-b-3xl border border-sand/40 -z-10" />
              <div className="absolute -inset-6 rounded-t-[160px] rounded-b-3xl border border-sand/20 -z-20" />

              {/* Arch Card Container */}
              <div className="relative rounded-t-[130px] rounded-b-2xl overflow-hidden border border-sand/70 shadow-luxury aspect-[3/4] bg-beige">
                <img
                  src={siteConfig.about.image}
                  alt="Palm Corridor Avenue"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle gradient at bottom for badge contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-sand shadow-luxury-sm text-black">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-beige border border-sand flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-black font-semibold">
                        Gated & Master-Planned
                      </div>
                      <div className="text-[11px] text-taupe font-light">
                        Palm Corridor Plotted Sanctuary
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Flairs */}
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t border-r border-black" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b border-l border-black" />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
