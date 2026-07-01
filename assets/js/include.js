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
