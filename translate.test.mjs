// Run with: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { translateItem, bilingual, hebrewOf, uniqueByName } from './translate.js';

test('bilingual pairs English and Hebrew both ways', () => {
  assert.deepEqual(bilingual('חלב'), { name: 'milk', he: 'חלב' });
  assert.deepEqual(bilingual('תפוחי אדמה'), { name: 'potato', he: 'תפוחי אדמה' });
  assert.deepEqual(bilingual('eggplant'), { name: 'eggplant' });
  assert.deepEqual(bilingual('משהו'), { name: 'משהו' });
});

test('known Hebrew words become English', () => {
  assert.equal(translateItem('חלב'), 'milk');
  assert.equal(translateItem('  עגבניות  '), 'tomato');
});

test('apricot in both spellings', () => {
  assert.equal(translateItem('משמש'), 'apricot');
  assert.equal(translateItem('מישמש'), 'apricot');
});

test('unknown Hebrew stays as typed', () => {
  assert.equal(translateItem('משהו לא מוכר'), 'משהו לא מוכר');
});

test('English input passes through trimmed', () => {
  assert.equal(translateItem('  Yogurt '), 'Yogurt');
});

test('buckwheat Hebrew label maps to English buckwheat', () => {
  assert.deepEqual(bilingual('כוסמת'), { name: 'buckwheat', he: 'כוסמת' });
});

test('kiwi Hebrew label maps to English kiwi', () => {
  assert.deepEqual(bilingual('קיווי'), { name: 'kiwi', he: 'קיווי' });
});

test('celery hearts Hebrew label maps to English', () => {
  assert.deepEqual(bilingual('סלרי חתוך'), { name: 'celery hearts', he: 'סלרי חתוך' });
});

test('ginger Hebrew label maps to English ginger', () => {
  assert.deepEqual(bilingual('ג\'ינג\'ר'), { name: 'ginger', he: 'ג\'ינג\'ר' });
});

test('mackerel Hebrew label maps to English mackerel', () => {
  assert.deepEqual(bilingual('מקרל'), { name: 'mackerel', he: 'מקרל' });
});

test('courgette Hebrew label maps to English courgette', () => {
  assert.deepEqual(bilingual('קישואים'), { name: 'courgette', he: 'קישואים' });
});

test('zucchini Hebrew label maps to English zucchini', () => {
  assert.deepEqual(bilingual('זוקיני'), { name: 'zucchini', he: 'זוקיני' });
});

test('barramundi Hebrew label maps to English barramundi fish', () => {
  assert.deepEqual(bilingual('ברמונדי'), { name: 'barramundi fish', he: 'ברמונדי' });
});

test('cooking cream Hebrew label maps to English cooking cream', () => {
  assert.deepEqual(bilingual('שמנת לבישול'), { name: 'cooking cream', he: 'שמנת לבישול' });
});

test('pomegranate Hebrew label maps to English pomegranate', () => {
  assert.deepEqual(bilingual('רימונים'), { name: 'pomegranate', he: 'רימונים' });
});

test('breadcrumbs Hebrew label maps to English breadcrumbs', () => {
  assert.deepEqual(bilingual('פירורי לחם'), { name: 'breadcrumbs', he: 'פירורי לחם' });
});

test('two cream-type cheeses keep separate English names', () => {
  assert.deepEqual(bilingual('גבינת שמנת'), { name: 'cream cheese', he: 'גבינת שמנת' });
  assert.deepEqual(bilingual('גבינה לבנה'), { name: 'white cheese', he: 'גבינה לבנה' });
});

test('chicken liver Hebrew label maps to English chicken liver, typo included', () => {
  assert.deepEqual(bilingual('כבד עוף'), { name: 'chicken liver', he: 'כבד עוף' });
  assert.deepEqual(bilingual('כבד עןף'), { name: 'chicken liver', he: 'כבד עןף' });
});

test('beef liver Hebrew label maps to English beef liver', () => {
  assert.deepEqual(bilingual('כבד בקר'), { name: 'beef liver', he: 'כבד בקר' });
});

test('soda Hebrew label maps to English soda water', () => {
  assert.deepEqual(bilingual('סודה'), { name: 'soda water', he: 'סודה' });
});

test('rigatoni Hebrew label maps to English rigatoni pasta', () => {
  assert.deepEqual(bilingual('ריגטוני'), { name: 'rigatoni pasta', he: 'ריגטוני' });
});

test('broccoli Hebrew label maps to English broccoli', () => {
  assert.deepEqual(bilingual('ברוקולי'), { name: 'broccoli', he: 'ברוקולי' });
});

test('cauliflower Hebrew label maps to English cauliflower', () => {
  assert.deepEqual(bilingual('כרובית'), { name: 'cauliflower', he: 'כרובית' });
});

test('dorade Hebrew label maps to English dorade fish', () => {
  assert.deepEqual(bilingual('דניס'), { name: 'dorade fish', he: 'דניס' });
});

test('grapefruit Hebrew label maps to English grapefruit', () => {
  assert.deepEqual(bilingual('אשכולית'), { name: 'grapefruit', he: 'אשכולית' });
});

test('soup croutons Hebrew label maps to English soup croutons', () => {
  assert.deepEqual(bilingual('שקדי מרק'), { name: 'soup croutons', he: 'שקדי מרק' });
});

test('frozen fries Hebrew label maps to English frozen french fries', () => {
  assert.deepEqual(bilingual("צ'יפס קפוא"), { name: "frozen french fries", he: "צ'יפס קפוא" });
});

test('cup-a-soup Hebrew label maps to English cup-a-soup', () => {
  assert.deepEqual(bilingual('נמס בכוס מרק'), { name: 'cup-a-soup', he: 'נמס בכוס מרק' });
});

test('mushrooms Hebrew label maps to English mushrooms, both spellings', () => {
  assert.deepEqual(bilingual('פטריות'), { name: 'mushrooms', he: 'פטריות' });
  assert.deepEqual(bilingual('פתריות'), { name: 'mushrooms', he: 'פתריות' });
});

test('rice paper Hebrew label maps to English rice paper', () => {
  assert.deepEqual(bilingual('דפי אורז'), { name: 'rice paper', he: 'דפי אורז' });
});

test('nori Hebrew label maps to English sushi nori', () => {
  assert.deepEqual(bilingual('אצות'), { name: 'sushi nori', he: 'אצות' });
});

test('feta sheep cheese Hebrew label maps to English feta sheep cheese', () => {
  assert.deepEqual(bilingual('פטה כבשים'), { name: 'feta sheep cheese', he: 'פטה כבשים' });
});

test('suggestions keep one name per English product', () => {
  assert.deepEqual(uniqueByName(['סלרי', 'סלרי', 'Celery', 'celery hearts']), ['סלרי', 'celery hearts']);
});

test('celery Hebrew label maps to English celery and back', () => {
  assert.deepEqual(bilingual('סלרי'), { name: 'celery', he: 'סלרי' });
  assert.equal(hebrewOf('celery'), 'סלרי');
});

test('mixed nuts Hebrew label maps to English mixed nuts', () => {
  assert.deepEqual(bilingual('תערובת אגוזים'), { name: 'mixed nuts', he: 'תערובת אגוזים' });
});

test('mozzarella sticks Hebrew label maps to English mozzarella sticks', () => {
  assert.deepEqual(bilingual('אצבעות מוצרלה'), { name: 'mozzarella sticks', he: 'אצבעות מוצרלה' });
});

test('milk chocolate Hebrew label maps to English milk chocolate', () => {
  assert.deepEqual(bilingual('שוקולד חלב'), { name: 'milk chocolate', he: 'שוקולד חלב' });
});

test('whipping cream Hebrew label maps to English whipping cream', () => {
  assert.deepEqual(bilingual('שמנת מתוקה'), { name: 'whipping cream', he: 'שמנת מתוקה' });
});

test('grated cheese Hebrew label maps to English grated cheese', () => {
  assert.deepEqual(bilingual('גבינה מגורדת'), { name: 'grated cheese', he: 'גבינה מגורדת' });
});

test('pearl barley Hebrew label maps to English pearl barley', () => {
  assert.deepEqual(bilingual('גריסי פנינה'), { name: 'pearl barley', he: 'גריסי פנינה' });
});

test('pear Hebrew label maps to English pear', () => {
  assert.deepEqual(bilingual('אגס'), { name: 'pear', he: 'אגס' });
});
