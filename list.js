// Pure list logic, no DOM, so it can be tested with node.
export const CATEGORIES = [
  'Produce', 'Dairy & Eggs', 'Meat & Fish', 'Bakery', 'Pantry',
  'Frozen', 'Drinks', 'Household', 'Other',
];

export function addItem(items, name, category = 'Other', qty = 1) {
  const clean = String(name ?? '').trim();
  if (!clean) return items;
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

// Groups items by category in CATEGORIES order, skipping empty groups.
export function groupByCategory(items) {
  return CATEGORIES
    .map(category => ({ category, items: items.filter(i => i.category === category) }))
    .filter(g => g.items.length > 0);
}
