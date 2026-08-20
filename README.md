<div align="center">

<img src="https://raw.githubusercontent.com/AlaqmarG/AlaqmarG/main/assets/hero.svg" alt="Alaqmar Gandhi — Game Developer, Platform Engineer, Live-Ops" />

<br/>

<a href="https://create.roblox.com/talent/creators/346676728"><img src="https://raw.githubusercontent.com/AlaqmarG/AlaqmarG/main/assets/badge-talenthub.svg" alt="Roblox Talent Hub — verified credits" /></a>
<a href="https://linkedin.com/in/alaqmarg"><img src="https://raw.githubusercontent.com/AlaqmarG/AlaqmarG/main/assets/badge-linkedin.svg" alt="LinkedIn — alaqmarg" /></a>
<a href="mailto:alaqmargandhi@gmail.com"><img src="https://raw.githubusercontent.com/AlaqmarG/AlaqmarG/main/assets/badge-email.svg" alt="Email — alaqmargandhi@gmail.com" /></a>
<a href="https://discord.com/users/alaqmarg"><img src="https://raw.githubusercontent.com/AlaqmarG/AlaqmarG/main/assets/badge-discord.svg" alt="Discord — alaqmarg" /></a>
<img src="https://raw.githubusercontent.com/AlaqmarG/AlaqmarG/main/assets/badge-location.svg" alt="Based in Ontario, Canada and Dubai, UAE" />

</div>

<br/>

## The run

A London studio hired me as a contract game developer in **September 2023**. My first
lecture at Brock was a few weeks after that. I have been shipping ever since — five game
studios, one bank, six live titles, and one game that never came out.

The path forks in 2026 and never rejoins, which is accurate. Brock's co-op programme
alternates study terms and work terms, so the games branch and the platform branch have been
running side by side rather than stacked on top of classes — and both are still live.

<img src="https://raw.githubusercontent.com/AlaqmarG/AlaqmarG/main/assets/map.svg" alt="Career map from September 2023 to now: Landvault, Boltable Studio, Shiloh &amp; Bros, Hi-Fun Interactive, Eterna Online, and Royal Bank of Canada" />

<br/>

## Shipped

Every title below is on my [Roblox Talent Hub](https://create.roblox.com/talent/creators/346676728).
Roblox only lets a creator attach an experience there if they have held edit access to that
place, so the credits are platform-verified rather than self-reported. **The scores below are
read from the Roblox API by a scheduled workflow in this repo — nothing here is typed in by
hand, and the numbers go up while you are not looking.**

<img src="https://raw.githubusercontent.com/AlaqmarG/AlaqmarG/main/assets/scores.svg" alt="High score table of shipped Roblox titles ranked by lifetime visits, plus two projects with no score" />

The two entries under the line have no score and are on the board deliberately. One is an MMO
still in development. The other is a real six-month contract on a game that was cancelled
before launch — an ordinary thing in this industry, and leaving it off would make the rest of
the table less honest.

<br/>

## How a change reaches players

The thing I am actually good at is the loop, not any single feature in it. Ship from CI so
nobody publishes by hand, measure what players do, and let the funnel decide what gets built
next.

<img src="https://raw.githubusercontent.com/AlaqmarG/AlaqmarG/main/assets/loop.svg" alt="The delivery loop: merge to main, GitHub Actions build, Mantle and Open Cloud publish, live places, telemetry and funnel analytics, feeding back into what ships next" />

<br/>

## Chapters

<details>
<summary><b>Eterna Online</b> — Lead Developer · Jul 2026 – present · Remote</summary>

<br/>

An MMO RPG on Roblox, in active development. I own systems and the roadmap: scoping work
into milestones, setting build priorities across the team, and deciding what ships each
cycle. Built in `roblox-ts` with Flamework and Rojo, tested with TestEZ.

Selected into **[Roblox Jumpstart](https://about.roblox.com/newsroom/2026/03/roblox-announces-incubator-jumpstart-creator-programs)**,
Roblox's pitch-based programme for creators building new game concepts.

It has not launched, so it has no players, no revenue and no retention curve, and I am not
going to imply otherwise. What it has is scope I am accountable for.

</details>

<details>
<summary><b>Royal Bank of Canada</b> — DevOps Developer, Co-op · Jan 2026 – present · Toronto</summary>

<br/>

Core services for an **AI-agent governance platform** — the system that decides whether a
repository running agentic workflows is allowed to ship.

- Event-driven detection that gates repositories with agentic changes behind automated
  compliance checks, with GitHub check-run reporting and JSON Schema validation of agent
  card manifests.
- A CronJob that parses repository SBOMs to maintain the bank's inventory of agent-enabled
  repositories — I wrote the reconciliation logic for onboarded and removed repos, indexed
  to Elasticsearch.
- Supply-chain hardening: Cosign artifact signing, plus pipeline gates that block
  non-release-branch artifacts from reaching release deployments. Also stabilised a set of
  consistently failing DAST scans.
- Designed the initial architecture for a self-healing service that remediates pipeline
  failures through layered deterministic checks before it is allowed to fall back to an LLM.

Same instinct as the live-ops work, different blast radius: make shipping automatic, and
make it auditable.

</details>

<details>
<summary><b>Hi-Fun Interactive</b> — Game Developer, Contract · Nov 2025 – Apr 2026 · Remote</summary>

<br/>

**[Anime Overload!](https://www.roblox.com/games/126297188712308/Anime-Overload)** — a live
anime tower defense title, 13.9M+ visits and 30K peak CCU. Game UI, core backend logic and
gameplay systems, built on an in-house ECS.

I also built the studio's **continuous deployment pipeline** — Mantle, Roblox Open Cloud,
DarkLua, Lune and GitHub Actions — so updates reach live places from a merged pull request
instead of someone publishing out of Studio and hoping.

Ran at 30–40 hours a week alongside a full-time co-op. That overlap is the amber box on the
timeline.

</details>

<details>
<summary><b>Shiloh &amp; Bros</b> — Game Developer, Contract · Mar 2025 – Aug 2025 · Tennessee (remote)</summary>

<br/>

**[Escape The Labryn](https://www.roblox.com/games/86053660293681/Escape-The-Labryn-Shiloh-Bros)** — 4.5M+ visits.

- A procedural map generation system producing **60 unique levels from 20 static elements**,
  plus the decoration and optimisation passes over them. Sessions held at 20+ minutes with
  15% Day 1 retention — the 95th percentile of Roblox experiences.
- NPC behaviour trees, enemy and tool interactions, and the queuing and matchmaking layer.
- Funnel event tracking that isolated a 30% churn point and a 20% drop in step completion.
  Rebalancing rewards and offers around that step lifted **payer conversion 62.5%**.

The funnel work is the part I would want to be asked about. Finding the step where players
leave is most of the job; the monetisation change was the easy half.

</details>

<details>
<summary><b>Boltable Studio</b> — Software Developer, Co-op then Contract · May 2024 – Feb 2025 · Yas Creative Hub, Abu Dhabi</summary>

<br/>

Ten months on-site in Abu Dhabi, running live-ops across the studio's portfolio: update and
release cadence, directing other developers, tuning economy and monetisation across titles,
and owning the telemetry coming off the servers.

Shipped features into four titles totalling **241M+ visits**:

| Title | Visits | What I built |
|---|---|---|
| [Liberty Airport](https://www.roblox.com/games/5974747216/) | 89.5M+ | A brand activation running players through an in-game challenge that issued a real discount code on the partner's site, with a .NET API tracking completion state |
| [Team Obby](https://www.roblox.com/games/14400224477/) | 87.1M+ | Advertising and UGC preview and purchase systems |
| [The Creepy Elevator](https://www.roblox.com/games/16428744594/) | 37.5M+ | Timed rewards, HUD timers, item and currency payouts |
| [GOAL CLASH](https://www.roblox.com/games/120011342431989/) | 28.0M+ | Ball physics, player controls, and the full front-end UI, animation and VFX layer |

Underneath all of it: an **ASP.NET Core backend processing 2M+ API requests a month across
300+ live game servers** for advertising analytics and telemetry ingestion, the studio's
React and Next.js web platform at 1.4M+ monthly requests, and a custom Luau state
synchronisation system that cut multiplayer reconciliation errors **58%**.

Boltable's publicly listed brand partners include **[Club Brugge](https://boltablestudio.com/services/club-brugge)**
— whose verified Roblox group publishes GOAL CLASH — **Chalhoub Group**, and
**Prestidge Group**.

</details>

<details>
<summary><b>Landvault</b> — Game Developer, Contract · Sep 2023 – Feb 2024 · London (remote)</summary>

<br/>

The first one. Recruited weeks before I started university, into a London studio that was
then one of the largest builders in the space — Landvault was acquired by Infinite Reality
in a [$450M deal](https://www.globenewswire.com/news-release/2024/07/09/2910405/0/en/infinite-reality-closes-350-million-investment-acquires-landvault-in-450-million-deal-valuation-soars-to-5-1-billion.html)
the following year.

I built the custom physics system, player controls and interface layer shared across **four
procedurally generated mini-games** for Landvault's **Pudgy Penguins** Roblox title, and
introduced the Wally package manager so shared code lived in versioned internal packages
instead of being copied between projects.

**The game never shipped.** Six months of real work that no player has ever loaded. I
learned more from that than from anything that launched cleanly, and it is why the delivery
loop above is the thing I care most about now.

</details>

<br/>

## What I reach for

Five branches. The Roblox and live-ops side and the backend and platform side are the two
halves of the timeline above, and they feed each other more than people expect — a release
pipeline is a release pipeline whether it ships a tower defense update or a bank service.

<img src="https://raw.githubusercontent.com/AlaqmarG/AlaqmarG/main/assets/tree.svg" alt="Talent tree of skills across five branches: Roblox, live-ops, backend, platform and languages" />

<br/>

## Elsewhere in my repos

| | |
|---|---|
| **[git-out-of-town](https://github.com/AlaqmarG/git-out-of-town)** | Spray-paint the real world. Paint on a real surface in ARKit, it lands on a public map seconds later. SwiftUI · ARKit · Next.js · MapLibre · PostgreSQL. Built in 26 hours at SummerHacks 2026 |
| **[street-scope](https://github.com/AlaqmarG/street-scope)** | Vehicle-mounted computer vision that turns street-level imagery into road-defect reports for a regional municipality. OpenCV · YOLO · OSMnx · NetworkX |
| **[OptiSack](https://github.com/AlaqmarG/OptiSack)** | Parallel 0/1 knapsack solver benchmarked against a sequential baseline on Apple Silicon. OpenMP · OpenMPI · C++ |
| **[arc-agi-program-synthesis](https://github.com/AlaqmarG/arc-agi-program-synthesis)** | Dependency-free program synthesis over composable grid operations for ARC-AGI. BFS, greedy best-first and A\* with admissible heuristics |
| **[HALT](https://github.com/AlaqmarG/HALT)** | Multi-agent e-commerce A/B testing. A store-manager agent proposes layouts, persona agents drive the live UI, interaction events close the loop |
| **[genetic-cryptanalysis](https://github.com/AlaqmarG/genetic-cryptanalysis)** | Genetic algorithm for Vigenère cryptanalysis, parallelised with realtime visualisation |
| **[SourceSeer](https://github.com/AlaqmarG/SourceSeer)** | A deep-research agent that generates reports on codebases from a plain-language prompt |
| **[Click-Counter](https://github.com/AlaqmarG/Click-Counter)** | Small, but it is the public proof of my Roblox stack — roblox-ts, React, Lyra, Flamework |
| **[BrockCSC/website](https://github.com/BrockCSC/website)** | The Brock Computer Science Club site and exec portal for 900+ students. Self-hosted JMAP webmail, Keycloak auth, cookieless analytics, a ⌘K command palette. I am the primary author |

<br/>

## Also true

- **B.Sc. Computer Science, Co-op (Honours)** at Brock University, GPA 3.90 — Brock Scholars
  Award, Mrs. Bacon Bursary, Dean's Honour List. Graduating April 2028.
- Part of Brock's delegation to **[CS Games 2026](https://brocku.ca/mathematics-science/computer-science/2026/07/02/computer-science-students-earn-first-place-in-ai-competition-at-cs-games/)**
  at Polytechnique Montréal, where the team took first place in the AI competition.
- I boulder. I have strong opinions about my La Sportiva Tarantulas and they are all wrong.

<div align="center">
<br/>

<img src="https://raw.githubusercontent.com/AlaqmarG/AlaqmarG/output/snake.svg" alt="Contribution snake" />

<br/><br/>

*The numbers on this page update themselves. Everything else you'll have to ask me about.*

</div>
