import { C, FONTS, esc, n1, backdrop, frame, heading } from '../kit.mjs';

const BRANCHES = [
  { name: 'ROBLOX',    color: C.cyan,    skills: ['Luau', 'roblox-ts', 'Flamework', 'Rojo', 'Wally', 'Open Cloud', 'Mantle', 'ECS'] },
  { name: 'LIVE-OPS',  color: C.emerald, skills: ['funnels', 'D1/D7 retention', 'payer conversion', 'churn analysis', 'economy design', 'roadmap'] },
  { name: 'BACKEND',   color: C.violet,  skills: ['ASP.NET Core', 'Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'] },
  { name: 'PLATFORM',  color: C.amber,   skills: ['Docker', 'Kubernetes', 'OpenShift', 'Terraform', 'GitHub Actions', 'Cosign', 'SBOM/SCA', 'AWS'] },
  { name: 'LANGUAGES', color: C.rose,    skills: ['TypeScript', 'Python', 'React', 'Next.js', 'C++', 'C#', 'Java', 'SQL', 'COBOL'] },
];

const CH = 5.6, PADX = 9, GAP = 8, PW = 20;
const pillW = t => Math.round(t.length * CH + PADX * 2);

/** Tech stack as an RPG talent tree: branches draw out, nodes unlock along them. */
export function tree() {
  const W = 900, H = 524;
  const ROOT = { x: 78, y: 320 };
  const NX = 244, NW = 128, NH = 32;
  const PX = NX + NW + 22, PMAX = 872 - PX;
  const f = frame(W, H, 'treeclip');
  const o = [];
  const w = s => o.push(s);

  w(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Talent tree of skills across five branches: Roblox, live-ops, backend, platform and languages.">`);
  w(`<defs><style>${FONTS}
    .spin{animation:spin 14s linear infinite;transform-origin:78px 320px}@keyframes spin{to{transform:rotate(360deg)}}
  </style></defs>`);
  w(f.open);
  w(backdrop(W, H, 31337, { stars: 58, id: 'tr' }));
  w(heading(30, 40, 'TALENT TREE', 'What I reach for', 'five branches, all of them load-bearing', C.emerald));

  const ys = BRANCHES.map((_, i) => 152 + i * 84);

  // branches from the root
  BRANCHES.forEach((b, i) => {
    const y = ys[i];
    const d = `M${ROOT.x + 26},${ROOT.y} C${ROOT.x + 110},${ROOT.y} ${NX - 70},${y} ${NX},${y}`;
    w(`<path d="${d}" pathLength="100" fill="none" stroke="${C.rail}" stroke-width="5" stroke-linecap="round"/>`);
    w(`<path d="${d}" pathLength="100" fill="none" stroke="${b.color}" stroke-opacity=".6" stroke-width="2" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100">
      <animate attributeName="stroke-dashoffset" from="100" to="0" dur=".8s" begin="${(0.4 + i * 0.14).toFixed(2)}s" fill="freeze"/></path>`);
  });

  // root
  w(`<g><circle cx="${ROOT.x}" cy="${ROOT.y}" r="34" fill="none" stroke="${C.cyan}" stroke-opacity=".22" stroke-dasharray="6 7" class="spin"/>
  <circle cx="${ROOT.x}" cy="${ROOT.y}" r="26" fill="${C.panel}" stroke="${C.cyan}" stroke-opacity=".7"/>
  <text x="${ROOT.x}" y="${ROOT.y - 2}" class="mono" font-size="9" fill="${C.cyan}" text-anchor="middle" letter-spacing="1">CORE</text>
  <text x="${ROOT.x}" y="${ROOT.y + 11}" class="sans" font-size="12" font-weight="800" fill="${C.text}" text-anchor="middle">AG</text></g>`);

  BRANCHES.forEach((b, i) => {
    const y = ys[i], t0 = 0.9 + i * 0.14;
    w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".4s" begin="${n1(t0)}s" fill="freeze"/>
    <rect x="${NX}" y="${y - NH / 2}" width="${NW}" height="${NH}" rx="9" fill="${C.panel}" stroke="${b.color}" stroke-opacity=".65"/>
    <rect x="${NX}" y="${y - NH / 2}" width="4" height="${NH}" rx="2" fill="${b.color}"/>
    <text x="${NX + 16}" y="${y + 4}" class="mono" font-size="10.5" font-weight="700" fill="${b.color}" letter-spacing="1.4">${esc(b.name)}</text>
    <path d="M${NX + NW + 8},${y - 4} l4,4 l-4,4" fill="none" stroke="${C.faint}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g>`);

    // greedy wrap of skill pills into rows
    const rows = [[]];
    let used = 0;
    for (const s of b.skills) {
      const pw = pillW(s);
      if (used + pw > PMAX && rows[rows.length - 1].length) { rows.push([]); used = 0; }
      rows[rows.length - 1].push({ s, pw });
      used += pw + GAP;
    }
    const top = y - (rows.length * (PW + 4) - 4) / 2;
    rows.forEach((row, ri) => {
      let px = PX;
      row.forEach((p, pi) => {
        const py = top + ri * (PW + 4);
        const delay = t0 + 0.3 + (ri * 4 + pi) * 0.055;
        w(`<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur=".35s" begin="${n1(delay)}s" fill="freeze"/>
        <rect x="${px}" y="${py}" width="${p.pw}" height="${PW}" rx="${PW / 2}" fill="${b.color}" fill-opacity=".09" stroke="${b.color}" stroke-opacity=".34"/>
        <text x="${px + p.pw / 2}" y="${py + 13.5}" class="mono" font-size="9.5" fill="${C.text}" fill-opacity=".9" text-anchor="middle">${esc(p.s)}</text></g>`);
        px += p.pw + GAP;
      });
    });
  });

  w(f.close);
  w('</svg>');
  return o.join('\n');
}
