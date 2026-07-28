/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Palette } from '../../interface';
import type { WorkbenchVariantColors } from '../common';

export function notebookColors(
  palette: Palette,
  variantColors: WorkbenchVariantColors,
): Record<string, string> {
  // {{{
  return {
    'notebook.cellBorderColor': `${palette.bg5}`,
    'notebook.cellStatusBarItemHoverBackground': `${variantColors.mainBg}`,
    'notebook.focusedCellBackground': `${palette.bg}`,
    'notebook.cellHoverBackground': `${palette.bg}`,
    'notebook.outputContainerBackgroundColor': `${palette.bg1}`,
    'notebook.editorBackground': `${palette.bg}`,
    'notebook.cellEditorBackground': `${palette.bg}`,
    'notebook.inactiveSelectedCellBorder': `${palette.bg4}`,
    'notebookEditorOverviewRuler.runningCellForeground': `${palette.dimGreen}a0`,
    'notebookStatusSuccessIcon.foreground': `${palette.green}`,
    'notebookStatusErrorIcon.foreground': `${palette.red}`,
    'notebookStatusRunningIcon.foreground': `${palette.blue}`,
    'notebook.focusedCellBorder': `${palette.bg5}`,
    'notebook.focusedEditorBorder': `${palette.bg5}`,
    'notebook.selectedCellBorder': `${palette.bg5}`,
    'notebook.inactiveFocusedCellBorder': `${palette.bg5}`,
    'notebook.cellToolbarSeparator': `${palette.bg5}`,
    'notebook.cellInsertionIndicator': `${palette.badge}`,
    'notebook.outputContainerBorderColor': `${palette.bg5}`,
    'notebook.selectedCellBackground': `${palette.bg}`,
    'notebook.symbolHighlightBackground': `${palette.dimYellow}40`,
    'notebookScrollbarSlider.background': `${palette.bg5}80`,
    'notebookScrollbarSlider.hoverBackground': `${palette.bg5}`,
    'notebookScrollbarSlider.activeBackground': `${palette.grey2}`,
  };
} // }}}
// vim: fdm=marker fmr={{{,}}}:
