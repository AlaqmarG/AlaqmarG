// Shared drawing kit. Everything here must be deterministic — the refresh workflow
// commits when assets change, so anything random would produce a diff every day.
export const C = {
  paper: '#FAF7F2', paper2: '#F3EDE4', line: '#E5DDD1', edge: '#DED4C6',
  ink: '#1B1A17', ink2: '#5F5849', ink3: '#A2988A',
  coral: '#D9573D', ochre: '#C8912F', mint: '#3F9B7E', blue: '#46688F', plum: '#8A5A7D',
};

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
