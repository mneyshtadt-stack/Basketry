// Run with: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { translateItem } from './translate.js';

test('known Hebrew words become English', () => {
  assert.equal(translateItem('חלב'), 'milk');
  assert.equal(translateItem('  עגבניות  '), 'tomatoes');
});

test('unknown Hebrew stays as typed', () => {
  assert.equal(translateItem('משהו לא מוכר'), 'משהו לא מוכר');
});

test('English input passes through trimmed', () => {
  assert.equal(translateItem('  Yogurt '), 'Yogurt');
});
