// Pure list logic, no DOM, so it can be tested with node.
export const CATEGORIES = [
  'Produce', 'Dairy & Eggs', 'Meat & Fish', 'Bakery', 'Pantry',
  'Frozen', 'Drinks', 'Household', 'Other',
];

export function addItem(items, name, category = 'Other', qty = 1) {
  const trimmed = String(name ?? '').trim();
  if (!trimmed) return items;
  const clean = trimmed[0].toUpperCase() + trimmed.slice(1);
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const cat = CATEGORIES.includes(category) ? category : 'Other';
  return [...items, { id, name: clean, qty: Math.max(1, Number(qty) || 1), category: cat, done: false }];
}

export function toggleItem(items, id) {
  return items.map(i => (i.id === id ? { ...i, done: !i.done } : i));
}

export function removeItem(items, id) {
  return items.filter(i => i.id !== id);
}

export function clearDone(items) {
  return items.filter(i => !i.done);
}

// Unique names for the suggestion list, capitalized, sorted, case-insensitive dedupe.
export function suggestNames(names) {
  const seen = new Map();
  for (const n of names) {
    const t = String(n ?? '').trim();
    if (!t) continue;
    const cap = t[0].toUpperCase() + t.slice(1);
    if (!seen.has(cap.toLowerCase())) seen.set(cap.toLowerCase(), cap);
  }
  return [...seen.values()].sort((a, b) => a.localeCompare(b));
}

// Names that contain the query (case-insensitive), at most `limit`. Empty query gives none.
export function suggestMatches(names, query, limit = 6) {
  const q = String(query ?? '').trim().toLowerCase();
  if (!q) return [];
  return names.filter(n => n.toLowerCase().includes(q)).slice(0, limit);
}

// Groups items by category in CATEGORIES order, skipping empty groups.
export function groupByCategory(items) {
  return CATEGORIES
    .map(category => ({ category, items: items.filter(i => i.category === category) }))
    .filter(g => g.items.length > 0);
}
