import { C, FONTS, esc, backdrop, frame, heading } from '../kit.mjs';

const NODES = [
  { t: 'merge to main',  s: 'PR review',            c: C.violet },
  { t: 'GitHub Actions', s: 'roblox-ts · DarkLua',  c: C.cyan },
  { t: 'Open Cloud',     s: 'Mantle, no Studio',    c: C.emerald },
  { t: 'live places',    s: 'players hit it',       c: C.amber },
  { t: 'telemetry',      s: '.NET ingest · funnel', c: C.rose },
];

/** The delivery loop, with packets travelling the rail and diving behind each stage. */
export function loop() {
  const W = 900, H = 328, BW = 146, GAP = 26, X = 34, CY = 168;
  const cx = i => X + i * (BW + GAP) + BW / 2;
  const first = cx(0), last = cx(NODES.length - 1);
  const f = frame(W, H, 'loopclip');
  const o = [];
  const w = s => o.push(s);

  w(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="The delivery loop: merge to main, GitHub Actions, Open Cloud publish, live places, telemetry, feeding back into what ships next.">`);
  w(`<defs><style>${FONTS}</style></defs>`);
  w(f.open);
  w(backdrop(W, H, 90210, { stars: 44, id: 'lp' }));
  w(heading(30, 40, 'THE LOOP', 'How a change reaches players', 'ship from CI · measure what players do · let the funnel pick what is next', C.cyan));

  w(`<line x1="${first}" y1="${CY}" x2="${last}" y2="${CY}" stroke="${C.rail}" stroke-width="3"/>`);
  for (let k = 0; k < 4; k++) {
    w(`<circle r="3.5" fill="#DFF6FF"><animateMotion path="M${first},${CY} H${last}" dur="4.4s" begin="${(k * 1.1).toFixed(2)}s" repeatCount="indefinite"/></circle>`);
  }
  for (let i = 0; i < NODES.length - 1; i++) {
    const gx = X + i * (BW + GAP) + BW + GAP / 2;
    w(`<path d="M${gx - 4},${CY - 5} l5,5 l-5,5" fill="none" stroke="${C.faint}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`);
  }

  NODES.forEach((n, i) => {
    const x = X + i * (BW + GAP), y = CY - 31, h = 62;
    w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".5s" begin="${(0.3 + i * 0.2).toFixed(2)}s" fill="freeze"/>
    <path d="M${x + 11},${y} H${x + BW - 11} L${x + BW},${y + 11} V${y + h - 11} L${x + BW - 11},${y + h} H${x + 11} L${x},${y + h - 11} V${y + 11} Z" fill="${C.panel}" stroke="${n.c}" stroke-opacity=".5"/>
    <rect x="${x + 11}" y="${y + 10}" width="3" height="${h - 20}" rx="1.5" fill="${n.c}"/>
    <text x="${x + 22}" y="${CY - 4}" class="mono" font-size="10" font-weight="700" fill="${C.text}">${esc(n.t)}</text>
    <text x="${x + 22}" y="${CY + 12}" class="mono" font-size="8.5" fill="${C.dim}">${esc(n.s)}</text>
    <text x="${x + BW - 14}" y="${y + 18}" class="mono" font-size="8" fill="${n.c}" fill-opacity=".55" text-anchor="end">0${i + 1}</text></g>`);
  });

  const arc = `M${last},202 C${last},266 640,278 450,278 C260,278 ${first},266 ${first},202`;
  w(`<path d="${arc}" fill="none" stroke="${C.rail}" stroke-width="2.5" stroke-dasharray="6 6"/>`);
  w(`<path d="M${first - 5},209 l5,-7 l5,7" fill="none" stroke="${C.faint}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`);
  for (let k = 0; k < 2; k++) {
    w(`<circle r="3" fill="${C.rose}"><animateMotion path="${arc}" dur="5.4s" begin="${(1.2 + k * 2.7).toFixed(2)}s" repeatCount="indefinite"/></circle>`);
  }
  w(`<text x="450" y="${H - 16}" class="mono" font-size="9.5" fill="${C.faint}" text-anchor="middle" letter-spacing="2">WHAT THE NUMBERS SAY SHIPS NEXT</text>`);

  w(f.close);
  w('</svg>');
  return o.join('\n');
}
