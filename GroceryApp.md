# GroceryApp (brand: Basketry)

Brand: **Basketry**. Colours: green `#2e7d32` (accent), off-white `#f6f7f4` (background). Logo: `icon.svg`. Check the name is free before publishing.

A shared grocery list for the family, as an installable web app (PWA). Works offline.

## Status

v1 with Firebase sync: the list and saved orders live in one Firestore document, `families/<family code>`. Each phone signs in anonymously and remembers the family code (localStorage `basketry.family`). Offline edits are kept and sent later.

## Files

- `grocery.html` - the app: UI, styles and page logic (ES module).
- `list.js` - pure list logic: add (first letter capitalized, optional Hebrew `he`), displayName ("Potatoes [תפוחי אדמה]"), toggle, remove, clear checked, group by category, suggestion names. No DOM.
- `translate.js` - Hebrew to English dictionary for common grocery words (offline). `bilingual()` gives English name plus Hebrew (either direction). Unknown words are kept as typed. Add words to `HE_TO_EN`.
- `orders.js` - saved orders: snapshot the list (`saveOrder`), find one, copy one back into the list (`copyOrderToList`).
- `list.test.mjs`, `translate.test.mjs`, `orders.test.mjs` - unit tests (node:test).
- `firestore.rules` - Firestore security rules. Paste into Firebase console → Firestore → Rules.
- `index.html` - identical copy of `grocery.html`, so the GitHub Pages root opens the app. Copy `grocery.html` over it whenever the app changes (`cp grocery.html index.html`).
- `sw.js` - service worker: network-first; the cached app shell is used only when offline.
- `manifest.webmanifest` - PWA metadata (name, colours, standalone display, icon).
- Onion words: בצל = yellow onion, בצל ירוק = green onion, בצל אדום = red onion, בצל לבן = white onion. Typing English "onion" gives no Hebrew.
- `icons.js` - `ICON_FOR` maps each lowercase English name to a photo in `photos/` (about 2.2 MB, 66 photos from Wikimedia Commons). Names without a photo show a letter circle. `photos/CREDITS.md` lists each photo's author and licence; keep it with the photos.
- `icon.svg` - app logo and icon (green basket with a leaf). Used by the header, the browser tab and the installed app.
- `package.json` - `npm test` and `npm start` scripts. No dependencies.
- `.gitignore` - ignores `node_modules/`.

## Git

- Repo: https://github.com/mneyshtadt-stack/Basketry (public, branch `main`). Local folder is the same repo; `origin` points there.
- Push: `git push` from this folder. The GitHub repo was created with a README, so the history was merged once.
- The folder is inside OneDrive; if `.git` misbehaves (lock or sync errors), move the repo out of OneDrive.

## Run and test

- Test: `npm test` (Node 18+, uses the built-in test runner).
- Run: the page uses ES modules and a service worker, so it must be served over HTTP, not opened as a file:
  - `npm start` (runs `npx serve .`), or
  - `npx http-server .`
- Open the URL on a phone, then "Add to Home Screen" to install it.

## Deploy

Planned: GitHub Pages from `main` (root). Live address: `https://mneyshtadt-stack.github.io/Basketry/`. Pages must be switched on in repo Settings → Pages.
Firebase: the new domain must be listed under Authentication → Settings → Authorized domains, or anonymous sign-in is refused there.
No build step: deploy the folder as-is.

## Conventions and gotchas

- Put pure logic in `list.js` and keep DOM code in `grocery.html`, so logic stays testable.
- Data: one Firestore document per family, `families/<code>`, holding `{ items, orders }`. Changing the item shape is safe; old items just lack new fields.
- Family code is the only secret: anyone who knows it can read and change that list. Firebase config values are public identifiers; the rules protect the data.
- `shortcut:` two phones editing at the same moment: last save wins. Upgrade to per-item writes if this bites.
- `shortcut:` a family code is typed once per device (join form on first visit); there is no way to switch codes in the app yet.
- Storage writes are wrapped in try/catch: private mode or blocked storage degrades to an in-memory list.
- Service worker is network-first: online loads fetch the latest files and refresh the cache; the cache is used only when offline. Users get updates on reload without a hard refresh. Bump `CACHE` in `sw.js` (currently `grocery-v18`) only when the offline fallback's file list (`SHELL`) changes.
- Orders: "Save as order" snapshots the current list (all items, checked or not). The filter switches between the current list and an order; an order is read-only, and "Copy this order to my list" adds its items as new. Orders can't be deleted yet.
- Suggestions: a floating card under the add box (`#suggest`, styled like a search dropdown: top 3 as tiles, rest as rows with an arrow that fills the box). It filters as you type, built from the grocery dictionary and from names already used in lists and orders (typing "toma" offers "Tomatoes"). Tap a suggestion to fill the box.
- `shortcut:` new items always get category "Other" (no picker yet).
- `shortcut:` translation is a dictionary, not machine translation. A free online API (MyMemory) mistranslated single words (חלב became "Aleppo"), so it was not used.

## Planned next steps

1. Firebase is set up and saving works (tested in one browser). Still to do: test on two phones with the same family code.
   Setup steps: Firestore Database created, Rules published from `firestore.rules`, Authentication → Anonymous enabled.
2. Category picker or name-based guessing; "staples" list for quick re-adding.
3. Delete saved orders; change family code.
