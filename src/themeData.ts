/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Configuration, ThemeData } from './interface';
import { getSemantic } from './semantic';
import { getSyntax } from './syntax';
import { getWorkbench } from './workbench';

/**
 * Build the full ThemeData (dark + light blocks) from a Configuration.
 * Pure: does not touch the `vscode` module, so it is safe to call from the
 * build-time generateThemes hook as well as from the runtime Utils class.
 */
export function getThemeData(configuration: Configuration): ThemeData {
  // {{{
  return {
    dark: {
      name: 'Ravenwood Dark',
      type: 'dark',
      semanticHighlighting: true,
      semanticTokenColors: getSemantic(configuration, 'dark'),
      colors: getWorkbench(configuration, 'dark'),
      tokenColors: getSyntax(configuration, 'dark'),
    },
    light: {
      name: 'Ravenwood Light',
      type: 'light',
      semanticHighlighting: true,
      semanticTokenColors: getSemantic(configuration, 'light'),
      colors: getWorkbench(configuration, 'light'),
      tokenColors: getSyntax(configuration, 'light'),
    },
  };
} // }}}

// vim: fdm=marker fmr={{{,}}}:
