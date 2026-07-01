# [BRAND NAME] Website

Plain HTML/CSS/JS, no build step. Cloned/adapted from a competitor's design system
(cashforcars.com) with placeholder branding — see `assets/js/site-config.js` to
swap in the real brand name, phone, address, and logo everywhere at once.

Live: https://amfrshawon.github.io/new-brand-website/

## Structure

```
index.html                   Homepage (English)
es/index.html                 Homepage (Spanish) — es/ mirrors every root page
partials/header.html          EN site-wide nav (injected via include.js)
partials/header-es.html       ES site-wide nav
partials/footer.html          EN site-wide footer
partials/footer-es.html       ES site-wide footer
assets/css/global-foundation.css   Variables, reset, shared buttons — loaded on every page
assets/css/header.css        Nav/dropdown/mobile-menu styles
assets/css/home.css           Homepage-only sections (ticker, steps, bento, FAQ, social proof)
assets/css/page.css           Inner-page sections (page-hero banner, prose, info cards, forms)
assets/js/site-config.js     Single source of truth for brand name/phone/address/GBP/logo
assets/js/include.js         Fetches partials, fills [data-bind] elements, resolves language-switch links
assets/js/nav.js             Hamburger + dropdown + mobile drill-down behavior
assets/js/social-proof.js    "Recently Purchased" live feed (placeholder sample data, EN/ES aware)
```

## Status

- [x] Global foundation (variables, fonts, reset, shared buttons)
- [x] Header (desktop dropdowns + mobile full-screen drill-down nav)
- [x] Footer
- [x] Homepage sections below the fold: stats ticker, 3-step "how it works",
      bento grid ("why us"), social-proof feed, FAQ accordion
- [x] Secondary pages: About, How It Works, Locations, Vehicle Makes, Repair
      Estimate, No Insurance Accident, Reviews, FAQ, Contact, Blog, Privacy
      Policy, Terms and Conditions
- [x] Spanish (`/es/`) translation of every page above, with a working
      bidirectional language switcher (see "Language switching" below)
- [ ] Hero / lead-capture section (VIN/plate/ZIP quote wizard) — **intentionally
      not built yet**, see the TODO placeholder in `index.html` / `es/index.html`
- [ ] Real brand assets (name, phone, address, logo, GBP details) — see `site-config.js`
- [ ] Per-make / per-city detail pages (Vehicle Makes and Locations currently
      link to a single hub page each, not individual pages per brand/city)
- [ ] Contact form has no backend wired up yet (static markup only)

## Running locally

Requires a local server (fetch() of local files is blocked under `file://`):

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000/

## Updating brand info

Edit `assets/js/site-config.js` once — every page (English and Spanish) picks
it up automatically via `[data-bind]` / `[data-bind-href]` / `[data-bind-src]`
attributes, no find-and-replace needed. This includes GBP (Google Business
Profile) fields: `gbp.mapsUrl`, `gbp.placeId`, `gbp.mapEmbedUrl`, `gbp.hours`.

## Language switching

Every page's `<body>` carries `data-lang="en"|"es"` and `data-page-id="about-us"`
(etc. — `"index"` for the homepage). `include.js` uses those two values to
compute the matching URL in the other language at runtime — Spanish pages live
one directory down (`es/<page-id>.html`) with the same flat filenames as their
English counterparts, so no lookup table needs to be kept in sync.

To add a new page in both languages:
1. Create `<page-id>.html` at the root (English) with
   `data-lang="en" data-page-id="<page-id>"` and includes pointing at
   `partials/header.html` / `partials/footer.html`.
2. Create `es/<page-id>.html` (Spanish) with
   `data-lang="es" data-page-id="<page-id>"`, includes pointing at
   `../partials/header-es.html` / `../partials/footer-es.html`, and asset
   paths prefixed with `../` (e.g. `../assets/css/global-foundation.css`).
3. Add the new page to both `partials/header.html`/`header-es.html` (nav) and
   `partials/footer.html`/`footer-es.html` (footer links) if it should appear there.

## Cache-busting after CSS/JS/partial changes

Every `<link>`/`<script>`/`data-include` reference to a file under `assets/`
or `partials/` carries a `?v=2` query string. **Bump this number sitewide any
time you change a CSS/JS file or a partial** — otherwise returning visitors'
browsers (mobile Safari is especially aggressive about this) can keep serving
the *old* cached copy of that file indefinitely, even after a hard refresh of
the page itself, since the sub-resource has its own independent cache
lifetime. This bit us once already (a footer CSS fix looked "not fixed" on a
real phone purely from stale cache) — bumping the version string forces every
browser to fetch fresh, with no exceptions to remember or explain.

To bump: find-and-replace `?v=2` → `?v=3` (etc.) across every `.html` file.
