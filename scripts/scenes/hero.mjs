import { C, FONTS, esc, M, backdrop, frame, n1 } from '../kit.mjs';

/** Title screen: starfield, bloomed wordmark, HUD stat chips, scrolling horizon grid. */
export function hero(total, shipped) {
  const W = 900, H = 360, MID = W / 2, HORIZON = 268;
  const f = frame(W, H, 'heroclip');
  const o = [];
  const w = s => o.push(s);

  // chip layout is computed up front so the odometer can be centred on its own chip
  const chips = [
    { label: 'YEARS', value: '3', color: C.cyan },
    { label: 'STUDIOS', value: '6', color: C.violet },
    { label: 'SHIPPED', value: String(shipped), color: C.emerald },
    { label: 'LIFETIME VISITS', value: null, color: C.amber, wide: true },
  ];
  const cw = c => (c.wide ? 190 : 118);
  const strip = chips.reduce((a, c) => a + cw(c), 0) + 14 * (chips.length - 1);
  let cur = Math.round((W - strip) / 2);
  const slot = chips.map(c => { const x = cur; cur += cw(c) + 14; return { c, x, w: cw(c) }; });
  const wideMid = slot[3].x + slot[3].w / 2;

  // count-up odometer, eased toward the live total
  const N = 12, frames = [];
  for (let i = 1; i <= N; i++) frames.push(M(total * (1 - Math.pow(1 - i / N, 3))));
  const odo = frames.map((v, i) => {
    const t = (2.55 + i * 0.085).toFixed(2);
    const last = i === N - 1;
    return `<text x="${wideMid}" y="243" class="sans" font-size="19" font-weight="800" fill="${C.amber}" text-anchor="middle" opacity="0">${v}<animate attributeName="opacity" ${last ? `to="1" begin="${t}s" dur=".1s" fill="freeze"` : `values="1;1" begin="${t}s" dur=".085s"`}/></text>`;
  }).join('');

  w(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Alaqmar Gandhi — Game Developer, Platform Engineer, Live-Ops. 3 years, 6 studios, ${shipped} shipped titles, ${M(total)} lifetime visits.">`);
  w(`<defs>
  <linearGradient id="wm" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${C.cyan}"/><stop offset="30%" stop-color="${C.violet}"/>
    <stop offset="60%" stop-color="${C.emerald}"/><stop offset="100%" stop-color="${C.cyan}"/>
    <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="1 0" dur="7s" repeatCount="indefinite"/>
  </linearGradient>
  <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${C.cyan}" stop-opacity=".18"/><stop offset="100%" stop-color="${C.cyan}" stop-opacity="0"/>
  </linearGradient>
  <style>${FONTS}
    .blink{animation:blink 1.15s step-end infinite}@keyframes blink{0%,55%{opacity:1}56%,100%{opacity:0}}
  </style>
</defs>`);
  w(f.open);
  w(backdrop(W, H, 20260820, { stars: 95, id: 'hero' }));

  // horizon glow + perspective grid
  w(`<rect x="0" y="${HORIZON - 46}" width="${W}" height="46" fill="url(#glow)"/>`);
  w(`<line x1="0" y1="${HORIZON}" x2="${W}" y2="${HORIZON}" stroke="${C.cyan}" stroke-opacity=".45"/>`);
  for (let i = -11; i <= 11; i++) {
    const bx = MID + i * 145;
    w(`<line x1="${MID}" y1="${HORIZON}" x2="${n1(bx)}" y2="${H}" stroke="${C.cyan}" stroke-opacity=".13"/>`);
  }
  for (let k = 0; k < 7; k++) {
    w(`<line x1="0" y1="${HORIZON}" x2="${W}" y2="${HORIZON}" stroke="${C.cyan}" stroke-opacity=".22">
      <animate attributeName="y1" values="${HORIZON};${H}" dur="4.2s" begin="${(k * 0.6).toFixed(2)}s" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 1 1" keyTimes="0;1"/>
      <animate attributeName="y2" values="${HORIZON};${H}" dur="4.2s" begin="${(k * 0.6).toFixed(2)}s" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 1 1" keyTimes="0;1"/>
      <animate attributeName="stroke-opacity" values="0;.30;0" dur="4.2s" begin="${(k * 0.6).toFixed(2)}s" repeatCount="indefinite"/>
    </line>`);
  }

  // status row
  w(`<g class="mono" font-size="10" letter-spacing="2.4">
    <circle cx="34" cy="34" r="3.5" fill="${C.emerald}"><animate attributeName="opacity" values="1;.3;1" dur="2.2s" repeatCount="indefinite"/></circle>
    <text x="46" y="38" fill="${C.emerald}">ONLINE</text>
    <text x="${W - 34}" y="38" fill="${C.faint}" text-anchor="end">BROCK UNIVERSITY · ONTARIO · DUBAI</text>
  </g>`);

  // bloomed wordmark
  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".9s" begin=".35s" fill="freeze"/>`);
  for (const [sw, op] of [[13, '.05'], [7, '.09'], [3, '.14']]) {
    w(`<text x="${MID}" y="152" class="sans" font-size="60" font-weight="800" letter-spacing="-1.6" text-anchor="middle" fill="none" stroke="${C.cyan}" stroke-opacity="${op}" stroke-width="${sw}" stroke-linejoin="round">ALAQMAR GANDHI</text>`);
  }
  w(`<text x="${MID}" y="152" class="sans" font-size="60" font-weight="800" letter-spacing="-1.6" text-anchor="middle" fill="url(#wm)">ALAQMAR GANDHI</text></g>`);

  // role line
  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".7s" begin="1.1s" fill="freeze"/>
  <text x="${MID}" y="182" class="mono" font-size="13" text-anchor="middle" letter-spacing="3.4" fill="${C.dim}">GAME DEVELOPER<tspan fill="${C.faint}"> // </tspan><tspan fill="${C.violet}">PLATFORM ENGINEER</tspan><tspan fill="${C.faint}"> // </tspan><tspan fill="${C.emerald}">LIVE-OPS</tspan></text></g>`);

  // HUD stat chips
  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".6s" begin="1.9s" fill="freeze"/>`);
  for (const { c, x, w: cw } of slot) {
    const y = 208;
    w(`<path d="M${x + 9},${y} H${x + cw - 9} L${x + cw},${y + 9} V${y + 39} L${x + cw - 9},${y + 48} H${x + 9} L${x},${y + 39} V${y + 9} Z" fill="${C.panel}" fill-opacity=".82" stroke="${c.color}" stroke-opacity=".38"/>`);
    w(`<text x="${x + cw / 2}" y="${y + 16}" class="mono" font-size="8" fill="${C.faint}" text-anchor="middle" letter-spacing="1.6">${c.label}</text>`);
    if (c.value) w(`<text x="${x + cw / 2}" y="${y + 35}" class="sans" font-size="19" font-weight="800" fill="${c.color}" text-anchor="middle">${c.value}</text>`);
  }
  w(odo);
  w(`</g>`);

  // prompt
  w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".6s" begin="3.7s" fill="freeze"/>
  <text x="${MID}" y="${H - 26}" class="mono" font-size="10.5" fill="${C.dim}" text-anchor="middle" letter-spacing="3">SCROLL TO CONTINUE <tspan class="blink" fill="${C.cyan}">▌</tspan></text></g>`);

  w(f.close);
  w('</svg>');
  return o.join('\n');
}
