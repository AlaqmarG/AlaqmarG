import { C, FONTS, esc } from '../kit.mjs';

export const BADGES = [
  { id: 'talenthub', label: 'Roblox Talent Hub', tone: 'blue',  href: 'https://create.roblox.com/talent/creators/346676728' },
  { id: 'linkedin',  label: 'LinkedIn',          tone: 'mint',  href: 'https://linkedin.com/in/alaqmarg' },
  { id: 'email',     label: 'Email',             tone: 'coral', href: 'mailto:alaqmargandhi@gmail.com' },
  { id: 'discord',   label: 'Discord',           tone: 'plum',  href: 'https://discord.com/users/alaqmarg' },
  { id: 'location',  label: 'Ontario · Dubai',   tone: 'ochre' },
];

/** Soft paper pill. The link lives in the <a> around it in the README. */
export function badge({ label, tone }) {
  const c = C[tone];
  const H = 30, CH = 6.55, DOT = 15, TX = DOT + 11;
  const W = Math.round(TX + label.length * CH + 15);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}">
<defs><style>${FONTS}</style></defs>
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="${(H - 1) / 2}" fill="${c}" fill-opacity=".10" stroke="${c}" stroke-opacity=".34"/>
<circle cx="${DOT}" cy="15" r="3.2" fill="${c}"/>
<text x="${TX}" y="19" class="sans" font-size="11.5" font-weight="600" fill="${C.ink}">${esc(label)}</text>
</svg>`;
}
