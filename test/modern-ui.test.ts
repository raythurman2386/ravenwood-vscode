/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

// Modern UI (workbench.experimental.modernUI) token tests.

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { Palette } from '../src/interface';
import { getPalette } from '../src/palette';
import alfheim from '../src/palette/realms/alfheim';
import { getWorkbench } from '../src/workbench';
import { contrastRatio } from '../src/workbench/common';
import { flatWorkbench } from '../src/workbench/flat';
import { materialWorkbench } from '../src/workbench/material';
import { workbenchStyles } from './helpers';

const MODERN_KEYS = [
  'editorGroupHeader.connectedTabsBackground',
  'modernEditorTab.activeBackground',
  'modernEditorTab.activeForeground',
  'modernEditorTab.activeActionBackground',
  'modernEditorTab.activeHoverBackground',
  'modernEditorTab.activeHoverActionBackground',
  'modernEditorTab.inactiveBackground',
  'modernEditorTab.hoverBackground',
  'modernEditorTab.hoverActionBackground',
  'modernEditorTab.hoverForeground',
  'modernEditorTab.selectedActionBackground',
  'surface.border',
  'editor.border',
  'modernPanel.border',
  'modernSash.gripForeground',
  'modernActivityBar.border',
  'modernActivityBarItem.activeBackground',
  'modernActivityBarItem.activeForeground',
  'modernActivityBarItem.hoverBackground',
  'modernActivityBarItem.hoverForeground',
];

describe('Modern UI tokens', () => {
  for (const variant of ['dark', 'light'] as const) {
    for (const style of workbenchStyles) {
      const colors = getWorkbench(
        { darkWorkbench: style, lightWorkbench: style },
        variant,
      );
      test(`${variant}/${style}: all Modern keys exist`, () => {
        for (const key of MODERN_KEYS) assert.ok(colors[key], key);
      });
      test(`${variant}/${style}: connected strip equals inactive tab background`, () => {
        assert.equal(
          colors['editorGroupHeader.connectedTabsBackground'],
          colors['modernEditorTab.inactiveBackground'],
        );
      });
    }
    test(`${variant}/flat: modernPanel.border is bg3`, () => {
      const palette = getPalette({}, variant) as Palette;
      const colors = flatWorkbench(palette, {}, variant);
      assert.equal(colors['modernPanel.border'], palette.bg3);
    });
  }

  test('alfheim: inactive tab text on connected strip is at least 3:1', () => {
    const colors = materialWorkbench(alfheim as Palette, {}, 'light');
    const ratio = contrastRatio(
      colors['tab.inactiveForeground'],
      colors['modernEditorTab.inactiveBackground'],
    );
    assert.ok(ratio >= 3, `ratio ${ratio.toFixed(2)}`);
  });
});
