// Run with: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { translateItem, bilingual } from './translate.js';

test('bilingual pairs English and Hebrew both ways', () => {
  assert.deepEqual(bilingual('חלב'), { name: 'milk', he: 'חלב' });
  assert.deepEqual(bilingual('Potatoes'), { name: 'Potatoes', he: 'תפוחי אדמה' });
  assert.deepEqual(bilingual('eggplant'), { name: 'eggplant' });
  assert.deepEqual(bilingual('משהו'), { name: 'משהו' });
});

test('known Hebrew words become English', () => {
  assert.equal(translateItem('חלב'), 'milk');
  assert.equal(translateItem('  עגבניות  '), 'tomatoes');
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
