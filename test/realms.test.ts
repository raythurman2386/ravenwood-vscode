/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// Realm tests — verify all 8 static realm palettes meet the same quality
// bar as the base dark/light palettes: palette validity, WCAG contrast,
// accent hue distinctness, background gradient, dim variant integrity,
// and realm-to-realm distinctness.
// {{{

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { Palette } from '../src/interface';
import alfheim from '../src/palette/realms/alfheim';
import asgard from '../src/palette/realms/asgard';
import helheim from '../src/palette/realms/helheim';
import jotunheim from '../src/palette/realms/jotunheim';
import muspelheim from '../src/palette/realms/muspelheim';
import nidavellir from '../src/palette/realms/nidavellir';
import svartalfheim from '../src/palette/realms/svartalfheim';
import vanaheim from '../src/palette/realms/vanaheim';
import { isHex } from './helpers';

// ---- Color helpers ----

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  return {
    r: Number.parseInt(h.slice(0, 2), 16),
    g: Number.parseInt(h.slice(2, 4), 16),
    b: Number.parseInt(h.slice(4, 6), 16),
  };
}

function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function lightness(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  return (max + min) / 2;
}

function saturation(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const rf = r / 255;
  const gf = g / 255;
  const bf = b / 255;
  const max = Math.max(rf, gf, bf);
  const min = Math.min(rf, gf, bf);
  return max === 0 ? 0 : (max - min) / max;
}

function toHue(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const rf = r / 255;
  const gf = g / 255;
  const bf = b / 255;
  const max = Math.max(rf, gf, bf);
  const min = Math.min(rf, gf, bf);
  const d = max - min;
  if (d === 0) return 0;
  let h: number;
  if (max === rf) {
    h = ((gf - bf) / d) % 6;
  } else if (max === gf) {
    h = (bf - rf) / d + 2;
  } else {
    h = (rf - gf) / d + 4;
  }
  h *= 60;
  if (h < 0) h += 360;
  return h;
}

function hueDistance(h1: number, h2: number): number {
  const d = Math.abs(h1 - h2);
  return Math.min(d, 360 - d);
}

// ---- Realm definitions ----

interface RealmDef {
  name: string;
  palette: Palette;
  isDark: boolean;
  heroColor: string;
  bgHueRange: [number, number];
}

const realms: RealmDef[] = [
  {
    name: 'asgard',
    palette: asgard,
    isDark: true,
    heroColor: 'gold',
    bgHueRange: [250, 290],
  },
  {
    name: 'vanaheim',
    palette: vanaheim,
    isDark: true,
    heroColor: 'green',
    bgHueRange: [150, 210],
  },
  {
    name: 'alfheim',
    palette: alfheim,
    isDark: false,
    heroColor: 'blue',
    bgHueRange: [200, 240],
  },
  {
    name: 'svartalfheim',
    palette: svartalfheim,
    isDark: true,
    heroColor: 'indigo',
    bgHueRange: [220, 260],
  },
  {
    name: 'nidavellir',
    palette: nidavellir,
    isDark: true,
    heroColor: 'amber',
    bgHueRange: [20, 50],
  },
  {
    name: 'jotunheim',
    palette: jotunheim,
    isDark: true,
    heroColor: 'ice-blue',
    bgHueRange: [180, 220],
  },
  {
    name: 'muspelheim',
    palette: muspelheim,
    isDark: true,
    heroColor: 'magma-red',
    bgHueRange: [10, 40],
  },
  {
    name: 'helheim',
    palette: helheim,
    isDark: true,
    heroColor: 'grey',
    bgHueRange: [0, 30],
  },
];

const requiredKeys: (keyof Palette)[] = [
  'bg0',
  'bg1',
  'bg',
  'bg2',
  'bg3',
  'bg4',
  'bg5',
  'grey0',
  'grey1',
  'grey2',
  'fg',
  'red',
  'orange',
  'yellow',
  'green',
  'aqua',
  'blue',
  'purple',
  'dimRed',
  'dimOrange',
  'dimYellow',
  'dimGreen',
  'dimAqua',
  'dimBlue',
  'dimPurple',
  'shadow',
  'badge',
];

const accentPairs: [string, keyof Palette, keyof Palette][] = [
  ['red', 'red', 'dimRed'],
  ['orange', 'orange', 'dimOrange'],
  ['yellow', 'yellow', 'dimYellow'],
  ['green', 'green', 'dimGreen'],
  ['aqua', 'aqua', 'dimAqua'],
  ['blue', 'blue', 'dimBlue'],
  ['purple', 'purple', 'dimPurple'],
];

const accentKeys: (keyof Palette)[] = [
  'red',
  'orange',
  'yellow',
  'green',
  'aqua',
  'blue',
  'purple',
];

// ---- Tests ----

describe('Realm palette validity', () => {
  for (const realm of realms) {
    test(`${realm.name}: all 27 palette keys present`, () => {
      for (const key of requiredKeys) {
        assert.ok(
          realm.palette[key] !== undefined,
          `${realm.name}: missing palette key "${key}"`,
        );
      }
    });

    test(`${realm.name}: all palette values are valid hex`, () => {
      for (const key of requiredKeys) {
        assert.ok(
          isHex(realm.palette[key]),
          `${realm.name}: ${key} is not valid hex: ${realm.palette[key]}`,
        );
      }
    });
  }
});

describe('Realm WCAG contrast', () => {
  for (const realm of realms) {
    test(`${realm.name}: fg on bg meets AA-large (≥3)`, () => {
      const ratio = contrastRatio(realm.palette.fg, realm.palette.bg);
      assert.ok(
        ratio >= 3,
        `${realm.name}: fg/bg contrast ${ratio.toFixed(2)} is below AA-large (≥3)`,
      );
    });

    test(`${realm.name}: grey2 on bg meets AA-large (≥3)`, () => {
      const ratio = contrastRatio(realm.palette.grey2, realm.palette.bg);
      assert.ok(
        ratio >= 3,
        `${realm.name}: grey2/bg contrast ${ratio.toFixed(2)} is below AA-large (≥3)`,
      );
    });

    test(`${realm.name}: badge on bg meets AA-large (≥3)`, () => {
      const ratio = contrastRatio(realm.palette.badge, realm.palette.bg);
      assert.ok(
        ratio >= 3,
        `${realm.name}: badge/bg contrast ${ratio.toFixed(2)} is below AA-large (≥3)`,
      );
    });
  }
});

describe('Realm accent hue distinctness', () => {
  for (const realm of realms) {
    test(`${realm.name}: all 7 accents have sufficiently distinct hues`, () => {
      // Helheim is intentionally desaturated — hues are meaningless at <21% sat
      if (realm.name === 'helheim') return;
      const hues = accentKeys.map((k) => toHue(realm.palette[k]));
      const warnings: string[] = [];
      for (let i = 0; i < hues.length; i++) {
        for (let j = i + 1; j < hues.length; j++) {
          const dist = hueDistance(hues[i], hues[j]);
          // Skip if both are very low saturation (grey-ish) — hue is meaningless
          const satI = saturation(realm.palette[accentKeys[i]]);
          const satJ = saturation(realm.palette[accentKeys[j]]);
          if (satI < 0.05 && satJ < 0.05) continue;
          // Adjacent warm accents (red/orange, orange/yellow) in fire/forge
          // realms are intentionally close — allow ≥10°
          const isWarmPair =
            (accentKeys[i] === 'red' && accentKeys[j] === 'orange') ||
            (accentKeys[i] === 'orange' && accentKeys[j] === 'yellow');
          const threshold = isWarmPair ? 10 : 15;
          if (dist < threshold) {
            warnings.push(
              `${accentKeys[i]}≈${accentKeys[j]} (hue dist ${dist.toFixed(1)}°)`,
            );
          }
        }
      }
      assert.equal(
        warnings.length,
        0,
        `${realm.name}: accent hues too close — ${warnings.join(', ')}`,
      );
    });
  }
});

describe('Realm background gradient', () => {
  for (const realm of realms) {
    test(`${realm.name}: bg0 → bg5 lightness is monotonic`, () => {
      const bgKeys: (keyof Palette)[] = [
        'bg0',
        'bg1',
        'bg',
        'bg2',
        'bg3',
        'bg4',
        'bg5',
      ];
      // Dark themes: lightness increases from bg0 (darkest) to bg5 (lightest).
      // Light themes: bg0 is darkest, bg is lightest, then bg2–bg5 descend.
      // Both share the same pattern: bg0 < bg1 < bg, then bg > bg2 > ... > bg5 (light)
      // or bg < bg2 < ... < bg5 (dark). The invariant is that bg0 is the darkest
      // and the sequence from bg0 to bg always increases.
      if (realm.isDark) {
        // Dark: monotonically increasing
        for (let i = 0; i < bgKeys.length - 1; i++) {
          const l1 = lightness(realm.palette[bgKeys[i]]);
          const l2 = lightness(realm.palette[bgKeys[i + 1]]);
          assert.ok(
            l2 > l1,
            `${realm.name}: ${bgKeys[i]} → ${bgKeys[i + 1]} lightness does not increase (${(l1 * 100).toFixed(0)}% → ${(l2 * 100).toFixed(0)}%)`,
          );
        }
      } else {
        // Light: bg0 is darkest, bg is lightest, bg2–bg5 descend from bg
        const bg0L = lightness(realm.palette.bg0);
        const bgL = lightness(realm.palette.bg);
        assert.ok(bgL > bg0L, `${realm.name}: bg should be lighter than bg0`);
        // bg0 → bg1 → bg must increase
        const bg1L = lightness(realm.palette.bg1);
        assert.ok(bg1L > bg0L, `${realm.name}: bg1 should be lighter than bg0`);
        assert.ok(bgL > bg1L, `${realm.name}: bg should be lighter than bg1`);
        // bg → bg2 → ... → bg5 must decrease
        for (let i = 2; i < bgKeys.length - 1; i++) {
          const l1 = lightness(realm.palette[bgKeys[i]]);
          const l2 = lightness(realm.palette[bgKeys[i + 1]]);
          assert.ok(
            l2 < l1,
            `${realm.name}: ${bgKeys[i]} → ${bgKeys[i + 1]} lightness does not decrease (${(l1 * 100).toFixed(0)}% → ${(l2 * 100).toFixed(0)}%)`,
          );
        }
      }
    });
  }
});

describe('Realm dim variant integrity', () => {
  for (const realm of realms) {
    for (const [_label, parent, dim] of accentPairs) {
      test(`${realm.name}: ${dim} is darker than ${parent}`, () => {
        const parentL = lightness(realm.palette[parent]);
        const dimL = lightness(realm.palette[dim]);
        assert.ok(
          dimL < parentL,
          `${realm.name}: ${dim} (${(dimL * 100).toFixed(0)}% L) is not darker than ${parent} (${(parentL * 100).toFixed(0)}% L)`,
        );
      });

      test(`${realm.name}: ${dim} is not more saturated than ${parent}`, () => {
        const parentSat = saturation(realm.palette[parent]);
        const dimSat = saturation(realm.palette[dim]);
        assert.ok(
          dimSat <= parentSat + 0.05,
          `${realm.name}: ${dim} (${(dimSat * 100).toFixed(0)}% S) is more saturated than ${parent} (${(parentSat * 100).toFixed(0)}% S)`,
        );
      });
    }
  }
});

describe('Realm background identity', () => {
  for (const realm of realms) {
    test(`${realm.name}: bg is not neutral grey`, () => {
      const sat = saturation(realm.palette.bg);
      // Helheim is intentionally achromatic (the desolate realm) — skip
      if (realm.name === 'helheim') return;
      // Alfheim is a light pastel theme with intentionally low saturation
      const threshold = realm.name === 'alfheim' ? 0.02 : 0.05;
      assert.ok(
        sat > threshold,
        `${realm.name}: bg saturation ${(sat * 100).toFixed(0)}% is too low — should have a tint`,
      );
    });

    test(`${realm.name}: bg hue is in expected range for realm identity`, () => {
      // Skip hue check for helheim — it's intentionally achromatic
      if (realm.name === 'helheim') return;
      const hue = toHue(realm.palette.bg);
      const [min, max] = realm.bgHueRange;
      assert.ok(
        hue >= min && hue <= max,
        `${realm.name}: bg hue ${Math.round(hue)}° is outside expected range ${min}°–${max}°`,
      );
    });
  }
});

describe('Realm foreground not pure white/black', () => {
  for (const realm of realms) {
    test(`${realm.name}: fg is not pure ${realm.isDark ? 'white' : 'black'}`, () => {
      const { r, g, b } = hexToRgb(realm.palette.fg);
      if (realm.isDark) {
        assert.ok(
          !(r === 255 && g === 255 && b === 255),
          `${realm.name}: fg is pure white — should be tinted`,
        );
      } else {
        assert.ok(
          !(r === 0 && g === 0 && b === 0),
          `${realm.name}: fg is pure black — should be tinted`,
        );
      }
    });
  }
});

describe('Realm distinctness from base dark', () => {
  // Base dark medium bg is #222822 (hue 120, green)
  const baseBgHue = 120;
  const _baseBg = '#222822';

  for (const realm of realms) {
    if (!realm.isDark) continue;
    if (realm.name === 'helheim') continue; // helheim is intentionally grey

    test(`${realm.name}: bg hue differs from base dark by ≥30°`, () => {
      const hue = toHue(realm.palette.bg);
      const dist = hueDistance(hue, baseBgHue);
      assert.ok(
        dist >= 30,
        `${realm.name}: bg hue ${Math.round(hue)}° is too close to base dark (120°, dist ${dist}°)`,
      );
    });
  }
});

describe('Realm-to-realm bg distinctness', () => {
  // Pairs that are intentionally in the same warm hue neighborhood
  const warmPairs = new Set([
    'helheim:nidavellir',
    'helheim:muspelheim',
    'nidavellir:muspelheim',
  ]);

  for (let i = 0; i < realms.length; i++) {
    for (let j = i + 1; j < realms.length; j++) {
      const r1 = realms[i];
      const r2 = realms[j];
      const pairKey = `${r1.name}:${r2.name}`;

      test(`${r1.name} vs ${r2.name}: bg hues are distinct`, () => {
        // Skip if either is helheim (achromatic — hue is meaningless)
        if (r1.name === 'helheim' || r2.name === 'helheim') return;
        const h1 = toHue(r1.palette.bg);
        const h2 = toHue(r2.palette.bg);
        const dist = hueDistance(h1, h2);
        // Warm realms (nidavellir/muspelheim) share a hue neighborhood —
        // they're distinct by saturation and lightness instead
        const threshold = warmPairs.has(pairKey) ? 5 : 15;
        assert.ok(
          dist >= threshold,
          `${r1.name} (${Math.round(h1)}°) vs ${r2.name} (${Math.round(h2)}°): bg hues too close (${dist.toFixed(1)}°)`,
        );
      });
    }
  }
});

// }}}

// vim: fdm=marker fmr={{{,}}}:
