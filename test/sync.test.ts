/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// Sync tests — verify default.ts and italic.ts have matching language coverage.
// This is the #1 regression source: every rule added to default.ts must also
// appear in italic.ts (with italic adjustments for keywords/comments).
// {{{

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { Palette } from '../src/interface';
import { getPalette } from '../src/palette';
import { getDefaultSyntax } from '../src/syntax/default';
import { getItalicSyntax } from '../src/syntax/italic';

const darkPalette = getPalette({}, 'dark');

/** Extract language suffixes from a set of syntax rules. */
function extractLanguages(
  rules: { scope: string; name: string }[],
): Set<string> {
  const langs = new Set<string>();
  const knownLangs = new Set([
    'go',
    'py',
    'rs',
    'swift',
    'sql',
    'rb',
    'java',
    'kt',
    'scala',
    'hs',
    'elm',
    'lua',
    'clj',
    'ex',
    'exs',
    'erl',
    'fs',
    'cs',
    'cpp',
    'c',
    'dart',
    'graphql',
    'perl',
    'rkt',
    'julia',
    'ocaml',
    'purescript',
    'fish',
    'sh',
    'bash',
    'zsh',
    'ps1',
    'viml',
    'vim',
    'tmux',
    'dockerfile',
    'makefile',
    'cmake',
    'yaml',
    'toml',
    'ini',
    'xml',
    'html',
    'scss',
    'sass',
    'less',
    'stylus',
    'pug',
    'coffee',
    'groovy',
    'php',
    'tex',
    'latex',
  ]);
  for (const rule of rules) {
    const matches = rule.scope.matchAll(/\.([a-z]+)/g);
    for (const m of matches) {
      if (knownLangs.has(m[1])) {
        langs.add(m[1]);
      }
    }
  }
  return langs;
}

/** Extract rule names (stripping variant suffixes for comparison). */
function _extractRuleNames(rules: { name: string }[]): Set<string> {
  return new Set(rules.map((r) => r.name));
}

describe('default.ts and italic.ts are in sync', () => {
  const defaultRules = getDefaultSyntax(darkPalette as Palette, true);
  const italicRules = getItalicSyntax(darkPalette as Palette, true);

  test('both have language coverage', () => {
    assert.ok(defaultRules.length > 100, 'default.ts should have many rules');
    assert.ok(italicRules.length > 100, 'italic.ts should have many rules');
  });

  test('language coverage matches between default and italic', () => {
    const defaultLangs = extractLanguages(defaultRules);
    const italicLangs = extractLanguages(italicRules);
    const missingInItalic = [...defaultLangs].filter(
      (l) => !italicLangs.has(l),
    );
    const missingInDefault = [...italicLangs].filter(
      (l) => !defaultLangs.has(l),
    );
    assert.deepEqual(
      missingInItalic,
      [],
      `Languages in default.ts but missing in italic.ts: ${missingInItalic.join(', ')}`,
    );
    assert.deepEqual(
      missingInDefault,
      [],
      `Languages in italic.ts but missing in default.ts: ${missingInDefault.join(', ')}`,
    );
  });

  test('rule scopes match between default and italic (names may differ for italic splits)', () => {
    // The italic variant may split a default rule into two (one italic, one regular)
    // with different names, but the scopes must all be covered.
    const defaultScopes = new Set(
      defaultRules.flatMap((r) => r.scope.split(',').map((s) => s.trim())),
    );
    const italicScopes = new Set(
      italicRules.flatMap((r) => r.scope.split(',').map((s) => s.trim())),
    );
    const missingInItalic = [...defaultScopes].filter(
      (s) => !italicScopes.has(s),
    );
    assert.deepEqual(
      missingInItalic,
      [],
      `Scopes in default.ts but missing in italic.ts: ${missingInItalic.join(', ')}`,
    );
  });

  test('italic variant has fontStyle: italic on keyword rules', () => {
    const italicKeywords = italicRules.filter(
      (r) => r.name.toLowerCase().includes('keyword') && r.settings.fontStyle,
    );
    assert.ok(
      italicKeywords.length > 0,
      'italic.ts should have keyword rules with fontStyle: "italic"',
    );
    for (const rule of italicKeywords) {
      assert.ok(
        rule.settings.fontStyle?.includes('italic'),
        `italic.ts rule "${rule.name}" should have fontStyle including "italic", got: ${rule.settings.fontStyle}`,
      );
    }
  });

  test('default variant does not italicize keywords', () => {
    const keywordRules = defaultRules.filter((r) =>
      r.name.toLowerCase().includes('keyword'),
    );
    for (const rule of keywordRules) {
      // Default variant should NOT have fontStyle: italic on keyword rules
      // (comments can be italic, keywords should not be)
      assert.ok(
        !rule.settings.fontStyle?.includes('italic') ||
          rule.name.toLowerCase().includes('comment'),
        `default.ts rule "${rule.name}" should not have fontStyle: italic (comments excepted)`,
      );
    }
  });
});

// }}}
// vim: fdm=marker fmr={{{,}}}:
