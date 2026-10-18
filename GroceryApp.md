# GroceryApp

A shared grocery list for the family, as an installable web app (PWA). Works offline.

## Status

v1: a single-device list with saved orders and an order filter. Data is stored in the browser's localStorage (`grocery.list.v1`, `grocery.orders.v1`). Family sync is not built yet (planned: Firebase Firestore or Supabase, see below).

## Files

- `grocery.html` - UI, styles and page logic (ES module). Entry point.
- `list.js` - pure list logic: add (first letter capitalized), toggle, remove, clear checked, group by category, suggestion names. No DOM.
- `translate.js` - Hebrew to English dictionary for common grocery words (offline). Unknown words are kept as typed. Add words to `HE_TO_EN`.
- `orders.js` - saved orders: snapshot the list (`saveOrder`), find one, copy one back into the list (`copyOrderToList`).
- `list.test.mjs`, `translate.test.mjs`, `orders.test.mjs` - unit tests (node:test).
- `sw.js` - service worker: caches the app shell (cache-first), so the app opens offline.
- `manifest.webmanifest` - PWA metadata (name, colours, standalone display).
- `package.json` - `npm test` and `npm start` scripts. No dependencies.
- `.gitignore` - ignores `node_modules/`.

## Git

- Local git repo on branch `main` (first commit `86a5e55`). Not yet pushed to GitHub.
- Planned: public GitHub repo `GroceryApp` (needed for free GitHub Pages hosting).
- The folder is inside OneDrive; if `.git` misbehaves (lock or sync errors), move the repo out of OneDrive.

## Run and test

- Test: `npm test` (Node 18+, uses the built-in test runner).
- Run: the page uses ES modules and a service worker, so it must be served over HTTP, not opened as a file:
  - `npm start` (runs `npx serve .`), or
  - `npx http-server .`
- Open the URL on a phone, then "Add to Home Screen" to install it.

## Deploy

Not deployed yet. Any static host works (Netlify, Vercel, GitHub Pages, Firebase Hosting). Deploy the folder as-is; there is no build step.

## Conventions and gotchas

- Put pure logic in `list.js` and keep DOM code in `grocery.html`, so logic stays testable.
- Storage key: `grocery.list.v1`. Change the version suffix if the item shape changes.
- Storage writes are wrapped in try/catch: private mode or blocked storage degrades to an in-memory list.
- The service worker caches the shell. After changing `grocery.html`, `list.js` or other shell files, bump `CACHE` in `sw.js` (currently `grocery-v8`); also list every module file in `SHELL`, or users keep the old version.
- Orders: "Save as order" snapshots the current list (all items, checked or not). The filter switches between the current list and an order; an order is read-only, and "Copy this order to my list" adds its items as new. Orders can't be deleted yet.
- Suggestions: a list under the add box (`#suggest`) filters as you type, built from the grocery dictionary and from names already used in lists and orders (typing "toma" offers "Tomatoes"). Tap a suggestion to fill the box.
- `shortcut:` new items always get category "Other" (no picker yet).
- `shortcut:` translation is a dictionary, not machine translation. A free online API (MyMemory) mistranslated single words (חלב became "Aleppo"), so it was not used.

## Planned next steps

1. Pick a backend (Firebase Firestore or Supabase) and create a project. Needs your account, so it's not set up here.
2. Family group: invite link or code, and an auth rule so only members can read or write the list.
3. Replace the localStorage calls with the backend, keeping `list.js` unchanged.
4. Category picker or name-based guessing; "staples" list for quick re-adding.
