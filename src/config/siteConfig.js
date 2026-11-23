/**
 * LA INFRACON - Palm Corridor
 * Centralized Site Configuration
 * 
 * All content, contact numbers, stats, amenities, and placeholders
 * are maintained here for effortless client customization.
 */

export const siteConfig = {
  // Brand Identity
  brand: {
    name: "LA INFRACON",
    tagline: "Creating Living Dreams",
    logo: "/logo.png",
    logoBlack: "/logo-black.png",
    logoWhite: "/logo-white.png",
    logoJpeg: "/logo.jpeg",
    established: "2018",
  },

  // Project Information
  project: {
    name: "Palm Corridor",
    subtitle: "A new address for premium plotted living",
    heroHeadline: "Your Land. Your Legacy.",
    type: "Plotted Residential Colony",
    reraNumber: "RERA/PRM/KA/2024/0892 [EDITABLE]",
    shortDescription:
      "Palm Corridor is an exclusive gated plotted community engineered for luxury living, privacy, and exponential capital appreciation. Surrounded by verdant landscapes and modern infrastructure, it offers an address that honors your legacy.",
  },

  // Direct Contact & Lead Routing
  contact: {
    phoneDisplay: "+91 92037 07177",
    phoneRaw: "9203707177",
    phoneDial: "+919203707177",
    whatsappNumber: "919203707177",
    email: "info@lainfracon.com", // [PLACEHOLDER - Edit with official email]
    address: {
      line1: "Palm Corridor, Sector 42 Expressway Corridor", // [PLACEHOLDER - Edit with exact site address]
      line2: "Near Grand Western Highway",
      city: "NCR Region",
      pincode: "110001",
      fullAddress: "Palm Corridor, Sector 42 Expressway Corridor, Near Grand Western Highway [EDITABLE PLACEHOLDER]",
    },
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112061.09262729783!2d77.2089851!3d28.6324291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin", // [PLACEHOLDER - Replace with actual site Google Map embed]
    googleMapsDirectionsUrl: "https://maps.google.com/?q=New+Delhi", // [PLACEHOLDER - Replace with actual site location link]
    officeHours: "Monday – Sunday: 9:00 AM – 7:30 PM",
  },

  // Social Media Links (Editable Placeholders)
  socialLinks: {
    instagram: "https://instagram.com/lainfracon_official", // [PLACEHOLDER]
    facebook: "https://facebook.com/lainfracon", // [PLACEHOLDER]
    youtube: "https://youtube.com/@lainfracon", // [PLACEHOLDER]
    linkedin: "https://linkedin.com/company/lainfracon", // [PLACEHOLDER]
  },

  // Hero Sequence Config
  heroFrames: {
    desktopCount: 96,
    desktopPath: (index) => `/frames/frame_${String(index).padStart(4, "0")}.webp`,
    mobileCount: 48,
    mobilePath: (index) => `/frames-mobile/frame_${String(index).padStart(4, "0")}.webp`,
    preloadCriticalCount: 20,
    staticFallbackImage: "/images/aerial.jpg",
  },

  // Growth Section (High prominence: 3.64x in 4 Years)
  growth: {
    multiplier: 3.64,
    multiplierDisplay: "3.64x",
    timelineYears: "4 Years",
    badge: "Documented Market Appreciation",
    headline: "Exponential Land Value Growth",
    description:
      "Early investors in Palm Corridor's high-demand growth belt have witnessed their land value multiply by 3.64x in just 48 months, outperforming traditional equities and fixed deposits.",
    disclaimer: "*Based on historical market appreciation data from registered sub-registrar transactions in the immediate corridor.", // [EDITABLE]
    dataPoints: [
      { year: "Year 0", label: "Launch Phase", value: 1.0, formattedVal: "1.00x", rate: "Base Price" },
      { year: "Year 1", label: "Infra Expansion", value: 1.58, formattedVal: "1.58x", rate: "+58%" },
      { year: "Year 2", label: "Highway Linkage", value: 2.25, formattedVal: "2.25x", rate: "+125%" },
      { year: "Year 3", label: "Commercial Hub", value: 2.95, formattedVal: "2.95x", rate: "+195%" },
      { year: "Year 4", label: "Current Value", value: 3.64, formattedVal: "3.64x", rate: "+264%" },
    ],
    highlights: [
      { title: "364%", label: "Total ROI Achieved" },
      { title: "27.4%", label: "Compounded Annual Growth Rate (CAGR)" },
      { title: "100%", label: "Clear Freehold Titles" },
    ]
  },

  // About Brand Section
  about: {
    tagline: "The Visionary Behind The Landmark",
    heading: "Building Dreams, Creating Legacies",
    storyParagraphs: [
      "LA INFRACON was founded on an unwavering principle: real estate should be an empowering cornerstone of generational wealth. Guided by our mantra 'Creating Living Dreams', we bridge architectural vision with transparent stewardship to deliver planned communities that stand as benchmarks of quality.",
      "Palm Corridor represents our flagship plotted residential sanctuary. Here, tranquil open vistas coalesce with master-planned infrastructure — wide arterial boulevards, underground conduits, dedicated green lungs, and high-security access — designed for families seeking both serene living and peerless capital security.",
      "With 100% legal compliance, immediate registry options, and customer-first guidance, LA INFRACON is rewriting the standard for plotted developments across the region."
    ],
    pillars: [
      {
        icon: "ShieldCheck",
        title: "Clear Titles & Approvals",
        description: "100% freehold land with all statutory and local authority sanctions pre-cleared for hassle-free ownership.",
      },
      {
        icon: "Compass",
        title: "Prime Strategic Locations",
        description: "Positioned directly along burgeoning expressways and economic corridors guaranteeing enduring appreciation.",
      },
      {
        icon: "Scale",
        title: "Transparent Dealings",
        description: "Zero hidden charges, comprehensive digital documentation, and crystal-clear boundary demarcations.",
      },
      {
        icon: "ClockCheck",
        title: "On-Time Development",
        description: "Proactive milestones for road construction, electrification, drainage, and landscaped parks.",
      },
    ],
    image: "/images/palm-corridor.jpg",
  },

  // Project Figures & Key Highlights
  projectStats: [
    {
      value: 25,
      suffix: " Acres",
      label: "Total Gated Area",
      sublabel: "Master-planned plotted colony",
      icon: "MapPin",
      isPlaceholder: true, // [EDITABLE]
    },
    {
      value: 180,
      suffix: "+",
      label: "Prime Residential Plots",
      sublabel: "600, 800 & 1000 sq.ft configurations",
      icon: "Home",
      isPlaceholder: true, // [EDITABLE]
    },
    {
      value: 40,
      suffix: " ft",
      label: "Main Arterial Boulevard",
      sublabel: "With 30 ft internal feeder lanes",
      icon: "Compass",
      isPlaceholder: true, // [EDITABLE]
    },
    {
      value: 35,
      suffix: "%",
      label: "Lush Greenery & Open Parks",
      sublabel: "Palm-lined walkways & garden reserves",
      icon: "Trees",
      isPlaceholder: true, // [EDITABLE]
    },
  ],

  // Project Showcase Cards (Using provided assets)
  showcaseCards: [
    {
      id: "aerial",
      title: "Panoramic Master Layout",
      category: "Masterplan Overview",
      description: "An aerial vantage showcasing the symmetry, wide arterial roadways, and green buffers enveloping Palm Corridor.",
      image: "/images/aerial.jpg",
    },
    {
      id: "avenue",
      title: "Lush Palm Boulevard",
      category: "Signature Landscape",
      description: "Serene tree-lined avenues, manicured medians, and illuminated pathways designed for peaceful evening walks.",
      image: "/images/palm-corridor.jpg",
    },
    {
      id: "entrance",
      title: "Grand Architectural Gateway",
      category: "Arrival Experience",
      description: "A monumental entry gate with 24x7 biometric security checkpoints, visitor screening, and security cabin.",
      image: "/images/entrance-gate.jpg",
    },
  ],

  // Plot Size Availability
  plotSizes: [
    {
      id: "600",
      size: "600",
      unit: "sq.ft",
      dimensions: "20' × 30'",
      category: "Compact Luxury",
      status: "Available",
      popular: false,
      aspectRatio: "2/3",
      features: [
        "Optimal for 2-3 BHK Luxury Villa",
        "Direct road-facing orientation",
        "Individual water & power tap-off",
        "Immediate Registry & Mutation",
        "High rental yield potential",
      ],
      idealFor: "First-time homeowners & agile investors",
    },
    {
      id: "800",
      size: "800",
      unit: "sq.ft",
      dimensions: "20' × 40'",
      category: "Executive Residence",
      status: "Available",
      popular: true, // Highlighted card
      aspectRatio: "1/2",
      features: [
        "Perfect for 3-4 BHK Duplex Villa with Garden",
        "Dual-car private parking space",
        "East & North-facing vastu plot options",
        "Immediate Registry & Mutation",
        "Highest appreciation trajectory",
      ],
      idealFor: "Growing modern families seeking spacious independence",
    },
    {
      id: "1000",
      size: "1000",
      unit: "sq.ft",
      dimensions: "25' × 40'",
      category: "Estate Sovereign",
      status: "Available",
      popular: false,
      aspectRatio: "5/8",
      features: [
        "Grand 4-5 BHK Custom Mansion footprint",
        "Private terrace garden & courtyard capacity",
        "Corner & boulevard frontage options",
        "Immediate Registry & Mutation",
        "Prestigious luxury living statement",
      ],
      idealFor: "Bespoke architectural estates and generational legacy",
    },
  ],

  // Amenities
  amenities: [
    {
      id: "palm-avenues",
      title: "Palm-Lined Avenues",
      description: "Magnificent Royal Palm trees fringing all internal boulevards with pedestrian footpaths.",
      icon: "Trees",
    },
    {
      id: "wide-roads",
      title: "Wide Internal Roads",
      description: "40 ft wide main arterial road and 30 ft well-lit wide secondary roads engineered with paver shoulders.",
      icon: "Car",
    },
    {
      id: "landscaped-parks",
      title: "Landscaped Theme Parks",
      description: "Zen gardens, walking tracks, reflexology paths, and lush thematic lawns.",
      icon: "Flower2",
    },
    {
      id: "kids-play",
      title: "Children's Play Arena",
      description: "Safe, rubberized outdoor play zones with modern equipment and shaded pavilions.",
      icon: "Gamepad2",
    },
    {
      id: "street-lights",
      title: "LED Street Lighting",
      description: "Energy-efficient automatic solar and LED illumination for safe, bright nighttime ambience.",
      icon: "LampCeiling",
    },
    {
      id: "grand-gate",
      title: "Grand Entrance Gate",
      description: "Iconic architectural portico with controlled boom barriers and aesthetic stone masonry.",
      icon: "DoorClosed",
    },
    {
      id: "security",
      title: "24x7 Multi-Tier Security",
      description: "CCTV surveillance perimeter, professional guard patrols, and RFID visitor tracking.",
      icon: "ShieldAlert",
    },
    {
      id: "drainage",
      title: "Underground Drainage",
      description: "All-weather stormwater drains and dedicated sewage conduits preventing waterlogging.",
      icon: "Waves",
    },
    {
      id: "utilities",
      title: "Water & Power Feeder",
      description: "Direct civic water pipeline tie-in, overhead reservoir, and underground electrical cabling.",
      icon: "Zap",
    },
  ],

  // Connectivity & Location Distances (Placeholders editable)
  connectivity: [
    { destination: "Expressway / National Highway", distance: "3 mins", note: "Direct 6-lane access" },
    { destination: "Metro Station & Commuter Rail", distance: "12 mins", note: "Rapid transit hub" },
    { destination: "Top International Schools", distance: "8 mins", note: "Preschools to Grade 12" },
    { destination: "Super-Specialty Hospital", distance: "10 mins", note: "24/7 Emergency care" },
    { destination: "Shopping Mall & Hypermarket", distance: "7 mins", note: "Retail, dining & cinema" },
    { destination: "International Airport Link", distance: "35 mins", note: "Signal-free expressway drive" },
  ],

  // Gallery (Using provided images with curated luxury angles)
  gallery: [
    {
      id: "g1",
      title: "Master Colony Aerial Vista",
      category: "Masterplan",
      src: "/images/aerial.jpg",
      aspect: "wide",
    },
    {
      id: "g2",
      title: "Palm Avenue Boulevard",
      category: "Landscape",
      src: "/images/palm-corridor.jpg",
      aspect: "tall",
    },
    {
      id: "g3",
      title: "Grand Gateway Portico",
      category: "Architecture",
      src: "/images/entrance-gate.jpg",
      aspect: "square",
    },
    {
      id: "g4",
      title: "Panoramic Estate View",
      category: "Masterplan",
      src: "/images/aerial.jpg",
      aspect: "square",
    },
    {
      id: "g5",
      title: "Palm Walkways & Green Enclave",
      category: "Landscape",
      src: "/images/palm-corridor.jpg",
      aspect: "wide",
    },
    {
      id: "g6",
      title: "Security & Arrival Boulevard",
      category: "Architecture",
      src: "/images/entrance-gate.jpg",
      aspect: "tall",
    },
  ],

  // Site Visit Videos (Configurable video slots for client)
  siteVideos: [
    {
      id: "v1",
      title: "Palm Corridor - Aerial Drone Walkthrough",
      duration: "02:15",
      thumbnail: "/images/aerial.jpg",
      videoUrl: "", // [PLACEHOLDER - Paste YouTube/Vimeo embed or MP4 URL here]
      description: "Full panoramic drone flyover depicting roadway progress, plot boundaries, and surrounding connectivity.",
    },
    {
      id: "v2",
      title: "Ground Reality & Avenue Development",
      duration: "01:45",
      thumbnail: "/images/palm-corridor.jpg",
      videoUrl: "", // [PLACEHOLDER - Paste YouTube/Vimeo embed or MP4 URL here]
      description: "First-person walk through the palm-lined main boulevard, curbing, and park demarcations.",
    },
    {
      id: "v3",
      title: "Grand Entrance Gate & Security Cabin",
      duration: "01:10",
      thumbnail: "/images/entrance-gate.jpg",
      videoUrl: "", // [PLACEHOLDER - Paste YouTube/Vimeo embed or MP4 URL here]
      description: "Architectural detail of the monumental stone gateway and boom barrier installation.",
    },
  ],

  // Legal & Disclaimers
  legal: {
    disclaimer: "Disclaimer: All images, architectural renderings, layouts, and representations are artistic impressions and indicative for illustrative purposes only. Actual dimensions, landscaping, and finishes are subject to approvals and development phases. Please verify all details at the site sales office.",
    copyright: "© 2026 LA INFRACON. All rights reserved. | Palm Corridor Residential Colony",
  }
};
