/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Palette } from '../../interface';
import type { WorkbenchVariantColors } from '../common';

export function tabColors(
  palette: Palette,
  variantColors: WorkbenchVariantColors,
): Record<string, string> {
  return {
    'editorGroup.border': `${palette.bg0}`,
    'editorGroupHeader.tabsBackground': `${palette.bg}`,
    'editorGroupHeader.noTabsBackground': `${palette.bg}`,
    'editorGroup.dropBackground': `${palette.bg5}60`,
    'editorGroup.focusedEmptyBorder': `${palette.badge}`,
    'editorGroup.dropIntoPromptForeground': `${palette.grey1}`,
    'editorGroup.dropIntoPromptBackground': `${palette.bg3}80`,
    'editorGroup.dropIntoPromptBorder': `${palette.bg5}`,
    'tab.border': `${palette.bg}`,
    'tab.activeBorder': `${palette.badge}d0`,
    'tab.activeBorderTop': `${palette.badge}d0`,
    'tab.unfocusedActiveBorderTop': `${palette.grey1}`,
    'tab.selectedBorderTop': `${palette.badge}d0`,
    'tab.selectedBackground': `${palette.bg}`,
    'tab.selectedForeground': `${palette.fg}`,
    'tab.dragAndDropBorder': `${palette.bg5}`,
    'tab.inactiveBackground': `${palette.bg}`,
    'tab.unfocusedActiveBackground': `${palette.bg}`,
    'tab.unfocusedInactiveBackground': `${palette.bg}`,
    'tab.hoverBackground': `${palette.bg}`,
    'tab.hoverForeground': `${palette.fg}`,
    'tab.hoverBorder': `${palette.bg5}`,
    'tab.unfocusedHoverBorder': `${palette.bg5}`,
    'tab.unfocusedHoverBackground': `${palette.bg}`,
    'tab.activeBackground': `${palette.bg}`,
    'modernEditorTab.selectedActionBackground': `${palette.bg}`,
    'tab.activeForeground': `${palette.fg}`,
    'tab.inactiveForeground': `${palette.grey0}`,
    'tab.unfocusedActiveForeground': `${palette.grey2}`,
    'tab.unfocusedActiveBorder': `${palette.grey1}`,
    'tab.unfocusedInactiveForeground': `${palette.grey0}`,
    'tab.unfocusedHoverForeground': `${palette.fg}`,
    'tab.activeModifiedBorder': `${palette.dimYellow}`,
    'tab.inactiveModifiedBorder': `${palette.dimYellow}80`,
    'tab.unfocusedActiveModifiedBorder': `${palette.dimYellow}80`,
    'tab.unfocusedInactiveModifiedBorder': `${palette.dimYellow}60`,
    'tab.lastPinnedBorder': `${palette.badge}d0`,
    // Modern UI (workbench.experimental.modernUI) connected tabs. These IDs are
    // only read by Modern UI editor tabs; the classic tab bar keeps tab.*.
    'editorGroupHeader.connectedTabsBackground': `${variantColors.connectedTabsBg}`,
    'modernEditorTab.activeBackground': `${variantColors.mainBg}`,
    'modernEditorTab.activeForeground': `${palette.fg}`,
    'modernEditorTab.activeActionBackground': `${variantColors.mainBg}`,
    'modernEditorTab.activeHoverBackground': `${variantColors.mainBg}`,
    'modernEditorTab.activeHoverActionBackground': `${variantColors.mainBg}`,
    'modernEditorTab.inactiveBackground': `${variantColors.connectedTabsBg}`,
    'modernEditorTab.hoverBackground': `${palette.bg2}`,
    'modernEditorTab.hoverActionBackground': `${palette.bg2}`,
    'modernEditorTab.hoverForeground': `${palette.fg}`,
    'sideBySideEditor.horizontalBorder': `${palette.bg0}`,
    'sideBySideEditor.verticalBorder': `${palette.bg0}`,
  };
}
