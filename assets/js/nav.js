/**
 * Header interactivity: hamburger toggle, mobile drill-down dropdowns,
 * click-outside-to-close. Uses event delegation on `document` so it works
 * regardless of whether the header was just injected by include.js.
 */
(function () {
  function closeAllDropdowns(except) {
    document.querySelectorAll(".dropdown.active").forEach((d) => {
      if (d !== except) d.classList.remove("active");
    });
  }

  document.addEventListener("click", function (e) {
    const trigger = e.target.closest(".dropdown-trigger");
    const backBtn = e.target.closest(".back-btn");
    const hamburger = e.target.closest("#nav-icon");

    if (hamburger) {
      const navLinks = document.getElementById("navLinks");
      const isOpen = hamburger.classList.toggle("open");
      if (navLinks) navLinks.classList.toggle("active", isOpen);
      document.body.classList.toggle("no-scroll", isOpen);
      return;
    }

    if (trigger) {
      e.preventDefault();
      const dropdown = trigger.closest(".dropdown");
      const isActive = dropdown.classList.contains("active");
      closeAllDropdowns(dropdown);
      dropdown.classList.toggle("active", !isActive);
      return;
    }

    if (backBtn) {
      e.preventDefault();
      const dropdown = backBtn.closest(".dropdown");
      if (dropdown) dropdown.classList.remove("active");
      return;
    }

    // Click outside any dropdown -> close them all (desktop click-to-open case)
    if (!e.target.closest(".dropdown-menu")) {
      closeAllDropdowns(null);
    }
  });

  // Reset mobile menu state if the viewport crosses the desktop breakpoint
  // while it's open (e.g. rotating a tablet).
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      const hamburger = document.getElementById("nav-icon");
      const navLinks = document.getElementById("navLinks");
      if (hamburger) hamburger.classList.remove("open");
      if (navLinks) navLinks.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });
})();
