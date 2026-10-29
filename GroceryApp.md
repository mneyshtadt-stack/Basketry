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
- `manifest.webmanifest` - PWA metadata (name, colours, standalone display, icons). Chrome needs a PNG icon of at least 192 px to offer install, so `icon-512.png` is listed first.
- `icon-512.png` - app icon (512 px PNG), drawn to match `icon.svg`.
- Potato, tomato and cherry tomato use the owner's own photos (`photos/potato-own.jpg`, `photos/tomato-own.jpg`, `photos/cherry-tomato-own.jpg`, `photos/chili-pepper-own.jpg`, `photos/grapes-own.jpg`, `photos/clementine-own.jpg`, `photos/laundry-detergent-own.jpg`, `photos/oil-own.jpg`, `photos/parmesan-own.jpg`, `photos/sweet-potato-own.jpg`, `photos/cheese-own.jpg`, `photos/cottage-own.jpg`, `photos/clupeidae-own.jpg`, `photos/tuna-own.jpg`, `photos/cream-cheese-own.jpg`, `photos/ground-meat-own.jpg`, `photos/turkey-breast-own.jpg`, `photos/chicken-breast-own.jpg`, `photos/drumsticks-own.jpg`, `photos/leg-quarters-own.jpg`, `photos/spelt-bread-own.jpg`, `photos/salmon-own.jpg`, `photos/smoked-salmon-own.jpg`, `photos/baguette-own.jpg`, `photos/plum-own.jpg`, `photos/celery-own.jpg`, `photos/celery-hearts-own.jpg`, `photos/kiwi-own.jpg`, `photos/hummus-own.jpg`, `photos/tahini-own.jpg`, `photos/buckwheat-own.jpg`, `photos/ginger-own.jpg`, `photos/mackerel-own.jpg`, `photos/mayonnaise-own.jpg`).
- The list shows the English name from the Hebrew label when known (`englishName` in grocery.html), so older rows update without re-adding.
- Pictures are looked up by the English name (`bilingual(name).name`), so Hebrew suggestions get pictures too.
- English item names are singular (Cucumber, Tomato, Apple); the quantity box handles counts.
- Onion words: בצל יבש and בצל = Onion (English name is Onion, with the yellow onion photo), בצל ירוק = green onion, בצל אדום = red onion. Typing English "onion" gives no Hebrew.
- `icons.js` - `ICON_FOR` maps each lowercase English name to a photo in `photos/` (about 2.2 MB, 65 photos from Wikimedia Commons, plus the owner's own photos: onions (yellow, green, red), eggs, peaches, oranges, lactose-free milk, challah, radish, romaine and iceberg lettuce). Names without a photo show a letter circle. `photos/CREDITS.md` lists each photo's author and licence; keep it with the photos.
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
- `shortcut:` a family code is typed once per device (join form on first visit; the list, tabs, add row and footer stay hidden until then, via `body.joining`); there is no way to switch codes in the app yet.
- Storage writes are wrapped in try/catch: private mode or blocked storage degrades to an in-memory list.
- On screens 900 px and wider, a sidebar (current list, saved orders, family code) sits beside the list (`aside.side`, `renderSidebar()`); the family code is behind a `<details>` tap, and the Hebrew subtitle sits in the sidebar; on phones the sidebar is hidden and the layout is unchanged.
- Background: a mint-to-cream gradient (`--page`, fixed on the body; deep green-black in dark mode) with a faint food doodle pattern on top (`--pattern`, an inline SVG; no network request).
- Tap a picture in the list to see it full size (a `<dialog>`; tap anywhere to close). The click is stopped so it doesn't tick the item.
- Install on Android needs `icon-512.png` (SVG alone is not enough for the install prompt). Keep it in the manifest.
- Service worker is network-first: online loads fetch the latest files and refresh the cache; the cache is used only when offline. Users get updates on reload without a hard refresh. Bump `CACHE` in `sw.js` (currently `grocery-v18`) only when the offline fallback's file list (`SHELL`) changes.
- Orders: "Save as order" (hidden when the list is empty or on the Saved orders tab) snapshots the current list (all items, checked or not, with their bought flag `done`; ids are dropped) and then empties the current list. Two tabs at the top (`#tab-current`, `#tab-orders`) switch between the current list and saved orders; the order picker (`#view`) and order search only show on the Saved orders tab. An order is read-only and shows a summary card (date, item and not-bought counts) with "Copy to my list" (adds its items as new, unchecked) and "Delete this order" (tap twice); bought items show ticked (disabled boxes). Order labels read "date · N items · M not bought". The dropdown and sidebar group orders by month and show the newest 12 (`recentOrders`; "Show N older orders" reveals the rest). The order search box filters by item name, English or Hebrew (`searchOrders`). Orders are stored in the family document, which Firestore caps at 1 MiB; archive old orders before that matters.
- Suggestions: a floating card under the add box (`#suggest`, styled like a search dropdown: top 3 as tiles, rest as rows with an arrow that fills the box; every match is listed, and the card scrolls at 60vh). It filters as you type, built from the grocery dictionary and from names already used in lists and orders (typing "toma" offers "Tomatoes"). Tap a suggestion to fill the box.
- Groups: each product has a group (`GROUP_FOR` / `groupOf` in translate.js: Fruits, Vegetables, Dairy & Eggs, Meat & Fish, Bakery, Pantry, Frozen, Drinks, Household). New items get their group automatically. The group box sits in the same row as the add box (group, item name, quantity, Add) on phones too (placeholder shortened to "Add an item", the English/Hebrew hint is the aria-label). The Add button stays disabled until a name is typed. With a group chosen, the search box suggests only that group's products (English and Hebrew); with no group, it searches everything. The group never hides items already on the list. Items added before the groups existed stay under Other until re-added. Categories are defined in `CATEGORIES` in list.js.
- `shortcut:` translation is a dictionary, not machine translation. A free online API (MyMemory) mistranslated single words (חלב became "Aleppo"), so it was not used.

## Planned next steps

1. Firebase is set up and saving works (tested in one browser). Still to do: test on two phones with the same family code.
   Setup steps: Firestore Database created, Rules published from `firestore.rules`, Authentication → Anonymous enabled.
2. Category picker or name-based guessing; "staples" list for quick re-adding.
3. Change family code.

- The current list shows its item count ("Current list (N)") in the dropdown and the sidebar, and "N items · M to buy" under the header; the count includes checked items, "to buy" excludes them.
- Who added: each phone enters a name on join (localStorage `basketry.name`); new items show "by <name>".
