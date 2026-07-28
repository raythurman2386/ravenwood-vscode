/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Palette } from '../../interface';

export function sideBarColors(palette: Palette): Record<string, string> {
  // {{{
  return {
    'sideBar.foreground': `${palette.grey1}`,
    'sideBar.background': `${palette.bg}`,
    'sideBar.border': `${palette.bg}`,
    'sideBar.dropBackground': `${palette.bg2}80`,
    'sideBarSectionHeader.background': `${palette.bg}00`,
    'sideBarSectionHeader.border': `${palette.bg}`,
    'sideBarTitle.foreground': `${palette.grey2}`,
    'sideBarTitle.background': `${palette.bg}`,
    'sideBarTitle.border': `${palette.bg}`,
    'sideBarSectionHeader.foreground': `${palette.grey2}`,
    'sideBarActivityBarTop.border': `${palette.bg}`,
    'sideBarStickyScroll.background': `${palette.bg1}`,
    'sideBarStickyScroll.border': `${palette.bg4}`,
    'sideBarStickyScroll.shadow': `${palette.shadow}`,
  };
} // }}}
// vim: fdm=marker fmr={{{,}}}:
