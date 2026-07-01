# [BRAND NAME] Website

Plain HTML/CSS/JS, no build step. Cloned/adapted from a competitor's design system
(cashforcars.com) with placeholder branding — see `assets/js/site-config.js` to
swap in the real brand name, phone, address, and logo everywhere at once.

## Structure

```
index.html                   Homepage
partials/header.html         Site-wide nav (injected via include.js)
partials/footer.html         Site-wide footer (injected via include.js)
assets/css/global-foundation.css   Variables, reset, shared buttons — loaded on every page
assets/css/header.css        Nav/dropdown/mobile-menu styles
assets/css/home.css           Homepage-only sections (ticker, steps, bento, FAQ, social proof)
assets/js/site-config.js     Single source of truth for brand name/phone/address/logo
assets/js/include.js         Fetches partials + fills [data-bind] elements from site-config
assets/js/nav.js             Hamburger + dropdown + mobile drill-down behavior
assets/js/social-proof.js    "Recently Purchased" live feed (placeholder sample data)
```

## Status

- [x] Global foundation (variables, fonts, reset, shared buttons)
- [x] Header (desktop dropdowns + mobile full-screen drill-down nav)
- [x] Footer
- [x] Homepage sections below the fold: stats ticker, 3-step "how it works",
      bento grid ("why us"), social-proof feed, FAQ accordion
- [ ] Hero / lead-capture section (VIN/plate/ZIP quote wizard) — **intentionally
      not built yet**, see the TODO placeholder in `index.html`
- [ ] Real brand assets (name, phone, address, logo) — see `site-config.js`
- [ ] Additional pages (How It Works, Locations, Vehicle Makes detail pages, etc.)

## Running locally

Requires a local server (fetch() of local files is blocked under `file://`):

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000/

## Updating brand info

Edit `assets/js/site-config.js` once — every page picks it up automatically via
`[data-bind]` / `[data-bind-href]` attributes, no find-and-replace needed.
