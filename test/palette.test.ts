/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// Palette tests — verify color values match the documented Ravenwood palette.
// {{{

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { Configuration } from '../src/interface';
import { getPalette } from '../src/palette';

const mediumConfig: Configuration = {};

describe('Dark palette (medium contrast)', () => {
  const p = getPalette(mediumConfig, 'dark');

  test('backgrounds are olive-tinged, not neutral grey', () => {
    assert.equal(p.bg0, '#141814');
    assert.equal(p.bg1, '#1f241f');
    assert.equal(p.bg, '#222822');
    assert.equal(p.bg2, '#2d3830');
    assert.equal(p.bg3, '#3d4a40');
    // bg must not be #222222 — the green tint is the defining characteristic
    assert.notEqual(p.bg, '#222222');
  });

  test('foreground is warm beige, not white', () => {
    assert.equal(p.fg, '#e8d5b7');
    assert.notEqual(p.fg, '#ffffff');
    assert.notEqual(p.fg, '#f0f0f0');
  });

  test('accent colors match documented values', () => {
    assert.equal(p.red, '#e67e80');
    assert.equal(p.orange, '#e69875');
    assert.equal(p.yellow, '#fbbf24');
    assert.equal(p.green, '#4ade80');
    assert.equal(p.aqua, '#34d399');
    assert.equal(p.blue, '#22d3ee');
    assert.equal(p.purple, '#f472b6');
  });

  test('dim variants exist for all accents', () => {
    assert.equal(p.dimRed, '#da6362');
    assert.equal(p.dimOrange, '#d77f48');
    assert.equal(p.dimYellow, '#bf983d');
    assert.equal(p.dimGreen, '#5e8d5e');
    assert.equal(p.dimAqua, '#447d6b');
    assert.equal(p.dimBlue, '#5a93a2');
    assert.equal(p.dimPurple, '#b87b9d');
  });

  test('shadow alpha is 44% black', () => {
    assert.equal(p.shadow, '#00000070');
  });

  test('badge is green', () => {
    assert.equal(p.badge, '#4ade80');
  });
});

describe('Light palette (medium contrast)', () => {
  const p = getPalette(mediumConfig, 'light');

  test('backgrounds are warm cream, not bright white', () => {
    assert.equal(p.bg0, '#edece1');
    assert.equal(p.bg1, '#f1f0e7');
    assert.equal(p.bg, '#f5f4ed');
    assert.notEqual(p.bg, '#ffffff');
    assert.notEqual(p.bg, '#f5f5f5');
  });

  test('foreground is warm olive, not black', () => {
    assert.equal(p.fg, '#3f4a45');
    assert.notEqual(p.fg, '#000000');
    assert.notEqual(p.fg, '#333333');
  });

  test('accent colors match documented values', () => {
    assert.equal(p.red, '#c92a2a');
    assert.equal(p.orange, '#c2410c');
    assert.equal(p.yellow, '#92400e');
    assert.equal(p.green, '#064e3b');
    assert.equal(p.aqua, '#0f766e');
    assert.equal(p.blue, '#2563eb');
    assert.equal(p.purple, '#c026a3');
  });

  test('dim variants exist for all accents', () => {
    assert.equal(p.dimRed, '#9b1c1c');
    assert.equal(p.dimOrange, '#7c2d12');
    assert.equal(p.dimYellow, '#6b3a08');
    assert.equal(p.dimGreen, '#053d29');
    assert.equal(p.dimAqua, '#134e4a');
    assert.equal(p.dimBlue, '#1e3a8a');
    assert.equal(p.dimPurple, '#86198f');
  });

  test('shadow alpha is 12% slate', () => {
    assert.equal(p.shadow, '#3c474d20');
  });

  test('badge is green', () => {
    assert.equal(p.badge, '#064e3b');
  });
});

describe('Contrast levels adjust backgrounds only', () => {
  test('dark soft/medium/hard have different bg0', () => {
    const soft = getPalette({ darkContrast: 'soft' }, 'dark').bg0;
    const medium = getPalette({ darkContrast: 'medium' }, 'dark').bg0;
    const hard = getPalette({ darkContrast: 'hard' }, 'dark').bg0;
    assert.notEqual(soft, medium, 'soft and medium bg0 should differ');
    assert.notEqual(medium, hard, 'medium and hard bg0 should differ');
  });

  test('dark accents are shared across contrast levels', () => {
    const soft = getPalette({ darkContrast: 'soft' }, 'dark');
    const medium = getPalette({ darkContrast: 'medium' }, 'dark');
    const hard = getPalette({ darkContrast: 'hard' }, 'dark');
    assert.equal(
      soft.red,
      medium.red,
      'red should be same across contrast levels',
    );
    assert.equal(
      medium.red,
      hard.red,
      'red should be same across contrast levels',
    );
    assert.equal(
      soft.fg,
      medium.fg,
      'fg should be same across contrast levels',
    );
    assert.equal(
      medium.fg,
      hard.fg,
      'fg should be same across contrast levels',
    );
  });

  test('light soft/medium/hard have different bg0', () => {
    const soft = getPalette({ lightContrast: 'soft' }, 'light').bg0;
    const medium = getPalette({ lightContrast: 'medium' }, 'light').bg0;
    const hard = getPalette({ lightContrast: 'hard' }, 'light').bg0;
    assert.notEqual(soft, medium, 'soft and medium bg0 should differ');
    assert.notEqual(medium, hard, 'medium and hard bg0 should differ');
  });
});

// }}}
// vim: fdm=marker fmr={{{,}}}:
