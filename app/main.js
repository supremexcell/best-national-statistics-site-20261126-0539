// main.js — hash router and control wiring for NusaStat. No network calls:
// every page renders from data.js through views.js.

import { PAGES } from "./views.js";

const NAV = [
  { route: "overview", label: "Overview" },
  { route: "population", label: "Population" },
  { route: "economy", label: "Economy" },
  { route: "employment", label: "Employment & Income" },
  { route: "health", label: "Health" },
  { route: "education", label: "Education" },
  { route: "regions", label: "Regions" },
  { route: "sources", label: "Sources" },
];

// Page state kept across re-renders (year picks, table sort, selected row).
const state = {
  gdpYear: 2024,
  popYear: 2024,
  regionSort: "population",
  regionDir: "desc",
  selectedProvince: null,
};

const view = document.getElementById("view");
const navList = document.getElementById("nav-list");

function renderNav(route) {
  navList.innerHTML = NAV.map(
    (item) => `<li><a href="#/${item.route}"${item.route === route ? ' aria-current="page"' : ""}>${item.label}</a></li>`,
  ).join("");
}

function routeFromHash() {
  const raw = window.location.hash.replace(/^#\/?/, "").split("?")[0];
  return PAGES[raw] ? raw : "overview";
}

function render() {
  const route = routeFromHash();
  renderNav(route);
  view.innerHTML = PAGES[route](state);
  wireControls(route);
  window.scrollTo(0, 0);
  document.title = `NusaStat — ${NAV.find((n) => n.route === route).label} · Indonesia in Numbers`;
}

function wireControls(route) {
  // Year selector on the GDP / growth charts (Overview + Economy).
  const gdpYear = document.getElementById("gdp-year");
  if (gdpYear) {
    gdpYear.addEventListener("change", () => {
      state.gdpYear = Number(gdpYear.value);
      render();
    });
  }
  // Year selector on the population chart.
  const popYear = document.getElementById("pop-year");
  if (popYear) {
    popYear.addEventListener("change", () => {
      state.popYear = Number(popYear.value);
      render();
    });
  }
  // Live search over the indicators table (Overview).
  const search = document.getElementById("indicator-search");
  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      document.querySelectorAll("#indicator-table tbody tr").forEach((row) => {
        const hit = !q || row.dataset.search.includes(q);
        row.hidden = !hit;
        if (hit) shown += 1;
      });
      document.getElementById("indicator-empty").hidden = shown > 0;
    });
  }
  // Sortable province table (Regions).
  document.querySelectorAll("#province-table th button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.sort;
      if (state.regionSort === key) {
        state.regionDir = state.regionDir === "asc" ? "desc" : "asc";
      } else {
        state.regionSort = key;
        state.regionDir = key === "name" ? "asc" : "desc";
      }
      render();
    });
  });
  // Province detail view: click (or Enter on) a row.
  document.querySelectorAll("#province-table tbody tr").forEach((row) => {
    const open = () => {
      state.selectedProvince = row.dataset.province;
      render();
      const detail = document.getElementById("province-detail");
      if (detail) detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };
    row.addEventListener("click", open);
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
  const close = document.getElementById("detail-close");
  if (close) {
    close.addEventListener("click", () => {
      state.selectedProvince = null;
      render();
    });
  }
}

// Mobile nav toggle.
const navToggle = document.getElementById("nav-toggle");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    const open = navList.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navList.addEventListener("click", (event) => {
    if (event.target.closest("a")) navList.classList.remove("open");
  });
}

window.addEventListener("hashchange", render);
render();
