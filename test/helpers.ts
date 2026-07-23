/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// Shared test helpers for the Ravenwood test suite.

import type { Configuration } from '../src/interface';
import { getThemeData } from '../src/themeData';

/** Default configuration matching the build-time hook. */
export const defaultConfig: Configuration = {};

/** All contrast levels. */
export const contrastLevels = ['soft', 'medium', 'hard'] as const;

/** All workbench styles. */
export const workbenchStyles = ['material', 'flat', 'high-contrast'] as const;

/** All palette hues. */
export const hues = [
  'red',
  'orange',
  'yellow',
  'green',
  'aqua',
  'blue',
  'purple',
] as const;

/** Valid hex color regex (#RRGGBB or #RRGGBBAA). */
export const HEX_RE = /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/;

/** Check if a string is a valid hex color. */
export function isHex(value: string): boolean {
  return typeof value === 'string' && HEX_RE.test(value);
}

/** Generate all meaningful config combinations for fuzz testing. */
export function* configCombos(): Generator<Configuration> {
  // Default
  yield {};
  // Each contrast level for both variants
  for (const dc of contrastLevels) {
    yield { darkContrast: dc };
    for (const lc of contrastLevels) {
      yield { darkContrast: dc, lightContrast: lc };
    }
  }
  // Each workbench style for both variants
  for (const dw of workbenchStyles) {
    yield { darkWorkbench: dw };
    for (const lw of workbenchStyles) {
      yield { darkWorkbench: dw, lightWorkbench: lw };
    }
  }
  // Italic combos
  yield { italicKeywords: true };
  yield { italicKeywords: false };
  yield { italicKeywords: true, italicComments: false };
  yield { italicKeywords: false, italicComments: false };
  // High contrast
  yield { highContrast: true };
  // Cursor + selection colors
  for (const hue of hues) {
    yield { darkCursor: hue, lightCursor: hue };
    yield { darkSelection: hue, lightSelection: hue };
  }
  // Diagnostic opacity
  for (const op of ['0%', '12.5%', '25%', '37.5%', '50%']) {
    yield { diagnosticTextBackgroundOpacity: op };
  }
  // Kitchen sink
  yield {
    darkContrast: 'hard',
    lightContrast: 'soft',
    darkWorkbench: 'flat',
    lightWorkbench: 'high-contrast',
    darkCursor: 'green',
    lightCursor: 'aqua',
    darkSelection: 'blue',
    lightSelection: 'purple',
    italicKeywords: true,
    italicComments: true,
    diagnosticTextBackgroundOpacity: '25%',
    highContrast: true,
  };
}

/** Build theme data for a config, asserting it doesn't throw. */
export function buildTheme(config: Configuration = {}) {
  return getThemeData(config);
}

// vim: fdm=marker fmr={{{,}}}:
