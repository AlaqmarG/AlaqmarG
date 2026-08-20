// Shared drawing kit. Everything here must be deterministic — the refresh workflow
// commits when assets change, so a random starfield would produce a diff every day.
export const C = {
  void0: '#05070D', void1: '#0D1220', panel: '#121A2B', edge: '#1E2740',
  text: '#EAF0F8', dim: '#8896AE', faint: '#4A5568', rail: '#161E30',
  cyan: '#22D3EE', violet: '#A78BFA', emerald: '#34D399',
  amber: '#FBBF24', rose: '#FB7185', sky: '#38BDF8', lime: '#A3E635', gold: '#F5C453',
};

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const n1 = x => Number(x).toFixed(1);
export const M = n => (n / 1e6).toFixed(1) + 'M';

export const FONTS = `.mono{font-family:ui-monospace,"SF Mono",Menlo,Consolas,"Courier New",monospace}
.sans{font-family:ui-sans-serif,-apple-system,"Segoe UI",Inter,Helvetica,Arial,sans-serif}`;

/** Deterministic LCG so the same seed always yields the same starfield. */
export function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/** Backdrop: deep gradient, seeded stars, vignette. */
export function backdrop(w, h, seed, { stars = 70, id = 'bg' } = {}) {
  const r = rng(seed);
  const dots = [];
  for (let i = 0; i < stars; i++) {
    const x = n1(r() * w), y = n1(r() * h);
    const rad = (0.5 + r() * 1.2).toFixed(2);
    const op = (0.12 + r() * 0.4).toFixed(2);
    const dur = (2.5 + r() * 4).toFixed(1), begin = (r() * 5).toFixed(1);
    dots.push(`<circle cx="${x}" cy="${y}" r="${rad}" fill="#9FB3D9" opacity="${op}"><animate attributeName="opacity" values="${op};${(op * 0.25).toFixed(2)};${op}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/></circle>`);
  }
  return `<defs>
  <radialGradient id="${id}sky" cx="18%" cy="0%" r="120%">
    <stop offset="0%" stop-color="#16203A"/><stop offset="55%" stop-color="${C.void1}"/><stop offset="100%" stop-color="${C.void0}"/>
  </radialGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#${id}sky)"/>
<g>${dots.join('')}</g>`;
}

/** Section heading with a small kicker above it. */
export function heading(x, y, kicker, title, sub, accent = C.cyan) {
  return `<text x="${x}" y="${y}" class="mono" font-size="10" fill="${accent}" letter-spacing="2.6">${esc(kicker)}</text>
<text x="${x}" y="${y + 28}" class="sans" font-size="23" font-weight="800" fill="${C.text}" letter-spacing="-.3">${esc(title)}</text>
${sub ? `<text x="${x}" y="${y + 48}" class="mono" font-size="11" fill="${C.dim}">${esc(sub)}</text>` : ''}`;
}

/** Frame + clip for a full-bleed scene. */
export function frame(w, h, id) {
  return {
    open: `<defs><clipPath id="${id}"><rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="18"/></clipPath></defs><g clip-path="url(#${id})">`,
    close: `</g><rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="18" fill="none" stroke="${C.edge}"/>`,
  };
}
