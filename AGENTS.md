# Proseduria Agent Guide

## Project Overview

PROSEDURIA is an Indonesian educational web game, "Ekspedisi Logika Nusantara". It is a browser-based static experience served by a small Express server; there is no frontend framework or bundler.

## Repository Layout

- `index.html`: markup, local font declarations, scene structure, and much of the game styling.
- `css/style.css`: scene and component styles.
- `css/responsive.css`: responsive overrides; keep viewport behavior in this file.
- `js/app.js`: global `App` controller, navigation, player data, audio, and mission entry points.
- `js/mission01.js`: Mission 01 behavior.
- `server.js`: Express static-file server and fallback to `index.html`.
- `aset/`: offline game assets, including fonts, images, audio, and video. Preserve existing filenames and paths, including spaces.
- `README.md`: existing project notes and local run instructions.

## Commands

Run these from the repository root:

- `npm install`: install dependencies.
- `npm run dev` or `npm start`: serve the game at `http://localhost:3000`.
- `npm run lint`: syntax-check `server.js` with `node -c`.
- `npm run build`: run the project's lightweight build check.

There is no automated browser test suite. For UI or game-flow changes, run the server and manually verify the affected scene, navigation, audio controls, asset loading, and a narrow/mobile viewport.

## Implementation Conventions

- Preserve the existing vanilla HTML/CSS/JavaScript architecture. Do not introduce a framework or bundler for a focused change.
- Keep user-facing text in Indonesian and maintain the existing educational/game tone.
- Use the existing local fonts and asset paths so the game remains usable offline. Do not replace local assets with external URLs without an explicit requirement.
- Route scene changes through `App.navigateTo()` and keep shared state or audio behavior in `App` rather than duplicating it in scene code.
- When adding assets, use clear names and update every reference consistently; asset paths are case-sensitive when deployed.
- Avoid broad formatting or asset renames. Large binary files belong under `aset/`, not in source folders.
- Do not commit secrets or local environment files. `node_modules` is intentionally ignored.

## Change Validation

After JavaScript changes, run `npm run lint` and load the affected flow through `npm run dev`. After markup, CSS, or asset changes, also check the browser console and confirm that referenced files return successfully.