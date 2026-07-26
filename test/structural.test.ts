/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// Structural tests — verify the theme output shape is valid VS Code theme JSON.
// {{{

import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { describe, test } from 'node:test';
import { buildTheme, isHex } from './helpers';

describe('Theme structure', () => {
  test('dark theme has correct top-level keys', () => {
    const { dark } = buildTheme();
    assert.equal(dark.name, 'Ravenwood Dark');
    assert.equal(dark.type, 'dark');
    assert.equal(dark.semanticHighlighting, true);
    assert.ok(typeof dark.semanticTokenColors === 'object');
    assert.ok(typeof dark.colors === 'object');
    assert.ok(Array.isArray(dark.tokenColors));
  });

  test('light theme has correct top-level keys', () => {
    const { light } = buildTheme();
    assert.equal(light.name, 'Ravenwood Light');
    assert.equal(light.type, 'light');
    assert.equal(light.semanticHighlighting, true);
    assert.ok(typeof light.semanticTokenColors === 'object');
    assert.ok(typeof light.colors === 'object');
    assert.ok(Array.isArray(light.tokenColors));
  });
});

describe('Color values are valid hex', () => {
  test('all workbench colors are valid hex', () => {
    const { dark, light } = buildTheme();
    for (const [key, value] of Object.entries(dark.colors)) {
      assert.ok(isHex(value), `dark.colors.${key} is not valid hex: ${value}`);
    }
    for (const [key, value] of Object.entries(light.colors)) {
      assert.ok(isHex(value), `light.colors.${key} is not valid hex: ${value}`);
    }
  });

  test('all semantic token colors are valid hex', () => {
    const { dark, light } = buildTheme();
    for (const [key, value] of Object.entries(dark.semanticTokenColors)) {
      assert.ok(
        isHex(value),
        `dark.semanticTokenColors.${key} is not valid hex: ${value}`,
      );
    }
    for (const [key, value] of Object.entries(light.semanticTokenColors)) {
      assert.ok(
        isHex(value),
        `light.semanticTokenColors.${key} is not valid hex: ${value}`,
      );
    }
  });

  test('all tokenColors foregrounds are valid hex', () => {
    const { dark, light } = buildTheme();
    for (const rule of dark.tokenColors) {
      if (rule.settings.foreground) {
        assert.ok(
          isHex(rule.settings.foreground),
          `dark tokenColor "${rule.name}" foreground is not valid hex: ${rule.settings.foreground}`,
        );
      }
    }
    for (const rule of light.tokenColors) {
      if (rule.settings.foreground) {
        assert.ok(
          isHex(rule.settings.foreground),
          `light tokenColor "${rule.name}" foreground is not valid hex: ${rule.settings.foreground}`,
        );
      }
    }
  });

  test('no stray characters in color values', () => {
    const { dark, light } = buildTheme();
    for (const [key, value] of Object.entries(dark.colors)) {
      assert.ok(
        !value.includes('}'),
        `dark.colors.${key} contains stray "}" — likely a template literal bug: ${value}`,
      );
    }
    for (const [key, value] of Object.entries(light.colors)) {
      assert.ok(
        !value.includes('}'),
        `light.colors.${key} contains stray "}" — likely a template literal bug: ${value}`,
      );
    }
  });
});

describe('TokenColor rules are well-formed', () => {
  test('every tokenColor has a name, scope, and settings', () => {
    const { dark, light } = buildTheme();
    for (const rule of [...dark.tokenColors, ...light.tokenColors]) {
      assert.ok(rule.name, `tokenColor missing name: ${JSON.stringify(rule)}`);
      assert.ok(rule.scope, `tokenColor "${rule.name}" missing scope`);
      assert.ok(rule.settings, `tokenColor "${rule.name}" missing settings`);
    }
  });

  test('tokenColors are non-empty', () => {
    const { dark, light } = buildTheme();
    assert.ok(
      dark.tokenColors.length > 100,
      `dark tokenColors too few: ${dark.tokenColors.length}`,
    );
    assert.ok(
      light.tokenColors.length > 100,
      `light tokenColors too few: ${light.tokenColors.length}`,
    );
  });
});

describe('Workbench color key coverage', () => {
  test('dark and light have the same number of workbench color keys', () => {
    const { dark, light } = buildTheme();
    assert.equal(
      Object.keys(dark.colors).length,
      Object.keys(light.colors).length,
      'dark and light must have the same number of workbench color keys',
    );
  });

  test('dark and light have identical workbench color key sets', () => {
    const { dark, light } = buildTheme();
    const darkKeys = Object.keys(dark.colors).sort();
    const lightKeys = Object.keys(light.colors).sort();
    assert.deepEqual(darkKeys, lightKeys, 'dark and light key sets must match');
  });

  test('workbench color key count is at least 900', () => {
    const { dark } = buildTheme();
    const count = Object.keys(dark.colors).length;
    assert.ok(
      count >= 900,
      `expected at least 900 workbench color keys, got ${count}`,
    );
  });

  test('all chat/agent/AI namespaces are present', () => {
    const { dark } = buildTheme();
    const keys = Object.keys(dark.colors);
    const requiredPrefixes = [
      'chat.requestBackground',
      'chat.requestBorder',
      'chat.slashCommandBackground',
      'chat.avatarBackground',
      'chat.editedFileForeground',
      'chat.checkpointSeparator',
      'chat.thinkingShimmer',
      'chatParticipant.',
      'chatStatus.',
      'chatSession.',
      'chatEdit.',
      'agent.',
      'agentDashboard.',
      'simpleChat.',
      'terminalChat.',
      'editorChat.',
    ];
    for (const prefix of requiredPrefixes) {
      const found = keys.some((k) => k.startsWith(prefix));
      assert.ok(found, `missing key with prefix "${prefix}" in dark theme`);
    }
  });

  test('all critical editor/terminal/minimap keys are present', () => {
    const { dark } = buildTheme();
    const keys = Object.keys(dark.colors);
    const requiredKeys = [
      'editorStickyScroll.background',
      'editorStickyScroll.border',
      'terminal.background',
      'terminal.selectionBackground',
      'minimap.background',
      'breadcrumb.background',
      'activityBarTop.background',
      'inlineEdit.gutterIndicator.primaryBackground',
      'testing.coveredBackground',
      'testing.uncoveredBackground',
      'diffEditor.move.border',
      'multiDiffEditor.background',
      'commentsView.resolvedIcon',
      'merge.commonContentBackground',
      'gitDecoration.renamedResourceForeground',
      'statusBarItem.offlineBackground',
      'walkthrough.stepTitle.foreground',
      'welcomePage.background',
      'menu.separatorBackground',
      'dropdown.listBackground',
      'panelSection.border',
      'sideBar.border',
      'editor.placeholder.foreground',
      'button.border',
      'inputOption.activeBackground',
      'list.filterMatchBackground',
      'debugView.exceptionLabelBackground',
      'settings.sashBorder',
      'extensionButton.background',
      'notificationCenter.border',
      'editorWidget.resizeBorder',
      'notebook.cellInsertionIndicator',
      'terminalCommandGuide.foreground',
      'terminalStickyScroll.background',
    ];
    for (const key of requiredKeys) {
      assert.ok(
        keys.includes(key),
        `missing required key "${key}" in dark theme`,
      );
    }
  });
});

// --- Realm theme JSON structural validation {{{

const themesDir = path.resolve(__dirname, '..', 'themes');

const realmThemes = [
  { name: 'asgard', label: 'Ravenwood Asgard', type: 'dark' },
  { name: 'vanaheim', label: 'Ravenwood Vanaheim', type: 'dark' },
  { name: 'alfheim', label: 'Ravenwood Alfheim', type: 'light' },
  { name: 'svartalfheim', label: 'Ravenwood Svartalfheim', type: 'dark' },
  { name: 'nidavellir', label: 'Ravenwood Nidavellir', type: 'dark' },
  { name: 'jotunheim', label: 'Ravenwood Jotunheim', type: 'dark' },
  { name: 'muspelheim', label: 'Ravenwood Muspelheim', type: 'dark' },
  { name: 'helheim', label: 'Ravenwood Helheim', type: 'dark' },
];

describe('Realm theme JSON structure', () => {
  for (const realm of realmThemes) {
    const filePath = path.join(themesDir, `ravenwood-${realm.name}.json`);

    test(`${realm.name}: theme JSON file exists`, () => {
      assert.ok(
        fs.existsSync(filePath),
        `missing theme file: themes/ravenwood-${realm.name}.json — run npm run compile`,
      );
    });

    if (!fs.existsSync(filePath)) continue;

    const theme = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    test(`${realm.name}: has correct name`, () => {
      assert.equal(theme.name, realm.label);
    });

    test(`${realm.name}: has correct type`, () => {
      assert.equal(theme.type, realm.type);
    });

    test(`${realm.name}: semanticHighlighting is true`, () => {
      assert.equal(theme.semanticHighlighting, true);
    });

    test(`${realm.name}: colors object has ≥900 keys`, () => {
      assert.ok(
        Object.keys(theme.colors).length >= 900,
        `${realm.name}: only ${Object.keys(theme.colors).length} workbench color keys`,
      );
    });

    test(`${realm.name}: tokenColors array has ≥100 rules`, () => {
      assert.ok(
        Array.isArray(theme.tokenColors) && theme.tokenColors.length >= 100,
        `${realm.name}: only ${theme.tokenColors?.length} tokenColor rules`,
      );
    });

    test(`${realm.name}: all workbench colors are valid hex`, () => {
      for (const [key, value] of Object.entries(theme.colors)) {
        assert.ok(
          isHex(value as string),
          `${realm.name}: colors.${key} is not valid hex: ${value}`,
        );
      }
    });

    test(`${realm.name}: all semantic token colors are valid hex`, () => {
      for (const [key, value] of Object.entries(theme.semanticTokenColors)) {
        assert.ok(
          isHex(value as string),
          `${realm.name}: semanticTokenColors.${key} is not valid hex: ${value}`,
        );
      }
    });

    test(`${realm.name}: all tokenColor foregrounds are valid hex`, () => {
      for (const rule of theme.tokenColors) {
        if (rule.settings.foreground) {
          assert.ok(
            isHex(rule.settings.foreground),
            `${realm.name}: tokenColor "${rule.name}" foreground is not valid hex: ${rule.settings.foreground}`,
          );
        }
      }
    });

    test(`${realm.name}: no stray "}" in color values`, () => {
      for (const [key, value] of Object.entries(theme.colors)) {
        assert.ok(
          !(value as string).includes('}'),
          `${realm.name}: colors.${key} contains stray "}" — template literal bug: ${value}`,
        );
      }
    });
  }
});

// --- Package.json contributes.themes vs themes/ consistency {{{

describe('Package.json theme contributions consistency', () => {
  const pkgPath = path.resolve(__dirname, '..', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const contributedThemes: Array<{ label: string; path: string }> =
    pkg.contributes?.themes ?? [];

  test('every contributed theme path has a corresponding file in themes/', () => {
    for (const t of contributedThemes) {
      const fileName = path.basename(t.path);
      const fullPath = path.join(themesDir, fileName);
      assert.ok(
        fs.existsSync(fullPath),
        `package.json contributes "${t.label}" → ${t.path}, but file themes/${fileName} does not exist`,
      );
    }
  });

  test('every theme file in themes/ is contributed in package.json', () => {
    const contributedFiles = new Set(
      contributedThemes.map((t) => path.basename(t.path)),
    );
    const filesOnDisk = fs
      .readdirSync(themesDir)
      .filter((f) => f.endsWith('.json'));
    for (const file of filesOnDisk) {
      assert.ok(
        contributedFiles.has(file),
        `themes/${file} exists but is not listed in package.json contributes.themes`,
      );
    }
  });

  test('all contributed themes have unique labels', () => {
    const labels = contributedThemes.map((t) => t.label);
    const dupes = labels.filter((l, i) => labels.indexOf(l) !== i);
    assert.equal(
      dupes.length,
      0,
      `duplicate theme labels: ${dupes.join(', ')}`,
    );
  });

  test('all contributed themes have valid uiTheme values', () => {
    for (const t of contributedThemes) {
      assert.ok(
        t.uiTheme === 'vs-dark' || t.uiTheme === 'vs',
        `theme "${t.label}" has invalid uiTheme: ${t.uiTheme}`,
      );
    }
  });
});

// }}}

// vim: fdm=marker fmr={{{,}}}:
