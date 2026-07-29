/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// BuildSyntax flag tests — verify the per-rule flags in rules.ts produce
// correct output for each italicKeywords/italicComments combination. These
// test the flag logic directly rather than comparing output against the
// deleted default.ts/italic.ts files.

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { Palette } from '../src/interface';
import { getPalette } from '../src/palette';
import { buildSyntax } from '../src/syntax/rules';

const palette = getPalette({}, 'dark') as Palette;

describe('buildSyntax — italicKeywords=false (default variant)', () => {
  const rules = buildSyntax(palette, false, true);

  test('rules with onlyWhenItalicKeywords are absent', () => {
    const names = new Set(rules.map((r) => r.name));
    assert.ok(
      !names.has('Regular'),
      '"Regular" rule should be absent when italicKeywords=false',
    );
    assert.ok(
      !names.has('Keyword Italic'),
      '"Keyword Italic" rule should be absent when italicKeywords=false',
    );
    assert.ok(
      !names.has('Preproc Italic'),
      '"Preproc Italic" rule should be absent when italicKeywords=false',
    );
  });

  test('rules with onlyWhenNotItalicKeywords are present', () => {
    const names = new Set(rules.map((r) => r.name));
    assert.ok(
      names.has('Ruby purple'),
      '"Ruby purple" rule should be present when italicKeywords=false',
    );
  });

  test('keyword rules do not have fontStyle: italic', () => {
    for (const rule of rules) {
      if (rule.name.toLowerCase().includes('keyword')) {
        assert.ok(
          !rule.settings.fontStyle?.includes('italic'),
          `rule "${rule.name}" should not have italic fontStyle when italicKeywords=false`,
        );
      }
    }
  });
});

describe('buildSyntax — italicKeywords=true (italic variant)', () => {
  const rules = buildSyntax(palette, true, true);

  test('rules with onlyWhenItalicKeywords are present', () => {
    const names = new Set(rules.map((r) => r.name));
    assert.ok(
      names.has('Regular'),
      '"Regular" rule should be present when italicKeywords=true',
    );
    assert.ok(
      names.has('Keyword Italic'),
      '"Keyword Italic" rule should be present when italicKeywords=true',
    );
    assert.ok(
      names.has('Preproc Italic'),
      '"Preproc Italic" rule should be present when italicKeywords=true',
    );
  });

  test('rules with onlyWhenNotItalicKeywords are absent', () => {
    const names = new Set(rules.map((r) => r.name));
    assert.ok(
      !names.has('Ruby purple'),
      '"Ruby purple" rule should be absent when italicKeywords=true (replaced by split italic/regular rules)',
    );
  });

  test('italicizeKeywords rules get italic appended to fontStyle', () => {
    const modulesRule = rules.find((r) => r.name === 'Modules');
    assert.ok(modulesRule, '"Modules" rule should exist');
    assert.ok(
      modulesRule.settings.fontStyle?.includes('italic'),
      `"Modules" fontStyle should include "italic" when italicKeywords=true, got: ${modulesRule.settings.fontStyle}`,
    );
  });

  test('italic variant produces more rules than default variant', () => {
    const defaultRules = buildSyntax(palette, false, true);
    assert.ok(
      rules.length > defaultRules.length,
      `italic variant (${rules.length} rules) should have more rules than default (${defaultRules.length})`,
    );
  });
});

describe('buildSyntax — italicComments flag', () => {
  test('italicComments=true produces comment rule with italic fontStyle', () => {
    const rules = buildSyntax(palette, false, true);
    const commentRule = rules.find((r) => r.name === 'Comment');
    assert.ok(commentRule, 'Comment rule should exist');
    assert.equal(
      commentRule.settings.fontStyle,
      'italic',
      'Comment should have fontStyle: "italic" when italicComments=true',
    );
  });

  test('italicComments=false produces comment rule without fontStyle', () => {
    const rules = buildSyntax(palette, false, false);
    const commentRule = rules.find((r) => r.name === 'Comment');
    assert.ok(commentRule, 'Comment rule should exist');
    assert.equal(
      commentRule.settings.fontStyle,
      undefined,
      'Comment should have no fontStyle when italicComments=false',
    );
  });

  test('both italicComments values produce the same non-comment rules', () => {
    const withItalic = buildSyntax(palette, false, true);
    const withoutItalic = buildSyntax(palette, false, false);
    // Strip the comment rule from both
    const stripComments = (rs: typeof withItalic) =>
      rs.filter((r) => r.name !== 'Comment');
    assert.deepEqual(
      stripComments(withItalic),
      stripComments(withoutItalic),
      'Non-comment rules should be identical regardless of italicComments',
    );
  });
});

describe('buildSyntax — foreground resolution', () => {
  test('all foregrounds are resolved to hex from the palette', () => {
    const rules = buildSyntax(palette, true, true);
    const hexRe = /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/;
    for (const rule of rules) {
      if (rule.settings.foreground) {
        assert.ok(
          hexRe.test(rule.settings.foreground),
          `rule "${rule.name}" foreground "${rule.settings.foreground}" is not valid hex`,
        );
      }
    }
  });

  test('Keyword rule foreground resolves to palette.red', () => {
    const rules = buildSyntax(palette, false, true);
    const keywordRule = rules.find((r) => r.name === 'Keyword');
    assert.ok(keywordRule);
    assert.equal(
      keywordRule.settings.foreground,
      palette.red,
      '"Keyword" foreground should resolve to palette.red',
    );
  });

  test('String rule foreground resolves to palette.yellow', () => {
    const rules = buildSyntax(palette, false, true);
    const stringRule = rules.find((r) => r.name === 'String');
    assert.ok(stringRule);
    assert.equal(
      stringRule.settings.foreground,
      palette.yellow,
      '"String" foreground should resolve to palette.yellow',
    );
  });
});

describe('buildSyntax — scope swapping via italicKeywordsScope', () => {
  test('Go red rule uses default scope when italicKeywords=false', () => {
    const rules = buildSyntax(palette, false, true);
    const goRed = rules.find((r) => r.name === 'Go red');
    assert.ok(goRed, '"Go red" rule should exist');
    assert.ok(
      goRed.scope.includes('keyword.package.go'),
      `"Go red" scope should include "keyword.package.go" when italicKeywords=false, got: ${goRed.scope}`,
    );
  });

  test('Go red rule uses swapped scope when italicKeywords=true', () => {
    const rules = buildSyntax(palette, true, true);
    const goRed = rules.find((r) => r.name === 'Go red');
    assert.ok(goRed, '"Go red" rule should exist');
    assert.ok(
      !goRed.scope.includes('keyword.package.go'),
      `"Go red" scope should NOT include "keyword.package.go" when italicKeywords=true (moved to Go purple), got: ${goRed.scope}`,
    );
  });

  test('Go purple rule gains keyword.package.go when italicKeywords=true', () => {
    const rules = buildSyntax(palette, true, true);
    const goPurple = rules.find((r) => r.name === 'Go purple');
    assert.ok(goPurple, '"Go purple" rule should exist');
    assert.ok(
      goPurple.scope.includes('keyword.package.go'),
      `"Go purple" scope should include "keyword.package.go" when italicKeywords=true, got: ${goPurple.scope}`,
    );
  });
});
