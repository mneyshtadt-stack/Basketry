// Run with: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { translateItem, bilingual, hebrewOf } from './translate.js';

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

test('barramundi Hebrew label maps to English barramundi', () => {
  assert.deepEqual(bilingual('ברמונדי'), { name: 'barramundi', he: 'ברמונדי' });
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

test('celery Hebrew label maps to English celery and back', () => {
  assert.deepEqual(bilingual('סלרי עלים'), { name: 'celery', he: 'סלרי עלים' });
  assert.equal(hebrewOf('celery'), 'סלרי עלים');
});
