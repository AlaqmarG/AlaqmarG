// Shared drawing kit. Everything here must be deterministic — the refresh workflow
// commits when assets change, so anything random would produce a diff every day.
// Two palettes, one layout. Scenes read C at call time, so build.mjs swaps the
// theme between passes and re-renders. Both stay in the same warm hue family, so a
// viewer whose OS theme disagrees with their GitHub theme still gets something sane.
export const THEMES = {
  light: {
    paper: '#F7F3EC', paper2: '#EFE9DE', line: '#E1D8CB', edge: '#D8CEBF',
    ink: '#1B1A17', ink2: '#5F5849', ink3: '#A2988A',
    coral: '#C9503A', ochre: '#B37F26', mint: '#357F68', blue: '#3C5B80', plum: '#7A4F70',
  },
  dark: {
    paper: '#191714', paper2: '#201D19', line: '#2E2A24', edge: '#38322B',
    ink: '#F2EDE4', ink2: '#B8AFA2', ink3: '#7C7368',
    coral: '#F0876B', ochre: '#E0A94A', mint: '#5BBE9C', blue: '#7BA3CE', plum: '#BE8BAE',
  },
};

export const C = { ...THEMES.light };
export function setTheme(name) { Object.assign(C, THEMES[name]); }

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const n1 = x => Number(x).toFixed(1);
export const M = n => (n / 1e6).toFixed(1) + 'M';
export const comma = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const FONTS = `.serif{font-family:Georgia,"Iowan Old Style","Times New Roman",serif}
.sans{font-family:ui-sans-serif,-apple-system,"Segoe UI",Inter,Helvetica,Arial,sans-serif}
.mono{font-family:ui-monospace,"SF Mono",Menlo,Consolas,"Courier New",monospace}`;

/** Paper card: flat warm ground, hairline border, nothing else. */
export function card(w, h, id) {
  return {
    open: `<defs><clipPath id="${id}"><rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="14"/></clipPath></defs>
<g clip-path="url(#${id})"><rect width="${w}" height="${h}" fill="${C.paper}"/>`,
    close: `</g><rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="14" fill="none" stroke="${C.edge}"/>`,
  };
}

/** Count-up odometer. Swaps one <text> for the next, easing toward the final value. */
export function odometer(value, { x, y, cls, size, weight, fill, anchor = 'start', begin = 0, step = 0.075, frames = 10, fmt = comma }) {
  const out = [];
  for (let k = 1; k <= frames; k++) {
    const v = fmt(value * (1 - Math.pow(1 - k / frames, 3)));
    const t = (begin + k * step).toFixed(2);
    const last = k === frames;
    out.push(`<text x="${x}" y="${y}" class="${cls}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" opacity="0">${v}<animate attributeName="opacity" ${last ? `to="1" begin="${t}s" dur=".1s" fill="freeze"` : `values="1;1" begin="${t}s" dur="${step}s"`}/></text>`);
  }
  return out.join('');
}
