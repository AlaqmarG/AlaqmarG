#!/usr/bin/env node
/**
 * Regenerates the SVGs in assets/ from live Roblox data.
 * No dependencies. Falls back to the baked-in figures in data.mjs if the API is unreachable.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { GAMES, UNSHIPPED } from './data.mjs';
import { M } from './kit.mjs';
import { heroCard } from './scenes/card.mjs';
import { titles } from './scenes/titles.mjs';

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
writeFileSync('assets/card.svg', heroCard(total, GAMES.length));
writeFileSync('assets/titles.svg', titles(GAMES, UNSHIPPED, stamp));
console.log(`wrote card.svg, titles.svg — ${M(total)} lifetime visits (${stamp})`);
