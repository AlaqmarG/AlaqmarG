// Shipped titles. `visits` is a fallback baked in at build time (read 2026-08-20)
// and is overwritten by the live Roblox API when the workflow runs.
export const GAMES = [
  { universeId: 2152417643, placeId: 5974747216,     name: 'Liberty Airport',   studio: 'Boltable Studio',    color: '#22D3EE', visits: 89540707, note: 'Brand activation · .NET telemetry API' },
  { universeId: 4975820673, placeId: 14400224477,    name: 'Team Obby',         studio: 'Boltable Studio',    color: '#22D3EE', visits: 87091237, note: 'Advertising & UGC purchase systems' },
  { universeId: 5661602976, placeId: 16428744594,    name: 'The Creepy Elevator', studio: 'Boltable Studio',  color: '#22D3EE', visits: 37535240, note: 'Timed rewards & currency payouts' },
  { universeId: 6765407669, placeId: 120011342431989, name: 'GOAL CLASH',       studio: 'Boltable × Club Brugge', color: '#38BDF8', visits: 28044237, note: 'Ball physics, controls, full UI & VFX' },
  { universeId: 7856269159, placeId: 126297188712308, name: 'Anime Overload!',  studio: 'Hi-Fun Interactive', color: '#FB7185', visits: 13870892, note: 'ECS gameplay, backend, CD pipeline' },
  { universeId: 6928499048, placeId: 86053660293681,  name: 'Escape The Labryn', studio: 'Shiloh & Bros',    color: '#A3E635', visits: 4458203,  note: '60 levels from 20 static elements' },
];

// Real work, zero visits. Kept on the board on purpose.
export const UNSHIPPED = [
  { name: 'Pudgy Penguins', studio: 'Landvault',     color: '#A78BFA', status: 'never shipped',    note: '4 procedural mini-games · physics, controls, UI' },
  { name: 'Eterna Online',  studio: 'Lead Developer', color: '#34D399', status: 'in development',  note: 'MMO RPG · Roblox Jumpstart' },
];

export const ROLES = [
  { color: '#A78BFA', co: 'Landvault',            role: 'Game Developer · Contract', dates: 'Sep 2023 — Feb 2024', m0: 0,  m1: 6,  metric: 'Pudgy Penguins · never shipped', ghost: true,  after: true },
  { color: '#22D3EE', co: 'Boltable Studio',      role: 'Software Developer',            dates: 'May 2024 — Feb 2025', m0: 8,  m1: 18, metric: '241M visits · 4 titles',   ghost: false, after: true },
  { color: '#A3E635', co: 'Shiloh & Bros',   role: 'Game Developer · Contract', dates: 'Mar 2025 — Aug 2025', m0: 18, m1: 24, metric: '4.4M visits · 15% D1', ghost: false, after: true },
  { color: '#FB7185', co: 'Hi-Fun Interactive',   role: 'Game Developer · Contract', dates: 'Nov 2025 — Apr 2026', m0: 26, m1: 32, metric: '13.8M visits · 30K CCU',    ghost: false, after: false },
  { color: '#34D399', co: 'Eterna Online',        role: 'Lead Developer',                dates: 'Jul 2026 — now',      m0: 34, m1: 36, metric: 'MMO RPG · in development',      ghost: false, after: false },
  { color: '#FBBF24', co: 'Royal Bank of Canada', role: 'DevOps Developer · Co-op',  dates: 'Jan 2026 — now',      m0: 28, m1: 36, metric: 'AI-agent governance',      ghost: false, after: false },
];

export const PALETTE = {
  bg: '#0B0E14', chrome: '#0E1219', line: '#1B2130', edge: '#222A38',
  text: '#E6EDF3', dim: '#8B95A5', mute: '#5B6472', faint: '#3F4855',
};
