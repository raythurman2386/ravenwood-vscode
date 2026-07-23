/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// Scope safety tests — verify no overbroad TextMate scopes that would
// override colors for ALL languages instead of just the intended one.
// {{{

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { Palette } from '../src/interface';
import { getPalette } from '../src/palette';
import { getDefaultSyntax } from '../src/syntax/default';
import { getItalicSyntax } from '../src/syntax/italic';

const darkPalette = getPalette({}, 'dark');
const defaultRules = getDefaultSyntax(darkPalette as Palette, true);
const italicRules = getItalicSyntax(darkPalette as Palette, true);
const allRules = [...defaultRules, ...italicRules];

/**
 * Scopes that are intentionally generic (apply to all languages).
 * These are common TextMate scopes like "keyword", "string", "comment"
 * that are NOT language-specific and are safe to have without a suffix.
 */
const GENERIC_SCOPES = new Set([
  'keyword',
  'keyword.operator',
  'keyword.operator.new',
  'keyword.operator.expression',
  'keyword.operator.delete',
  'keyword.other.debugger',
  'storage.type.function',
  'storage.type.class',
  'storage.type.enum',
  'storage.type.interface',
  'storage.type.property',
  'storage.type.extends',
  'string',
  'string.template',
  'string.quoted.single',
  'string.quoted.double',
  'string.quoted.triple',
  'string.regexp',
  'string.interpolated',
  'string.unquoted',
  'constant',
  'constant.language',
  'constant.numeric',
  'constant.character',
  'constant.character.escape',
  'comment',
  'comment.line',
  'comment.block',
  'comment.line.double-slash',
  'comment.line.number-sign',
  'comment.block.documentation',
  'punctuation',
  'punctuation.separator',
  'punctuation.terminator',
  'punctuation.definition.string',
  'punctuation.definition.comment',
  'punctuation.definition.keyword',
  'punctuation.definition.variable',
  'punctuation.definition.parameters',
  'punctuation.section',
  'text',
  'source',
  'meta',
  'entity',
  'entity.name',
  'entity.name.function',
  'entity.name.class',
  'entity.name.type',
  'entity.name.tag',
  'entity.other',
  'entity.other.attribute-name',
  'entity.other.inherited-class',
  'variable',
  'variable.language',
  'variable.parameter',
  'variable.other',
  'variable.other.readwrite',
  'variable.other.member',
  'variable.other.constant',
  'variable.function',
  'support',
  'support.function',
  'support.type',
  'support.class',
  'support.constant',
  'support.variable',
  'support.other',
  'storage',
  'storage.modifier',
  'meta.function',
  'meta.class',
  'meta.method',
  'meta.block',
  'meta.brace',
  'meta.paragraph',
  'markup',
  'markup.heading',
  'markup.bold',
  'markup.italic',
  'markup.underline',
  'markup.inserted',
  'markup.deleted',
  'markup.quote',
  'markup.raw',
  'markup.list',
  'markup.other',
  'diff',
  'diff.inserted',
  'diff.deleted',
  'diff.changed',
  'invalid',
  'invalid.illegal',
  'invalid.deprecated',
]);

/** Known language suffixes — if a scope has one of these, it's language-specific. */
const KNOWN_LANGS = new Set([
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
  'json',
  'js',
  'ts',
  'tsx',
  'jsx',
  'css',
  'md',
  'markdown',
  'ruby',
  'python',
  'typescript',
  'javascript',
  'kotlin',
  'fsharp',
  'clojure',
  'elixir',
  'erlang',
  'r',
  'dart',
  'powershell',
  'shell',
  'assembly',
  'nasm',
]);

/**
 * Check if a scope is safe (either generic, or has a language suffix).
 * Returns the problematic scope if it's overbroad.
 */
function findOverbroadScopes(
  rules: { scope: string; name: string }[],
): string[] {
  const problems: string[] = [];
  for (const rule of rules) {
    const scopes = rule.scope.split(',').map((s) => s.trim());
    for (const scope of scopes) {
      // Skip empty
      if (!scope) continue;
      // Skip if it's in the generic scope whitelist
      if (GENERIC_SCOPES.has(scope)) continue;
      // Check if it has a language suffix
      const parts = scope.split('.');
      const lastPart = parts[parts.length - 1];
      if (KNOWN_LANGS.has(lastPart)) continue;
      // Check if any part is a known language
      const hasLangPart = parts.some((p) => KNOWN_LANGS.has(p));
      if (hasLangPart) continue;
      // Check if it starts with "text." or "source." (these are generic file type scopes)
      if (scope.startsWith('text.') || scope.startsWith('source.')) continue;
      // Check if it's a meta/punctuation scope (usually safe)
      if (scope.startsWith('meta.') || scope.startsWith('punctuation.'))
        continue;
      // Check if it has entity.name.class without a suffix (overbroad)
      if (scope === 'entity.name.class' && !GENERIC_SCOPES.has(scope)) {
        problems.push(
          `"${scope}" in rule "${rule.name}" — missing language suffix (e.g., entity.name.class.scala)`,
        );
      }
    }
  }
  return problems;
}

describe('No overbroad scopes', () => {
  test('all language-specific scopes have a language suffix', () => {
    const problems = findOverbroadScopes(allRules);
    assert.deepEqual(
      problems,
      [],
      `Overbroad scopes found (would override ALL languages):\n${problems.join('\n')}`,
    );
  });
});

// }}}
// vim: fdm=marker fmr={{{,}}}:
