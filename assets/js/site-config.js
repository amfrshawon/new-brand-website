/**
 * SINGLE SOURCE OF TRUTH for brand info across the whole site.
 * Every page pulls from this object at runtime (via include.js) instead of
 * hardcoding the brand name/phone/etc. in every HTML file.
 *
 * TODO: replace every placeholder below once real brand assets are ready.
 * Nothing else needs to change when you do — every page updates automatically.
 */
window.SITE_CONFIG = {
  brandName: "[BRAND NAME]",
  tagline: "Sell Your Car In Seconds",
  phone: "1-888-000-0000",
  phoneHref: "tel:1-888-000-0000",
  email: "info@example.com",
  emailHref: "mailto:info@example.com",
  address: {
    street: "[STREET ADDRESS]",
    city: "[CITY]",
    state: "[ST]",
    zip: "[ZIP]",
  },
  logo: {
    // Point this at an SVG/PNG in assets/images/ once you have a real file.
    // Until then, header.js renders styled text using brandName instead.
    src: null,
    alt: "[BRAND NAME] logo",
  },
  social: {
    facebook: "#",
    instagram: "#",
    twitter: "#",
  },
  year: new Date().getFullYear(),
};
