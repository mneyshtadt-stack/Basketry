// Cloud Function: fetches Shufersal prices for the bought items of a saved order.
// The API token is a Firebase secret, so it never reaches the page.
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { PRODUCT_MAP, mappedNames, shufersalSummary } from './prices.js';

const TOKEN = defineSecret('OPEN_SUPERMARKETS_TOKEN');
const API = 'https://data.openisraelisupermarkets.co.il';

export const fetchShufersalPrices = onCall(
  { secrets: [TOKEN], region: 'europe-west1', maxInstances: 5 },
  async request => {
    if (!request.auth) throw new HttpsError('unauthenticated', 'Sign in first.');
    const names = mappedNames(Array.isArray(request.data?.names) ? request.data.names.slice(0, 50) : []);
    const prices = {};
    for (const key of names) {
      const entry = PRODUCT_MAP[key];
      const res = await fetch(`${API}/products/compare-prices?product_ids=${entry.productId}&current_only=true`, {
        headers: { Authorization: `Bearer ${TOKEN.value()}` },
      });
      if (!res.ok) throw new HttpsError('unavailable', `Price service returned ${res.status}.`);
      const summary = shufersalSummary((await res.json()).comparisons);
      prices[key] = { ...(summary ?? {}), found: Boolean(summary), productName: entry.name, barcode: entry.barcode, fetchedAt: new Date().toISOString() };
    }
    return { prices };
  },
);
