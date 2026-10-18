// Hebrew grocery words to English. Offline, no network calls.
// Unknown words are kept as typed (a wrong guess is worse than the original).
// shortcut: only the words listed here translate, add more as they come up.
export const HE_TO_EN = {
  'חלב': 'milk', 'חלב סויה': 'soy milk', 'לחם': 'bread', 'פיתה': 'pita', 'פיתות': 'pitas',
  'ביצה': 'egg', 'ביצים': 'eggs', 'גבינה': 'cheese', 'קוטג\'': 'cottage cheese',
  'יוגורט': 'yogurt', 'חמאה': 'butter', 'שמנת': 'cream', 'גלידה': 'ice cream',
  'עגבנייה': 'tomato', 'עגבניות': 'tomatoes', 'מלפפון': 'cucumber', 'מלפפונים': 'cucumbers',
  'בצל': 'onion', 'שום': 'garlic', 'תפוח': 'apple', 'תפוחים': 'apples',
  'תפוח אדמה': 'potato', 'תפוחי אדמה': 'potatoes', 'בננה': 'banana', 'בננות': 'bananas',
  'תפוז': 'orange', 'תפוזים': 'oranges', 'לימון': 'lemon', 'גזר': 'carrot',
  'חסה': 'lettuce', 'פלפל': 'pepper', 'אבוקדו': 'avocado', 'תות': 'strawberry',
  'תותים': 'strawberries', 'תירס': 'corn', 'פטרוזיליה': 'parsley', 'כוסברה': 'coriander',
  'שמיר': 'dill', 'בשר': 'meat', 'עוף': 'chicken', 'דג': 'fish', 'נקניקיות': 'sausages',
  'אורז': 'rice', 'פסטה': 'pasta', 'קמח': 'flour', 'סוכר': 'sugar', 'מלח': 'salt',
  'שמן': 'oil', 'שמן זית': 'olive oil', 'קפה': 'coffee', 'תה': 'tea', 'מים': 'water',
  'מיץ': 'juice', 'קולה': 'cola', 'עוגיות': 'cookies', 'ביסקוויטים': 'biscuits',
  'שוקולד': 'chocolate', 'חטיף': 'snack', 'קטשופ': 'ketchup', 'מיונז': 'mayonnaise',
  'חומוס': 'hummus', 'טחינה': 'tahini', 'זיתים': 'olives', 'סבון': 'soap',
  'נייר טואלט': 'toilet paper', 'שמפו': 'shampoo', 'משחת שיניים': 'toothpaste',
  'אבקת כביסה': 'laundry detergent', 'סוללות': 'batteries',
};

const HEBREW = /[֐-׿]/;

// Returns the English name for a Hebrew item, or the input unchanged.
export function translateItem(name) {
  const clean = String(name ?? '').trim();
  if (!HEBREW.test(clean)) return clean;
  return HE_TO_EN[clean] ?? clean;
}
