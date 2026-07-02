/**
 * SINGLE SOURCE OF TRUTH for brand info across the whole site.
 * Every page pulls from this object at runtime (via include.js) instead of
 * hardcoding the brand name/phone/etc. in every HTML file.
 *
 * TODO: replace every placeholder below once real brand assets are ready.
 * Nothing else needs to change when you do — every page updates automatically.
 */
window.SITE_CONFIG = {
  brandName: "CashMyCarTX",
  tagline: "Sell Your Car In Seconds",
  phone: "1-888-000-0000",
  phoneHref: "tel:1-888-000-0000",
  email: "rabby@cashmycartx.com",
  emailHref: "mailto:rabby@cashmycartx.com",
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
    // Root-relative path — works from every page depth (root and es/) now
    // that the site is served from cashmycartx.com's true root, not a
    // GitHub Pages project subpath.
    src: "/assets/images/logo.svg",
    alt: "CashMyCarTX logo",
  },
  // Browser-tab icon — a dedicated compact/square icon, not the wide
  // header logo (a wordmark scaled down to favicon size is illegible).
  favicon: "/assets/images/favicon.png",
  social: {
    facebook: "#",
    instagram: "#",
    twitter: "#",
  },
  year: new Date().getFullYear(),
};
