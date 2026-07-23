/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// Structural tests — verify the theme output shape is valid VS Code theme JSON.
// {{{

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { buildTheme, isHex } from './helpers';

describe('Theme structure', () => {
  test('dark theme has correct top-level keys', () => {
    const { dark } = buildTheme();
    assert.equal(dark.name, 'Ravenwood Dark');
    assert.equal(dark.type, 'dark');
    assert.equal(dark.semanticHighlighting, true);
    assert.ok(typeof dark.semanticTokenColors === 'object');
    assert.ok(typeof dark.colors === 'object');
    assert.ok(Array.isArray(dark.tokenColors));
  });

  test('light theme has correct top-level keys', () => {
    const { light } = buildTheme();
    assert.equal(light.name, 'Ravenwood Light');
    assert.equal(light.type, 'light');
    assert.equal(light.semanticHighlighting, true);
    assert.ok(typeof light.semanticTokenColors === 'object');
    assert.ok(typeof light.colors === 'object');
    assert.ok(Array.isArray(light.tokenColors));
  });
});

describe('Color values are valid hex', () => {
  test('all workbench colors are valid hex', () => {
    const { dark, light } = buildTheme();
    for (const [key, value] of Object.entries(dark.colors)) {
      assert.ok(isHex(value), `dark.colors.${key} is not valid hex: ${value}`);
    }
    for (const [key, value] of Object.entries(light.colors)) {
      assert.ok(isHex(value), `light.colors.${key} is not valid hex: ${value}`);
    }
  });

  test('all semantic token colors are valid hex', () => {
    const { dark, light } = buildTheme();
    for (const [key, value] of Object.entries(dark.semanticTokenColors)) {
      assert.ok(
        isHex(value),
        `dark.semanticTokenColors.${key} is not valid hex: ${value}`,
      );
    }
    for (const [key, value] of Object.entries(light.semanticTokenColors)) {
      assert.ok(
        isHex(value),
        `light.semanticTokenColors.${key} is not valid hex: ${value}`,
      );
    }
  });

  test('all tokenColors foregrounds are valid hex', () => {
    const { dark, light } = buildTheme();
    for (const rule of dark.tokenColors) {
      if (rule.settings.foreground) {
        assert.ok(
          isHex(rule.settings.foreground),
          `dark tokenColor "${rule.name}" foreground is not valid hex: ${rule.settings.foreground}`,
        );
      }
    }
    for (const rule of light.tokenColors) {
      if (rule.settings.foreground) {
        assert.ok(
          isHex(rule.settings.foreground),
          `light tokenColor "${rule.name}" foreground is not valid hex: ${rule.settings.foreground}`,
        );
      }
    }
  });

  test('no stray characters in color values', () => {
    const { dark, light } = buildTheme();
    for (const [key, value] of Object.entries(dark.colors)) {
      assert.ok(
        !value.includes('}'),
        `dark.colors.${key} contains stray "}" — likely a template literal bug: ${value}`,
      );
    }
    for (const [key, value] of Object.entries(light.colors)) {
      assert.ok(
        !value.includes('}'),
        `light.colors.${key} contains stray "}" — likely a template literal bug: ${value}`,
      );
    }
  });
});

describe('TokenColor rules are well-formed', () => {
  test('every tokenColor has a name, scope, and settings', () => {
    const { dark, light } = buildTheme();
    for (const rule of [...dark.tokenColors, ...light.tokenColors]) {
      assert.ok(rule.name, `tokenColor missing name: ${JSON.stringify(rule)}`);
      assert.ok(rule.scope, `tokenColor "${rule.name}" missing scope`);
      assert.ok(rule.settings, `tokenColor "${rule.name}" missing settings`);
    }
  });

  test('tokenColors are non-empty', () => {
    const { dark, light } = buildTheme();
    assert.ok(
      dark.tokenColors.length > 100,
      `dark tokenColors too few: ${dark.tokenColors.length}`,
    );
    assert.ok(
      light.tokenColors.length > 100,
      `light tokenColors too few: ${light.tokenColors.length}`,
    );
  });
});

// }}}
// vim: fdm=marker fmr={{{,}}}:
