// Run with: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { addItem, toggleItem } from './list.js';
import { saveOrder, findOrder, copyOrderToList, deleteOrder, searchOrders, recentOrders, ordersByMonth, notBoughtCount } from './orders.js';

test('searchOrders finds orders by English or Hebrew item name', () => {
  let orders = saveOrder([], addItem([], 'Milk', 'Dairy & Eggs', 1, 'חלב'), '2026-10-01');
  orders = saveOrder(orders, addItem([], 'Rice', 'Pantry'), '2026-10-02');
  assert.deepEqual(searchOrders(orders, 'mil').map(o => o.date), ['2026-10-01']);
  assert.deepEqual(searchOrders(orders, 'חל').map(o => o.date), ['2026-10-01']);
  assert.equal(searchOrders(orders, '').length, 2);
  assert.equal(searchOrders(orders, 'tea').length, 0);
});

test('notBoughtCount counts items without the bought flag', () => {
  let items = addItem(addItem([], 'Milk'), 'Bread');
  items = toggleItem(items, items[0].id);
  const [order] = saveOrder([], items, '2026-10-01');
  assert.equal(notBoughtCount(order), 1);
});

test('recentOrders keeps the newest ones and returns the rest as older', () => {
  const orders = [1, 2, 3].map(n => ({ id: String(n) }));
  assert.deepEqual(recentOrders(orders, 2), { recent: orders.slice(0, 2), older: orders.slice(2) });
});

test('ordersByMonth groups newest-first orders by month', () => {
  const orders = [{ date: '2026-10-08' }, { date: '2026-10-01' }, { date: '2026-09-20' }];
  assert.deepEqual(ordersByMonth(orders).map(g => [g.month, g.orders.length]), [['2026-10', 2], ['2026-09', 1]]);
});

test('saveOrder ignores an empty list', () => {
  assert.equal(saveOrder([], []).length, 0);
});

test('saveOrder stores a snapshot, newest first, keeping bought flags but not ids', () => {
  let items = addItem([], 'Milk', 'Dairy & Eggs', 2);
  items = toggleItem(items, items[0].id);
  let orders = saveOrder([], items, '2026-10-01');
  items = addItem(items, 'Bread', 'Bakery');
  orders = saveOrder(orders, items, '2026-10-08');
  assert.deepEqual(orders.map(o => o.date), ['2026-10-08', '2026-10-01']);
  assert.deepEqual(orders[1].items, [{ name: 'Milk', qty: 2, category: 'Dairy & Eggs', done: true }]);
});

test('later edits to the list do not change a saved order', () => {
  const items = addItem([], 'Eggs', 'Dairy & Eggs', 12);
  const orders = saveOrder([], items, '2026-10-01');
  const copy = toggleItem(items, items[0].id);
  assert.equal(copy[0].done, true);
  assert.equal(orders[0].items[0].name, 'Eggs');
  assert.equal(orders[0].items[0].done, false);
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

test('deleteOrder removes only the matching order', () => {
  let orders = saveOrder([], addItem([], 'Tea'), '2026-10-01');
  orders = saveOrder(orders, addItem([], 'Rice'), '2026-10-02');
  const keep = orders[1];
  orders = deleteOrder(orders, orders[0].id);
  assert.deepEqual(orders, [keep]);
});
