// Saved orders (snapshots of a list), pure logic, no DOM.
import { addItem } from './list.js';

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Snapshots the current items as a new order, newest first. Empty lists are not saved.
export function saveOrder(orders, items, date = new Date().toISOString().slice(0, 10)) {
  if (items.length === 0) return orders;
  const snapshot = items.map(({ id, done, ...kept }) => kept);
  return [{ id: newId(), date, items: snapshot }, ...orders];
}

export function deleteOrder(orders, id) {
  return orders.filter(o => o.id !== id);
}

export function findOrder(orders, id) {
  return orders.find(o => o.id === id);
}

// Adds every item of an order to the list as new, unchecked items.
export function copyOrderToList(list, order) {
  return order.items.reduce((acc, i) => addItem(acc, i.name, i.category, i.qty, i.he), list);
}
