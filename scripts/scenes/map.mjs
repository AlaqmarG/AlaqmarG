import { C, FONTS, esc, backdrop, frame, heading } from '../kit.mjs';

const MAIN = 'M100,320 C160,320 185,200 245,200 C305,200 330,320 390,320 C450,320 475,200 535,200 C580,200 597,230 620,260';
const UP   = 'M620,260 C665,240 685,150 735,150 C792,150 820,210 855,255';
const DOWN = 'M620,260 C665,290 685,365 735,365 C792,365 820,300 855,255';

const STOPS = [
  { n: '01', x: 100, y: 320, year: '2023', name: 'Landvault',     note: 'never shipped',  color: C.violet,  at: 0.35, ghost: true },
  { n: '02', x: 245, y: 200, year: '2024', name: 'Boltable',      note: '241M visits',    color: C.cyan,    at: 0.95 },
  { n: '03', x: 390, y: 320, year: '2025', name: 'Shiloh & Bros', note: '4.5M visits',    color: C.lime,    at: 1.60 },
  { n: '04', x: 535, y: 200, year: '2025', name: 'Hi-Fun',        note: '13.9M visits',   color: C.rose,    at: 2.25 },
  { n: '05', x: 735, y: 150, year: '2026', name: 'RBC',           note: 'AI governance',  color: C.amber,   at: 3.50 },
  { n: '06', x: 735, y: 365, year: '2026', name: 'Eterna Online', note: 'MMO RPG',        color: C.emerald, at: 3.50 },
];

/** Career as a level-select map: the path draws itself, stations unlock in order. */
export function map() {
  const W = 900, H = 462;
  const f = frame(W, H, 'mapclip');
  const o = [];
  const w = s => o.push(s);

  w(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Career map: Landvault 2023, Boltable 2024, Shiloh and Bros 2025, Hi-Fun 2025, then the path forks into Royal Bank of Canada and Eterna Online, both running now.">`);
  w(`<defs><style>${FONTS}
    .pop{animation:pop 2.6s ease-out infinite}@keyframes pop{0%{opacity:.55}70%,100%{opacity:0}}
  </style></defs>`);
  w(f.open);
  w(backdrop(W, H, 77120, { stars: 60, id: 'map' }));
  w(heading(30, 40, 'CHAPTER SELECT', 'The run', 'six studios · three years · one that never shipped', C.violet));

  // the road: a dim bed, then a bright stroke drawing over it
  for (const [d, begin, dur] of [[MAIN, 0.3, 2.6], [UP, 2.9, 1.0], [DOWN, 2.9, 1.0]]) {
    w(`<path d="${d}" pathLength="100" fill="none" stroke="${C.rail}" stroke-width="7" stroke-linecap="round"/>`);
    w(`<path d="${d}" pathLength="100" fill="none" stroke="${C.cyan}" stroke-opacity=".55" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100">
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="${dur}s" begin="${begin}s" fill="freeze"/></path>`);
    w(`<circle r="4" fill="#EAF6FF"><animateMotion path="${d}" dur="${dur}s" begin="${begin}s" fill="freeze"/></circle>`);
  }

  // fork labels
  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".5s" begin="3.1s" fill="freeze"/>
  <text x="622" y="226" class="mono" font-size="9" fill="${C.amber}" fill-opacity=".75" letter-spacing="1.6">PLATFORM</text>
  <text x="622" y="300" class="mono" font-size="9" fill="${C.emerald}" fill-opacity=".75" letter-spacing="1.6">GAMES</text></g>`);

  for (const s of STOPS) {
    const x = s.x - 30, y = s.y - 30;
    w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".45s" begin="${s.at}s" fill="freeze"/>
    <circle cx="${s.x}" cy="${s.y}" r="30" fill="none" stroke="${s.color}" stroke-width="2" class="pop" style="animation-delay:${s.at}s"/>
    <rect x="${x}" y="${y}" width="60" height="60" rx="15" fill="${C.panel}" stroke="${s.color}" stroke-opacity=".7"${s.ghost ? ' stroke-dasharray="5 4"' : ''}/>
    <rect x="${x + 5}" y="${y + 5}" width="50" height="50" rx="11" fill="none" stroke="${s.color}" stroke-opacity=".16"/>
    <text x="${s.x}" y="${s.y + 7}" class="sans" font-size="20" font-weight="800" fill="${s.color}" text-anchor="middle">${s.n}</text>
    <text x="${s.x}" y="${s.y - 42}" class="mono" font-size="9" fill="${C.faint}" text-anchor="middle" letter-spacing="1.8">${s.year}</text>
    <text x="${s.x}" y="${s.y + 48}" class="sans" font-size="12.5" font-weight="700" fill="${C.text}" text-anchor="middle">${esc(s.name)}</text>
    <text x="${s.x}" y="${s.y + 63}" class="mono" font-size="9.5" fill="${s.ghost ? C.faint : C.dim}" text-anchor="middle">${esc(s.note)}</text></g>`);
  }

  // you are here
  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".5s" begin="3.95s" fill="freeze"/>
  <circle cx="855" cy="255" r="6" fill="${C.emerald}"/>
  <circle cx="855" cy="255" r="6" fill="none" stroke="${C.emerald}" class="pop" style="animation-delay:3.95s"/>
  <text x="855" y="232" class="mono" font-size="9.5" fill="${C.emerald}" text-anchor="middle" letter-spacing="1.6">NOW</text></g>`);

  // legend
  w(`<g class="mono" font-size="9" fill="${C.faint}">
  <rect x="742" y="34" width="9" height="9" rx="3" fill="none" stroke="${C.violet}" stroke-opacity=".7" stroke-dasharray="3 2"/>
  <text x="757" y="42">dashed = never shipped</text></g>`);

  w(f.close);
  w('</svg>');
  return o.join('\n');
}
