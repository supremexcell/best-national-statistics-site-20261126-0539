// views.js — one render function per page. Every page is plain HTML built
// from data.js; charts come from charts.js. Nothing is fetched at run time.

import {
  COUNTRY, HEADLINES, GDP_SERIES, POPULATION_SERIES, AGE_GROUPS, MEDIAN_AGE,
  SECTORS, EXPENDITURE, INFLATION_SERIES, TRADE, LABOUR, HEALTH, EDUCATION,
  PROVINCES, ISLAND_GROUPS, NATIONAL_POP_MID2025, SOURCES, RELEASES,
} from "./data.js";
import { barChart, lineChart, donutChart, hbarList } from "./charts.js";

function fmtPop(n) {
  return `${(n / 1000000).toFixed(2)} million`;
}

function sourceNote(text) {
  return `<p class="source-note">Source: ${text}</p>`;
}

function kpiCards() {
  return `<section class="kpi-grid" aria-label="Headline indicators">${HEADLINES.map(
    (h) => `<article class="kpi"><p class="kpi-label">${h.label}</p><p class="kpi-value">${h.value}</p><p class="kpi-change">${h.change}</p><p class="kpi-year">${h.year} · ${h.source}</p></article>`,
  ).join("")}</section>`;
}

function yearOptions(series, selected) {
  return series.map((r) => `<option value="${r.year}"${r.year === selected ? " selected" : ""}>${r.year}</option>`).join("");
}

export function renderOverview(state) {
  const year = state.gdpYear || 2024;
  const row = GDP_SERIES.find((r) => r.year === year);
  const idx = GDP_SERIES.findIndex((r) => r.year === year);
  const gdpChart = barChart(
    GDP_SERIES.map((r) => ({ label: String(r.year), value: r.nominalRpTn })),
    { label: "Nominal GDP in trillion rupiah, 2019 to 2024", highlightIndex: idx, valueFormat: (v) => v.toLocaleString("en-US", { maximumFractionDigits: 0 }) },
  );
  const sectorDonut = donutChart(
    SECTORS.slice(0, 5).map((s) => ({ label: s.name, value: s.share })),
    { label: "Five largest sectors by share of GDP, 2024", centre: "Top 5", centreSub: "64.0% of GDP" },
  );
  const rows = HEADLINES.map(
    (h) => `<tr data-search="${(h.label + " " + h.value + " " + h.source).toLowerCase()}"><td>${h.label}</td><td class="num">${h.value}</td><td class="num">${h.year}</td><td>${h.source}</td></tr>`,
  ).join("");
  return `
  <section class="hero">
    <div>
      <p class="eyebrow">Indonesia · Official statistics, explained</p>
      <h1>Indonesia in Numbers</h1>
      <p class="lede">The country's people, economy, jobs, health and classrooms — every figure sourced, dated and ready to check. Data year: <strong>2024</strong> unless a table says otherwise.</p>
    </div>
    <div class="hero-facts">
      <p><strong>${COUNTRY.provinces}</strong> provinces</p>
      <p><strong>${(COUNTRY.landAreaKm2 / 1000000).toFixed(2)} million km²</strong> of land</p>
      <p><strong>4th</strong> most populous country</p>
      <p><strong>16th</strong> largest economy (nominal GDP)</p>
    </div>
  </section>
  ${kpiCards()}
  <section class="panel-grid">
    <article class="panel wide">
      <div class="panel-head"><h2>GDP, 2019–2024</h2>
        <label class="year-pick">Year <select id="gdp-year" aria-label="Highlight a year on the GDP chart">${yearOptions(GDP_SERIES, year)}</select></label>
      </div>
      ${gdpChart}
      <p class="year-readout" id="gdp-readout">In <strong>${year}</strong>, nominal GDP was <strong>Rp ${row.nominalRpTn.toLocaleString("en-US")} trillion</strong> (US$ ${row.usdBn.toLocaleString("en-US")} billion) and real growth was <strong>${row.growth > 0 ? "+" : ""}${row.growth.toFixed(2)}%</strong>.</p>
      ${sourceNote("Statistics Indonesia (BPS) and IMF International Financial Statistics, 2019–2024.")}
    </article>
    <article class="panel">
      <div class="panel-head"><h2>What makes the GDP</h2></div>
      ${sectorDonut}
      ${sourceNote("Shares of nominal GDP, 2024 (BPS).")}
      <p><a class="text-link" href="#/economy">See all sectors and spending →</a></p>
    </article>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>All headline indicators</h2>
      <label class="search-box">Search <input id="indicator-search" type="search" placeholder="Try “poverty” or “BPS”…" aria-label="Search indicators"></label>
    </div>
    <div class="table-scroll"><table class="data-table" id="indicator-table">
      <thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Source</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
    <p class="table-empty" id="indicator-empty" hidden>No indicator matches that search.</p>
    ${sourceNote("Figures as published by the sources named; see the Sources page for the full publication list.")}
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Latest releases</h2></div>
    <ul class="release-list">${RELEASES.map((r) => `<li><span class="release-date">${r.date}</span><div><strong>${r.title}</strong><p>${r.detail}</p></div></li>`).join("")}</ul>
  </section>`;
}

export function renderPopulation(state) {
  const year = state.popYear || 2024;
  const idx = POPULATION_SERIES.findIndex((r) => r.year === year);
  const row = POPULATION_SERIES[idx];
  const chart = barChart(
    POPULATION_SERIES.map((r) => ({ label: String(r.year), value: r.total })),
    { label: "Population in millions, 2019 to 2024", highlightIndex: idx, valueFormat: (v) => v.toFixed(2) },
  );
  const donut = donutChart(
    AGE_GROUPS.map((a) => ({ label: a.group, value: a.share })),
    { label: "Population by age group, 2024", centre: "283.5m", centreSub: "people, 2024" },
  );
  const top5 = [...PROVINCES].sort((a, b) => b.population - a.population).slice(0, 5);
  return `
  <section class="page-head"><p class="eyebrow">People</p><h1>Population</h1>
  <p class="lede">Indonesia is the world's fourth most populous country. Growth has slowed to under 1% a year, and the working-age share is at its peak — the demographic dividend window.</p></section>
  <section class="panel-grid">
    <article class="panel wide">
      <div class="panel-head"><h2>Population, 2019–2024</h2>
        <label class="year-pick">Year <select id="pop-year" aria-label="Highlight a year on the population chart">${yearOptions(POPULATION_SERIES, year)}</select></label>
      </div>
      ${chart}
      <p class="year-readout" id="pop-readout">In <strong>${year}</strong> the population was <strong>${row.total.toFixed(2)} million</strong>.</p>
      ${sourceNote("World Bank World Development Indicators (SP.POP.TOTL) / UN World Population Prospects 2024, mid-year estimates.")}
    </article>
    <article class="panel">
      <div class="panel-head"><h2>Who Indonesians are</h2></div>
      ${donut}
      <dl class="fact-list">
        <div><dt>Median age</dt><dd>${MEDIAN_AGE.value} years (${MEDIAN_AGE.year})</dd></div>
        <div><dt>Children (0–14)</dt><dd>24.6% — about 69.7 million</dd></div>
        <div><dt>Working age (15–64)</dt><dd>68.1% — about 193.1 million</dd></div>
        <div><dt>Older people (65+)</dt><dd>7.3% — about 20.7 million</dd></div>
      </dl>
      ${sourceNote("UN World Population Prospects 2024.")}
    </article>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Where people live</h2></div>
    <p>More than half of Indonesians live on Java. The five largest provinces hold about 159 million people — 56% of the country.</p>
    ${hbarList(top5.map((p) => ({ label: `${p.name} (${p.indonesian})`, value: p.population / 1000000, display: fmtPop(p.population) })), { label: "Five largest provinces by population, mid-2025" })}
    ${sourceNote("BPS provincial population tables, mid-2025.")}
    <p><a class="text-link" href="#/regions">Open the full province table →</a></p>
  </section>`;
}

export function renderEconomy(state) {
  const year = state.gdpYear || 2024;
  const row = GDP_SERIES.find((r) => r.year === year);
  const idx = GDP_SERIES.findIndex((r) => r.year === year);
  const chart = lineChart(
    GDP_SERIES.map((r) => ({ label: String(r.year), value: r.growth })),
    { label: "Real GDP growth in percent, 2019 to 2024", highlightIndex: idx, valueFormat: (v) => `${v.toFixed(2)}%`, format: (v) => `${v.toFixed(0)}%` },
  );
  const inflChart = barChart(
    INFLATION_SERIES.map((r) => ({ label: String(r.year), value: r.value })),
    { label: "CPI inflation in December, year on year, 2019 to 2024", valueFormat: (v) => `${v.toFixed(2)}%`, format: (v) => `${v.toFixed(0)}%` },
  );
  const sectorRows = SECTORS.map((s) => `<tr><td>${s.name}</td><td class="num">${s.share.toFixed(1)}%</td><td class="num">Rp ${s.valueRpTn.toLocaleString("en-US")} tn</td><td class="num">${s.growth === null ? "—" : `+${s.growth.toFixed(2)}%`}</td></tr>`).join("");
  return `
  <section class="page-head"><p class="eyebrow">Money</p><h1>Economy</h1>
  <p class="lede">Southeast Asia's largest economy: US$ 1.40 trillion in 2024, growing 5.03% a year, driven by household spending and manufacturing. All figures are nominal unless marked real.</p></section>
  <section class="kpi-grid small">
    <article class="kpi"><p class="kpi-label">GDP (nominal)</p><p class="kpi-value">Rp 22,139 tn</p><p class="kpi-change">US$ 1,396 bn</p><p class="kpi-year">2024 · BPS</p></article>
    <article class="kpi"><p class="kpi-label">GDP per capita</p><p class="kpi-value">US$ 4,960</p><p class="kpi-change">Rp 78.62 million</p><p class="kpi-year">2024 · BPS</p></article>
    <article class="kpi"><p class="kpi-label">GDP (PPP)</p><p class="kpi-value">US$ 4.68 tn</p><p class="kpi-change">US$ 16,608 per person</p><p class="kpi-year">2024 · IMF / World Bank</p></article>
    <article class="kpi"><p class="kpi-label">Exports</p><p class="kpi-value">US$ 266.5 bn</p><p class="kpi-change">Trade surplus US$ 32.9 bn</p><p class="kpi-year">2024 · BPS</p></article>
  </section>
  <section class="panel-grid">
    <article class="panel wide">
      <div class="panel-head"><h2>Real GDP growth, 2019–2024</h2>
        <label class="year-pick">Year <select id="gdp-year" aria-label="Highlight a year on the growth chart">${yearOptions(GDP_SERIES, year)}</select></label>
      </div>
      ${chart}
      <p class="year-readout" id="gdp-readout">In <strong>${year}</strong>, real GDP grew <strong>${row.growth > 0 ? "+" : ""}${row.growth.toFixed(2)}%</strong> and nominal GDP was <strong>Rp ${row.nominalRpTn.toLocaleString("en-US")} trillion</strong>.</p>
      ${sourceNote("BPS; World Bank NY.GDP.MKTP.KD.ZG. The 2020 contraction (−2.07%) was the COVID-19 recession.")}
    </article>
    <article class="panel">
      <div class="panel-head"><h2>Inflation (CPI)</h2></div>
      ${inflChart}
      <p>December year-on-year CPI inflation. It peaked at 5.51% in December 2022 and fell to 1.57% by December 2024.</p>
      ${sourceNote("BPS CPI releases, 2019–2024.")}
    </article>
  </section>
  <section class="panel-grid">
    <article class="panel">
      <div class="panel-head"><h2>GDP by sector</h2></div>
      <div class="table-scroll"><table class="data-table">
        <thead><tr><th>Sector</th><th>Share</th><th>Value</th><th>Real growth</th></tr></thead>
        <tbody>${sectorRows}</tbody>
      </table></div>
      ${sourceNote("BPS national accounts, 2024 (current prices).")}
    </article>
    <article class="panel">
      <div class="panel-head"><h2>GDP by spending</h2></div>
      ${hbarList(EXPENDITURE.filter((e) => e.share > 0).map((e) => ({ label: e.name, value: e.share, display: `${e.share.toFixed(1)}%` })), { label: "GDP by expenditure, share of nominal GDP, 2024" })}
      <p>Household consumption is more than half of GDP — the single biggest driver of growth.</p>
      <div class="panel-head"><h2>Trade, 2024</h2></div>
      <dl class="fact-list">
        <div><dt>Exports</dt><dd>US$ ${TRADE.exportsUsdBn} bn (+${TRADE.exportsGrowth}% on 2023)</dd></div>
        <div><dt>Non-oil &amp; gas exports</dt><dd>US$ ${TRADE.exportsNonOilGasUsdBn} bn</dd></div>
        <div><dt>Oil &amp; gas exports</dt><dd>US$ ${TRADE.exportsOilGasUsdBn} bn</dd></div>
        <div><dt>Imports</dt><dd>US$ ${TRADE.importsUsdBn} bn</dd></div>
        <div><dt>Trade surplus</dt><dd>US$ ${TRADE.surplusUsdBn} bn</dd></div>
      </dl>
      <p>Biggest export groups: mineral fuels and oils (${TRADE.topExports[0].share}%), animal and vegetable oils (${TRADE.topExports[1].share}%), iron and steel (${TRADE.topExports[2].share}%).</p>
      ${sourceNote("BPS Foreign Trade Statistics 2023–2024; World Bank merchandise trade.")}
    </article>
  </section>`;
}

export function renderEmployment() {
  const chart = lineChart(
    LABOUR.unemploymentSeries.map((r) => ({ label: String(r.year), value: r.rate })),
    { label: "Open unemployment rate in August, 2019 to 2024", valueFormat: (v) => `${v.toFixed(2)}%`, format: (v) => `${v.toFixed(0)}%` },
  );
  const sectorRows = LABOUR.employmentBySector.map((s) => `<tr><td>${s.sector}</td><td class="num">${s.share.toFixed(1)}%</td></tr>`).join("");
  return `
  <section class="page-head"><p class="eyebrow">Work</p><h1>Employment &amp; Income</h1>
  <p class="lede">145 million Indonesians were in work in 2024. Unemployment is at its lowest in years, but most work is informal and agriculture still employs more people than any other sector.</p></section>
  <section class="kpi-grid small">
    <article class="kpi"><p class="kpi-label">Unemployment (Aug)</p><p class="kpi-value">4.91%</p><p class="kpi-change">7.47 million people</p><p class="kpi-year">2024 · BPS Sakernas</p></article>
    <article class="kpi"><p class="kpi-label">People in work</p><p class="kpi-value">145 million</p><p class="kpi-change">Up from 91 million in 2001</p><p class="kpi-year">2024 · Sakernas / IZA</p></article>
    <article class="kpi"><p class="kpi-label">Labour-force participation</p><p class="kpi-value">71%</p><p class="kpi-change">Women 56.4% · Men 84.2%</p><p class="kpi-year">2024 · Sakernas / IZA</p></article>
    <article class="kpi"><p class="kpi-label">Informal work</p><p class="kpi-value">58%</p><p class="kpi-change">Of all people in work</p><p class="kpi-year">2024 · Sakernas / IZA</p></article>
  </section>
  <section class="panel-grid">
    <article class="panel wide">
      <div class="panel-head"><h2>Unemployment, August 2019–2024</h2></div>
      ${chart}
      <p>Unemployment spiked to 7.07% in the COVID year of 2020 and has fallen every year since, to 4.91% in August 2024 — below the pre-pandemic 5.28%.</p>
      ${sourceNote("BPS National Labour Force Survey (Sakernas), August rounds.")}
    </article>
    <article class="panel">
      <div class="panel-head"><h2>Where people work</h2></div>
      <div class="table-scroll"><table class="data-table">
        <thead><tr><th>Sector</th><th>Share of jobs</th></tr></thead>
        <tbody>${sectorRows}</tbody>
      </table></div>
      <p>Agriculture's share fell from 44% in 2001 to 28% in 2024. Manufacturing's share barely moved — 13.3% to 13.8% — while trade and services absorbed the workers who left farming.</p>
      ${sourceNote("BPS Sakernas via IZA World of Labour, 2026.")}
    </article>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Poverty and income</h2></div>
    <dl class="fact-list wide">
      <div><dt>Poverty rate (Sep 2024)</dt><dd>8.57% — 24.06 million people, the lowest on record</dd></div>
      <div><dt>Poverty line (Sep 2024)</dt><dd>Rp 595,242 per person per month</dd></div>
      <div><dt>Median monthly earnings (2024)</dt><dd>Slightly above Rp 2 million — about 40% below the average minimum wage of Rp 3.2 million</dd></div>
      <div><dt>GDP per capita (2024)</dt><dd>Rp 78.62 million a year (US$ 4,960)</dd></div>
    </dl>
    ${sourceNote("BPS poverty release (Jan 2025); IZA World of Labour (Nov 2026).")}
  </section>`;
}

export function renderHealth() {
  const leChart = lineChart(
    HEALTH.lifeExpectancySeries.map((r) => ({ label: String(r.year), value: r.value })),
    { label: "Life expectancy at birth in years, 2020 to 2024", valueFormat: (v) => v.toFixed(2), format: (v) => v.toFixed(0) },
  );
  const hdiChart = lineChart(
    HEALTH.hdiSeries.map((r) => ({ label: String(r.year), value: r.value })),
    { label: "Human Development Index, 2020 to 2024", valueFormat: (v) => v.toFixed(2), format: (v) => v.toFixed(0) },
  );
  return `
  <section class="page-head"><p class="eyebrow">Wellbeing</p><h1>Health</h1>
  <p class="lede">Indonesians live longer than ever — 74.15 years at birth in 2024 — and the Human Development Index reached 75.02, firmly in the “high” band. The gap between provinces is still wide.</p></section>
  <section class="kpi-grid small">
    <article class="kpi"><p class="kpi-label">Life expectancy</p><p class="kpi-value">74.15 years</p><p class="kpi-change">+0.22 years on 2023</p><p class="kpi-year">2024 · BPS</p></article>
    <article class="kpi"><p class="kpi-label">Human Development Index</p><p class="kpi-value">75.02</p><p class="kpi-change">High human development</p><p class="kpi-year">2024 · BPS</p></article>
    <article class="kpi"><p class="kpi-label">Highest HDI province</p><p class="kpi-value">84.15</p><p class="kpi-change">DKI Jakarta</p><p class="kpi-year">2024 · BPS</p></article>
    <article class="kpi"><p class="kpi-label">Lowest HDI province</p><p class="kpi-value">54.91</p><p class="kpi-change">Highland Papua</p><p class="kpi-year">2024 · BPS</p></article>
  </section>
  <section class="panel-grid">
    <article class="panel">
      <div class="panel-head"><h2>Life expectancy, 2020–2024</h2></div>
      ${leChart}
      ${sourceNote("BPS Human Development Index releases.")}
    </article>
    <article class="panel">
      <div class="panel-head"><h2>Human Development Index, 2020–2024</h2></div>
      ${hdiChart}
      ${sourceNote("BPS Human Development Index releases.")}
    </article>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>What makes up the HDI in 2024</h2></div>
    <div class="table-scroll"><table class="data-table">
      <thead><tr><th>Component</th><th>Value</th></tr></thead>
      <tbody>${HEALTH.hdiComponents2024.map((c) => `<tr><td>${c.component}</td><td class="num">${c.value}</td></tr>`).join("")}</tbody>
    </table></div>
    <p>The HDI combines health (life expectancy), knowledge (schooling) and a decent standard of living (adjusted spending). All three components rose in 2024. The 29-point gap between Jakarta (84.15) and Highland Papua (54.91) is the widest inequality in the index.</p>
    ${sourceNote("BPS HDI 2024 release (Nov 2025).")}
  </section>`;
}

export function renderEducation() {
  const chart = lineChart(
    EDUCATION.expectedSchoolingSeries.map((r) => ({ label: String(r.year), value: r.value })),
    { label: "Expected years of schooling, 2020 to 2024", valueFormat: (v) => v.toFixed(2), format: (v) => v.toFixed(0) },
  );
  return `
  <section class="page-head"><p class="eyebrow">Learning</p><h1>Education</h1>
  <p class="lede">A child starting school in Indonesia in 2024 could expect 13.21 years of schooling — up every year since 2020. And 221.6 million Indonesians were online, learning, working and shopping on the internet.</p></section>
  <section class="kpi-grid small">
    <article class="kpi"><p class="kpi-label">Expected years of schooling</p><p class="kpi-value">13.21 years</p><p class="kpi-change">Up from 12.98 in 2020</p><p class="kpi-year">2024 · BPS</p></article>
    <article class="kpi"><p class="kpi-label">Internet users</p><p class="kpi-value">221.6 million</p><p class="kpi-change">79.5% of the population</p><p class="kpi-year">2024 · APJII</p></article>
    <article class="kpi"><p class="kpi-label">HDI knowledge share</p><p class="kpi-value">Rising</p><p class="kpi-change">Schooling up 0.09 years in 2024</p><p class="kpi-year">2024 · BPS</p></article>
    <article class="kpi"><p class="kpi-label">Life expectancy (for context)</p><p class="kpi-value">74.15 years</p><p class="kpi-change">Health supports longer learning</p><p class="kpi-year">2024 · BPS</p></article>
  </section>
  <section class="panel-grid">
    <article class="panel wide">
      <div class="panel-head"><h2>Expected years of schooling, 2020–2024</h2></div>
      ${chart}
      <p>Expected years of schooling is the number of years a 7-year-old can expect to spend in school. It has risen every year in this series, from 12.98 in 2020 to 13.21 in 2024.</p>
      ${sourceNote("BPS Human Development Index releases, 2020–2024.")}
    </article>
    <article class="panel">
      <div class="panel-head"><h2>Digital Indonesia</h2></div>
      <dl class="fact-list">
        <div><dt>Internet users</dt><dd>${EDUCATION.internetUsersMillion} million (${EDUCATION.internetYear})</dd></div>
        <div><dt>Penetration</dt><dd>${EDUCATION.internetPenetration}% of the population</dd></div>
        <div><dt>Change on 2023</dt><dd>+1.31 points (78.19% in 2023)</dd></div>
        <div><dt>Survey base</dt><dd>8,720 respondents in 38 provinces</dd></div>
      </dl>
      <p>Internet use is now near-universal among younger Indonesians: 34.4% of users are Generation Z. The survey counted anyone who had used the internet in the previous three months.</p>
      ${sourceNote("APJII Indonesia Internet Penetration Survey 2024.")}
      <p><a class="text-link" href="#/population">See the age structure behind the digital shift →</a></p>
    </article>
  </section>`;
}

export function renderRegions(state) {
  const sort = state.regionSort || "population";
  const dir = state.regionDir || "desc";
  const rows = [...PROVINCES].sort((a, b) => {
    const av = sort === "name" ? a.name : sort === "density" ? a.population / a.areaKm2 : sort === "share" ? a.population / NATIONAL_POP_MID2025 : a.population;
    const bv = sort === "name" ? b.name : sort === "density" ? b.population / b.areaKm2 : sort === "share" ? b.population / NATIONAL_POP_MID2025 : b.population;
    if (typeof av === "string") return dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    return dir === "asc" ? av - bv : bv - av;
  });
  const arrow = (key) => (sort === key ? (dir === "asc" ? " ▲" : " ▼") : "");
  const body = rows.map((p) => {
    const density = Math.round(p.population / p.areaKm2);
    const share = ((p.population / NATIONAL_POP_MID2025) * 100).toFixed(1);
    return `<tr data-province="${p.name}" tabindex="0"><td>${p.name} <span class="muted">(${p.indonesian})</span></td><td>${p.capital}</td><td>${p.region}</td><td class="num">${p.population.toLocaleString("en-US")}</td><td class="num">${share}%</td><td class="num">${density.toLocaleString("en-US")}</td></tr>`;
  }).join("");
  const sel = state.selectedProvince ? PROVINCES.find((p) => p.name === state.selectedProvince) : null;
  const detail = sel ? (() => {
    const density = Math.round(sel.population / sel.areaKm2);
    const share = ((sel.population / NATIONAL_POP_MID2025) * 100).toFixed(1);
    return `<article class="panel detail" id="province-detail">
      <div class="panel-head"><h2>${sel.name} (${sel.indonesian})</h2><button class="btn" id="detail-close" type="button">Close</button></div>
      <dl class="fact-list wide">
        <div><dt>Capital</dt><dd>${sel.capital}</dd></div>
        <div><dt>Island group</dt><dd>${sel.region}</dd></div>
        <div><dt>Population (mid-2025)</dt><dd>${sel.population.toLocaleString("en-US")} — ${fmtPop(sel.population)}</dd></div>
        <div><dt>Share of Indonesia</dt><dd>${share}% of ${fmtPop(NATIONAL_POP_MID2025)}</dd></div>
        <div><dt>Land area</dt><dd>${sel.areaKm2.toLocaleString("en-US")} km²</dd></div>
        <div><dt>Density</dt><dd>${density.toLocaleString("en-US")} people per km²</dd></div>
      </dl>
      <p>${sel.name === "Jakarta" ? "The densest province by far: more than 16,000 people per km², against a national average of about 149." : sel.region === "Java" ? "One of Java's crowded provinces: Java holds 55.6% of Indonesians on about 7% of the country's land." : "Outside Java, where most of Indonesia's land — and a fifth of its people — lives."}</p>
    </article>`;
  })() : `<p class="hint">Select a province row to see its detail card here.</p>`;
  const groups = ISLAND_GROUPS.map((g) => `<tr><td>${g.group}</td><td class="num">${g.population.toLocaleString("en-US")}</td><td class="num">${g.provinces}</td><td>${g.note}</td></tr>`).join("");
  return `
  <section class="page-head"><p class="eyebrow">Places</p><h1>Regions</h1>
  <p class="lede">38 provinces across seven island groups. Click a column header to sort the table; click a province row to open its detail card. Populations are mid-2025 BPS estimates.</p></section>
  <section class="panel">
    <div class="panel-head"><h2>Largest provinces</h2><span class="muted">12 of 38 shown — the dozen above 5 million people</span></div>
    <div class="table-scroll"><table class="data-table sortable" id="province-table">
      <thead><tr>
        <th><button type="button" data-sort="name">Province${arrow("name")}</button></th>
        <th>Capital</th><th>Island group</th>
        <th><button type="button" data-sort="population">Population${arrow("population")}</button></th>
        <th><button type="button" data-sort="share">Share${arrow("share")}</button></th>
        <th><button type="button" data-sort="density">Density /km²${arrow("density")}</button></th>
      </tr></thead>
      <tbody>${body}</tbody>
    </table></div>
    ${sourceNote("BPS provincial population tables, mid-2025. Density = population ÷ land area. National total 284,438,782 (mid-2025).")}
  </section>
  ${detail}
  <section class="panel">
    <div class="panel-head"><h2>By island group</h2></div>
    <div class="table-scroll"><table class="data-table">
      <thead><tr><th>Island group</th><th>Population</th><th>Provinces</th><th>Note</th></tr></thead>
      <tbody>${groups}</tbody>
    </table></div>
    ${sourceNote("BPS provincial tables, mid-2025; island totals as published by BPS in the 2025 Intercensal Population Survey release.")}
  </section>`;
}

export function renderSources() {
  return `
  <section class="page-head"><p class="eyebrow">Trust</p><h1>Sources &amp; Methods</h1>
  <p class="lede">Every number on NusaStat names its publisher and year. Figures are copied as published — rounded only for display — and the full dataset lives in <code>data.js</code> in this site's own files, so anyone can check it.</p></section>
  <section class="panel">
    <div class="panel-head"><h2>Where each figure comes from</h2></div>
    <div class="table-scroll"><table class="data-table">
      <thead><tr><th>Publisher</th><th>Publication</th><th>What it covers</th></tr></thead>
      <tbody>${SOURCES.map((s) => `<tr><td>${s.publisher}</td><td>${s.publication}</td><td>${s.covers}</td></tr>`).join("")}</tbody>
    </table></div>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>How to read this site</h2></div>
    <ul class="method-list">
      <li><strong>Reference years, not build years.</strong> A figure labelled 2024 is the year the data describes, even though this site was built in November 2026.</li>
      <li><strong>Two population counts.</strong> The World Bank / UN estimate for 2024 is 283.49 million; BPS's civil-registration count is higher (about 285 million). This site uses the World Bank figure for the national total and BPS figures for provinces, and says so on each page.</li>
      <li><strong>Inflation.</strong> The headline 1.57% is December 2024 year-on-year CPI inflation (BPS). The annual average for 2024 was 2.18% (World Bank).</li>
      <li><strong>GDP per capita.</strong> BPS reports US$ 4,960.33; the World Bank series reports US$ 4,942. The difference is the exchange-rate basis, not an error.</li>
      <li><strong>Provinces.</strong> Populations are BPS mid-2025 estimates; the national mid-2025 total is 284,438,782. Density is population divided by land area from the same BPS tables.</li>
      <li><strong>Offline by design.</strong> This site makes no network requests. Its charts are drawn from its own files, so the numbers you see are the numbers in <code>data.js</code> — nothing is fetched, tracked or changed after publication.</li>
    </ul>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>About NusaStat</h2></div>
    <p>NusaStat (“Nusa” from <em>Nusantara</em>, the Indonesian archipelago) is an independent statistics site built for make.fun's “Make the best national statistics site” bounty. It is not affiliated with Statistics Indonesia (BPS) or any government body, and it copies no other site's brand, text or images. All figures are public statistics, cited to their publishers.</p>
  </section>`;
}

export const PAGES = {
  overview: renderOverview,
  population: renderPopulation,
  economy: renderEconomy,
  employment: renderEmployment,
  health: renderHealth,
  education: renderEducation,
  regions: renderRegions,
  sources: renderSources,
};
