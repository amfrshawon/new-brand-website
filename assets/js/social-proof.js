/**
 * Drives the "Recently Purchased" live feed on the homepage.
 * Placeholder sample data below — swap SAMPLE_SALES for a real feed (your own
 * backend, a CMS collection, etc.) whenever one exists. Purely presentational;
 * no data is fetched from any third party.
 */
(function () {
  const SAMPLE_SALES = [
    { title: "2016 Honda Accord", city: "Chicago, IL" },
    { title: "2014 Toyota Camry", city: "Austin, TX" },
    { title: "2018 Ford F-150", city: "Phoenix, AZ" },
    { title: "2012 Nissan Altima", city: "Tampa, FL" },
    { title: "2019 Chevrolet Malibu", city: "Columbus, OH" },
    { title: "2015 Jeep Grand Cherokee", city: "Denver, CO" },
    { title: "2017 Hyundai Elantra", city: "Charlotte, NC" },
  ];

  const CAR_ICON =
    '<svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor"><path d="M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-53.99c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.5 0 10.3-3.75 11.64-9.09l6-24c1.9-7.57-3.83-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9s12.8-31.9 32-31.9 48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95s28.8-47.85 48-47.85 32 12.76 32 31.9-12.8 31.9-32 31.9z"/></svg>';

  function timeAgoLabel() {
    const minutes = 1 + Math.floor(Math.random() * 58);
    return minutes === 1 ? "1 min ago" : `${minutes} min ago`;
  }

  function buildCard(sale) {
    const el = document.createElement("div");
    el.className = "sp-card sp-enter";
    el.innerHTML = `
      <div class="sp-card-ico">${CAR_ICON}</div>
      <div class="sp-card-body">
        <p class="sp-card-title">${sale.title} sold</p>
        <p class="sp-card-sub">${sale.city} · ${timeAgoLabel()}</p>
      </div>`;
    return el;
  }

  function init() {
    const feed = document.getElementById("spFeed");
    if (!feed) return;

    feed.innerHTML = "";
    const shuffled = [...SAMPLE_SALES].sort(() => Math.random() - 0.5);
    const initialCards = shuffled.slice(0, 4).map(buildCard);
    initialCards.forEach((c) => {
      c.classList.remove("sp-enter");
      feed.appendChild(c);
    });

    let i = 0;
    setInterval(() => {
      const nextSale = SAMPLE_SALES[i % SAMPLE_SALES.length];
      i++;

      const oldest = feed.firstElementChild;
      if (oldest) {
        oldest.classList.add("sp-exit");
        setTimeout(() => oldest.remove(), 400);
      }

      const card = buildCard(nextSale);
      feed.appendChild(card);
      // Force a style flush so the sp-enter starting state (opacity:0,
      // translateY) is committed before we remove it — otherwise the browser
      // can coalesce both changes into one paint and skip the transition
      // entirely (this also sidesteps requestAnimationFrame being throttled
      // to a no-op in background/hidden tabs).
      void card.offsetWidth;
      card.classList.remove("sp-enter");
    }, 4000);
  }

  document.addEventListener("partials:loaded", init);
  // Also run on plain pages that don't use include.js's partial system.
  if (document.getElementById("spFeed") && !document.querySelector("[data-include]")) {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
