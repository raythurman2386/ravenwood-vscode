/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// Validation tests — verify validateConfig catches invalid enum values
// that bypass VS Code's package.json `enum` constraint (e.g., when a user
// edits settings.json directly with a typo).
// {{{

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { Configuration } from '../src/interface';
import { validateConfig } from '../src/validation';

describe('validateConfig — valid configs produce no warnings', () => {
  test('empty config (all defaults) produces no warnings', () => {
    assert.deepEqual(validateConfig({}), []);
  });

  test('fully populated valid config produces no warnings', () => {
    const config: Configuration = {
      darkContrast: 'hard',
      lightContrast: 'soft',
      darkWorkbench: 'flat',
      lightWorkbench: 'high-contrast',
      darkCursor: 'red',
      lightCursor: 'aqua',
      darkSelection: 'blue',
      lightSelection: 'green',
      italicKeywords: true,
      italicComments: false,
      diagnosticTextBackgroundOpacity: '25%',
      highContrast: true,
    };
    assert.deepEqual(validateConfig(config), []);
  });

  test('each valid enum value individually produces no warnings', () => {
    for (const contrast of ['soft', 'medium', 'hard'] as const) {
      assert.deepEqual(
        validateConfig({ darkContrast: contrast }),
        [],
        `darkContrast: "${contrast}" should be valid`,
      );
    }
    for (const workbench of ['material', 'flat', 'high-contrast'] as const) {
      assert.deepEqual(
        validateConfig({ darkWorkbench: workbench }),
        [],
        `darkWorkbench: "${workbench}" should be valid`,
      );
    }
    for (const opacity of ['0%', '12.5%', '25%', '37.5%', '50%'] as const) {
      assert.deepEqual(
        validateConfig({ diagnosticTextBackgroundOpacity: opacity }),
        [],
        `diagnosticTextBackgroundOpacity: "${opacity}" should be valid`,
      );
    }
  });
});

describe('validateConfig — typos produce warnings', () => {
  test('typo in darkContrast produces a warning', () => {
    const warnings = validateConfig({ darkContrast: 'Meduim' as never });
    assert.equal(warnings.length, 1);
    assert.match(
      warnings[0],
      /ravenwood\.darkContrast="Meduim" is not one of soft, medium, hard/,
    );
  });

  test('typo in darkWorkbench produces a warning', () => {
    const warnings = validateConfig({
      darkWorkbench: 'hight-contrast' as never,
    });
    assert.equal(warnings.length, 1);
    assert.match(
      warnings[0],
      /ravenwood\.darkWorkbench="hight-contrast" is not one of material, flat, high-contrast/,
    );
  });

  test('typo in diagnosticTextBackgroundOpacity produces a warning', () => {
    const warnings = validateConfig({
      diagnosticTextBackgroundOpacity: '15%' as never,
    });
    assert.equal(warnings.length, 1);
    assert.match(
      warnings[0],
      /ravenwood\.diagnosticTextBackgroundOpacity="15%" is not one of/,
    );
  });

  test('multiple typos produce multiple warnings', () => {
    const warnings = validateConfig({
      darkContrast: 'Meduim' as never,
      lightCursor: 'cyan' as never,
      darkSelection: 'gray' as never,
    });
    assert.equal(warnings.length, 3);
  });
});

describe('validateConfig — boolean fields are not validated', () => {
  test('italicKeywords is not in the warnings even if set', () => {
    assert.deepEqual(
      validateConfig({ italicKeywords: true, italicComments: false }),
      [],
    );
  });

  test('highContrast is not in the warnings', () => {
    assert.deepEqual(validateConfig({ highContrast: true }), []);
  });
});

// }}}

// vim: fdm=marker fmr={{{,}}}:
