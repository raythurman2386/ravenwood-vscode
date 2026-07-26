/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// Semantic + workbench tests — verify getSemanticFromPalette produces valid
// output, all claimed language IDs have token entries, and workbench styles
// (material/flat/highContrast) produce meaningfully different output.
// {{{

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { Configuration } from '../src/interface';
import { getPalette } from '../src/palette';
import { getSemantic, getSemanticFromPalette } from '../src/semantic';
import { getWorkbench } from '../src/workbench';
import { isHex } from './helpers';

// ---- getSemanticFromPalette ----

describe('getSemanticFromPalette', () => {
  const darkPalette = getPalette({}, 'dark');
  const lightPalette = getPalette({}, 'light');
  const darkSemantic = getSemanticFromPalette(darkPalette);
  const lightSemantic = getSemanticFromPalette(lightPalette);

  test('returns a non-empty object', () => {
    assert.ok(
      Object.keys(darkSemantic).length > 50,
      'should have 50+ semantic entries',
    );
  });

  test('all values are valid hex', () => {
    for (const [key, value] of Object.entries(darkSemantic)) {
      assert.ok(
        isHex(value),
        `dark semantic ${key} is not valid hex: ${value}`,
      );
    }
    for (const [key, value] of Object.entries(lightSemantic)) {
      assert.ok(
        isHex(value),
        `light semantic ${key} is not valid hex: ${value}`,
      );
    }
  });

  test('produces identical result to getSemantic(config, variant)', () => {
    const darkViaConfig = getSemantic({}, 'dark');
    const lightViaConfig = getSemantic({}, 'light');
    assert.deepEqual(
      darkSemantic,
      darkViaConfig,
      'getSemanticFromPalette(dark) should match getSemantic({}, "dark")',
    );
    assert.deepEqual(
      lightSemantic,
      lightViaConfig,
      'getSemanticFromPalette(light) should match getSemantic({}, "light")',
    );
  });
});

// ---- Semantic token language coverage ----

describe('Semantic token language coverage', () => {
  const semantic = getSemanticFromPalette(getPalette({}, 'dark'));
  const keys = Object.keys(semantic);

  // All language IDs that should have at least one semantic token entry
  const expectedLangs = [
    'javascript',
    'javascriptreact',
    'typescript',
    'typescriptreact',
    'python',
    'rust',
    'java',
    'csharp',
    'cpp',
    'go',
    'elm',
    'erlang',
    'ruby',
    'commonlisp',
    'r',
    'lua',
    'groovy',
    'clojure',
    'php',
    'julia',
    'fsharp',
    'kotlin',
    'scala',
    'swift',
    'dart',
    'haskell',
    'ocaml',
    'purescript',
    'coffeescript',
    'perl',
    'elixir',
    'html',
    'xml',
    'stylus',
  ];

  test(`covers all ${expectedLangs.length} expected language IDs`, () => {
    for (const lang of expectedLangs) {
      const found = keys.some((k) => k.endsWith(`:${lang}`));
      assert.ok(found, `no semantic token entries for language "${lang}"`);
    }
  });

  test('all keys use the tokenType:langId pattern', () => {
    for (const key of keys) {
      // General (non-language-scoped) tokens are allowed — just check they don't
      // have a bare colon at the end (malformed)
      if (key.includes(':')) {
        const parts = key.split(':');
        assert.ok(parts.length === 2, `malformed semantic key: "${key}"`);
        assert.ok(
          parts[0].length > 0,
          `empty token type in semantic key: "${key}"`,
        );
        assert.ok(
          parts[1].length > 0,
          `empty language ID in semantic key: "${key}"`,
        );
      }
    }
  });
});

// ---- Workbench style isolation ----

describe('Workbench style isolation', () => {
  const _darkPalette = getPalette({}, 'dark');
  const baseConfig: Configuration = {};

  const material = getWorkbench(
    { ...baseConfig, darkWorkbench: 'material' },
    'dark',
  );
  const flat = getWorkbench({ ...baseConfig, darkWorkbench: 'flat' }, 'dark');
  const highContrast = getWorkbench(
    { ...baseConfig, darkWorkbench: 'high-contrast' },
    'dark',
  );

  test('material and flat produce different output', () => {
    let diffs = 0;
    for (const key of Object.keys(material)) {
      if (material[key] !== flat[key]) diffs++;
    }
    assert.ok(
      diffs > 5,
      `material and flat only differ on ${diffs} keys — expected >5`,
    );
  });

  test('material and highContrast produce different output', () => {
    let diffs = 0;
    for (const key of Object.keys(material)) {
      if (material[key] !== highContrast[key]) diffs++;
    }
    assert.ok(
      diffs > 5,
      `material and highContrast only differ on ${diffs} keys — expected >5`,
    );
  });

  test('flat and highContrast produce different output', () => {
    let diffs = 0;
    for (const key of Object.keys(flat)) {
      if (flat[key] !== highContrast[key]) diffs++;
    }
    assert.ok(
      diffs > 5,
      `flat and highContrast only differ on ${diffs} keys — expected >5`,
    );
  });

  test('all three styles have the same key set', () => {
    const materialKeys = Object.keys(material).sort();
    const flatKeys = Object.keys(flat).sort();
    const hcKeys = Object.keys(highContrast).sort();
    assert.deepEqual(
      materialKeys,
      flatKeys,
      'material and flat key sets differ',
    );
    assert.deepEqual(
      materialKeys,
      hcKeys,
      'material and highContrast key sets differ',
    );
  });

  test('highContrast flag adds contrastBorder keys', () => {
    const hcFlag = getWorkbench({ ...baseConfig, highContrast: true }, 'dark');
    assert.ok(
      'contrastBorder' in hcFlag,
      'highContrast=true should set contrastBorder',
    );
    assert.ok(
      'contrastActiveBorder' in hcFlag,
      'highContrast=true should set contrastActiveBorder',
    );
    // Material without the flag should not have these
    assert.ok(
      !('contrastBorder' in material),
      'material without highContrast should not set contrastBorder',
    );
  });
});

// }}}

// vim: fdm=marker fmr={{{,}}}:
