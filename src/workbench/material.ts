/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Configuration, Palette } from '../interface';
import { applyHighContrastFlag, getBaseWorkbenchTokens } from './base';

/** Material workbench style — the default. No style-specific overrides; just the base + highContrast flag. */
export function materialWorkbench(
  palette: Palette,
  configuration: Configuration,
  variant: string,
): Record<string, string> {
  const tokens = getBaseWorkbenchTokens(palette, configuration, variant);
  return applyHighContrastFlag(palette, configuration, tokens);
}

// vim: fdm=marker fmr={{{,}}}:
