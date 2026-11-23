import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export default function EnquirySection({ selectedPlotSize }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    plotSize: '800 sq.ft',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (selectedPlotSize) {
      setFormData((prev) => ({
        ...prev,
        plotSize: `${selectedPlotSize} sq.ft`,
      }));
    }
  }, [selectedPlotSize]);

  const validatePhone = (phone) => {
    const clean = phone.replace(/[\s\-\+\(\)]/g, '');
    const indianRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    return indianRegex.test(clean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your 10-digit phone number.';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const waText = `Hello LA INFRACON, I am ${formData.name.trim()}. I am interested in a ${formData.plotSize} plot at Palm Corridor. My phone number is ${formData.phone.trim()}.${formData.message.trim() ? ` Message: ${formData.message.trim()}` : ''}`;
    const waUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(waText)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 700);
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 bg-black text-white overflow-hidden border-t border-sand/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-sand/30 text-sand-light text-xs uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-sand" />
            <span>VIP Site Visit & Consultation</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            Book Your <span className="text-sand-light font-normal italic">Site Visit</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-sand/80 leading-relaxed font-light">
            Schedule an accompanied walkthrough of Palm Corridor. Our senior land advisors will guide you through plot demarcation, registry procedures, and current investment projections.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Contact Details (5 cols) */}
          <div className="lg:col-span-5 card-luxury-dark rounded-3xl p-6 sm:p-8 border border-sand/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 flex items-center justify-center">
                  <img src={siteConfig.brand.logoWhite} alt="LA INFRACON" className="h-full w-auto object-contain" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {siteConfig.brand.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-sand">
                    {siteConfig.brand.tagline}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-sand/80 font-light leading-relaxed mb-8">
                Connect directly with our project advisory desk. We ensure prompt transparent support for all site inspections and registry queries.
              </p>

              {/* Contact List */}
              <div className="space-y-3.5 mb-8">
                {/* Phone */}
                <a
                  href={`tel:${siteConfig.contact.phoneDial}`}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-sand/20 hover:border-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-charcoal border border-sand/30 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-sand">Direct Phone</div>
                    <div className="text-sm font-mono font-semibold text-white transition-colors">
                      {siteConfig.contact.phoneDisplay}
                    </div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                    'Hello LA INFRACON, I am interested in Palm Corridor plots.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-sand/20 hover:border-emerald-500/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-sand">WhatsApp Concierge</div>
                    <div className="text-sm font-mono font-semibold text-white transition-colors">
                      +{siteConfig.contact.whatsappNumber}
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-white/5 border border-sand/20 hover:border-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-charcoal border border-sand/30 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-sand">Official Email</div>
                    <div className="text-sm font-mono text-white transition-colors">
                      {siteConfig.contact.email}
                    </div>
                  </div>
                </a>

                {/* Site Address */}
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 border border-sand/20">
                  <div className="w-10 h-10 rounded-lg bg-charcoal border border-sand/30 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-sand">Site Office Address</div>
                    <div className="text-xs text-sand-light font-light leading-snug">
                      {siteConfig.contact.address.fullAddress}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions & Social Icons */}
            <div className="pt-6 border-t border-sand/15">
              <div className="grid grid-cols-2 gap-3 mb-6">
                <a
                  href={`tel:${siteConfig.contact.phoneDial}`}
                  className="btn-white py-2.5 rounded-xl text-center text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                    'Hello LA INFRACON, I would like to schedule a site visit to Palm Corridor.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 text-white hover:bg-emerald-700 py-2.5 rounded-xl text-center text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Social Channels */}
              <div className="flex items-center justify-between text-xs text-sand">
                <span className="uppercase tracking-widest text-[10px]">Follow Brand:</span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={siteConfig.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-charcoal hover:bg-white hover:text-black border border-sand/30 transition-colors text-white"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={siteConfig.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-charcoal hover:bg-white hover:text-black border border-sand/30 transition-colors text-white"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={siteConfig.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-charcoal hover:bg-white hover:text-black border border-sand/30 transition-colors text-white"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href={siteConfig.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-charcoal hover:bg-white hover:text-black border border-sand/30 transition-colors text-white"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: White/Ivory Glass Card Form (7 cols) */}
          <div className="lg:col-span-7 bg-ivory text-black rounded-3xl p-6 sm:p-10 border border-sand shadow-luxury relative flex flex-col justify-center">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center max-w-md mx-auto"
              >
                <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center mb-6 shadow-luxury-sm">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-black mb-2">
                  Enquiry Dispatched!
                </h3>
                <p className="text-sm text-black/80 mb-6 font-light leading-relaxed">
                  Thank you, <strong className="text-black font-semibold">{formData.name}</strong>. Your preferred inquiry for <strong className="text-black font-semibold">{formData.plotSize}</strong> has been routed to our WhatsApp desk (+{siteConfig.contact.whatsappNumber}). Our relationship officer will reach out shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', phone: '', plotSize: '800 sq.ft', message: '' });
                  }}
                  className="btn-black-outline px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold"
                >
                  Submit Another Enquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-taupe font-mono">
                    Priority Booking
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-black mt-1">
                    Reserve Your Plot Inspection
                  </h3>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-black/80 font-medium mb-1.5">
                    Full Name <span className="text-black">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikram Sharma"
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-black placeholder-taupe/50 focus:outline-none focus:ring-1 focus:ring-black transition-colors ${
                      errors.name ? 'border-rose-500' : 'border-sand focus:border-black'
                    }`}
                  />
                  {errors.name && (
                    <p className="flex items-center gap-1 text-[11px] text-rose-600 mt-1 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-black/80 font-medium mb-1.5">
                    10-Digit Mobile Number <span className="text-black">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm text-taupe">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="92037 07177"
                      maxLength={14}
                      className={`w-full pl-14 pr-4 py-3 rounded-xl bg-white border text-sm text-black font-mono placeholder-taupe/50 focus:outline-none focus:ring-1 focus:ring-black transition-colors ${
                        errors.phone ? 'border-rose-500' : 'border-sand focus:border-black'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="flex items-center gap-1 text-[11px] text-rose-600 mt-1 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Preferred Plot Size Radio Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-black/80 font-medium mb-1.5">
                    Preferred Plot Size Configuration
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {['600 sq.ft', '800 sq.ft', '1000 sq.ft'].map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => setFormData({ ...formData, plotSize: size })}
                        className={`py-3 px-2 rounded-xl text-center border text-xs font-semibold uppercase tracking-wider transition-all ${
                          formData.plotSize === size
                            ? 'bg-black text-white border-black shadow-sm'
                            : 'bg-white border-sand text-black/70 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-black/80 font-medium mb-1.5">
                    Questions or Specific Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Interested in road-facing plot with immediate registry details..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-sand text-sm text-black placeholder-taupe/50 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
                  />
                </div>

                {/* Solid Black Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-black w-full py-4 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-luxury-sm disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Book VIP Site Visit on WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-taupe pt-1">
                  Locks in priority rate &bull; Opens WhatsApp pre-filled chat with our official team
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
