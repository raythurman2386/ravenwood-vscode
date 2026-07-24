/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// Structural tests — verify the theme output shape is valid VS Code theme JSON.
// {{{

import assert from 'node:assert/strict';
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

  test('workbench color key count is at least 600', () => {
    const { dark } = buildTheme();
    const count = Object.keys(dark.colors).length;
    assert.ok(
      count >= 600,
      `expected at least 600 workbench color keys, got ${count}`,
    );
  });

  test('all chat/agent/AI namespaces are present', () => {
    const { dark } = buildTheme();
    const keys = Object.keys(dark.colors);
    const requiredPrefixes = [
      'chat.border',
      'chat.messageBackground',
      'chat.messageForeground',
      'chat.inputBackground',
      'chat.inputForeground',
      'chat.inputBorder',
      'chat.inputFocusBorder',
      'chat.codeBlockBackground',
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
      'inlineEdit.background',
      'testing.coveredBackground',
      'testing.uncoveredBackground',
      'diffEditor.move.border',
      'multiDiffEditor.background',
      'commentsView.commentBackground',
      'merge.commonContentBackground',
      'gitDecoration.renamedResourceForeground',
      'statusBarItem.offlineBackground',
      'walkthrough.stepTitle.foreground',
      'welcomePage.background',
      'menu.separatorBackground',
      'dropdown.listBackground',
      'panelSection.border',
      'sideBar.border',
      'editorPlaceholder.foreground',
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

// }}}
// vim: fdm=marker fmr={{{,}}}:
