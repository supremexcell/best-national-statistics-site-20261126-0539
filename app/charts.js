// charts.js — hand-rolled SVG charts. No libraries, no network: every chart
// is built from the numbers in data.js and drawn as inline SVG.

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function fmtInt(value) {
  return Math.round(value).toLocaleString("en-US");
}

const PALETTE = ["#0e6b6b", "#e8a33d", "#274b73", "#3f9d8a", "#c25e3e", "#7a6aa8", "#5b8c5a", "#a34d6e"];

// Vertical bar chart. points: [{label, value}], highlightIndex marks one bar.
export function barChart(points, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 300;
  const padL = 58;
  const padB = 34;
  const padT = 18;
  const max = Math.max(...points.map((p) => p.value)) * 1.08;
  const min = Math.min(0, ...points.map((p) => p.value));
  const plotH = h - padT - padB;
  const plotW = w - padL - 12;
  const slot = plotW / points.length;
  const barW = Math.min(46, slot * 0.62);
  const y = (v) => padT + plotH - ((v - min) / (max - min)) * plotH;
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || "Bar chart")}" class="chart-svg">`;
  for (let g = 0; g <= 4; g += 1) {
    const v = min + ((max - min) * g) / 4;
    const yy = y(v);
    s += `<line x1="${padL}" y1="${yy}" x2="${w - 12}" y2="${yy}" class="grid-line"/>`;
    s += `<text x="${padL - 8}" y="${yy + 4}" class="axis-label" text-anchor="end">${esc(opts.format ? opts.format(v) : fmtInt(v))}</text>`;
  }
  points.forEach((p, i) => {
    const x = padL + slot * i + (slot - barW) / 2;
    const hot = i === opts.highlightIndex;
    s += `<rect x="${x.toFixed(1)}" y="${y(p.value).toFixed(1)}" width="${barW}" height="${(y(min) - y(p.value)).toFixed(1)}" rx="3" fill="${hot ? "#e8a33d" : PALETTE[i % PALETTE.length]}" class="chart-bar"/>`;
    s += `<text x="${(x + barW / 2).toFixed(1)}" y="${(y(p.value) - 6).toFixed(1)}" class="bar-value" text-anchor="middle">${esc(opts.valueFormat ? opts.valueFormat(p.value) : fmtInt(p.value))}</text>`;
    s += `<text x="${(x + barW / 2).toFixed(1)}" y="${h - 12}" class="axis-label" text-anchor="middle">${esc(p.label)}</text>`;
  });
  return `${s}</svg>`;
}

// Line chart with dots and value labels. points: [{label, value}].
export function lineChart(points, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 300;
  const padL = 58;
  const padB = 34;
  const padT = 22;
  const values = points.map((p) => p.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const lo = min - span * 0.18;
  const hi = max + span * 0.18;
  const plotH = h - padT - padB;
  const plotW = w - padL - 16;
  const x = (i) => padL + (plotW * i) / (points.length - 1);
  const y = (v) => padT + plotH - ((v - lo) / (hi - lo)) * plotH;
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || "Line chart")}" class="chart-svg">`;
  for (let g = 0; g <= 4; g += 1) {
    const v = lo + ((hi - lo) * g) / 4;
    const yy = y(v);
    s += `<line x1="${padL}" y1="${yy}" x2="${w - 16}" y2="${yy}" class="grid-line"/>`;
    s += `<text x="${padL - 8}" y="${yy + 4}" class="axis-label" text-anchor="end">${esc(opts.format ? opts.format(v) : v.toFixed(1))}</text>`;
  }
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  s += `<path d="${d}" fill="none" stroke="#0e6b6b" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    const hot = i === opts.highlightIndex;
    s += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="${hot ? 6.5 : 4.5}" fill="${hot ? "#e8a33d" : "#0e6b6b"}" stroke="#ffffff" stroke-width="2"/>`;
    s += `<text x="${x(i).toFixed(1)}" y="${(y(p.value) - 11).toFixed(1)}" class="bar-value" text-anchor="middle">${esc(opts.valueFormat ? opts.valueFormat(p.value) : p.value.toFixed(2))}</text>`;
    s += `<text x="${x(i).toFixed(1)}" y="${h - 12}" class="axis-label" text-anchor="middle">${esc(p.label)}</text>`;
  });
  return `${s}</svg>`;
}

// Donut chart with a legend. slices: [{label, value}].
export function donutChart(slices, opts = {}) {
  const size = opts.size || 260;
  const r = 100;
  const cx = size / 2;
  const cy = size / 2;
  const total = slices.reduce((a, s2) => a + s2.value, 0);
  let s = `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(opts.label || "Donut chart")}" class="chart-svg donut-svg">`;
  let angle = -90;
  slices.forEach((slice, i) => {
    const frac = slice.value / total;
    const a0 = (angle * Math.PI) / 180;
    const a1 = ((angle + frac * 360) * Math.PI) / 180;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    s += `<path d="M ${cx} ${cy} L ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${PALETTE[i % PALETTE.length]}" stroke="#ffffff" stroke-width="2"/>`;
    angle += frac * 360;
  });
  s += `<circle cx="${cx}" cy="${cy}" r="58" fill="#ffffff"/>`;
  s += `<text x="${cx}" y="${cy - 4}" class="donut-centre" text-anchor="middle">${esc(opts.centre || "")}</text>`;
  s += `<text x="${cx}" y="${cy + 18}" class="donut-centre-sub" text-anchor="middle">${esc(opts.centreSub || "")}</text>`;
  s += "</svg><ul class=\"donut-legend\">";
  slices.forEach((slice, i) => {
    s += `<li><span class="swatch" style="background:${PALETTE[i % PALETTE.length]}"></span><span class="legend-label">${esc(slice.label)}</span><span class="legend-value">${slice.value.toFixed(1)}%</span></li>`;
  });
  return `${s}</ul></div>`;
}

// Horizontal bar list, best for ranked categories (sectors, provinces).
export function hbarList(rows, opts = {}) {
  const max = Math.max(...rows.map((r) => r.value));
  let s = `<div class="hbar-list" role="img" aria-label="${esc(opts.label || "Ranked bars")}">`;
  rows.forEach((row, i) => {
    const pct = (row.value / max) * 100;
    s += `<div class="hbar-row"><div class="hbar-head"><span class="hbar-name">${esc(row.label)}</span><span class="hbar-value">${esc(row.display || row.value.toFixed(1))}</span></div><div class="hbar-track"><div class="hbar-fill" style="width:${pct.toFixed(1)}%;background:${PALETTE[i % PALETTE.length]}"></div></div></div>`;
  });
  return `${s}</div>`;
}
