# Profile maintenance

README.md owns the professional introduction, employer roles and high-level contributions, education, hobbies and contact links. Experience is always visible. Do not restore selected-project tiles, disclosure controls or oversized cards. Pins and repository descriptions are managed separately.

Keep the identity broad: software development across enterprise teams and game studios. Brock's degree remains explicitly in progress. The RBC contribution describes a self-healing agent, self-learning systems and AI governance at enterprise scale. Do not add internal system names, architecture, deployment counts or employer metrics. Avoid dates, current-role claims, availability announcements and graduation countdowns. Describe the VATSIM S2 rating as earned.

The employer and university marks have no added backplates or borders. Preserve their original proportions and letterforms. Shiloh and Brock use presentation variants derived from source artwork for light/dark contrast. Brock's wordmark supplies its visible name; its image alternative is Brock University. The Sea of Thieves logo is embedded in the hobby illustration. Source URLs and adaptations are recorded in assets/brands/SOURCES.json; keep the source assets needed by the builders.

Rebuild affected assets from the repository root:

```sh
node scripts/build-employer-marks.mjs
node scripts/build.mjs --module identity
node scripts/build.mjs --module off-clock
```

Commit generated assets with their sources. These scripts use Node built-ins and local assets; no credentials or network calls are required. scripts/build.mjs also retains unused legacy project generators and assets, which are not part of the current README. Use the scoped commands above for profile changes.

Identity and brand marks are static. Motion stays in the radar and sailing accents, with prefers-reduced-motion support. Keep meaningful native image alternatives and theme/mobile picture sources. Do not add a separate still-version link.

For sampled-state review:

```sh
node scripts/build.mjs --module off-clock --snapshot 7 --output frame.svg --dark --narrow
```

Valid snapshot times are 0 through 14 seconds. Check both themes and narrow layouts. Static renders do not establish browser animation playback; verify GitHub rendering separately when browser access is available. Keep local previews, research, review records and temporary snapshots outside this repository.
