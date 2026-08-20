import { C, FONTS, esc, n1, M, card, odometer } from '../kit.mjs';

const RUN = [
  { name: 'Landvault',     year: '2023', ghost: true },
  { name: 'Boltable',      year: '2024' },
  { name: 'Shiloh & Bros', year: '2025' },
  { name: 'Hi-Fun',        year: '2025' },
  { name: 'RBC',           year: '2026' },
  { name: 'Eterna',        year: '2026' },
];

/** The whole pitch on one card: who, the numbers, and the run. Nothing below the fold. */
export function heroCard(total, shipped) {
  const W = 900, H = 332, L = 56, R = 844;
  const NX0 = 78, NX1 = 790, END = 838;
  const gap = (NX1 - NX0) / (RUN.length - 1);
  const c = card(W, H, 'cardclip');
  const o = [];
  const w = s => o.push(s);

  w(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Alaqmar Gandhi — game developer, platform engineer, live-ops. ${M(total)} lifetime visits across ${shipped} shipped titles, six studios, three years: Landvault, Boltable, Shiloh and Bros, Hi-Fun, RBC, Eterna.">`);
  w(`<defs><style>${FONTS}
    .halo{animation:halo 2.6s ease-out infinite}@keyframes halo{0%{r:5;opacity:.5}70%,100%{r:14;opacity:0}}
  </style></defs>`);
  w(c.open);

  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".6s" begin=".15s" fill="freeze"/>
  <text x="${L}" y="58" class="mono" font-size="10" fill="${C.ochre}" letter-spacing="2.6">GAME DEVELOPER &#183; PLATFORM ENGINEER &#183; LIVE-OPS</text>
  <text x="${L}" y="106" class="serif" font-size="44" font-weight="700" fill="${C.ink}" letter-spacing="-.6">Alaqmar Gandhi</text></g>`);

  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".6s" begin=".5s" fill="freeze"/>
  <text x="${L}" y="136" class="sans" font-size="14" fill="${C.ink2}">Recruited by a London studio three weeks before my first university lecture.</text>
  <text x="${L}" y="156" class="sans" font-size="14" fill="${C.ink2}">Still going — six shipped titles, and one game that never came out.</text></g>`);

  w(`<line x1="${L}" y1="182" x2="${R}" y2="182" stroke="${C.line}"/>`);

  const stats = [
    { x: L,   label: 'LIFETIME VISITS', color: C.coral, count: total },
    { x: 258, label: 'SHIPPED TITLES',  color: C.mint,  value: String(shipped) },
    { x: 460, label: 'STUDIOS',         color: C.blue,  value: '6' },
    { x: 662, label: 'YEARS SHIPPING',  color: C.ochre, value: '3' },
  ];
  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".5s" begin=".9s" fill="freeze"/>`);
  for (const s of stats) {
    if (s.count != null) {
      w(odometer(s.count, { x: s.x, y: 222, cls: 'serif', size: 31, weight: 700, fill: s.color, begin: 1.0, step: 0.08, fmt: M }));
    } else {
      w(`<text x="${s.x}" y="222" class="serif" font-size="31" font-weight="700" fill="${s.color}">${s.value}</text>`);
    }
    w(`<text x="${s.x}" y="242" class="mono" font-size="9" fill="${C.ink3}" letter-spacing="1.5">${s.label}</text>`);
  }
  w(`</g>`);

  // the run
  const LY = 290;
  w(`<line x1="${NX0}" y1="${LY}" x2="${END}" y2="${LY}" stroke="${C.line}" stroke-width="2"/>`);
  w(`<line x1="${NX0}" y1="${LY}" x2="${NX0}" y2="${LY}" stroke="${C.ink3}" stroke-width="2">
    <animate attributeName="x2" from="${NX0}" to="${END}" dur="1.5s" begin="1.5s" fill="freeze"/></line>`);

  RUN.forEach((s, i) => {
    const x = NX0 + i * gap, t = 1.6 + i * 0.2;
    w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".35s" begin="${n1(t)}s" fill="freeze"/>
    <circle cx="${n1(x)}" cy="${LY}" r="5.5" fill="${C.paper}" stroke="${C.ink2}" stroke-width="1.6"${s.ghost ? ' stroke-dasharray="2.6 2.2"' : ''}/>
    <text x="${n1(x)}" y="${LY - 14}" class="mono" font-size="9" fill="${C.ink3}" text-anchor="middle" letter-spacing=".6">${s.year}</text>
    <text x="${n1(x)}" y="${LY + 22}" class="sans" font-size="10.5" font-weight="600" fill="${C.ink2}" text-anchor="middle">${esc(s.name)}</text></g>`);
  });

  w(`<circle r="4" fill="${C.ink}"><animateMotion path="M${NX0},${LY} H${END}" dur="1.5s" begin="1.5s" fill="freeze"/></circle>`);
  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".4s" begin="3.0s" fill="freeze"/>
  <circle cx="${END}" cy="${LY}" r="5" fill="${C.coral}"/>
  <circle cx="${END}" cy="${LY}" r="5" fill="none" stroke="${C.coral}" class="halo"/>
  <text x="${END}" y="${LY - 14}" class="mono" font-size="9" fill="${C.coral}" text-anchor="end" letter-spacing=".6">now</text></g>`);

  w(c.close);
  w('</svg>');
  return o.join('\n');
}
