// Hebrew grocery words to English. Offline, no network calls.
// Unknown words are kept as typed (a wrong guess is worse than the original).
// shortcut: only the words listed here translate, add more as they come up.
export const HE_TO_EN = {
  'חלב': 'milk', 'חלב סויה': 'soy milk', 'חלב דל לקטוז': 'lactose-free milk', 'לחם': 'bread', 'חלה': 'challah bread', 'פיתה': 'pita', 'פיתות': 'pita',
  'ביצה': 'egg', 'ביצים': 'egg', 'גבינה': 'cheese', 'גבינה צהובה': 'cheese', 'פרמזן': 'parmesan', 'קוטג\'': 'cottage', 'קוטג': 'cottage', 'קוטג׳': 'cottage', 'קוטג\'5%': 'cottage','קוטג 5%': 'cottage',
  'יוגורט': 'yogurt', 'חמאה': 'butter', 'שמנת': 'cream', 'גלידה': 'ice cream',
  'עגבנייה': 'tomato', 'עגבניות שרי': 'cherry tomato', 'עגבניות': 'tomato', 'מלפפון': 'cucumber', 'מלפפונים': 'cucumber',
  'בצל יבש': 'onion', 'בצל': 'onion', 'שום': 'garlic', 'תפוח': 'apple', 'תפוחים': 'apple',
  'תפוח אדמה': 'potato', 'בטטה': 'sweet potato', 'תפוחי אדמה': 'potato', 'בננה': 'banana', 'בננות': 'banana',
  'תפוז': 'orange', 'תפוזים': 'orange', 'לימון': 'lemon', 'קלמנטינה': 'clementine', 'גזר': 'carrot', 'צנונית': 'radish',
  'חסה': 'lettuce', 'חסה ערבית': 'romaine lettuce', 'חסה אייסברג': 'iceberg lettuce', 'פלפל': 'pepper', 'פלפל חריף': 'chili pepper', 'אבוקדו': 'avocado', 'משמש': 'apricot',
  'משמשים': 'apricot', 'מישמש': 'apricot', 'תות': 'strawberry', 'ענבים': 'grapes',
  'תותים': 'strawberry', 'תירס': 'corn', 'פטרוזיליה': 'parsley', 'כוסברה': 'coriander',
  'שמיר': 'dill', 'בשר': 'meat', 'עוף': 'chicken', 'דג': 'fish', 'נקניקיות': 'sausage',
  'אורז': 'rice', 'פסטה': 'pasta', 'קמח': 'flour', 'סוכר': 'sugar', 'מלח': 'salt',
  'שמן': 'oil', 'שמן זית': 'olive oil', 'קפה': 'coffee', 'תה': 'tea', 'מים': 'water',
  'מיץ': 'juice', 'קולה': 'cola', 'עוגיות': 'cookie', 'ביסקוויטים': 'biscuit',
  'שוקולד': 'chocolate', 'חטיף': 'snack', 'קטשופ': 'ketchup', 'מיונז': 'mayonnaise',
  'חומוס': 'hummus', 'טחינה': 'tahini', 'זיתים': 'olive', 'סבון': 'soap',
  'נייר טואלט': 'toilet paper', 'שמפו': 'shampoo', 'משחת שיניים': 'toothpaste',
  'אבקת כביסה': 'laundry detergent', 'סוללות': 'batteries',
  'פיצה': 'pizza', 'פיצה קפואה': 'frozen pizza',
  'אפרסק': 'peach', 'אפרסקים': 'peach',
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
  const stripped = clean.replace(/^['"]+/, '').trim();
  const key = HE_TO_EN[clean] ? clean : stripped;
  const en = HE_TO_EN[key];
  if (!en) return { name: clean };
  return { name: en, he: key };
}

// Returns the English name for a Hebrew item, or the input unchanged.
export function translateItem(name) {
  return bilingual(name).name;
}
