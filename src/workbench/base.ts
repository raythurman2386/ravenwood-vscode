/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Configuration, Palette } from '../interface';
import {
  getCursorColor,
  getDiagnosticOpacity,
  getSelectionColors,
  getWorkbenchVariantColors,
} from './common';
import { activityBarColors } from './groups/activityBar';
import { chatColors } from './groups/chat';
import { debugColors } from './groups/debug';
import { diffColors } from './groups/diff';
import { editorColors } from './groups/editor';
import { gitColors } from './groups/git';
import { listColors } from './groups/list';
import { markdownColors } from './groups/markdown';
import { notebookColors } from './groups/notebook';
import { sideBarColors } from './groups/sideBar';
import { statusBarColors } from './groups/statusBar';
import { symbolIconColors } from './groups/symbolIcon';
import { tabColors } from './groups/tab';
import { terminalColors } from './groups/terminal';
import { testingColors } from './groups/testing';
import { uiColors } from './groups/ui';

/**
 * Build the full base workbench token map shared by all workbench styles.
 * Returns the material-style map. Style-specific callers (material/flat/
 * highContrast) override the keys they need after this.
 */
export function getBaseWorkbenchTokens(
  palette: Palette,
  configuration: Configuration,
  variant: string,
): Record<string, string> {
  const selection = getSelectionColors(palette, configuration, variant);
  const cursorFg = getCursorColor(palette, configuration, variant);
  const diagnosticOpacity = getDiagnosticOpacity(configuration);
  const variantColors = getWorkbenchVariantColors(palette, variant);

  return {
    ...editorColors(
      palette,
      variant,
      selection,
      cursorFg,
      variantColors,
      diagnosticOpacity,
    ),
    ...terminalColors(palette, variant, cursorFg, variantColors, selection),
    ...gitColors(palette),
    ...listColors(palette, variantColors, selection),
    ...tabColors(palette),
    ...activityBarColors(palette),
    ...sideBarColors(palette),
    ...statusBarColors(palette),
    ...debugColors(palette, variantColors),
    ...diffColors(palette),
    ...notebookColors(palette, variantColors),
    ...chatColors(palette),
    ...testingColors(palette),
    ...markdownColors(palette),
    ...symbolIconColors(palette),
    ...uiColors(palette, variantColors, cursorFg, selection),
  };
}

/**
 * Apply the highContrast config flag overlay when configuration.highContrast is true.
 * Shared by all three workbench styles.
 */
export function applyHighContrastFlag(
  palette: Palette,
  configuration: Configuration,
  tokens: Record<string, string>,
): Record<string, string> {
  if (configuration.highContrast) {
    return {
      ...tokens,
      contrastBorder: `${palette.bg5}`,
      contrastActiveBorder: `${palette.grey0}`,
    };
  }
  return tokens;
}
