import { C, FONTS, esc, n1, card, odometer } from '../kit.mjs';

/** Shipped titles by lifetime visits. Lives inside a collapsed section. */
export function titles(games, unshipped, stamp) {
  const W = 900, L = 48, R = 852, STEP = 44;
  const rows = [...games].sort((a, b) => b.visits - a.visits);
  const max = rows[0].visits;
  const divY = 116 + rows.length * STEP - 6;
  const H = divY + 44 + (unshipped.length - 1) * 26 + 26;
  const c = card(W, H, 'titlesclip');
  const o = [];
  const w = s => o.push(s);

  w(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Shipped Roblox titles by lifetime visits, plus two projects with no visits.">`);
  w(`<defs><style>${FONTS}</style></defs>`);
  w(c.open);
  w(`<text x="${L}" y="46" class="mono" font-size="10" fill="${C.ochre}" letter-spacing="2.6">SHIPPED</text>
<text x="${L}" y="76" class="serif" font-size="24" font-weight="700" fill="${C.ink}">Six titles, ${(games.reduce((a, g) => a + g.visits, 0) / 1e6).toFixed(1)}M lifetime visits</text>
<text x="${R}" y="76" class="mono" font-size="9.5" fill="${C.ink3}" text-anchor="end">read live from the Roblox API &#183; ${stamp}</text>
<line x1="${L}" y1="94" x2="${R}" y2="94" stroke="${C.line}"/>`);

  rows.forEach((g, i) => {
    const cy = 130 + i * STEP, begin = 0.3 + i * 0.13;
    const barW = (g.visits / max) * (R - L);
    w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".4s" begin="${n1(begin)}s" fill="freeze"/>
    <text x="${L}" y="${cy - 1}" class="sans" font-size="14" font-weight="600" fill="${C.ink}">${esc(g.name)}</text>
    <text x="${L}" y="${cy + 13}" class="mono" font-size="9.5" fill="${C.ink3}">${esc(g.studio)}</text>
    ${odometer(g.visits, { x: R, y: cy + 4, cls: 'serif', size: 21, weight: 700, fill: g.color, anchor: 'end', begin: begin + 0.25, step: 0.07 })}
    <rect x="${L}" y="${cy + 20}" width="${R - L}" height="2.5" rx="1.25" fill="${C.line}"/>
    <rect x="${L}" y="${cy + 20}" width="0" height="2.5" rx="1.25" fill="${g.color}" fill-opacity=".85">
      <animate attributeName="width" from="0" to="${n1(barW)}" dur="1s" begin="${n1(begin)}s" fill="freeze" calcMode="spline" keySplines=".16 1 .3 1" keyTimes="0;1" values="0;${n1(barW)}"/></rect></g>`);
  });

  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".5s" begin="1.5s" fill="freeze"/>
  <line x1="${L}" y1="${divY}" x2="${R}" y2="${divY}" stroke="${C.line}" stroke-dasharray="3 4"/></g>`);

  unshipped.forEach((u, i) => {
    const cy = divY + 26 + i * 26, begin = 1.7 + i * 0.18;
    w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".45s" begin="${n1(begin)}s" fill="freeze"/>
    <text x="${L}" y="${cy}" class="sans" font-size="12.5" font-weight="600" fill="${C.ink2}">${esc(u.name)}</text>
    <text x="${L + 150}" y="${cy}" class="mono" font-size="9.5" fill="${C.ink3}">${esc(u.studio)} &#183; ${esc(u.note)}</text>
    <text x="${R}" y="${cy}" class="mono" font-size="10" fill="${u.color}" text-anchor="end">${esc(u.status)}</text></g>`);
  });

  w(c.close);
  w('</svg>');
  return o.join('\n');
}
