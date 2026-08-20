#!/usr/bin/env node
/**
 * Regenerates every animated SVG in assets/ from live Roblox data.
 * No dependencies. Falls back to the baked-in figures in data.mjs if the API is unreachable.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { GAMES, UNSHIPPED, ROLES, PALETTE as P } from './data.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const M = n => (n / 1e6).toFixed(1) + 'M';
const n1 = x => Number(x).toFixed(1);

async function refresh() {
  const ids = GAMES.map(g => g.universeId).join(',');
  try {
    const res = await fetch(`https://games.roblox.com/v1/games?universeIds=${ids}`, {
      headers: { 'accept': 'application/json' }, signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { data } = await res.json();
    let hits = 0;
    for (const row of data ?? []) {
      const g = GAMES.find(x => x.universeId === row.id);
      if (g && Number.isFinite(row.visits)) { g.visits = row.visits; hits++; }
    }
    console.log(`roblox api: refreshed ${hits}/${GAMES.length} titles`);
  } catch (err) {
    console.warn(`roblox api unavailable (${err.message}) — using baked-in figures`);
  }
}

const FONTS = `.mono{font-family:ui-monospace,"SF Mono",Menlo,Consolas,"Courier New",monospace}
.sans{font-family:ui-sans-serif,-apple-system,"Segoe UI",Inter,Helvetica,Arial,sans-serif}`;

/* ------------------------------------------------------------------ hero */
function hero(total) {
  // odometer: eased frames counting up to the live total
  const N = 11, frames = [];
  for (let i = 1; i <= N; i++) {
    const p = 1 - Math.pow(1 - i / N, 3);
    frames.push(M(total * p).padStart(6, ' '));
  }
  const odo = frames.map((v, i) => {
    const t = (3.6 + i * 0.1).toFixed(2);
    const last = i === N - 1;
    const anim = last
      ? `<animate attributeName="opacity" to="1" begin="${t}s" dur="0.1s" fill="freeze"/>`
      : `<animate attributeName="opacity" values="1;1" begin="${t}s" dur="0.10s"/>`;
    return `      <text x="672" y="296" fill="#FBBF24" opacity="0" xml:space="preserve">${v}${anim}</text>`;
  }).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="320" viewBox="0 0 900 320" role="img" aria-label="Alaqmar Gandhi — Game Developer, Platform Engineer, Live-Ops. 3 years shipping, 6 studios, 6 shipped titles, ${M(total)} lifetime visits.">
<defs>
  <linearGradient id="nameGrad" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#22D3EE"/><stop offset="35%" stop-color="#A78BFA"/>
    <stop offset="70%" stop-color="#34D399"/><stop offset="100%" stop-color="#22D3EE"/>
    <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="1 0" dur="6s" repeatCount="indefinite"/>
  </linearGradient>
  <linearGradient id="scan" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#22D3EE" stop-opacity="0"/>
    <stop offset="50%" stop-color="#22D3EE" stop-opacity="0.10"/>
    <stop offset="100%" stop-color="#22D3EE" stop-opacity="0"/>
  </linearGradient>
  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
    <path d="M30 0H0V30" fill="none" stroke="${P.line}" stroke-width="1"/>
  </pattern>
  <clipPath id="panelClip"><rect x="1" y="1" width="898" height="318" rx="16"/></clipPath>
  <clipPath id="typeCmd"><rect x="0" y="58" width="0" height="32"><animate attributeName="width" dur="0.85s" begin="0.3s" fill="freeze" calcMode="discrete" values="0;30;48;66;84;102;120;138;156;174;198"/></rect></clipPath>
  <clipPath id="typeRole"><rect x="0" y="176" width="0" height="30"><animate attributeName="width" from="0" to="540" dur="1.5s" begin="2.0s" fill="freeze"/></rect></clipPath>
  <style>${FONTS}
    .blink{animation:blink 1.06s step-end infinite}@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
    .breathe{animation:breathe 3.4s ease-in-out infinite}@keyframes breathe{0%,100%{opacity:.5}50%{opacity:1}}
  </style>
</defs>
<g clip-path="url(#panelClip)">
  <rect width="900" height="320" fill="${P.bg}"/>
  <rect width="900" height="320" fill="url(#grid)"/>
  <rect x="-100" y="-120" width="1100" height="120" fill="url(#scan)">
    <animate attributeName="y" from="-120" to="320" dur="5.5s" repeatCount="indefinite"/>
  </rect>
  <rect x="0" y="0" width="900" height="34" fill="${P.chrome}"/>
  <line x1="0" y1="34" x2="900" y2="34" stroke="${P.line}"/>
  <circle cx="22" cy="17" r="5" fill="#FB7185"/><circle cx="40" cy="17" r="5" fill="#FBBF24"/><circle cx="58" cy="17" r="5" fill="#34D399"/>
  <text x="82" y="21" class="mono" font-size="11.5" fill="${P.mute}">alaqmar@career — zsh</text>
  <g class="breathe"><circle cx="826" cy="17" r="3.5" fill="#34D399"/><text x="838" y="21" class="mono" font-size="11" fill="#34D399">LIVE</text></g>

  <text x="30" y="80" class="mono" font-size="14" fill="#34D399">~ $</text>
  <g clip-path="url(#typeCmd)"><text x="64" y="80" class="mono" font-size="14" fill="${P.text}">whoami --verbose</text></g>
  <rect x="205" y="68" width="8" height="15" fill="#22D3EE" class="blink"/>

  <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.8s" begin="1.25s" fill="freeze"/>
    <text x="30" y="152" class="sans" font-size="54" font-weight="800" letter-spacing="-1.5" fill="none" stroke="#22D3EE" stroke-opacity=".18" stroke-width="6" stroke-linejoin="round">ALAQMAR GANDHI</text>
    <text x="30" y="152" class="sans" font-size="54" font-weight="800" letter-spacing="-1.5" fill="url(#nameGrad)">ALAQMAR GANDHI</text>
  </g>

  <g clip-path="url(#typeRole)">
    <text x="31" y="196" class="mono" font-size="16.5" fill="${P.dim}">Game Developer<tspan fill="#2F3846"> · </tspan><tspan fill="#A78BFA">Platform Engineer</tspan><tspan fill="#2F3846"> · </tspan><tspan fill="#34D399">Live-Ops</tspan></text>
  </g>

  <g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="3.4s" fill="freeze"/>
    <line x1="30" y1="228" x2="870" y2="228" stroke="${P.line}"/>
    <g class="mono" font-size="10.5" fill="${P.mute}" letter-spacing="1.4">
      <text x="30" y="258">YEARS SHIPPING</text><text x="242" y="258">STUDIOS</text>
      <text x="440" y="258">SHIPPED TITLES</text><text x="672" y="258">LIFETIME VISITS</text>
    </g>
    <g class="sans" font-size="34" font-weight="700">
      <text x="30" y="296" fill="#22D3EE">3</text><text x="242" y="296" fill="#A78BFA">6</text><text x="440" y="296" fill="#34D399">${GAMES.length}</text>
${odo}
    </g>
  </g>
</g>
<rect x="0.5" y="0.5" width="899" height="319" rx="16" fill="none" stroke="${P.edge}"/>
</svg>`;
}

/* -------------------------------------------------------------- timeline */
function timeline() {
  const X0 = 380, X1 = 880, MONTHS = 36, S = (X1 - X0) / MONTHS;
  const x = m => X0 + m * S;
  const SWEEP = 4.6, LEAD = 0.7;
  const t = px => LEAD + (px - X0) / (X1 - X0) * SWEEP;
  const o = [];
  const w = s => o.push(s);

  w(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="452" viewBox="0 0 900 452" role="img" aria-label="Career timeline September 2023 to now: Landvault, Boltable Studio, Shiloh and Bros, Hi-Fun Interactive, Eterna Online, Royal Bank of Canada.">
<defs>
  <pattern id="hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="#A78BFA" stroke-width="2.5" stroke-opacity="0.35"/></pattern>
  <linearGradient id="head" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#22D3EE" stop-opacity="0"/><stop offset="18%" stop-color="#22D3EE" stop-opacity=".9"/><stop offset="82%" stop-color="#22D3EE" stop-opacity=".9"/><stop offset="100%" stop-color="#22D3EE" stop-opacity="0"/></linearGradient>
  <clipPath id="clip"><rect x="1" y="1" width="898" height="450" rx="16"/></clipPath>
  <style>${FONTS}
    .pulse{animation:pulse 2s ease-in-out infinite}@keyframes pulse{0%,100%{opacity:.35}50%{opacity:1}}
  </style>
</defs>
<g clip-path="url(#clip)">
<rect width="900" height="452" fill="${P.bg}"/>
<text x="30" y="42" class="sans" font-size="20" font-weight="700" fill="${P.text}">The Run</text>
<text x="30" y="62" class="mono" font-size="11.5" fill="${P.mute}">36 months · 6 studios · recruited before the first lecture</text>
<g class="mono" font-size="10" fill="${P.mute}">
  <rect x="686" y="30" width="10" height="10" rx="2" fill="#22D3EE" opacity=".85"/><text x="702" y="39">shipped</text>
  <rect x="778" y="30" width="10" height="10" rx="2" fill="url(#hatch)" stroke="#A78BFA" stroke-opacity=".5" stroke-dasharray="2 2"/><text x="794" y="39">never shipped</text>
</g>`);

  for (const [label, m] of [['2023', 0], ['2024', 4], ['2025', 16], ['2026', 28]]) {
    const gx = n1(x(m));
    w(`<line x1="${gx}" y1="86" x2="${gx}" y2="404" stroke="${P.line}" stroke-dasharray="3 5"/>`);
    w(`<text x="${gx}" y="424" class="mono" font-size="10.5" fill="#4B5563" text-anchor="middle">${label}</text>`);
  }
  w(`<line x1="${X0}" y1="404" x2="${X1}" y2="404" stroke="${P.line}"/>`);
  w(`<text x="30" y="94" class="mono" font-size="10" fill="${P.faint}" letter-spacing="2">GAMES · LIVE-OPS</text><line x1="150" y1="90" x2="350" y2="90" stroke="${P.line}"/>`);
  w(`<text x="30" y="346" class="mono" font-size="10" fill="${P.faint}" letter-spacing="2">PLATFORM · ENGINEERING</text><line x1="196" y1="342" x2="350" y2="342" stroke="${P.line}"/>`);

  ROLES.forEach((r, i) => {
    const cy = i < 5 ? 122 + i * 46 : 374;
    const b0 = x(r.m0), b1 = x(r.m1), bw = b1 - b0, by = cy - 11;
    const ts = t(b0), te = t(b1), dur = Math.max(te - ts, 0.2);
    w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".45s" begin="${n1(ts)}s" fill="freeze"/>
  <rect x="30" y="${cy - 9}" width="4" height="18" rx="2" fill="${r.color}"/>
  <text x="46" y="${cy - 1}" class="sans" font-size="13.5" font-weight="600" fill="${P.text}">${esc(r.co)}</text>
  <text x="46" y="${cy + 13}" class="mono" font-size="9" fill="${P.mute}">${esc(r.role)}  ·  ${esc(r.dates)}</text></g>`);
    w(`<rect x="${X0}" y="${by + 7}" width="${X1 - X0}" height="8" rx="4" fill="#12161F"/>`);
    const fill = r.ghost
      ? `fill="url(#hatch)" stroke="${r.color}" stroke-opacity=".55" stroke-dasharray="4 3"`
      : `fill="${r.color}" fill-opacity=".92"`;
    w(`<rect x="${n1(b0)}" y="${by}" width="0" height="22" rx="7" ${fill}><animate attributeName="width" from="0" to="${n1(bw)}" dur="${n1(dur)}s" begin="${n1(ts)}s" fill="freeze"/></rect>`);
    const mx = r.after ? b1 + 12 : b0 - 12;
    w(`<text x="${n1(mx)}" y="${cy + 4}" class="mono" font-size="10.5" fill="${P.dim}" text-anchor="${r.after ? 'start' : 'end'}" opacity="0">${esc(r.metric)}<animate attributeName="opacity" from="0" to="1" dur=".5s" begin="${n1(te)}s" fill="freeze"/></text>`);
  });

  const o0 = x(28), o1 = x(36);
  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".6s" begin="${n1(LEAD + SWEEP + 0.3)}s" fill="freeze"/>
  <rect x="${n1(o0)}" y="249" width="${n1(o1 - o0)}" height="141" rx="6" fill="#FBBF24" fill-opacity=".05" stroke="#FBBF24" stroke-opacity=".28" stroke-dasharray="3 3"/>
  <text x="876" y="242" class="mono" font-size="9.5" fill="#FBBF24" fill-opacity=".8" text-anchor="end">two jobs, no classes</text></g>`);
  w(`<rect x="${X0}" y="86" width="2" height="318" fill="url(#head)"><animate attributeName="x" from="${X0}" to="${X1}" dur="${SWEEP}s" begin="${LEAD}s" fill="freeze"/></rect>`);
  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".5s" begin="${n1(LEAD + SWEEP)}s" fill="freeze"/>
  <line x1="${X1}" y1="86" x2="${X1}" y2="404" stroke="#34D399" stroke-width="1.5" stroke-opacity=".7"/>
  <circle cx="${X1}" cy="86" r="4" fill="#34D399" class="pulse"/>
  <text x="${X1}" y="76" class="mono" font-size="10" fill="#34D399" text-anchor="end" letter-spacing="1.5">NOW</text></g>`);
  w(`</g><rect x="0.5" y="0.5" width="899" height="451" rx="16" fill="none" stroke="${P.edge}"/></svg>`);
  return o.join('\n');
}


/* ------------------------------------------------------------- portfolio */
function portfolio(total, stamp) {
  const BX0 = 270, BX1 = 800, VX = 870;
  const rows = [...GAMES].sort((a, b) => b.visits - a.visits);
  const max = rows[0].visits;
  const o = [];
  const w = s => o.push(s);

  w(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="520" viewBox="0 0 900 520" role="img" aria-label="Shipped Roblox titles by lifetime visits, ${M(total)} across ${rows.length} titles, plus two unshipped projects.">
<defs>
  <clipPath id="pclip"><rect x="1" y="1" width="898" height="518" rx="16"/></clipPath>
  <style>${FONTS}
    .pulse{animation:pulse 2.4s ease-in-out infinite}@keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
  </style>
</defs>
<g clip-path="url(#pclip)">
<rect width="900" height="520" fill="${P.bg}"/>
<text x="30" y="42" class="sans" font-size="20" font-weight="700" fill="${P.text}">Shipped</text>
<text x="30" y="62" class="mono" font-size="11.5" fill="${P.mute}">lifetime visits · read live from the Roblox API on ${stamp}</text>
<g class="pulse"><circle cx="838" cy="37" r="3.5" fill="#34D399"/><text x="850" y="41" class="mono" font-size="10" fill="#34D399">LIVE</text></g>
<line x1="30" y1="82" x2="870" y2="82" stroke="${P.line}"/>`);

  rows.forEach((g, i) => {
    const cy = 116 + i * 46, bw = (g.visits / max) * (BX1 - BX0);
    const begin = 0.35 + i * 0.13, dur = 1.05;
    w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".4s" begin="${n1(begin)}s" fill="freeze"/>
  <rect x="30" y="${cy - 9}" width="4" height="18" rx="2" fill="${g.color}"/>
  <text x="46" y="${cy - 1}" class="sans" font-size="14" font-weight="600" fill="${P.text}">${esc(g.name)}</text>
  <text x="46" y="${cy + 13}" class="mono" font-size="9.5" fill="${P.mute}">${esc(g.studio)}</text></g>`);
    w(`<rect x="${BX0}" y="${cy - 8}" width="${BX1 - BX0}" height="16" rx="8" fill="#12161F"/>`);
    w(`<rect x="${BX0}" y="${cy - 8}" width="0" height="16" rx="8" fill="${g.color}" fill-opacity=".92"><animate attributeName="width" from="0" to="${n1(bw)}" dur="${dur}s" begin="${n1(begin)}s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1" keyTimes="0;1" values="0;${n1(bw)}"/></rect>`);
    w(`<text x="${VX}" y="${cy + 5}" class="mono" font-size="15" font-weight="600" fill="${g.color}" text-anchor="end" opacity="0">${M(g.visits)}<animate attributeName="opacity" from="0" to="1" dur=".45s" begin="${n1(begin + dur)}s" fill="freeze"/></text>`);
  });

  const dy = 116 + rows.length * 46 - 8;
  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".6s" begin="2.2s" fill="freeze"/>
  <line x1="30" y1="${dy}" x2="870" y2="${dy}" stroke="${P.line}" stroke-dasharray="4 4"/>
  <text x="30" y="${dy + 22}" class="mono" font-size="9.5" fill="${P.faint}" letter-spacing="1.6">REAL WORK, ZERO VISITS — ON THE BOARD ON PURPOSE</text></g>`);

  UNSHIPPED.forEach((u, i) => {
    const cy = dy + 54 + i * 44, begin = 2.5 + i * 0.25;
    w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".5s" begin="${n1(begin)}s" fill="freeze"/>
  <rect x="30" y="${cy - 9}" width="4" height="18" rx="2" fill="${u.color}" fill-opacity=".45"/>
  <text x="46" y="${cy - 1}" class="sans" font-size="14" font-weight="600" fill="#9AA4B2">${esc(u.name)}</text>
  <text x="46" y="${cy + 13}" class="mono" font-size="9.5" fill="${P.faint}">${esc(u.studio)}</text>
  <rect x="${BX0}" y="${cy - 8}" width="${760 - BX0}" height="16" rx="8" fill="none" stroke="${u.color}" stroke-opacity=".3" stroke-dasharray="5 4"/>
  <text x="${BX0 + 12}" y="${cy + 4}" class="mono" font-size="9.5" fill="${P.mute}">${esc(u.note)}</text>
  <text x="${VX}" y="${cy + 5}" class="mono" font-size="11.5" fill="${u.color}" fill-opacity=".7" text-anchor="end">${esc(u.status)}</text></g>`);
  });

  w(`</g><rect x="0.5" y="0.5" width="899" height="519" rx="16" fill="none" stroke="${P.edge}"/></svg>`);
  return o.join('\n');
}


/* --------------------------------------------------------------- pipeline */
function pipeline() {
  const NODES = [
    { t: 'merge to main',       s: 'PR review',           c: '#A78BFA' },
    { t: 'GitHub Actions',      s: 'roblox-ts · DarkLua', c: '#22D3EE' },
    { t: 'Mantle · Open Cloud', s: 'publish, no Studio',  c: '#34D399' },
    { t: 'live places',         s: 'players hit it',      c: '#FBBF24' },
    { t: 'telemetry',           s: '.NET ingest · funnel', c: '#FB7185' },
  ];
  const BW = 144, GAP = 25, X = 40, CY = 120;
  const cx = i => X + i * (BW + GAP) + BW / 2;
  const first = cx(0), last = cx(NODES.length - 1);
  const o = [];
  const w = s => o.push(s);

  w(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="300" viewBox="0 0 900 300" role="img" aria-label="The loop: merge to main, GitHub Actions build, Mantle and Open Cloud publish, live places, telemetry and funnel analytics, feeding back into what ships next.">
<defs><clipPath id="lclip"><rect x="1" y="1" width="898" height="298" rx="16"/></clipPath>
<style>${FONTS}</style></defs>
<g clip-path="url(#lclip)">
<rect width="900" height="300" fill="${P.bg}"/>
<text x="30" y="42" class="sans" font-size="20" font-weight="700" fill="${P.text}">How a change reaches players</text>
<text x="30" y="62" class="mono" font-size="11.5" fill="${P.mute}">the loop I build and operate — ship, measure, decide, ship again</text>`);

  // rail + travelling packets, drawn first so the cards occlude them
  w(`<line x1="${first}" y1="${CY}" x2="${last}" y2="${CY}" stroke="#1E2532" stroke-width="2"/>`);
  for (let k = 0; k < 3; k++) {
    w(`<circle r="3.5" fill="#22D3EE" opacity=".95"><animateMotion path="M${first},${CY} H${last}" dur="4s" begin="${(k * 1.33).toFixed(2)}s" repeatCount="indefinite"/></circle>`);
  }
  // chevrons in the gaps
  for (let i = 0; i < NODES.length - 1; i++) {
    const gx = X + i * (BW + GAP) + BW + GAP / 2;
    w(`<path d="M${gx - 3},${CY - 4} l4,4 l-4,4" fill="none" stroke="#3A4456" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`);
  }
  NODES.forEach((n, i) => {
    const bx = X + i * (BW + GAP);
    w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".5s" begin="${(0.25 + i * 0.18).toFixed(2)}s" fill="freeze"/>
  <rect x="${bx}" y="${CY - 30}" width="${BW}" height="60" rx="10" fill="#121722" stroke="${n.c}" stroke-opacity=".45"/>
  <rect x="${bx}" y="${CY - 30}" width="3" height="60" rx="1.5" fill="${n.c}"/>
  <text x="${bx + 14}" y="${CY - 5}" class="mono" font-size="10" font-weight="600" fill="${P.text}">${esc(n.t)}</text>
  <text x="${bx + 14}" y="${CY + 11}" class="mono" font-size="8.5" fill="${P.mute}">${esc(n.s)}</text></g>`);
  });

  // feedback arc back to the top of the loop
  const arc = `M${last},152 C${last},235 640,248 450,248 C260,248 ${first},235 ${first},152`;
  w(`<path d="${arc}" fill="none" stroke="#1E2532" stroke-width="2" stroke-dasharray="5 5"/>`);
  w(`<path d="M${first - 4},158 l4,-6 l4,6" fill="none" stroke="#3A4456" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`);
  for (let k = 0; k < 2; k++) {
    w(`<circle r="3" fill="#FB7185" opacity=".9"><animateMotion path="${arc}" dur="5s" begin="${(1 + k * 2.5).toFixed(2)}s" repeatCount="indefinite"/></circle>`);
  }
  w(`<text x="450" y="272" class="mono" font-size="10" fill="${P.faint}" text-anchor="middle" letter-spacing="1.2">WHAT THE NUMBERS SAY SHIPS NEXT</text>`);
  w(`</g><rect x="0.5" y="0.5" width="899" height="299" rx="16" fill="none" stroke="${P.edge}"/></svg>`);
  return o.join('\n');
}

await refresh();
const total = GAMES.reduce((a, g) => a + g.visits, 0);
mkdirSync('assets', { recursive: true });
writeFileSync('assets/hero.svg', hero(total));
writeFileSync('assets/timeline.svg', timeline());
const stamp = new Date().toISOString().slice(0, 10);
writeFileSync('assets/portfolio.svg', portfolio(total, stamp));
writeFileSync('assets/pipeline.svg', pipeline());
console.log(`wrote hero, timeline, portfolio, pipeline — ${M(total)} lifetime visits (${stamp})`);
