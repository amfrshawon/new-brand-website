# Vehicle Make/Model Page Roadmap

## The real scope here

"Every model" is a big number if taken literally: the site already lists ~28
makes on `vehicle-makes.html`, and most makes have 8–15 models each once you
count current and recent generations (Honda alone: Accord, Civic, CR-V, CR-Z,
Crosstour, Element, Fit, HR-V, Insight, Odyssey, Pilot, Ridgeline — 12 models).
That's realistically **200–300 individual pages** across all makes, each
needing genuine content (specs, trims, pros/cons, FAQ) — not something to
generate in one pass without it turning into thin, repetitive, low-quality
content that actively hurts SEO rather than helping it.

`honda-accord.html` / `es/honda-accord.html` is built as the reference
template — reusing the reference page structure from CashForCars.com's
model pages, but written fresh (not copied) and scoped to Texas/CashMyCarTX.

## Page template checklist (what every new model page needs)

- [ ] `<title>`, meta description, canonical, hreflang (en/es pair)
- [ ] `BreadcrumbList` JSON-LD (Home → Vehicle Makes → [Model])
- [ ] `FAQPage` JSON-LD with genuinely model-relevant questions — Accord's
      CVT/transmission-issue FAQ is the model: find the actual common
      problem/selling-point for each model, don't reuse generic FAQs
- [ ] Real specs (engine, mpg, weight, wheelbase, price range) — accurate
      facts, not invented numbers
- [ ] Trims list — accurate to that model's actual trim lineup
- [ ] An honest "why sell instead of repair/trade-in" section tied to that
      model's actual common failure points (transmission, timing chain,
      infotainment, etc. — whatever's real for that model)
- [ ] Pros / Cons in our own words (not copied from any competitor site)
- [ ] "We Buy All [Make] Models" link grid — link the current model to
      itself, others to `vehicle-makes.html` until they have their own page
- [ ] "Top Texas Cities" link grid (same 6 cities used elsewhere)
- [ ] English at `<make>-<model>.html`, Spanish at `es/<make>-<model>.html`
- [ ] Added to `sitemap.xml`
- [ ] Footer's "Top Cars We Buy" list updated to link that model directly
      once its page exists (currently only Honda Accord is wired up; the
      other 7 entries still point to the generic `vehicle-makes.html` hub)

## Suggested build order

Prioritize the models that are both commonly sold/junked in the US used-car
market **and** already listed in the footer's "Top Cars We Buy" (so the
footer link can go live immediately instead of pointing at the generic hub):

1. Toyota Camry, Toyota Corolla
2. Honda Civic (Accord is done)
3. Ford F-150, Ford Explorer
4. Chevrolet Trailblazer
5. Nissan Altima

After that, expand make-by-make in roughly the same population/demand order
as `CITY-PAGES-ROADMAP.md` used for cities: the highest-volume mainstream
makes (Toyota, Honda, Ford, Chevrolet, Nissan, Hyundai, Kia) before
lower-volume or luxury makes (Volvo, Mini, Bugatti-tier exotics don't need
dedicated pages at all — nobody is scrapping a Bugatti for cash).

## What I did NOT copy from CashForCars.com

Vehicle specs (engine size, horsepower, mpg, weight, wheelbase, trim names)
are factual and not copyrightable — those are reused where accurate. The
marketing prose (pros/cons paragraphs, "why sell" framing, FAQ answers) is
written fresh for CashMyCarTX, not copied from their page.
