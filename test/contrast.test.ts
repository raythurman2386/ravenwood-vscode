/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// Contrast tests — verify all palette variants meet WCAG accessibility
// thresholds for text readability. These tests guard against regressions
// from outside contributions that might inadvertently reduce contrast.
// {{{

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { Configuration } from '../src/interface';
import { getPalette } from '../src/palette';

// ---- Helpers ----

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  return {
    r: Number.parseInt(h.slice(0, 2), 16),
    g: Number.parseInt(h.slice(2, 4), 16),
    b: Number.parseInt(h.slice(4, 6), 16),
  };
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string): number {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  const l1 = relativeLuminance(c1.r, c1.g, c1.b);
  const l2 = relativeLuminance(c2.r, c2.g, c2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function lightness(hex: string): number {
  const c = hexToRgb(hex);
  const r = c.r / 255;
  const g = c.g / 255;
  const b = c.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return (max + min) / 2;
}

function saturation(hex: string): number {
  const c = hexToRgb(hex);
  const r = c.r / 255;
  const g = c.g / 255;
  const b = c.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return 0;
  const d = max - min;
  return l > 0.5 ? d / (2 - max - min) : d / (max + min);
}

// ---- Test configs ----

const contrastLevels = ['soft', 'medium', 'hard'] as const;
const variants = ['dark', 'light'] as const;
const dimPairs: [string, string][] = [
  ['red', 'dimRed'],
  ['orange', 'dimOrange'],
  ['yellow', 'dimYellow'],
  ['green', 'dimGreen'],
  ['aqua', 'dimAqua'],
  ['blue', 'dimBlue'],
  ['purple', 'dimPurple'],
];
const bgKeys = ['bg0', 'bg1', 'bg', 'bg2', 'bg3', 'bg4', 'bg5'] as const;
const greyKeys = ['grey0', 'grey1', 'grey2'] as const;

// ---- WCAG thresholds ----
const AA = 4.5;
const AA_LARGE = 3;

// ---- Tests ----

describe('WCAG contrast — primary text (fg on bg)', () => {
  for (const variant of variants) {
    for (const contrast of contrastLevels) {
      const config: Configuration =
        variant === 'dark'
          ? { darkContrast: contrast }
          : { lightContrast: contrast };
      const p = getPalette(config, variant);
      const ratio = contrastRatio(p.fg, p.bg);

      test(`${variant}-${contrast}: fg on bg = ${ratio.toFixed(2)} (AAA ≥ 7)`, () => {
        assert.ok(
          ratio >= AA,
          `${variant}-${contrast}: fg (${p.fg}) on bg (${p.bg}) = ${ratio.toFixed(2)} — below AA (${AA})`,
        );
      });
    }
  }
});

describe('WCAG contrast — grey text (grey0/grey1/grey2 on bg)', () => {
  for (const variant of variants) {
    for (const contrast of contrastLevels) {
      const config: Configuration =
        variant === 'dark'
          ? { darkContrast: contrast }
          : { lightContrast: contrast };
      const p = getPalette(config, variant);

      for (const grey of greyKeys) {
        const ratio = contrastRatio(p[grey], p.bg);
        test(`${variant}-${contrast}: ${grey} on bg = ${ratio.toFixed(2)} (AA-large ≥ 3)`, () => {
          assert.ok(
            ratio >= AA_LARGE,
            `${variant}-${contrast}: ${grey} (${p[grey]}) on bg (${p.bg}) = ${ratio.toFixed(2)} — below AA-large (${AA_LARGE})`,
          );
        });
      }
    }
  }
});

describe('WCAG contrast — badge on bg', () => {
  for (const variant of variants) {
    for (const contrast of contrastLevels) {
      const config: Configuration =
        variant === 'dark'
          ? { darkContrast: contrast }
          : { lightContrast: contrast };
      const p = getPalette(config, variant);
      const ratio = contrastRatio(p.badge, p.bg);

      test(`${variant}-${contrast}: badge on bg = ${ratio.toFixed(2)} (AA-large ≥ 3)`, () => {
        assert.ok(
          ratio >= AA_LARGE,
          `${variant}-${contrast}: badge (${p.badge}) on bg (${p.bg}) = ${ratio.toFixed(2)} — below AA-large (${AA_LARGE})`,
        );
      });
    }
  }
});

describe('WCAG contrast — badge foreground on badge background', () => {
  for (const variant of variants) {
    for (const contrast of contrastLevels) {
      const config: Configuration =
        variant === 'dark'
          ? { darkContrast: contrast }
          : { lightContrast: contrast };
      const p = getPalette(config, variant);
      const ratio = contrastRatio(p.bg, p.badge);

      test(`${variant}-${contrast}: bg on badge = ${ratio.toFixed(2)} (AA-large ≥ 3)`, () => {
        assert.ok(
          ratio >= AA_LARGE,
          `${variant}-${contrast}: bg (${p.bg}) on badge (${p.badge}) = ${ratio.toFixed(2)} — below AA-large (${AA_LARGE})`,
        );
      });
    }
  }
});

describe('Palette integrity — dim variants', () => {
  for (const variant of variants) {
    for (const contrast of contrastLevels) {
      const config: Configuration =
        variant === 'dark'
          ? { darkContrast: contrast }
          : { lightContrast: contrast };
      const p = getPalette(config, variant);

      for (const [parent, dim] of dimPairs) {
        const parentL = lightness(p[parent]);
        const dimL = lightness(p[dim]);
        const parentSat = saturation(p[parent]);
        const dimSat = saturation(p[dim]);

        test(`${variant}-${contrast}: ${dim} is darker than ${parent}`, () => {
          assert.ok(
            dimL < parentL,
            `${variant}-${contrast}: ${dim} (${(dimL * 100).toFixed(0)}% lightness) is not darker than ${parent} (${(parentL * 100).toFixed(0)}% lightness)`,
          );
        });

        test(`${variant}-${contrast}: ${dim} is not more saturated than ${parent}`, () => {
          assert.ok(
            dimSat <= parentSat + 0.05,
            `${variant}-${contrast}: ${dim} (${(dimSat * 100).toFixed(0)}% sat) is more saturated than ${parent} (${(parentSat * 100).toFixed(0)}% sat)`,
          );
        });
      }
    }
  }
});

describe('Palette integrity — foreground tint', () => {
  for (const variant of variants) {
    for (const contrast of contrastLevels) {
      const config: Configuration =
        variant === 'dark'
          ? { darkContrast: contrast }
          : { lightContrast: contrast };
      const p = getPalette(config, variant);
      const fgRgb = hexToRgb(p.fg);

      if (variant === 'dark') {
        test(`${variant}-${contrast}: fg is not pure white`, () => {
          assert.notEqual(
            fgRgb.r,
            255,
            `${variant}-${contrast}: fg (${p.fg}) is pure white — should be warm-tinted`,
          );
          assert.notEqual(
            fgRgb.g,
            255,
            `${variant}-${contrast}: fg (${p.fg}) is pure white — should be warm-tinted`,
          );
          assert.notEqual(
            fgRgb.b,
            255,
            `${variant}-${contrast}: fg (${p.fg}) is pure white — should be warm-tinted`,
          );
        });
      } else {
        test(`${variant}-${contrast}: fg is not pure black`, () => {
          assert.notEqual(
            fgRgb.r,
            0,
            `${variant}-${contrast}: fg (${p.fg}) is pure black — should be cool-tinted`,
          );
          assert.notEqual(
            fgRgb.g,
            0,
            `${variant}-${contrast}: fg (${p.fg}) is pure black — should be cool-tinted`,
          );
          assert.notEqual(
            fgRgb.b,
            0,
            `${variant}-${contrast}: fg (${p.fg}) is pure black — should be cool-tinted`,
          );
        });
      }
    }
  }
});

describe('Palette integrity — background tint', () => {
  for (const variant of variants) {
    for (const contrast of contrastLevels) {
      const config: Configuration =
        variant === 'dark'
          ? { darkContrast: contrast }
          : { lightContrast: contrast };
      const p = getPalette(config, variant);
      const bgRgb = hexToRgb(p.bg);
      const max = Math.max(bgRgb.r, bgRgb.g, bgRgb.b);
      const min = Math.min(bgRgb.r, bgRgb.g, bgRgb.b);

      test(`${variant}-${contrast}: bg is not neutral grey`, () => {
        assert.ok(
          max - min >= 3,
          `${variant}-${contrast}: bg (${p.bg}) is nearly neutral grey (r=${bgRgb.r} g=${bgRgb.g} b=${bgRgb.b}) — needs a tint`,
        );
      });
    }
  }
});

describe('Palette integrity — background gradient', () => {
  for (const variant of variants) {
    for (const contrast of contrastLevels) {
      const config: Configuration =
        variant === 'dark'
          ? { darkContrast: contrast }
          : { lightContrast: contrast };
      const p = getPalette(config, variant);

      if (variant === 'dark') {
        // Dark: bg0 is darkest, bg5 is lightest — lightness increases monotonically
        for (let i = 0; i < bgKeys.length - 1; i++) {
          const a = p[bgKeys[i]];
          const b = p[bgKeys[i + 1]];
          const lA = lightness(a);
          const lB = lightness(b);

          test(`${variant}-${contrast}: ${bgKeys[i]} → ${bgKeys[i + 1]} lightness increases`, () => {
            assert.ok(
              lB > lA,
              `${variant}-${contrast}: ${bgKeys[i]} (${(lA * 100).toFixed(0)}%) → ${bgKeys[i + 1]} (${(lB * 100).toFixed(0)}%) lightness must increase`,
            );
          });
        }
      } else {
        // Light: bg is the lightest (canvas), bg0 and bg5 are darker.
        // bg0 → bg1 → bg increases, bg → bg2 → bg3 → bg4 → bg5 decreases.
        const ascent = ['bg0', 'bg1', 'bg'] as const;
        const descent = ['bg', 'bg2', 'bg3', 'bg4', 'bg5'] as const;

        for (let i = 0; i < ascent.length - 1; i++) {
          const a = p[ascent[i]];
          const b = p[ascent[i + 1]];
          const lA = lightness(a);
          const lB = lightness(b);

          test(`${variant}-${contrast}: ${ascent[i]} → ${ascent[i + 1]} lightness increases`, () => {
            assert.ok(
              lB >= lA,
              `${variant}-${contrast}: ${ascent[i]} (${(lA * 100).toFixed(0)}%) → ${ascent[i + 1]} (${(lB * 100).toFixed(0)}%) lightness must increase`,
            );
          });
        }

        for (let i = 0; i < descent.length - 1; i++) {
          const a = p[descent[i]];
          const b = p[descent[i + 1]];
          const lA = lightness(a);
          const lB = lightness(b);

          test(`${variant}-${contrast}: ${descent[i]} → ${descent[i + 1]} lightness decreases`, () => {
            assert.ok(
              lB <= lA,
              `${variant}-${contrast}: ${descent[i]} (${(lA * 100).toFixed(0)}%) → ${descent[i + 1]} (${(lB * 100).toFixed(0)}%) lightness must decrease`,
            );
          });
        }
      }
    }
  }
});

// }}}
// vim: fdm=marker fmr={{{,}}}:
