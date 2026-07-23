/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// Build combo tests — verify getThemeData works for all config combinations
// and produces valid output. Catches crashes from variant dispatching,
// palette selection, and workbench style logic.
// {{{

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { getPalette } from '../src/palette';
import { getThemeData } from '../src/themeData';
import { configCombos, isHex } from './helpers';

describe('getThemeData for all config combinations', () => {
  const combos = [...configCombos()];

  test(`covers ${combos.length} config combinations`, () => {
    assert.ok(
      combos.length >= 50,
      `expected many combos, got ${combos.length}`,
    );
  });

  for (const config of combos) {
    const label =
      Object.entries(config)
        .map(([k, v]) => `${k}=${v}`)
        .join(', ') || 'default';

    test(`builds valid theme: ${label}`, () => {
      // Must not throw
      const theme = getThemeData(config);

      // Dark theme structure
      assert.equal(theme.dark.name, 'Ravenwood Dark');
      assert.equal(theme.dark.type, 'dark');
      assert.equal(theme.dark.semanticHighlighting, true);
      assert.ok(
        Object.keys(theme.dark.colors).length > 100,
        'dark colors should have 100+ entries',
      );
      assert.ok(
        theme.dark.tokenColors.length > 100,
        'dark tokenColors should have 100+ rules',
      );

      // Light theme structure
      assert.equal(theme.light.name, 'Ravenwood Light');
      assert.equal(theme.light.type, 'light');
      assert.equal(theme.light.semanticHighlighting, true);
      assert.ok(
        Object.keys(theme.light.colors).length > 100,
        'light colors should have 100+ entries',
      );
      assert.ok(
        theme.light.tokenColors.length > 100,
        'light tokenColors should have 100+ rules',
      );

      // All colors must be valid hex
      for (const [key, value] of Object.entries(theme.dark.colors)) {
        assert.ok(
          isHex(value),
          `dark.colors.${key} invalid for config ${label}: ${value}`,
        );
      }
      for (const [key, value] of Object.entries(theme.light.colors)) {
        assert.ok(
          isHex(value),
          `light.colors.${key} invalid for config ${label}: ${value}`,
        );
      }
    });
  }
});

describe('Variant dispatching throws on unknown variants', () => {
  test('getPalette throws on unknown variant', () => {
    assert.throws(() => getPalette({}, 'invalid-variant' as never));
  });
});

// }}}
// vim: fdm=marker fmr={{{,}}}:
