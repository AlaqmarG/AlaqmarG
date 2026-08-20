import { C, FONTS, esc, n1, backdrop, frame, heading } from '../kit.mjs';

const comma = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const RANK = [C.gold, '#C9D4E2', '#CE8F5F', C.faint, C.faint, C.faint];
const ORD = ['1ST', '2ND', '3RD', '4TH', '5TH', '6TH'];

/** Shipped titles as an arcade high-score table, scores counting up to live values. */
export function scores(games, unshipped, stamp) {
  const W = 900, X0 = 44, X1 = 872, STEP = 48;
  const rows = [...games].sort((a, b) => b.visits - a.visits);
  const divY = 130 + rows.length * STEP + 6;
  const H = divY + 48 + (unshipped.length - 1) * 32 + 34;
  const max = rows[0].visits;
  const f = frame(W, H, 'scoreclip');
  const o = [];
  const w = s => o.push(s);

  w(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="High scores: shipped Roblox titles ranked by lifetime visits, plus two projects with no score.">`);
  w(`<defs><style>${FONTS}
    .flick{animation:flick 1.4s steps(1) infinite}@keyframes flick{0%,60%{opacity:1}61%,100%{opacity:.25}}
  </style></defs>`);
  w(f.open);
  w(backdrop(W, H, 5150, { stars: 55, id: 'sc' }));
  w(heading(30, 40, 'HIGH SCORES', 'Shipped', `lifetime visits · pulled live from the Roblox API on ${stamp}`, C.gold));
  w(`<g class="mono" font-size="9.5"><circle cx="806" cy="36" r="3.5" fill="${C.emerald}" class="flick"/><text x="818" y="40" fill="${C.emerald}" letter-spacing="1.6">LIVE</text></g>`);

  rows.forEach((g, i) => {
    const cy = 130 + i * STEP, begin = 0.45 + i * 0.16;
    const barW = (g.visits / max) * (X1 - X0);
    // count-up odometer
    const N = 10, odo = [];
    for (let k = 1; k <= N; k++) {
      const v = comma(g.visits * (1 - Math.pow(1 - k / N, 3)));
      const t = (begin + 0.28 + k * 0.075).toFixed(2);
      const last = k === N;
      odo.push(`<text x="${X1}" y="${cy + 4}" class="mono" font-size="20" font-weight="700" fill="${g.color}" text-anchor="end" opacity="0">${v}<animate attributeName="opacity" ${last ? `to="1" begin="${t}s" dur=".1s" fill="freeze"` : `values="1;1" begin="${t}s" dur=".075s"`}/></text>`);
    }
    w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".4s" begin="${n1(begin)}s" fill="freeze"/>
    <text x="${X0}" y="${cy + 3}" class="mono" font-size="12" font-weight="700" fill="${RANK[i]}" letter-spacing="1.2">${ORD[i]}</text>
    <text x="${X0 + 54}" y="${cy - 2}" class="sans" font-size="15" font-weight="700" fill="${C.text}">${esc(g.name)}</text>
    <text x="${X0 + 54}" y="${cy + 13}" class="mono" font-size="9.5" fill="${C.faint}">${esc(g.studio)}</text>
    ${odo.join('')}
    <rect x="${X0}" y="${cy + 20}" width="${X1 - X0}" height="3" rx="1.5" fill="${C.rail}"/>
    <rect x="${X0}" y="${cy + 20}" width="0" height="3" rx="1.5" fill="${g.color}" fill-opacity=".85">
      <animate attributeName="width" from="0" to="${n1(barW)}" dur="1.05s" begin="${n1(begin)}s" fill="freeze" calcMode="spline" keySplines=".16 1 .3 1" keyTimes="0;1" values="0;${n1(barW)}"/></rect></g>`);
  });

  const dy = divY;
  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".6s" begin="2.4s" fill="freeze"/>
  <line x1="${X0}" y1="${dy}" x2="${X1}" y2="${dy}" stroke="${C.edge}" stroke-dasharray="4 5"/>
  <text x="${X0}" y="${dy + 21}" class="mono" font-size="9" fill="${C.faint}" letter-spacing="2">NO SCORE — REAL WORK, ZERO PLAYERS</text></g>`);

  unshipped.forEach((u, i) => {
    const cy = dy + 48 + i * 32, begin = 2.7 + i * 0.22;
    w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".5s" begin="${n1(begin)}s" fill="freeze"/>
    <text x="${X0}" y="${cy + 3}" class="mono" font-size="12" font-weight="700" fill="${C.faint}">—</text>
    <text x="${X0 + 54}" y="${cy + 3}" class="sans" font-size="14" font-weight="600" fill="#A9B4C6">${esc(u.name)}</text>
    <text x="${X0 + 210}" y="${cy + 3}" class="mono" font-size="9.5" fill="${C.faint}">${esc(u.studio)} · ${esc(u.note)}</text>
    <text x="${X1}" y="${cy + 3}" class="mono" font-size="12" fill="${u.color}" fill-opacity=".8" text-anchor="end" letter-spacing="1.4">${esc(u.status.toUpperCase())}</text></g>`);
  });

  w(f.close);
  w('</svg>');
  return o.join('\n');
}
