# S2 Guide Hub Website

Static MVP website for `S2GuideHub.com`.

## Current Direction

Visual concept: Deep Ocean Console.

The first version is intentionally simple:

- `index.html` single-page Blueprint Atlas MVP
- `about.html`, `contact.html`, and `privacy.html` public support pages
- `unlocks/*.html` Blueprint Atlas item guide pages for Featured Unlocks
- `css/styles.css` visual system and responsive layout
- `js/main.js` homepage bilingual copy, language switcher, unlock data, and unlock filtering
- `js/guide-data.js` shared bilingual content for item guide pages
- `js/guide-page.js` shared item guide renderer and language switcher
- `assets/deep-ocean-console.png` original generated hero background
- `DESIGN.md` design architecture and expansion notes
- `robots.txt`, `sitemap.xml`, `_headers`, and `_redirects` for basic static deployment

## Design System

Core palette:

- Deep ocean background: `#02090d`, `#061219`
- Console surfaces: translucent blue-green dark panels
- Primary signal: `#26ead7`
- Secondary signal: `#ffc95f`
- Risk signal: `#ff7f73`
- Text: `#f3fbfb`, `#9db9bb`

Core layout:

- Sticky header with language switcher
- Full-bleed hero using original ocean console art
- Featured unlock cards with score, risk, distance, and verification labels
- Clickable Featured Unlock cards linking to matching item guide pages
- Searchable unlock index
- Route logic, item-page template preview, Blog, FAQ, and disclaimer
- Section-level Back to top links for faster navigation
- Google AdSense placeholder slots reserved for later monetization

## Content Policy

Do not publish exact coordinates, creature behavior, resource spawn claims, or patch details unless verified and dated.

Blog automation is planned for a later phase. The intended workflow is to search fresh Subnautica 2 news daily, check sources, write a dated blog draft, and attach an image before publishing.

AdSense is planned for a later phase. Each public page should keep reserved ad slots, but real AdSense code should only be added after the domain, privacy policy, consent needs, and publisher account are ready.

Public disclaimer:

> S2 Guide Hub is an independent fan-made guide website. Game names, trademarks, and related assets belong to their respective owners.

## Preview

Open `index.html` directly in a browser.

No build step is required for this MVP.

## Blueprint Atlas Update

Decision date: 2026-05-28

The site has been redirected from a broad survival guide hub toward **Blueprint Atlas / 蓝图路线图谱**.

The current code version focuses on high-value unlock routes:

- Item value explanation
- Required parts and future coordinates
- Optimized travel route
- Risk warnings
- Easy benefits along the way
- Shared item-page sections: Summary, Player value, Required parts, Optimized route, Risks and extras, Verification
- Blog updates tied to blueprint discoveries and route changes

Existing requirements to preserve:

- Static HTML/CSS/JS first
- English / Simplified Chinese switcher
- Blog navigation and homepage section
- Reserved Google AdSense slots
- Independent fan-site disclaimer
- Deep Ocean Console visual direction
