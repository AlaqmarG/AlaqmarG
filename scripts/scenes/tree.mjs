import { C, FONTS, esc, n1, card } from '../kit.mjs';

const BRANCHES = [
  { name: 'ROBLOX',    color: C.blue,  skills: ['Luau', 'roblox-ts', 'Flamework', 'Rojo', 'Wally', 'Open Cloud', 'Mantle', 'ECS'] },
  { name: 'LIVE-OPS',  color: C.mint,  skills: ['funnels', 'D1/D7 retention', 'payer conversion', 'churn analysis', 'economy design'] },
  { name: 'BACKEND',   color: C.plum,  skills: ['ASP.NET Core', 'Node.js', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'] },
  { name: 'PLATFORM',  color: C.ochre, skills: ['Docker', 'Kubernetes', 'OpenShift', 'Terraform', 'GitHub Actions', 'Cosign', 'AWS'] },
  { name: 'LANGUAGES', color: C.coral, skills: ['TypeScript', 'Python', 'React', 'Next.js', 'C++', 'C#', 'Java', 'SQL', 'COBOL'] },
];
const CH = 5.5, PADX = 9, GAP = 8, PH = 20;
const pillW = t => Math.round(t.length * CH + PADX * 2);

/** The stack as a talent tree. Branches draw out, nodes unlock along them. */
export function tree() {
  const W = 900, H = 452, L = 48;
  const ROOT = { x: 82, y: 268 }, NX = 232, NW = 118, NH = 28;
  const PX = NX + NW + 20, PMAX = 852 - PX;
  const c = card(W, H, 'treeclip');
  const o = [];
  const w = s => o.push(s);

  w(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Skills across five branches: Roblox, live-ops, backend, platform and languages.">`);
  w(`<defs><style>${FONTS}</style></defs>`);
  w(c.open);
  w(`<text x="${L}" y="46" class="mono" font-size="10" fill="${C.ochre}" letter-spacing="2.6">WHAT I WORK WITH</text>
<text x="${L}" y="74" class="serif" font-size="24" font-weight="700" fill="${C.ink}">Five branches</text>
<line x1="${L}" y1="94" x2="852" y2="94" stroke="${C.line}"/>`);

  const ys = BRANCHES.map((_, i) => 136 + i * 74);
  BRANCHES.forEach((b, i) => {
    const y = ys[i];
    const d = `M${ROOT.x + 22},${ROOT.y} C${ROOT.x + 96},${ROOT.y} ${NX - 64},${y} ${NX},${y}`;
    w(`<path d="${d}" pathLength="100" fill="none" stroke="${b.color}" stroke-opacity=".45" stroke-width="1.8" stroke-dasharray="100" stroke-dashoffset="100">
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur=".75s" begin="${(0.3 + i * 0.12).toFixed(2)}s" fill="freeze"/></path>`);
  });
  w(`<circle cx="${ROOT.x}" cy="${ROOT.y}" r="22" fill="${C.paper2}" stroke="${C.ink3}" stroke-opacity=".7"/>
<text x="${ROOT.x}" y="${ROOT.y + 5}" class="serif" font-size="15" font-weight="700" fill="${C.ink}" text-anchor="middle">AG</text>`);

  BRANCHES.forEach((b, i) => {
    const y = ys[i], t0 = 0.75 + i * 0.12;
    w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".4s" begin="${n1(t0)}s" fill="freeze"/>
    <rect x="${NX}" y="${y - NH / 2}" width="${NW}" height="${NH}" rx="7" fill="${b.color}" fill-opacity=".12" stroke="${b.color}" stroke-opacity=".45"/>
    <text x="${NX + 13}" y="${y + 4}" class="mono" font-size="9.5" font-weight="700" fill="${b.color}" letter-spacing="1.3">${esc(b.name)}</text></g>`);

    const rows = [[]];
    let used = 0;
    for (const s of b.skills) {
      const pw = pillW(s);
      if (used + pw > PMAX && rows[rows.length - 1].length) { rows.push([]); used = 0; }
      rows[rows.length - 1].push({ s, pw });
      used += pw + GAP;
    }
    const top = y - (rows.length * (PH + 4) - 4) / 2;
    rows.forEach((row, ri) => {
      let x = PX;
      row.forEach((p, pi) => {
        const py = top + ri * (PH + 4);
        const delay = t0 + 0.25 + (ri * 5 + pi) * 0.05;
        w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".3s" begin="${n1(delay)}s" fill="freeze"/>
        <rect x="${x}" y="${py}" width="${p.pw}" height="${PH}" rx="${PH / 2}" fill="${b.color}" fill-opacity=".08" stroke="${b.color}" stroke-opacity=".3"/>
        <text x="${x + p.pw / 2}" y="${py + 13.5}" class="mono" font-size="9" fill="${C.ink2}" text-anchor="middle">${esc(p.s)}</text></g>`);
        x += p.pw + GAP;
      });
    });
  });

  w(c.close);
  w('</svg>');
  return o.join('\n');
}
