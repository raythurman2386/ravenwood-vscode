/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Palette } from '../../interface';

export function markdownColors(palette: Palette): Record<string, string> {
  // {{{
  return {
    'markdownAlert.note.foreground': `${palette.blue}`,
    'markdownAlert.tip.foreground': `${palette.green}`,
    'markdownAlert.important.foreground': `${palette.purple}`,
    'markdownAlert.warning.foreground': `${palette.yellow}`,
    'markdownAlert.caution.foreground': `${palette.red}`,
  };
} // }}}
// vim: fdm=marker fmr={{{,}}}:
