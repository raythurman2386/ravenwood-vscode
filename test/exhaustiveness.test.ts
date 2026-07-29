/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// Exhaustiveness tests — verify the `never` exhaustiveness branches in the
// dispatch functions throw on invalid values. These branches are dead in
// production (the type system prevents them for valid configs), but the
// throw is the safety net that catches runtime invalid values that bypass
// VS Code's `enum` constraint. If these branches were ever removed or
// changed to silently return, a typo'd config value would fall through
// unnoticed.

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { getPalette } from '../src/palette';
import { getWorkbench } from '../src/workbench';
import { getCursorColor, getSelectionColors } from '../src/workbench/common';

describe('Palette dispatch exhaustiveness throws on invalid values', () => {
  test('getPalette throws on invalid darkContrast', () => {
    assert.throws(
      () => getPalette({ darkContrast: 'Meduim' as never }, 'dark'),
      /Unhandled darkContrast/,
    );
  });

  test('getPalette throws on invalid lightContrast', () => {
    assert.throws(
      () => getPalette({ lightContrast: 'Meduim' as never }, 'light'),
      /Unhandled lightContrast/,
    );
  });
});

describe('Workbench dispatch exhaustiveness throws on invalid values', () => {
  test('getWorkbench throws on invalid darkWorkbench', () => {
    assert.throws(
      () => getWorkbench({ darkWorkbench: 'materia' as never }, 'dark'),
      /Unhandled darkWorkbench/,
    );
  });

  test('getWorkbench throws on invalid lightWorkbench', () => {
    assert.throws(
      () => getWorkbench({ lightWorkbench: 'materia' as never }, 'light'),
      /Unhandled lightWorkbench/,
    );
  });
});

describe('Selection dispatch exhaustiveness throws on invalid values', () => {
  test('getSelectionColors throws on invalid darkSelection', () => {
    const palette = getPalette({}, 'dark');
    assert.throws(
      () =>
        getSelectionColors(
          palette,
          { darkSelection: 'invalid' as never },
          'dark',
        ),
      /Unhandled darkSelection/,
    );
  });

  test('getSelectionColors throws on invalid lightSelection', () => {
    const palette = getPalette({}, 'light');
    assert.throws(
      () =>
        getSelectionColors(
          palette,
          { lightSelection: 'invalid' as never },
          'light',
        ),
      /Unhandled lightSelection/,
    );
  });
});

describe('Cursor dispatch exhaustiveness throws on invalid values', () => {
  test('getCursorColor throws on invalid darkCursor', () => {
    const palette = getPalette({}, 'dark');
    assert.throws(
      () => getCursorColor(palette, { darkCursor: 'cyan' as never }, 'dark'),
      /Unhandled darkCursor/,
    );
  });

  test('getCursorColor throws on invalid lightCursor', () => {
    const palette = getPalette({}, 'light');
    assert.throws(
      () => getCursorColor(palette, { lightCursor: 'cyan' as never }, 'light'),
      /Unhandled lightCursor/,
    );
  });
});
