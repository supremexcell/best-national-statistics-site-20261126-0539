# NusaStat — Indonesia in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/supremexcell/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/supremexcell/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

A national statistics site for **Indonesia**, built for make.fun's **Make the best national statistics site** bounty ($50, top 10 places). Original design, text and charts — no other site's brand, text or images. Every figure is real, sourced and dated.

## What it is

NusaStat (“Nusa” from *Nusantara*, the Indonesian archipelago) presents Indonesia's people, economy, jobs, health and classrooms in numbers — 8 hash-routed pages, all reached from the nav:

- **Overview** — 8 headline KPI cards, GDP chart 2019–2024, sector donut, searchable indicators table, latest releases
- **Population** — population chart with year selector, age-structure donut, median age 31.1, largest provinces
- **Economy** — real GDP growth line chart with year selector, CPI inflation, GDP by sector and by spending, trade (exports US$ 266.5 bn, 2024)
- **Employment & Income** — unemployment 2019–2024, where people work, poverty 8.57% (Sep 2024)
- **Health** — life expectancy 74.15 years and HDI 75.02, 2020–2024 trends, HDI components, province gap
- **Education** — expected schooling 13.21 years, 221.6 million internet users (APJII 2024)
- **Regions** — sortable table of the 12 largest provinces (mid-2025 BPS), click a row for its detail card, island-group totals
- **Sources** — every figure's publisher and publication, plus methods notes

## The figures

Data year **2024** unless a table says otherwise. Headlines, all verified 26 November 2026:

| Indicator | Value | Source |
| --- | --- | --- |
| Population | 283.5 million | World Bank WDI / UN WPP 2024 |
| GDP (nominal) | Rp 22,139 trillion (US$ 1.40 tn) | BPS, Feb 2025 |
| GDP growth | 5.03% | BPS |
| GDP per capita | US$ 4,960 | BPS, Feb 2025 |
| Inflation (CPI) | 1.57% (Dec, y/y) | BPS, Jan 2025 |
| Unemployment | 4.91% (Aug) | BPS Sakernas |
| Poverty | 8.57% (Sep) | BPS, Jan 2025 |
| HDI | 75.02 | BPS, Nov 2025 |

The full dataset lives in `app/data.js`, so anyone can check every number against its source.

## How it works

Static files under `app/` — no build step, no libraries, no network requests. Charts are hand-rolled SVG drawn from `app/data.js` by `app/charts.js`; pages render from `app/views.js` through a hash router in `app/main.js`. Open it with any static server:

```sh
node serve.ts
# then open http://localhost:8080
```

Desktop (1280px) and phone (390px) layouts included. `main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored make.fun library (`vendor/makefun-frontend.ts`, unchanged from the kit).

## Layout

```text
main.ts                  # hand-in program (Node 22)
serve.ts                 # tiny static server for local testing
LICENSE                  # MIT
app/
  index.html             # shell + nav
  style.css              # teal/navy/amber theme, responsive
  main.js                # hash router + control wiring
  data.js                # every figure, with sources
  charts.js              # hand-rolled SVG bar / line / donut / hbar charts
  views.js               # one render function per page
screenshots/             # real renders: overview, economy, regions, phone
vendor/
  makefun-frontend.ts    # kit copy, unchanged
.makefun/
  owner.json             # entry wallet claim
```
