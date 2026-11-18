// Run with: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { shufersalSummary, mappedNames, PRODUCT_MAP } from './prices.js';

const row = (chainCode, storeCount, minPrice, avgPrice, maxPrice) => ({ chainId: 'x', chainName: 'x', chainCode, storeCount, minPrice, avgPrice, maxPrice });

test('shufersalSummary combines Shufersal rows and ignores other chains', () => {
  const comparisons = [{ chainComparison: [
    row('7290027600007', 1, 24.9, 24.9, 24.9),
    row('7290027600007', 7, 24.9, 24.9, 24.9),
    row('7290027600007', 6, 27.9, 27.9, 27.9),
    row('7290027600007', 8, 29.9, 29.9, 29.9),
    row('7290058160839', 5, 10, 10, 10),
  ] }];
  const s = shufersalSummary(comparisons);
  assert.equal(s.stores, 22);
  assert.equal(s.min, 24.9);
  assert.equal(s.max, 29.9);
  assert.equal(s.avg, 27.54);
});

test('shufersalSummary returns null when Shufersal has no stores', () => {
  assert.equal(shufersalSummary([{ chainComparison: [row('7290058160839', 5, 10, 10, 10)] }]), null);
  assert.equal(shufersalSummary([]), null);
  assert.equal(shufersalSummary(undefined), null);
});

test('mappedNames keeps only mapped names, lower-cased and unique', () => {
  assert.deepEqual(mappedNames(['Raspberry', ' raspberry ', 'Milk', 'constructor']), ['raspberry']);
  assert.ok(PRODUCT_MAP.raspberry);
});
