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
  // Google Business Profile (GBP) — the listing that backs local-SEO/map results.
  // If the business operates multiple GBP listings (one per city/location),
  // turn this into an array of { name, address, phone, mapsUrl, placeId, hours }
  // objects instead and update the pages that read gbp.* accordingly.
  gbp: {
    mapsUrl: "[GOOGLE MAPS / GBP LISTING URL]",
    placeId: "[GOOGLE PLACE ID]",
    // Leave as null until you have a real embed URL (Google Maps > Share >
    // Embed a map > copy the src="..." value) — the locations page shows a
    // clean placeholder instead of a broken iframe while this is null.
    mapEmbedUrl: null,
    hours: {
      mondayFriday: "8:00 AM – 8:00 PM",
      saturday: "9:00 AM – 6:00 PM",
      sunday: "Closed",
    },
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
