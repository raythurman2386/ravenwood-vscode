/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Configuration, Palette } from '../interface';
import { applyHighContrastFlag, getBaseWorkbenchTokens } from './base';

/** Flat workbench style — slightly shifted list/sidebar/tab backgrounds, no visible tab border, modified-state borders on tabs. */
export function flatWorkbench(
  palette: Palette,
  configuration: Configuration,
  variant: string,
): Record<string, string> {
  const tokens = getBaseWorkbenchTokens(palette, configuration, variant);
  return applyHighContrastFlag(palette, configuration, {
    ...tokens,
    'list.activeSelectionBackground': `${palette.bg3}80`,
    'list.inactiveSelectionBackground': `${palette.bg3}80`,
    'list.focusBackground': `${palette.bg3}80`,
    'list.inactiveFocusBackground': `${palette.bg3}80`,
    'sideBar.background': `${palette.bg1}`,
    'sideBarSectionHeader.background': `${palette.bg}`,
    'sideBarSectionHeader.border': `${palette.bg}`,
    'editorGroupHeader.tabsBackground': `${palette.bg1}`,
    'editorGroupHeader.noTabsBackground': `${palette.bg1}`,
    'tab.border': `${palette.bg1}`,
    'tab.activeBorder': `${palette.bg}`,
    'tab.inactiveBackground': `${palette.bg1}`,
    'tab.hoverBorder': `${palette.bg}`,
    'tab.unfocusedActiveBorder': `${palette.bg}`,
    'tab.unfocusedInactiveModifiedBorder': `${palette.bg}`,
    'tab.unfocusedActiveModifiedBorder': `${palette.bg}`,
    'tab.inactiveModifiedBorder': `${palette.bg}`,
    'tab.activeModifiedBorder': `${palette.bg}`,
    'tab.unfocusedHoverBackground': `${palette.bg}`,
    'tab.activeBorderTop': `${palette.badge}d0`,
    'tab.unfocusedActiveBorderTop': `${palette.grey1}`,
    'tab.lastPinnedBorder': `${palette.bg0}`,
  });
}

// vim: fdm=marker fmr={{{,}}}:
