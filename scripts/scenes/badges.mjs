import { C, FONTS, esc } from '../kit.mjs';

export const BADGES = [
  { id: 'talenthub', label: 'TALENT HUB', value: 'verified credits', color: C.cyan,    live: true },
  { id: 'linkedin',  label: 'LINKEDIN',   value: 'alaqmarg',         color: C.sky },
  { id: 'email',     label: 'EMAIL',      value: 'alaqmargandhi',    color: C.rose },
  { id: 'discord',   label: 'DISCORD',    value: 'alaqmarg',         color: C.violet },
  { id: 'location',  label: 'BASED IN',   value: 'Ontario · Dubai',  color: C.emerald },
];

/** Angled HUD chip, sized to its text. Clickability comes from the <a> around it in the README. */
export function badge({ label, value, color, live }) {
  const H = 36, LCH = 6.1, VCH = 6.5, DOT = 18;
  const lx = DOT + 12;
  const lw = label.length * LCH;
  const sep = Math.round(lx + lw + 13);
  const W = Math.round(sep + 13 + value.length * VCH + 16);
  const dot = live
    ? `<circle cx="${DOT}" cy="18" r="3.4" fill="${color}"><animate attributeName="opacity" values="1;.3;1" dur="2.2s" repeatCount="indefinite"/></circle>
    <circle cx="${DOT}" cy="18" r="3.4" fill="none" stroke="${color}"><animate attributeName="r" values="3.4;9" dur="2.2s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values=".6;0" dur="2.2s" repeatCount="indefinite"/></circle>`
    : `<circle cx="${DOT}" cy="18" r="3.4" fill="${color}"/>`;
  const skew = 10;
  const shape = `M${skew},0 H${W} V${H - skew} L${W - skew},${H} H0 V${skew} Z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}: ${esc(value)}">
<defs><clipPath id="c"><path d="${shape}"/></clipPath><style>${FONTS}</style></defs>
<g clip-path="url(#c)">
  <rect width="${W}" height="${H}" fill="${C.panel}"/>
  <rect width="${sep}" height="${H}" fill="${color}" fill-opacity=".13"/>
  <line x1="${sep}" y1="6" x2="${sep}" y2="${H - 6}" stroke="${color}" stroke-opacity=".3"/>
  ${dot}
  <text x="${lx}" y="22" class="mono" font-size="9.5" font-weight="700" fill="${color}" letter-spacing="1.3">${esc(label)}</text>
  <text x="${sep + 13}" y="22" class="mono" font-size="10.5" fill="${C.text}">${esc(value)}</text>
</g>
<path d="${shape}" fill="none" stroke="${color}" stroke-opacity=".38"/>
</svg>`;
}
