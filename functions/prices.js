// Pure price logic for the Shufersal lookup, no network calls, so it can be tested with node.

// Shufersal rows share this chain code; their chainId differs per row, so match on the code.
export const SHUFERSAL_CHAIN_CODE = '7290027600007';

// Our English item names -> the Open Supermarkets product to price them with.
// Add an entry when you want an item priced.
export const PRODUCT_MAP = {
  raspberry: { productId: 'cmvlex6li00fe1407psbx38u0', barcode: '710497311083', name: 'פטל אדום מארז' },
};

// Combines the Shufersal rows from a compare-prices response into one summary, or null if none.
export function shufersalSummary(comparisons) {
  const rows = (comparisons ?? [])
    .flatMap(c => c.chainComparison ?? [])
    .filter(r => String(r.chainCode) === SHUFERSAL_CHAIN_CODE && r.storeCount > 0);
  const stores = rows.reduce((n, r) => n + r.storeCount, 0);
  if (stores === 0) return null;
  const weighted = rows.reduce((sum, r) => sum + r.avgPrice * r.storeCount, 0);
  return {
    min: Math.min(...rows.map(r => r.minPrice)),
    max: Math.max(...rows.map(r => r.maxPrice)),
    avg: Math.round((weighted / stores) * 100) / 100,
    stores,
  };
}

// Lower-cased, de-duplicated names that have a product mapping.
export function mappedNames(names) {
  const keys = (names ?? []).map(n => String(n).trim().toLowerCase());
  return [...new Set(keys)].filter(k => Object.hasOwn(PRODUCT_MAP, k));
}
