// Run with: node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { ICON_FOR } from './icons.js';

test('every picture in the icon map exists as a file', () => {
  for (const file of Object.values(ICON_FOR)) assert.ok(fs.existsSync(file), file);
});
