/*---------------------------------------------------------------
 *  Analyze all Ravenwood palette variants for WCAG contrast,
 *  gradient smoothness, hue consistency, and aesthetic quality.
 *  Run: node scripts/analyze-contrast.mjs
 *--------------------------------------------------------------*/

// ---- Helpers ----

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function relativeLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1, hex2) {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  const l1 = relativeLuminance(c1.r, c1.g, c1.b);
  const l2 = relativeLuminance(c2.r, c2.g, c2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function wcagRating(ratio) {
  if (ratio >= 7) return 'AAA ✓';
  if (ratio >= 4.5) return 'AA ✓';
  if (ratio >= 3) return 'AA-large ✓';
  return 'FAIL ✗';
}

function deltaE(hex1, hex2) {
  // Simple perceptual distance (not full CIEDE2000, but good enough for gradient checking)
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  return Math.sqrt(
    (c1.r - c2.r) ** 2 + (c1.g - c2.g) ** 2 + (c1.b - c2.b) ** 2,
  );
}

function hueAngle(hex) {
  const c = hexToRgb(hex);
  const r = c.r / 255,
    g = c.g / 255,
    b = c.b / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  if (max === min) return -1; // grey
  let hue;
  const d = max - min;
  if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) hue = ((b - r) / d + 2) * 60;
  else hue = ((r - g) / d + 4) * 60;
  return hue;
}

function saturation(hex) {
  const c = hexToRgb(hex);
  const r = c.r / 255,
    g = c.g / 255,
    b = c.b / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return 0;
  const d = max - min;
  return l > 0.5 ? d / (2 - max - min) : d / (max + min);
}

function lightness(hex) {
  const c = hexToRgb(hex);
  const r = c.r / 255,
    g = c.g / 255,
    b = c.b / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  return (max + min) / 2;
}

// ---- Palette definitions (hardcoded from source) ----

const palettes = {
  // Dark variants
  'dark-soft': {
    ...{
      bg0: '#1e2520',
      bg1: '#242b26',
      bg: '#2a312c',
      bg2: '#323a34',
      bg3: '#3c4440',
      bg4: '#464e4a',
      bg5: '#4e5954',
      grey0: '#7f897d',
      grey1: '#859289',
      grey2: '#9aa79d',
      shadow: '#00000070',
    },
    ...{
      fg: '#e8d5b7',
      red: '#e67e80',
      orange: '#e69875',
      yellow: '#fbbf24',
      green: '#4ade80',
      aqua: '#34d399',
      blue: '#22d3ee',
      purple: '#f472b6',
      dimRed: '#da6362',
      dimOrange: '#d77f48',
      dimYellow: '#bf983d',
      dimGreen: '#5e8d5e',
      dimAqua: '#447d6b',
      dimBlue: '#5a93a2',
      dimPurple: '#b87b9d',
      badge: '#4ade80',
    },
  },
  'dark-medium': {
    ...{
      bg0: '#141814',
      bg1: '#1f241f',
      bg: '#222822',
      bg2: '#2d3830',
      bg3: '#3d4a40',
      bg4: '#4a5a4d',
      bg5: '#5a6a5d',
      grey0: '#7f897d',
      grey1: '#859289',
      grey2: '#9aa79d',
      shadow: '#00000070',
    },
    ...{
      fg: '#e8d5b7',
      red: '#e67e80',
      orange: '#e69875',
      yellow: '#fbbf24',
      green: '#4ade80',
      aqua: '#34d399',
      blue: '#22d3ee',
      purple: '#f472b6',
      dimRed: '#da6362',
      dimOrange: '#d77f48',
      dimYellow: '#bf983d',
      dimGreen: '#5e8d5e',
      dimAqua: '#447d6b',
      dimBlue: '#5a93a2',
      dimPurple: '#b87b9d',
      badge: '#4ade80',
    },
  },
  'dark-hard': {
    ...{
      bg0: '#0f1210',
      bg1: '#141814',
      bg: '#1a1f1c',
      bg2: '#222822',
      bg3: '#2d3830',
      bg4: '#374139',
      bg5: '#414b42',
      grey0: '#7f897d',
      grey1: '#859289',
      grey2: '#9aa79d',
      shadow: '#00000070',
    },
    ...{
      fg: '#e8d5b7',
      red: '#e67e80',
      orange: '#e69875',
      yellow: '#fbbf24',
      green: '#4ade80',
      aqua: '#34d399',
      blue: '#22d3ee',
      purple: '#f472b6',
      dimRed: '#da6362',
      dimOrange: '#d77f48',
      dimYellow: '#bf983d',
      dimGreen: '#5e8d5e',
      dimAqua: '#447d6b',
      dimBlue: '#5a93a2',
      dimPurple: '#b87b9d',
      badge: '#4ade80',
    },
  },
  // Light variants
  'light-soft': {
    ...{
      bg0: '#e5dfc5',
      bg1: '#eae4ca',
      bg: '#f3ead3',
      bg2: '#eae4ca',
      bg3: '#e5dfc5',
      bg4: '#ddd8be',
      bg5: '#d8d3ba',
      grey0: '#7a8478',
      grey1: '#6b7566',
      grey2: '#5c6658',
      shadow: '#3c474d20',
    },
    ...{
      fg: '#3d4c53',
      red: '#c03c39',
      orange: '#c55e15',
      yellow: '#b08500',
      green: '#5c7a0c',
      aqua: '#1e7d5a',
      blue: '#1a6d9e',
      purple: '#b84d94',
      dimRed: '#9e2b29',
      dimOrange: '#9e5410',
      dimYellow: '#8f6b00',
      dimGreen: '#4a6210',
      dimAqua: '#1a6347',
      dimBlue: '#145a7a',
      dimPurple: '#8f3d74',
      badge: '#6b8a2e',
    },
  },
  'light-medium': {
    ...{
      bg0: '#efebd4',
      bg1: '#f8f4e8',
      bg: '#fdf6e3',
      bg2: '#f4f0d9',
      bg3: '#efebd4',
      bg4: '#e6e2cc',
      bg5: '#e0dcc7',
      grey0: '#7a8478',
      grey1: '#6b7566',
      grey2: '#5c6658',
      shadow: '#3c474d20',
    },
    ...{
      fg: '#3d4c53',
      red: '#c03c39',
      orange: '#c55e15',
      yellow: '#b08500',
      green: '#5c7a0c',
      aqua: '#1e7d5a',
      blue: '#1a6d9e',
      purple: '#b84d94',
      dimRed: '#9e2b29',
      dimOrange: '#9e5410',
      dimYellow: '#8f6b00',
      dimGreen: '#4a6210',
      dimAqua: '#1a6347',
      dimBlue: '#145a7a',
      dimPurple: '#8f3d74',
      badge: '#6b8a2e',
    },
  },
  'light-hard': {
    ...{
      bg0: '#f2efdf',
      bg1: '#f8f5e4',
      bg: '#fffbef',
      bg2: '#f8f5e4',
      bg3: '#f2efdf',
      bg4: '#edeada',
      bg5: '#e8e5d5',
      grey0: '#7a8478',
      grey1: '#6b7566',
      grey2: '#5c6658',
      shadow: '#3c474d20',
    },
    ...{
      fg: '#3d4c53',
      red: '#c03c39',
      orange: '#c55e15',
      yellow: '#b08500',
      green: '#5c7a0c',
      aqua: '#1e7d5a',
      blue: '#1a6d9e',
      purple: '#b84d94',
      dimRed: '#9e2b29',
      dimOrange: '#9e5410',
      dimYellow: '#8f6b00',
      dimGreen: '#4a6210',
      dimAqua: '#1a6347',
      dimBlue: '#145a7a',
      dimPurple: '#8f3d74',
      badge: '#6b8a2e',
    },
  },
};

// ---- Analysis ----

const results = [];

for (const [name, p] of Object.entries(palettes)) {
  const isDark = name.startsWith('dark');
  const realm = {
    name,
    isDark,
    palette: p,
    issues: [],
    warnings: [],
    passes: [],
  };

  // 1. Primary text contrast (fg on bg)
  const fgOnBg = contrastRatio(p.fg, p.bg);
  realm.fgOnBg = fgOnBg;
  realm.fgOnBgRating = wcagRating(fgOnBg);
  if (fgOnBg < 4.5)
    realm.issues.push(
      `fg on bg contrast is ${fgOnBg.toFixed(2)} — below AA (4.5)`,
    );
  else if (fgOnBg < 7)
    realm.warnings.push(
      `fg on bg contrast is ${fgOnBg.toFixed(2)} — AA but below AAA (7)`,
    );
  else realm.passes.push(`fg on bg: ${fgOnBg.toFixed(2)} (AAA)`);

  // 2. Grey text contrast (grey0, grey1, grey2 on bg)
  for (const g of ['grey0', 'grey1', 'grey2']) {
    const r = contrastRatio(p[g], p.bg);
    const label = `${g} on bg`;
    if (r < 3)
      realm.issues.push(
        `${label} contrast is ${r.toFixed(2)} — below AA-large (3)`,
      );
    else if (r < 4.5)
      realm.warnings.push(
        `${label} contrast is ${r.toFixed(2)} — AA-large but below AA (4.5)`,
      );
    else realm.passes.push(`${label}: ${r.toFixed(2)} (AA+)`);
  }

  // 3. Accent colors on bg (do they pop?)
  for (const accent of [
    'red',
    'orange',
    'yellow',
    'green',
    'aqua',
    'blue',
    'purple',
  ]) {
    const r = contrastRatio(p[accent], p.bg);
    if (r < 3)
      realm.warnings.push(
        `${accent} on bg contrast is ${r.toFixed(2)} — may not pop enough`,
      );
    else realm.passes.push(`${accent} on bg: ${r.toFixed(2)}`);
  }

  // 4. Badge on bg (button contrast)
  const badgeOnBg = contrastRatio(p.badge, p.bg);
  realm.badgeOnBg = badgeOnBg;
  if (badgeOnBg < 3)
    realm.issues.push(
      `badge on bg contrast is ${badgeOnBg.toFixed(2)} — below AA-large (3)`,
    );
  else if (badgeOnBg < 4.5)
    realm.warnings.push(
      `badge on bg contrast is ${badgeOnBg.toFixed(2)} — AA-large but below AA (4.5)`,
    );
  else realm.passes.push(`badge on bg: ${badgeOnBg.toFixed(2)} (AA+)`);

  // 5. Badge foreground on badge background (button text)
  const badgeFgOnBadge = contrastRatio(p.bg, p.badge);
  if (badgeFgOnBadge < 3)
    realm.issues.push(
      `badge fg (bg) on badge bg contrast is ${badgeFgOnBadge.toFixed(2)} — below AA-large`,
    );
  else realm.passes.push(`badge fg on badge bg: ${badgeFgOnBadge.toFixed(2)}`);

  // 6. Dim variants vs parent (should be darker/desaturated)
  const accentPairs = [
    ['red', 'dimRed'],
    ['orange', 'dimOrange'],
    ['yellow', 'dimYellow'],
    ['green', 'dimGreen'],
    ['aqua', 'dimAqua'],
    ['blue', 'dimBlue'],
    ['purple', 'dimPurple'],
  ];
  for (const [parent, dim] of accentPairs) {
    const parentL = lightness(p[parent]);
    const dimL = lightness(p[dim]);
    const parentSat = saturation(p[parent]);
    const dimSat = saturation(p[dim]);
    if (dimL >= parentL)
      realm.warnings.push(
        `${dim} (${(dimL * 100).toFixed(0)}%) is not darker than ${parent} (${(parentL * 100).toFixed(0)}%)`,
      );
    if (dimSat >= parentSat)
      realm.warnings.push(
        `${dim} (sat ${(dimSat * 100).toFixed(0)}%) is not desaturated vs ${parent} (${(parentSat * 100).toFixed(0)}%)`,
      );
  }

  // 7. bg0→bg5 gradient smoothness
  const bgKeys = ['bg0', 'bg1', 'bg', 'bg2', 'bg3', 'bg4', 'bg5'];
  for (let i = 0; i < bgKeys.length - 1; i++) {
    const a = p[bgKeys[i]];
    const b = p[bgKeys[i + 1]];
    const d = deltaE(a, b);
    const lA = lightness(a);
    const lB = lightness(b);
    if (d < 5)
      realm.warnings.push(
        `${bgKeys[i]}→${bgKeys[i + 1]} deltaE=${d.toFixed(1)} — very close, may not be distinguishable`,
      );
    if (d > 40)
      realm.warnings.push(
        `${bgKeys[i]}→${bgKeys[i + 1]} deltaE=${d.toFixed(1)} — large jump, may not be smooth`,
      );
    if (lB <= lA)
      realm.warnings.push(
        `${bgKeys[i]}→${bgKeys[i + 1]} lightness not increasing (${(lA * 100).toFixed(0)}% → ${(lB * 100).toFixed(0)}%)`,
      );
  }

  // 8. Hue consistency check — all bg tones should share a similar hue
  const bgHues = bgKeys.map((k) => hueAngle(p[k])).filter((h) => h >= 0);
  if (bgHues.length > 1) {
    const avgHue = bgHues.reduce((a, b) => a + b, 0) / bgHues.length;
    const maxDeviation = Math.max(...bgHues.map((h) => Math.abs(h - avgHue)));
    if (maxDeviation > 30)
      realm.warnings.push(
        `Background hue deviation: ${maxDeviation.toFixed(0)}° (avg ${avgHue.toFixed(0)}°) — may not be cohesive`,
      );
    else
      realm.passes.push(
        `Background hue consistent: avg ${avgHue.toFixed(0)}°, max dev ${maxDeviation.toFixed(0)}°`,
      );
  }

  // 9. Check that fg is not pure white for dark themes, not pure black for light
  const fgRgb = hexToRgb(p.fg);
  if (isDark && fgRgb.r === 255 && fgRgb.g === 255 && fgRgb.b === 255) {
    realm.issues.push('fg is pure white — should be warm-tinted');
  }
  if (!isDark && fgRgb.r === 0 && fgRgb.g === 0 && fgRgb.b === 0) {
    realm.issues.push('fg is pure black — should be cool-tinted');
  }

  // 10. Check bg tint — should NOT be neutral grey
  const bgRgb = hexToRgb(p.bg);
  const bgMax = Math.max(bgRgb.r, bgRgb.g, bgRgb.b);
  const bgMin = Math.min(bgRgb.r, bgRgb.g, bgRgb.b);
  if (bgMax - bgMin < 3) {
    realm.issues.push(
      `bg is nearly neutral grey (r=${bgRgb.r} g=${bgRgb.g} b=${bgRgb.b}) — needs a tint`,
    );
  }

  results.push(realm);
}

// ---- Output ----

console.log('='.repeat(80));
console.log('  RAVENWOOD — PALETTE CONTRAST ANALYSIS REPORT');
console.log('='.repeat(80));
console.log();

let totalIssues = 0;
let totalWarnings = 0;

for (const realm of results) {
  const mode = realm.isDark ? 'DARK' : 'LIGHT';
  console.log(`── ${realm.name.toUpperCase()} (${mode}) ──`);
  console.log(
    `  fg on bg:     ${realm.fgOnBg.toFixed(2)}  ${realm.fgOnBgRating}`,
  );
  console.log(
    `  badge on bg:  ${realm.badgeOnBg.toFixed(2)}  ${wcagRating(realm.badgeOnBg)}`,
  );
  console.log();

  if (realm.issues.length) {
    console.log(`  ❌ ISSUES (${realm.issues.length}):`);
    for (const issue of realm.issues) console.log(`     ${issue}`);
    console.log();
    totalIssues += realm.issues.length;
  }
  if (realm.warnings.length) {
    console.log(`  ⚠  WARNINGS (${realm.warnings.length}):`);
    for (const warn of realm.warnings) console.log(`     ${warn}`);
    console.log();
    totalWarnings += realm.warnings.length;
  }
  if (realm.passes.length) {
    console.log(`  ✅ PASSES (${realm.passes.length})`);
    console.log();
  }
}

console.log('='.repeat(80));
console.log(
  `  SUMMARY: ${totalIssues} issues, ${totalWarnings} warnings across ${results.length} palette variants`,
);
console.log('='.repeat(80));
