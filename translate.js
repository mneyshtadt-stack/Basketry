// Hebrew grocery words to English. Offline, no network calls.
// Unknown words are kept as typed (a wrong guess is worse than the original).
// shortcut: only the words listed here translate, add more as they come up.
export const HE_TO_EN = {
  'חלב': 'milk', 'חלב סויה': 'soy milk', 'חלב דל לקטוז': 'lactose-free milk', 'לחם': 'bread', 'חלה': 'challah bread', 'פיתה': 'pita', 'פיתות': 'pitas',
  'ביצה': 'egg', 'ביצים': 'eggs', 'גבינה': 'cheese', 'קוטג\'': 'cottage cheese',
  'יוגורט': 'yogurt', 'חמאה': 'butter', 'שמנת': 'cream', 'גלידה': 'ice cream',
  'עגבנייה': 'tomato', 'עגבניות': 'tomatoes', 'מלפפון': 'cucumber', 'מלפפונים': 'cucumbers',
  'בצל יבש': 'yellow onion', 'בצל': 'yellow onion', 'שום': 'garlic', 'תפוח': 'apple', 'תפוחים': 'apples',
  'תפוח אדמה': 'potato', 'תפוחי אדמה': 'potatoes', 'בננה': 'banana', 'בננות': 'bananas',
  'תפוז': 'orange', 'תפוזים': 'oranges', 'לימון': 'lemon', 'גזר': 'carrot', 'צנונית': 'radish',
  'חסה': 'lettuce', 'חסה ערבית': 'romaine lettuce', 'פלפל': 'pepper', 'אבוקדו': 'avocado', 'משמש': 'apricot',
  'משמשים': 'apricots', 'מישמש': 'apricot', 'תות': 'strawberry',
  'תותים': 'strawberries', 'תירס': 'corn', 'פטרוזיליה': 'parsley', 'כוסברה': 'coriander',
  'שמיר': 'dill', 'בשר': 'meat', 'עוף': 'chicken', 'דג': 'fish', 'נקניקיות': 'sausages',
  'אורז': 'rice', 'פסטה': 'pasta', 'קמח': 'flour', 'סוכר': 'sugar', 'מלח': 'salt',
  'שמן': 'oil', 'שמן זית': 'olive oil', 'קפה': 'coffee', 'תה': 'tea', 'מים': 'water',
  'מיץ': 'juice', 'קולה': 'cola', 'עוגיות': 'cookies', 'ביסקוויטים': 'biscuits',
  'שוקולד': 'chocolate', 'חטיף': 'snack', 'קטשופ': 'ketchup', 'מיונז': 'mayonnaise',
  'חומוס': 'hummus', 'טחינה': 'tahini', 'זיתים': 'olives', 'סבון': 'soap',
  'נייר טואלט': 'toilet paper', 'שמפו': 'shampoo', 'משחת שיניים': 'toothpaste',
  'אבקת כביסה': 'laundry detergent', 'סוללות': 'batteries',
  'פיצה': 'pizza', 'פיצה קפואה': 'frozen pizza',
  'אפרסק': 'peach', 'אפרסקים': 'peaches',
  'בצל אדום': 'red onion', 'בצל ירוק': 'green onion',
};

const HEBREW = /[֐-׿]/;

// English word to Hebrew (first match wins, so 'Potatoes' gives 'תפוחי אדמה').
const EN_TO_HE = {};
for (const [he, en] of Object.entries(HE_TO_EN)) {
  if (!(en in EN_TO_HE)) EN_TO_HE[en] = he;
}

// Returns { name, he } where name is English and he is the Hebrew, when known.
export function bilingual(input) {
  const clean = String(input ?? '').trim();
  if (!HEBREW.test(clean)) {
    const he = EN_TO_HE[clean.toLowerCase()];
    return he ? { name: clean, he } : { name: clean };
  }
  const en = HE_TO_EN[clean];
  return en ? { name: en, he: clean } : { name: clean };
}

// Returns the English name for a Hebrew item, or the input unchanged.
export function translateItem(name) {
  return bilingual(name).name;
}
