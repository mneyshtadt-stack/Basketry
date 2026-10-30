// Hebrew grocery words to English. Offline, no network calls.
// Unknown words are kept as typed (a wrong guess is worse than the original).
// shortcut: only the words listed here translate, add more as they come up.
export const HE_TO_EN = {
  'חלב': 'milk', 'חלב סויה': 'soy milk', 'חלב דל לקטוז': 'lactose-free milk', 'לחם': 'bread', 'חלה': 'challah bread', 'פיתה': 'pita', 'פיתות': 'pita',
  'ביצה': 'egg', 'ביצים': 'egg', 'גבינה': 'cheese', 'גבינה צהובה': 'cheese', 'פרמזן': 'parmesan', 'סרדיניים': 'clupeidae', 'סרדינים': 'clupeidae', 'טונה': 'tuna', 'גבינה לבנה': 'cream cheese', 'בשר טחון': 'ground meat', 'חזה הודו': 'turkey breast', 'חזה עוף': 'chicken breast', 'שוקיים עוף': 'chicken drumsticks', 'כרעיים עוף': 'chicken leg quarters', 'לחם כוסמין': 'spelt bread', 'סלמון': 'salmon', 'סלמון מעושן': 'smoked salmon', 'בגט': 'baguette', 'שזיף': 'plum', 'קוטג\'': 'cottage', 'קוטג': 'cottage', 'קוטג׳': 'cottage', 'קוטג\'5%': 'cottage','קוטג 5%': 'cottage',
  'יוגורט': 'yogurt', 'חמאה': 'butter', 'שמנת': 'cream', 'גלידה': 'ice cream',
  'עגבנייה': 'tomato', 'עגבניות שרי': 'cherry tomato', 'עגבניות': 'tomato', 'מלפפון': 'cucumber', 'צ\'יה': 'chia seed', 'צ׳יה': 'chia seed', 'סודה לשתייה': 'baking soda', 'כרוב לבן': 'white cabbage', 'כרוב אדום': 'red cabbage', 'טבליות למדיח': 'dishwasher tablets', 'מלפפונים': 'cucumber',
  'בצל יבש': 'onion', 'בצל': 'onion', 'שום': 'garlic', 'תפוח': 'apple', 'תפוחים': 'apple',
  'תפוח אדמה': 'potato', 'בטטה': 'sweet potato', 'תפוחי אדמה': 'potato', 'בננה': 'banana', 'בננות': 'banana',
  'תפוז': 'orange', 'תפוזים': 'orange', 'לימון': 'lemon', 'קלמנטינה': 'clementine', 'גזר': 'carrot', 'צנונית': 'radish', 'סלרי עלים': 'celery', 'סלרי': 'celery', 'סלרי חתוך': 'celery hearts', 'כוסמת': 'buckwheat',
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
  'אפרסק': 'peach', 'אפרסקים': 'peach', 'קיווי': 'kiwi', 'ג\'ינג\'ר': 'ginger', 'מקרל': 'mackerel', 'קישואים': 'courgette', 'זוקיני': 'zucchini', 'ברמונדי': 'barramundi',
  'בצל אדום': 'red onion', 'בצל ירוק': 'green onion',
};

const HEBREW = /[֐-׿]/;

// English word to Hebrew (first match wins, so 'Potatoes' gives 'תפוחי אדמה').
const EN_TO_HE = {};
for (const [he, en] of Object.entries(HE_TO_EN)) {
  if (!(en in EN_TO_HE)) EN_TO_HE[en] = he;
}

// Hebrew label for an English name, or '' when unknown.
export function hebrewOf(en) {
  return EN_TO_HE[String(en).toLowerCase()] ?? '';
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

// Product group for each English name; used to file items and to filter the list.
export const GROUP_FOR = {
  'Fruits': ['apple', 'banana', 'orange', 'lemon', 'clementine', 'apricot', 'strawberry', 'grapes', 'peach', 'plum', 'avocado', 'kiwi'],
  'Vegetables': ['tomato', 'cherry tomato', 'cucumber', 'onion', 'red onion', 'green onion', 'garlic', 'potato', 'sweet potato', 'carrot', 'radish', 'celery', 'celery hearts', 'ginger', 'courgette', 'zucchini', 'lettuce', 'romaine lettuce', 'iceberg lettuce', 'pepper', 'chili pepper', 'corn', 'parsley', 'coriander', 'dill', 'white cabbage', 'red cabbage'],
  'Dairy & Eggs': ['milk', 'soy milk', 'lactose-free milk', 'egg', 'cheese', 'parmesan', 'cream cheese', 'cottage', 'yogurt', 'butter', 'cream'],
  'Meat & Fish': ['barramundi', 'mackerel', 'meat', 'ground meat', 'chicken', 'chicken breast', 'chicken drumsticks', 'chicken leg quarters', 'turkey breast', 'fish', 'salmon', 'smoked salmon', 'tuna', 'clupeidae', 'sausage'],
  'Bakery': ['bread', 'challah bread', 'pita', 'baguette', 'spelt bread'],
  'Pantry': ['rice', 'pasta', 'buckwheat', 'chia seed', 'baking soda', 'flour', 'sugar', 'salt', 'oil', 'olive oil', 'ketchup', 'mayonnaise', 'hummus', 'tahini', 'olive', 'cookie', 'biscuit', 'chocolate', 'snack', 'coffee', 'tea'],
  'Frozen': ['frozen pizza', 'pizza', 'ice cream'],
  'Drinks': ['water', 'juice', 'cola'],
  'Household': ['soap', 'toilet paper', 'shampoo', 'toothpaste', 'laundry detergent', 'batteries', 'dishwasher tablets'],
};

// The group for an English product name, or 'Other'.
export function groupOf(name) {
  for (const [group, names] of Object.entries(GROUP_FOR)) {
    if (names.includes(String(name ?? '').toLowerCase())) return group;
  }
  return 'Other';
}
