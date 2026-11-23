# LA INFRACON — Palm Corridor (Editorial Luxury Real Estate Portal)

A cinematic, award-level, scroll-animated, fully responsive web application built for **LA INFRACON** and its flagship plotted residential colony **Palm Corridor** ("Creating Living Dreams").

---

## 🎨 Editorial Design System (White, Beige & Black Theme)

The website features an editorial, high-fashion, minimalist luxury aesthetic tailored to the Palm Corridor brand identity.

### Color Tokens
- **`--white` (`#FFFFFF`)**: Pure white surfaces, architectural cards, inverted hover states.
- **`--ivory` (`#FAF7F2`)**: Primary warm light background (Preloader, About, Amenities, Form card).
- **`--beige` (`#E8DFD0`)**: Secondary warm background (Plot Availability section, showcase cards).
- **`--sand` (`#CDBFA8`)**: Thin 1px dividers, architectural borders, subtle guidelines, and chart accents.
- **`--taupe` (`#8C7B66`)**: Muted secondary copy, labels, metadata, and drive-time notes.
- **`--black` (`#0B0B0B`)**: Deep contrast emphasis sections (Growth, VIP Enquiry), primary buttons, typography.
- **`--charcoal` (`#1A1A1A`)**: Footer background and dark card panels.

### Alternating Section Rhythm
1. **Preloader**: Ivory background (`#FAF7F2`), black logo, thin black progress line, black counter.
2. **Header**: Transparent on hero with white text; frosted ivory glass on scroll with black text, thin sand border, and black "Enquire Now" button.
3. **Hero**: Pinned 3D frame canvas with dark vignette gradient, crisp white typography, and white scroll indicator line.
4. **Growth (3.64x)**: Black background (`#0B0B0B`), giant white count-up number, ivory/white spline chart line with beige fill under the curve.
5. **About**: Ivory background (`#FAF7F2`), editorial black serif headings, taupe body text, framed archival visual.
6. **Project (Palm Corridor)**: White background (`#FFFFFF`), count-up statistics, and architectural showcase cards.
7. **Plot Size Availability**: Beige background (`#E8DFD0`), white 3D tilt cards with soft luxury shadow, thin black border, black "Available" badge, and solid black button.
8. **Amenities & Location**: Ivory background (`#FAF7F2`), minimal black line icons, embedded location map with drive-time connectivity list.
9. **Gallery**: White background (`#FFFFFF`), luxury grayscale-to-color image hover effect (`.editorial-img`), and black fullscreen lightbox.
10. **VIP Enquiry Form**: Black background (`#0B0B0B`), ivory form card, white inputs with black focus border, solid black submit button.
11. **Footer**: Charcoal background (`#1A1A1A`), white logo, ivory typography, sand dividers.
12. **Floating Actions**: Green WhatsApp button (`#25D366`), black Call button with white icon.

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📝 How to Edit Content & Replace Placeholders

All website text, phone numbers, WhatsApp routing, and project parameters live in:
👉 `src/config/siteConfig.js`

### A. Updating Contact Numbers & Lead Routing
```javascript
contact: {
  phoneDisplay: "+91 92037 07177",
  phoneRaw: "9203707177",
  phoneDial: "+919203707177",
  whatsappNumber: "919203707177", // Submissions route directly here
  email: "info@lainfracon.com",     // Update with official email
  address: { ... },
  googleMapsEmbedUrl: "...",       // Paste Google Maps embed iframe src
  googleMapsDirectionsUrl: "...",  // Paste Google Maps direction link
}
```

### B. Logo Handling
- Dark backgrounds: `/public/logo-white.png` (crisp white logo on transparent background)
- Light backgrounds: `/public/logo-black.png` (crisp black logo on transparent background)
- Original source asset: `/public/logo.png`
