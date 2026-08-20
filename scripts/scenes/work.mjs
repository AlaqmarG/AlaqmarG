import { C, FONTS, esc, n1, card } from '../kit.mjs';

const GX = 320, GW = 196, TX = 552;

const tile = (x, y, s, c, op, dash) =>
  `<rect x="${n1(x)}" y="${n1(y)}" width="${s}" height="${s}" rx="${s / 4}" fill="${c}" fill-opacity="${op}" stroke="${c}" stroke-opacity=".55"${dash ? ' stroke-dasharray="2.5 2"' : ''}/>`;

const fade = (t, body, dur = '.4s') =>
  `<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="${dur}" begin="${n1(t)}s" fill="freeze"/>${body}</g>`;

/** Four mini-games, all dashed: none of them ever reached a player. */
function gLandvault(cy, c, t) {
  return [0, 1, 2, 3].map(i =>
    fade(t + i * 0.12, tile(GX + i * 36, cy - 13, 26, c, '.10', true))).join('');
}

/** One backend fanning out to four live titles. */
function gBoltable(cy, c, t) {
  const hx = GX + 10, out = [];
  out.push(fade(t, `<circle cx="${hx}" cy="${cy}" r="9" fill="${c}" fill-opacity=".18" stroke="${c}" stroke-opacity=".6"/>`));
  for (let i = 0; i < 4; i++) {
    const ty = cy - 21 + (i % 2) * 28, tx = GX + 96 + Math.floor(i / 2) * 34;
    const d = `M${hx + 9},${cy} C${hx + 46},${cy} ${tx - 26},${ty + 9} ${tx},${ty + 9}`;
    out.push(fade(t + 0.1, `<path d="${d}" fill="none" stroke="${c}" stroke-opacity=".3" stroke-width="1.4"/>`));
    out.push(`<circle r="2.2" fill="${c}"><animateMotion path="${d}" dur="1.8s" begin="${n1(t + 0.4 + i * 0.22)}s" repeatCount="indefinite"/></circle>`);
    out.push(fade(t + 0.25 + i * 0.08, tile(tx, ty, 18, c, '.16')));
  }
  return out.join('');
}

/** Twenty static pieces recombined into sixty levels. */
function gShiloh(cy, c, t) {
  const out = [];
  for (let i = 0; i < 4; i++) out.push(fade(t + i * 0.06, tile(GX + (i % 2) * 15, cy - 14 + Math.floor(i / 2) * 15, 11, c, '.16')));
  out.push(fade(t + 0.3, `<path d="M${GX + 42},${cy} h16 m-5,-4 l5,4 l-5,4" fill="none" stroke="${C.ink3}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>`));
  for (let i = 0; i < 15; i++) out.push(fade(t + 0.42 + i * 0.035, tile(GX + 74 + (i % 5) * 13, cy - 16 + Math.floor(i / 5) * 13, 9, c, '.22')));
  return out.join('');
}

/** A merged pull request reaching a live place without anyone opening Studio. */
function gHifun(cy, c, t) {
  const out = [], xs = [GX, GX + 66, GX + 132];
  const labels = ['PR', 'CI', 'live'];
  xs.forEach((x, i) => {
    out.push(fade(t + i * 0.14, `<rect x="${x}" y="${cy - 11}" width="46" height="22" rx="6" fill="${c}" fill-opacity=".13" stroke="${c}" stroke-opacity=".5"/>
    <text x="${x + 23}" y="${cy + 4}" class="mono" font-size="8.5" fill="${c}" text-anchor="middle">${labels[i]}</text>`));
    if (i < 2) out.push(fade(t + 0.1 + i * 0.14, `<path d="M${x + 50},${cy} h12 m-4,-3.5 l4,3.5 l-4,3.5" fill="none" stroke="${C.ink3}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>`));
  });
  out.push(`<circle r="2.6" fill="${c}"><animateMotion path="M${GX + 4},${cy} H${GX + 172}" dur="2.4s" begin="${n1(t + 0.6)}s" repeatCount="indefinite"/></circle>`);
  return out.join('');
}

/** A gate: repositories only ship once the compliance check passes. */
function gRbc(cy, c, t) {
  const gx = GX + 26;
  return fade(t, `<path d="M${gx},${cy - 18} h44 v22 a22 22 0 0 1 -22 22 a22 22 0 0 1 -22 -22 z" fill="${c}" fill-opacity=".12" stroke="${c}" stroke-opacity=".55"/>`)
    + `<path d="M${gx + 12},${cy - 1} l7 8 l14 -16" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100">
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur=".6s" begin="${n1(t + 0.35)}s" fill="freeze"/></path>`
    + [0, 1, 2].map(i => fade(t + 0.5 + i * 0.14, `<rect x="${gx + 84}" y="${cy - 14 + i * 11}" width="${44 - i * 10}" height="4" rx="2" fill="${c}" fill-opacity=".3"/>`)).join('');
}

/** Milestones on a roadmap, some shipped, the rest scoped. */
function gEterna(cy, c, t) {
  const out = [`<line x1="${GX + 6}" y1="${cy}" x2="${GX + 170}" y2="${cy}" stroke="${C.line}" stroke-width="2"/>`];
  out.push(`<line x1="${GX + 6}" y1="${cy}" x2="${GX + 6}" y2="${cy}" stroke="${c}" stroke-width="2" stroke-opacity=".6">
    <animate attributeName="x2" from="${GX + 6}" to="${GX + 76}" dur="1s" begin="${n1(t)}s" fill="freeze"/></line>`);
  [0, 1, 2, 3, 4].forEach(i => {
    const x = GX + 6 + i * 41, done = i < 2;
    out.push(fade(t + 0.15 + i * 0.12, `<rect x="${x - 6}" y="${cy - 6}" width="12" height="12" rx="2.5" transform="rotate(45 ${x} ${cy})" fill="${done ? c : C.paper}" fill-opacity="${done ? '.85' : '1'}" stroke="${c}" stroke-opacity=".6"/>`));
  });
  return out.join('');
}

const ROWS = [
  { name: 'Landvault',     dates: 'Sep 2023 — Feb 2024',  color: C.plum,  glyph: gLandvault, note: '4 mini-games · never shipped' },
  { name: 'Boltable',      dates: 'May 2024 — Feb 2025',  color: C.blue,  glyph: gBoltable,  note: '241M visits · 300+ live servers' },
  { name: 'Shiloh & Bros', dates: 'Mar 2025 — Aug 2025',  color: C.ochre, glyph: gShiloh,    note: '60 levels from 20 pieces' },
  { name: 'Hi-Fun',        dates: 'Nov 2025 — Apr 2026',  color: C.coral, glyph: gHifun,     note: '13.8M visits · ships from CI' },
  { name: 'RBC',           dates: 'Jan 2026 — now',       color: C.mint,  glyph: gRbc,       note: 'AI-agent governance' },
  { name: 'Eterna Online', dates: 'Jul 2026 — now',       color: C.mint,  glyph: gEterna,    note: 'lead · systems and roadmap' },
];

/** Six studios, one picture each. */
export function work() {
  const W = 900, TOP = 96, STEP = 78, L = 48, R = 852;
  const H = TOP + ROWS.length * STEP + 8;
  const c = card(W, H, 'workclip');
  const o = [];
  const w = s => o.push(s);

  w(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Six studios: Landvault built four mini-games that never shipped; Boltable, 241M visits across 300+ live servers; Shiloh and Bros, 60 levels from 20 pieces; Hi-Fun, 13.8M visits shipping from CI; RBC, AI-agent governance; Eterna Online, lead on systems and roadmap.">`);
  w(`<defs><style>${FONTS}</style></defs>`);
  w(c.open);
  w(`<text x="${L}" y="46" class="mono" font-size="10" fill="${C.ochre}" letter-spacing="2.6">WHERE I'VE WORKED</text>
<text x="${L}" y="74" class="serif" font-size="24" font-weight="700" fill="${C.ink}">Six studios, one picture each</text>
<line x1="${L}" y1="${TOP - 8}" x2="${R}" y2="${TOP - 8}" stroke="${C.line}"/>`);

  ROWS.forEach((r, i) => {
    const cy = TOP + i * STEP + STEP / 2 - 8, t = 0.25 + i * 0.3;
    if (i) w(`<line x1="${L}" y1="${cy - STEP / 2 + 4}" x2="${R}" y2="${cy - STEP / 2 + 4}" stroke="${C.line}" stroke-opacity=".7"/>`);
    w(fade(t, `<text x="${L}" y="${cy - 2}" class="sans" font-size="14" font-weight="600" fill="${C.ink}">${esc(r.name)}</text>
    <text x="${L}" y="${cy + 13}" class="mono" font-size="9" fill="${C.ink3}">${esc(r.dates)}</text>`));
    w(r.glyph(cy, r.color, t + 0.15));
    w(fade(t + 0.5, `<text x="${TX}" y="${cy + 4}" class="sans" font-size="12" fill="${C.ink2}">${esc(r.note)}</text>`));
  });

  w(c.close);
  w('</svg>');
  return o.join('\n');
}
