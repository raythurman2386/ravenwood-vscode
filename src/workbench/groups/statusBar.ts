/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Palette } from '../../interface';

export function statusBarColors(palette: Palette): Record<string, string> {
  return {
    'statusBar.background': `${palette.bg1}`,
    'statusBar.foreground': `${palette.grey2}`,
    'statusBar.border': `${palette.bg1}`,
    'statusBar.debuggingForeground': `${palette.orange}`,
    'statusBar.debuggingBackground': `${palette.bg1}`,
    'statusBar.debuggingBorder': `${palette.bg1}`,
    'statusBar.noFolderBackground': `${palette.bg1}`,
    'statusBar.noFolderForeground': `${palette.grey2}`,
    'statusBar.noFolderBorder': `${palette.bg1}`,
    'statusBarItem.hoverBackground': `${palette.bg4}a0`,
    'statusBarItem.activeBackground': `${palette.bg4}70`,
    'statusBarItem.prominentForeground': `${palette.fg}`,
    'statusBarItem.prominentBackground': `${palette.bg1}`,
    'statusBarItem.prominentHoverBackground': `${palette.bg4}a0`,
    'statusBarItem.remoteBackground': `${palette.bg1}`,
    'statusBarItem.remoteForeground': `${palette.grey2}`,
    'statusBarItem.errorBackground': `${palette.bg1}`,
    'statusBarItem.errorForeground': `${palette.red}`,
    'statusBarItem.warningBackground': `${palette.bg1}`,
    'statusBarItem.warningForeground': `${palette.yellow}`,
    'statusBarItem.offlineBackground': `${palette.bg1}`,
    'statusBarItem.offlineForeground': `${palette.grey2}`,
    'statusBarItem.offlineHoverBackground': `${palette.bg4}a0`,
    'statusBarItem.offlineHoverForeground': `${palette.fg}`,
    'statusBar.focusBorder': `${palette.badge}`,
    'statusBarItem.focusBorder': `${palette.badge}`,
    'statusBarItem.hoverForeground': `${palette.fg}`,
    'statusBarItem.compactHoverBackground': `${palette.bg4}a0`,
    'statusBarItem.remoteHoverBackground': `${palette.bg4}a0`,
    'statusBarItem.remoteHoverForeground': `${palette.fg}`,
    'statusBarItem.errorHoverBackground': `${palette.bg4}a0`,
    'statusBarItem.errorHoverForeground': `${palette.red}`,
    'statusBarItem.warningHoverBackground': `${palette.bg4}a0`,
    'statusBarItem.warningHoverForeground': `${palette.yellow}`,
    'statusBarItem.prominentHoverForeground': `${palette.fg}`,
  };
}
