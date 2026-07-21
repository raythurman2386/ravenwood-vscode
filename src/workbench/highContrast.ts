/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Configuration, Palette } from '../interface';
import { applyHighContrastFlag, getBaseWorkbenchTokens } from './base';

/** High-contrast workbench style — darker activity bar / sidebar / list selection backgrounds for increased separation. */
export function highContrastWorkbench(
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
    'activityBar.border': `${palette.bg0}`,
    'activityBar.background': `${palette.bg0}`,
    'sideBar.background': `${palette.bg1}`,
  });
}

// vim: fdm=marker fmr={{{,}}}:
