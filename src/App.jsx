import React, { useState, useEffect } from 'react';
import { initSmoothScroll, scrollToTarget } from './utils/scrollManager';
import Preloader from './components/common/Preloader';
import ProgressBar from './components/common/ProgressBar';
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

export default function App() {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [selectedPlotSize, setSelectedPlotSize] = useState('800');

  useEffect(() => {
    const lenis = initSmoothScroll();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  const handlePlotSelection = (size) => {
    setSelectedPlotSize(size);
  };

  const handleOpenEnquiry = () => {
    scrollToTarget('#contact', -80);
  };

  return (
    <div className="relative min-h-screen bg-ivory text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      {/* Subtle Editorial Film Grain Noise Overlay */}
      <div className="film-grain" />

      {/* Top Black Minimal Scroll Progress Bar */}
      <ProgressBar />

      {/* Ivory / Black Preloader */}
      <Preloader onLoaded={() => setIsPreloaded(true)} />

      {/* Frosted Glass Navigation Header */}
      <Header onOpenEnquiry={handleOpenEnquiry} />

      {/* Main Sections */}
      <main id="main-content">
        {/* C) Hero Section with pinned Canvas Scrub */}
        <HeroSection onOpenEnquiry={handleOpenEnquiry} />

        {/* D) Growth Section: Black background */}
        <GrowthSection />

        {/* E) About LA INFRACON: Ivory background */}
        <AboutSection />

        {/* F) Project (Palm Corridor): White background */}
        <ProjectSection />

        {/* G) Plot Size Availability: Beige background with white tilt cards */}
        <PlotAvailabilitySection onSelectPlot={handlePlotSelection} />

        {/* H) Amenities & Strategic Location: Ivory background */}
        <AmenitiesLocationSection />

        {/* I) Gallery & Site Reality Videos: White background with grayscale-to-color */}
        <GallerySection />

        {/* J) VIP Enquiry & Lead Capture: Black background */}
        <EnquirySection selectedPlotSize={selectedPlotSize} />
      </main>

      {/* K) Footer: Charcoal background */}
      <Footer />

      {/* L) Global Floating CTAs & Back to Top */}
      <FloatingActions />
    </div>
  );
}
