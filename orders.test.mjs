// Run with: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { addItem, toggleItem } from './list.js';
import { saveOrder, findOrder, copyOrderToList } from './orders.js';

test('saveOrder ignores an empty list', () => {
  assert.equal(saveOrder([], []).length, 0);
});

test('saveOrder stores a snapshot, newest first, without done flags', () => {
  let items = addItem([], 'Milk', 'Dairy & Eggs', 2);
  items = toggleItem(items, items[0].id);
  let orders = saveOrder([], items, '2026-10-01');
  items = addItem(items, 'Bread', 'Bakery');
  orders = saveOrder(orders, items, '2026-10-08');
  assert.deepEqual(orders.map(o => o.date), ['2026-10-08', '2026-10-01']);
  assert.deepEqual(orders[1].items, [{ name: 'Milk', qty: 2, category: 'Dairy & Eggs' }]);
});

test('later edits to the list do not change a saved order', () => {
  const items = addItem([], 'Eggs', 'Dairy & Eggs', 12);
  const orders = saveOrder([], items, '2026-10-01');
  const copy = toggleItem(items, items[0].id);
  assert.equal(copy[0].done, true);
  assert.equal(orders[0].items[0].name, 'Eggs');
  assert.equal('done' in orders[0].items[0], false);
});

test('findOrder returns the matching order or undefined', () => {
  const orders = saveOrder([], addItem([], 'Tea'), '2026-10-01');
  assert.equal(findOrder(orders, orders[0].id).date, '2026-10-01');
  assert.equal(findOrder(orders, 'nope'), undefined);
});

test('copyOrderToList adds new unchecked items with fresh ids', () => {
  const orders = saveOrder([], addItem([], 'Rice', 'Pantry', 3), '2026-10-01');
  const list = copyOrderToList(addItem([], 'Milk'), orders[0]);
  assert.equal(list.length, 2);
  assert.equal(list[1].name, 'Rice');
  assert.equal(list[1].qty, 3);
  assert.equal(list[1].done, false);
  assert.notEqual(list[1].id, orders[0].items[0].id);
});
