/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// Sync tests — verify the default and italic variants produced by buildSyntax
// have matching language coverage. With the unified rules.ts design this is
// now guaranteed by construction, but the test remains as a smoke test.
// {{{

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { getPalette } from '../src/palette';
import { buildSyntax } from '../src/syntax/rules';

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

describe('buildSyntax default and italic variants have matching coverage', () => {
  const defaultRules = buildSyntax(darkPalette, false, true);
  const italicRules = buildSyntax(darkPalette, true, true);

  test('both have language coverage', () => {
    assert.ok(
      defaultRules.length > 100,
      'default variant should have many rules',
    );
    assert.ok(
      italicRules.length > 100,
      'italic variant should have many rules',
    );
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
      `Languages in default variant but missing in italic variant: ${missingInItalic.join(', ')}`,
    );
    assert.deepEqual(
      missingInDefault,
      [],
      `Languages in italic variant but missing in default variant: ${missingInDefault.join(', ')}`,
    );
  });

  test('rule scopes match between default and italic (names may differ for italic splits)', () => {
    // The italic variant may split a default rule into two (one italic, one regular)
    // with different names, but the scopes from the default variant must all be
    // covered by the italic variant (the Go split moves scopes rather than dropping them).
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
      `Scopes in default variant but missing in italic variant: ${missingInItalic.join(', ')}`,
    );
  });

  test('italic variant has fontStyle: italic on keyword rules', () => {
    const italicKeywords = italicRules.filter(
      (r) => r.name.toLowerCase().includes('keyword') && r.settings.fontStyle,
    );
    assert.ok(
      italicKeywords.length > 0,
      'italic variant should have keyword rules with fontStyle: "italic"',
    );
    for (const rule of italicKeywords) {
      assert.ok(
        rule.settings.fontStyle?.includes('italic'),
        `italic variant rule "${rule.name}" should have fontStyle including "italic", got: ${rule.settings.fontStyle}`,
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
        `default variant rule "${rule.name}" should not have fontStyle: italic (comments excepted)`,
      );
    }
  });
});

// }}}
// vim: fdm=marker fmr={{{,}}}:
