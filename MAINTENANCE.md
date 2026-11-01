# Profile maintenance

The profile is a compact editorial index. Do not restore the oversized project tiles: the user rejected their repeated backgrounds, illustration area, and overall page length. Project modules are flat linked rows with a small static icon, title, concrete description, and technology context. README.md owns introduction, link destinations, image alternatives, and ordering. scripts/build.mjs owns visible asset copy, illustration, typography, colors, responsive composition, and animation. Keep the visible copy and alternative text consistent.

Run from this directory:

```sh
node scripts/build.mjs
```

The generator writes 26 SVGs: two decorative 24px inline icons (inline-code.svg and inline-ai.svg), plus 24 responsive assets: identity, project-csc, project-halt, project-ar, project-optisack, and off-clock, each with light/dark and wide/narrow variants. Names use optional -narrow then -dark suffixes. Commit generated assets with source changes. No dependencies, scheduled refreshes, external image services, or credentials are needed. Legacy header assets are no longer part of the published profile.

Each project is one native link around a picture element. Maintain meaningful alternative text describing the project and its technology, so the link remains identifiable when images fail or through assistive technology. Do not add fake sub-buttons inside image assets. Keep labels fixed. Project rows and identity are static; motion is confined to small radar and sailing accents. Avoid rounded enclosing backgrounds, numbered badges, and separate full project scenes. Support prefers-reduced-motion with a meaningful static fallback. Do not restore the separate still-version link; the user explicitly removed it.

For sampled-state review:

```sh
node scripts/build.mjs --module off-clock --snapshot 7 --output frame.svg --dark --narrow
```

Valid times are 0 through 14 seconds. Use the same module names as the asset list. Keep temporary review snapshots outside the published assets. Check themes and narrow layouts at actual display sizes, plus initial, middle, and loop-boundary states. Static renders and shared-sampler snapshots do not establish actual browser playback. Verify animation and GitHub rendering when browser access becomes available.

Lead with inspectable public projects. The opening covers general software engineering and AI product interests, then explains the appeal of enterprise scale. Two small decorative icons sit inline with the native text; keep empty alt text and explicit 24px dimensions to avoid repetition or a badge wall. Project rows state what the work is for, with technologies alongside. A short bridge before the hobby accents connects prior game development to gaming and virtual air traffic control. Keep this narrative distributed; do not add a separate long biography or enlarge the rows. The professional identity is broad software engineering, including product features, backend systems, automation, and an interest in applying AI to useful products. Enterprise scale is a motivation, not a restriction to DevOps or platform roles. Do not imply shipped AI product experience from private context. Prior game development is background, not a claim of current career intent. Native contact links follow the modules.

A private resume or conversation is not proof that an employer detail is public. Do not publish internal system names, implementation details, deployment scope, or employer metrics. No public sources were supplied for internal work. Public company statements do not establish personal contributions. Project diagrams are conceptual illustrations, not screenshots, benchmarks, measured scientific results, or employer architecture. Do not imply sole ownership of collaborative projects.

Avoid graduation countdowns, visit counters, availability announcements, current-role claims, and dated career timelines. Describe the S2 rating as earned so future ratings do not invalidate it. Pins and repository descriptions are managed separately in GitHub; keep those aligned with the selected projects.

Publishing this replacement retires the old Roblox statistics workflow and obsolete illustration assets. Preserve the existing commit as parent. Keep local research, third-party reference assets, review snapshots, and the HTML preview out of the profile repository.

The four showcased projects and pin order are Brock CSC portal, Storefront Lab (originally HALT), Git Out of Town, and Parallel Knapsack (originally OptiSack). HALT supplies public AI-product integration evidence and must be described as a team hackathon prototype, without claims of validated shopper realism, conversion gains, or production readiness. Cooling PINN remains secondary scientific-ML evidence; it is not deleted.

The personal repositories use storefront-lab (originally HALT) and parallel-knapsack (originally OptiSack). Preserve team attribution, original project names and history. Keep profile links and pins aligned with these repository addresses.
