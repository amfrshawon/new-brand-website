/**
 * Zero-build-step "template include" system.
 * - Put <div data-include="/partials/header.html"></div> anywhere in a page.
 * - This fetches that partial and swaps it in, then fills any [data-bind]
 *   elements from window.SITE_CONFIG (see site-config.js).
 *
 * Requires being served over http(s), not opened directly as a file:// URL
 * (fetch() of local files is blocked by CORS under file://). Run a local
 * server while developing, e.g.:
 *   python3 -m http.server 8000
 *   npx serve .
 */
(function () {
  function getByPath(obj, path) {
    return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
  }

  function hydrateBrand(root) {
    const cfg = window.SITE_CONFIG || {};

    root.querySelectorAll("[data-bind]").forEach((el) => {
      const value = getByPath(cfg, el.getAttribute("data-bind"));
      if (value != null) el.textContent = value;
    });

    root.querySelectorAll("[data-bind-href]").forEach((el) => {
      const value = getByPath(cfg, el.getAttribute("data-bind-href"));
      if (value != null) el.setAttribute("href", value);
    });

    root.querySelectorAll("[data-bind-src]").forEach((el) => {
      const value = getByPath(cfg, el.getAttribute("data-bind-src"));
      if (value != null) el.setAttribute("src", value);
    });

    // <title> can't contain child elements, so the page-title suffix lives
    // on <body data-page-title="..."> instead and gets combined with the
    // brand name here.
    const pageTitle = document.body.dataset.pageTitle;
    if (pageTitle && cfg.brandName) {
      document.title = `${pageTitle} — ${cfg.brandName}`;
    }

    // Google Maps embed: only render the iframe once a real embed URL is
    // configured, so an unset gbp.mapEmbedUrl shows a clean placeholder
    // instead of an iframe pointed at a broken URL.
    root.querySelectorAll("[data-map-embed]").forEach((el) => {
      const url = cfg.gbp && cfg.gbp.mapEmbedUrl;
      if (url) {
        el.innerHTML = `<iframe src="${url}" loading="lazy" title="Map"></iframe>`;
      }
    });

    setupLanguageLinks(root);
    setupFavicon(cfg);
  }

  // Favicon can't live in each page's static <head> without touching every
  // file, so it's injected here instead (runs once, on every page).
  function setupFavicon(cfg) {
    if (!cfg.logo || !cfg.logo.src || document.getElementById("favicon-link")) return;
    const link = document.createElement("link");
    link.id = "favicon-link";
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = cfg.logo.src;
    document.head.appendChild(link);
  }

  // Every page carries <body data-lang="en|es" data-page-id="about-us">.
  // Spanish pages live one directory down at es/<page-id>.html (or
  // es/index.html), sharing the same flat filenames as their English
  // counterparts, so the switch is a pure string computation — no lookup
  // table to keep in sync.
  function setupLanguageLinks(root) {
    const lang = document.body.dataset.lang || "en";
    const pageId = document.body.dataset.pageId || "index";
    const file = pageId === "index" ? "index.html" : `${pageId}.html`;
    const enHref = lang === "es" ? `../${file}` : file;
    const esHref = lang === "es" ? file : `es/${file}`;

    root.querySelectorAll('[data-lang-link="en"]').forEach((a) => {
      a.setAttribute("href", enHref);
      a.classList.toggle("active", lang === "en");
    });
    root.querySelectorAll('[data-lang-link="es"]').forEach((a) => {
      a.setAttribute("href", esHref);
      a.classList.toggle("active", lang === "es");
    });
  }

  async function loadIncludes() {
    const nodes = Array.from(document.querySelectorAll("[data-include]"));
    await Promise.all(
      nodes.map(async (node) => {
        const url = node.getAttribute("data-include");
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
          const html = await res.text();
          const wrapper = document.createElement("div");
          wrapper.innerHTML = html;
          node.replaceWith(...wrapper.childNodes);
        } catch (err) {
          console.error("[include.js] failed to load", url, err);
          node.innerHTML = `<!-- failed to load ${url}: ${err.message} -->`;
        }
      })
    );
    hydrateBrand(document);
    document.dispatchEvent(new CustomEvent("partials:loaded"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadIncludes);
  } else {
    loadIncludes();
  }
})();
