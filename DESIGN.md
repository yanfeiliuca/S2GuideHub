# S2 Guide Hub Design Architecture

## 1. Product Shape

First release format: static single-page MVP.

Core idea: a practical deep-ocean expedition console, not a generic wiki, esports site, or official-looking game page.

Primary jobs:

- Help a player decide which high-value unlock to chase next.
- Help a returning player quickly compare unlock value, risk, distance, and confidence.
- Mark uncertain Early Access details clearly.
- Support English and Simplified Chinese from the start.

## 2. Page Architecture

Homepage order:

1. Sticky navigation and language switcher
2. Full-bleed deep-ocean hero with two main actions
3. Blueprint Atlas overview
4. Featured Unlocks
5. Guide Logic
6. Unlock Index
7. Route Planner Preview
8. Blog
9. FAQ and fan-site disclaimer
10. Footer links for About, Contact, Privacy, and Back to top

This order puts useful tools before long-form reading.

## 3. Visual System

Design name: Deep Ocean Console.

Palette:

| Role | Color |
|---|---|
| Deep background | `#02090d` |
| Main background | `#061219` |
| Console panel | `rgba(8, 24, 31, 0.82)` |
| Primary signal | `#26ead7` |
| Soft signal | `#9affef` |
| Warning signal | `#ffc95f` |
| Risk signal | `#ff7f73` |
| Success signal | `#8df6a9` |
| Main text | `#f3fbfb` |
| Muted text | `#9db9bb` |

Background policy:

- Use original or generated assets only.
- Do not use official screenshots, logos, or copyrighted game art.
- Keep the first viewport immersive but still useful.
- Avoid generic neon arcade, esports purple, or template-like gradients.

Current hero asset:

- `assets/deep-ocean-console.png`
- Generated locally as an original raster background.
- Contains deep water, light shafts, subtle HUD lines, seabed silhouettes, and scan motifs.

## 4. Interaction Model

Current interactions:

- English / Simplified Chinese switcher
- Persistent language preference when browser storage is available
- Unlock search
- Category filters: All, Mobility, Vehicle, Utility, Depth
- FAQ disclosure panels
- Section-level Back to top links
- Static About, Contact, and Privacy pages

AdSense readiness:

- Every public page should include reserved Google AdSense positions before launch.
- Label reserved units clearly as advertising space.
- Do not add real AdSense code until the domain, privacy policy, consent requirements, and publisher account are ready.
- Avoid placing ads where they interrupt primary actions such as language switching, search, or route reading.

Future interactions:

- Verified unlock database
- Route cards by item, biome, or objective
- Required-parts checklist export
- Source and change-log panels for each item
- Patch impact timeline
- Blog publishing pipeline

## 5. Blog Automation Plan

The first release keeps a Blog menu item and homepage section ready for launch.

Future daily workflow:

1. Search the web for fresh Subnautica 2 news, patch notes, developer posts, and high-signal community discoveries.
2. Check sources before writing. Prefer official sources, Steam, verified developer channels, and reputable player evidence.
3. Generate a short daily blog draft with source links, a clear date, and a note for uncertain claims.
4. Prepare or generate a matching image.
5. Publish to the Blog section or a future `/blog/` page.

Possible triggers:

- Daily scheduled task.
- Codex startup task.
- Manual "run today's blog update" command.

## 6. Content Verification Rules

The site should not publish exact resource locations, creature behavior, coordinates, or patch effects unless the claim is verified.

Recommended labels:

- Confirmed
- Observed
- Needs gameplay check
- Patch-sensitive
- Last checked: YYYY-MM-DD

MVP unlock entries and Blog entries are framework placeholders. They should be replaced with verified guide data before heavy public promotion.

## 7. Expansion Path

Phase 1:

- Polish the single-page MVP.
- Replace placeholders with verified guide content.
- Keep Blog entry point live, even before automation is added.
- Keep AdSense slots reserved on every public page.
- Add analytics and search console.
- Deploy to Cloudflare Pages.

Phase 2:

- Split into SEO pages:
  - `/en/unlocks/tadpole-vehicle/`
  - `/en/unlocks/improved-fins/`
  - `/en/unlocks/tadpole-depth-module-mk-i/`
  - `/en/routes/`
  - `/zh/unlocks/tadpole-vehicle/`
  - `/zh/routes/`
  - `/blog/`

Phase 3:

- Consider migrating to Next.js if reusable content, structured data, and tools become hard to maintain in static files.

## 8. Blueprint Atlas Information Architecture

Decision date: 2026-05-28

The Deep Ocean Console visual system remains approved, and the information architecture now uses a focused **Blueprint Atlas**.

### Updated Navigation

Recommended nav for the next homepage version:

- Atlas
- Unlocks
- Routes
- Blog
- FAQ

### Updated Homepage Modules

1. **Hero**
   - S2GuideHub outer brand
   - Blueprint Atlas product name
   - High-value unlock route promise
2. **Featured Unlocks**
   - Five flagship items with score, category, risk, distance, and confidence labels
3. **Guide Logic**
   - Why it matters
   - Required parts
   - Optimized route
   - Risk warnings
   - Easy benefits
4. **Unlock Index**
   - Filterable or searchable list of high-value assembled/unlocked items
5. **Route Preview**
   - Shows how one optimized route is structured without pretending all coordinates are verified
6. **Blog**
   - Daily signal for blueprint discoveries, patch changes, route corrections, and item-page updates
7. **FAQ / Disclaimer**
   - Fan-site status and verification policy

### Visual Notes

The page should feel like a route-planning console for an expedition:

- Use score chips, confidence chips, risk labels, and route-step cards.
- Keep density higher than a marketing page but calmer than a wiki.
- Avoid making the homepage look like a full interactive map competitor.
- Preserve ad slots as quiet reserved bands between major content groups.
