/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// Helper function tests — verify the workbench common helpers resolve
// cursor, selection, and diagnostic opacity correctly. These are the
// functions behind the user-facing config options.

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { Palette } from '../src/interface';
import { getPalette } from '../src/palette';
import {
  getCursorColor,
  getDiagnosticOpacity,
  getSelectionColors,
} from '../src/workbench/common';

const darkPalette = getPalette({}, 'dark') as Palette;
const lightPalette = getPalette({}, 'light') as Palette;

describe('getCursorColor — dark variant', () => {
  test('white cursor resolves to palette.fg', () => {
    assert.equal(
      getCursorColor(darkPalette, { darkCursor: 'white' }, 'dark'),
      darkPalette.fg,
    );
  });

  for (const hue of [
    'red',
    'orange',
    'yellow',
    'green',
    'aqua',
    'blue',
    'purple',
  ] as const) {
    test(`dark ${hue} cursor resolves to palette.${hue}`, () => {
      assert.equal(
        getCursorColor(darkPalette, { darkCursor: hue }, 'dark'),
        darkPalette[hue],
      );
    });
  }

  test('unset dark cursor falls back to fg', () => {
    assert.equal(getCursorColor(darkPalette, {}, 'dark'), darkPalette.fg);
  });
});

describe('getCursorColor — light variant', () => {
  test('black cursor resolves to palette.fg', () => {
    assert.equal(
      getCursorColor(lightPalette, { lightCursor: 'black' }, 'light'),
      lightPalette.fg,
    );
  });

  for (const hue of [
    'red',
    'orange',
    'yellow',
    'green',
    'aqua',
    'blue',
    'purple',
  ] as const) {
    test(`light ${hue} cursor resolves to palette.${hue}`, () => {
      assert.equal(
        getCursorColor(lightPalette, { lightCursor: hue }, 'light'),
        lightPalette[hue],
      );
    });
  }

  test('unset light cursor falls back to fg', () => {
    assert.equal(getCursorColor(lightPalette, {}, 'light'), lightPalette.fg);
  });
});

describe('getCursorColor — unknown variant throws', () => {
  test('throws on unknown variant', () => {
    assert.throws(() => getCursorColor(darkPalette, {}, 'invalid' as never));
  });
});

describe('getSelectionColors — dark variant', () => {
  test('grey selection uses bg4 with alpha', () => {
    const { selectionBg, editorSelectionBg, editorSelectionBgHl } =
      getSelectionColors(darkPalette, { darkSelection: 'grey' }, 'dark');
    assert.equal(selectionBg, `${darkPalette.bg4}e0`);
    assert.equal(editorSelectionBg, `${darkPalette.bg4}c0`);
    assert.equal(editorSelectionBgHl, `${darkPalette.bg4}60`);
  });

  for (const hue of [
    'red',
    'orange',
    'yellow',
    'green',
    'aqua',
    'blue',
    'purple',
  ] as const) {
    const dimKey =
      `dim${hue.charAt(0).toUpperCase()}${hue.slice(1)}` as keyof Palette;
    test(`dark ${hue} selection uses ${dimKey} with alpha`, () => {
      const { selectionBg, editorSelectionBg, editorSelectionBgHl } =
        getSelectionColors(darkPalette, { darkSelection: hue }, 'dark');
      assert.equal(selectionBg, `${darkPalette[dimKey]}60`);
      assert.equal(editorSelectionBg, `${darkPalette[dimKey]}40`);
      assert.equal(editorSelectionBgHl, `${darkPalette[dimKey]}20`);
    });
  }

  test('unset dark selection falls back to grey', () => {
    const { selectionBg } = getSelectionColors(darkPalette, {}, 'dark');
    assert.equal(selectionBg, `${darkPalette.bg4}e0`);
  });
});

describe('getSelectionColors — light variant', () => {
  test('grey selection uses bg4 with alpha (lighter than dark)', () => {
    const { selectionBg, editorSelectionBg, editorSelectionBgHl } =
      getSelectionColors(lightPalette, { lightSelection: 'grey' }, 'light');
    assert.equal(selectionBg, `${lightPalette.bg4}c0`);
    assert.equal(editorSelectionBg, `${lightPalette.bg4}a0`);
    assert.equal(editorSelectionBgHl, `${lightPalette.bg4}50`);
  });

  test('unset light selection falls back to grey', () => {
    const { selectionBg } = getSelectionColors(lightPalette, {}, 'light');
    assert.equal(selectionBg, `${lightPalette.bg4}c0`);
  });
});

describe('getSelectionColors — unknown variant throws', () => {
  test('throws on unknown variant', () => {
    assert.throws(() =>
      getSelectionColors(darkPalette, {}, 'invalid' as never),
    );
  });
});

describe('getDiagnosticOpacity', () => {
  test('0% maps to alpha 00', () => {
    assert.equal(
      getDiagnosticOpacity({ diagnosticTextBackgroundOpacity: '0%' }),
      '00',
    );
  });

  test('12.5% maps to alpha 20', () => {
    assert.equal(
      getDiagnosticOpacity({ diagnosticTextBackgroundOpacity: '12.5%' }),
      '20',
    );
  });

  test('25% maps to alpha 40', () => {
    assert.equal(
      getDiagnosticOpacity({ diagnosticTextBackgroundOpacity: '25%' }),
      '40',
    );
  });

  test('37.5% maps to alpha 60', () => {
    assert.equal(
      getDiagnosticOpacity({ diagnosticTextBackgroundOpacity: '37.5%' }),
      '60',
    );
  });

  test('50% maps to alpha 80', () => {
    assert.equal(
      getDiagnosticOpacity({ diagnosticTextBackgroundOpacity: '50%' }),
      '80',
    );
  });

  test('unset opacity falls back to 00', () => {
    assert.equal(getDiagnosticOpacity({}), '00');
  });
});
