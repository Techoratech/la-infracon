import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll, destroySmoothScroll, scrollToTarget } from './utils/scrollManager';
import Preloader from './components/common/Preloader';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import FloatingActions from './components/common/FloatingActions';

import HeroSection from './components/sections/HeroSection';
import GrowthSection from './components/sections/GrowthSection';
import AboutSection from './components/sections/AboutSection';
import ProjectSection from './components/sections/ProjectSection';
import PlotAvailabilitySection from './components/sections/PlotAvailabilitySection';
import AmenitiesLocationSection from './components/sections/AmenitiesLocationSection';
import GallerySection from './components/sections/GallerySection';
import EnquirySection from './components/sections/EnquirySection';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedPlotSize, setSelectedPlotSize] = useState('800');
  const mainRef = useRef(null);

  useEffect(() => {
    // 1. Unified Lenis + GSAP RAF loop
    const lenis = initSmoothScroll();

    // 2. Refresh ScrollTriggers once window and images load
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      destroySmoothScroll();
    };
  }, []);

  const handlePlotSelection = (size) => {
    setSelectedPlotSize(size);
  };

  const handleOpenEnquiry = () => {
    scrollToTarget('#contact', -96);
  };

  return (
    <div
      ref={mainRef}
      className="relative min-h-screen bg-ivory text-black font-sans selection:bg-black selection:text-white overflow-x-hidden"
    >
      {/* Subtle Editorial Film Grain Noise Overlay */}
      <div className="film-grain" />

      {/* Ivory / Black Preloader with frame loading progress */}
      <Preloader />

      {/* Floating Pill Frosted Glass Navigation Header (Always Visible) */}
      <Header />

      {/* Main Sections */}
      <main id="main-content">
        {/* C) Hero Section with pinned Canvas Scrub & scale */}
        <HeroSection onOpenEnquiry={handleOpenEnquiry} />

        {/* D) 3.64x Growth Section: Pinned 200vh scrubbed line & counter */}
        <GrowthSection />

        {/* E) About LA INFRACON: Split reveal, line draw, parallax image */}
        <AboutSection />

        {/* F) Project (Palm Corridor): Stats count-up, horizontal slide showcase */}
        <ProjectSection />

        {/* G) Plot Size Availability: Staggered rising tilt cards & SVG line draws */}
        <PlotAvailabilitySection onSelectPlot={handlePlotSelection} />

        {/* H) Amenities & Location: Wave pattern stagger, clip wipe map, distance counters */}
        <AmenitiesLocationSection />

        {/* I) Gallery & Site Reality Videos: Clip-path masonry, pulsing play button */}
        <GallerySection />

        {/* J) VIP Enquiry: Split text, sliding columns, animated checkmark */}
        <EnquirySection selectedPlotSize={selectedPlotSize} />
      </main>

      {/* K) Footer: Upward parallax wordmark, verified links & phone */}
      <Footer />

      {/* L) Floating CTAs & Back to Top with circular progress ring */}
      <FloatingActions />
    </div>
  );
}
