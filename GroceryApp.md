# GroceryApp

A shared grocery list for the family, as an installable web app (PWA). Works offline.

## Status

v1: a single-device list. Items are stored in the browser's localStorage. Family sync is not built yet (planned: Firebase Firestore or Supabase, see below).

## Files

- `index.html` - UI, styles and page logic (ES module). Entry point.
- `list.js` - pure list logic: add, toggle, remove, clear checked, group by category. No DOM.
- `list.test.mjs` - unit tests for `list.js` (node:test).
- `sw.js` - service worker: caches the app shell (cache-first), so the app opens offline.
- `manifest.webmanifest` - PWA metadata (name, colours, standalone display).
- `package.json` - `npm test` and `npm start` scripts. No dependencies.

## Run and test

- Test: `npm test` (Node 18+, uses the built-in test runner).
- Run: the page uses ES modules and a service worker, so it must be served over HTTP, not opened as a file:
  - `npm start` (runs `npx serve .`), or
  - `npx http-server .`
- Open the URL on a phone, then "Add to Home Screen" to install it.

## Deploy

Not deployed yet. Any static host works (Netlify, Vercel, GitHub Pages, Firebase Hosting). Deploy the folder as-is; there is no build step.

## Conventions and gotchas

- Put pure logic in `list.js` and keep DOM code in `index.html`, so logic stays testable.
- Storage key: `grocery.list.v1`. Change the version suffix if the item shape changes.
- Storage writes are wrapped in try/catch: private mode or blocked storage degrades to an in-memory list.
- The service worker caches the shell. After changing `index.html`, `list.js` or other shell files, bump `CACHE` in `sw.js` (currently `grocery-v1`), or users keep the old version.
- `shortcut:` new items always get category "Other" (no picker yet).

## Planned next steps

1. Pick a backend (Firebase Firestore or Supabase) and create a project. Needs your account, so it's not set up here.
2. Family group: invite link or code, and an auth rule so only members can read or write the list.
3. Replace the localStorage calls with the backend, keeping `list.js` unchanged.
4. Category picker or name-based guessing; "staples" list for quick re-adding.
