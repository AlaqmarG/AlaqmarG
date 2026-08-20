import { C, FONTS, esc, n1, M, card, odometer } from '../kit.mjs';

// Months from Sep 2023. Hi-Fun ran to 17 Apr 2026; RBC and Eterna are both still open.
const ROLES = [
  { name: 'Landvault',     m0: 0,  m1: 6,  lane: 0, color: C.plum,  ghost: true },
  { name: 'Boltable',      m0: 8,  m1: 18, lane: 0, color: C.blue },
  { name: 'Shiloh & Bros', m0: 18, m1: 24, lane: 0, color: C.ochre },
  { name: 'Hi-Fun',        m0: 26, m1: 32, lane: 0, color: C.coral },
  { name: 'Eterna',        m0: 34, m1: 36, lane: 0, color: C.mint, live: true },
  { name: 'RBC',           m0: 28, m1: 36, lane: 1, color: C.mint, live: true },
];
const YEARS = [['2024', 4], ['2025', 16], ['2026', 28]];
const MONTHS = 36, X0 = 92, X1 = 846;
const px = m => X0 + (m / MONTHS) * (X1 - X0);
const LANE_Y = [244, 268], BH = 17;

/** The whole pitch on one card: who, the numbers, and two lanes showing what overlapped. */
export function heroCard(total, shipped) {
  const W = 900, H = 322, L = 48, R = 852;
  const c = card(W, H, 'cardclip');
  const o = [];
  const w = s => o.push(s);

  w(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Alaqmar Gandhi — game developer, platform engineer, live-ops. ${M(total)} lifetime visits across ${shipped} shipped titles, six studios, three years. Landvault, Boltable, Shiloh and Bros and Hi-Fun on the games track; Royal Bank of Canada on the platform track. Hi-Fun overlapped RBC, and Eterna Online and RBC are both current.">`);
  w(`<defs><style>${FONTS}
    .halo{animation:halo 2.6s ease-out infinite}@keyframes halo{0%{r:4;opacity:.55}70%,100%{r:12;opacity:0}}
  </style></defs>`);
  w(c.open);

  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".6s" begin=".15s" fill="freeze"/>
  <text x="${L}" y="46" class="mono" font-size="10" fill="${C.ochre}" letter-spacing="2.6">LIVE-OPS &#183; PLATFORM ENGINEERING &#183; GAME DEVELOPMENT</text>
  <text x="${L}" y="90" class="serif" font-size="38" font-weight="700" fill="${C.ink}" letter-spacing="-.6">Alaqmar Gandhi</text></g>`);

  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".6s" begin=".5s" fill="freeze"/>
  <text x="${L}" y="116" class="sans" font-size="14" fill="${C.ink2}">Recruited by a London studio three weeks before my first university lecture.</text>
  <text x="${L}" y="134" class="sans" font-size="14" fill="${C.ink2}">Still going — six shipped titles, and one game that never came out.</text></g>`);

  w(`<line x1="${L}" y1="156" x2="${R}" y2="156" stroke="${C.line}"/>`);

  const stats = [
    { x: L,   label: 'SHIPPED TITLES',  color: C.mint,  value: String(shipped) },
    { x: 258, label: 'GAME STUDIOS',    color: C.blue,  value: '5' },
    { x: 460, label: 'YEARS SHIPPING',  color: C.ochre, value: '3' },
    { x: 662, label: 'LIFETIME VISITS', color: C.coral, count: total },
  ];
  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".5s" begin=".9s" fill="freeze"/>`);
  for (const s of stats) {
    w(s.count != null
      ? odometer(s.count, { x: s.x, y: 194, cls: 'serif', size: 27, weight: 700, fill: s.color, begin: 1.0, step: 0.08, fmt: M })
      : `<text x="${s.x}" y="194" class="serif" font-size="27" font-weight="700" fill="${s.color}">${s.value}</text>`);
    w(`<text x="${s.x}" y="214" class="mono" font-size="9" fill="${C.ink3}" letter-spacing="1.5">${s.label}</text>`);
  }
  w(`</g>`);

  // concurrency band — everything from the RBC start onward is two roles at once
  const bx = px(28);
  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".5s" begin="2.1s" fill="freeze"/>
  <rect x="${n1(bx)}" y="237" width="${n1(X1 - bx)}" height="${LANE_Y[1] + BH + 6 - 264}" rx="4" fill="${C.coral}" fill-opacity=".07"/>
  <line x1="${n1(bx)}" y1="237" x2="${n1(bx)}" y2="${LANE_Y[1] + BH + 6}" stroke="${C.coral}" stroke-opacity=".35" stroke-dasharray="2 3"/>
  <text x="${n1(bx + 6)}" y="232" class="mono" font-size="8.5" fill="${C.coral}" letter-spacing=".8">two roles at once</text></g>`);

  // lane labels
  w(`<g class="mono" font-size="7.5" fill="${C.ink3}" text-anchor="end" letter-spacing="1">
  <text x="86" y="${LANE_Y[0] + 12}">games</text>
  <text x="86" y="${LANE_Y[1] + 12}">platform</text></g>`);

  ROLES.forEach((r, i) => {
    const x = px(r.m0), bw = px(r.m1) - x - 2, y = LANE_Y[r.lane];
    const t = 1.5 + i * 0.13;
    w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".4s" begin="${n1(t)}s" fill="freeze"/>
    <rect x="${n1(x)}" y="${y}" width="0" height="${BH}" rx="5" fill="${r.color}" fill-opacity=".17" stroke="${r.color}" stroke-opacity=".5"${r.ghost ? ' stroke-dasharray="3 2.5"' : ''}>
      <animate attributeName="width" from="0" to="${n1(bw)}" dur=".55s" begin="${n1(t)}s" fill="freeze"/></rect>
    <text x="${n1(x + 7)}" y="${y + 12.5}" class="sans" font-size="9" font-weight="600" fill="${r.color}">${esc(r.name)}</text></g>`);
  });

  // now marker — both open roles run into it
  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".45s" begin="2.5s" fill="freeze"/>
  <line x1="${X1}" y1="237" x2="${X1}" y2="${LANE_Y[1] + BH + 6}" stroke="${C.coral}" stroke-width="1.5"/>
  <circle cx="${X1}" cy="${LANE_Y[0] + BH / 2}" r="3.5" fill="${C.coral}"/>
  <circle cx="${X1}" cy="${LANE_Y[0] + BH / 2}" r="3.5" fill="none" stroke="${C.coral}" class="halo"/>
  <circle cx="${X1}" cy="${LANE_Y[1] + BH / 2}" r="3.5" fill="${C.coral}"/>
  <circle cx="${X1}" cy="${LANE_Y[1] + BH / 2}" r="3.5" fill="none" stroke="${C.coral}" class="halo"/>
  <text x="${X1}" y="${LANE_Y[1] + BH + 22}" class="mono" font-size="9" fill="${C.coral}" text-anchor="end">now</text></g>`);

  // gridlines at each January, plus an explicit start label — without them the
  // Sep-2023 origin makes the first year look compressed
  const AXIS = LANE_Y[1] + BH + 7;
  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".5s" begin="1.4s" fill="freeze"/>`);
  for (const [, m] of YEARS) w(`<line x1="${n1(px(m))}" y1="237" x2="${n1(px(m))}" y2="${AXIS}" stroke="${C.line}"/>`);
  w(`<line x1="${X0}" y1="${AXIS}" x2="${X1}" y2="${AXIS}" stroke="${C.line}"/>`);
  w(`<g class="mono" font-size="9" fill="${C.ink3}">`);
  w(`<text x="${X0}" y="${AXIS + 15}">Sep 2023</text>`);
  for (const [label, m] of YEARS) w(`<text x="${n1(px(m))}" y="${AXIS + 15}" text-anchor="middle">Jan ${label}</text>`);
  w(`</g></g>`);

  w(c.close);
  w('</svg>');
  return o.join('\n');
}

/**
 * Narrow hero for phones. Not a scaled-down copy — a different layout.
 * The 36-month Gantt is dropped entirely: at 440px it renders bars a few pixels
 * wide with unreadable labels, and the markdown role list below carries the same
 * information. Type is at native size so nothing shrinks below legibility.
 */
export function heroCardNarrow(total, shipped) {
  const W = 440, H = 302, L = 26, R = W - 26;
  const c = card(W, H, 'cardnclip');
  const o = [];
  const w = s => o.push(s);

  w(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Alaqmar Gandhi — live-ops and platform engineering. ${shipped} shipped titles across five studios, three years, ${M(total)} lifetime visits. Two current roles.">`);
  w(`<defs><style>${FONTS}
    .halo{animation:halo 2.6s ease-out infinite}@keyframes halo{0%{r:4;opacity:.55}70%,100%{r:11;opacity:0}}
  </style></defs>`);
  w(c.open);

  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".6s" begin=".15s" fill="freeze"/>
  <text x="${L}" y="40" class="mono" font-size="8.5" fill="${C.ochre}" letter-spacing="2">LIVE-OPS &#183; PLATFORM ENGINEERING</text>
  <text x="${L}" y="80" class="serif" font-size="31" font-weight="700" fill="${C.ink}" letter-spacing="-.4">Alaqmar Gandhi</text>
  <text x="${L}" y="106" class="sans" font-size="12.5" fill="${C.ink2}">Six shipped Roblox titles across five studios,</text>
  <text x="${L}" y="124" class="sans" font-size="12.5" fill="${C.ink2}">and one game that never came out.</text></g>`);

  w(`<line x1="${L}" y1="146" x2="${R}" y2="146" stroke="${C.line}"/>`);

  const cells = [
    { label: 'SHIPPED TITLES', color: C.mint,  value: String(shipped) },
    { label: 'GAME STUDIOS',   color: C.blue,  value: '5' },
    { label: 'YEARS SHIPPING', color: C.ochre, value: '3' },
    { label: 'LIFETIME VISITS', color: C.coral, count: total },
  ];
  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".5s" begin=".8s" fill="freeze"/>`);
  cells.forEach((s, i) => {
    const x = L + (i % 2) * 208, y = 186 + Math.floor(i / 2) * 56;
    w(s.count != null
      ? odometer(s.count, { x, y, cls: 'serif', size: 25, weight: 700, fill: s.color, begin: 0.9, step: 0.08, fmt: M })
      : `<text x="${x}" y="${y}" class="serif" font-size="25" font-weight="700" fill="${s.color}">${s.value}</text>`);
    w(`<text x="${x}" y="${y + 17}" class="mono" font-size="8.5" fill="${C.ink3}" letter-spacing="1.2">${s.label}</text>`);
  });
  w(`</g>`);

  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".5s" begin="1.6s" fill="freeze"/>
  <line x1="${L}" y1="268" x2="${R}" y2="268" stroke="${C.line}"/>
  <circle cx="${L + 5}" cy="288" r="3.4" fill="${C.coral}"/>
  <circle cx="${L + 5}" cy="288" r="3.4" fill="none" stroke="${C.coral}" class="halo"/>
  <text x="${L + 17}" y="291" class="mono" font-size="9.5" fill="${C.ink2}">Sep 2023 &#8594; now &#183; two roles running at once</text></g>`);

  w(c.close);
  w('</svg>');
  return o.join('\n');
}
