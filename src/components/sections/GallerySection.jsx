import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Film,
  Sparkles,
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { useSplitReveal, SplitText, SectionDivider, isReducedMotion } from '../../utils/animations.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState('photos');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const headingRef = useSplitReveal({ stagger: 0.06 });
  const galleryGridRef = useRef(null);

  // Staggered clip-path reveal for gallery photos
  useEffect(() => {
    if (activeTab !== 'photos') return;
    const grid = galleryGridRef.current;
    if (!grid || isReducedMotion()) return;

    const cards = grid.querySelectorAll('.gallery-card');
    const ctx = gsap.context(() => {
      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 0.95,
            delay: idx * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 82%',
              once: true,
            },
          }
        );
      });
    }, grid);

    return () => ctx.revert();
  }, [activeTab]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') setLightboxIndex(null);
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'ArrowLeft') prevPhoto();
      }
      if (selectedVideo !== null && e.key === 'Escape') {
        setSelectedVideo(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, selectedVideo]);

  useEffect(() => {
    if (lightboxIndex !== null || selectedVideo !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, selectedVideo]);

  const nextPhoto = () => {
    setLightboxIndex((prev) => (prev + 1) % siteConfig.gallery.length);
  };

  const prevPhoto = () => {
    setLightboxIndex((prev) => (prev - 1 + siteConfig.gallery.length) % siteConfig.gallery.length);
  };

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32 bg-white text-black overflow-hidden border-t border-sand/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with SplitText */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-beige border border-sand text-taupe-dark text-xs uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Visual Showcase</span>
          </div>

          <h2
            ref={headingRef}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black"
          >
            <SplitText>Gallery &</SplitText>{' '}
            <span className="text-taupe-dark font-normal italic inline-block">
              <SplitText>Site Reality</SplitText>
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-black/70 leading-relaxed font-light">
            Immerse yourself in editorial photography and on-ground walkthrough videos capturing the progress and grandeur of Palm Corridor.
          </p>

          {/* Filter Tabs */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-ivory border border-sand mt-8 shadow-sm">
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'photos'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Project Photos ({siteConfig.gallery.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'videos'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-black/60 hover:text-black'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Site Visit Videos ({siteConfig.siteVideos.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Photos Grid: Horizontal carousel on mobile, 3-column grid on desktop */}
        {activeTab === 'photos' && (
          <div>
            {/* Mobile Swipe Cue */}
            <div className="sm:hidden flex items-center justify-end gap-1.5 text-[11px] font-mono text-taupe mb-3">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-sand/30 border border-sand/50">
                ← Swipe photos →
              </span>
            </div>

            <div
              ref={galleryGridRef}
              className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              {siteConfig.gallery.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(index)}
                  className="gallery-card w-[82vw] max-w-[320px] sm:max-w-none sm:w-auto shrink-0 snap-center group relative rounded-2xl overflow-hidden bg-ivory border border-sand/40 shadow-luxury-sm hover:shadow-luxury aspect-[4/3] cursor-pointer will-change-transform"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="editorial-img w-full h-full object-cover"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white">
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-1 rounded text-[10px] uppercase font-mono tracking-wider bg-white text-black font-bold">
                        {item.category}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-black/60 border border-white/40 flex items-center justify-center text-white">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-sand-light mt-1 font-light">
                        Click to expand fullscreen
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Site Visit Videos: Horizontal carousel on mobile, 3-column grid on desktop */}
        {activeTab === 'videos' && (
          <div>
            {/* Mobile Swipe Cue */}
            <div className="md:hidden flex items-center justify-end gap-1.5 text-[11px] font-mono text-taupe mb-3">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-sand/30 border border-sand/50">
                ← Swipe site videos →
              </span>
            </div>

            <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 md:gap-8 pb-4 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
              {siteConfig.siteVideos.map((video) => (
                <div
                  key={video.id}
                  className="w-[85vw] max-w-[340px] md:max-w-none md:w-auto shrink-0 snap-center rounded-2xl overflow-hidden bg-ivory border border-sand/50 shadow-luxury-sm hover:shadow-luxury flex flex-col group transition-all"
                >
                {/* Video Poster with Custom Pulsing Play Button */}
                <div
                  onClick={() => setSelectedVideo(video)}
                  className="relative aspect-video overflow-hidden cursor-pointer bg-beige"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="editorial-img w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                  {/* Pulsing Ring Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/30 animate-ping absolute" />
                      <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-luxury transform group-hover:scale-110 transition-transform relative z-10">
                        <Play className="w-6 h-6 fill-black ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[11px] border border-white/20">
                    {video.duration}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-black group-hover:text-taupe-dark transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-black/70 mt-2 font-light leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-sand/30 flex items-center justify-between text-[11px]">
                    <span className="font-mono text-taupe">[Config Editable Slot]</span>
                    <button
                      onClick={() => setSelectedVideo(video)}
                      className="text-black hover:text-taupe-dark font-medium flex items-center gap-1"
                    >
                      <span>Watch Reel</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      </div>

      {/* Fullscreen Photo Lightbox Modal (Black background) */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black text-white flex flex-col justify-between p-4 sm:p-8"
          >
            <div className="flex items-center justify-between w-full max-w-6xl mx-auto z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-white px-2.5 py-1 rounded bg-charcoal border border-sand/30">
                  {lightboxIndex + 1} / {siteConfig.gallery.length}
                </span>
                <span className="text-xs uppercase tracking-wider text-sand hidden sm:inline">
                  {siteConfig.gallery[lightboxIndex].title}
                </span>
              </div>

              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 rounded-full bg-charcoal border border-sand/30 text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 flex items-center justify-center max-w-5xl mx-auto w-full my-4">
              <button
                onClick={prevPhoto}
                className="absolute left-2 sm:-left-12 z-20 p-3 rounded-full bg-charcoal/80 border border-sand/30 text-white hover:bg-white hover:text-black transition-all"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                src={siteConfig.gallery[lightboxIndex].src}
                alt={siteConfig.gallery[lightboxIndex].title}
                className="max-h-[75vh] max-w-full object-contain rounded-xl border border-sand/20 shadow-2xl"
              />

              <button
                onClick={nextPhoto}
                className="absolute right-2 sm:-right-12 z-20 p-3 rounded-full bg-charcoal/80 border border-sand/30 text-white hover:bg-white hover:text-black transition-all"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="text-center text-xs text-sand/70 font-light">
              Use Left/Right arrow keys or click buttons to navigate &bull; Press ESC to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player Modal (Only loads video on click) */}
      <AnimatePresence>
        {selectedVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <div className="relative w-full max-w-3xl bg-charcoal text-white rounded-2xl overflow-hidden border border-sand/30 shadow-2xl">
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-sand/20">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-sand" />
                  <span className="font-serif text-lg font-bold text-white">
                    {selectedVideo.title}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video bg-black relative flex flex-col items-center justify-center p-6 text-center">
                {selectedVideo.videoUrl ? (
                  <iframe
                    src={selectedVideo.videoUrl}
                    title={selectedVideo.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex flex-col items-center max-w-md">
                    <div className="w-16 h-16 rounded-full bg-white/10 border border-sand/40 flex items-center justify-center mb-4 text-white">
                      <Play className="w-8 h-8 fill-white ml-1" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-white mb-2">
                      Site Visit Video Slot Ready
                    </h3>
                    <p className="text-xs text-sand/80 leading-relaxed mb-4">
                      This video slot is configurable in <code className="text-white bg-charcoal px-1.5 py-0.5 rounded">src/config/siteConfig.js</code> under <code className="text-white bg-charcoal px-1.5 py-0.5 rounded">siteVideos</code>. Simply paste your YouTube, Vimeo, or MP4 URL.
                    </p>
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                        `Hello LA INFRACON, please send me the latest on-site video walkthrough for Palm Corridor.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-white px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold"
                    >
                      Request Video on WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SectionDivider className="mt-24 max-w-7xl mx-auto px-4" />
    </section>
  );
}
