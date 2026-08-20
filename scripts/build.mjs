#!/usr/bin/env node
/**
 * Regenerates the SVGs in assets/ from live Roblox data.
 * No dependencies. Falls back to the baked-in figures in data.mjs if the API is unreachable.
 */
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { GAMES, UNSHIPPED } from './data.mjs';
import { M, setTheme } from './kit.mjs';
import { heroCard, heroCardNarrow } from './scenes/card.mjs';
import { titles } from './scenes/titles.mjs';
import { work } from './scenes/work.mjs';
import { tree } from './scenes/tree.mjs';
import { loop } from './scenes/loop.mjs';
import { badge, BADGES } from './scenes/badges.mjs';

async function refresh() {
  const ids = GAMES.map(g => g.universeId).join(',');
  try {
    const res = await fetch(`https://games.roblox.com/v1/games?universeIds=${ids}`, {
      headers: { accept: 'application/json' }, signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { data } = await res.json();
    let hits = 0;
    for (const row of data ?? []) {
      const g = GAMES.find(x => x.universeId === row.id);
      if (g && Number.isFinite(row.visits)) { g.visits = row.visits; hits++; }
    }
    console.log(`roblox api: refreshed ${hits}/${GAMES.length} titles`);
  } catch (err) {
    console.warn(`roblox api unavailable (${err.message}) — using baked-in figures`);
  }
}


/** Keep the markdown table in step with the SVGs — same source, same refresh. */
function injectTitlesTable() {
  if (!existsSync('README.md')) return;
  const rows = [...GAMES].sort((a, b) => b.visits - a.visits);
  const lines = [
    '| Title | Studio | What I built | Visits |',
    '|---|---|---|---|',
    ...rows.map(g => `| [${g.name}](https://www.roblox.com/games/${g.placeId}/) | ${g.studio} | ${g.note} | **${M(g.visits)}** |`),
    ...UNSHIPPED.map(u => `| ${u.name} | ${u.studio} | ${u.note} | *${u.status}* |`),
  ];
  const md = readFileSync('README.md', 'utf8');
  const next = md.replace(
    /<!-- TITLES:START -->[\s\S]*?<!-- TITLES:END -->/,
    `<!-- TITLES:START -->\n${lines.join('\n')}\n<!-- TITLES:END -->`);
  if (next !== md) { writeFileSync('README.md', next); console.log('README titles table refreshed'); }
}

await refresh();
const total = GAMES.reduce((a, g) => a + g.visits, 0);
const stamp = new Date().toISOString().slice(0, 10);

mkdirSync('assets', { recursive: true });
for (const theme of ['light', 'dark']) {
  setTheme(theme);
  const sfx = theme === 'dark' ? '-dark' : '';
  writeFileSync(`assets/card${sfx}.svg`, heroCard(total, GAMES.length));
  writeFileSync(`assets/card-narrow${sfx}.svg`, heroCardNarrow(total, GAMES.length));
  writeFileSync(`assets/titles${sfx}.svg`, titles(GAMES, UNSHIPPED, stamp));
  writeFileSync(`assets/work${sfx}.svg`, work());
  writeFileSync(`assets/tree${sfx}.svg`, tree());
  writeFileSync(`assets/loop${sfx}.svg`, loop());
  for (const b of BADGES) writeFileSync(`assets/badge-${b.id}${sfx}.svg`, badge(b));
}
injectTitlesTable();
console.log(`wrote 5 scenes + ${BADGES.length} badges x 2 themes — ${M(total)} lifetime visits (${stamp})`);
