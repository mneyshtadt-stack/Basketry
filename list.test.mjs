// Run with: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { addItem, toggleItem, removeItem, clearDone, groupByCategory, suggestNames, suggestMatches, displayName } from './list.js';

test('displayName shows the Hebrew in brackets when known', () => {
  assert.equal(displayName({ name: 'Potatoes', he: 'תפוחי אדמה' }), 'Potatoes [תפוחי אדמה]');
  assert.equal(displayName({ name: 'Soap' }), 'Soap');
});

test('addItem stores the Hebrew name only when given', () => {
  assert.equal(addItem([], 'Potatoes', 'Fruits', 1, 'תפוחי אדמה')[0].he, 'תפוחי אדמה');
  assert.equal('he' in addItem([], 'Soap')[0], false);
});

test('suggestMatches finds substrings, ignores case, returns nothing for empty query', () => {
  const names = ['Tomatoes', 'Potatoes', 'Milk'];
  assert.deepEqual(suggestMatches(names, 'toma'), ['Tomatoes']);
  assert.deepEqual(suggestMatches(names, 'TO'), ['Tomatoes', 'Potatoes']);
  assert.deepEqual(suggestMatches(names, '  '), []);
});

test('suggestNames dedupes case-insensitively, capitalizes, sorts', () => {
  assert.deepEqual(suggestNames(['tomatoes', 'Milk', 'milk', ' ', 'Apples']), ['Apples', 'Milk', 'Tomatoes']);
});

test('addItem trims name, defaults qty and category', () => {
  const items = addItem([], '  Milk  ');
  assert.equal(items.length, 1);
  assert.equal(items[0].name, 'Milk');
  assert.equal(items[0].qty, 1);
  assert.equal(items[0].category, 'Other');
  assert.equal(items[0].done, false);
});

test('addItem capitalizes the first letter', () => {
  assert.equal(addItem([], 'milk')[0].name, 'Milk');
  assert.equal(addItem([], 'פיצה')[0].name, 'פיצה');
});

test('addItem ignores blank names', () => {
  assert.equal(addItem([], '   ').length, 0);
});

test('addItem falls back to Other for unknown category and clamps qty', () => {
  const [item] = addItem([], 'Soap', 'Nonsense', 0);
  assert.equal(item.category, 'Other');
  assert.equal(item.qty, 1);
});

test('addItem does not mutate the input array', () => {
  const before = [];
  addItem(before, 'Eggs', 'Dairy & Eggs', 12);
  assert.equal(before.length, 0);
});

test('toggleItem flips done only on the matching item', () => {
  let items = addItem(addItem([], 'A'), 'B');
  const [a, b] = items;
  items = toggleItem(items, a.id);
  assert.equal(items[0].done, true);
  assert.equal(items[1].done, false);
  assert.equal(items[1].id, b.id);
});

test('removeItem and clearDone', () => {
  let items = addItem(addItem(addItem([], 'A'), 'B'), 'C');
  items = toggleItem(items, items[0].id);
  items = toggleItem(items, items[2].id);
  assert.deepEqual(clearDone(items).map(i => i.name), ['B']);
  assert.equal(removeItem(items, items[1].id).length, 2);
});

test('groupByCategory follows category order and skips empty groups', () => {
  let items = addItem([], 'Bread', 'Bakery');
  items = addItem(items, 'Apples', 'Fruits');
  const groups = groupByCategory(items);
  assert.deepEqual(groups.map(g => g.category), ['Fruits', 'Bakery']);
});

test('addItem records who added the item', () => {
  assert.equal(addItem([], 'Milk', 'Dairy & Eggs', 1, undefined, 'Dana')[0].by, 'Dana');
  assert.equal('by' in addItem([], 'Milk')[0], false);
});
