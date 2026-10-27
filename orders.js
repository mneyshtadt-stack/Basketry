// Saved orders (snapshots of a list), pure logic, no DOM.
import { addItem } from './list.js';

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Snapshots the current items as a new order, newest first. Empty lists are not saved.
// Bought (done) flags are kept so the order shows what was bought; ids are not.
export function saveOrder(orders, items, date = new Date().toISOString().slice(0, 10)) {
  if (items.length === 0) return orders;
  const snapshot = items.map(({ id, ...kept }) => kept);
  return [{ id: newId(), date, items: snapshot }, ...orders];
}

export function deleteOrder(orders, id) {
  return orders.filter(o => o.id !== id);
}

export function findOrder(orders, id) {
  return orders.find(o => o.id === id);
}

// Orders that contain an item whose English or Hebrew name includes the query. Empty query gives all.
export function searchOrders(orders, query) {
  const q = String(query ?? '').trim().toLowerCase();
  if (!q) return orders;
  return orders.filter(o => o.items.some(i => `${i.name} ${i.he ?? ''}`.toLowerCase().includes(q)));
}

// Items in an order that were not bought.
export function notBoughtCount(order) {
  return order.items.filter(i => !i.done).length;
}

// Splits orders (newest first) into the newest `limit` and the rest.
export function recentOrders(orders, limit = 12) {
  return { recent: orders.slice(0, limit), older: orders.slice(limit) };
}

// Groups orders by month ("2026-10"), keeping their order; orders are newest first, so months are too.
export function ordersByMonth(orders) {
  const groups = new Map();
  for (const o of orders) {
    const month = o.date.slice(0, 7);
    if (!groups.has(month)) groups.set(month, []);
    groups.get(month).push(o);
  }
  return [...groups].map(([month, list]) => ({ month, orders: list }));
}

// Adds every item of an order to the list as new, unchecked items.
export function copyOrderToList(list, order) {
  return order.items.reduce((acc, i) => addItem(acc, i.name, i.category, i.qty, i.he), list);
}
