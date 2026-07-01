# Texas City/County Page Roadmap

Where the lead opportunity actually is, and the order to build city pages in.

## A caveat on the data behind this

I tried to pull real keyword-volume data (searches/month for "cash for cars
Houston" etc.) from Ahrefs to rank cities by actual search demand, but the
connected Ahrefs plan doesn't include keyword volume data (`Insufficient plan`
error). The prioritization below is instead based on **Texas metro population**
(U.S. Census data) as a proxy for lead volume — a standard, defensible
substitute, but not the same as real search-volume numbers. If/when a
keyword-data tool is available, re-run this prioritization against actual
"cash for cars [city]" / "sell my car [city]" search volume before committing
to build order — population and search demand usually correlate but don't
always match exactly.

## How people actually search (why cities, not counties)

Real searchers type city/town names ("sell my car Houston"), not county names
("sell my car Harris County") — nobody searches by county for a local service.
So the page structure should be **one page per city**, not per county. Counties
still matter, but as an *internal organizing concept* — each city page should
mention the county it's in and the smaller towns/suburbs it covers, so a city
page picks up long-tail searches for those suburbs too (this is what the
Houston sample page does: it explicitly names Sugar Land, Pasadena, Baytown,
Katy, The Woodlands, Pearland, and Spring as areas it serves, all of which are
in Harris County or immediately adjacent counties).

## Tier 1 — build these next (largest metros, highest lead volume)

| City | Metro area | Status |
|---|---|---|
| Houston | Houston–The Woodlands–Sugar Land | ✅ built (`houston.html` / `es/houston.html`) |
| Dallas | Dallas–Fort Worth–Arlington | Not built |
| Fort Worth | Dallas–Fort Worth–Arlington | Not built |
| San Antonio | San Antonio–New Braunfels | Not built |
| Austin | Austin–Round Rock–Georgetown | Not built |

These four metro areas alone account for the large majority of Texas's
population. Getting all four live (following the Houston template) should be
the immediate next milestone.

## Tier 2 — next largest cities

El Paso, Arlington, Corpus Christi, Plano, Laredo, Lubbock, Irving, Garland,
Frisco, McKinney, Amarillo, Grand Prairie, Brownsville.

## Tier 3 — worth covering as the program scales

Round Rock, Waco, Killeen, College Station, Beaumont, Tyler, Abilene, Odessa,
Midland, Wichita Falls, San Angelo, McAllen, Harlingen, Pearland, League City,
Sugar Land, The Woodlands (the last three can graduate from being
"areas served" mentions on the Houston page to their own dedicated pages once
there's enough content to justify it — don't split a metro into 6 thin pages
before there's a real reason to).

## Page template checklist (what every new city page needs — see `houston.html`)

- [ ] Unique `<title>`, meta description, canonical URL, hreflang (en/es pair)
- [ ] `AutomotiveBusiness` JSON-LD with `areaServed` set to that city
- [ ] `FAQPage` JSON-LD with 2–3 genuinely city-relevant questions (Houston's
      flood-damage FAQ is the model — find what's actually distinctive about
      each city's cars/climate/market, don't just copy-paste generic FAQs)
- [ ] A named list of real suburbs/nearby towns it serves
- [ ] The same 3-step "how it works" section for consistency
- [ ] English page at `<city>.html`, Spanish at `es/<city>.html`
- [ ] Added to `sitemap.xml`, and linked from `locations.html` + the footer's
      city list (both `partials/footer.html` and `partials/footer-es.html`)
