#!/usr/bin/env node
/**
 * Regenerates every SVG in assets/ from live Roblox data.
 * No dependencies. Falls back to the baked-in figures in data.mjs if the API is unreachable.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { GAMES, UNSHIPPED } from './data.mjs';
import { M } from './kit.mjs';
import { hero } from './scenes/hero.mjs';
import { map } from './scenes/map.mjs';
import { scores } from './scenes/scores.mjs';
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

await refresh();
const total = GAMES.reduce((a, g) => a + g.visits, 0);
const stamp = new Date().toISOString().slice(0, 10);

mkdirSync('assets', { recursive: true });
writeFileSync('assets/hero.svg', hero(total, GAMES.length));
writeFileSync('assets/map.svg', map());
writeFileSync('assets/scores.svg', scores(GAMES, UNSHIPPED, stamp));
writeFileSync('assets/tree.svg', tree());
writeFileSync('assets/loop.svg', loop());
for (const b of BADGES) writeFileSync(`assets/badge-${b.id}.svg`, badge(b));

console.log(`wrote hero, map, scores, tree, loop + ${BADGES.length} badges — ${M(total)} lifetime visits (${stamp})`);
