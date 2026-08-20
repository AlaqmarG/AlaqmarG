import { C, FONTS, esc, card } from '../kit.mjs';

const NODES = [
  { t: 'merge',     s: 'PR review',      c: C.plum },
  { t: 'CI build',  s: 'roblox-ts',      c: C.blue },
  { t: 'publish',   s: 'Open Cloud',     c: C.mint },
  { t: 'players',   s: 'live places',    c: C.ochre },
  { t: 'telemetry', s: 'funnel',         c: C.coral },
];

/** Ship, measure, decide, ship again. */
export function loop() {
  const W = 900, H = 240, BW = 142, GAP = 24, X = 46, CY = 136;
  const cx = i => X + i * (BW + GAP) + BW / 2;
  const first = cx(0), last = cx(NODES.length - 1);
  const c = card(W, H, 'loopclip');
  const o = [];
  const w = s => o.push(s);

  w(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Merge, CI build, publish through Open Cloud, players, telemetry — feeding back into what ships next.">`);
  w(`<defs><style>${FONTS}</style></defs>`);
  w(c.open);
  w(`<text x="${X}" y="44" class="mono" font-size="10" fill="${C.ochre}" letter-spacing="2.6">HOW I SHIP</text>
<text x="${X}" y="72" class="serif" font-size="22" font-weight="700" fill="${C.ink}">Nobody publishes by hand</text>`);

  w(`<line x1="${first}" y1="${CY}" x2="${last}" y2="${CY}" stroke="${C.line}" stroke-width="2"/>`);
  for (let k = 0; k < 3; k++) {
    w(`<circle r="3" fill="${C.ink3}"><animateMotion path="M${first},${CY} H${last}" dur="4.2s" begin="${(k * 1.4).toFixed(2)}s" repeatCount="indefinite"/></circle>`);
  }
  NODES.forEach((n, i) => {
    const x = X + i * (BW + GAP);
    w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".45s" begin="${(0.25 + i * 0.16).toFixed(2)}s" fill="freeze"/>
    <rect x="${x}" y="${CY - 24}" width="${BW}" height="48" rx="10" fill="${C.paper}"/>
    <rect x="${x}" y="${CY - 24}" width="${BW}" height="48" rx="10" fill="${n.c}" fill-opacity=".10" stroke="${n.c}" stroke-opacity=".45"/>
    <text x="${x + 16}" y="${CY - 3}" class="sans" font-size="12.5" font-weight="600" fill="${C.ink}">${esc(n.t)}</text>
    <text x="${x + 16}" y="${CY + 13}" class="mono" font-size="8.5" fill="${C.ink3}">${esc(n.s)}</text></g>`);
  });

  const arc = `M${last},164 C${last},206 640,214 450,214 C260,214 ${first},206 ${first},164`;
  w(`<path d="${arc}" fill="none" stroke="${C.line}" stroke-width="2" stroke-dasharray="5 5"/>`);
  w(`<path d="M${first - 4},170 l4,-6 l4,6" fill="none" stroke="${C.ink3}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`);
  w(`<circle r="2.8" fill="${C.coral}"><animateMotion path="${arc}" dur="5s" begin="1.4s" repeatCount="indefinite"/></circle>`);
  w(`<text x="450" y="${H - 12}" class="mono" font-size="9" fill="${C.ink3}" text-anchor="middle" letter-spacing="1.6">THE NUMBERS PICK WHAT IS NEXT</text>`);

  w(c.close);
  w('</svg>');
  return o.join('\n');
}
