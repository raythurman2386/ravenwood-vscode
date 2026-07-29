/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Palette } from '../../interface';

export function activityBarColors(palette: Palette): Record<string, string> {
  return {
    'activityBar.border': `${palette.bg}`,
    'activityBar.background': `${palette.bg}`,
    'activityBar.foreground': `${palette.fg}`,
    'activityBar.inactiveForeground': `${palette.grey1}`,
    'activityBar.dropBorder': `${palette.bg5}`,
    'activityBar.activeBorder': `${palette.badge}d0`,
    'activityBar.activeFocusBorder': `${palette.badge}`,
    'activityBar.activeBackground': `${palette.bg}`,
    'activityBarBadge.background': `${palette.badge}`,
    'activityBarBadge.foreground': `${palette.bg}`,
    'activityWarningBadge.foreground': `${palette.bg}`,
    'activityWarningBadge.background': `${palette.yellow}`,
    'activityErrorBadge.foreground': `${palette.bg}`,
    'activityErrorBadge.background': `${palette.red}`,
    'profileBadge.background': `${palette.bg3}`,
    'profileBadge.foreground': `${palette.grey2}`,
    'profiles.sashBorder': `${palette.bg5}`,
    'activityBarTop.background': `${palette.bg}`,
    'activityBarTop.foreground': `${palette.fg}`,
    'activityBarTop.inactiveForeground': `${palette.grey1}`,
    'activityBarTop.activeBorder': `${palette.badge}d0`,
    'activityBarTop.activeBackground': `${palette.bg}`,
    'activityBarTop.dropBorder': `${palette.bg5}`,
  };
}
