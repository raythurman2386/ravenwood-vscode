/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Palette } from '../../interface';
import type { SelectionColors, WorkbenchVariantColors } from '../common';

export function listColors(
  palette: Palette,
  _variantColors: WorkbenchVariantColors,
  _selection: SelectionColors,
): Record<string, string> {
  // {{{
  return {
    'list.activeSelectionForeground': `${palette.fg}`,
    'list.activeSelectionBackground': `${palette.bg4}80`,
    'list.activeSelectionIconForeground': `${palette.fg}`,
    'list.inactiveSelectionForeground': `${palette.grey2}`,
    'list.inactiveSelectionBackground': `${palette.bg4}80`,
    'list.inactiveSelectionIconForeground': `${palette.grey2}`,
    'list.dropBackground': `${palette.bg2}80`,
    'list.dropBetweenBackground': `${palette.bg5}`,
    'list.focusForeground': `${palette.fg}`,
    'list.focusBackground': `${palette.bg4}80`,
    'list.focusHighlightForeground': `${palette.green}`,
    'list.focusOutline': `${palette.bg}00`,
    'list.focusAndSelectionOutline': `${palette.bg}00`,
    'list.inactiveFocusBackground': `${palette.bg4}60`,
    'list.inactiveFocusOutline': `${palette.bg}00`,
    'list.highlightForeground': `${palette.green}`,
    'list.hoverForeground': `${palette.fg}`,
    'list.hoverBackground': `${palette.bg}00`,
    'list.invalidItemForeground': `${palette.dimRed}`,
    'list.errorForeground': `${palette.red}`,
    'list.warningForeground': `${palette.yellow}`,
    'list.deemphasizedForeground': `${palette.grey0}`,
    'listFilterWidget.background': `${palette.bg3}`,
    'listFilterWidget.outline': `${palette.bg5}`,
    'listFilterWidget.noMatchesOutline': `${palette.red}`,
    'listFilterWidget.shadow': `${palette.shadow}`,
    'list.filterMatchBackground': `${palette.dimAqua}40`,
    'list.filterMatchBorder': `${palette.aqua}`,
    'tree.indentGuidesStroke': `${palette.grey0}`,
    'tree.inactiveIndentGuidesStroke': `${palette.grey0}60`,
    'tree.tableColumnsBorder': `${palette.bg4}`,
    'tree.tableOddRowsBackground': `${palette.bg1}`,
  };
} // }}}
// vim: fdm=marker fmr={{{,}}}:
