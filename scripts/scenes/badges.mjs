import { C, FONTS, esc } from '../kit.mjs';

export const BADGES = [
  { id: 'talenthub', label: 'Roblox Talent Hub', tone: 'blue',  href: 'https://create.roblox.com/talent/creators/346676728' },
  { id: 'linkedin',  label: 'LinkedIn',          tone: 'mint',  href: 'https://linkedin.com/in/alaqmarg' },
  { id: 'email',     label: 'Email',             tone: 'coral', href: 'mailto:alaqmargandhi@gmail.com' },
  { id: 'discord',   label: 'Discord',           tone: 'plum',  href: 'https://discord.com/users/alaqmarg' },
  { id: 'location',  label: 'Ontario · Dubai',   tone: 'ochre', href: null },
];

const CH = 6.28, H = 32;

/**
 * Links get button affordance — fill, border, underlined label and a nudging
 * arrow. The location chip has no destination, so it is deliberately flat: no
 * border, no arrow, muted text. An <img> cannot show a hover state, so the
 * difference has to be visible at rest.
 */
export function badge({ label, tone, href }) {
  const c = C[tone];
  const DOT = 15, TX = 27, lw = label.length * CH;
  const isLink = Boolean(href);
  const W = Math.round(TX + lw + (isLink ? 11 + 9 + 13 : 13));
  const ax = TX + lw + 11;

  const shell = isLink
    ? `<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="${(H - 1) / 2}" fill="${c}" fill-opacity=".15" stroke="${c}" stroke-opacity=".55"/>`
    : '';
  const underline = isLink
    ? `<line x1="${TX}" y1="23.5" x2="${(TX + lw).toFixed(1)}" y2="23.5" stroke="${c}" stroke-opacity=".55"/>`
    : '';
  const arrow = isLink
    ? `<g stroke="${c}" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <g transform="translate(${ax.toFixed(1)},11)">
      <path d="M0,7 L7,0 M2.6,0 H7 V4.4"/>
      <animateTransform attributeName="transform" type="translate" values="0 0;1.6 -1.6;0 0" dur="2.4s" repeatCount="indefinite" additive="sum"/>
    </g></g>`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}${isLink ? ' (link)' : ''}">
<defs><style>${FONTS}</style></defs>
${shell}
<circle cx="${DOT}" cy="16" r="3.2" fill="${c}" fill-opacity="${isLink ? '1' : '.6'}"/>
<text x="${TX}" y="20" class="sans" font-size="11.5" font-weight="600" fill="${isLink ? C.ink : C.ink3}">${esc(label)}</text>
${underline}
${arrow}
</svg>`;
}
